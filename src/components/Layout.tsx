import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SubscriptionBanner } from './SubscriptionBanner';
import { useState } from 'react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-[#07090E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors">
      {/* Skip Link para Acessibilidade por Teclado (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-amber-500 focus:text-zinc-950 focus:font-black focus:text-sm focus:rounded-2xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all"
      >
        Pular para o conteúdo principal (Skip to main content)
      </a>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-80 w-full min-w-0 transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />
        <SubscriptionBanner />
        
        <main 
          id="main-content"
          tabIndex={-1}
          role="main"
          className="flex-1 flex flex-col p-3 sm:p-6 md:p-8 bg-zinc-50/50 dark:bg-[#07090E] outline-none focus:outline-none min-w-0"
          aria-label="Conteúdo da aula e materiais de estudo"
        >
          <Outlet />
        </main>


        <footer 
          role="contentinfo"
          className="h-16 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 px-6 sm:px-8 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-medium shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">DOJO DIGITAL</span>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span>Feito por <a href="https://ossconnect.com.br" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">OSSCONNECT (conheça: ossconnect.com.br)</a></span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              KODOKAN JUDO GOKYO
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
