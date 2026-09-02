import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, BookOpen, ShieldCheck, Check, Video, ChevronRight, Play } from 'lucide-react';
import { OFFICIAL_KATAS } from '../data/katasData';
import { KataBlock, KataStep } from '../types';

interface KatasViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KatasViewModal: React.FC<KatasViewModalProps> = ({ isOpen, onClose }) => {
  const [selectedKataIndex, setSelectedKataIndex] = useState(0);
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [repCount, setRepCount] = useState<Record<string, number>>({});
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentKata = OFFICIAL_KATAS[selectedKataIndex];
  const currentStep = currentKata.steps[selectedStepIndex];
  const stepKey = `${currentKata.id}-${selectedStepIndex}`;

  const incrementRep = () => {
    setRepCount((prev) => ({
      ...prev,
      [stepKey]: (prev[stepKey] || 0) + 1
    }));
  };

  const toggleChecklist = (point: string) => {
    const key = `${stepKey}-${point}`;
    setCompletedChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="katas-modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <BookOpen size={18} />
            </span>
            <div className="min-w-0">
              <h3 id="katas-modal-title" className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">
                Katas Oficiais Kodokan (Estudo Sequencial)
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate">
                Formas clássicas, biomecânica estrita e sincronia Tori / Uke
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Seletor de Kata */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {OFFICIAL_KATAS.map((kata, idx) => (
              <button
                key={kata.id}
                onClick={() => {
                  setSelectedKataIndex(idx);
                  setSelectedStepIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedKataIndex === idx
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {kata.seriesName}
              </button>
            ))}
          </div>

          {/* Banner do Kata Selecionado */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {currentKata.kataName}
              </span>
              <h4 className="text-base font-bold text-zinc-900 dark:text-white">{currentKata.seriesName}</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{currentKata.objective}</p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-zinc-500 block">Etiqueta & Entrada:</span>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{currentKata.etiquette}</span>
            </div>
          </div>

          {/* Seletor de Técnicas do Kata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentKata.steps.map((st, sIdx) => {
              const active = selectedStepIndex === sIdx;
              const k = `${currentKata.id}-${sIdx}`;
              const reps = repCount[k] || 0;
              return (
                <button
                  key={sIdx}
                  onClick={() => setSelectedStepIndex(sIdx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    active
                      ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white'
                      : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">
                      {st.stepNumber}º Movimento
                    </span>
                    <h5 className="text-xs font-bold text-zinc-900 dark:text-white mt-1">{st.name}</h5>
                    <span className="text-[11px] text-zinc-400 font-serif">{st.japanese}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                    <span>{reps} repetições</span>
                    <ChevronRight size={12} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detalhe do Movimento Ativo */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Papel do Tori */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 inline-block">
                  Ação do Tori (Atacante / Executor)
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{currentStep.toriRole}</p>
              </div>

              {/* Papel do Uke */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-700 dark:text-sky-300 inline-block">
                  Ação do Uke (Receptor / Ataque inicial)
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{currentStep.ukeRole}</p>
              </div>
            </div>

            {/* Checklist de Pontos Críticos e Repetições */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                  Critérios de Avaliação do Movimento
                </h5>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    Treino Mental / Repetições: <strong>{repCount[stepKey] || 0}</strong>
                  </span>
                  <button
                    onClick={incrementRep}
                    className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-sm"
                  >
                    +1 Repetição
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {currentStep.keyPoints.map((point, pIdx) => {
                  const checkKey = `${stepKey}-${point}`;
                  const isChecked = !!completedChecklist[checkKey];
                  return (
                    <div
                      key={pIdx}
                      onClick={() => toggleChecklist(point)}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer text-xs"
                    >
                      <span className={isChecked ? 'line-through text-zinc-400' : 'text-zinc-800 dark:text-zinc-200'}>
                        {point}
                      </span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-400'}`}>
                        {isChecked && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Erros e Segurança */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
                <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Atenção à Segurança do Uke:
                </p>
                <p>{currentStep.safetyNote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 text-xs text-zinc-500">
          <span>Referência: {currentKata.officialReference}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700"
          >
            Concluir Estudo
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
