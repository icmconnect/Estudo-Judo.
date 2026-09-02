import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, FileText, Video, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { allChapters } from '../data/chapters';
import { ALL_TECHNIQUES, TechniqueItem } from '../data/techniques';
import { useNavigate } from 'react-router-dom';
import { VideoModal } from './VideoModal';

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<TechniqueItem | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChapters = query.trim().length > 1
    ? allChapters.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) || 
        c.content.toLowerCase().includes(query.toLowerCase()) ||
        (c.summary && c.summary.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredTechniques = query.trim().length > 1
    ? ALL_TECHNIQUES.filter(t => 
        t.namePt.toLowerCase().includes(query.toLowerCase()) ||
        t.japanese.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        (t.gokyoGroup && t.gokyoGroup.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  const hasResults = filteredChapters.length > 0 || filteredTechniques.length > 0;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 bg-black/75 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Pesquisar aulas e técnicas do Kodokan Judo"
      >
        <div 
          className="fixed inset-0 cursor-pointer" 
          onClick={onClose} 
          aria-hidden="true" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[80vh] z-10"
        >
          {/* Campo de Busca */}
          <div className="flex items-center px-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50/70 dark:bg-zinc-900/50">
            <Search className="text-amber-500 shrink-0" size={20} aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent px-4 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none text-base font-medium"
              placeholder="Pesquise por golpe, kata, história ou conceito..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Digite termos para buscar aulas e técnicas"
            />
            {query && (
              <button 
                onClick={() => setQuery('')} 
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-lg mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Limpar texto pesquisado"
              >
                Limpar
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Fechar janela de pesquisa"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          
          {/* Resultados */}
          <div className="overflow-y-auto p-4 space-y-5" tabIndex={0} aria-label="Resultados da pesquisa">
            {query.trim().length <= 1 ? (
              <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 text-xs flex flex-col items-center gap-2">
                <Search size={28} className="text-zinc-400 dark:text-zinc-600" aria-hidden="true" />
                <p>Digite pelo menos 2 caracteres para pesquisar em todos os módulos e nos 139 golpes do Gokyo.</p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  <button 
                    type="button"
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-amber-500 hover:text-zinc-950 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                    onClick={() => setQuery('Seoi')}
                  >
                    Seoi-nage
                  </button>
                  <button 
                    type="button"
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-amber-500 hover:text-zinc-950 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                    onClick={() => setQuery('O-soto')}
                  >
                    O-soto-gari
                  </button>
                  <button 
                    type="button"
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-amber-500 hover:text-zinc-950 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                    onClick={() => setQuery('Jigoro')}
                  >
                    Jigoro Kano
                  </button>
                  <button 
                    type="button"
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-amber-500 hover:text-zinc-950 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                    onClick={() => setQuery('Ukemi')}
                  >
                    Ukemi
                  </button>
                </div>
              </div>
            ) : hasResults ? (
              <>
                {/* Seção de Aulas */}
                {filteredChapters.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                      <FileText size={13} aria-hidden="true" />
                      Aulas e Capítulos ({filteredChapters.length})
                    </h4>
                    <ul className="space-y-1" role="list">
                      {filteredChapters.map((chapter) => (
                        <li key={chapter.id}>
                          <button
                            className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            onClick={() => {
                              navigate(`/capitulo/${chapter.slug}`);
                              onClose();
                            }}
                            aria-label={`Abrir aula: ${chapter.title}`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                                <FileText size={16} />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                  {chapter.title}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                  {chapter.summary || `Abrir aula completa`}
                                </div>
                              </div>
                            </div>
                            <ArrowRight size={16} className="text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Seção de Técnicas / Golpes */}
                {filteredTechniques.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                      <Video size={13} aria-hidden="true" />
                      Técnicas e Golpes do Kodokan ({filteredTechniques.length})
                    </h4>
                    <ul className="space-y-1" role="list">
                      {filteredTechniques.map((tech) => (
                        <li key={tech.id}>
                          <button
                            className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            onClick={() => setSelectedTech(tech)}
                            aria-label={`Assistir vídeo técnico de ${tech.namePt} (${tech.japanese})`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                                <Play size={14} className="fill-current" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                  {tech.namePt}
                                </div>
                                <div className="text-xs text-amber-700 dark:text-amber-400 font-mono truncate">
                                  {tech.japanese} • <span className="text-zinc-500 dark:text-zinc-400">{tech.category}</span>
                                </div>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 bg-amber-500 text-zinc-950 text-[10px] font-black rounded-lg shrink-0 group-hover:scale-105 transition-transform" aria-hidden="true">
                              Assistir
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                Nenhum conteúdo encontrado para <strong className="text-zinc-800 dark:text-zinc-200">"{query}"</strong>.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal de Vídeo quando clicado na busca */}
      {selectedTech && (
        <VideoModal
          isOpen={!!selectedTech}
          onClose={() => setSelectedTech(null)}
          title={selectedTech.namePt}
          japaneseName={selectedTech.japanese}
          category={selectedTech.category}
          videoId={selectedTech.videoId}
          description={selectedTech.description}
        />
      )}
    </>,
    document.body
  );
}
