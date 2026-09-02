export interface QuizQuestion {
  id: string;
  category: 'História' | 'Filosofia' | 'Fundamentos' | 'Segurança' | 'Técnica' | 'Arbitragem';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'História',
    question: 'Em que ano e em qual cidade o Mestre Jigoro Kano fundou o Instituto Kodokan?',
    options: [
      '1860, em Mikage',
      '1882, em Tóquio',
      '1915, em Belém do Pará',
      '1964, em Munique'
    ],
    correctIndex: 1,
    explanation: 'Em maio de 1882, aos 22 anos, Jigoro Kano fundou a primeira escola de Judô do mundo no templo budista de Eishoji, em Tóquio.'
  },
  {
    id: 'q2',
    category: 'Filosofia',
    question: 'Qual é o significado prático do princípio filosófico "Seiryoku Zen\'yo"?',
    options: [
      'Usar a força bruta para derrotar o oponente rapidamente',
      'Máxima Eficiência com o Mínimo de Esforço físico e mental',
      'Vencer todas as competições a qualquer custo',
      'Buscar a perfeição sem ajudar os colegas de treino'
    ],
    correctIndex: 1,
    explanation: 'Seiryoku Zen\'yo ensina a canalizar a energia de forma inteligente, cedendo à força do oponente para desequilibrá-lo sem desperdício de energia.'
  },
  {
    id: 'q3',
    category: 'Segurança',
    question: 'Qual é o procedimento obrigatório que todo judoca deve dominar antes de aplicar ou receber projeções corporais?',
    options: [
      'Fazer 100 flexões de braço',
      'Comprar um judogi de competição azul',
      'Dominar as técnicas de amortecimento de quedas (Ukemi-waza)',
      'Aprender técnicas proibidas de sacrifício'
    ],
    correctIndex: 2,
    explanation: 'Os Ukemis (amortecimentos de queda) protegem a cabeça, coluna e articulações, garantindo que o judoca caia com segurança e sem lesões.'
  },
  {
    id: 'q4',
    category: 'Filosofia',
    question: 'Situação Prática: Em um combate de treino, você errou o golpe três vezes consecutivas. Qual atitude demonstra o verdadeiro espírito do Judô?',
    options: [
      'Culpar o parceiro por não ter se movimentado corretamente',
      'Abandonar o treino com raiva e frustração',
      'Respirar com calma (autocontrole), pedir orientação ao Sensei e tentar novamente com atenção aos detalhes',
      'Aplicar o golpe com força descontrolada para forçar a queda'
    ],
    correctIndex: 2,
    explanation: 'O Judô ensina o autocontrole (Gaman) e a modéstia (Kenson). Errar faz parte do aprendizado contínuo para aperfeiçoar a mente e a técnica.'
  },
  {
    id: 'q5',
    category: 'Técnica',
    question: 'Quais são as três fases essenciais na execução de qualquer técnica de projeção (Nage-waza)?',
    options: [
      'Hajime, Matte e Soremade',
      'Kuzushi (Desequilíbrio), Tsukuri (Preparação/Encaixe) e Kake (Aplicação/Execução)',
      'Osaekomi, Toketa e Ippon',
      'Shisei, Shintai e Kumikata'
    ],
    correctIndex: 1,
    explanation: 'Toda projeção exige desequilibrar o oponente (Kuzushi), posicionar o corpo no ponto ideal de alavanca (Tsukuri) e desferir a projeção (Kake).'
  },
  {
    id: 'q6',
    category: 'Arbitragem',
    question: 'Por quantos segundos o judoca deve manter o adversário imobilizado de costas no tatame para conquistar a pontuação máxima de Ippon?',
    options: [
      '10 segundos',
      '15 segundos',
      '20 segundos',
      '30 segundos'
    ],
    correctIndex: 2,
    explanation: 'Nas regras oficiais da CBJ/IJF, 10 a 19 segundos conferem Waza-ari; 20 segundos conferem Ippon e a vitória imediata do combate.'
  },
  {
    id: 'q7',
    category: 'Segurança',
    question: 'O que o praticante deve fazer imediatamente ao sofrer uma chave de braço ou estrangulamento que cause dor ou submissão?',
    options: [
      'Resistir até o limite máximo para não perder',
      'Bater 2 ou 3 vezes com a mão espalmada no parceiro ou tatame (ou falar "Maitá")',
      'Empurrar o rosto do colega com os pés',
      'Ficar em silêncio e esperar o tempo acabar'
    ],
    correctIndex: 1,
    explanation: 'O sinal de desistência (Battai) protege a integridade articular e física. O parceiro deve soltar imediatamente ao receber o sinal.'
  },
  {
    id: 'q8',
    category: 'Fundamentos',
    question: 'Qual é o nome correto dado ao uniforme tradicional utilizado para a prática do Judô?',
    options: [
      'Kimono genérico',
      'Judogi (composto por Uwagi, Zubon e Obi)',
      'Dojogi',
      'Tatami'
    ],
    correctIndex: 1,
    explanation: 'O uniforme oficial do Judô, criado por Jigoro Kano, chama-se Judogi (composto pelo casaco Uwagi, calça Zubon e faixa Obi).'
  }
];
