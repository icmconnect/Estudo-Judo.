export interface Chapter {
  id: string;
  title: string;
  category: 'Apresentação' | 'História' | 'Fundamentos' | 'Segurança' | 'Nage-waza' | 'Katame-waza' | 'Katas' | 'Arbitragem';
  slug: string;
  content: string;
  videoUrl?: string;
  bannerImage?: string;
  summary?: string;
}

export interface Module {
  id: string;
  title: string;
  chapters: Chapter[];
}

// Perfil e Plano de Estudos Personalizado (Fase 2)
export type AgeGroup = '12-14' | '15-17' | '18-39' | 'veteranos';
export type JudoGrade = 'Branca (6º Kyu)' | 'Cinza (5º Kyu)' | 'Azul (4º Kyu)' | 'Amarela (3º Kyu)' | 'Laranja (2º Kyu)' | 'Verde (1º Kyu)' | 'Roxa' | 'Marrom' | 'Preta (1º Dan+)';
export type MainGoal = 'fundamentos' | 'exame_faixa' | 'competicao' | 'condicionamento' | 'kata' | 'longevidade_recreativo';
export type UserRole = 'aluno' | 'responsavel' | 'professor';

export type InterestTopic = 'fundamentos' | 'competicao' | 'kata' | 'condicionamento' | 'recreativo' | 'filosofia' | 'arbitragem';

export interface UserProfile {
  name: string;
  ageGroup: AgeGroup;
  grade: JudoGrade;
  mainGoal: MainGoal;
  weeklyHours: number;
  interests: InterestTopic[];
  role: UserRole;
  createdAt: string;
  lastUpdated: string;
  parentConsentApproved?: boolean;
}

export interface StudyPlanGoals {
  weeklyLessonsTarget: number;
  dailyMinutesTarget: number;
  weeklyQuizzesTarget: number;
  weeklyReviewsTarget: number;
}

// Avaliação Diagnóstica
export interface DiagnosticResult {
  completedAt: string;
  scorePercentage: number;
  level: 'iniciante' | 'fundamentos_em_desenvolvimento' | 'intermediario' | 'avancado';
  categoryBreakdown: {
    seguranca: number;
    fundamentos: number;
    filosofia: number;
    arbitragem: number;
    historia: number;
  };
  recommendedModules: string[];
  mistakeTopics: string[];
}

// Revisão Inteligente & Flashcards
export interface ReviewItem {
  id: string;
  type: 'tecnica' | 'termo' | 'quiz_erro' | 'regra';
  title: string;
  japaneseTitle?: string;
  category: string;
  sourceId: string;
  addedAt: string;
  nextReviewDate: string; // ISO string
  intervalDays: 1 | 7 | 15 | 30;
  reviewsCount: number;
  userNote?: string;
  isFavorite?: boolean;
  securityTip?: string;
}

// Diário de Treino Presencial
export interface TrainingJournalEntry {
  id: string;
  date: string;
  location: string;
  durationMinutes: number;
  techniquesStudied: string[];
  effortRating: 1 | 2 | 3 | 4 | 5;
  injuriesOrDiscomfort?: string;
  senseiObservations?: string;
  nextLessonGoal?: string;
  privateNotes?: string;
  createdAt: string;
}

// Canal de Dúvidas Moderado
export interface DoubtQuestion {
  id: string;
  studentName: string;
  studentGrade: string;
  chapterSlug: string;
  chapterTitle: string;
  questionText: string;
  status: 'enviada' | 'respondida' | 'arquivada';
  submittedAt: string;
  answeredAt?: string;
  teacherResponse?: string;
  teacherName?: string;
}

// Katas Oficiais
export interface KataStep {
  stepNumber: number;
  name: string;
  japanese: string;
  toriRole: string;
  ukeRole: string;
  keyPoints: string[];
  commonMistakes: string[];
  safetyNote: string;
}

export interface KataBlock {
  id: string;
  kataName: string;
  seriesName: string;
  objective: string;
  etiquette: string;
  steps: KataStep[];
  videoUrl?: string;
  officialReference: string;
  revisionDate: string;
}

// Cenários de Arbitragem
export interface ArbitrageScenario {
  id: string;
  situationTitle: string;
  description: string;
  actionImageUrl?: string;
  options: {
    decision: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  officialRuleRef: {
    entity: 'CBJ' | 'IJF';
    ruleTitle: string;
    version: string;
    publicationDate: string;
    sourceUrl: string;
    lastReviewedInApp: string;
  };
}

// Conquistas & Certificados
export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'fundamentos' | 'seguranca' | 'tecnica' | 'filosofia' | 'arbitragem' | 'disciplina';
  unlockedAt?: string;
  progressPercent: number;
  requirement: string;
}

export interface IssuedCertificate {
  certificateId: string;
  studentName: string;
  trackName: string;
  completedHours: number;
  issueDate: string;
  verificationCode: string;
  disclaimer: string;
}

