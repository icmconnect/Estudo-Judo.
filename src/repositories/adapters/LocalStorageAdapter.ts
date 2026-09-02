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
import { DojoStorageService, QuizStats } from '../../services/storageService';
import { getDetailedSheet as getDetailedSheetFromData } from '../../data/detailedTechniques';

// Local Auth Adapter
export class LocalAuthAdapter implements IAuthRepository {
  async getCurrentSession(): Promise<UserAuthSession | null> {
    const profile = DojoStorageService.getProfile({
      name: 'Judoca Praticante Local',
      ageGroup: '18-39',
      grade: 'Branca (6º Kyu)',
      mainGoal: 'fundamentos',
      weeklyHours: 3,
      interests: ['fundamentos'],
      role: 'aluno',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });

    return {
      uid: 'local_device_user',
      displayName: profile.name,
      isAnonymous: true,
      provider: 'local'
    };
  }

  async signInAnonymouslyLocally(): Promise<UserAuthSession> {
    const session = await this.getCurrentSession();
    return session!;
  }

  async signOut(): Promise<void> {
    // Modo local não encerra sessão no servidor
  }

  isCloudAuthAvailable(): boolean {
    return false;
  }
}

// Local User Adapter
export class LocalUserAdapter implements IUserRepository {
  async getProfile(defaultProfile: UserProfile): Promise<UserProfile> {
    return DojoStorageService.getProfile(defaultProfile);
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    return DojoStorageService.saveProfile(profile);
  }

  async getDiagnostic(): Promise<DiagnosticResult | null> {
    return DojoStorageService.getDiagnostic();
  }

  async saveDiagnostic(result: DiagnosticResult): Promise<boolean> {
    return DojoStorageService.saveDiagnostic(result);
  }

  async exportUserDataJSON(): Promise<string> {
    const profile = DojoStorageService.getProfile({
      name: 'Judoca Praticante',
      ageGroup: '18-39',
      grade: 'Branca (6º Kyu)',
      mainGoal: 'fundamentos',
      weeklyHours: 3,
      interests: ['fundamentos'],
      role: 'aluno',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });
    const progress = DojoStorageService.getProgress();
    const favorites = DojoStorageService.getFavorites();
    const notes = DojoStorageService.getNotes();
    const quizStats = DojoStorageService.getQuizStats();
    const journal = DojoStorageService.getTrainingJournal();
    const certificates = DojoStorageService.getCertificates();
    const reviews = DojoStorageService.getReviews();
    const studyMinutes = DojoStorageService.getStudyMinutes();

    const backup = {
      app: 'Dojo Digital',
      version: '3.0.0',
      exportedAt: new Date().toISOString(),
      storageMode: 'Dispositivo Local (localStorage)',
      userData: {
        profile,
        progress,
        favorites,
        notes,
        reviews,
        quizStats,
        journal,
        certificates,
        studyMinutes
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  async clearUserData(): Promise<void> {
    DojoStorageService.resetAllData();
  }
}

// Local Progress Adapter
export class LocalProgressAdapter implements IProgressRepository {
  async getCompletedChapters(): Promise<string[]> {
    return DojoStorageService.getProgress().completedChapters;
  }

  async markChapterCompleted(chapterSlug: string): Promise<string[]> {
    const updated = DojoStorageService.toggleChapterCompletion(chapterSlug);
    return updated.completedChapters;
  }

  async getLastAccessedChapter(): Promise<string> {
    return DojoStorageService.getProgress().lastAccessedChapter;
  }

  async setLastAccessedChapter(chapterSlug: string): Promise<void> {
    DojoStorageService.setLastAccessedChapter(chapterSlug);
  }

  async getStudyMinutes(): Promise<number> {
    return DojoStorageService.getStudyMinutes();
  }

  async addStudyMinutes(minutes: number): Promise<number> {
    return DojoStorageService.addStudyMinutes(minutes);
  }
}

// Local Quiz Adapter
export class LocalQuizAdapter implements IQuizRepository {
  async getQuizStats(): Promise<QuizStats> {
    return DojoStorageService.getQuizStats();
  }

  async saveQuizAttempt(attempt: {
    quizId: string;
    category: string;
    question: string;
    selectedOption: number;
    correctIndex: number;
    isCorrect: boolean;
  }): Promise<QuizStats> {
    return DojoStorageService.recordQuizAttempt({
      ...attempt,
      timestamp: new Date().toISOString()
    });
  }

  async resetQuizStats(): Promise<void> {
    DojoStorageService.recordQuizAttempt({
      quizId: 'reset',
      category: 'reset',
      question: 'reset',
      selectedOption: 0,
      correctIndex: 0,
      isCorrect: true,
      timestamp: new Date().toISOString()
    });
  }
}

// Local Technique Adapter
export class LocalTechniqueAdapter implements ITechniqueRepository {
  async getFavorites(): Promise<string[]> {
    return DojoStorageService.getFavorites();
  }

  async toggleFavorite(techId: string): Promise<string[]> {
    return DojoStorageService.toggleFavorite(techId);
  }

  async getNotes(): Promise<Record<string, string>> {
    return DojoStorageService.getNotes();
  }

  async saveNote(techId: string, text: string): Promise<Record<string, string>> {
    return DojoStorageService.saveNote(techId, text);
  }

  async getReviews(): Promise<ReviewItem[]> {
    return DojoStorageService.getReviews();
  }

  async saveReviews(items: ReviewItem[]): Promise<void> {
    DojoStorageService.saveReviews(items);
  }

  async getDetailedSheet(techId: string, defaultTitle: string, defaultCategory: string): Promise<DetailedBiomechanicalSheet> {
    return getDetailedSheetFromData(techId, defaultTitle, defaultCategory);
  }
}

// Local Certificate Adapter
export class LocalCertificateAdapter implements ICertificateRepository {
  async getIssuedCertificates(): Promise<IssuedCertificate[]> {
    return DojoStorageService.getCertificates();
  }

  async issueCertificate(certificate: IssuedCertificate): Promise<IssuedCertificate[]> {
    return DojoStorageService.saveCertificate(certificate);
  }

  async verifyCertificate(code: string): Promise<IssuedCertificate | null> {
    const list = DojoStorageService.getCertificates();
    return list.find(c => c.verificationCode === code) || null;
  }
}

// Local Consent Adapter (Para Menores)
const CONSENT_KEY = 'dojo_digital_v3_parent_consent';

export class LocalConsentAdapter implements IConsentRepository {
  async getConsentRecord(): Promise<ParentConsentRecord | null> {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(CONSENT_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async saveConsentRecord(record: Omit<ParentConsentRecord, 'id' | 'givenAt' | 'lastUpdated' | 'isBackendSynced'>): Promise<ParentConsentRecord> {
    const fullRecord: ParentConsentRecord = {
      ...record,
      id: `consent_local_${Date.now()}`,
      givenAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      isBackendSynced: false // Fica registrado explicitamente que não há sincronização em nuvem
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(fullRecord));
      } catch (e) {
        console.error('[LocalConsentAdapter] Erro ao salvar consentimento local:', e);
      }
    }
    return fullRecord;
  }

  async hasApprovedConsent(): Promise<boolean> {
    const rec = await this.getConsentRecord();
    return rec?.consentApproved === true;
  }
}
