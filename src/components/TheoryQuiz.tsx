import { useState } from 'react';
import { TheoryQuizQuestion } from '../types';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

interface TheoryQuizProps {
  questions: TheoryQuizQuestion[];
  lessonTitle: string;
  onComplete?: (score: number) => void;
}

export function TheoryQuiz({ questions, lessonTitle, onComplete }: TheoryQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    if (onComplete) {
      onComplete(score);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle size={14} />
            Quiz de Fixação Pedagógica
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            Teste seus conhecimentos: {lessonTitle}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Responda às 3 perguntas para fixar os conceitos e a segurança da aula.
          </p>
        </div>

        {showResults && (
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shrink-0">
            <Award className={score === questions.length ? "text-emerald-500" : "text-amber-500"} size={24} />
            <div>
              <div className="text-xs text-zinc-500 font-medium">Seu aproveitamento</div>
              <div className="text-base font-black text-zinc-900 dark:text-zinc-100">
                {score} de {questions.length} acertos ({Math.round((score / questions.length) * 100)}%)
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correctOptionIndex;

          return (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-black shrink-0">
                  {qIndex + 1}
                </span>
                <p className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                  {q.question}
                </p>
              </div>

              <div className="grid gap-2.5 pl-10">
                {q.options.map((opt, optIndex) => {
                  const isOptionSelected = userAnswer === optIndex;
                  const isOptionCorrect = optIndex === q.correctOptionIndex;

                  let optClass = 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300';

                  if (isOptionSelected && !showResults) {
                    optClass = 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-500/30';
                  }

                  if (showResults) {
                    if (isOptionCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-bold';
                    } else if (isOptionSelected && !isOptionCorrect) {
                      optClass = 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-300 font-semibold';
                    } else {
                      optClass = 'opacity-50 border-zinc-200 dark:border-zinc-800 text-zinc-500';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3',
                        optClass
                      )}
                    >
                      <span>{opt}</span>
                      {showResults && isOptionCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      )}
                      {showResults && isOptionSelected && !isOptionCorrect && (
                        <XCircle size={18} className="text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={cn(
                  'ml-10 p-3.5 rounded-2xl text-xs sm:text-sm border leading-relaxed',
                  isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-500/5 border-amber-500/20 text-amber-900 dark:text-amber-300'
                )}>
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {isCorrect ? <CheckCircle2 size={15} /> : <HelpCircle size={15} />}
                    {isCorrect ? 'Resposta Correta!' : 'Explicação Pedagógica:'}
                  </div>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!showResults ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className={cn(
              'w-full sm:w-auto px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md',
              allAnswered
                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:scale-[1.02] cursor-pointer'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
            )}
          >
            {allAnswered ? 'Concluir e Ver Respostas' : 'Selecione todas as respostas'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            Refazer Quiz
          </button>
        )}

        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center sm:text-right">
          O resultado deste quiz é registrado no seu perfil para orientar as revisões espaçadas.
        </p>
      </div>
    </div>
  );
}
