import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

// Lazy initialization do cliente Stripe
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as any
    });
  }
  return stripeClient;
}

// Armazenamento em memória sincronizado para execução em container / dev / fallback
interface ServerSubscription {
  uid: string;
  planId: string;
  provider: 'stripe' | 'manual' | 'none';
  status: 'free' | 'pending_payment' | 'active' | 'failed' | 'cancelled' | 'refunded' | 'blocked' | 'manual_grant';
  stripeCustomerId?: string;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  amountInCents: number;
  currency: string;
  accessAllowed: boolean;
  sourceOfTruth: 'stripe_webhook' | 'admin_manual' | 'migration';
  startedAt: string;
  updatedAt: string;
  notesInternal?: string;
}

interface ServerPaymentEvent {
  id: string;
  provider: 'stripe';
  providerEventId: string;
  eventType: string;
  uid: string;
  planId: string;
  stripePaymentIntentId?: string;
  stripeCheckoutSessionId?: string;
  processingStatus: 'processed' | 'failed' | 'ignored';
  rawPayloadHash: string;
  createdAt: string;
  processedAt: string;
  errorMessage?: string;
}

interface ServerAdminAuditLog {
  id: string;
  actorUid: string;
  actorEmail?: string;
  action: string;
  targetUid: string;
  reason: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  createdAt: string;
}

const inMemorySubscriptions = new Map<string, ServerSubscription>();
const inMemoryPaymentEvents = new Map<string, ServerPaymentEvent>();
const inMemoryAuditLogs: ServerAdminAuditLog[] = [];

// Helper para obter URL base da aplicação
function getAppBaseUrl(req: Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, '');
  }
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL.replace(/\/$/, '');
  }
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host') || `localhost:${PORT}`;
  return `${protocol}://${host}`;
}

// -------------------------------------------------------------
// 1. STRIPE WEBHOOK (Requer Raw Body para verificação de assinatura)
// -------------------------------------------------------------
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = getStripe();

    let event: Stripe.Event;

    if (stripe && webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error('Falha na validação da assinatura do Stripe Webhook:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    } else {
      // Fallback para testes sem chave configurada (simulação controlada)
      try {
        const bodyString = typeof req.body === 'string' ? req.body : req.body.toString('utf8');
        event = JSON.parse(bodyString);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON payload' });
        return;
      }
    }

    const eventId = event.id || `evt_${Date.now()}`;
    const rawPayloadHash = crypto.createHash('sha256').update(JSON.stringify(event)).digest('hex');

    // Idempotência: verificar se evento já foi processado
    if (inMemoryPaymentEvents.has(eventId) && inMemoryPaymentEvents.get(eventId)?.processingStatus === 'processed') {
      res.json({ received: true, message: 'Event already processed' });
      return;
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const uid = session.metadata?.uid || session.client_reference_id;
          const planId = session.metadata?.planId || 'dojo_founder_97';
          const appId = session.metadata?.appId;

          if (uid && (!appId || appId === 'dojo-digital')) {
            const isPaymentPaid = session.payment_status === 'paid';
            const currentSub = inMemorySubscriptions.get(uid);

            const newSub: ServerSubscription = {
              uid,
              planId,
              provider: 'stripe',
              status: isPaymentPaid ? 'active' : 'pending_payment',
              stripeCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
              stripeCheckoutSessionId: session.id,
              stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
              amountInCents: session.amount_total || 9700,
              currency: session.currency?.toUpperCase() || 'BRL',
              accessAllowed: isPaymentPaid,
              sourceOfTruth: 'stripe_webhook',
              startedAt: currentSub?.startedAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            inMemorySubscriptions.set(uid, newSub);

            inMemoryPaymentEvents.set(eventId, {
              id: eventId,
              provider: 'stripe',
              providerEventId: event.id,
              eventType: event.type,
              uid,
              planId,
              stripeCheckoutSessionId: session.id,
              stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
              processingStatus: 'processed',
              rawPayloadHash,
              createdAt: new Date(event.created * 1000).toISOString(),
              processedAt: new Date().toISOString()
            });
          }
          break;
        }

        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const uid = paymentIntent.metadata?.uid;
          const planId = paymentIntent.metadata?.planId || 'dojo_founder_97';

          if (uid) {
            const currentSub = inMemorySubscriptions.get(uid);
            inMemorySubscriptions.set(uid, {
              uid,
              planId,
              provider: 'stripe',
              status: 'active',
              stripePaymentIntentId: paymentIntent.id,
              amountInCents: paymentIntent.amount || 9700,
              currency: paymentIntent.currency.toUpperCase(),
              accessAllowed: true,
              sourceOfTruth: 'stripe_webhook',
              startedAt: currentSub?.startedAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });

            inMemoryPaymentEvents.set(eventId, {
              id: eventId,
              provider: 'stripe',
              providerEventId: event.id,
              eventType: event.type,
              uid,
              planId,
              stripePaymentIntentId: paymentIntent.id,
              processingStatus: 'processed',
              rawPayloadHash,
              createdAt: new Date(event.created * 1000).toISOString(),
              processedAt: new Date().toISOString()
            });
          }
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const uid = paymentIntent.metadata?.uid;
          if (uid) {
            const currentSub = inMemorySubscriptions.get(uid);
            if (currentSub && currentSub.status !== 'active') {
              inMemorySubscriptions.set(uid, {
                ...currentSub,
                status: 'failed',
                accessAllowed: false,
                updatedAt: new Date().toISOString()
              });
            }
          }
          break;
        }

        case 'charge.refunded': {
          const charge = event.data.object as Stripe.Charge;
          const uid = charge.metadata?.uid;
          if (uid) {
            const currentSub = inMemorySubscriptions.get(uid);
            if (currentSub) {
              inMemorySubscriptions.set(uid, {
                ...currentSub,
                status: 'refunded',
                accessAllowed: false,
                updatedAt: new Date().toISOString()
              });
            }
          }
          break;
        }

        default:
          break;
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error('Erro ao processar evento webhook:', err);
      res.status(500).json({ error: 'Webhook processing error', details: err.message });
    }
  }
);

