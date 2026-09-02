import {
  UserProfile,
  DiagnosticResult,
  ReviewItem,
  TrainingJournalEntry,
  DoubtQuestion,
  IssuedCertificate
} from '../types';

// Chaves de Armazenamento Versionadas (v3 - Dojo Digital Storage)
const KEYS = {
  PROFILE: 'dojo_digital_v3_profile',
  DIAGNOSTIC: 'dojo_digital_v3_diagnostic',
  PROGRESS: 'dojo_digital_v3_progress',
  FAVORITES: 'dojo_digital_v3_favorites',
  NOTES: 'dojo_digital_v3_notes',
  REVIEWS: 'dojo_digital_v3_reviews',
  QUIZ_STATS: 'dojo_digital_v3_quiz_stats',
  TRAINING_JOURNAL: 'dojo_digital_v3_journal',
  DOUBTS: 'dojo_digital_v3_doubts',
  STUDY_MINUTES: 'dojo_digital_v3_study_minutes',
  CERTIFICATES: 'dojo_digital_v3_certificates',
};

// Chaves legadas para migração automática e transparente
const LEGACY_KEYS = {
  PROFILE: ['dojo_digital_profile_v2', 'dojo_profile'],
  PROGRESS: ['dojo_digital_progress_v1', 'dojo_progress'],
  FAVORITES: ['dojo_digital_favorites_v2', 'dojo_favorites'],
  NOTES: ['dojo_digital_tech_notes_v2'],
  REVIEWS: ['dojo_digital_reviews_v2'],
  DIAGNOSTIC: ['dojo_digital_diagnostic_v2'],
  STUDY_MINUTES: ['dojo_digital_study_minutes_v2']
};

export interface QuizAttempt {
  quizId: string;
  category: string;
  question: string;
  selectedOption: number;
  correctIndex: number;
  isCorrect: boolean;
  timestamp: string;
}

export interface QuizStats {
  totalAttempted: number;
  totalCorrect: number;
  history: QuizAttempt[];
  wrongQuizIds: string[];
}

export interface ProgressState {
  completedChapters: string[];
  lastAccessedChapter: string;
  completedAtMap: Record<string, string>;
}

// Memory fallback caso localStorage esteja bloqueado no iFrame/sandbox
const inMemoryStore: Record<string, string> = {};

