export interface AdaptedJudoTopic {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  safetyGuidelines: string[];
  keyExercises: {
    name: string;
    focus: string;
    instructions: string;
  }[];
  medicalDisclaimer: string;
}

export const ADAPTED_JUDO_TOPICS: AdaptedJudoTopic[] = [
  {
    id: 'veteranos-longevidade',
    title: 'Judô Longevidade & Prática Consciente para 40+ Anos',
    targetAudience: 'Praticantes masters, veteranos e judocas que retornam aos tatames na maturidade.',
    description: 'O Judô é uma prática para a vida inteira. Na maturidade, a ênfase técnica migra da velocidade e impacto explosivo para a precisão biomecânica, fluidez postural, condicionamento cardiovascular moderado e preservação articular.',
    safetyGuidelines: [
      'Aquecimento articular progressivo de pelo menos 15 a 20 minutos com foco em coluna, joelhos e manguito rotador.',
      'Priorizar Randori cooperativo e estudo aprofundado de Katas (como Ju-no-Kata e Nage-no-Kata).',
      'Ukemi adaptado: utilizar tatames com maior absorção de impacto (subtatame com amortecimento ou tatames de treino suave).',
      'Evitar quedas em alta velocidade com travamento de articulações e quedas de sacrifício descontroladas.',
      'Hidratação constante e intervalos regulares de respiração ativa.'
    ],
    keyExercises: [
      {
        name: 'Tandoku-Renshu Suave (Sombra com Elásticos)',
        focus: 'Biomecânica de Tsukuri e Kuzushi sem sobrecarga articular.',
        instructions: 'Trabalho de movimentação de pés e giro de tronco com resistência elástica progressiva de baixa intensidade.'
      },
      {
        name: 'Ukemi em Níveis Progressivos',
        focus: 'Amortecimento com baixo impacto e fortalecimento do assoalho cervical.',
        instructions: 'Início na posição sentada, passando para a postura agachada e apenas então na posição em pé suave.'
      },
      {
        name: 'Estudo Dinâmico do Ju-no-Kata',
        focus: 'Flexibilidade, equilíbrio estático/dinâmico e controle respiratório.',
        instructions: 'Prática das formas suaves do Judô que desenvolvem mobilidade integral sem projeções de impacto violento.'
      }
    ],
    medicalDisclaimer: 'AVISO DE SAÚDE OBRIGATÓRIO: A prática do Judô por veteranos requer avaliação médica prévia (atestado cardiológico e ortopédico). Na presença de dores articulares persistentes, hérnias discais ou limitação motora, comunique imediatamente o Sensei para adaptação individualizada dos movimentos.'
  },
  {
    id: 'judo-adaptado-inclusao',
    title: 'Judô Paralímpico, Adaptado & Inclusão Motora / Sensorial',
    targetAudience: 'Praticantes com deficiência visual (Judô Paralímpico IBSA), Transtorno do Espectro Autista (TEA) ou necessidades motoras específicas.',
    description: 'O Judô é uma das modalidades paralímpicas mais consolidadas do mundo. Para atletas com deficiência visual (categorias J1 e J2), o combate inicia sempre com contato prévio de Kumikata estabelecido.',
    safetyGuidelines: [
      'Combate com Kumikata inicial já conectado antes do comando Hajime.',
      'Comunicação verbal clara do árbitro ao aplicar comandos e orientações no tatame.',
      'Sinalização tátil nas bordas do tatame para percepção espacial dos limites de segurança.',
      'Respeito irrestrito ao ritmo sensorial e cognitivo do aluno em ambiente estimulante e acolhedor.'
    ],
    keyExercises: [
      {
        name: 'Kumikata Sensorial Contínuo',
        focus: 'Sensibilidade proprioceptiva e leitura de desequilíbrio pelo tato.',
        instructions: 'Treino de movimentação mantendo as mãos na gola e manga sem visão para refinar a percepção do centro de gravidade do colega.'
      },
      {
        name: 'Ne-waza Estruturado e Seguro',
        focus: 'Controle corporal no chão com mínimo risco de queda.',
        instructions: 'Prática de imobilizações e giros controlados no solo, promovendo ganho de força e consciência postural.'
      }
    ],
    medicalDisclaimer: 'A prática inclusiva deve contar com a cooperação entre o Sensei credenciado, familiares e profissionais de saúde multidisciplinares (fisioterapeutas e educadores físicos especializados).'
  }
];
