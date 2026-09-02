import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { BEHAVIORAL_SITUATIONS } from '../data/behavioralSituations';

interface SituationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SituationsModal: React.FC<SituationsModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentSit = BEHAVIORAL_SITUATIONS[currentIdx];
  const isAnswered = selectedChoice !== null;

  const handleSelectChoice = (idx: number) => {
    if (isAnswered) return;
    setSelectedChoice(idx);
  };

  const handleNext = () => {
    setSelectedChoice(null);
    if (currentIdx < BEHAVIORAL_SITUATIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="situations-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <HeartHandshake size={18} />
            </span>
            <div>
              <h3 id="situations-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Dilemas Morais & Código de Conduta do Judoca
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Situação {currentIdx + 1} de {BEHAVIORAL_SITUATIONS.length} — {currentSit.theme}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 inline-block">
              {currentSit.theme}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">{currentSit.title}</h4>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              {currentSit.prompt}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold pt-1">
              Dilema ético: {currentSit.dilemma}
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Como você age no tatame?
            </label>
            {currentSit.choices.map((choice, cIdx) => {
              const isSelected = selectedChoice === cIdx;
              const isCorrect = cIdx === currentSit.correctChoiceIndex;

              let style = 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500';
              if (isAnswered) {
                if (isSelected && isCorrect) {
                  style = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200';
                } else if (isCorrect) {
                  style = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-300';
                }
              }

              return (
                <button
                  key={cIdx}
                  onClick={() => handleSelectChoice(cIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + cIdx)}
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{choice.text}</p>
                    {isAnswered && (
                      <p className="text-xs font-normal text-zinc-600 dark:text-zinc-300 pt-1">
                        {choice.feedback}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
              <ShieldCheck size={16} className="shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <strong className="block font-bold">Princípio Moral Kodokan:</strong>
                {currentSit.moralPrinciple}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          <span className="text-xs text-zinc-500">
            {currentIdx + 1} de {BEHAVIORAL_SITUATIONS.length} situações
          </span>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isAnswered
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <span>{currentIdx < BEHAVIORAL_SITUATIONS.length - 1 ? 'Próxima Situação' : 'Concluir Módulo'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
