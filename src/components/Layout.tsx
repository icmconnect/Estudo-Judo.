import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useState } from 'react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-blue-50/50 dark:bg-[#0A0E17] text-slate-800 dark:text-zinc-100 font-sans selection:bg-amber-200 selection:text-amber-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-72 w-full transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto bg-blue-50/30 dark:bg-[#0A0E17]">
          <Outlet />
        </main>

        <footer className="h-14 bg-blue-100/30 dark:bg-[#0f172a] border-t border-blue-200 dark:border-zinc-800 px-6 sm:px-8 flex items-center justify-between text-xs text-blue-800 dark:text-zinc-500 font-medium shrink-0">
          <div>Academia Garça Judô © 2024</div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-amber-500 font-bold bg-blue-100/50 dark:bg-amber-900/20 px-2.5 py-1.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-amber-500 animate-pulse"></span>
              SISTEMA ONLINE
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