// Demais rotas usam parser JSON comum
app.use(express.json());

// -------------------------------------------------------------
// 2. CRIAR SESSÃO DE CHECKOUT STRIPE (POST /api/stripe/create-checkout-session)
// -------------------------------------------------------------
app.post('/api/stripe/create-checkout-session', async (req: Request, res: Response): Promise<void> => {
  try {
    const { planId, uid, userEmail } = req.body;

    if (!uid) {
      res.status(401).json({ error: 'Usuário não autenticado.' });
      return;
    }

    if (planId !== 'dojo_founder_97') {
      res.status(400).json({ error: 'Plano inválido para checkout pago.' });
      return;
    }

    // Regra estrita: O valor é fixado exclusivamente pelo servidor (R$ 97,00 = 9700 centavos)
    const AMOUNT_IN_CENTS = 9700;
    const CURRENCY = 'brl';
    const appBaseUrl = getAppBaseUrl(req);

    const stripe = getStripe();

    if (!stripe) {
      // Quando a chave do Stripe ainda não foi inserida no .env pelo usuário,
      // retornamos informações claras para simulação/configuração segura sem quebrar o app
      res.status(200).json({
        mockMode: true,
        message: 'STRIPE_SECRET_KEY não configurada no servidor. Para ativar pagamentos reais, adicione a chave no painel de configurações.',
        checkoutUrl: `${appBaseUrl}/pagamento/sucesso?simulated=true&session_id=cs_test_mock_${Date.now()}`
      });
      return;
    }

    // Criação segura da Checkout Session com suporte a Cartão e Pix
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: AMOUNT_IN_CENTS,
            product_data: {
              name: 'Dojo Digital — Acesso Completo',
              description:
                'Pagamento único para acesso ao conteúdo premium incluído no Plano Fundador. O certificado interno não equivale a graduação, faixa, exame técnico, registro federativo ou credenciamento oficial.'
            }
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      customer_email: userEmail || undefined,
      metadata: {
        uid,
        planId: 'dojo_founder_97',
        appId: 'dojo-digital'
      },
      client_reference_id: uid,
      success_url: `${appBaseUrl}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appBaseUrl}/pagamento/cancelado`
    });

    res.json({
      url: session.url,
      sessionId: session.id
    });
  } catch (error: any) {
    console.error('Erro ao criar Checkout Session do Stripe:', error);
    res.status(500).json({ error: error.message || 'Erro ao processar checkout' });
  }
});

