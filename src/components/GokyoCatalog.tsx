import React, { useState, useMemo } from 'react';
import { ALL_TECHNIQUES, TechniqueItem } from '../data/techniques';
import { VideoModal } from './VideoModal';
import { Search, Play, Filter, ExternalLink, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GokyoCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeTechnique, setActiveTechnique] = useState<TechniqueItem | null>(null);

  const categories = [
    'Todos',
    'Te-waza',
    'Koshi-waza',
    'Ashi-waza',
    'Ma-sutemi-waza',
    'Yoko-sutemi-waza',
    'Osaekomi-waza',
    'Shime-waza',
    'Kansetsu-waza',
    'Comparativos'
  ];

  const filteredTechniques = useMemo(() => {
    return ALL_TECHNIQUES.filter(tech => {
      const matchesSearch = 
        tech.namePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tech.gokyoGroup && tech.gokyoGroup.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'Todos' || 
        tech.category === selectedCategory ||
        (selectedCategory === 'Sutemi-waza' && (tech.category === 'Ma-sutemi-waza' || tech.category === 'Yoko-sutemi-waza'));

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Te-waza': return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border-emerald-500/30';
      case 'Koshi-waza': return 'bg-blue-500/15 text-blue-800 dark:text-blue-400 border-blue-500/30';
      case 'Ashi-waza': return 'bg-amber-500/15 text-amber-900 dark:text-amber-400 border-amber-500/30';
      case 'Ma-sutemi-waza':
      case 'Yoko-sutemi-waza': return 'bg-purple-500/15 text-purple-800 dark:text-purple-400 border-purple-500/30';
      case 'Osaekomi-waza': return 'bg-rose-500/15 text-rose-800 dark:text-rose-400 border-rose-500/30';
      case 'Shime-waza': return 'bg-orange-500/15 text-orange-800 dark:text-orange-400 border-orange-500/30';
      case 'Kansetsu-waza': return 'bg-red-500/15 text-red-800 dark:text-red-400 border-red-500/30';
      case 'Comparativos': return 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-400 border-cyan-500/30';
      default: return 'bg-zinc-500/15 text-zinc-800 dark:text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <section className="w-full my-8 flex flex-col gap-6" aria-label="Catálogo Geral do Kodokan Judo">
      {/* Barra de Filtros e Busca */}
      <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400" aria-hidden="true">
                <Video size={18} />
              </span>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight font-['Bebas_Neue',sans-serif]">
                Catálogo Oficial Kodokan Judo (139 Vídeos)
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Assista no aplicativo sem sair da página ou filtre por nome, kanji e categoria técnica.
            </p>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar golpe (ex: Seoi, 大外刈, Tai-otoshi)..."
              className="w-full pl-10 pr-16 py-3 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-inner"
              aria-label="Buscar golpes e técnicas no catálogo"
            />
            <Search className="absolute left-3.5 top-3.5 text-zinc-400 w-4 h-4 pointer-events-none" aria-hidden="true" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-2.5 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Limpar busca de técnicas"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Abas de Categorias / Tags */}
        <div 
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin"
          role="tablist"
          aria-label="Filtro por categoria de golpe"
        >
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter size={12} aria-hidden="true" /> Categoria:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 scale-105 font-black'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados de Contagem */}
      <div 
        className="flex items-center justify-between px-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400"
        aria-live="polite"
      >
        <span>Exibindo <strong>{filteredTechniques.length}</strong> de {ALL_TECHNIQUES.length} técnicas catalogadas</span>
        {selectedCategory !== 'Todos' && (
          <span className="text-amber-700 dark:text-amber-400 font-bold">Filtro ativo: {selectedCategory}</span>
        )}
      </div>

      {/* Grid de Cards de Técnicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredTechniques.map((tech) => (
            <motion.div
              key={tech.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${getCategoryColor(tech.category)}`}>
                    {tech.category}
                  </span>
                  {tech.gokyoGroup && (
                    <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 truncate max-w-[140px]" title={tech.gokyoGroup}>
                      {tech.gokyoGroup}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block font-mono">
                    {tech.japanese}
                  </span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-0.5 line-clamp-2">
                    {tech.namePt}
                  </h4>
                </div>

                {tech.description && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {tech.description}
                  </p>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                <button
                  onClick={() => setActiveTechnique(tech)}
                  aria-label={`Assistir vídeo no app de ${tech.namePt} (${tech.japanese})`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <Play size={14} className="fill-current" aria-hidden="true" />
                  Assistir no App
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${tech.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${tech.namePt} no YouTube em nova aba`}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  title="Abrir no YouTube (Apoio secundário)"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTechniques.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">Nenhum golpe encontrado para "{searchTerm}"</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Tente pesquisar pelo nome em japonês ou trocar o filtro de categoria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} 
            className="mt-4 px-5 py-2.5 bg-amber-500 text-zinc-950 font-black text-xs rounded-xl shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Resetar Filtros
          </button>
        </div>
      )}

      {/* Modal de Vídeo Interativo */}
      {activeTechnique && (
        <VideoModal
          isOpen={!!activeTechnique}
          onClose={() => setActiveTechnique(null)}
          title={activeTechnique.namePt}
          japaneseName={activeTechnique.japanese}
          category={activeTechnique.category}
          videoId={activeTechnique.videoId}
          description={activeTechnique.description}
        />
      )}
    </section>
  );
};
