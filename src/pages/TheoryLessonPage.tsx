import { useParams, Link } from 'react-router-dom';
import { getTheoryLessonBySlug } from '../data/theoryLessons';
import { TheoryLessonView } from '../components/TheoryLessonView';
import { BookOpen, ArrowLeft } from 'lucide-react';

export function TheoryLessonPage() {
  const { lessonSlug, trackSlug } = useParams<{ trackSlug: string; lessonSlug: string }>();
  const lesson = lessonSlug ? getTheoryLessonBySlug(lessonSlug) : undefined;

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <BookOpen size={32} />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
          Aula Teórica Não Encontrada
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A aula solicitada não foi localizada no catálogo pedagógico ou ainda está em processo de revisão editorial.
        </p>
        <Link
          to="/formacao-teorica"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Voltar para as Trilhas Formativas</span>
        </Link>
      </div>
    );
  }

  return <TheoryLessonView lesson={lesson} />;
}
