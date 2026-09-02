import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ShieldAlert, Award } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnosticQuestions';
import { DiagnosticResult } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveResult: (result: DiagnosticResult) => void;
  savedResult?: DiagnosticResult | null;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onSaveResult,
  savedResult
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeResult, setActiveResult] = useState<DiagnosticResult | null>(savedResult || null);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];
  const isAnswered = selectedAnswers[currentIndex] !== undefined;

  const handleSelect = (optIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishDiagnostic();
    }
  };

  const finishDiagnostic = () => {
    let totalCorrect = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {
      seguranca: { correct: 0, total: 0 },
      fundamentos: { correct: 0, total: 0 },
      filosofia: { correct: 0, total: 0 },
      arbitragem: { correct: 0, total: 0 },
      historia: { correct: 0, total: 0 }
    };
    const mistakeTopics: string[] = [];

    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isRight = selected === q.correctIndex;
      if (isRight) {
        totalCorrect++;
        if (categoryScores[q.category]) categoryScores[q.category].correct++;
      } else {
        mistakeTopics.push(q.categoryLabel);
      }
      if (categoryScores[q.category]) categoryScores[q.category].total++;
    });

    const scorePct = Math.round((totalCorrect / DIAGNOSTIC_QUESTIONS.length) * 100);

    let level: 'iniciante' | 'fundamentos_em_desenvolvimento' | 'intermediario' | 'avancado' = 'iniciante';
    if (scorePct >= 85) level = 'avancado';
    else if (scorePct >= 65) level = 'intermediario';
    else if (scorePct >= 40) level = 'fundamentos_em_desenvolvimento';

    const recommendedModules: string[] = [];
    if (categoryScores.seguranca.correct < categoryScores.seguranca.total) {
      recommendedModules.push('Módulo 3: Dojo Seguro & Salvaguarda');
    }
    if (categoryScores.fundamentos.correct < categoryScores.fundamentos.total) {
      recommendedModules.push('Módulo 2: Princípios & Fundamentos Biomecânicos');
    }
    if (categoryScores.arbitragem.correct < categoryScores.arbitragem.total) {
      recommendedModules.push('Módulo 6: Arbitragem & Regras Oficiais CBJ/IJF');
    }
    if (recommendedModules.length === 0) {
      recommendedModules.push('Módulo 4: Arsenal Técnico Gokyo (139 Vídeos)', 'Módulo 5: Katas Oficiais Kodokan');
    }

    const finalResult: DiagnosticResult = {
      completedAt: new Date().toISOString(),
      scorePercentage: scorePct,
      level,
      categoryBreakdown: {
        seguranca: Math.round((categoryScores.seguranca.correct / Math.max(1, categoryScores.seguranca.total)) * 100),
        fundamentos: Math.round((categoryScores.fundamentos.correct / Math.max(1, categoryScores.fundamentos.total)) * 100),
        filosofia: Math.round((categoryScores.filosofia.correct / Math.max(1, categoryScores.filosofia.total)) * 100),
        arbitragem: Math.round((categoryScores.arbitragem.correct / Math.max(1, categoryScores.arbitragem.total)) * 100),
        historia: Math.round((categoryScores.historia.correct / Math.max(1, categoryScores.historia.total)) * 100)
      },
      recommendedModules,
      mistakeTopics: Array.from(new Set(mistakeTopics))
    };

    setActiveResult(finalResult);
    setIsCompleted(true);
    onSaveResult(finalResult);
  };

  const restart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostic-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Award size={18} />
            </span>
            <div>
              <h3 id="diagnostic-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Avaliação Diagnóstica Inicial de Judô
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {!isCompleted ? `Pergunta ${currentIndex + 1} de ${DIAGNOSTIC_QUESTIONS.length}` : 'Resultado e Recomendações'}
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
        <div className="p-6 overflow-y-auto space-y-6">
          {!isCompleted ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  {currentQ.categoryLabel}
                </span>
                <span className="text-xs font-bold text-zinc-500">
                  {Math.round(((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}%
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const isAnsweredThis = selectedAnswers[currentIndex] !== undefined;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let btnStyle = 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-amber-500/50';
                  if (isAnsweredThis) {
                    if (isSelected && isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200';
                    } else if (isCorrect) {
                      btnStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-300';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(optIdx)}
                      disabled={isAnsweredThis}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <strong className="block text-amber-600 dark:text-amber-400 font-bold mb-1">
                    Explicação Pedagógica:
                  </strong>
                  {currentQ.explanation}
                </div>
              )}
            </div>
          ) : (
            /* Resultados Finais */
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Diagnóstico Concluído
                </span>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">
                  {activeResult?.scorePercentage}% de Aproveitamento
                </div>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300 capitalize">
                  Nível Sugerido: <span className="text-emerald-600 dark:text-emerald-400">{activeResult?.level.replace(/_/g, ' ')}</span>
                </p>
              </div>

              {/* Categorias */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Desempenho por Área de Conhecimento
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activeResult && Object.entries(activeResult.categoryBreakdown).map(([cat, score]) => (
                    <div key={cat} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span className="capitalize text-zinc-700 dark:text-zinc-300">{cat}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Módulos Recomendados */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  Recomendações de Estudo
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {activeResult?.recommendedModules.map((mod, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer Legal Obrigatório */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Aviso Pedagógico:</strong> Esta avaliação diagnóstica é uma ferramenta educacional digital de orientação de estudos e <strong>não substitui exames oficiais de faixa</strong> ou avaliação presencial do Sensei.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          {!isCompleted ? (
            <>
              <div />
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isAnswered
                    ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Próxima Questão' : 'Finalizar Diagnóstico'}</span>
                <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={restart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <RotateCcw size={14} />
                <span>Refazer Diagnóstico</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Ir para o Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
