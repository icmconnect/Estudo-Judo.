import { useState } from 'react';
import { Link } from 'react-router-dom';
import { theoryModules } from '../data/theoryModules';
import { theoryLessons } from '../data/theoryLessons';
import { theoryReferences } from '../data/theoryReferences';
import { useTheoryProgress } from '../hooks/useTheoryProgress';
import { TheoryProgress } from './TheoryProgress';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Star,
  RotateCcw,
  ExternalLink,
  Layers,
  Award,
  Users,
  Lock,
  AlertCircle,
  Video
} from 'lucide-react';
import { cn } from '../lib/utils';
import { THEORY_VIDEOS } from '../data/theoryVideos';

export function TheoryLibrary({ initialTrackSlug }: { initialTrackSlug?: string }) {
  const { theoryProgress, isTrackUnlocked, getTrackStatus } = useTheoryProgress();
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrackSlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trilhas' | 'revisao' | 'fontes'>('trilhas');

  // Filtragem de aulas
  const filteredLessons = theoryLessons.filter(lesson => {
    const matchesTrack = selectedTrack === 'all' || lesson.trackSlug === selectedTrack;
    const matchesQuery = searchQuery.trim() === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.japaneseWord.romaji.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesQuery;
  });

  const dueReviews = theoryProgress.scheduledReviews.filter(item => {
    return new Date(item.nextReviewDate) <= new Date();
  });

  return (
    <div className="w-full min-w-0 space-y-8 max-w-6xl mx-auto pb-16">
      {/* Banner Principal de Formação Teórica */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#07090E] border border-amber-500/20 rounded-3xl p-5 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <GraduationCap size={15} />
            <span>Programa Oficial de Formação Teórica 3.0</span>
          </div>

          <h1 className="text-[22px] leading-[1.1] sm:text-4xl lg:text-5xl font-black tracking-tight text-balance">
            A Alma, a Ciência e os Valores do Judô
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Aprofunde sua compreensão muito além dos tatames com conteúdos autorais sobre a filosofia de Jigoro Kano, biomecânica dos movimentos, psicologia marcial, salvaguarda e a didática do ensino.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedTrack('essencia-e-historia-do-judo');
                setActiveTab('trilhas');
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={15} />
              <span>Comece por Aqui</span>
            </button>

            {theoryProgress.lastAccessedLessonSlug && (
              <Link
                to={`/formacao-teorica/${theoryProgress.lastAccessedTrackSlug || 'essencia-e-historia-do-judo'}/${theoryProgress.lastAccessedLessonSlug}`}
                className="px-5 py-2.5 rounded-2xl bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <BookOpen size={15} className="text-amber-400" />
                <span>Continuar de Onde Parei</span>
              </Link>
            )}

          </div>
        </div>
      </section>

      {/* Navegação por Abas */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab('trilhas')}
          className={cn(
            'px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0',
            activeTab === 'trilhas'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <BookOpen size={15} />
          <span>7 Trilhas Formativas</span>
        </button>

        <Link
          to="/formacao-teorica/galeria-videos"
          className="px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Video size={15} className="text-emerald-500" />
          <span>Galeria de Vídeos ({THEORY_VIDEOS.length})</span>
        </Link>

        <button
          type="button"
          onClick={() => setActiveTab('revisao')}
          className={cn(
            'px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0',
            activeTab === 'revisao'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <RotateCcw size={15} />
          <span>Central de Revisão Espaçada</span>
          {dueReviews.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
              {dueReviews.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fontes')}
          className={cn(
            'px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0',
            activeTab === 'fontes'
              ? 'bg-amber-500 text-zinc-950 font-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          )}
        >
          <ShieldCheck size={15} />
          <span>Fontes Oficiais & Governança</span>
        </button>
      </div>

      {/* ABA 1: TRILHAS DE ESTUDO */}
      {activeTab === 'trilhas' && (
        <div className="space-y-8">
          {/* Barra de Busca e Filtro de Trilhas */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 min-w-0">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título, conceito ou palavra japonesa..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedTrack('all')}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer',
                  selectedTrack === 'all'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                )}
              >
                Todas as Trilhas
              </button>
              {theoryModules.map(mod => {
                const unlocked = isTrackUnlocked(mod.trackNumber);
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedTrack(mod.slug)}
                    className={cn(
                      'px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5',
                      selectedTrack === mod.slug
                        ? 'bg-amber-500 text-zinc-950 font-black shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900',
                      !unlocked && selectedTrack !== mod.slug && 'opacity-70'
                    )}
                  >
                    {!unlocked && <Lock size={11} className="text-zinc-400" />}
                    <span>Trilha {mod.trackNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards das 7 Trilhas Formativas */}
          <div className="space-y-6">
            {theoryModules
              .filter(m => selectedTrack === 'all' || m.slug === selectedTrack)
              .map((mod) => {
                const trackLessons = theoryLessons.filter(l => l.trackSlug === mod.slug);
                const trackStatus = getTrackStatus(mod.trackNumber);
                const isUnlocked = trackStatus.isUnlocked;
                const completedCount = trackStatus.completed;
                const isAllCompleted = trackStatus.isCompleted;
                const percentage = trackStatus.percentage;

                return (
                  <div
                    key={mod.id}
                    className={cn(
                      "bg-white dark:bg-zinc-900 border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all",
                      isUnlocked
                        ? "border-zinc-200 dark:border-zinc-800"
                        : "border-zinc-300/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5 min-w-0">
                      <div className="space-y-1.5 shrink min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn(
                            "text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-lg flex items-center gap-1 shrink-0",
                            isUnlocked
                              ? "text-amber-600 dark:text-amber-400 bg-amber-500/10"
                              : "text-zinc-500 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800"
                          )}>
                            {!isUnlocked && <Lock size={12} />}
                            Trilha {mod.trackNumber} {!isUnlocked && '• Bloqueada'}
                          </span>
                          <span className="text-[10px] sm:text-xs text-zinc-500 flex items-center gap-1 shrink-0">
                            <Clock size={12} className="sm:w-[13px] sm:h-[13px]" /> {mod.estimatedTimeMinutes} min
                          </span>
                          <span className="text-[10px] sm:text-xs text-zinc-500 flex items-center gap-1 shrink-0">
                            <Users size={12} className="sm:w-[13px] sm:h-[13px]" /> {mod.recommendedAge}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                          {mod.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl break-words">
                          {mod.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shrink-0">
                        <div className="text-right">
                          <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            {isUnlocked ? `${completedCount} de ${trackLessons.length} concluídas` : 'Bloqueada'}
                          </div>
                          <div className={cn(
                            "text-[11px] font-black",
                            isAllCompleted ? "text-emerald-600 dark:text-emerald-400" : isUnlocked ? "text-amber-600 dark:text-amber-400" : "text-zinc-400"
                          )}>
                            {isAllCompleted ? '100% Concluído' : isUnlocked ? `${percentage}% Concluído` : 'Requer Trilha Anterior'}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800 p-1 flex items-center justify-center">
                          <div className="text-xs font-black text-zinc-900 dark:text-zinc-100">
                            {isAllCompleted ? '🏆' : isUnlocked ? `${percentage}%` : <Lock size={18} className="text-zinc-400" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aviso de Trilha Bloqueada (Sequencial) */}
                    {!isUnlocked && trackStatus.prevTrack && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
                        <Lock size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 flex-1 min-w-0">
                          <p className="font-bold break-words">
                            Esta trilha será desbloqueada após a conclusão da Trilha {mod.trackNumber - 1}: {trackStatus.prevTrack.title}.
                          </p>
                          <p className="text-zinc-600 dark:text-zinc-400 break-words">
                            Conclua todas as 5 aulas da trilha anterior para garantir a progressão de aprendizado recomendada.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Lista de Aulas da Trilha */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {trackLessons.map((lesson) => {
                        const isLessonDone = theoryProgress.completedLessons.includes(lesson.id);
                        const isLessonFav = theoryProgress.favorites.includes(lesson.id);

                        return (
                          <Link
                            key={lesson.id}
                            to={`/formacao-teorica/${lesson.trackSlug}/${lesson.slug}`}
                            className={cn(
                              'p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 group',
                              isUnlocked
                                ? isLessonDone
                                  ? 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-950/10 hover:border-amber-500 hover:shadow-md'
                                  : 'bg-zinc-50/70 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 hover:border-amber-500 hover:shadow-md'
                                : 'bg-zinc-100/60 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/40 opacity-75 hover:opacity-100'
                            )}
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">
                                  Aula {lesson.lessonNumber}
                                </span>
                                {isLessonFav && (
                                  <Star size={12} className="fill-amber-500 text-amber-500" />
                                )}
                                {!isUnlocked && (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-medium">
                                    <Lock size={10} /> Bloqueada
                                  </span>
                                )}
                              </div>
                              <h3 className={cn(
                                "text-sm font-bold truncate",
                                isUnlocked
                                  ? "text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                                  : "text-zinc-700 dark:text-zinc-300"
                              )}>
                                {lesson.title}
                              </h3>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                {lesson.subtitle}
                              </p>
                            </div>

                            <div className="shrink-0 flex items-center gap-1.5 mt-1">
                              {isLessonDone ? (
                                <CheckCircle2 size={18} className="text-emerald-500" />
                              ) : isUnlocked ? (
                                <ChevronRight size={18} className="text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                              ) : (
                                <Lock size={16} className="text-zinc-400" />
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Resumo de Progresso e Certificados */}
          <TheoryProgress />
        </div>
      )}

      {/* ABA 2: CENTRAL DE REVISÃO ESPAÇADA */}
      {activeTab === 'revisao' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <RotateCcw size={14} />
              Revisão Espaçada (1, 7, 15, 30 dias)
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Central de Retenção e Memória
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Revise periodicamente os conceitos para consolidar os ensinamentos no longo prazo.
            </p>
          </div>

          {theoryProgress.scheduledReviews.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                <BookOpen size={24} />
              </div>
              <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Nenhuma aula agendada para revisão no momento.
              </div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Ao estudar uma aula, clique em "Revisar em 1d, 7d, 15d ou 30d" para programar seus lembretes de estudo.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {theoryProgress.scheduledReviews.map((item) => {
                const isDue = new Date(item.nextReviewDate) <= new Date();
                const reviewDateFormatted = new Date(item.nextReviewDate).toLocaleDateString('pt-BR');

                return (
                  <div
                    key={item.lessonId}
                    className={cn(
                      'p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3',
                      isDue
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {isDue && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white">
                            Revisar Hoje!
                          </span>
                        )}
                        <span className="text-xs text-zinc-500">
                          Data programada: {reviewDateFormatted} (Ciclo de {item.intervalDays} dias)
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                        {item.lessonTitle}
                      </h3>
                    </div>

                    <Link
                      to={`/formacao-teorica/${item.trackSlug}/${item.lessonSlug}`}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold text-xs shrink-0 text-center"
                    >
                      Revisar Aula Agora
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ABA 3: FONTES OFICIAIS & GOVERNANÇA EDITORIAL */}
      {activeTab === 'fontes' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={14} />
              Governança Editorial & Referências Oficiais
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Fontes Canônicas e Base de Pesquisa
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Todos os conteúdos teóricos do Dojo Digital são produções autorais fundamentadas em fontes verificáveis das entidades oficiais do Judô (Kodokan, IJF e CBJ).
            </p>
          </div>

          <div className="grid gap-4">
            {theoryReferences.map(ref => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {ref.id}
                    </span>
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {ref.entity}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Status: {ref.status === 'confirmada' ? 'Verificação Confirmada' : 'Em Revisão'}
                  </span>
                </div>

                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {ref.title}
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <strong>Finalidade no App:</strong> {ref.usageType}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400">
                  <span>{ref.copyrightNotice}</span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Acessar portal original</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
