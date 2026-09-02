import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Bookmark,
  FileText,
  RotateCcw,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  Eye,
  ChevronRight
} from 'lucide-react';
import { ALL_TECHNIQUES } from '../data/techniques';
import { DETAILED_TECHNIQUES, getDetailedSheet } from '../data/detailedTechniques';
import { useReviewSystem } from '../hooks/useReviewSystem';
import { VideoModal } from './VideoModal';

export const TechnicalNotebook: React.FC = () => {
  const { favorites, toggleFavorite, notes, saveNote, reviews } = useReviewSystem();

  const [activeTab, setActiveTab] = useState<'favorites' | 'notes' | 'flashcards' | 'reviews'>('favorites');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');

  // Estado para Modal de Vídeo/Ficha
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Estados para Flashcards
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [showFcAnswer, setShowFcAnswer] = useState(false);

  // Estado para edição de nota rápida
  const [editingTechId, setEditingTechId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // Filtro geral de técnicas
  const filteredTechniques = useMemo(() => {
    return ALL_TECHNIQUES.filter((tech) => {
      const isFav = favorites.includes(tech.id);
      const hasNote = Boolean(notes[tech.id] && notes[tech.id].trim().length > 0);

      if (activeTab === 'favorites' && !isFav) return false;
      if (activeTab === 'notes' && !hasNote) return false;

      // Filtro por Categoria
      if (selectedCategory !== 'Todas' && tech.category !== selectedCategory) {
        return false;
      }

      // Filtro por Nível Pedagógico
      if (selectedLevel !== 'Todos') {
        const sheet = getDetailedSheet(tech.id, tech.namePt, tech.category);
        if (sheet.pedagogicalLevel && !sheet.pedagogicalLevel.includes(selectedLevel)) {
          return false;
        }
      }

      // Filtro por busca
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = tech.namePt.toLowerCase().includes(query) || tech.japanese.toLowerCase().includes(query);
        const matchesNote = notes[tech.id]?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesNote) return false;
      }

      return true;
    });
  }, [activeTab, favorites, notes, selectedCategory, selectedLevel, searchQuery]);

  // Lista de Flashcards agregada de todas as técnicas com ficha detalhada
  const allFlashcards = useMemo(() => {
    const cards: { techId: string; techName: string; question: string; answer: string; hint?: string }[] = [];
    Object.entries(DETAILED_TECHNIQUES).forEach(([techId, sheet]) => {
      const tech = ALL_TECHNIQUES.find((t) => t.id === techId);
      const name = tech ? tech.namePt : techId;
      if (sheet.flashcards && sheet.flashcards.length > 0) {
        sheet.flashcards.forEach((fc) => {
          cards.push({
            techId,
            techName: name,
            question: fc.question,
            answer: fc.answer,
            hint: fc.hint,
          });
        });
      }
    });
    return cards;
  }, []);

  // Exportar caderno em formato Markdown
  const handleExportNotebook = () => {
    let md = `# Meu Caderno Técnico - Dojo Digital Judô\n`;
    md += `*Exportado em: ${new Date().toLocaleDateString('pt-BR')}*\n\n`;

    md += `## 1. Técnicas Favoritadas\n`;
    favorites.forEach((favId) => {
      const tech = ALL_TECHNIQUES.find((t) => t.id === favId);
      if (tech) {
        md += `- **${tech.japanese}** (${tech.namePt}) [${tech.category}]\n`;
        if (notes[favId]) {
          md += `  > *Minha Anotação:* ${notes[favId]}\n`;
        }
      }
    });

    md += `\n## 2. Minhas Anotações Técnicas\n`;
    Object.entries(notes).forEach(([techId, noteText]) => {
      if (noteText.trim().length > 0) {
        const tech = ALL_TECHNIQUES.find((t) => t.id === techId);
        md += `### ${tech ? tech.namePt : techId}\n`;
        md += `${noteText}\n\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meu_caderno_tecnico_judo_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartEditingNote = (techId: string) => {
    setEditingTechId(techId);
    setEditingNoteText(notes[techId] || '');
  };

  const handleSaveEditingNote = (techId: string) => {
    saveNote(techId, editingNoteText);
    setEditingTechId(null);
  };

  const currentFlashcard = allFlashcards[currentFcIndex];

  return (
    <div className="w-full flex flex-col gap-6 my-6">
      
      {/* Banner de Apresentação do Caderno */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen size={14} />
              <span>Estudo Pessoal e Caderno do Praticante</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue',sans-serif] tracking-wide">
              Meu Caderno Técnico de Judô
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mt-2">
              Organize suas técnicas favoritadas, registre observações do Sensei, revise os 3 pilares (Kuzushi, Tsukuri, Kake) e acompanhe seu diário de estudo técnico.
            </p>
          </div>

          <button
            onClick={handleExportNotebook}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
          >
            <Download size={16} />
            <span>Exportar Caderno (Markdown)</span>
          </button>
        </div>
      </div>

      {/* Navegação por Abas do Caderno */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <Bookmark size={16} />
          <span>Técnicas Favoritas ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <FileText size={16} />
          <span>Anotações Pessoais ({Object.keys(notes).filter((k) => notes[k]?.trim()).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <RotateCcw size={16} />
          <span>Flashcards & Spaced Review ({allFlashcards.length})</span>
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      {activeTab !== 'flashcards' && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome em português, romaji ou anotação..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-zinc-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
              >
                <option value="Todas">Todas as Categorias</option>
                <option value="Ashi-waza">Ashi-waza (Pernas)</option>
                <option value="Koshi-waza">Koshi-waza (Quadril)</option>
                <option value="Te-waza">Te-waza (Braços)</option>
                <option value="Ma-sutemi-waza">Ma-sutemi-waza (Sacrifício Frontal)</option>
                <option value="Yoko-sutemi-waza">Yoko-sutemi-waza (Sacrifício Lateral)</option>
                <option value="Osaekomi-waza">Osaekomi-waza (Imobilização)</option>
              </select>
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
            >
              <option value="Todos">Todos os Níveis</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>
      )}

      {/* Conteúdo das Abas */}
      {activeTab === 'flashcards' ? (
        /* ABA FLASHCARDS */
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center justify-center text-center min-h-[350px]">
          {allFlashcards.length > 0 && currentFlashcard ? (
            <div className="w-full max-w-xl space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                <span>{currentFlashcard.techName}</span>
                <span>Cartão {currentFcIndex + 1} de {allFlashcards.length}</span>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner min-h-[160px] flex flex-col items-center justify-center">
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentFlashcard.question}
                </h3>

                {showFcAnswer ? (
                  <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-emerald-300 font-medium leading-relaxed animate-fade-in">
                    {currentFlashcard.answer}
                  </div>
                ) : (
                  currentFlashcard.hint && (
                    <p className="mt-3 text-xs text-zinc-500 italic">
                      Dica: {currentFlashcard.hint}
                    </p>
                  )
                )}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setShowFcAnswer(!showFcAnswer)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {showFcAnswer ? 'Ocultar Resposta' : 'Revelar Resposta'}
                </button>

                <button
                  onClick={() => {
                    setShowFcAnswer(false);
                    setCurrentFcIndex((prev) => (prev + 1) % allFlashcards.length);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Próximo Cartão</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 text-sm">Nenhum flashcard cadastrado para o filtro atual.</p>
          )}
        </div>
      ) : (
        /* ABA FAVORITOS & ANOTAÇÕES */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechniques.length > 0 ? (
            filteredTechniques.map((tech) => {
              const isFav = favorites.includes(tech.id);
              const noteText = notes[tech.id] || '';
              const sheet = getDetailedSheet(tech.id, tech.namePt, tech.category);

              return (
                <div
                  key={tech.id}
                  className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                        {tech.category}
                      </span>
                      <button
                        onClick={() => toggleFavorite(tech.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFav ? 'text-amber-400 bg-amber-500/10' : 'text-zinc-600 hover:text-zinc-300'
                        }`}
                        title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      >
                        <Bookmark size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {tech.namePt}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{tech.japanese}</p>

                    {sheet.pedagogicalLevel && (
                      <span className="inline-block text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded mt-2">
                        {sheet.pedagogicalLevel}
                      </span>
                    )}

                    {/* Bloco de Anotação do Aluno */}
                    <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                      <div className="flex items-center justify-between text-zinc-400 mb-1 font-bold">
                        <span>Anotação Técnica:</span>
                        <button
                          onClick={() => handleStartEditingNote(tech.id)}
                          className="text-amber-400 hover:underline text-[11px] cursor-pointer"
                        >
                          {noteText ? 'Editar' : 'Escrever'}
                        </button>
                      </div>

                      {editingTechId === tech.id ? (
                        <div className="space-y-2 mt-2">
                          <textarea
                            value={editingNoteText}
                            onChange={(e) => setEditingNoteText(e.target.value)}
                            placeholder="Escreva dicas do Sensei, correções de postura ou sensações de treino..."
                            className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500 min-h-[60px]"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleSaveEditingNote(tech.id)}
                              className="px-2.5 py-1 rounded bg-amber-500 text-zinc-950 text-[11px] font-bold cursor-pointer"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={() => setEditingTechId(null)}
                              className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-[11px] cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-zinc-300 italic leading-relaxed">
                          {noteText || 'Nenhuma anotação registrada ainda.'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideoModal(tech.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>Ver Ficha & Vídeo</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-12 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm">
              <BookOpen size={32} className="mx-auto mb-3 text-zinc-600" />
              <p>Nenhuma técnica encontrada para os filtros selecionados.</p>
              {activeTab === 'favorites' && (
                <p className="text-xs text-zinc-500 mt-1">
                  Vá até o Catálogo Gokyo para favoritar suas primeiras técnicas!
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal de Vídeo & Ficha Técnica */}
      {activeVideoModal && (() => {
        const modalTech = ALL_TECHNIQUES.find((t) => t.id === activeVideoModal);
        return (
          <VideoModal
            techId={activeVideoModal}
            isOpen={true}
            onClose={() => setActiveVideoModal(null)}
            title={modalTech?.namePt || 'Ficha Técnica de Judô'}
            japaneseName={modalTech?.japanese}
            category={modalTech?.category}
            videoId={modalTech?.videoId || 'l25Y16e_pL4'}
          />
        );
      })()}

    </div>
  );
};
