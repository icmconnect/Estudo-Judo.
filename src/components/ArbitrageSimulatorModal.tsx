import React, { useState } from 'react';
import { X, Scale, CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, ArrowRight, RotateCcw } from 'lucide-react';
import { ARBITRAGE_SCENARIOS } from '../data/arbitrageScenarios';
import { ArbitrageScenario } from '../types';

interface ArbitrageSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArbitrageSimulatorModal: React.FC<ArbitrageSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scoreCount, setScoreCount] = useState({ correct: 0, total: 0 });

  if (!isOpen) return null;

  const currentScenario = ARBITRAGE_SCENARIOS[currentScenarioIndex];
  const isAnswered = selectedOption !== null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    const isCorrect = currentScenario.options[idx].isCorrect;
    setScoreCount((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentScenarioIndex < ARBITRAGE_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((i) => i + 1);
    } else {
      setCurrentScenarioIndex(0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arbitrage-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Scale size={18} />
            </span>
            <div>
              <h3 id="arbitrage-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Simulador de Arbitragem & Regras Oficiais (CBJ / IJF)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Cenário {currentScenarioIndex + 1} de {ARBITRAGE_SCENARIOS.length} — Acertos: {scoreCount.correct}/{scoreCount.total}
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
          {/* Caixa do Cenário */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Situação de Luta Real
            </span>
            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
              {currentScenario.situationTitle}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {currentScenario.description}
            </p>
          </div>

          {/* Opções de Decisão */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Qual deve ser a decisão correta da arbitragem?
            </label>
            {currentScenario.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-amber-500';
              if (isAnswered) {
                if (isSelected && opt.isCorrect) {
                  style = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200';
                } else if (opt.isCorrect) {
                  style = 'bg-emerald-500/10 border-emerald-500/60 text-emerald-800 dark:text-emerald-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <span>{opt.decision}</span>
                    {isAnswered && (
                      <p className="text-xs font-normal mt-1 text-zinc-600 dark:text-zinc-300">
                        {opt.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fonte Oficial e Metadados do Regulamento */}
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Regra Oficial: {currentScenario.officialRuleRef.entity}
              </span>
              <span className="text-[11px] text-zinc-500">
                Revisão no App: {currentScenario.officialRuleRef.lastReviewedInApp}
              </span>
            </div>
            <p className="font-bold text-zinc-900 dark:text-white">
              {currentScenario.officialRuleRef.ruleTitle} ({currentScenario.officialRuleRef.version})
            </p>
            <a
              href={currentScenario.officialRuleRef.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>Consultar documentação oficial na íntegra</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Disclaimer Obrigatório */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-300">
            <ShieldAlert size={14} className="shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Aviso de Governança:</strong> Regulamentos desportivos são atualizados pelos órgãos gestores (IJF/CBJ). O Dojo Digital mantém curadoria periódica das regras oficiais.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          <span className="text-xs text-zinc-500">
            {currentScenarioIndex + 1} de {ARBITRAGE_SCENARIOS.length} cenários
          </span>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isAnswered
                ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <span>{currentScenarioIndex < ARBITRAGE_SCENARIOS.length - 1 ? 'Próximo Cenário' : 'Recomeçar'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
