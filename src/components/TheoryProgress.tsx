import { useState } from 'react';
import { TheoryModule } from '../types';
import { theoryModules } from '../data/theoryModules';
import { theoryLessons } from '../data/theoryLessons';
import { useTheoryProgress } from '../hooks/useTheoryProgress';
import { useUserProfile } from '../hooks/useUserProfile';
import { Award, BookOpen, Clock, Calendar, CheckCircle2, ShieldAlert, X, Download, User, Hash, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export function TheoryProgress() {
  const { theoryProgress, isTrackUnlocked, getTrackStatus } = useTheoryProgress();
  const { profile } = useUserProfile();
  const [selectedCertificate, setSelectedCertificate] = useState<TheoryModule | null>(null);

  const totalLessons = theoryLessons.length;
  const completedCount = theoryProgress.completedLessons.length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Card de Resumo Geral */}
      <div className="bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 min-w-0">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-500/30 max-w-full shrink-0">
              <Award size={14} className="shrink-0" />
              <span className="truncate">Formação Teórica • Progresso</span>
            </div>
            <h2 className="text-[22px] sm:text-3xl font-black tracking-tight leading-tight text-balance">
              Sua Jornada do Conhecimento
            </h2>
            <p className="text-sm text-zinc-300 max-w-xl leading-relaxed break-words">
              Acompanhe sua evolução nas 7 trilhas estruturadas de história, valores morais, biomecânica, salvaguarda e pedagogia do Judô Kodokan.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 shrink-0 w-full md:w-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {completedCount} <span className="text-sm text-zinc-400 font-normal">/ {totalLessons}</span>
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">Aulas Concluídas</div>
            </div>
            <div className="h-10 w-px bg-zinc-800" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {overallPercentage}%
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">Progresso Total</div>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Global */}
        <div className="mt-6 space-y-2 relative z-10">
          <div className="w-full h-3 bg-zinc-800/90 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid de Trilhas e Certificados Internos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {theoryModules.map((mod) => {
          const modLessons = theoryLessons.filter(l => l.trackSlug === mod.slug);
          const trackStatus = getTrackStatus(mod.trackNumber);
          const isUnlocked = trackStatus.isUnlocked;
          const completedInMod = trackStatus.completed;
          const isModCompleted = trackStatus.isCompleted;
          const modPercentage = trackStatus.percentage;

          return (
            <div
              key={mod.id}
              className={cn(
                'rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between',
                isModCompleted
                  ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-950/20'
                  : isUnlocked
                  ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                  : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200/70 dark:border-zinc-800/60 opacity-80'
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1",
                    isUnlocked
                      ? "text-amber-600 dark:text-amber-400 bg-amber-500/10"
                      : "text-zinc-500 bg-zinc-200/80 dark:bg-zinc-800"
                  )}>
                    {!isUnlocked && <Lock size={10} />}
                    Trilha {mod.trackNumber}
                  </span>
                  {isModCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 size={12} /> Concluída
                    </span>
                  ) : !isUnlocked ? (
                    <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                      <Lock size={11} /> Bloqueada
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-zinc-500">
                      {completedInMod}/{modLessons.length} aulas ({modPercentage}%)
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                    {mod.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="w-1/2">
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isModCompleted ? "bg-emerald-500" : isUnlocked ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-700"
                      )}
                      style={{ width: `${modPercentage}%` }}
                    />
                  </div>
                </div>

                {isModCompleted ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(mod)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Award size={14} />
                    Ver Certificado
                  </button>
                ) : !isUnlocked ? (
                  <span className="text-[11px] text-zinc-400 font-medium">
                    Requer Trilha {mod.trackNumber - 1}
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                    {completedInMod > 0 ? 'Em Andamento' : 'Disponível'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Certificado Interno */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
              aria-label="Fechar certificado"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-3 pt-2">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20 shadow-inner">
                <Award size={36} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Dojo Digital • Formação Teórica
                </span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
                  Certificado de Conclusão Digital
                </h3>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Certificamos que o judoca:
                </p>
                <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2">
                  <User size={18} className="text-amber-500" />
                  <span>{profile.name}</span>
                  <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    {profile.grade}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                concluiu com êxito todas as aulas e fixações pedagógicas do módulo:
              </p>

              <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                Trilha {selectedCertificate.trackNumber}: {selectedCertificate.title}
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {selectedCertificate.estimatedTimeMinutes} min estimados
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {new Date().toLocaleDateString('pt-BR')}
                </span>
                <span>•</span>
                <span className="font-mono text-[10px] text-zinc-400">
                  ID: DOJO-TH-0{selectedCertificate.trackNumber}-CERT
                </span>
              </div>
            </div>

            {/* Aviso Obrigatório de Governança Editorial */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
              <ShieldAlert size={18} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Aviso Legal & Regulatório:</strong> Certificado interno de conclusão de conteúdo digital. Não equivale a graduação, faixa, exame técnico, registro federativo ou credenciamento oficial.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="w-full py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
