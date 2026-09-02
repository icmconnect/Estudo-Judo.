import { useState, useEffect, useCallback } from 'react';
import { DojoStorageService, QuizStats, QuizAttempt } from '../services/storageService';

export function useQuizStore() {
  const [quizStats, setQuizStats] = useState<QuizStats>(() => DojoStorageService.getQuizStats());

  useEffect(() => {
    const handleStorageChange = () => {
      setQuizStats(DojoStorageService.getQuizStats());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const recordAttempt = useCallback(
    (
      quizId: string,
      category: string,
      question: string,
      selectedOption: number,
      correctIndex: number
    ) => {
      const isCorrect = selectedOption === correctIndex;
      const attempt: QuizAttempt = {
        quizId,
        category,
        question,
        selectedOption,
        correctIndex,
        isCorrect,
        timestamp: new Date().toISOString(),
      };
      const updated = DojoStorageService.recordQuizAttempt(attempt);
      setQuizStats(updated);
      return isCorrect;
    },
    []
  );

  const accuracyPercentage =
    quizStats.totalAttempted > 0
      ? Math.round((quizStats.totalCorrect / quizStats.totalAttempted) * 100)
      : 0;

  return {
    quizStats,
    recordAttempt,
    accuracyPercentage,
    totalAttempted: quizStats.totalAttempted,
    totalCorrect: quizStats.totalCorrect,
    history: quizStats.history,
    wrongQuizIds: quizStats.wrongQuizIds,
  };
}
