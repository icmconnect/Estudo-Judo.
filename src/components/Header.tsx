import { Menu, Moon, Search, Sun, Compass, Bookmark, HardDrive, GraduationCap, Sparkles, ShieldCheck, LogOut, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchModal } from './SearchModal';
import { Logo } from './Logo';
import { InstallAppButton } from './InstallAppButton';
import { useTheme } from '../hooks/useTheme';
import { APP_STORAGE_MODE } from '../repositories';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { useWelcomeGuide } from '../hooks/useWelcomeGuide';

export function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (v: boolean) => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const { isActive, isFree } = useSubscription();
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const { openGuide } = useWelcomeGuide();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getFirstName = (name: string | null) => {
    if (!name) return '';
    return name.split(' ')[0];
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'DD';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header 
        role="banner"
        className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-2 xs:px-4 lg:px-8 shrink-0 transition-colors"
      >
        <div className="flex items-center gap-1 xs:gap-3 shrink min-w-0">
          <div className="flex items-center gap-3 shrink min-w-0">
            <div className="shrink min-w-0 scale-90 xs:scale-100 origin-left">
              <Logo size="sm" showSubtitle={false} />
            </div>
            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 shrink-0">
              <Link
                to="/formacao-teorica"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-bold transition-all"
              >
                <GraduationCap size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>Formação Teórica</span>
              </Link>
              <Link
                to="/caderno-tecnico"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950 font-bold transition-all"
              >
                <Bookmark size={13} />
                <span>Caderno Técnico</span>
              </Link>

              {isFree ? (
                <Link
                  to="/planos"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs shadow-sm hover:bg-amber-400 transition-all"
                >
                  <Sparkles size={13} />
                  <span>Liberar R$ 97</span>
                </Link>
              ) : (
                <Link
                  to="/minha-assinatura"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:border-amber-500/50 transition-all"
                >
                  <ShieldCheck size={13} className="text-emerald-500" />
                  <span>Acesso Completo</span>
                </Link>
              )}
            </div>
          </div>
        </div>


        
        <div className="flex items-center gap-2 sm:gap-4 shrink min-w-0">
          {/* Caixa de Busca com atalho Ctrl+K */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between w-64 md:w-80 pl-10 pr-3 py-2.5 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs text-zinc-600 dark:text-zinc-400 transition-all text-left shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 cursor-pointer"
              aria-label="Pesquisar aulas ou técnicas. Pressione Ctrl K para abrir"
            >
              <span className="truncate group-hover:text-zinc-900 dark:group-hover:text-zinc-200 font-medium">
                Pesquisar aulas ou técnicas...
              </span>
              <kbd 
                className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-2xs"
                aria-hidden="true"
              >
                Ctrl K
              </kbd>
            </button>
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400 pointer-events-none" aria-hidden="true" />
          </div>

          <button 
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
            aria-label="Abrir pesquisa de aulas e técnicas"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          
          <InstallAppButton />

          <div className="flex items-center gap-1 sm:gap-2 sm:gap-3 border-l pl-2 sm:pl-3 sm:pl-4 border-zinc-200 dark:border-zinc-800 shrink-0">
            {user && (
              <button
                onClick={openGuide}
                className="p-2 sm:p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer shrink-0"
                aria-label="Ver guia inicial novamente"
                title="Ajuda e Guia Inicial"
              >
                <HelpCircle size={20} aria-hidden="true" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer shrink-0"
              aria-label={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
              title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
            >
              {theme === 'light' ? (
                <Moon size={19} aria-hidden="true" />
              ) : (
                <Sun size={19} className="text-amber-400" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 sm:p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shrink-0"
              aria-label="Abrir menu lateral de navegação"
              aria-haspopup="dialog"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-2 ml-1">
              <a 
                href={user ? "/minha-assinatura" : "/login"} 
                className="flex items-center gap-2 p-1 pr-2 sm:pr-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                title="Acessar Área do Aluno"
                aria-label="Acessar Área do Aluno"
              >
                <div 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-md shadow-emerald-600/20 shrink-0"
                  aria-hidden="true"
                >
                  {user ? getInitials(user.displayName || user.email) : 'DD'}
                </div>
                {user && (
                  <div className="hidden xs:block text-[11px] leading-tight font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="text-zinc-500 dark:text-zinc-400">Bem-vindo,</span><br/>
                    <span className="font-bold truncate max-w-[80px] sm:max-w-[120px] inline-block">{getFirstName(user.displayName || user.email)}</span>
                  </div>
                )}
              </a>
              
              {user && (
                <button
                  onClick={() => logout()}
                  className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  title="Sair do aplicativo"
                  aria-label="Sair"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
