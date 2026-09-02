export interface TheoryVideo {
  id: string;
  title: string;
  topic: string;
  description: string;
  provider: 'youtube';
  youtubeUrl: string;
  embedUrl: string;
  sourceEntity: string;
  sourceChannel: string;
  mediaType: 'external_reference';
  useType: 'embedded_external_video' | 'external_link';
  editorialStatus:
    | 'official_source_confirmed'
    | 'external_reference_validated'
    | 'reference_to_validate';
  licenseStatus: string;
  attribution: string;
  verifiedAt: string;
  relatedTheoryLessonId: string;
  recommendedAge: 'all_ages' | '12_plus' | '15_plus';
  safetyNotice: string;
  regulatoryNotice?: string;
  fallbackAction: 'open_youtube';
}

const COMMON_LICENSE =
  'Conteúdo hospedado pelo YouTube. Não baixar, editar, recortar, reupar ou redistribuir. Usar somente como referência externa incorporada ou link para fonte original.';

const COMMON_SAFETY =
  'Vídeo externo de apoio. O conteúdo digital complementa, mas não substitui orientação presencial de professor qualificado.';

export const THEORY_VIDEOS: TheoryVideo[] = [
  {
    id: 'theory_video_001',
    title: 'The Art of Judo — Episode 1',
    topic: 'Jigoro Kano e a criação do Kodokan',
    description:
      'Referência audiovisual externa sobre a história, origem e identidade do Judô.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=q5epM-h7Cx8',
    embedUrl: 'https://www.youtube.com/embed/q5epM-h7Cx8',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-002',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_002',
    title: 'Judo in Schools — For a Better World',
    topic: 'Judô: educação, arte marcial e esporte',
    description:
      'Referência audiovisual externa sobre Judô educacional, valores e desenvolvimento humano.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=TBffVvIfJgM',
    embedUrl: 'https://www.youtube.com/embed/TBffVvIfJgM',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-001',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_003',
    title: 'Judo — Values for Life',
    topic: 'Filosofia, valores e mentalidade',
    description:
      'Referência audiovisual externa sobre valores do Judô aplicados ao tatame e à vida.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=Nbku4t20RgU',
    embedUrl: 'https://www.youtube.com/embed/Nbku4t20RgU',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-007',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_004',
    title: 'Judo Values — Respect',
    topic: 'Rei: respeito como atitude diária',
    description:
      'Referência audiovisual externa sobre respeito dentro e fora do tatame.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=dWWc7VQ6Wv8',
    embedUrl: 'https://www.youtube.com/embed/dWWc7VQ6Wv8',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-011',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_005',
    title: 'Judo Values — Self-control',
    topic: 'Vitória, derrota, modéstia e honra',
    description:
      'Referência audiovisual externa sobre autocontrole e comportamento no Judô.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=Hk8qmyTKb5k',
    embedUrl: 'https://www.youtube.com/embed/Hk8qmyTKb5k',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-008',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_006',
    title: 'Judo Values — Friendship',
    topic: 'Jita Kyoei e crescimento coletivo',
    description:
      'Referência audiovisual externa sobre amizade, parceria e cooperação.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=CYkkHZA9QgE',
    embedUrl: 'https://www.youtube.com/embed/CYkkHZA9QgE',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-007',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_007',
    title: 'Judo Values — Courage',
    topic: 'Medo de cair, errar e competir',
    description:
      'Referência audiovisual externa sobre coragem e atitudes responsáveis.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=tgZ4yDwHk5U',
    embedUrl: 'https://www.youtube.com/embed/tgZ4yDwHk5U',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-009',
    recommendedAge: 'all_ages',
    safetyNotice: COMMON_SAFETY,
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_008',
    title: 'Quick Guide to Judo',
    topic: 'Introdução à competição e arbitragem',
    description:
      'Referência audiovisual externa de introdução ao Judô competitivo, pontuação e penalidades.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=pgfKasoI5yc',
    embedUrl: 'https://www.youtube.com/embed/pgfKasoI5yc',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-026',
    recommendedAge: '12_plus',
    safetyNotice: COMMON_SAFETY,
    regulatoryNotice:
      'Regras e interpretações podem ser atualizadas. Consulte sempre o regulamento oficial vigente da IJF e da CBJ.',
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_009',
    title: 'Updated Rules',
    topic: 'Atualização de regras de arbitragem',
    description:
      'Referência audiovisual externa sobre atualizações de regras da IJF.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=FLj5S7HEnGg',
    embedUrl: 'https://www.youtube.com/embed/FLj5S7HEnGg',
    sourceEntity: 'International Judo Federation',
    sourceChannel: 'Official Judo / IJF',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'official_source_confirmed',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: International Judo Federation / Official Judo, YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-030',
    recommendedAge: '15_plus',
    safetyNotice: COMMON_SAFETY,
    regulatoryNotice:
      'Material datado. Regras e interpretações podem ser atualizadas. Consulte sempre o regulamento oficial vigente da IJF e da CBJ.',
    fallbackAction: 'open_youtube'
  },
  {
    id: 'theory_video_010',
    title: 'Nage-no-Kata (English ver.)',
    topic: 'Nage-no-Kata e grupos de projeção',
    description:
      'Referência audiovisual externa para observação de Nage-no-Kata.',
    provider: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=bkhBZzE2HpM',
    embedUrl: 'https://www.youtube.com/embed/bkhBZzE2HpM',
    sourceEntity: 'Fonte externa de referência',
    sourceChannel: 'YouTube',
    mediaType: 'external_reference',
    useType: 'embedded_external_video',
    editorialStatus: 'external_reference_validated',
    licenseStatus: COMMON_LICENSE,
    attribution: 'Fonte: Fonte externa de referência / YouTube. Referência audiovisual externa.',
    verifiedAt: '2026-09-02',
    relatedTheoryLessonId: 'FT-020',
    recommendedAge: '12_plus',
    safetyNotice:
      'Referência para observação. Não substitui prática presencial orientada de kata e técnicas de projeção.',
    fallbackAction: 'open_youtube'
  }
];

export function getTheoryVideosByLessonId(lessonId: string): TheoryVideo[] {
  return THEORY_VIDEOS.filter((v) => v.relatedTheoryLessonId === lessonId);
}

export function getTheoryVideoById(id: string): TheoryVideo | undefined {
  return THEORY_VIDEOS.find((v) => v.id === id);
}
