import { Plan, FreePreviewRules } from '../types';

export const DEFAULT_FREE_PREVIEW_RULES: FreePreviewRules = {
  allowedChapterSlugs: [
    'introducao',
    'jigoro-kano',
    'historia',
    'fundamentos',
    'seguranca'
  ],
  allowedLessonSlugs: [
    'historia-origem-kodokan',
    'principios-jita-kyoei',
    'saudacao-e-etiqueta',
    'ukemi-seguranca-amortecimento'
  ],
  allowGlossary: true,
  allowBasicDashboard: true,
  allowKatasPreview: true
};

export const PLANS_DATA: Plan[] = [
  {
    id: 'free',
    name: 'Plano Gratuito',
    description: 'Acesso demonstrativo para conhecer a metodologia e conteúdos essenciais do Dojo Digital.',
    amountInCents: 0,
    currency: 'BRL',
    paymentType: 'free',
    active: true,
    entitlements: [
      'Navegação completa no dashboard e catálogo',
      'Aulas introdutórias e históricas abertas',
      'Glossário ilustrado com termos em japonês',
      'Demonstrações de fundamentos e segurança',
      'Sem exigência de cartão de crédito',
      'Navegação livre sem cronômetro artificial'
    ],
    freePreviewRules: DEFAULT_FREE_PREVIEW_RULES,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-02T00:00:00.000Z'
  },
  {
    id: 'dojo_founder_97',
    name: 'Dojo Digital — Acesso Completo',
    description:
      'Pagamento único para acesso ao conteúdo premium incluído no Plano Fundador. O certificado interno não equivale a graduação, faixa, exame técnico, registro federativo ou credenciamento oficial.',
    amountInCents: 9700,
    currency: 'BRL',
    paymentType: 'one_time',
    active: true,
    entitlements: [
      'Acesso integral aos 5 Grupos do Gokyo no Waza (40 técnicas)',
      'Acervo completo dos 139 vídeos técnicos e demonstrativos',
      'Fichas biomecânicas aprofundadas (Kuzushi, Tsukuri, Kake, Zanshin)',
      'Formação Teórica Completa em 6 Trilhas Especializadas',
      'Quizzes interativos, flashcards e agendamento de revisões espaçadas',
      'Caderno Técnico com Diário de Treino Presencial e histórico',
      'Cenários práticos de Arbitragem com regras oficiais CBJ / IJF',
      'Certificados formativos de participação por trilha concluída',
      'Pagamento único com Pix ou Cartão — sem mensalidades'
    ],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-02T00:00:00.000Z'
  }
];

export const DOJO_FOUNDER_PLAN = PLANS_DATA[1];
export const FREE_PLAN = PLANS_DATA[0];

export function isContentFreePreview(
  type: 'chapter' | 'lesson' | 'theory' | 'technique' | 'glossary',
  slugOrId: string
): boolean {
  if (type === 'glossary') return true;
  if (type === 'chapter') {
    return DEFAULT_FREE_PREVIEW_RULES.allowedChapterSlugs.includes(slugOrId);
  }
  if (type === 'lesson' || type === 'theory') {
    return DEFAULT_FREE_PREVIEW_RULES.allowedLessonSlugs.includes(slugOrId);
  }
  if (type === 'technique') {
    // Primeiras técnicas de introdução/fundamentos podem ter preview de demonstração
    const demoTechniques = ['de-ashi-harai', 'o-goshi', 'seoi-nage', 'osoto-gari'];
    return demoTechniques.includes(slugOrId);
  }
  return false;
}
