export interface DiagnosticQuestion {
  id: string;
  category: 'seguranca' | 'fundamentos' | 'filosofia' | 'arbitragem' | 'historia';
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    category: 'seguranca',
    categoryLabel: 'Segurança & Salvaguarda',
    question: 'Qual é a primeira e mais importante habilidade motora de defesa que o praticante de Judô deve desenvolver antes de praticar projeções livres?',
    options: [
      'Pegada forte na gola (Kumikata de força)',
      'Amortecimento de quedas (Ukemi-waza) com queixo colado ao peito e batida de braço a 45°',
      'Força muscular e resistência cardiovascular',
      'Golpes de contra-ataque rápido (Kaeshi-waza)'
    ],
    correctIndex: 1,
    explanation: 'O Ukemi é o pilar fundamental de segurança no Judô. Sem dominar a proteção do crânio e coluna nas quedas, o judoca jamais deve realizar projeções de alto impacto.'
  },
  {
    id: 'diag-2',
    category: 'filosofia',
    categoryLabel: 'Filosofia do Budo',
    question: 'O que preconiza o princípio do "Jita Kyoei" (Prosperidade e Benefício Mútuo) criado por Jigoro Kano?',
    options: [
      'Vencer todos os combates para garantir o prestígio da própria academia',
      'O progresso individual só tem sentido se contribuir para o bem-estar e evolução coletiva de todos os parceiros de treino',
      'Treinar apenas com oponentes mais graduados para evoluir mais rápido',
      'Guardar as melhores técnicas em segredo para surpreender os adversários'
    ],
    correctIndex: 1,
    explanation: 'Jita Kyoei estabelece que no Dojô não há inimigos, mas parceiros (Uke e Tori) que se ajudam mutuamente a evoluir física e moralmente.'
  },
  {
    id: 'diag-3',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos Biomecânicos',
    question: 'Na biomecânica do Judô Kodokan, qual é a sequência correta e indispensável para a aplicação de um golpe de projeção (Nage-waza)?',
    options: [
      'Kake (finalização), Tsukuri (encaixe) e Kuzushi (desequilíbrio)',
      'Kuzushi (quebra do equilíbrio), Tsukuri (preparação/encaixe postural) e Kake (execução da projeção)',
      'Kumikata (pegada), Shiai (luta) e Ippon (vitória)',
      'Rei (saudação), Kiai (grito) e Zanshin (finalização)'
    ],
    correctIndex: 1,
    explanation: 'Sem Kuzushi não há Tsukuri eficiente; sem Tsukuri a execução (Kake) exige força bruta inadequada aos princípios do Judô.'
  },
  {
    id: 'diag-4',
    category: 'arbitragem',
    categoryLabel: 'Regras Oficiais & Arbitragem',
    question: 'De acordo com as regras oficiais de arbitragem CBJ/IJF, qual pontuação encerra imediatamente o combate por vitória perfeita?',
    options: [
      'Waza-ari',
      'Yuko',
      'Ippon',
      'Dois Shidos acumulados'
    ],
    correctIndex: 2,
    explanation: 'O Ippon (pontuação máxima por projeção perfeita com velocidade, força e costas no chão, ou 20s de imobilização, ou desistência) finaliza a luta na hora.'
  },
  {
    id: 'diag-5',
    category: 'seguranca',
    categoryLabel: 'Segurança & Salvaguarda',
    question: 'Durante a prática de luta de solo (Ne-waza), o que significa bater duas ou três vezes consecutivas com a mão espalmada no corpo do colega ou no tatame?',
    options: [
      'Pedir para o colega apertar mais a chave',
      'Desistência / Rendição imediata (Maitá) - o parceiro deve soltar instantaneamente',
      'Comemorar a reversão da posição',
      'Pedir contagem de tempo para o árbitro'
    ],
    correctIndex: 1,
    explanation: 'A batida (ou grito "Maitá") é o código universal de segurança inegociável. Ao senti-la ou ouvi-la, a liberação da chave ou estrangulamento deve ser imediata.'
  },
  {
    id: 'diag-6',
    category: 'historia',
    categoryLabel: 'História & Tradição',
    question: 'Em que ano e local o Sensei Jigoro Kano fundou o Instituto Kodokan, transformando o antigo Jujutsu em Judô educacional?',
    options: [
      '1860, em Kyoto',
      '1882, no templo Eishoji em Tóquio',
      '1915, em Belém do Pará',
      '1964, no Budokan de Tóquio'
    ],
    correctIndex: 1,
    explanation: 'Em maio de 1882, Jigoro Kano fundou a Kodokan no templo budista Eishoji com apenas 9 alunos e 12 tatames, criando uma metodologia pedagógica para a vida.'
  },
  {
    id: 'diag-7',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos Biomecânicos',
    question: 'O que representa o conceito "Happo-no-Kuzushi"?',
    options: [
      'As 8 virtudes morais do código de honra do samurai',
      'As 8 direções fundamentais para desequilibrar o oponente',
      'As 8 graduações de faixa preta da Kodokan',
      'Os 8 tipos de estrangulamento permitidos em competição'
    ],
    correctIndex: 1,
    explanation: 'Happo-no-Kuzushi são as 8 direções cardeais e diagonais de desequilíbrio (frente, trás, direita, esquerda e as 4 diagonais).'
  },
  {
    id: 'diag-8',
    category: 'arbitragem',
    categoryLabel: 'Regras Oficiais & Arbitragem',
    question: 'Qual é a consequência regulamentar quando um competidor recebe 3 penalidades leves (Shido) durante o combate?',
    options: [
      'Perde um ponto de Waza-ari',
      'O combate recomeça do zero no Golden Score',
      'É desclassificado por Hansoku-make e o adversário é declarado vencedor',
      'Recebe uma advertência verbal do árbitro central'
    ],
    correctIndex: 2,
    explanation: 'O acúmulo de 3 Shidos resulta automaticamente em Hansoku-make (desclassificação do combate).'
  }
];
