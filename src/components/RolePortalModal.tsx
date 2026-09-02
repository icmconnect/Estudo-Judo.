import React, { useState } from 'react';
import { X, Users, UserCheck, Shield, GraduationCap, CheckCircle2, MessageSquare, Send, Check, Archive, Clock } from 'lucide-react';
import { UserRole, UserProfile, DoubtQuestion } from '../types';

interface RolePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  profile: UserProfile;
  completedLessonsCount: number;
  totalLessonsCount: number;
  doubts: DoubtQuestion[];
  onAnswerDoubt: (id: string, response: string, teacherName: string) => void;
  onArchiveDoubt: (id: string) => void;
  onSubmitNewDoubt: (doubt: Omit<DoubtQuestion, 'id' | 'status' | 'submittedAt'>) => void;
}

export const RolePortalModal: React.FC<RolePortalModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onChangeRole,
  profile,
  completedLessonsCount,
  totalLessonsCount,
  doubts,
  onAnswerDoubt,
  onArchiveDoubt,
  onSubmitNewDoubt
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>(currentRole);
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionChapter, setNewQuestionChapter] = useState('Geral / Fundamentos');
  const [doubtSentSuccess, setDoubtSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (role: UserRole) => {
    setActiveTab(role);
    onChangeRole(role);
  };

  const handleSendResponse = (doubtId: string) => {
    const text = responseText[doubtId];
    if (!text || !text.trim()) return;
    onAnswerDoubt(doubtId, text.trim(), 'Sensei Responsável');
    setResponseText((prev) => ({ ...prev, [doubtId]: '' }));
  };

  const handleStudentSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onSubmitNewDoubt({
      studentName: profile.name,
      studentGrade: profile.grade,
      chapterSlug: 'capitulo-atual',
      chapterTitle: newQuestionChapter,
      questionText: newQuestionText.trim()
    });
    setNewQuestionText('');
    setDoubtSentSuccess(true);
    setTimeout(() => setDoubtSentSuccess(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Users size={18} />
            </span>
            <div>
              <h3 id="role-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Portais de Acesso & Acompanhamento Pedagógico
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Alterne entre visão do Aluno, Responsável Legal ou Professor / Sensei
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {[
            { id: 'aluno', label: 'Área do Aluno', icon: GraduationCap },
            { id: 'responsavel', label: 'Painel do Responsável', icon: Shield },
            { id: 'professor', label: 'Área do Professor / Sensei', icon: UserCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleRoleChange(tab.id as UserRole)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* VISÃO ALUNO: ENVIAR DÚVIDA PARA O SENSEI */}
          {activeTab === 'aluno' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <h4 className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">Canal Direto com o Sensei</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Tem dúvidas sobre a execução técnica, tempo de pegada ou etiqueta? Envie sua pergunta diretamente para a equipe de professores.
                </p>
              </div>

              <form onSubmit={handleStudentSubmitDoubt} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h5 className="text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">Nova Pergunta Técnica</h5>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">Capítulo / Assunto Relacionado</label>
                  <input
                    type="text"
                    value={newQuestionChapter}
                    onChange={(e) => setNewQuestionChapter(e.target.value)}
                    placeholder="Ex: O-soto-gari / Ukemis"
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1">Sua Dúvida com Detalhes</label>
                  <textarea
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    rows={3}
                    placeholder="Ex: Sensei, sinto dificuldade em manter o equilíbrio após a entrada de Harai-goshi..."
                    className="w-full p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {doubtSentSuccess && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check size={14} /> Dúvida enviada com sucesso ao Sensei!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-sm"
                  >
                    <Send size={13} />
                    <span>Enviar para o Sensei</span>
                  </button>
                </div>
              </form>

              {/* Minhas Dúvidas Anteriores */}
              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase tracking-wider text-zinc-500">Histórico de Dúvidas ({doubts.length})</h5>
                {doubts.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-900 dark:text-white">{d.chapterTitle}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'respondida' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}>
                        {d.status === 'respondida' ? 'Respondida pelo Sensei' : 'Aguardando Resposta'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">"{d.questionText}"</p>
                    {d.teacherResponse && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 mt-2 space-y-1">
                        <strong className="block font-bold text-emerald-800 dark:text-emerald-400">Resposta do {d.teacherName || 'Sensei'}:</strong>
                        <p>{d.teacherResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISÃO RESPONSÁVEL: PRIVACIDADE E ACOMPANHAMENTO DO FILHO */}
          {activeTab === 'responsavel' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                <h4 className="text-xs font-bold uppercase text-sky-800 dark:text-sky-300">Acompanhamento Transparente & Seguro</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Visualização simplificada das aulas concluídas pelo judoca, conformidade com as 10 Regras de Ouro e segurança pedagógica sem exposição de dados desnecessários.
                </p>
              </div>

              {/* Métricas do Aluno */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-500 block">Aluno Vinculado</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{profile.name}</p>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{profile.grade}</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-500 block">Aulas Concluídas</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {completedLessonsCount} de {totalLessonsCount} aulas
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100)}% concluído
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-500 block">Salvaguarda & Segurança</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={15} /> 100% Verificado
                  </p>
                  <span className="text-[11px] text-zinc-400">Conteúdo sem riscos</span>
                </div>
              </div>

              {/* Orientações para Pais e Mães */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h5 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Guia de Apoio aos Pais</h5>
                <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Incentive o descanso adequado e a hidratação antes e após os treinos no tatame.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Pergunte sobre os princípios morais (Respeito, Coragem, Amizade) aprendidos em cada aula.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Em caso de qualquer queixa de dor física, solicite imediatamente avaliação do Sensei credenciado.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* VISÃO PROFESSOR / SENSEI: MODERAÇÃO DE DÚVIDAS E TURMA */}
          {activeTab === 'professor' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <h4 className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">Fila de Moderação do Sensei</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Responda às dúvidas dos alunos para orientar a prática segura e o aprimoramento motor.
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                  Perguntas Pendentes de Resposta ({doubts.filter((d) => d.status === 'enviada').length})
                </h5>

                {doubts.map((doubt) => (
                  <div key={doubt.id} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">{doubt.studentName}</span>
                        <span className="text-[11px] text-zinc-500 block">Graduação: {doubt.studentGrade} • Capítulo: {doubt.chapterTitle}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        doubt.status === 'respondida' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-amber-500/20 text-amber-700'
                      }`}>
                        {doubt.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      "{doubt.questionText}"
                    </p>

                    {doubt.status === 'respondida' ? (
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-xs text-emerald-950 dark:text-emerald-200">
                        <strong>Sua Resposta:</strong> {doubt.teacherResponse}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          value={responseText[doubt.id] || ''}
                          onChange={(e) => setResponseText({ ...responseText, [doubt.id]: e.target.value })}
                          rows={2}
                          placeholder="Digite aqui a resposta pedagógica para o aluno..."
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onArchiveDoubt(doubt.id)}
                            className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 flex items-center gap-1"
                          >
                            <Archive size={12} />
                            <span>Arquivar</span>
                          </button>
                          <button
                            onClick={() => handleSendResponse(doubt.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
                          >
                            <Send size={12} />
                            <span>Publicar Resposta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700"
          >
            Fechar Portal
          </button>
        </div>
      </div>
    </div>
  );
};
