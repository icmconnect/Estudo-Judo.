import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Filter,
  UserCheck,
  UserX,
  Ban,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  ArrowLeft,
  Plus,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserSubscription, AdminAuditLog, PaymentEvent } from '../types';

export const AdminPaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [paymentEvents, setPaymentEvents] = useState<PaymentEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'audit' | 'events'>('subscriptions');

  // Modal de Ação Administrativa
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'grant' | 'revoke' | 'block' | 'unblock'>('grant');
  const [targetUid, setTargetUid] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users-subscriptions');
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data.subscriptions || []);
        setAuditLogs(data.auditLogs || []);
        setPaymentEvents(data.paymentEvents || []);
      }
    } catch (e) {
      console.error('Erro ao carregar dados administrativos:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (type: 'grant' | 'revoke' | 'block' | 'unblock', defaultUid = '') => {
    setActionType(type);
    setTargetUid(defaultUid);
    setReason('');
    setActionError(null);
    setIsActionModalOpen(true);
  };

  const handleExecuteAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUid.trim() || !reason.trim()) {
      setActionError('Preencha o UID e a justificativa.');
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      let endpoint = '/api/admin/grant-access';
      let payload: any = {
        actorUid: user?.uid || 'admin_master',
        actorEmail: user?.email || 'admin@dojodigital.com.br',
        targetUid: targetUid.trim(),
        reason: reason.trim()
      };

      if (actionType === 'revoke') {
        endpoint = '/api/admin/revoke-access';
      } else if (actionType === 'block' || actionType === 'unblock') {
        endpoint = '/api/admin/block-user';
        payload.block = actionType === 'block';
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro na execução da ação');
      }

      setIsActionModalOpen(false);
      await fetchData();
    } catch (err: any) {
      setActionError(err.message || 'Erro ao aplicar ação');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      sub.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.stripeCustomerId && sub.stripeCustomerId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Voltar ao App</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-zinc-100">
                  Painel de Gestão de Assinaturas e Pagamentos
                </h1>
                <p className="text-xs text-zinc-400">
                  Governança, concessões manuais com auditoria e logs do Stripe Webhook.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
              title="Recarregar dados"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              type="button"
              onClick={() => handleOpenModal('grant')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              <span>Conceder Acesso Manual</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'subscriptions'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Assinaturas e Usuários ({subscriptions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Logs de Auditoria ({auditLogs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'events'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Eventos Stripe ({paymentEvents.length})
          </button>
        </div>

        {/* TAB 1: ASSINATURAS */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            {/* Filtros e Busca */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800">
              <div className="relative w-full sm:w-80">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar por UID ou Stripe ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={14} className="text-zinc-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  aria-label="Filtrar por status"
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativo (Stripe)</option>
                  <option value="manual_grant">Concessão Manual</option>
                  <option value="pending_payment">Aguardando Pagamento</option>
                  <option value="free">Plano Gratuito</option>
                  <option value="blocked">Bloqueado</option>
                </select>
              </div>
            </div>

            {/* Tabela */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Usuário (UID)</th>
                      <th className="py-3 px-4">Plano</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Acesso</th>
                      <th className="py-3 px-4">Origem</th>
                      <th className="py-3 px-4">Atualizado</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {filteredSubscriptions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-zinc-500">
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscriptions.map((sub) => (
                        <tr key={sub.uid} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-zinc-300 max-w-[180px] truncate">
                            {sub.uid}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-200 font-semibold">
                            {sub.planId === 'dojo_founder_97' ? 'Plano Fundador' : 'Plano Gratuito'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                sub.status === 'active' || sub.status === 'manual_grant'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : sub.status === 'pending_payment'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : sub.status === 'blocked'
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {sub.accessAllowed ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 size={13} /> Liberado
                              </span>
                            ) : (
                              <span className="text-zinc-500">Restrito</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400">{sub.sourceOfTruth}</td>
                          <td className="py-3.5 px-4 text-zinc-400">
                            {new Date(sub.updatedAt).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            {sub.status !== 'manual_grant' && (
                              <button
                                type="button"
                                onClick={() => handleOpenModal('grant', sub.uid)}
                                className="p-1 text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors"
                                title="Conceder Acesso"
                              >
                                <UserCheck size={15} />
                              </button>
                            )}
                            {sub.accessAllowed && (
                              <button
                                type="button"
                                onClick={() => handleOpenModal('revoke', sub.uid)}
                                className="p-1 text-amber-400 hover:bg-amber-500/10 rounded transition-colors"
                                title="Revogar Acesso"
                              >
                                <UserX size={15} />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenModal(sub.status === 'blocked' ? 'unblock' : 'block', sub.uid)
                              }
                              className={`p-1 rounded transition-colors ${
                                sub.status === 'blocked'
                                  ? 'text-emerald-400 hover:bg-emerald-500/10'
                                  : 'text-rose-400 hover:bg-rose-500/10'
                              }`}
                              title={sub.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                            >
                              <Ban size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDITORIA */}
        {activeTab === 'audit' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Data / Hora</th>
                    <th className="py-3 px-4">Ação</th>
                    <th className="py-3 px-4">Admin Responsável</th>
                    <th className="py-3 px-4">UID Alvo</th>
                    <th className="py-3 px-4">Justificativa Registrada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">
                        Nenhum log registrado até o momento.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-zinc-900/40">
                        <td className="py-3 px-4 text-zinc-400">
                          {new Date(log.createdAt).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 font-bold text-amber-400">{log.action}</td>
                        <td className="py-3 px-4 text-zinc-300">{log.actorEmail || log.actorUid}</td>
                        <td className="py-3 px-4 font-mono text-zinc-400">{log.targetUid}</td>
                        <td className="py-3 px-4 text-zinc-300 italic">{log.reason}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EVENTOS STRIPE */}
        {activeTab === 'events' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">ID do Evento</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">UID</th>
                    <th className="py-3 px-4">Status Processamento</th>
                    <th className="py-3 px-4">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {paymentEvents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">
                        Nenhum evento do Stripe registrado ainda.
                      </td>
                    </tr>
                  ) : (
                    paymentEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-zinc-900/40">
                        <td className="py-3 px-4 font-mono text-zinc-400">{evt.providerEventId || evt.id}</td>
                        <td className="py-3 px-4 text-emerald-400 font-semibold">{evt.eventType}</td>
                        <td className="py-3 px-4 font-mono text-zinc-300">{evt.uid}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                            {evt.processingStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-400">
                          {new Date(evt.createdAt).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE AÇÃO ADMINISTRATIVA COM JUSTIFICATIVA OBRIGATÓRIA */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-zinc-100">
              {actionType === 'grant' && 'Conceder Acesso Manual'}
              {actionType === 'revoke' && 'Revogar Acesso do Usuário'}
              {actionType === 'block' && 'Bloquear Usuário'}
              {actionType === 'unblock' && 'Desbloquear Usuário'}
            </h3>

            <form onSubmit={handleExecuteAction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">UID do Usuário *</label>
                <input
                  type="text"
                  required
                  value={targetUid}
                  onChange={(e) => setTargetUid(e.target.value)}
                  placeholder="ex: user_123456"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Justificativa Obrigatória (Auditoria) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Descreva o motivo da concessão/revogação (ex: Aluno matriculado presencialmente na academia)..."
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {actionError && (
                <p className="text-xs text-rose-400 font-medium" role="alert">
                  {actionError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsActionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs cursor-pointer disabled:opacity-60"
                >
                  {actionLoading ? 'Salvando...' : 'Confirmar e Registrar Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
