import { TheoryModule } from '../types';

export const theoryModules: TheoryModule[] = [
  {
    id: 'MOD_TH_1',
    slug: 'essencia-e-historia-do-judo',
    trackNumber: 1,
    title: 'Essência e História do Judô',
    subtitle: 'Origem, propósito educativo e a transformação cultural do Judô no mundo e no Brasil',
    description: 'Aprofunde o entendimento sobre como o Mestre Jigoro Kano transformou tradições marciais em um sistema global de educação física, moral e intelectual.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis (Iniciante ao Avançado)',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Compreender o Judô como prática marcial, educativa, esportiva e cultural.',
      'Conhecer a biografia e os ideais pedagógicos de Jigoro Kano na fundação do Kodokan.',
      'Compreender a transição do Jujutsu tradicional para o Judô moderno.',
      'Analisar o papel social, olímpico e formativo do Judô.',
      'Conhecer a chegada, expansão e raízes do Judô no Brasil.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-KOD-001', 'REF-IJF-001', 'REF-IJF-002', 'REF-CBJ-001'],
    iconName: 'Landmark'
  },
  {
    id: 'MOD_TH_2',
    slug: 'filosofia-valores-e-mentalidade',
    trackNumber: 2,
    title: 'Filosofia, Valores e Mentalidade',
    subtitle: 'Princípios fundamentais de Seiryoku Zenyo, Jita Kyoei e a psicologia do praticante',
    description: 'Explore como os valores filosóficos do Judô se transformam em inteligência emocional, foco, autocontrole e superação de medos dentro e fora do tatame.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Dominar o conceito de Seiryoku Zenyo (eficiência máxima da energia física e mental).',
      'Aplicar o princípio de Jita Kyoei (prosperidade e benefícios mútuos) nas relações diárias.',
      'Desenvolver uma relação madura com vitória, derrota, modéstia e honra.',
      'Trabalhar psicologicamente o medo de cair, de errar e de se expor ao aprendizado.',
      'Cultivar disciplina, foco e o hábito da melhoria contínua (Kaizen).'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-KOD-001'],
    iconName: 'Sparkles'
  },
  {
    id: 'MOD_TH_3',
    slug: 'cultura-etiqueta-e-vida-no-dojo',
    trackNumber: 3,
    title: 'Cultura, Etiqueta e Vida no Dojo',
    subtitle: 'Reigi (etiqueta), responsabilidade compartilhada e convivência ética no tatame',
    description: 'Descubra a riqueza das tradições de respeito, o papel insubstituível da parceria entre Tori e Uke, e como criar um ambiente de aprendizado seguro e acolhedor.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    estimatedTimeMinutes: 28,
    learningObjectives: [
      'Compreender o Rei como atitude contínua de respeito, cortesia e segurança.',
      'Entender a responsabilidade compartilhada entre Tori (executor) e Uke (receptor).',
      'Aprender a adaptar a prática com parceiros de diferentes pesos, idades e graduações.',
      'Desenvolver maturidade para oferecer e receber correções técnicas com humildade.',
      'Fortalecer a convivência no dojo prevenindo bullying, assédio e atitudes de risco.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-KOD-003'],
    iconName: 'HeartHandshake'
  },
  {
    id: 'MOD_TH_4',
    slug: 'ciencia-do-movimento-no-judo',
    trackNumber: 4,
    title: 'Ciência do Movimento no Judô',
    subtitle: 'Biomecânica, equilíbrio, vetores de força e as fases da projeção',
    description: 'Compreenda a física por trás do desequilíbrio (Kuzushi), do posicionamento (Tsukuri) e da finalização técnica (Kake) de maneira clara, segura e acessível.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Intermediário a Avançado',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Entender o centro de gravidade e a base de apoio na estabilidade do judoca.',
      'Analisar a direção, o tempo (timing) e as 8 direções de desequilíbrio (Happo-no-Kuzushi).',
      'Distinguir eficiência biomecânica do uso abusivo de força bruta.',
      'Compreender as fases de Kuzushi, Tsukuri, Kake e Zanshin (continuidade e prontidão).',
      'Desenvolver a habilidade de analisar movimentos tecnicamente sem praticá-los sozinho.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-KOD-001', 'REF-KOD-002', 'REF-IJF-002'],
    iconName: 'Activity'
  },
  {
    id: 'MOD_TH_5',
    slug: 'seguranca-saude-e-longevidade',
    trackNumber: 5,
    title: 'Segurança, Saúde e Longevidade',
    subtitle: 'Prevenção de lesões, escuta do corpo, judô veterano e prática adaptada',
    description: 'Estude as diretrizes para uma prática saudável ao longo de toda a vida, respeitando os sinais de fadiga, os limites individuais e promovendo a inclusão total.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Compreender a função fisiológica do aquecimento e do retorno gradual aos treinos.',
      'Valorizar a mobilidade articular, o equilíbrio e o fortalecimento preventivo.',
      'Aprender a reconhecer a diferença entre esforço saudável e dor que exige interrupção.',
      'Conhecer as adaptações pedagógicas para praticantes adultos, veteranos e 40+.',
      'Compreender os princípios de inclusão e respeito no Judô Adaptado / Paralímpico.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-LGPD-001'],
    iconName: 'ShieldAlert'
  },
  {
    id: 'MOD_TH_6',
    slug: 'competicao-estrategia-e-leitura-de-luta',
    trackNumber: 6,
    title: 'Competição, Estratégia e Leitura de Luta',
    subtitle: 'O espírito do Shiai, análise tática, kumikata e transições de combate',
    description: 'Aprenda a analisar combates com olhar técnico e esportivo, compreendendo disputas de pegada, ritmo de luta e a transição tachi-waza para ne-waza.',
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Intermediário a Superior',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Entender o Shiai como ferramenta educativa de superação pessoal e respeito mútuo.',
      'Compreender a disputa tática de pegada (Kumikata) e controle de distância.',
      'Analisar a construção de combinações (Renraku-waza) e contra-ataques (Kaeshi-waza).',
      'Estudar a leitura e a velocidade de transição entre a luta em pé e a luta no solo.',
      'Desenvolver critérios para assistir, pontuar e analisar lutas de Judô oficial.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-CBJ-001', 'REF-CBJ-002', 'REF-IJF-004'],
    iconName: 'Trophy'
  },
  {
    id: 'MOD_TH_7',
    slug: 'formacao-de-professor',
    trackNumber: 7,
    title: 'Formação de Professor & Pedagogia',
    subtitle: 'Planejamento de aulas, progressão pedagógica, ensino de ukemi e comunicação',
    description: 'Conteúdo de apoio para instrutores, faixas-pretas e estudiosos da didática do Judô, focado em responsabilidade pedagógica, salvaguarda e didática inclusiva.',
    recommendedAge: '16 a 99 anos',
    recommendedLevel: 'Avançado e Faixas-Pretas',
    estimatedTimeMinutes: 30,
    learningObjectives: [
      'Estruturar o plano pedagógico de uma aula equilibrando técnica, cultura e disciplina.',
      'Aplicar progressão didática do simples ao complexo, respeitando faixas etárias.',
      'Dominar a metodologia de ensino responsável e progressivo de Ukemi (quedas).',
      'Estabelecer comunicação transparente e acolhedora com alunos e famílias.',
      'Garantir um ambiente inclusivo, adaptado e com tolerância zero para abusos.'
    ],
    lessonCount: 5,
    editorialStatus: 'publicado',
    referenceIds: ['REF-IJF-001', 'REF-IJF-002', 'REF-IJF-003', 'REF-KOD-004'],
    iconName: 'GraduationCap'
  }
];

export const getTheoryModuleBySlug = (slug: string): TheoryModule | undefined => {
  return theoryModules.find(m => m.slug === slug);
};

export const getTheoryModuleById = (id: string): TheoryModule | undefined => {
  return theoryModules.find(m => m.id === id);
};
