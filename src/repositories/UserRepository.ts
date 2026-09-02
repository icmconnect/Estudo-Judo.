import { UserProfile, DiagnosticResult } from '../types';
import { DojoStorageService } from '../services/storageService';

export interface IUserRepository {
  getProfile(defaultProfile: UserProfile): Promise<UserProfile>;
  saveProfile(profile: UserProfile): Promise<boolean>;
  getDiagnostic(): Promise<DiagnosticResult | null>;
  saveDiagnostic(result: DiagnosticResult): Promise<boolean>;
  exportUserData(): Promise<string>;
  clearUserData(): Promise<void>;
}

export class LocalUserRepository implements IUserRepository {
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

  async exportUserData(): Promise<string> {
    const profile = DojoStorageService.getProfile({
      name: 'Judoca Praticante',
      ageGroup: '18-39',
      grade: 'Branca (6º Kyu)',
      mainGoal: 'fundamentos',
      weeklyHours: 3,
      interests: ['fundamentos', 'recreativo'],
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
        quizStats,
        journal,
        certificates
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  async clearUserData(): Promise<void> {
    DojoStorageService.resetAllData();
  }
}

export const userRepository: IUserRepository = new LocalUserRepository();
