import { useState, useEffect, useCallback } from 'react';
import { TheoryProgressState, TheoryReviewScheduleItem } from '../types';
import { theoryLessons } from '../data/theoryLessons';
import { theoryModules } from '../data/theoryModules';

const THEORY_STORAGE_KEY = 'dojo_digital_theory_progress_v1';

const defaultTheoryState: TheoryProgressState = {
  completedLessons: [],
  studyMinutes: 0,
  favorites: [],
  notes: {},
  scheduledReviews: [],
  quizScores: {}
};

function getInitialState(): TheoryProgressState {
  try {
    const raw = localStorage.getItem(THEORY_STORAGE_KEY);
    if (!raw) return defaultTheoryState;
    return { ...defaultTheoryState, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Erro ao carregar progresso da Formação Teórica do localStorage:', err);
    return defaultTheoryState;
  }
}

function saveState(state: TheoryProgressState): void {
  try {
    localStorage.setItem(THEORY_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Erro ao salvar progresso da Formação Teórica no localStorage:', err);
  }
}

export function useTheoryProgress() {
  const [state, setState] = useState<TheoryProgressState>(getInitialState);

  // Sincronização multi-aba
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEORY_STORAGE_KEY && e.newValue) {
        try {
          setState(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Erro ao sincronizar evento de storage teórico:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleLessonCompletion = useCallback((lessonId: string) => {
    setState(prev => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const updatedList = isCompleted
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      const nextState: TheoryProgressState = {
        ...prev,
        completedLessons: updatedList,
        studyMinutes: isCompleted ? prev.studyMinutes : prev.studyMinutes + 6
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const markLessonCompleted = useCallback((lessonId: string) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const nextState: TheoryProgressState = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        studyMinutes: prev.studyMinutes + 6
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const recordAccess = useCallback((lessonSlug: string, trackSlug: string) => {
    setState(prev => {
      const nextState: TheoryProgressState = {
        ...prev,
        lastAccessedLessonSlug: lessonSlug,
        lastAccessedTrackSlug: trackSlug
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const toggleFavorite = useCallback((lessonId: string) => {
    setState(prev => {
      const isFav = prev.favorites.includes(lessonId);
      const updatedFavs = isFav
        ? prev.favorites.filter(id => id !== lessonId)
        : [...prev.favorites, lessonId];
      const nextState: TheoryProgressState = {
        ...prev,
        favorites: updatedFavs
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const saveLessonNote = useCallback((lessonId: string, noteText: string) => {
    setState(prev => {
      const nextState: TheoryProgressState = {
        ...prev,
        notes: {
          ...prev.notes,
          [lessonId]: noteText
        }
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const addToReviewSchedule = useCallback((item: Omit<TheoryReviewScheduleItem, 'addedAt'>) => {
    setState(prev => {
      const existingIdx = prev.scheduledReviews.findIndex(r => r.lessonId === item.lessonId);
      const newItem: TheoryReviewScheduleItem = {
        ...item,
        addedAt: new Date().toISOString()
      };

      const nextReviews = [...prev.scheduledReviews];
      if (existingIdx >= 0) {
        nextReviews[existingIdx] = newItem;
      } else {
        nextReviews.push(newItem);
      }

      const nextState: TheoryProgressState = {
        ...prev,
        scheduledReviews: nextReviews
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const recordQuizScore = useCallback((lessonId: string, score: number) => {
    setState(prev => {
      const nextState: TheoryProgressState = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [lessonId]: score
        }
      };
      saveState(nextState);
      return nextState;
    });
  }, []);

  const getTrackProgress = useCallback((trackLessons: { id: string }[]) => {
    if (!trackLessons || trackLessons.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = trackLessons.filter(l => state.completedLessons.includes(l.id)).length;
    const total = trackLessons.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  }, [state.completedLessons]);

  // Regra pedagógica sequencial: Trilha 1 sempre aberta. Trilha N exige conclusão total da Trilha N-1.
  const isTrackUnlocked = useCallback((trackNumber: number): boolean => {
    if (trackNumber <= 1) return true;
    for (let t = 1; t < trackNumber; t++) {
      const prevTrackLessons = theoryLessons.filter(l => l.trackNumber === t);
      if (prevTrackLessons.length === 0) continue;
      const allDone = prevTrackLessons.every(l => state.completedLessons.includes(l.id));
      if (!allDone) return false;
    }
    return true;
  }, [state.completedLessons]);

  const getTrackStatus = useCallback((trackNumber: number) => {
    const trackLessons = theoryLessons.filter(l => l.trackNumber === trackNumber);
    const total = trackLessons.length;
    const completed = trackLessons.filter(l => state.completedLessons.includes(l.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isCompleted = total > 0 && completed === total;
    const isUnlocked = isTrackUnlocked(trackNumber);
    const prevTrack = trackNumber > 1 ? theoryModules.find(m => m.trackNumber === trackNumber - 1) : undefined;

    let status: 'completed' | 'in_progress' | 'available' | 'locked' = 'locked';
    if (isCompleted) {
      status = 'completed';
    } else if (!isUnlocked) {
      status = 'locked';
    } else if (completed > 0) {
      status = 'in_progress';
    } else {
      status = 'available';
    }

    return {
      isUnlocked,
      isCompleted,
      completed,
      total,
      percentage,
      status,
      prevTrack
    };
  }, [state.completedLessons, isTrackUnlocked]);

  const isLessonUnlocked = useCallback((lesson: { trackNumber: number }): boolean => {
    return isTrackUnlocked(lesson.trackNumber);
  }, [isTrackUnlocked]);

  return {
    theoryProgress: state,
    toggleLessonCompletion,
    markLessonCompleted,
    recordAccess,
    toggleFavorite,
    saveLessonNote,
    addToReviewSchedule,
    recordQuizScore,
    getTrackProgress,
    isTrackUnlocked,
    getTrackStatus,
    isLessonUnlocked
  };
}
