import { StorageMode, AppConfiguration } from '../types';
import {
  IAuthRepository,
  IUserRepository,
  IProgressRepository,
  IQuizRepository,
  ITechniqueRepository,
  ICertificateRepository,
  IConsentRepository
} from './interfaces';
import {
  LocalAuthAdapter,
  LocalUserAdapter,
  LocalProgressAdapter,
  LocalQuizAdapter,
  LocalTechniqueAdapter,
  LocalCertificateAdapter,
  LocalConsentAdapter
} from './adapters/LocalStorageAdapter';
import {
  FirestoreAuthAdapter,
  FirestoreUserAdapter,
  FirestoreProgressAdapter,
  FirestoreQuizAdapter,
  FirestoreTechniqueAdapter,
  FirestoreCertificateAdapter,
  FirestoreConsentAdapter
} from './adapters/FirestoreAdapter';

// Feature Flag de Armazenamento (Default: 'local')
export const APP_STORAGE_MODE: StorageMode =
  (import.meta.env.VITE_APP_STORAGE_MODE as StorageMode) || 'local';

export const APP_CONFIG: AppConfiguration = {
  storageMode: APP_STORAGE_MODE,
  appVersion: '3.0.0',
  environment: import.meta.env.PROD ? 'production' : 'development',
  allowCloudSync: APP_STORAGE_MODE === 'cloud',
  firestoreConfigured: false
};

// Instanciação orientada a Repositórios
const isCloud = APP_STORAGE_MODE === 'cloud';

export const authRepository: IAuthRepository = isCloud ? new FirestoreAuthAdapter() : new LocalAuthAdapter();
export const userRepository: IUserRepository = isCloud ? new FirestoreUserAdapter() : new LocalUserAdapter();
export const progressRepository: IProgressRepository = isCloud ? new FirestoreProgressAdapter() : new LocalProgressAdapter();
export const quizRepository: IQuizRepository = isCloud ? new FirestoreQuizAdapter() : new LocalQuizAdapter();
export const techniqueRepository: ITechniqueRepository = isCloud ? new FirestoreTechniqueAdapter() : new LocalTechniqueAdapter();
export const certificateRepository: ICertificateRepository = isCloud ? new FirestoreCertificateAdapter() : new LocalCertificateAdapter();
export const consentRepository: IConsentRepository = isCloud ? new FirestoreConsentAdapter() : new LocalConsentAdapter();

export * from './interfaces';
