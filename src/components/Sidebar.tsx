import { Link, useLocation } from 'react-router-dom';
import { allChapters, modules } from '../data/chapters';
import { cn } from '../lib/utils';
import { CheckCircle2, ChevronRight, Circle, X, Award, Bookmark, ShieldCheck, GraduationCap, Lock, CreditCard, Users } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Logo } from './Logo';
import { useEffect } from 'react';

export function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const location = useLocation();
  const { completedChapters, getProgressPercentage } = useProgress();
  const { isFree, checkCanAccessContent, isAdmin } = useSubscription();
  const progress = getProgressPercentage(allChapters.length);

  // Fechar sidebar mobile ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="course-navigation-sidebar"
        aria-label="Navegação de aulas e módulos do curso"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 lg:w-80 transform overflow-y-auto bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header da Sidebar */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800/80 shrink-0 bg-zinc-50/70 dark:bg-zinc-900/40">
          <Link 
            to="/" 
            className="flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
            onClick={() => setIsOpen(false)}
            aria-label="Página inicial do Dojo Digital"
          >
            <Logo size="sm" showSubtitle={true} />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Fechar menu lateral"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Lista de Aulas e Módulos */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto" aria-label="Lista de módulos do curso">
          
          {/* Links Destacados */}
          <div className="px-1 space-y-2">
            <Link
              to="/formacao-teorica"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-200 group border',
                location.pathname.startsWith('/formacao-teorica')
                  ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:border-emerald-500/60'
              )}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={17} className={location.pathname.startsWith('/formacao-teorica') ? 'text-zinc-950' : 'text-emerald-600 dark:text-emerald-400'} />
                <span>Formação Teórica</span>
              </div>
              <span className={cn(
                "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                location.pathname.startsWith('/formacao-teorica') ? "bg-zinc-950/20 text-zinc-950" : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              )}>7 Trilhas</span>
            </Link>

            <Link
              to="/caderno-tecnico"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 group border',
                location.pathname === '/caderno-tecnico'
                  ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-900/80 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:border-amber-500/60'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark size={15} className={location.pathname === '/caderno-tecnico' ? 'text-zinc-950' : 'text-amber-500'} />
                <span>Meu Caderno Técnico</span>
              </div>
              <ChevronRight size={14} className={location.pathname === '/caderno-tecnico' ? 'text-zinc-950' : 'text-zinc-400'} />
            </Link>

            <Link
              to="/minha-assinatura"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center justify-between rounded-xl px-3.5 py-2 text-[11px] font-bold transition-all duration-200 group border',
                location.pathname === '/minha-assinatura'
                  ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md'
                  : 'bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-amber-500'
              )}
            >
              <div className="flex items-center gap-2">
                <CreditCard size={14} className={location.pathname === '/minha-assinatura' ? 'text-zinc-950' : 'text-amber-500'} />
                <span>Minha Assinatura</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                {isFree ? 'Free' : 'Fundador'}
              </span>
            </Link>

            {isAdmin && (
              <>
                <Link
                  to="/admin/pagamentos"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3.5 py-2 text-[11px] font-bold transition-all duration-200 group border',
                    location.pathname === '/admin/pagamentos'
                      ? 'bg-zinc-800 text-amber-400 border-amber-500/50 shadow-md'
                      : 'bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-amber-500'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-amber-500" />
                    <span>Painel Admin Pagamentos</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Admin</span>
                </Link>

                <Link
                  to="/admin/alunos"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3.5 py-2 text-[11px] font-bold transition-all duration-200 group border',
                    location.pathname === '/admin/alunos'
                      ? 'bg-zinc-800 text-amber-400 border-amber-500/50 shadow-md'
                      : 'bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-amber-500'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-amber-500" />
                    <span>Acompanhar Alunos</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Admin</span>
                </Link>
              </>
            )}
          </div>

          {modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {module.title}
                </span>
                <span 
                  className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400"
                  aria-label={`${module.chapters.filter(c => completedChapters.includes(c.slug)).length} de ${module.chapters.length} concluídas`}
                >
                  {module.chapters.filter(c => completedChapters.includes(c.slug)).length}/{module.chapters.length}
                </span>
              </div>

              <ul className="space-y-1" role="list">
                {module.chapters.map((chapter) => {
                  const isActive = location.pathname === `/capitulo/${chapter.slug}`;
                  const isCompleted = completedChapters.includes(chapter.slug);
                  const isLocked = isFree && !checkCanAccessContent('chapter', chapter.slug);
                  
                  return (
                    <li key={chapter.id}>
                      <Link
                        to={`/capitulo/${chapter.slug}`}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                          isActive
                            ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/20 scale-[1.02]'
                            : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 
                              size={16} 
                              className={cn("shrink-0", isActive ? "text-zinc-950" : "text-emerald-600 dark:text-emerald-400")} 
                              aria-label="Aula concluída"
                            />
                          ) : isLocked ? (
                            <Lock 
                              size={14} 
                              className={cn("shrink-0", isActive ? "text-zinc-950" : "text-amber-500/80")} 
                              aria-label="Conteúdo exclusivo"
                            />
                          ) : (
                            <Circle 
                              size={15} 
                              className={cn("shrink-0", isActive ? "text-zinc-950" : "text-zinc-400 dark:text-zinc-600")} 
                              aria-label="Aula pendente"
                            />
                          )}
                          <span className="truncate">{chapter.title}</span>
                        </div>
                        {isActive && <ChevronRight size={14} className="shrink-0 text-zinc-950" aria-hidden="true" />}
                        {isLocked && !isActive && (
                          <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                            PRO
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Card de Progresso do Aluno */}
        <div 
          className="p-5 border-t border-zinc-200 dark:border-zinc-800/80 shrink-0 bg-zinc-50/80 dark:bg-zinc-900/50"
          aria-label="Resumo de progresso do aluno"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award size={14} className="text-amber-500" aria-hidden="true" />
              Progresso Geral
            </span>
            <span className="text-xs font-black text-amber-700 dark:text-amber-400">{progress}%</span>
          </div>

          <div 
            className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso geral do curso: ${progress}% concluído`}
          >
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ease-out rounded-full shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2.5 text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>{completedChapters.length} de {allChapters.length} aulas concluídas</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {progress === 100 ? '🎉 100% Concluído!' : 'Em andamento'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

