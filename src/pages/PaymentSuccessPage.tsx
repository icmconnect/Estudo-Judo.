import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, RefreshCw, Loader2 } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { PaymentPendingCard } from '../components/PaymentPendingCard';

export const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const simulated = searchParams.get('simulated');
  const { user } = useAuth();
  const { subscription, accessAllowed, isActive, isPending, refreshSubscription } = useSubscription();
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [simulatedSuccess, setSimulatedSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Polling seguro para confirmação do webhook
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isActive && user) {
      interval = setInterval(async () => {
        await refreshSubscription();
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, user, refreshSubscription]);

  const handleSimulateConfirmation = async () => {
    if (!user) return;
    setIsChecking(true);
    try {
      // Simular chamada de webhook no backend de desenvolvimento
      await fetch('/api/stripe/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `evt_sim_${Date.now()}`,
          type: 'checkout.session.completed',
          created: Math.floor(Date.now() / 1000),
          data: {
            object: {
              id: sessionId || `cs_sim_${Date.now()}`,
              payment_status: 'paid',
              amount_total: 9700,
              currency: 'brl',
              metadata: { uid: user.uid, planId: 'dojo_founder_97', appId: 'dojo-digital' }
            }
          }
        })
      });
      await refreshSubscription();
      setSimulatedSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsChecking(false);
    }
  };

  const isConfirmed = isActive || accessAllowed || simulatedSuccess;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-6 animate-fadeIn text-center">
        {isConfirmed ? (
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <Sparkles size={13} />
                <span>Plano Fundador Ativado</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-100">
                Pagamento confirmado!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto">
                Seu acesso completo ao Dojo Digital foi liberado com sucesso. Todos os módulos, vídeos e ferramentas de estudo já estão disponíveis.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 space-y-1 text-left">
              <p className="font-semibold text-zinc-200">Resumo da Compra:</p>
              <p>• Plano: Dojo Digital — Acesso Completo (Plano Fundador)</p>
              <p>• Valor: R$ 97,00 (Pagamento Único)</p>
              <p>• Status: Acesso Irrestrito Liberado</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/app')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Começar a estudar</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <PaymentPendingCard
              onCheckStatus={refreshSubscription}
              isChecking={isChecking}
            />

            {simulated && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 space-y-3 text-left">
                <p className="font-bold text-amber-300">Ambiente de Demonstração / Teste:</p>
                <p>
                  Você pode simular o evento do webhook de pagamento para confirmar o acesso em ambiente local:
                </p>
                <button
                  type="button"
                  onClick={handleSimulateConfirmation}
                  disabled={isChecking}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  {isChecking ? 'Simulando...' : 'Confirmar Pagamento Simulado'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
