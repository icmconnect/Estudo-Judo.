import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Lock, Sparkles, Check, X, ArrowRight, ShieldCheck, BookOpen, Video, Award } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

export const PremiumLockModal: React.FC = () => {
  const { isLockModalOpen, closeLockModal, lockModalContextTitle } = useSubscription();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Fechar com ESC e capturar foco
  useEffect(() => {
    if (!isLockModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLockModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focar no botão primário
    setTimeout(() => {
      primaryButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLockModalOpen, closeLockModal]);

  if (!isLockModalOpen) return null;

  const handleGoToPricing = () => {
    closeLockModal();
    navigate('/planos');
  };

  const benefits = [
    { text: 'Arsenal Técnico Completo e os 5 Grupos do Gokyo (40 técnicas oficiais)', icon: Video },
    { text: 'Formação Teórica Autoral completa em 6 Trilhas Especializadas', icon: BookOpen },
    { text: 'Quizzes interativos, flashcards e revisão espaçada inteligente', icon: Sparkles },
    { text: 'Caderno Técnico e Diário de Treino Presencial com histórico', icon: ShieldCheck },
    { text: 'Cenários práticos de Arbitragem com diretrizes oficiais CBJ / IJF', icon: Award },
    { text: 'Certificados digitais internos de conclusão por trilha de estudo', icon: Award }
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-lock-title"
      aria-describedby="premium-lock-description"
      ref={modalRef}
    >
      {/* Backdrop click */}
      <div className="fixed inset-0 cursor-pointer" onClick={closeLockModal} aria-hidden="true" />

      <div className="relative w-full max-w-lg max-h-[92dvh] sm:max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-white z-10 space-y-5 overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Lock size={24} aria-hidden="true" />
            </div>
            <div>
              <h2 id="premium-lock-title" className="text-lg sm:text-xl font-bold text-zinc-100 leading-tight">
                Conteúdo exclusivo do Acesso Completo
              </h2>
              {lockModalContextTitle && (
                <p className="text-xs text-amber-400 font-semibold mt-0.5 truncate max-w-[280px] sm:max-w-xs">
                  {lockModalContextTitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={closeLockModal}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Fechar janela de conteúdo premium"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Descrição */}
        <div className="space-y-3">
          <p id="premium-lock-description" className="text-sm text-zinc-300 leading-relaxed">
            Esta aula faz parte do conteúdo premium do Dojo Digital. Libere o acesso completo por pagamento único de{' '}
            <strong className="text-amber-400 font-bold">R$ 97,00</strong>.
          </p>

          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-4 space-y-2.5">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              O que você recebe no Plano Fundador:
            </p>
            <ul className="space-y-2 text-xs text-zinc-200">
              {benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check size={13} aria-hidden="true" />
                  </div>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aviso Educacional e Certificado */}
        <p className="text-[11px] text-zinc-500 leading-normal border-t border-zinc-800/60 pt-3">
          * Pagamento único sem mensalidades. O certificado interno comprova horas formativas e não equivale a graduação, faixa ou exame técnico oficial federativo.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeLockModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-colors cursor-pointer text-center"
            aria-label="Continuar nos conteúdos grátis"
          >
            Continuar nos conteúdos grátis
          </button>

          <button
            ref={primaryButtonRef}
            type="button"
            onClick={handleGoToPricing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            aria-label="Liberar acesso por R$ 97,00"
          >
            <span>Liberar acesso por R$ 97</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
