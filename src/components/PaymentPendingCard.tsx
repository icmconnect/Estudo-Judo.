import React from 'react';
import { Clock, RefreshCw, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

interface PaymentPendingCardProps {
  onCheckStatus?: () => void;
  isChecking?: boolean;
}

export const PaymentPendingCard: React.FC<PaymentPendingCardProps> = ({
  onCheckStatus,
  isChecking = false
}) => {
  const { refreshSubscription } = useSubscription();

  const handleRefresh = async () => {
    if (onCheckStatus) {
      onCheckStatus();
    } else {
      await refreshSubscription();
    }
  };

  return (
    <div className="w-full max-w-lg bg-zinc-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 animate-pulse">
          <Clock size={28} />
        </div>
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-black uppercase tracking-wider">
            Aguardando Confirmação
          </span>
          <h3 className="text-lg font-bold text-zinc-100 mt-1">
            Recebemos sua solicitação de pagamento
          </h3>
        </div>
      </div>

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-300 space-y-3">
        <p className="leading-relaxed">
          Estamos confirmando seu pagamento com total segurança através do Stripe.
        </p>
        <div className="space-y-1 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2.5">
          <p>
            • <strong>Pix:</strong> A confirmação costuma ocorrer em poucos segundos após o pagamento no seu banco.
          </p>
          <p>
            • <strong>Cartão de Crédito:</strong> A liberação ocorre assim que a emissora do cartão aprovar a transação.
          </p>
          <p>
            • Assim que o webhook for confirmado, seus conteúdos serão liberados automaticamente sem necessidade de recarregar a página.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <a
          href="mailto:suporte@dojodigital.com.br?subject=Dúvida sobre confirmação de Pix/Pagamento"
          className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5"
        >
          <HelpCircle size={14} />
          <span>Precisa de ajuda?</span>
        </a>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isChecking}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-60 text-zinc-950 font-black text-xs shadow-md transition-all cursor-pointer"
        >
          <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
          <span>{isChecking ? 'Verificando...' : 'Verificar agora'}</span>
        </button>
      </div>
    </div>
  );
};
