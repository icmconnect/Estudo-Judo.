import React from 'react';
import { X, ShieldCheck, ExternalLink, BookOpen, Scale, Award } from 'lucide-react';
import { EDITORIAL_SOURCES } from '../data/editorialSources';

interface SourcesGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesGovernanceModal: React.FC<SourcesGovernanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sources-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={18} />
            </span>
            <div>
              <h3 id="sources-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Governança Editorial & Fontes Oficiais
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Padrões canônicos de referência técnica, biomecânica e pedagógica
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
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Compromisso com a Tradição e a Segurança
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Todo o conteúdo teórico, biomecânico e regulamentar do Dojo Digital é rigorosamente fundamentado nas publicações e diretrizes dos órgãos máximos do Judô mundial e nacional.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
              Matriz de Fontes Canônicas Catalogadas
            </h4>

            {EDITORIAL_SOURCES.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                      {src.entity}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                      {src.title}
                    </h5>
                  </div>
                  <span className="text-[11px] text-zinc-400 shrink-0 font-medium">
                    {src.version} ({src.publicationYear})
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {src.notes}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[11px] text-zinc-500">
                  <span>Revisado em: {src.lastVerifiedDate}</span>
                  <a
                    href={src.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>Acessar portal oficial</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Declaração de Direitos e Responsabilidade */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
            <strong className="text-amber-800 dark:text-amber-400 block font-bold">
              Nota sobre Direitos Autorais e Marca:
            </strong>
            <p className="text-[11px] leading-relaxed">
              O Dojo Digital respeita os direitos de propriedade intelectual. Os termos e nomenclaturas clássicas em língua japonesa são patrimônio imaterial desportivo originado pelo Instituto Kodokan (Tóquio, Japão) em 1882.
            </p>
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
