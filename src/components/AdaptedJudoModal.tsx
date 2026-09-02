import React, { useState } from 'react';
import { X, HeartPulse, ShieldAlert, Sparkles, CheckCircle2, Activity, Users } from 'lucide-react';
import { ADAPTED_JUDO_TOPICS } from '../data/adaptedJudoData';

interface AdaptedJudoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdaptedJudoModal: React.FC<AdaptedJudoModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(ADAPTED_JUDO_TOPICS[0].id);

  if (!isOpen) return null;

  const currentTopic = ADAPTED_JUDO_TOPICS.find((t) => t.id === selectedTopicId) || ADAPTED_JUDO_TOPICS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adapted-judo-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <HeartPulse size={18} />
            </span>
            <div>
              <h3 id="adapted-judo-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Judô Longevidade, Masters (40+) & Inclusão Motora
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Prática adaptada, biomecânica consciente e diretrizes de saúde
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

        {/* Topic Selector */}
        <div className="flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {ADAPTED_JUDO_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTopicId === topic.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {topic.title.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Público-Alvo: {currentTopic.targetAudience}
            </span>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">{currentTopic.title}</h4>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {currentTopic.description}
            </p>
          </div>

          {/* Diretrizes de Segurança */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Activity size={15} className="text-emerald-500" />
              Diretrizes de Segurança & Preservação Articular
            </h5>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {currentTopic.safetyGuidelines.map((g, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exercícios Chave */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-zinc-500">
              Exercícios Recomendados na Prática Adaptada
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentTopic.keyExercises.map((ex, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <h6 className="text-xs font-bold text-zinc-900 dark:text-white">{ex.name}</h6>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                      Foco: {ex.focus}
                    </span>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-normal">{ex.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Médico Obrigatório */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
            <ShieldAlert size={18} className="shrink-0 mt-0.5 text-rose-600" />
            <div>
              <strong className="block font-bold mb-0.5">Aviso Médico & Pedagógico:</strong>
              {currentTopic.medicalDisclaimer}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
