import { useState, useCallback } from 'react';
import { TrainingJournalEntry } from '../types';

const JOURNAL_STORAGE_KEY = 'dojo_digital_journal_v2';

const INITIAL_JOURNAL: TrainingJournalEntry[] = [
  {
    id: 'journal-1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    location: 'Dojo Principal',
    durationMinutes: 75,
    techniquesStudied: ['O-soto-gari', 'Ushiro-ukemi', 'Hon-kesa-gatame'],
    effortRating: 4,
    injuriesOrDiscomfort: 'Nenhum desconforto. Quedas suaves no tatame.',
    senseiObservations: 'Excelente foco no Kuzushi inicial. Manter a cabeça ereta no Tai-sabaki.',
    nextLessonGoal: 'Treinar entrada combinada de O-soto-gari para Seoi-nage.',
    privateNotes: 'Senti muito mais confiança no amortecimento de quedas para trás.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export function useTrainingJournal() {
  const [entries, setEntriesState] = useState<TrainingJournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler diário de treino:', e);
    }
    return INITIAL_JOURNAL;
  });

  const addEntry = useCallback((entry: Omit<TrainingJournalEntry, 'id' | 'createdAt'>) => {
    setEntriesState((prev) => {
      const newEntry: TrainingJournalEntry = {
        ...entry,
        id: `journal-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const updated = [newEntry, ...prev];
      try {
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar entrada de diário:', e);
      }
      return updated;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntriesState((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao excluir entrada de diário:', e);
      }
      return updated;
    });
  }, []);

  return {
    entries,
    addEntry,
    deleteEntry
  };
}
