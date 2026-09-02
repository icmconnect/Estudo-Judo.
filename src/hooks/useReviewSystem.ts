import { useState, useEffect, useCallback } from 'react';
import { ReviewItem } from '../types';
import { DojoStorageService } from '../services/storageService';

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-init-1',
    type: 'tecnica',
    title: 'O-Soto-Gari (Grande Ceifada Exterior)',
    japaneseTitle: '大外刈',
    category: 'Ashi-waza',
    sourceId: 'AS_004',
    addedAt: new Date(Date.now() - 86400000).toISOString(),
    nextReviewDate: new Date().toISOString(),
    intervalDays: 1,
    reviewsCount: 1,
    isFavorite: true,
    securityTip: 'Uke deve manter o queixo colado ao peito para proteger a nuca.'
  },
  {
    id: 'rev-init-2',
    type: 'termo',
    title: 'Kuzushi (Quebra de Equilíbrio)',
    japaneseTitle: '崩し',
    category: 'Fundamentos',
    sourceId: 'term-kuzushi',
    addedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    nextReviewDate: new Date().toISOString(),
    intervalDays: 1,
    reviewsCount: 0,
    securityTip: 'Fundamental para não exigir força bruta prejudicial às articulações.'
  }
];

const DEFAULT_FAVORITES = ['AS_004', 'TE_001'];
const DEFAULT_NOTES = {
  'AS_004': 'Focar em não soltar a manga do Uke no momento da queda e avançar com firmeza.'
};

export function useReviewSystem() {
  const [reviews, setReviewsState] = useState<ReviewItem[]>(() =>
    DojoStorageService.getReviews(INITIAL_REVIEWS)
  );

  const [favorites, setFavoritesState] = useState<string[]>(() =>
    DojoStorageService.getFavorites(DEFAULT_FAVORITES)
  );

  const [notes, setNotesState] = useState<Record<string, string>>(() =>
    DojoStorageService.getNotes(DEFAULT_NOTES)
  );

  // Sincronização multi-aba
  useEffect(() => {
    const handleStorageChange = () => {
      setReviewsState(DojoStorageService.getReviews(INITIAL_REVIEWS));
      setFavoritesState(DojoStorageService.getFavorites(DEFAULT_FAVORITES));
      setNotesState(DojoStorageService.getNotes(DEFAULT_NOTES));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addReviewItem = useCallback((item: Omit<ReviewItem, 'id' | 'addedAt' | 'nextReviewDate' | 'intervalDays' | 'reviewsCount'>) => {
    setReviewsState((prev) => {
      const existing = prev.find((r) => r.sourceId === item.sourceId);
      if (existing) return prev;

      const newItem: ReviewItem = {
        ...item,
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        addedAt: new Date().toISOString(),
        nextReviewDate: new Date().toISOString(),
        intervalDays: 1,
        reviewsCount: 0
      };
      const updated = [newItem, ...prev];
      DojoStorageService.saveReviews(updated);
      return updated;
    });
  }, []);

  const completeReview = useCallback((id: string) => {
    setReviewsState((prev) => {
      const updated = prev.map((item) => {
        if (item.id !== id) return item;
        
        let nextInterval: 1 | 7 | 15 | 30 = 7;
        if (item.intervalDays === 1) nextInterval = 7;
        else if (item.intervalDays === 7) nextInterval = 15;
        else if (item.intervalDays === 15) nextInterval = 30;
        else nextInterval = 30;

        const nextDate = new Date(Date.now() + nextInterval * 86400000).toISOString();

        return {
          ...item,
          reviewsCount: item.reviewsCount + 1,
          intervalDays: nextInterval,
          nextReviewDate: nextDate
        };
      });

      DojoStorageService.saveReviews(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((techId: string) => {
    const updated = DojoStorageService.toggleFavorite(techId, DEFAULT_FAVORITES);
    setFavoritesState(updated);
  }, []);

  const saveNote = useCallback((techId: string, noteText: string) => {
    const updated = DojoStorageService.saveNote(techId, noteText);
    setNotesState(updated);
  }, []);

  const pendingReviewsCount = reviews.filter(
    (r) => new Date(r.nextReviewDate).getTime() <= Date.now() + 3600000
  ).length;

  return {
    reviews,
    addReviewItem,
    completeReview,
    favorites,
    toggleFavorite,
    isFavorite: (techId: string) => favorites.includes(techId),
    notes,
    saveNote,
    getNote: (techId: string) => notes[techId] || '',
    pendingReviewsCount
  };
}
