import { TheoryQuizQuestion } from '../types';

export const theoryQuizzes: TheoryQuizQuestion[] = [
  // --- AULA 1 (TH_ESS_001) ---
  {
    id: 'QZ_TH_001_1',
    lessonId: 'TH_ESS_001',
    question: 'O Judô é apenas um esporte de competição?',
    options: [
      'Sim, porque só existe para definir vencedores.',
      'Não. Também é educação, arte marcial, cultura e desenvolvimento humano.',
      'Sim, porque não possui valores fora da luta.',
      'Não, porque não utiliza regras oficiais.'
    ],
    correctOptionIndex: 1,
    explanation: 'O Judô foi concebido pelo Mestre Jigoro Kano como um sistema educacional integral que une arte marcial, esporte, formação moral e evolução pessoal contínua.'
  },
  {
    id: 'QZ_TH_001_2',
    lessonId: 'TH_ESS_001',
    question: 'Qual atitude representa melhor o conceito de técnica responsável no Judô?',
    options: [
      'Aplicar força máxima sem observar as condições do parceiro.',
      'Acelerar a execução de golpes para terminar o treino mais rápido.',
      'Usar controle, atenção, progressão adequada e respeito à segurança.',
      'Repetir técnicas perigosas fora do tatame e sem supervisão.'
    ],
    correctOptionIndex: 2,
    explanation: 'Técnica responsável baseia-se em autocontrole, consciência corporal, cuidado com a integridade física do parceiro e respeito às instruções do professor.'
  },
  {
    id: 'QZ_TH_001_3',
    lessonId: 'TH_ESS_001',
    question: 'Por que o parceiro de treino é considerado essencial no aprendizado do Judô?',
    options: [
      'Porque serve unicamente como obstáculo a ser derrotado a todo custo.',
      'Porque o treino exige mútua cooperação, confiança, segurança e aprendizado conjunto.',
      'Porque o Judô não exige qualquer conexão interpessoal.',
      'Porque seu único objetivo é contar a pontuação do combate.'
    ],
    correctOptionIndex: 1,
    explanation: 'Sem um parceiro com quem cooperar e aprender, é impossível desenvolver o Judô. A parceria mútua é a base do princípio Jita Kyoei.'
  },

  // --- AULA 2 (TH_FIL_001) ---
  {
    id: 'QZ_TH_002_1',
    lessonId: 'TH_FIL_001',
    question: 'O que expressa com precisão o princípio Seiryoku Zenyo?',
    options: [
      'Usar força bruta em todas as ações para impor dominância.',
      'Evitar qualquer tipo de esforço físico ou mental.',
      'O uso mais eficiente e inteligente da energia física e mental.',
      'Buscar a vitória fácil sem necessidade de dedicação.'
    ],
    correctOptionIndex: 2,
    explanation: 'Seiryoku Zenyo significa máxima eficiência com o mínimo de esforço desnecessário, direcionando energia, atenção e técnica com inteligência.'
  },
  {
    id: 'QZ_TH_002_2',
    lessonId: 'TH_FIL_001',
    question: 'Quando uma técnica não funciona no treino, o que o princípio sugere observar primeiro?',
    options: [
      'Aumentar cegamente a força física.',
      'Ajustar postura, distância, tempo e a direção do desequilíbrio.',
      'Ignorar as reações do parceiro.',
      'Reclamar do tatame ou da vestimenta.'
    ],
    correctOptionIndex: 1,
    explanation: 'Eficiência técnica não se resolve com força bruta, mas sim com observação precisa de base, tempo de entrada (timing), ângulo e kuzushi.'
  },
  {
    id: 'QZ_TH_002_3',
    lessonId: 'TH_FIL_001',
    question: 'Como aplicar o princípio Seiryoku Zenyo fora do tatame?',
    options: [
      'Agindo por impulso sem planejamento prévio.',
      'Desperdiçando tempo em tarefas desordenadas.',
      'Organizando a rotina com foco, descanso adequado e concentração nas tarefas.',
      'Tentando resolver tudo com agressividade verbal.'
    ],
    correctOptionIndex: 2,
    explanation: 'Fora do dojo, Seiryoku Zenyo se reflete em gerenciar tempo, estudos e energia mental com clareza, serenidade e propósito.'
  },

  // --- AULA 3 (TH_FIL_002) ---
  {
    id: 'QZ_TH_003_1',
    lessonId: 'TH_FIL_002',
    question: 'O princípio Jita Kyoei ensina fundamentalmente:',
    options: [
      'A busca da evolução individual sem se importar com os outros.',
      'Prosperidade e benefícios mútuos para si e para a coletividade.',
      'Que a força individual é o único critério que importa.',
      'Que iniciantes não devem receber ajuda de judocas graduados.'
    ],
    correctOptionIndex: 1,
    explanation: 'Jita Kyoei preconiza que o progresso do indivíduo só tem valor real quando contribui ativamente para a elevação e bem-estar de toda a sociedade.'
  },
  {
    id: 'QZ_TH_003_2',
    lessonId: 'TH_FIL_002',
    question: 'Ao treinar com um colega iniciante, qual conduta melhor reflete Jita Kyoei?',
    options: [
      'Aplicar técnicas pesadas para impressionar quem está assistindo.',
      'Ajustar a intensidade, cuidar da segurança e ajudá-lo a aprender os fundamentos.',
      'Recusar-se a treinar porque ele não tem a mesma graduação.',
      'Corrigi-lo de forma grosseira na frente de todos.'
    ],
    correctOptionIndex: 1,
    explanation: 'Ajustar o ritmo e acolher o iniciante demonstra maturidade, generosidade e compromisso com o fortalecimento de todo o grupo.'
  },
  {
    id: 'QZ_TH_003_3',
    lessonId: 'TH_FIL_002',
    question: 'Como a vitória deve ser vivenciada à luz dos valores do Judô?',
    options: [
      'Com comemoração exagerada que diminua o adversário.',
      'Com respeito, modéstia e gratidão ao parceiro que proporcionou o combate.',
      'Como prova de superioridade pessoal absoluta.',
      'Desprezando os atletas que foram derrotados.'
    ],
    correctOptionIndex: 1,
    explanation: 'No Judô, respeita-se o oponente mesmo na vitória, reconhecendo que seu empenho e resistência foram fundamentais para o nosso próprio crescimento.'
  },

  // --- AULA 4 (TH_CUL_001) ---
  {
    id: 'QZ_TH_004_1',
    lessonId: 'TH_CUL_001',
    question: 'O Rei (saudação) no Judô é apenas uma formalidade mecânica?',
    options: [
      'Sim, serve apenas para cumprir protocolo estético.',
      'Não. É a expressão visível de uma atitude contínua de respeito e responsabilidade.',
      'Sim, pois não tem qualquer ligação com a segurança.',
      'Não, porque substitui a necessidade de treinar as quedas.'
    ],
    correctOptionIndex: 1,
    explanation: 'O Rei materializa a atitude ética do judoca, estabelecendo um pacto silencioso de atenção, cortesia e integridade com o dojo e os parceiros.'
  },
  {
    id: 'QZ_TH_004_2',
    lessonId: 'TH_CUL_001',
    question: 'Qual dessas atitudes práticas expressa o verdadeiro espírito de Rei no tatame?',
    options: [
      'Conversar e rir alto durante as explicações do professor.',
      'Manter a higiene pessoal, cuidar do parceiro e escutar com atenção.',
      'Ignorar quando o colega sinaliza desconforto.',
      'Deixar seus pertences espalhados na área de passagem.'
    ],
    correctOptionIndex: 1,
    explanation: 'Respeito é evidenciado em atos concretos: silêncio durante o ensino, asseio do judogi, unhas cortadas e atenção plena ao bem-estar coletivo.'
  },
  {
    id: 'QZ_TH_004_3',
    lessonId: 'TH_CUL_001',
    question: 'Fazer uma pergunta educada ao professor é considerado falta de respeito?',
    options: [
      'Sim, o aluno deve sempre se calar mesmo com dúvidas graves de segurança.',
      'Não. Tirar dúvidas com respeito e postura faz parte essencial do aprendizado.',
      'Sim, perguntas só podem ser feitas por faixas-pretas.',
      'Apenas se for sobre regras de competição.'
    ],
    correctOptionIndex: 1,
    explanation: 'A busca sincera por esclarecimento, feita com humildade e no momento oportuno, é bem-vinda e recomendada para uma prática segura.'
  },

  // --- AULA 5 (TH_CUL_002) ---
  {
    id: 'QZ_TH_005_1',
    lessonId: 'TH_CUL_002',
    question: 'No contexto do treino de Judô, quem é Tori e quem é Uke?',
    options: [
      'Tori é o árbitro e Uke é o espectador.',
      'Tori é quem executa a ação e Uke é quem recebe a técnica.',
      'Tori é quem sempre vence e Uke é quem sempre perde.',
      'Tori é o iniciante e Uke é o faixa-preta.'
    ],
    correctOptionIndex: 1,
    explanation: 'Tori (aquele que aplica) e Uke (aquele que recebe) alternam seus papéis continuamente durante as sessões de estudo técnico.'
  },
  {
    id: 'QZ_TH_005_2',
    lessonId: 'TH_CUL_002',
    question: 'Qual é o papel ativo de Uke durante a prática?',
    options: [
      'Permanecer passivo sem prestar atenção ao próprio corpo.',
      'Acompanhar a técnica, realizar o Ukemi correto e comunicar qualquer limite com clareza.',
      'Resistir com força desproporcional fora da proposta do exercício.',
      'Olhar para outro lado enquanto é projetado.'
    ],
    correctOptionIndex: 1,
    explanation: 'Uke desempenha função ativa e indispensável: protege o próprio corpo pelo ukemi correto, dá o feedback da técnica e garante a segurança.'
  },
  {
    id: 'QZ_TH_005_3',
    lessonId: 'TH_CUL_002',
    question: 'O que Tori deve fazer imediatamente se Uke der dois toques rápidos (bater) ou pedir para parar?',
    options: [
      'Esperar mais alguns segundos para terminar a imobilização.',
      'Soltar e interromper a técnica instantaneamente, verificando o estado do parceiro.',
      'Rir e dizer que o parceiro precisa aguentar mais.',
      'Perguntar por que ele bateu antes de soltar a pegada.'
    ],
    correctOptionIndex: 1,
    explanation: 'O sinal de desistência ou pedido de parada é inviolável. Tori tem a obrigação ética e de segurança de cessar imediatamente qualquer força.'
  },

  // --- AULA 6 (TH_MOV_001) ---
  {
    id: 'QZ_TH_006_1',
    lessonId: 'TH_MOV_001',
    question: 'Como a compreensão da base de apoio ajuda o praticante no Judô?',
    options: [
      'Não tem relação com a prática do Judô.',
      'Permite entender estabilidade, equilíbrio e como a distribuição do corpo no chão influencia o movimento.',
      'Serve apenas para calcular a pontuação no placar.',
      'Define a cor da faixa do judoca.'
    ],
    correctOptionIndex: 1,
    explanation: 'A base de apoio é a área de contato dos pés com o tatame; dominá-la permite manter a postura firme e identificar vulnerabilidades no parceiro.'
  },
  {
    id: 'QZ_TH_006_2',
    lessonId: 'TH_MOV_001',
    question: 'Estar em equilíbrio no Judô significa ficar estático e imóvel no mesmo lugar?',
    options: [
      'Sim, judocas não devem se movimentar.',
      'Não. O equilíbrio é dinâmico e se ajusta constantemente a cada passo e pegada.',
      'Sim, qualquer movimento quebra o equilíbrio.',
      'Apenas durante as saudações iniciais.'
    ],
    correctOptionIndex: 1,
    explanation: 'O equilíbrio no Judô (Shisei dinâmico) é ativo, adaptando-se continuamente às forças e deslocamentos de Tori e Uke.'
  },
  {
    id: 'QZ_TH_006_3',
    lessonId: 'TH_MOV_001',
    question: 'Qual é o objetivo central do estudo da biomecânica no aplicativo Dojo Digital?',
    options: [
      'Incentivar a prática de golpes perigosos em casa sem supervisão.',
      'Desenvolver a compreensão conceitual da física do movimento para enriquecer o treino presencial com o professor.',
      'Substituir completamente a necessidade de ir à academia.',
      'Ensinar truques para competir sem treinar.'
    ],
    correctOptionIndex: 1,
    explanation: 'O conhecimento teórico complementa o aprendizado prático, que SEMPRE deve acontecer no dojo, sobre tatame e com a orientação de um professor qualificado.'
  },

  // --- AULA 7 (TH_SEG_001) ---
  {
    id: 'QZ_TH_007_1',
    lessonId: 'TH_SEG_001',
    question: 'Qual é a conduta correta diante de dor aguda, tontura, falta de ar ou mal-estar no treino?',
    options: [
      'Esconder o sintoma para não demonstrar fraqueza diante dos colegas.',
      'Interromper imediatamente o exercício, avisar o professor e seguir as orientações adequadas.',
      'Acelerar os movimentos para tentar aquecer e esquecer a dor.',
      'Tomar remédios por conta própria e voltar ao combate.'
    ],
    correctOptionIndex: 1,
    explanation: 'Segurança é prioridade absoluta. Ignorar sinais graves de alerta aumenta o risco de lesões severas.'
  },
  {
    id: 'QZ_TH_007_2',
    lessonId: 'TH_SEG_001',
    question: 'Parar o treino por cansaço extremo ou desconforto físico é sinal de fraqueza moral?',
    options: [
      'Sim, o judoca nunca deve parar.',
      'Não. É um ato de inteligência corporal, responsabilidade e autocuidado.',
      'Apenas para atletas de alto rendimento.',
      'Sim, pois contraria a disciplina.'
    ],
    correctOptionIndex: 1,
    explanation: 'Reconhecer limites e respeitar o tempo de recuperação é a base da longevidade esportiva e da sabedoria marcial.'
  },
  {
    id: 'QZ_TH_007_3',
    lessonId: 'TH_SEG_001',
    question: 'As orientações de saúde do aplicativo substituem a consulta com profissionais de medicina ou fisioterapia?',
    options: [
      'Sim, o aplicativo prescreve tratamentos individuais.',
      'Não. O conteúdo é estritamente educativo e casos de dor persistente exigem avaliação médica especializada.',
      'Apenas para praticantes com mais de 40 anos.',
      'Sim, desde que o usuário leia todos os módulos.'
    ],
    correctOptionIndex: 1,
    explanation: 'O aplicativo oferece diretrizes pedagógicas gerais de segurança; diagnósticos e tratamentos cabem exclusivamente a profissionais de saúde.'
  }
];

export const getTheoryQuizzesByLessonId = (lessonId: string): TheoryQuizQuestion[] => {
  return theoryQuizzes.filter(q => q.lessonId === lessonId);
};
