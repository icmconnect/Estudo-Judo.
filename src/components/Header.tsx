import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header({ setSidebarOpen }: { setSidebarOpen?: (v: boolean) => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (setSidebarOpen) {
      setSidebarOpen(nextState);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <header className="w-full bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wider">OssConnect</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/app" className="hover:text-indigo-400 transition">Área do Aluno</Link>
          <Link to="/planos" className="hover:text-indigo-400 transition">Planos</Link>
          <button type="button" aria-label="Notificações" className="relative p-2 hover:bg-slate-800 rounded-full">
            🔔<span className="absolute top-0 right-0 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </button>
        </nav>
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 text-2xl focus:outline-none"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
          <Link to="/app" onClick={handleLinkClick} className="w-full py-2 border-b border-slate-800">Área do Aluno</Link>
          <Link to="/planos" onClick={handleLinkClick} className="w-full py-2 border-b border-slate-800">Planos</Link>
          <div className="flex items-center justify-between py-2 bg-slate-800/50 px-3 rounded-lg">
            <span className="text-sm text-slate-300">Notificações e Avisos</span>
            <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full font-bold">3 Novas</span>
          </div>
        </div>
      )}
    </header>
  );
}
