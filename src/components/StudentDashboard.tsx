import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Video,
  HeartHandshake,
  Flame,
  Users,
  Compass,
  UserCheck,
  Edit3
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useUserProfile } from '../hooks/useUserProfile';
import { useQuizStore } from '../hooks/useQuizStore';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { allChapters } from '../data/chapters';
import { OnboardingModal } from './OnboardingModal';

export const StudentDashboard: React.FC = () => {
  const { isChapterCompleted, getProgressPercentage, completedChapters } = useProgress();
  const { profile, updateProfile, studyGoals } = useUserProfile();
  const { quizStats, recordAttempt, accuracyPercentage } = useQuizStore();

  const totalCount = allChapters.length;
  const completedCount = completedChapters.length;
  const progressPercentage = getProgressPercentage(totalCount);

  const [selectedTrack, setSelectedTrack] = useState<'12-14' | '15-17' | '18-39' | 'veteranos'>(
    profile.ageGroup || '18-39'
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const currentQuiz = QUIZ_QUESTIONS[quizIndex];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    recordAttempt(
      currentQuiz.id,
      currentQuiz.category,
      currentQuiz.question,
      index,
      currentQuiz.correctIndex
    );
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  // Find next uncompleted chapter
  const nextChapter = allChapters.find((ch) => !isChapterCompleted(ch.slug)) || allChapters[0];

  const tracks = [
    {
      id: '12-14',
      name: '12 a 14 anos (Sub-13 / Sub-15)',
      icon: '🧒',
      desc: 'Fundamentos motores, ukemi seguro, disciplina e o código moral das 8 virtudes.',
      recommended: ['fundamentos', 'seguranca', 'jigoro-kano']
    },
    {
      id: '15-17',
      name: '15 a 17 anos (Cadete / Sub-18)',
      icon: '🧑',
      desc: 'Aprofundamento técnico no Gokyo, combinações (Renraku), contragolpes e arbitragem.',
      recommended: ['catalogo-gokyo', 'arbitragem', 'tecnicas-projecao']
    },
    {
      id: '18-39',
      name: '18 a 39 anos (Sênior / Adultos)',
      icon: '🥋',
      desc: 'Arsenal técnico completo, transições pé-solo (Ne-waza) e preparação para exames.',
      recommended: ['tecnicas-projecao', 'katas', 'arbitragem']
    },
    {
      id: 'veteranos',
      name: '40 a 99 anos (Veteranos / Masters)',
      icon: '🧓',
      desc: 'Mobilidade articular, saúde, longevidade, quedas suaves e estudo clássico dos Katas.',
      recommended: ['seguranca', 'katas', 'fundamentos']
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 my-6">
      
      {/* Modal de Onboarding e Personalização de Perfil */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        currentProfile={profile}
        onSaveProfile={(updated) => updateProfile(updated)}
      />

      {/* ========================================================================= */}
      {/* BANNER PRINCIPAL DO ALUNO (ONBOARDING & CONTINUAR ESTUDOS) */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white p-6 sm:p-8 border border-zinc-800 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Perfil: {profile.name} • {profile.grade}</span>
              </span>
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 text-xs font-bold transition-all cursor-pointer"
                title="Personalizar Trilha e Perfil"
              >
                <Edit3 size={13} />
                <span>Editar Perfil</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue',sans-serif] tracking-wide text-white">
              Oss, {profile.name}! Bem-vindo ao seu Dojo Digital
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed mt-2">
              Meta da semana: <strong>{studyGoals.weeklyLessonsTarget} aulas</strong> e <strong>{studyGoals.dailyMinutesTarget} min/dia</strong>. Você já concluiu <strong>{completedCount} de {totalCount} aulas</strong> ({progressPercentage}% da jornada).
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Link
                to={`/capitulo/${nextChapter.slug}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Play size={16} className="fill-current" />
                <span>Continuar de Onde Parei ({nextChapter.title.split(':')[0]})</span>
              </Link>

              <Link
                to="/capitulo/catalogo-gokyo"
                className="px-5 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-white font-bold text-sm flex items-center gap-2 border border-zinc-700 transition-all"
              >
                <Video size={16} className="text-emerald-400" />
                <span>Catálogo Gokyo (139 Vídeos)</span>
              </Link>
            </div>
          </div>

          {/* Card de Progresso Circular / Status */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center justify-center min-w-[200px] text-center shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-base font-black text-white">{progressPercentage}%</span>
            </div>
            <span className="text-xs font-bold text-zinc-400">Progresso Geral</span>
            <span className="text-[11px] text-emerald-400 font-semibold">{completedCount}/{totalCount} módulos concluídos</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESTAQUES DA SEMANA (TÉCNICA & VALOR MORAL) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Técnica em Destaque */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                🥋 Técnica da Semana
              </span>
              <span className="text-xs font-bold text-zinc-500">Dai-Ikkyo • Ashi-waza</span>
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              O-Soto-Gari (大外刈) • Grande Ceifada Externa
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              O primeiro golpe do Gokyo. Exige desequilíbrio para trás e para a diagonal direita (Kuzushi), aproximação do peito sem flexionar as costas (Tsukuri) e ceifada decidida da perna de apoio com o queixo recolhido (Kake).
            </p>

            <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Ponto de Segurança:</span>
              </div>
              <p>O Tori deve sustentar a manga do Uke durante toda a queda para amortecer o impacto no solo.</p>
            </div>
          </div>

          <Link
            to="/capitulo/catalogo-gokyo"
            className="mt-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold transition-all"
          >
            <span>Ver Vídeo de O-Soto-Gari no Catálogo</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Card 2: Valor Moral da Semana */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                🌸 Virtude da Semana
              </span>
              <span className="text-xs font-bold text-zinc-500">Código Moral • Gaman</span>
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Autocontrole (我慢 - Gaman) & Serenidade
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              "Conhecer-se é dominar-se, dominar-se é triunfar." O autocontrole é a capacidade de respirar fundo diante da frustração, conter a impulsividade e respeitar os limites do colega dentro e fora do dojô.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-zinc-700 dark:text-zinc-300">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">🎯 Desafio Prático da Semana:</span>
              <span>Quando encontrar uma dificuldade nos treinos ou no dia a dia, respire antes de reagir e peça orientação com humildade.</span>
            </div>
          </div>

          <Link
            to="/capitulo/fundamentos"
            className="mt-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
          >
            <span>Estudar as 8 Virtudes do Judô</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* TRILHAS ADAPTADAS POR FAIXA ETÁRIA (12 A 99 ANOS) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              Trilhas Pedagógicas
            </span>
            <h3 className="text-xl font-black uppercase font-['Bebas_Neue',sans-serif] tracking-wide text-zinc-900 dark:text-white mt-2">
              Escolha seu Perfil de Aprendizado (12 a 99 Anos)
            </h3>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Conteúdo personalizado para seu momento</span>
        </div>

        {/* Abas de Idade */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t.id as any)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedTrack === t.id
                  ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white font-bold shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="text-lg block mb-1">{t.icon}</span>
              <span className="text-xs font-black block leading-tight">{t.name}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo da Trilha Selecionada */}
        {(() => {
          const active = tracks.find((t) => t.id === selectedTrack)!;
          return (
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>{active.icon}</span>
                  <span>Foco da Trilha: {active.name}</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xl">
                  {active.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {active.recommended.map((slug) => (
                  <Link
                    key={slug}
                    to={`/capitulo/${slug}`}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-amber-500 hover:text-zinc-950 transition-colors shadow-2xs"
                  >
                    Acessar Módulo
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ========================================================================= */}
      {/* QUIZ INTERATIVO DIDÁTICO (PROVAS ILUSTRADAS) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs">
              <HelpCircle size={16} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Desafio de Conhecimento • Questão {quizIndex + 1} de {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {quizStats.totalAttempted > 0 && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Aproveitamento: {accuracyPercentage}% ({quizStats.totalCorrect}/{quizStats.totalAttempted})
              </span>
            )}
            <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-lg">
              {currentQuiz.category}
            </span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
          {currentQuiz.question}
        </h3>

        <div className="space-y-2.5 mb-5">
          {currentQuiz.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuiz.correctIndex;

            let btnStyle = 'bg-zinc-800/80 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:border-zinc-600';
            if (showExplanation) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
              }
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {showExplanation && isCorrect && (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explicação da Resposta */}
        {showExplanation && (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs leading-relaxed text-zinc-300 mb-4 animate-fadeIn">
            <strong className="text-amber-400 block mb-1">
              {selectedAnswer === currentQuiz.correctIndex ? '🎉 Resposta Correta!' : '💡 Explicação Pedagógica:'}
            </strong>
            {currentQuiz.explanation}
          </div>
        )}

        {showExplanation && (
          <div className="flex justify-end">
            <button
              onClick={handleNextQuiz}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase transition-all shadow-md"
            >
              Próxima Questão
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
