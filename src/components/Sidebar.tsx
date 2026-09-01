import { Link, useLocation } from 'react-router-dom';
import { allChapters, modules } from '../data/chapters';
import { cn } from '../lib/utils';
import { BookOpen, CheckCircle2, ChevronRight, Circle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';

export function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const location = useLocation();
  const { completedChapters, getProgressPercentage } = useProgress();
  const progress = getProgressPercentage(allChapters.length);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-24 items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)}>
            <img src="/LOGO 1.png" alt="Logo" className="h-14 w-auto object-contain" onError={(e) => {
              // Fallback to icon if image is not found
              (e.target as HTMLElement).style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <div className="hidden w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <BookOpen size={20} />
            </div>
            Dojo Digital
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
          {modules.map((module) => (
            <div key={module.id}>
              <h3 className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-amber-500">
                {module.title}
              </h3>
              <ul className="space-y-1 px-1">
                {module.chapters.map((chapter) => {
                  const isActive = location.pathname === `/capitulo/${chapter.slug}`;
                  const isCompleted = completedChapters.includes(chapter.slug);
                  
                  return (
                    <li key={chapter.id}>
                      <Link
                        to={`/capitulo/${chapter.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
                          isActive
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-amber-400 font-bold'
                            : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                          ) : (
                            <Circle size={16} className={cn("shrink-0", isActive ? "text-blue-300 dark:text-blue-500/50" : "text-zinc-300 dark:text-zinc-700")} />
                          )}
                          <span className="line-clamp-1">{chapter.title}</span>
                        </div>
                        {isActive && <ChevronRight size={16} className="shrink-0" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Seu Progresso</span>
            <span className="text-xs font-bold text-blue-600 dark:text-amber-500">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 dark:bg-amber-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 text-center">
            {completedChapters.length} de {allChapters.length} aulas concluídas
          </p>
        </div>
      </aside>
    </>
  );
}