// -------------------------------------------------------------
// 3. CONSULTAR STATUS DA ASSINATURA (GET /api/stripe/subscription-status)
// -------------------------------------------------------------
app.get('/api/stripe/subscription-status', (req: Request, res: Response): void => {
  const uid = req.query.uid as string;
  if (!uid) {
    res.status(400).json({ error: 'UID obrigatório' });
    return;
  }

  const sub = inMemorySubscriptions.get(uid) || {
    uid,
    planId: 'free',
    provider: 'none',
    status: 'free',
    amountInCents: 0,
    currency: 'BRL',
    accessAllowed: false,
    sourceOfTruth: 'admin_manual',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.json(sub);
});

// -------------------------------------------------------------
// 4. ADMIN: CONCEDER ACESSO MANUAL COM AUDITORIA
// -------------------------------------------------------------
app.post('/api/admin/grant-access', (req: Request, res: Response): void => {
  const { actorUid, actorEmail, targetUid, reason } = req.body;

  if (!actorUid || !targetUid || !reason) {
    res.status(400).json({ error: 'Parâmetros obrigatórios: actorUid, targetUid, reason' });
    return;
  }

  const before = inMemorySubscriptions.get(targetUid) || {
    uid: targetUid,
    status: 'free',
    accessAllowed: false
  };

  const updated: ServerSubscription = {
    uid: targetUid,
    planId: 'dojo_founder_97',
    provider: 'manual',
    status: 'manual_grant',
    amountInCents: 0,
    currency: 'BRL',
    accessAllowed: true,
    sourceOfTruth: 'admin_manual',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notesInternal: `Concedido manualmente por ${actorEmail || actorUid}. Motivo: ${reason}`
  };

  inMemorySubscriptions.set(targetUid, updated);

  const log: ServerAdminAuditLog = {
    id: `log_${Date.now()}`,
    actorUid,
    actorEmail,
    action: 'grant_manual_access',
    targetUid,
    reason,
    before: before as any,
    after: updated as any,
    createdAt: new Date().toISOString()
  };
  inMemoryAuditLogs.unshift(log);

  res.json({ success: true, subscription: updated, log });
});

// -------------------------------------------------------------
// 5. ADMIN: REVOGAR ACESSO COM AUDITORIA
// -------------------------------------------------------------
app.post('/api/admin/revoke-access', (req: Request, res: Response): void => {
  const { actorUid, actorEmail, targetUid, reason } = req.body;

  if (!actorUid || !targetUid || !reason) {
    res.status(400).json({ error: 'Parâmetros obrigatórios: actorUid, targetUid, reason' });
    return;
  }

  const before = inMemorySubscriptions.get(targetUid) || {
    uid: targetUid,
    status: 'free',
    accessAllowed: false
  };

  const updated: ServerSubscription = {
    uid: targetUid,
    planId: 'free',
    provider: 'manual',
    status: 'free',
    amountInCents: 0,
    currency: 'BRL',
    accessAllowed: false,
    sourceOfTruth: 'admin_manual',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notesInternal: `Acesso revogado por ${actorEmail || actorUid}. Motivo: ${reason}`
  };

  inMemorySubscriptions.set(targetUid, updated);

  const log: ServerAdminAuditLog = {
    id: `log_${Date.now()}`,
    actorUid,
    actorEmail,
    action: 'revoke_access',
    targetUid,
    reason,
    before: before as any,
    after: updated as any,
    createdAt: new Date().toISOString()
  };
  inMemoryAuditLogs.unshift(log);

  res.json({ success: true, subscription: updated, log });
});

// -------------------------------------------------------------
// 6. ADMIN: BLOQUEAR / DESBLOQUEAR USUÁRIO COM AUDITORIA
// -------------------------------------------------------------
app.post('/api/admin/block-user', (req: Request, res: Response): void => {
  const { actorUid, actorEmail, targetUid, block, reason } = req.body;

  if (!actorUid || !targetUid || !reason) {
    res.status(400).json({ error: 'Parâmetros obrigatórios: actorUid, targetUid, reason' });
    return;
  }

  const before = inMemorySubscriptions.get(targetUid) || {
    uid: targetUid,
    status: 'free',
    accessAllowed: false
  };

  const newStatus = block ? 'blocked' : 'free';
  const updated: ServerSubscription = {
    uid: targetUid,
    planId: block ? 'free' : (before as any).planId || 'free',
    provider: 'manual',
    status: newStatus,
    amountInCents: 0,
    currency: 'BRL',
    accessAllowed: false,
    sourceOfTruth: 'admin_manual',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notesInternal: `${block ? 'Bloqueado' : 'Desbloqueado'} por ${actorEmail || actorUid}. Motivo: ${reason}`
  };

  inMemorySubscriptions.set(targetUid, updated);

  const log: ServerAdminAuditLog = {
    id: `log_${Date.now()}`,
    actorUid,
    actorEmail,
    action: block ? 'block_user' : 'unblock_user',
    targetUid,
    reason,
    before: before as any,
    after: updated as any,
    createdAt: new Date().toISOString()
  };
  inMemoryAuditLogs.unshift(log);

  res.json({ success: true, subscription: updated, log });
});

// -------------------------------------------------------------
// 7. ADMIN: LISTAGEM GERAL DE ASSINATURAS E AUDITORIA
// -------------------------------------------------------------
app.get('/api/admin/users-subscriptions', (req: Request, res: Response): void => {
  const subscriptions = Array.from(inMemorySubscriptions.values());
  const paymentEvents = Array.from(inMemoryPaymentEvents.values());
  res.json({
    subscriptions,
    paymentEvents,
    auditLogs: inMemoryAuditLogs
  });
});

// -------------------------------------------------------------
// VITE MIDDLEWARE / SPA STATIC HANDLING
// -------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dojo Digital full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

start();
