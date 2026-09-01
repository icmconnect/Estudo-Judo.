import { useState, useEffect } from 'react';
import { Search, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allChapters } from '../data/chapters';
import { useNavigate } from 'react-router-dom';

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.length > 2
    ? allChapters.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) || 
        c.content.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="text-slate-400" size={20} />
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent px-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            placeholder="Buscar no manual de Judô..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={20} />
          </button>
        </div>
        
        {query.length > 2 && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((chapter) => (
                  <li key={chapter.id}>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-left transition-colors"
                      onClick={() => {
                        navigate(`/capitulo/${chapter.slug}`);
                        onClose();
                      }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <FileText size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{chapter.title}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                          Encontrado no capítulo de {chapter.title.toLowerCase()}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                Nenhum resultado encontrado para "{query}"
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