function getItem<T>(key: string, legacyKeys: string[] = []): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(key);
    if (data !== null) return JSON.parse(data) as T;

    // Tentativa de migração de chaves legadas
    for (const legacyKey of legacyKeys) {
      const legacyData = localStorage.getItem(legacyKey);
      if (legacyData !== null) {
        const parsed = JSON.parse(legacyData) as T;
        // Salva na chave oficial v3
        localStorage.setItem(key, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch (error) {
    console.warn(`[DojoStorageService] LocalStorage indisponível para ${key}, utilizando memória fallback.`, error);
    if (inMemoryStore[key]) {
      try {
        return JSON.parse(inMemoryStore[key]) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
}

function setItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    inMemoryStore[key] = serialized;
    return true;
  } catch (error) {
    console.error(`[DojoStorageService] Erro ao salvar ${key}:`, error);
    try {
      inMemoryStore[key] = JSON.stringify(value);
    } catch (e) {
      console.error(`[DojoStorageService] Erro na memória fallback:`, e);
    }
    return false;
  }
}

export const DojoStorageService = {
  // --- PERFIL ---
  getProfile(defaultProfile: UserProfile): UserProfile {
    return getItem<UserProfile>(KEYS.PROFILE, LEGACY_KEYS.PROFILE) || defaultProfile;
  },

  saveProfile(profile: UserProfile): boolean {
    const updated = { ...profile, lastUpdated: new Date().toISOString() };
    return setItem(KEYS.PROFILE, updated);
  },

  // --- DIAGNÓSTICO ---
  getDiagnostic(): DiagnosticResult | null {
    return getItem<DiagnosticResult>(KEYS.DIAGNOSTIC, LEGACY_KEYS.DIAGNOSTIC);
  },

  saveDiagnostic(result: DiagnosticResult): boolean {
    return setItem(KEYS.DIAGNOSTIC, result);
  },

  // --- PROGRESSO DE AULAS ---
  getProgress(): ProgressState {
    const saved = getItem<ProgressState | string[]>(KEYS.PROGRESS, LEGACY_KEYS.PROGRESS);
    if (!saved) {
      return { completedChapters: [], lastAccessedChapter: 'introducao', completedAtMap: {} };
    }
    if (Array.isArray(saved)) {
      return { completedChapters: saved, lastAccessedChapter: saved[saved.length - 1] || 'introducao', completedAtMap: {} };
    }
    return saved;
  },

  saveProgress(progress: ProgressState): boolean {
    return setItem(KEYS.PROGRESS, progress);
  },

  toggleChapterCompletion(slug: string): ProgressState {
    const current = this.getProgress();
    const isComp = current.completedChapters.includes(slug);
    const updatedChapters = isComp
      ? current.completedChapters.filter((s) => s !== slug)
      : [...current.completedChapters, slug];
    
    const updatedMap = { ...current.completedAtMap };
    if (!isComp) {
      updatedMap[slug] = new Date().toISOString();
    } else {
      delete updatedMap[slug];
    }

    const updatedState: ProgressState = {
      completedChapters: updatedChapters,
      lastAccessedChapter: slug,
      completedAtMap: updatedMap,
    };
    this.saveProgress(updatedState);
    return updatedState;
  },

  setLastAccessedChapter(slug: string): void {
    const current = this.getProgress();
    this.saveProgress({ ...current, lastAccessedChapter: slug });
  },

  // --- FAVORITOS ---
  getFavorites(defaultFavorites: string[] = []): string[] {
    return getItem<string[]>(KEYS.FAVORITES, LEGACY_KEYS.FAVORITES) || defaultFavorites;
  },

  saveFavorites(favorites: string[]): boolean {
    return setItem(KEYS.FAVORITES, favorites);
  },

  toggleFavorite(techId: string, defaultFavorites: string[] = []): string[] {
    const current = this.getFavorites(defaultFavorites);
    const isFav = current.includes(techId);
    const updated = isFav ? current.filter((id) => id !== techId) : [...current, techId];
    this.saveFavorites(updated);
    return updated;
  },

  // --- ANOTAÇÕES TÉCNICAS ---
  getNotes(defaultNotes: Record<string, string> = {}): Record<string, string> {
    return getItem<Record<string, string>>(KEYS.NOTES, LEGACY_KEYS.NOTES) || defaultNotes;
  },

  saveNote(techId: string, noteText: string): Record<string, string> {
    const current = this.getNotes();
    const updated = { ...current, [techId]: noteText };
    setItem(KEYS.NOTES, updated);
    return updated;
  },

  // --- REVISÕES & FLASHCARDS ---
  getReviews(defaultReviews: ReviewItem[] = []): ReviewItem[] {
    return getItem<ReviewItem[]>(KEYS.REVIEWS, LEGACY_KEYS.REVIEWS) || defaultReviews;
  },

  saveReviews(reviews: ReviewItem[]): boolean {
    return setItem(KEYS.REVIEWS, reviews);
  },

  // --- ESTATÍSTICAS E HISTÓRICO DE QUIZ ---
  getQuizStats(): QuizStats {
    const defaultStats: QuizStats = {
      totalAttempted: 0,
      totalCorrect: 0,
      history: [],
      wrongQuizIds: [],
    };
    return getItem<QuizStats>(KEYS.QUIZ_STATS) || defaultStats;
  },

  recordQuizAttempt(attempt: QuizAttempt): QuizStats {
    const current = this.getQuizStats();
    const updatedHistory = [attempt, ...current.history.slice(0, 49)]; // Guarda até 50 tentativas
    const updatedAttempted = current.totalAttempted + 1;
    const updatedCorrect = attempt.isCorrect ? current.totalCorrect + 1 : current.totalCorrect;
    
    let updatedWrong = [...current.wrongQuizIds];
    if (!attempt.isCorrect && !updatedWrong.includes(attempt.quizId)) {
      updatedWrong.push(attempt.quizId);
    } else if (attempt.isCorrect) {
      updatedWrong = updatedWrong.filter((id) => id !== attempt.quizId);
    }

    const updatedStats: QuizStats = {
      totalAttempted: updatedAttempted,
      totalCorrect: updatedCorrect,
      history: updatedHistory,
      wrongQuizIds: updatedWrong,
    };
    setItem(KEYS.QUIZ_STATS, updatedStats);
    return updatedStats;
  },

  // --- MINUTOS DE ESTUDO ---
  getStudyMinutes(defaultMins: number = 45): number {
    const val = getItem<number>(KEYS.STUDY_MINUTES, LEGACY_KEYS.STUDY_MINUTES);
    return val !== null ? val : defaultMins;
  },

  addStudyMinutes(mins: number): number {
    const current = this.getStudyMinutes(45);
    const updated = current + mins;
    setItem(KEYS.STUDY_MINUTES, updated);
    return updated;
  },

  // --- DIÁRIO DE TREINO ---
  getTrainingJournal(): TrainingJournalEntry[] {
    return getItem<TrainingJournalEntry[]>(KEYS.TRAINING_JOURNAL) || [];
  },

  saveTrainingJournal(entries: TrainingJournalEntry[]): boolean {
    return setItem(KEYS.TRAINING_JOURNAL, entries);
  },

  // --- CERTIFICADOS ---
  getCertificates(): IssuedCertificate[] {
    return getItem<IssuedCertificate[]>(KEYS.CERTIFICATES) || [];
  },

  saveCertificate(cert: IssuedCertificate): IssuedCertificate[] {
    const current = this.getCertificates();
    const updated = [cert, ...current];
    setItem(KEYS.CERTIFICATES, updated);
    return updated;
  },

  // --- RESET TOTAL DE DADOS DA CONTA DO ALUNO ---
  resetAllData(): void {
    if (typeof window === 'undefined') return;
    try {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.error('Erro ao resetar dados:', e);
    }
  }
};
