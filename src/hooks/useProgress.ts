import { useState, useEffect, useCallback } from 'react';
import { DojoStorageService } from '../services/storageService';

export function useProgress() {
  const [progressState, setProgressState] = useState(() => DojoStorageService.getProgress());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completedChapters = progressState.completedChapters;
  const lastAccessedChapter = progressState.lastAccessedChapter;

  // Sincronização multi-aba
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const fresh = DojoStorageService.getProgress();
        setProgressState(fresh);
      } catch (err) {
        console.warn('Erro ao atualizar progresso via evento:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleChapter = useCallback((slug: string) => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const updated = DojoStorageService.toggleChapterCompletion(slug);
      setProgressState(updated);
    } catch (e: any) {
      setError('Não foi possível salvar a conclusão da aula.');
    } finally {
      setLoading(false);
    }
  }, []);

  const markChapterCompleted = useCallback((slug: string) => {
    if (!slug) return;
    try {
      if (completedChapters.includes(slug)) return;
      const updated = DojoStorageService.toggleChapterCompletion(slug);
      setProgressState(updated);
    } catch (e: any) {
      setError('Erro ao marcar aula como concluída.');
    }
  }, [completedChapters]);

  const markChapterIncomplete = useCallback((slug: string) => {
    if (!slug) return;
    try {
      if (!completedChapters.includes(slug)) return;
      const updated = DojoStorageService.toggleChapterCompletion(slug);
      setProgressState(updated);
    } catch (e: any) {
      setError('Erro ao desmarcar aula.');
    }
  }, [completedChapters]);

  const setLastAccessed = useCallback((slug: string) => {
    if (!slug) return;
    DojoStorageService.setLastAccessedChapter(slug);
    setProgressState((prev) => ({ ...prev, lastAccessedChapter: slug }));
  }, []);

  const isChapterCompleted = useCallback((slug: string): boolean => {
    return completedChapters.includes(slug);
  }, [completedChapters]);

  const getProgressPercentage = useCallback((totalChapters: number): number => {
    if (totalChapters <= 0) return 0;
    const percentage = Math.round((completedChapters.length / totalChapters) * 100);
    return Math.min(100, Math.max(0, percentage));
  }, [completedChapters]);

  const resetProgress = useCallback(() => {
    const emptyState = { completedChapters: [], lastAccessedChapter: 'introducao', completedAtMap: {} };
    DojoStorageService.saveProgress(emptyState);
    setProgressState(emptyState);
  }, []);

  return {
    completedChapters,
    lastAccessedChapter,
    completedAtMap: progressState.completedAtMap,
    loading,
    error,
    toggleChapter,
    markChapterCompleted,
    markChapterIncomplete,
    setLastAccessed,
    isChapterCompleted,
    getProgressPercentage,
    resetProgress,
  };
}