// Glossário
export interface GlossaryTerm {
  id: string;
  romaji: string;
  kanji?: string;
  portuguese: string;
  category: 'Saudação' | 'Dojo' | 'Postura' | 'Movimentação' | 'Pegada' | 'Projeção' | 'Solo' | 'Arbitragem' | 'Filosofia';
  definition: string;
  practicalExample: string;
  audioPronunciationText: string;
}

// Ficha Biomecânica & Pedagógica Detalhada do Gokyo
export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  hint?: string;
}

export interface LinkedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DetailedBiomechanicalSheet {
  technicalObjective: string; // O que a técnica pretende alcançar
  contextAndDistance: string; // Situação de entrada, pegada e deslocamento
  kuzushi: string; // Etapa 1: Quebra de equilíbrio
  tsukuri: string; // Etapa 2: Posicionamento e entrada do corpo
  kake: string; // Etapa 3: Execução e arremesso
  continuityZanshin: string; // Continuidade, postura e atenção após a ação (Zanshin)
  ukemiAndSafety: string; // Ukemi, sinal de desistência e cuidados de salvaguarda
  commonMistakes: string[]; // Erros comuns que prejudicam a execução
  prerequisites: string[]; // Habilidades e técnicas prévias necessárias
  relatedTechniques: string[]; // Combinações e variações
  isSensitiveOrAdvanced?: boolean; // Aviso pedagógico para chaves ou estrangulamentos (15+ anos)
  pedagogicalLevel?: 'Iniciante (Branca/Cinza)' | 'Intermediário (Azul/Amarela)' | 'Avançado (Laranja/Verde)' | 'Superior (Roxa/Marrom/Preta)';
  recommendedAge?: string;
  variations?: string[];
  reviewChecklist?: string[];
  flashcards?: FlashcardItem[];
  quizQuestions?: LinkedQuizQuestion[];
  editorialSources?: string[];
  status?: 'rascunho' | 'em_revisao' | 'publicado' | 'demonstrativo' | 'arquivado';
  author?: string;
  technicalReviewer?: string;
  safetyReviewer?: string;
  creationDate?: string;
  revisionDate: string;
  nextRevisionDate?: string;
  version?: string;
  regulatoryNotice?: string;
  ruleSubjectToUpdateNotice?: string;
}

// Extensão de Fontes Editoriais
export interface EditorialSource {
  id: string;
  entity: 'Kodokan Judo Institute' | 'International Judo Federation (IJF)' | 'Confederação Brasileira de Judô (CBJ)' | 'UNESCO / Educação' | 'Dojo Digital (Editorial Interno)';
  title: string;
  publicationType: 'Livro Oficial' | 'Regulamento de Arbitragem' | 'Diretriz Pedagógica' | 'Manual Técnico' | 'Artigo de Referência';
  version: string;
  publicationYear: string;
  sourceUrl: string;
  notes: string;
  status: 'rascunho' | 'em_revisao' | 'publicado' | 'demonstrativo' | 'arquivado';
  license: 'Domínio Público' | 'Uso Educacional Institucional' | 'Direitos Reservados' | 'Referência Editorial a Validar';
  validationStatus: 'confirmado' | 'a_validar';
  embedPermission: boolean;
  videoOrigin: 'Kodokan Channel (YouTube)' | 'IJF Channel' | 'CBJ Oficial' | 'Dojo Digital (Demonstrativo)' | 'Fonte Externa (Referência)';
  lastVerifiedDate: string;
}

// Estrutura Editorial e de Auditoria de Vídeos (139 Vídeos)
export type VideoOriginType =
  | 'Produção própria'
  | 'Canal oficial confirmado'
  | 'Incorporação permitida'
  | 'Apenas link externo'
  | 'Referência a validar'
  | 'Remover';

export interface VideoMetadata {
  id: string;
  techniqueId: string;
  techniqueName: string;
  url: string;
  videoId: string;
  origin: VideoOriginType;
  channel: string;
  usageType: 'Demonstrativo Pedagógico' | 'Referência Externa' | 'Competição / Arbitragem' | 'Tutorial Técnico';
  license: string;
  validationStatus: 'confirmado' | 'a_validar' | 'em_revisao' | 'removido';
  verificationDate: string;
  editorialResponsible: string;
  notes: string;
}

// Termos e Consentimentos de Responsáveis Legais (Para Menores de Idade)
export interface ParentConsentRecord {
  id: string;
  minorName: string;
  minorAgeGroup: AgeGroup;
  parentName: string;
  parentEmail?: string;
  parentPhone?: string;
  consentApproved: boolean;
  consentType: 'presencial_dojo' | 'plataforma_digital_local';
  ipOrDeviceRef?: string;
  givenAt: string;
  lastUpdated: string;
  isBackendSynced: boolean; // False no modo local
}

// Configuração de Armazenamento e Feature Flags
export type StorageMode = 'local' | 'cloud';

export interface AppConfiguration {
  storageMode: StorageMode;
  appVersion: string;
  environment: 'development' | 'production';
  allowCloudSync: boolean;
  firestoreConfigured: boolean;
}

