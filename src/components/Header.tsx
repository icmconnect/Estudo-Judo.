import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchModal } from './SearchModal';

export function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (v: boolean) => void;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, []);

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

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md px-4 lg:px-8 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white leading-none tracking-tight">Academia Garça Judô</h1>
              <span className="text-xs text-blue-600 dark:text-amber-500 mt-1 font-semibold uppercase tracking-wider">Membros e Alunos</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Pesquisar aulas ou técnicas..." 
              className="w-64 pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-none rounded-full text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              onClick={() => setSearchOpen(true)}
              readOnly
            />
            <Search className="absolute left-4 top-3 w-4 h-4 text-zinc-400" />
          </div>
          <button 
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Search size={20} />
          </button>
          
          <div className="flex items-center gap-3 border-l pl-4 border-zinc-200 dark:border-zinc-800">
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-full dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="/login" className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-400">
                GM
              </div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
