import React, { useEffect, useState } from 'react';
import { ShieldCheck, Users, Search, Activity, BookOpen } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Navigate } from 'react-router-dom';

export const AdminStudentsPage: React.FC = () => {
  const { isAdmin } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
              <ShieldCheck size={16} /> Painel Administrativo
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              Acompanhamento de Alunos
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Acompanhe o progresso, histórico e engajamento dos alunos na plataforma.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-2xl flex flex-col justify-center min-w-32">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Total de Alunos</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white mt-0.5">Em breve</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
              <Users size={20} className="text-amber-500" />
              Lista de Alunos
            </h2>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-zinc-900 dark:text-white"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
            </div>
          </div>
          
          <div className="p-8 text-center sm:p-16">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
              <Activity size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Integração em Desenvolvimento</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm">
              O painel de acompanhamento de alunos integrado ao banco de dados em tempo real será ativado na próxima atualização.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
