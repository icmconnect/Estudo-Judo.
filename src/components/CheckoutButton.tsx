import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';

interface CheckoutButtonProps {
  className?: string;
  buttonText?: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  className = '',
  buttonText = 'Pagar com Pix ou cartão'
}) => {
  const { user } = useAuth();
  const { createCheckoutSession, isActive, isBlocked } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login?redirect=/planos');
      return;
    }

    if (isBlocked) {
      setErrorMessage('Sua conta está temporariamente bloqueada. Entre em contato com o suporte.');
      return;
    }

    if (isActive) {
      navigate('/app');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const result = await createCheckoutSession();
    if (result.error) {
      setErrorMessage(result.error);
      setLoading(false);
    }
  };

  if (isActive) {
    return (
      <button
        type="button"
        onClick={() => navigate('/app')}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer ${className}`}
      >
        <ShieldCheck size={18} />
        <span>Acesso Completo Ativo — Ir para o App</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-98 disabled:opacity-60 text-zinc-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all cursor-pointer border border-amber-400 ${className}`}
        aria-label="Pagar com Pix ou cartão no valor de R$ 97,00"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Iniciando ambiente seguro...</span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 shrink-0">
              <QrCode size={18} className="text-zinc-950" />
              <CreditCard size={18} className="text-zinc-950" />
            </div>
            <span>{buttonText}</span>
            <ArrowRight size={16} className="shrink-0" />
          </>
        )}
      </button>

      {errorMessage && (
        <p className="text-xs text-rose-400 font-medium text-center animate-fadeIn" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-400" />
          Checkout Seguro Stripe
        </span>
        <span>•</span>
        <span>Pix ou Cartão</span>
        <span>•</span>
        <span>Pagamento Único</span>
      </div>
    </div>
  );
};
