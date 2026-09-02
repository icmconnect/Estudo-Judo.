import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, X } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

export const SuccessConversionModal: React.FC = () => {
  const { showSuccessConversionModal, dismissSuccessConversionModal } = useSubscription();
  const navigate = useNavigate();

  if (!showSuccessConversionModal) return null;

  const handleStartStudying = () => {
    dismissSuccessConversionModal();
    navigate('/app');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversion-success-title"
    >
      <div className="absolute inset-0" onClick={dismissSuccessConversionModal} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-zinc-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white z-10 space-y-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 size={36} aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            <Sparkles size={13} />
            <span>Plano Fundador Ativado</span>
          </div>
          <h2 id="conversion-success-title" className="text-xl font-black text-zinc-100">
            Pagamento confirmado. Seu acesso completo foi liberado.
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Todas as técnicas do Gokyo, vídeos demonstrativos, trilhas da Formação Teórica e ferramentas de estudo estão disponíveis para você.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleStartStudying}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
            aria-label="Começar a estudar"
          >
            <span>Começar a estudar</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
