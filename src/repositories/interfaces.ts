import {
  UserProfile,
  DiagnosticResult,
  IssuedCertificate,
  ParentConsentRecord,
  ReviewItem,
  TrainingJournalEntry,
  DetailedBiomechanicalSheet
} from '../types';
import { QuizStats } from '../services/storageService';

// 1. AuthRepository
export interface UserAuthSession {
  uid: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  provider: 'local' | 'google' | 'email';
}

export interface IAuthRepository {
  getCurrentSession(): Promise<UserAuthSession | null>;
  signInAnonymouslyLocally(): Promise<UserAuthSession>;
  signOut(): Promise<void>;
  isCloudAuthAvailable(): boolean;
}

// 2. UserRepository
export interface IUserRepository {
  getProfile(defaultProfile: UserProfile): Promise<UserProfile>;
  saveProfile(profile: UserProfile): Promise<boolean>;
  getDiagnostic(): Promise<DiagnosticResult | null>;
  saveDiagnostic(result: DiagnosticResult): Promise<boolean>;
  exportUserDataJSON(): Promise<string>;
  clearUserData(): Promise<void>;
}

// 3. ProgressRepository
export interface IProgressRepository {
  getCompletedChapters(): Promise<string[]>;
  markChapterCompleted(chapterSlug: string): Promise<string[]>;
  getLastAccessedChapter(): Promise<string>;
  setLastAccessedChapter(chapterSlug: string): Promise<void>;
  getStudyMinutes(): Promise<number>;
  addStudyMinutes(minutes: number): Promise<number>;
}

// 4. QuizRepository
export interface IQuizRepository {
  getQuizStats(): Promise<QuizStats>;
  saveQuizAttempt(attempt: {
    quizId: string;
    category: string;
    question: string;
    selectedOption: number;
    correctIndex: number;
    isCorrect: boolean;
  }): Promise<QuizStats>;
  resetQuizStats(): Promise<void>;
}

// 5. TechniqueRepository
export interface ITechniqueRepository {
  getFavorites(): Promise<string[]>;
  toggleFavorite(techId: string): Promise<string[]>;
  getNotes(): Promise<Record<string, string>>;
  saveNote(techId: string, text: string): Promise<Record<string, string>>;
  getReviews(): Promise<ReviewItem[]>;
  saveReviews(items: ReviewItem[]): Promise<void>;
  getDetailedSheet(techId: string, defaultTitle: string, defaultCategory: string): Promise<DetailedBiomechanicalSheet>;
}

// 6. CertificateRepository
export interface ICertificateRepository {
  getIssuedCertificates(): Promise<IssuedCertificate[]>;
  issueCertificate(certificate: IssuedCertificate): Promise<IssuedCertificate[]>;
  verifyCertificate(code: string): Promise<IssuedCertificate | null>;
}

// 7. ConsentRepository (Para Responsáveis Legais de Menores)
export interface IConsentRepository {
  getConsentRecord(): Promise<ParentConsentRecord | null>;
  saveConsentRecord(record: Omit<ParentConsentRecord, 'id' | 'givenAt' | 'lastUpdated' | 'isBackendSynced'>): Promise<ParentConsentRecord>;
  hasApprovedConsent(): Promise<boolean>;
}
