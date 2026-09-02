import { ProgressState, DojoStorageService } from '../services/storageService';

export interface IProgressRepository {
  getProgress(): Promise<ProgressState>;
  saveProgress(progress: ProgressState): Promise<boolean>;
  toggleChapterCompletion(slug: string): Promise<ProgressState>;
  setLastAccessedChapter(slug: string): Promise<void>;
}

export class LocalProgressRepository implements IProgressRepository {
  async getProgress(): Promise<ProgressState> {
    return DojoStorageService.getProgress();
  }

  async saveProgress(progress: ProgressState): Promise<boolean> {
    return DojoStorageService.saveProgress(progress);
  }

  async toggleChapterCompletion(slug: string): Promise<ProgressState> {
    return DojoStorageService.toggleChapterCompletion(slug);
  }

  async setLastAccessedChapter(slug: string): Promise<void> {
    DojoStorageService.setLastAccessedChapter(slug);
  }
}

export const progressRepository: IProgressRepository = new LocalProgressRepository();
