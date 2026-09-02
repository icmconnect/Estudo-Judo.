import {
  IAuthRepository,
  IUserRepository,
  IProgressRepository,
  IQuizRepository,
  ITechniqueRepository,
  ICertificateRepository,
  IConsentRepository,
  UserAuthSession
} from '../interfaces';
import {
  UserProfile,
  DiagnosticResult,
  IssuedCertificate,
  ParentConsentRecord,
  ReviewItem,
  DetailedBiomechanicalSheet
} from '../../types';
import { LocalUserAdapter, LocalProgressAdapter, LocalQuizAdapter, LocalTechniqueAdapter, LocalCertificateAdapter, LocalConsentAdapter } from './LocalStorageAdapter';
import { QuizStats } from '../../services/storageService';

/**
 * Firestore / Cloud Storage Adapter
 * Implementação pronta para produção para ser vinculada ao Firebase / Firestore SDK.
 * Atualmente utiliza fallback local transparente caso as credenciais da nuvem não estejam ativas.
 */
export class FirestoreAuthAdapter implements IAuthRepository {
  async getCurrentSession(): Promise<UserAuthSession | null> {
    // TODO (Firebase Auth): Integrar com firebase.auth().currentUser
    return {
      uid: 'cloud_pending_user',
      displayName: 'Praticante (Aguardando Auth Firebase)',
      isAnonymous: true,
      provider: 'local'
    };
  }

  async signInAnonymouslyLocally(): Promise<UserAuthSession> {
    return {
      uid: 'cloud_anonymous',
      displayName: 'Praticante Conectado',
      isAnonymous: true,
      provider: 'local'
    };
  }

  async signOut(): Promise<void> {
    // TODO: firebase.auth().signOut()
  }

  isCloudAuthAvailable(): boolean {
    return false; // Retorna false até que o Firebase Project esteja totalmente vinculado
  }
}

export class FirestoreUserAdapter implements IUserRepository {
  private fallback = new LocalUserAdapter();

  async getProfile(defaultProfile: UserProfile): Promise<UserProfile> {
    // TODO: doc(db, 'users', userId).get()
    return this.fallback.getProfile(defaultProfile);
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    // TODO: doc(db, 'users', userId).set(profile, { merge: true })
    return this.fallback.saveProfile(profile);
  }

  async getDiagnostic(): Promise<DiagnosticResult | null> {
    return this.fallback.getDiagnostic();
  }

  async saveDiagnostic(result: DiagnosticResult): Promise<boolean> {
    return this.fallback.saveDiagnostic(result);
  }

  async exportUserDataJSON(): Promise<string> {
    return this.fallback.exportUserDataJSON();
  }

  async clearUserData(): Promise<void> {
    await this.fallback.clearUserData();
  }
}

export class FirestoreProgressAdapter implements IProgressRepository {
  private fallback = new LocalProgressAdapter();

  async getCompletedChapters(): Promise<string[]> {
    return this.fallback.getCompletedChapters();
  }

  async markChapterCompleted(chapterSlug: string): Promise<string[]> {
    return this.fallback.markChapterCompleted(chapterSlug);
  }

  async getLastAccessedChapter(): Promise<string> {
    return this.fallback.getLastAccessedChapter();
  }

  async setLastAccessedChapter(chapterSlug: string): Promise<void> {
    return this.fallback.setLastAccessedChapter(chapterSlug);
  }

  async getStudyMinutes(): Promise<number> {
    return this.fallback.getStudyMinutes();
  }

  async addStudyMinutes(minutes: number): Promise<number> {
    return this.fallback.addStudyMinutes(minutes);
  }
}

export class FirestoreQuizAdapter implements IQuizRepository {
  private fallback = new LocalQuizAdapter();

  async getQuizStats(): Promise<QuizStats> {
    return this.fallback.getQuizStats();
  }

  async saveQuizAttempt(attempt: {
    quizId: string;
    category: string;
    question: string;
    selectedOption: number;
    correctIndex: number;
    isCorrect: boolean;
  }): Promise<QuizStats> {
    return this.fallback.saveQuizAttempt(attempt);
  }

  async resetQuizStats(): Promise<void> {
    return this.fallback.resetQuizStats();
  }
}

export class FirestoreTechniqueAdapter implements ITechniqueRepository {
  private fallback = new LocalTechniqueAdapter();

  async getFavorites(): Promise<string[]> {
    return this.fallback.getFavorites();
  }

  async toggleFavorite(techId: string): Promise<string[]> {
    return this.fallback.toggleFavorite(techId);
  }

  async getNotes(): Promise<Record<string, string>> {
    return this.fallback.getNotes();
  }

  async saveNote(techId: string, text: string): Promise<Record<string, string>> {
    return this.fallback.saveNote(techId, text);
  }

  async getReviews(): Promise<ReviewItem[]> {
    return this.fallback.getReviews();
  }

  async saveReviews(items: ReviewItem[]): Promise<void> {
    return this.fallback.saveReviews(items);
  }

  async getDetailedSheet(techId: string, defaultTitle: string, defaultCategory: string): Promise<DetailedBiomechanicalSheet> {
    return this.fallback.getDetailedSheet(techId, defaultTitle, defaultCategory);
  }
}

export class FirestoreCertificateAdapter implements ICertificateRepository {
  private fallback = new LocalCertificateAdapter();

  async getIssuedCertificates(): Promise<IssuedCertificate[]> {
    return this.fallback.getIssuedCertificates();
  }

  async issueCertificate(certificate: IssuedCertificate): Promise<IssuedCertificate[]> {
    return this.fallback.issueCertificate(certificate);
  }

  async verifyCertificate(code: string): Promise<IssuedCertificate | null> {
    return this.fallback.verifyCertificate(code);
  }
}

export class FirestoreConsentAdapter implements IConsentRepository {
  private fallback = new LocalConsentAdapter();

  async getConsentRecord(): Promise<ParentConsentRecord | null> {
    return this.fallback.getConsentRecord();
  }

  async saveConsentRecord(record: Omit<ParentConsentRecord, 'id' | 'givenAt' | 'lastUpdated' | 'isBackendSynced'>): Promise<ParentConsentRecord> {
    return this.fallback.saveConsentRecord(record);
  }

  async hasApprovedConsent(): Promise<boolean> {
    return this.fallback.hasApprovedConsent();
  }
}
