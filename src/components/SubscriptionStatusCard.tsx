import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  CreditCard
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { PLANS_DATA } from '../data/plansData';

export const SubscriptionStatusCard: React.FC = () => {
  const { user } = useAuth();
  const { subscription, loading, isFree, isPending, isActive, isBlocked } = useSubscription();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-400">
        Carregando informações da sua assinatura...
      </div>
    );
  }

  const currentPlan = PLANS_DATA.find((p) => p.id === subscription?.planId) || PLANS_DATA[0];

  const getStatusBadge = () => {
    if (isBlocked) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
          <AlertTriangle size={13} />
          Bloqueado
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold animate-pulse">
          <Clock size={13} />
          Aguardando Confirmação
        </span>
      );
    }
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
          <CheckCircle2 size={13} />
          Ativo — Acesso Completo
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-bold">
        Plano Gratuito
      </span>
    );
  };

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return '—';
    try {
      return new Date(isoStr).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Sua Assinatura
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-100 mt-0.5">
            {currentPlan.name}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{user?.email || 'Usuário logado'}</p>
        </div>
        <div className="self-start sm:self-center">{getStatusBadge()}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">
            Status de Acesso
          </span>
          <p className="text-sm font-bold text-zinc-200">
            {subscription?.accessAllowed ? 'Liberado (Todos os Módulos)' : 'Demonstrativo (Conteúdos Gratuitos)'}
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">
            Tipo de Pagamento
          </span>
          <p className="text-sm font-bold text-zinc-200">
            {isActive ? 'Pagamento Único (Sem Mensalidade)' : 'Sem cobrança'}
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">
            Data de Início / Ativação
          </span>
          <p className="text-sm font-semibold text-zinc-300">
            {formatDate(subscription?.startedAt)}
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">
            Última Verificação Segura
          </span>
          <p className="text-sm font-semibold text-zinc-300">
            {formatDate(subscription?.updatedAt)}
          </p>
        </div>
      </div>

      {isFree && (
        <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles size={15} />
              Garanta o Acesso Completo
            </h4>
            <p className="text-xs text-zinc-300">
              Desbloqueie todo o Gokyo, vídeos e formações teóricas por pagamento único de R$ 97,00.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/planos')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>Ver Planos</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      <div className="border-t border-zinc-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-400" />
          Gateway Oficial de Pagamento: Stripe
        </span>
        <a
          href="mailto:suporte@dojodigital.com.br?subject=Dúvida sobre minha assinatura"
          className="hover:text-zinc-200 underline flex items-center gap-1"
        >
          <HelpCircle size={13} />
          Falar com suporte do Dojo
        </a>
      </div>
    </div>
  );
};
