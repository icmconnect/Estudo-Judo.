import React, { useState } from 'react';
import { X, Search, Volume2, BookA, Sparkles, Filter } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { useAccessibility } from '../hooks/useAccessibility';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const { speakText } = useAccessibility();

  if (!isOpen) return null;

  const categories: { id: string; label: string }[] = [
    { id: 'todos', label: 'Todos os Termos' },
    { id: 'saudacao', label: 'Saudações' },
    { id: 'dojo', label: 'Dojô & Ambiente' },
    { id: 'postura', label: 'Postura & Movimento' },
    { id: 'kumikata', label: 'Pegadas' },
    { id: 'fundamentos', label: 'Projeção & Solo' },
    { id: 'arbitragem', label: 'Arbitragem' },
    { id: 'filosofia', label: 'Filosofia & Budo' }
  ];

  const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const normSearch = normalize(searchTerm);
    const matchesSearch =
      normalize(term.romaji).includes(normSearch) ||
      normalize(term.portuguese).includes(normSearch) ||
      normalize(term.definition).includes(normSearch);

    let matchesCat = true;
    if (selectedCategory !== 'todos') {
      const normCat = normalize(term.category);
      if (selectedCategory === 'saudacao') matchesCat = normCat.includes('saudacao');
      else if (selectedCategory === 'dojo') matchesCat = normCat.includes('dojo');
      else if (selectedCategory === 'postura') matchesCat = normCat.includes('postura') || normCat.includes('movimentacao');
      else if (selectedCategory === 'kumikata') matchesCat = normCat.includes('pegada');
      else if (selectedCategory === 'fundamentos') matchesCat = normCat.includes('projecao') || normCat.includes('solo');
      else if (selectedCategory === 'arbitragem') matchesCat = normCat.includes('arbitragem');
      else if (selectedCategory === 'filosofia') matchesCat = normCat.includes('filosofia');
    }

    return matchesSearch && matchesCat;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookA size={18} />
            </span>
            <div>
              <h3 id="glossary-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Glossário Oficial de Termos em Japonês (Kodokan)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Pronúncia em áudio, Kanji, Romaji, tradução e aplicação prática
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

        {/* Search and Category Filters */}
        <div className="p-6 pb-3 space-y-4 shrink-0 bg-white dark:bg-zinc-950">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo em japonês ou português (ex: Rei, Kuzushi, Ippon, Seoi-nage)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-zinc-950 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of Terms */}
        <div className="p-6 pt-2 overflow-y-auto flex-1">
          {filteredTerms.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs">
              Nenhum termo encontrado com os filtros atuais.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredTerms.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-zinc-900 dark:text-white">{t.romaji}</h4>
                          <span className="text-base font-medium text-amber-600 dark:text-amber-400 font-serif">
                            {t.kanji}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {t.portuguese}
                        </p>
                      </div>

                      <button
                        onClick={() => speakText(t.romaji)}
                        className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shrink-0"
                        title="Ouvir Pronúncia"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                      {t.definition}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-500">
                    <strong className="text-zinc-700 dark:text-zinc-300 font-semibold block mb-0.5">
                      Aplicação Prática no Tatame:
                    </strong>
                    {t.practicalExample}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 text-xs text-zinc-500">
          <span>{filteredTerms.length} termos catalogados com fonética oficial</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
