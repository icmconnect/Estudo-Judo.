import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Lock,
  Clock,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  X,
  CheckCircle2
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';

const DISMISS_KEY = 'dojo_digital_subscription_banner_dismissed_until';
const DISMISS_HOURS = 24;

export const SubscriptionBanner: React.FC = () => {
  const { user } = useAuth();
  const { subscription, isBlocked, isPending, isFree, isActive, accessAllowed } = useSubscription();
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Verificar se o banner gratuito foi dispensado temporariamente nas últimas 24h
  useEffect(() => {
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil) {
      const expiry = parseInt(dismissedUntil, 10);
      if (Date.now() < expiry) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem(DISMISS_KEY);
      }
    }
  }, []);

  const handleDismiss = () => {
    const expiry = Date.now() + DISMISS_HOURS * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, expiry.toString());
    setIsDismissed(true);
  };

  // Se não houver usuário logado ou a assinatura for ativa com acesso permitido, não exibe banner
  if (!user || isActive || accessAllowed) {
    return null;
  }

  // 1. PRIORIDADE 1: ACESSO BLOQUEADO
  if (isBlocked) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="w-full bg-rose-950/90 border-b border-rose-800/80 text-rose-100 px-4 sm:px-6 py-3.5 shadow-sm transition-all z-20"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-rose-900 text-rose-300 shrink-0 mt-0.5">
              <AlertTriangle size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-rose-200">Seu acesso está temporariamente indisponível.</p>
              <p className="text-rose-300/90 text-xs">Se precisar de ajuda, entre em contato com o suporte.</p>
            </div>
          </div>
          <a
            href="mailto:suporte@dojodigital.com.br?subject=Dúvida sobre acesso ao Dojo Digital"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow transition-colors cursor-pointer shrink-0"
            aria-label="Falar com o suporte técnico"
          >
            <HelpCircle size={14} aria-hidden="true" />
            <span>Falar com o suporte</span>
          </a>
        </div>
      </aside>
    );
  }

  // 2. PRIORIDADE 2: PAGAMENTO PENDENTE (Pix ou processamento Stripe)
  if (isPending) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="w-full bg-amber-950/90 border-b border-amber-800/80 text-amber-100 px-4 sm:px-6 py-3.5 shadow-sm transition-all z-20"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-amber-900 text-amber-300 shrink-0 mt-0.5 animate-pulse">
              <Clock size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-amber-200">Seu pagamento está aguardando confirmação.</p>
              <p className="text-amber-300/90 text-xs">
                Assim que o pagamento for confirmado pelo Stripe, seu acesso completo será liberado automaticamente.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/minha-assinatura')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow transition-colors cursor-pointer shrink-0"
            aria-label="Ver status detalhado do pagamento"
          >
            <span>Ver status do pagamento</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </aside>
    );
  }

  // 3. PRIORIDADE 3: PLANO GRATUITO (Se não foi dispensado temporariamente)
  if (isFree && !isDismissed) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="w-full bg-gradient-to-r from-emerald-950/95 via-zinc-900/95 to-emerald-950/95 border-b border-emerald-800/50 text-emerald-100 px-4 sm:px-6 py-3 shadow-md transition-all z-20"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="p-1.5 rounded-xl bg-emerald-900/80 text-emerald-400 border border-emerald-700/50 shrink-0 mt-0.5">
              <Sparkles size={16} aria-hidden="true" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-zinc-100">Você está no plano gratuito.</span>
                <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  R$ 97,00 pagamento único
                </span>
              </div>
              <p className="text-zinc-300 text-xs">
                Libere o acesso completo ao Dojo Digital por pagamento único de R$ 97.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => navigate('/planos')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border border-zinc-700 transition-colors cursor-pointer"
              aria-label="Ver o que está incluso no plano fundador"
            >
              <span>Ver o que está incluso</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/planos')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              aria-label="Liberar acesso completo por R$ 97,00"
            >
              <span>Liberar acesso</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer ml-1"
              title="Ocultar aviso por 24 horas"
              aria-label="Fechar aviso de plano gratuito"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