// ==========================================
// FORMAÇÃO TEÓRICA (NOVA ÁREA COMPLEMENTAR)
// ==========================================

export type TheoryEditorialStatus = 'rascunho' | 'em_revisao' | 'publicado' | 'demonstrativo' | 'arquivado';

export interface TheoryReference {
  id: string;
  entity: string;
  title: string;
  url: string;
  type: 'site' | 'documento' | 'vídeo' | 'livro' | 'artigo' | 'imagem' | 'regulamento' | 'documentação técnica';
  language: string;
  publicationDate?: string;
  verificationDate: string;
  nextRevisionDate?: string;
  status: 'confirmada' | 'a_validar' | 'em_revisao' | 'arquivada';
  usageType: string;
  copyrightNotice: string;
  editorialResponsible: string;
  notes?: string;
}

export interface TheoryJapaneseWord {
  romaji: string;
  kanji?: string;
  pronunciation?: string;
  definition: string;
}

export interface TheoryScenario {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface TheorySection {
  title: string;
  content: string;
}

export interface TheoryQuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface TheoryFlashcard {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
}

export interface TheoryLesson {
  id: string;
  slug: string;
  trackNumber: number;
  trackSlug: string;
  trackTitle: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  estimatedTimeMinutes: number;
  recommendedAge: string;
  recommendedLevel: string;
  learningObjectives: string[];
  introduction: string;
  sections: TheorySection[];
  summaryPoints: string[];
  onTatame: string;
  inLife: string;
  japaneseWord: TheoryJapaneseWord;
  reflectionScenario: TheoryScenario;
  quizQuestionIds: string[];
  flashcardIds: string[];
  referenceIds: string[];
  author: string;
  technicalReviewer: string;
  safetyReviewer?: string;
  creationDate: string;
  lastRevisionDate: string;
  nextRevisionDate: string;
  version: string;
  editorialStatus: TheoryEditorialStatus;
  safetyWarning?: string;
}

export interface TheoryModule {
  id: string;
  slug: string;
  trackNumber: number;
  title: string;
  subtitle: string;
  description: string;
  recommendedAge: string;
  recommendedLevel: string;
  estimatedTimeMinutes: number;
  learningObjectives: string[];
  lessonCount: number;
  editorialStatus: TheoryEditorialStatus;
  referenceIds: string[];
  iconName?: string;
}

export interface TheoryReviewScheduleItem {
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;
  trackSlug: string;
  addedAt: string;
  nextReviewDate: string;
  intervalDays: 1 | 7 | 15 | 30;
  reviewsCount: number;
}

export interface TheoryProgressState {
  completedLessons: string[];
  lastAccessedLessonSlug?: string;
  lastAccessedTrackSlug?: string;
  studyMinutes: number;
  favorites: string[];
  notes: Record<string, string>;
  scheduledReviews: TheoryReviewScheduleItem[];
  quizScores: Record<string, number>;
}

// ==========================================
// MODELO COMERCIAL, PLANOS & STRIPE PAYWALL
// ==========================================

export type PlanId = 'free' | 'dojo_founder_97';

export type SubscriptionStatus =
  | 'free'
  | 'pending_payment'
  | 'active'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'blocked'
  | 'manual_grant';

export type PaymentProvider = 'stripe' | 'manual' | 'none';

export type SourceOfTruth = 'stripe_webhook' | 'admin_manual' | 'migration';

export interface FreePreviewRules {
  allowedChapterSlugs: string[];
  allowedLessonSlugs: string[];
  allowGlossary: boolean;
  allowBasicDashboard: boolean;
  allowKatasPreview: boolean;
}

export interface Plan {
  id: PlanId | string;
  name: string;
  description: string;
  amountInCents: number;
  currency: 'BRL';
  paymentType: 'one_time' | 'free';
  active: boolean;
  entitlements: string[];
  freePreviewRules?: FreePreviewRules;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  uid: string;
  planId: PlanId | string;
  provider: PaymentProvider;
  status: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  amountInCents: number;
  currency: string;
  accessAllowed: boolean;
  sourceOfTruth: SourceOfTruth;
  startedAt: string;
  updatedAt: string;
  expiresAt?: string;
  notesInternal?: string;
}

export interface PaymentEvent {
  id: string;
  provider: 'stripe';
  providerEventId: string;
  eventType: string;
  uid: string;
  planId: string;
  stripePaymentIntentId?: string;
  stripeCheckoutSessionId?: string;
  processingStatus: 'processed' | 'failed' | 'ignored';
  rawPayloadHash: string;
  createdAt: string;
  processedAt: string;
  errorMessage?: string;
}

export interface AdminAuditLog {
  id: string;
  actorUid: string;
  actorEmail?: string;
  action: 'grant_manual_access' | 'revoke_access' | 'block_user' | 'unblock_user' | 'update_plan';
  targetUid: string;
  reason: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  createdAt: string;
}

