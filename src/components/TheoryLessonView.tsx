import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TheoryLesson, TheoryReference } from '../types';
import { theoryModules } from '../data/theoryModules';
import { theoryLessons } from '../data/theoryLessons';
import { theoryReferences, getTheoryReferenceById } from '../data/theoryReferences';
import { getTheoryQuizzesByLessonId } from '../data/theoryQuizzes';
import { getTheoryFlashcardsByLessonId } from '../data/theoryFlashcards';
import { getTheoryVideosByLessonId } from '../data/theoryVideos';
import { useTheoryProgress } from '../hooks/useTheoryProgress';
import { useSubscription } from '../contexts/SubscriptionContext';
import { TheoryQuiz } from './TheoryQuiz';
import { TheoryVideoEmbed } from './TheoryVideoEmbed';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Star,
  Clock,
  Users,
  ShieldAlert,
  HelpCircle,
  Volume2,
  VolumeX,
  Type,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TheoryLessonViewProps {
  lesson: TheoryLesson;
}

export function TheoryLessonView({ lesson }: TheoryLessonViewProps) {
  const navigate = useNavigate();
  const { isFree, checkCanAccessContent } = useSubscription();
  const {
    theoryProgress,
    toggleLessonCompletion,
    toggleFavorite,
    saveLessonNote,
    addToReviewSchedule,
    recordAccess,
    recordQuizScore,
    isTrackUnlocked,
    getTrackStatus
  } = useTheoryProgress();

  const isUnlocked = isTrackUnlocked(lesson.trackNumber);
  const trackStatus = getTrackStatus(lesson.trackNumber);
  const prevTrack = trackStatus.prevTrack;
  const hasAccess = checkCanAccessContent('theory', lesson.slug);


  // Acessibilidade: Tamanho de fonte & Leitor de voz
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);
  const [showScenarioExplanation, setShowScenarioExplanation] = useState(false);

  const isCompleted = theoryProgress.completedLessons.includes(lesson.id);
  const isFavorite = theoryProgress.favorites.includes(lesson.id);
  const currentModule = theoryModules.find(m => m.slug === lesson.trackSlug);
  const quizzes = getTheoryQuizzesByLessonId(lesson.id);
  const flashcards = getTheoryFlashcardsByLessonId(lesson.id);
  const theoryVideos = getTheoryVideosByLessonId(lesson.id);

  // Registrar acesso recente
  useEffect(() => {
    recordAccess(lesson.slug, lesson.trackSlug);
    // Carregar nota salva
    if (theoryProgress.notes[lesson.id]) {
      setPersonalNote(theoryProgress.notes[lesson.id]);
    } else {
      setPersonalNote('');
    }
    // Resetar estados locais ao mudar de aula
    setIsFlashcardFlipped(false);
    setActiveFlashcardIndex(0);
    setScenarioAnswer(null);
    setShowScenarioExplanation(false);
    // Parar síntese de voz se estiver ativa
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [lesson.slug, lesson.id]);

  // Síntese de voz
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura por voz.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const fullTextToRead = `${lesson.title}. ${lesson.subtitle}. ${lesson.introduction}. ${lesson.sections.map(s => s.title + '. ' + s.content).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullTextToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handlePronounceJapanese = (word: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveNote = () => {
    saveLessonNote(lesson.id, personalNote);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  const handleScheduleReview = (days: 1 | 7 | 15 | 30) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    addToReviewSchedule({
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      trackSlug: lesson.trackSlug,
      nextReviewDate: targetDate.toISOString(),
      intervalDays: days,
      reviewsCount: 1
    });
    alert(`Aula agendada para revisão em ${days} dias (${targetDate.toLocaleDateString('pt-BR')})!`);
  };

  // Navegação anterior e próxima
  const allTrackLessons = theoryLessons.filter(l => l.trackSlug === lesson.trackSlug);
  const currentIndex = allTrackLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allTrackLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allTrackLessons.length - 1 ? allTrackLessons[currentIndex + 1] : null;

  // Se a trilha estiver bloqueada por pré-requisito sequencial
  if (!isUnlocked && prevTrack) {
    const prevStatus = getTrackStatus(prevTrack.trackNumber);
    return (
      <div className="max-w-2xl mx-auto text-center py-14 px-4 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-lg">
          <Lock size={36} />
        </div>
        
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/20">
            Progressão Pedagógica Sequencial
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            Trilha {lesson.trackNumber} Bloqueada
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Para garantir o aprendizado seguro e gradual dos valores e técnicas do Judô, conclua todas as aulas da <strong>Trilha {prevTrack.trackNumber}: {prevTrack.title}</strong> antes de iniciar a <strong>Trilha {lesson.trackNumber}: {lesson.trackTitle}</strong>.
          </p>
        </div>

        {/* Status da Trilha Pré-requisito */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-left space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              Trilha {prevTrack.trackNumber}: {prevTrack.title}
            </span>
            <span className="font-black text-amber-600 dark:text-amber-400">
              {prevStatus.completed} de {prevStatus.total} aulas ({prevStatus.percentage}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${prevStatus.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-500">
            Faltam {prevStatus.total - prevStatus.completed} aula(s) para liberar o acesso a esta trilha.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to={`/formacao-teorica/${prevTrack.slug}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <BookOpen size={16} />
            <span>Ir para a Trilha {prevTrack.trackNumber}</span>
          </Link>
          <Link
            to="/formacao-teorica"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors text-center"
          >
            Ver Todas as Trilhas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full min-w-0 max-w-4xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb & Barra Superior */}
      <nav aria-label="Navegação da Trilha" className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/formacao-teorica" className="hover:text-amber-500 font-bold">
            Formação Teórica
          </Link>
          <span>/</span>
          <Link to={`/formacao-teorica/${lesson.trackSlug}`} className="hover:text-amber-500 font-medium">
            {lesson.trackTitle}
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-bold truncate max-w-[200px] sm:max-w-none">
            Aula {lesson.lessonNumber}
          </span>
        </div>

        {/* Controles de Acessibilidade */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={cn(
              'p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer',
              isSpeaking ? 'bg-amber-500 text-zinc-950 font-black' : 'text-zinc-600 dark:text-zinc-400 hover:text-amber-500'
            )}
            title={isSpeaking ? 'Parar leitura por voz' : 'Ouvir aula com voz narrada'}
            aria-label={isSpeaking ? 'Parar leitura por voz' : 'Ouvir aula com voz narrada'}
          >
            {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="hidden sm:inline">{isSpeaking ? 'Parar' : 'Ouvir'}</span>
          </button>

          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />

          <button
            type="button"
            onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal')}
            className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            title="Ajustar tamanho da fonte"
            aria-label="Ajustar tamanho da fonte"
          >
            <Type size={15} />
            <span className="font-mono text-[11px]">
              {fontSize === 'normal' ? '1x' : fontSize === 'large' ? '1.2x' : '1.4x'}
            </span>
          </button>
        </div>
      </nav>

      {/* Cabeçalho da Aula */}
      <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">
            Trilha {lesson.trackNumber} • Aula {lesson.lessonNumber}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
            <Clock size={12} /> {lesson.estimatedTimeMinutes} min de leitura
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
            <Users size={12} /> {lesson.recommendedAge}
          </span>
          {!hasAccess && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-500 font-bold border border-amber-500/30">
              <Lock size={12} /> Plano Fundador
            </span>
          )}
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            v{lesson.version}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
          {lesson.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
          {lesson.subtitle}
        </p>

        {/* Botões de Ação: Favoritar & Marcar Conclusão (se tiver acesso) */}
        {hasAccess && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => toggleLessonCompletion(lesson.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm',
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800'
              )}
            >
              {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>{isCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(lesson.id)}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer',
                isFavorite
                  ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-amber-500'
              )}
            >
              <Star size={15} className={isFavorite ? 'fill-amber-500 text-amber-500' : ''} />
              <span>{isFavorite ? 'Favoritada' : 'Favoritar'}</span>
            </button>

            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              <RotateCcw size={13} className="text-amber-500" />
              <span>Revisar em:</span>
              <button onClick={() => handleScheduleReview(1)} className="hover:text-amber-500 px-1 font-bold">1d</button>
              <span>•</span>
              <button onClick={() => handleScheduleReview(7)} className="hover:text-amber-500 px-1 font-bold">7d</button>
              <span>•</span>
              <button onClick={() => handleScheduleReview(15)} className="hover:text-amber-500 px-1 font-bold">15d</button>
              <span>•</span>
              <button onClick={() => handleScheduleReview(30)} className="hover:text-amber-500 px-1 font-bold">30d</button>
            </div>
          </div>
        )}
      </header>

      {!hasAccess ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border-2 border-amber-500/30 text-center max-w-2xl mx-auto shadow-xl my-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-500">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] tracking-wide mb-3">
            Trilha Teórica Exclusiva do Acesso Completo
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Esta aula aprofundada faz parte da Formação Teórica autoral do Dojo Digital (7 trilhas com flashcards, quizzes e Caderno Técnico). Desbloqueie todo o conteúdo por uma única taxa de R$ 97,00.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              to="/planos"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>Liberar Acesso Completo (R$ 97,00)</span>
            </Link>
            <Link
              to="/formacao-teorica"
              className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-2xl transition-all"
            >
              Ver Todas as Trilhas
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Aviso de Segurança e Salvaguarda Pedagógica */}
          {lesson.safetyWarning && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-3">
              <ShieldAlert size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-bold">Aviso de Segurança:</strong> {lesson.safetyWarning}
              </div>
            </div>
          )}

      {/* Objetivos de Aprendizagem */}
      <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 size={14} /> Objetivos de Aprendizagem desta Aula
        </h2>
        <ul className="grid gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Introdução Curta (máx 100 palavras) */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
          Introdução
        </h2>
        <p className={cn(
          'leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium',
          fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base'
        )}>
          {lesson.introduction}
        </p>
      </section>

      {/* Blocos de Conteúdo Principal */}
      <div className="space-y-6">
        {lesson.sections.map((sec, idx) => (
          <section key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                {sec.title}
              </h2>
            </div>
            <p className={cn(
              'leading-relaxed text-zinc-700 dark:text-zinc-300 pl-10',
              fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-sm sm:text-base'
            )}>
              {sec.content}
            </p>
          </section>
        ))}
      </div>

      {/* Os 3 Boxes Pedagógicos: Em Resumo, No Tatame, Na Vida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Box 1: Em Resumo */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            <span className="p-1 rounded-lg bg-zinc-200 dark:bg-zinc-800">📌</span>
            Em Resumo
          </div>
          <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            {lesson.summaryPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 2: No Tatame */}
        <div className="bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <span className="p-1 rounded-lg bg-emerald-500/20">🥋</span>
            No Tatame
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {lesson.onTatame}
          </p>
        </div>

        {/* Box 3: Na Vida */}
        <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span className="p-1 rounded-lg bg-amber-500/20">🌍</span>
            Na Vida
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {lesson.inLife}
          </p>
        </div>
      </div>

      {/* Palavra Japonesa da Aula */}
      <section className="bg-gradient-to-r from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
            Palavra Japonesa da Aula
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {lesson.japaneseWord.romaji}
            </h3>
            {lesson.japaneseWord.kanji && (
              <span className="text-2xl font-serif text-amber-400/80">
                {lesson.japaneseWord.kanji}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Pronúncia fonética: [{lesson.japaneseWord.pronunciation}]
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
            {lesson.japaneseWord.definition}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handlePronounceJapanese(lesson.japaneseWord.romaji)}
          className="px-4 py-3 rounded-2xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-black text-xs flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
        >
          <Volume2 size={16} />
          <span>Ouvir Pronúncia</span>
        </button>
      </section>

      {/* Referência Audiovisual Complementar (se disponível) */}
      {theoryVideos.length > 0 && (
        <div className="space-y-4">
          {theoryVideos.map((tv) => (
            <TheoryVideoEmbed key={tv.id} video={tv} />
          ))}
        </div>
      )}

      {/* Cenário de Reflexão & Dilema de Decisão */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles size={16} />
          Cenário de Reflexão • Dilema de Decisão Ética
        </div>

        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
          {lesson.reflectionScenario.question}
        </h3>

        <div className="space-y-2.5">
          {lesson.reflectionScenario.options.map((opt, oIdx) => {
            const isSelected = scenarioAnswer === oIdx;
            const isCorrect = oIdx === lesson.reflectionScenario.correctOptionIndex;

            let btnClass = 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300';
            if (isSelected) {
              btnClass = isCorrect
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-bold'
                : 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-300 font-semibold';
            }

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => {
                  setScenarioAnswer(oIdx);
                  setShowScenarioExplanation(true);
                }}
                className={cn(
                  'w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer',
                  btnClass
                )}
              >
                <span className="w-5 h-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {showScenarioExplanation && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 leading-relaxed">
            <strong className="font-bold block mb-1">Explicação do Sensei:</strong>
            {lesson.reflectionScenario.explanation}
          </div>
        )}
      </section>

      {/* Flashcards Interativos */}
      {flashcards.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Layers size={16} />
              Flashcards da Aula ({activeFlashcardIndex + 1} de {flashcards.length})
            </div>
            <span className="text-[11px] text-zinc-400">Clique no cartão para virar</span>
          </div>

          <div
            onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
            className="min-h-[180px] bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 border-2 border-dashed border-amber-500/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-amber-500 shadow-inner group"
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
              {isFlashcardFlipped ? 'Resposta (Verso)' : 'Pergunta (Frente)'}
            </div>
            <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 max-w-lg leading-snug">
              {isFlashcardFlipped ? flashcards[activeFlashcardIndex].back : flashcards[activeFlashcardIndex].front}
            </p>
            {!isFlashcardFlipped && flashcards[activeFlashcardIndex].hint && (
              <p className="text-xs text-zinc-400 mt-3 italic">
                Dica: {flashcards[activeFlashcardIndex].hint}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={activeFlashcardIndex === 0}
              onClick={() => {
                setActiveFlashcardIndex(prev => Math.max(0, prev - 1));
                setIsFlashcardFlipped(false);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold disabled:opacity-30 cursor-pointer"
            >
              Anterior
            </button>
            <div className="flex gap-1.5">
              {flashcards.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    i === activeFlashcardIndex ? 'bg-amber-500 w-4' : 'bg-zinc-300 dark:bg-zinc-700'
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              disabled={activeFlashcardIndex === flashcards.length - 1}
              onClick={() => {
                setActiveFlashcardIndex(prev => Math.min(flashcards.length - 1, prev + 1));
                setIsFlashcardFlipped(false);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold disabled:opacity-30 cursor-pointer"
            >
              Próximo
            </button>
          </div>
        </section>
      )}

      {/* Quiz de Fixação */}
      {quizzes.length > 0 && (
        <TheoryQuiz
          questions={quizzes}
          lessonTitle={lesson.title}
          onComplete={(score) => recordQuizScore(lesson.id, score)}
        />
      )}

      {/* Caderno Técnico: Anotações Pessoais */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Bookmark size={16} />
            Meu Caderno Técnico • Anotações Pessoais
          </h3>
          {noteSavedFeedback && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 animate-pulse">
              <CheckCircle2 size={13} /> Salvo no Caderno Técnico
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Registre suas reflexões pessoais, dúvidas para levar ao sensei no dojo ou insights desta aula.
        </p>
        <textarea
          value={personalNote}
          onChange={(e) => setPersonalNote(e.target.value)}
          placeholder="Escreva aqui suas anotações sobre esta aula teórica..."
          rows={4}
          className="w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-y"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveNote}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold text-xs shadow-sm cursor-pointer"
          >
            Salvar Anotação
          </button>
        </div>
      </section>

      {/* Fontes e Referências Institucionais */}
      {lesson.referenceIds.length > 0 && (
        <section className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <Info size={14} /> Fontes Institucionais de Referência & Auditoria Editorial
          </h3>
          <div className="grid gap-2 text-xs">
            {lesson.referenceIds.map(refId => {
              const ref = getTheoryReferenceById(refId);
              if (!ref) return null;
              return (
                <div key={ref.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 mr-2">[{ref.id}]</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{ref.entity}:</span> {ref.title}
                  </div>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 shrink-0 mt-1 sm:mt-0"
                  >
                    <span>Abrir fonte oficial</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-zinc-400 pt-1">
            Revisão técnica por: {lesson.technicalReviewer} • Última revisão: {lesson.lastRevisionDate} • Próxima: {lesson.nextRevisionDate}
          </p>
        </section>
      )}
      </>
      )}

      {/* Navegação Inferior de Aulas */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        {prevLesson ? (
          <Link
            to={`/formacao-teorica/${prevLesson.trackSlug}/${prevLesson.slug}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <ChevronLeft size={16} />
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-medium">Aula Anterior</div>
              <div className="truncate max-w-[180px]">{prevLesson.title}</div>
            </div>
          </Link>
        ) : <div />}

        <Link
          to={`/formacao-teorica/${lesson.trackSlug}`}
          className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
        >
          Voltar para a Trilha
        </Link>

        {nextLesson ? (
          <Link
            to={`/formacao-teorica/${nextLesson.trackSlug}/${nextLesson.slug}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold flex items-center justify-end gap-2 transition-transform active:scale-95 shadow-md text-right"
          >
            <div>
              <div className="text-[10px] text-zinc-900/70 uppercase font-medium">Próxima Aula</div>
              <div className="truncate max-w-[180px]">{nextLesson.title}</div>
            </div>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <Link
            to="/formacao-teorica"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>Trilha Concluída! Ver Todas</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
