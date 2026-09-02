import { TheoryLesson } from '../types';

export const theoryLessons: TheoryLesson[] = [
  // =========================================================================
  // TRILHA 1: ESSÊNCIA E HISTÓRIA DO JUDÔ
  // =========================================================================
  {
    id: 'TH_ESS_001',
    slug: 'judo-educacao-arte-marcial-esporte',
    trackNumber: 1,
    trackSlug: 'essencia-e-historia-do-judo',
    trackTitle: 'Essência e História do Judô',
    lessonNumber: 1,
    title: 'Judô: educação, arte marcial e esporte',
    subtitle: 'Compreenda por que o Judô vai além de técnicas, faixas e resultados em campeonatos.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Compreender o Judô como prática educacional, marcial e esportiva.',
      'Diferenciar técnica responsável de força bruta ou violência.',
      'Reconhecer a importância da parceria, respeito e disciplina contínua.'
    ],
    introduction: 'O Judô é uma prática criada para desenvolver o corpo, a mente e a forma como as pessoas convivem. Ele pode ser praticado como arte marcial, esporte, atividade educacional e caminho de evolução pessoal. Por isso, conhecer técnicas é importante, mas aprender a agir com respeito, autocontrole e responsabilidade também faz parte do treino.',
    sections: [
      {
        title: 'Judô é mais do que uma luta',
        content: 'O Judô utiliza projeções, controles no solo, deslocamentos, pegadas, equilíbrio e desequilíbrio. Mas seu objetivo não é incentivar a violência. A técnica existe para desenvolver controle, precisão, consciência corporal e responsabilidade sobre os próprios atos.'
      },
      {
        title: 'Educação pelo movimento',
        content: 'O aluno aprende a observar, repetir, errar, pedir ajuda, respeitar limites e recomeçar. Cada treino pode ensinar disciplina, paciência, coragem e cooperação mútua sob a orientação do professor.'
      },
      {
        title: 'Arte marcial, esporte e cultura',
        content: 'Como arte marcial, o Judô transmite princípios de defesa, controle e respeito. Como esporte, possui regras claras, categorias e competições organizadas. Como cultura, preserva linguagem, etiqueta, história e valores. Essas três dimensões coexistem em harmonia.'
      },
      {
        title: 'Parceria no treino',
        content: 'No Judô, uma pessoa não evolui sozinha. Quem executa uma técnica deve cuidar do parceiro. Quem recebe deve colaborar, comunicar limites e praticar o ukemi (amortecimento de queda) com segurança. Segurança e respeito são deveres de todos.'
      }
    ],
    summaryPoints: [
      'Judô é educação, arte marcial, esporte e cultura integrada.',
      'Técnica responsável é fundamentada em controle, e não em força descontrolada.',
      'O parceiro de treino é peça essencial para o aprendizado seguro de ambos.'
    ],
    onTatame: 'Antes de tentar uma técnica nova, observe com calma a demonstração do professor, respeite o ritmo do parceiro e pratique somente dentro da progressão pedagógica indicada.',
    inLife: 'Nem todo desafio precisa ser enfrentado com agressividade ou força. A maioria dos conflitos se resolve quando você observa, adapta sua estratégia e age com empatia e respeito.',
    japaneseWord: {
      romaji: 'Jūdō',
      kanji: '柔道',
      pronunciation: 'Dju-dô',
      definition: 'Prática de aperfeiçoamento contínuo. "Ju" remete à suavidade e flexibilidade; "Do" é o caminho ético de vida.'
    },
    reflectionScenario: {
      question: 'Você treina com uma pessoa iniciante que ainda não sabe cair com segurança. Você consegue aplicar uma projeção com facilidade. Qual é a atitude mais responsável?',
      options: [
        'Usar força máxima para demonstrar superioridade.',
        'Executar a técnica com pressa para terminar a série rápido.',
        'Ajustar a intensidade, seguir a orientação do professor e ajudá-la a aprender os fundamentos com segurança.',
        'Recusar-se a treinar com iniciantes.'
      ],
      correctOptionIndex: 2,
      explanation: 'O Judô ensina evolução conjunta. Ajustar intensidade e zelar pela integridade física do colega demonstra verdadeira maturidade técnica e caráter.'
    },
    quizQuestionIds: ['QZ_TH_001_1', 'QZ_TH_001_2', 'QZ_TH_001_3'],
    flashcardIds: ['FC_TH_001_1', 'FC_TH_001_2', 'FC_TH_001_3'],
    referenceIds: ['REF-KOD-001', 'REF-IJF-001', 'REF-IJF-002'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige professor qualificado, tatame adequado, parceiro preparado e respeito às regras.'
  },

  // =========================================================================
  // TRILHA 2: FILOSOFIA, VALORES E MENTALIDADE
  // =========================================================================
  {
    id: 'TH_FIL_001',
    slug: 'seiryoku-zenyo-eficiencia-fisica-mental',
    trackNumber: 2,
    trackSlug: 'filosofia-valores-e-mentalidade',
    trackTitle: 'Filosofia, Valores e Mentalidade',
    lessonNumber: 6,
    title: 'Seiryoku Zenyo: eficiência física e mental',
    subtitle: 'Aprenda a usar energia, atenção e técnica com inteligência e economia.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Entender Seiryoku Zenyo como o uso racional e eficiente da energia.',
      'Diferenciar eficiência biomecânica de força bruta.',
      'Aplicar o princípio no treino e nos desafios da rotina diária.'
    ],
    introduction: 'Seiryoku Zenyo é um dos dois pilares centrais do Judô. Ele ensina que a energia física e mental deve ser empregada com inteligência e propósito. No tatame, isso se traduz no uso de postura, ângulo, tempo e desequilíbrio, em vez de recorrer apenas à força muscular. Fora do dojo, manifesta-se na capacidade de planejar, focar e agir conscientemente.',
    sections: [
      {
        title: 'Eficiência não é fraqueza',
        content: 'Usar a energia com eficiência não significa atuar sem vigor. Significa aplicar a intensidade estritamente necessária, na fração de segundo exata, com uma finalidade clara e sem desperdícios.'
      },
      {
        title: 'Força sem direção dissipa energia',
        content: 'Empurrar ou puxar sem compreender a base e a reação do parceiro cansa rapidamente o praticante e eleva o risco de erros e lesões. A boa técnica depende de atenção ao centro de gravidade e à respiração.'
      },
      {
        title: 'O princípio aplicado fora do dojo',
        content: 'Organizar uma rotina de estudos, dormir nos horários certos, planejar uma tarefa com calma e escutar antes de responder são formas práticas de aplicar Seiryoku Zenyo no cotidiano.'
      },
      {
        title: 'Observar antes de insistir na força',
        content: 'Quando um movimento não der certo, a primeira pergunta do judoca não deve ser "como faço mais força?", mas sim "o que preciso observar e corrigir no meu posicionamento?".'
      }
    ],
    summaryPoints: [
      'Eficiência técnica é distinta do uso de força bruta desordenada.',
      'A eficácia depende de alinhamento postural, tempo de entrada (timing) e kuzushi.',
      'O princípio serve como guia para a organização dos estudos, trabalho e vida pessoal.'
    ],
    onTatame: 'Quando uma técnica encontrar resistência, não force. Pare, peça correção ao professor e observe a distância (ma-ai), a pegada (kumikata) e o desequilíbrio.',
    inLife: 'Antes de repetir um esforço desgastante que não traz resultados, respire, reavalie a situação e altere seu método de abordagem com calma.',
    japaneseWord: {
      romaji: 'Seiryoku Zenyo',
      kanji: '精力善用',
      pronunciation: 'Sei-rio-ku Zen-yo',
      definition: 'Máxima eficiência com o mínimo de esforço desnecessário. Uso inteligente da energia física e mental.'
    },
    reflectionScenario: {
      question: 'Você tenta executar uma ação repetidas vezes e ela é bloqueada. Você está cansado e cogita forçar com toda a energia que resta. O que é mais prudente?',
      options: [
        'Aumentar cegamente a força física até conseguir.',
        'Pedir orientação ao professor e rever postura, distância e tempo de entrada.',
        'Desistir do treino e culpar o parceiro.',
        'Continuar mesmo se começar a sentir dor articular.'
      ],
      correctOptionIndex: 1,
      explanation: 'Eficiência começa com autoanálise. A força excessiva não corrige falhas de ângulo, tempo de reação ou falta de desequilíbrio.'
    },
    quizQuestionIds: ['QZ_TH_002_1', 'QZ_TH_002_2', 'QZ_TH_002_3'],
    flashcardIds: ['FC_TH_002_1', 'FC_TH_002_2', 'FC_TH_002_3'],
    referenceIds: ['REF-IJF-001', 'REF-IJF-002', 'REF-KOD-001'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige supervisão presencial em ambiente seguro.'
  },
  {
    id: 'TH_FIL_002',
    slug: 'jita-kyoei-crescimento-coletivo',
    trackNumber: 2,
    trackSlug: 'filosofia-valores-e-mentalidade',
    trackTitle: 'Filosofia, Valores e Mentalidade',
    lessonNumber: 7,
    title: 'Jita Kyoei: crescimento coletivo',
    subtitle: 'Entenda como a prosperidade mútua e o respeito fortalecem todos os praticantes.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Compreender Jita Kyoei como princípio de prosperidade mútua.',
      'Reconhecer o parceiro como sujeito indispensável da evolução.',
      'Praticar cooperação, empatia e respeito no dojo e na sociedade.'
    ],
    introduction: 'Jita Kyoei ensina que o progresso pessoal verdadeiro só acontece quando promove também a elevação de quem está ao nosso redor. No Judô, isso é vivenciado diariamente quando os colegas cuidam da integridade física uns dos outros, compartilham ensinamentos e praticam com honestidade e generosidade.',
    sections: [
      {
        title: 'Ninguém evolui sozinho',
        content: 'O Judô é uma arte baseada no encontro. Tori e Uke exercem funções distintas, mas ambos são igualmente responsáveis pela qualidade do estudo, pela segurança e pela confiança mútua.'
      },
      {
        title: 'Ajustar a intensidade é sinal de grandeza',
        content: 'Praticar com um iniciante, uma criança ou um veterano exige calibrar o ritmo. Essa adaptação não empobrece o treino do judoca avançado; ao contrário, aprimora seu controle motor e sua empatia.'
      },
      {
        title: 'Ensinar consolida o aprendizado',
        content: 'Ao explicar um fundamento a um colega com paciência, o praticante revisita conceitos, esclarece detalhes e fortalece a comunidade do dojo como um todo.'
      },
      {
        title: 'Vencer com modéstia, perder com dignidade',
        content: 'Resultados em combates nunca autorizam arrogância ou desrespeito. O judoca honra o esforço do oponente e reconhece que a vitória ou a derrota são apenas momentos passageiros de aprendizado.'
      }
    ],
    summaryPoints: [
      'O Judô é construído sobre a cooperação e a responsabilidade coletiva.',
      'Zelar pela segurança e pelo desenvolvimento do parceiro beneficia o dojo inteiro.',
      'A verdadeira vitória é o aprimoramento do caráter de todos os envolvidos.'
    ],
    onTatame: 'Antes de iniciar o treino, alinhe a intensidade com seu parceiro. Após os exercícios, agradeça sinceramente e pergunte se ele está bem.',
    inLife: 'Compartilhe seus conhecimentos, escute com atenção genuína e colabore para que as pessoas ao seu lado também alcancem seus objetivos.',
    japaneseWord: {
      romaji: 'Jita Kyōei',
      kanji: '自他共栄',
      pronunciation: 'Dji-tá Kio-ei',
      definition: 'Prosperidade e benefícios mútuos. Progredir juntos para o bem comum.'
    },
    reflectionScenario: {
      question: 'Você é um aluno experiente e está treinando com um colega no primeiro mês de prática. Qual atitude melhor expressa Jita Kyoei?',
      options: [
        'Projetá-lo com força para mostrar sua graduação.',
        'Evitar fazer dupla com iniciantes para não "perder tempo".',
        'Ajustar o ritmo, incentivar a postura correta e ajudá-lo a praticar as quedas com tranquilidade.',
        'Corrigi-lo de maneira impaciente e em voz alta.'
      ],
      correctOptionIndex: 2,
      explanation: 'Jita Kyoei exige paciência e acolhimento. Cuidar de quem está começando fortalece as bases de todo o grupo.'
    },
    quizQuestionIds: ['QZ_TH_003_1', 'QZ_TH_003_2', 'QZ_TH_003_3'],
    flashcardIds: ['FC_TH_003_1', 'FC_TH_003_2', 'FC_TH_003_3'],
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-KOD-001'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige acompanhamento presencial qualificado.'
  },

  // =========================================================================
  // TRILHA 3: CULTURA, ETIQUETA E VIDA NO DOJO
  // =========================================================================
  {
    id: 'TH_CUL_001',
    slug: 'rei-respeito-como-atitude',
    trackNumber: 3,
    trackSlug: 'cultura-etiqueta-e-vida-no-dojo',
    trackTitle: 'Cultura, Etiqueta e Vida no Dojo',
    lessonNumber: 11,
    title: 'Rei: respeito como atitude diária',
    subtitle: 'A saudação é o reflexo visível de uma postura ética que acompanha todo o treino.',
    estimatedTimeMinutes: 5,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Entender o conceito de Rei como saudação e compromisso ético.',
      'Relacionar a etiqueta do dojo à segurança e harmonia coletiva.',
      'Praticar o respeito antes, durante e após as atividades no tatame.'
    ],
    introduction: 'O Rei é a saudação tradicional que permeia toda a cultura do Judô. Mais do que um gesto corporal, representa atenção plena, cortesia, gratidão e consideração mútua. Ao saudar o dojo, os mestres e os parceiros, o judoca assume o compromisso de agir com integridade e cuidado.',
    sections: [
      {
        title: 'Rei não é mera formalidade',
        content: 'A saudação marca o início e o fim de um estado mental de foco e respeito. Ela sinaliza que o tatame é um espaço sagrado de aprendizado, onde vaidades e rivalidades destrutivas não têm lugar.'
      },
      {
        title: 'Respeito é a base da segurança',
        content: 'Ouvir as instruções sem conversas paralelas, manter o judogi limpo, unhas aparadas e cuidar da integridade do parceiro são expressões diretas do princípio do respeito.'
      },
      {
        title: 'Respeito não significa passividade',
        content: 'O praticante pode e deve tirar dúvidas, expressar limites de dor ou cansaço e comunicar desconfortos com educação. O silêncio perante uma situação de perigo não é respeito.'
      },
      {
        title: 'A postura de Rei fora do tatame',
        content: 'Na vida diária, Rei se manifesta em pontualidade, escuta atenta, cordialidade no trânsito, zelo pelos ambientes comuns e apreço pelo esforço alheio.'
      }
    ],
    summaryPoints: [
      'Rei expressa reverência sincera, cortesia e compromisso com o grupo.',
      'A disciplina e a etiqueta do dojo previnem acidentes graves.',
      'Perguntar com humildade e comunicar desconfortos faz parte do respeito.'
    ],
    onTatame: 'Cumprimente corretamente ao entrar e sair do tatame e ao iniciar ou concluir qualquer exercício com um parceiro. Cuide do espaço coletivo.',
    inLife: 'Trate todas as pessoas com cortesia e escuta genuína, reconhecendo que cada uma carrega suas próprias lutas e ritmos de vida.',
    japaneseWord: {
      romaji: 'Rei',
      kanji: '礼',
      pronunciation: 'Rêi',
      definition: 'Saudação, cortesia, etiqueta e respeito mútuo no Judô.'
    },
    reflectionScenario: {
      question: 'Você nota que seu colega de treino demonstra desconforto físico durante uma repetição, mas ele tem vergonha de falar. Qual a atitude correta?',
      options: [
        'Ignorar para não interromper a contagem do exercício.',
        'Aumentar o ritmo para terminar logo.',
        'Parar respeitosamente, perguntar se está tudo bem e avisar o professor se houver suspeita de lesão.',
        'Rir da situação com os outros colegas.'
      ],
      correctOptionIndex: 2,
      explanation: 'O judoca atento protege o parceiro. A preocupação genuína com o bem-estar do colega é a mais pura expressão de Rei.'
    },
    quizQuestionIds: ['QZ_TH_004_1', 'QZ_TH_004_2', 'QZ_TH_004_3'],
    flashcardIds: ['FC_TH_004_1', 'FC_TH_004_2', 'FC_TH_004_3'],
    referenceIds: ['REF-IJF-001', 'REF-IJF-003'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige ambiente adequado e supervisão qualificada.'
  },
  {
    id: 'TH_CUL_002',
    slug: 'tori-uke-responsabilidade-compartilhada',
    trackNumber: 3,
    trackSlug: 'cultura-etiqueta-e-vida-no-dojo',
    trackTitle: 'Cultura, Etiqueta e Vida no Dojo',
    lessonNumber: 12,
    title: 'Tori e uke: responsabilidade compartilhada',
    subtitle: 'Os dois papéis são indispensáveis para a segurança, a confiança e a evolução técnica.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Definir com clareza as funções complementares de Tori e Uke.',
      'Compreender a corresponsabilidade pela segurança no tatame.',
      'Valorizar a comunicação aberta e o sinal inegociável de desistência.'
    ],
    introduction: 'No Judô, Tori é quem executa a técnica e Uke é quem a recebe e proporciona a oportunidade do estudo. Esses papéis se alternam constantemente. Nenhum é superior ao outro: ambos constroem a confiança necessária para que projeções e finalizações aconteçam com precisão e sem lesões.',
    sections: [
      {
        title: 'O dever de Tori: controle e zelo',
        content: 'Tori deve conduzir a ação técnica com precisão e controle. Ter a oportunidade de arremessar ou imobilizar não dá o direito de soltar o peso com imprudência ou ignorar sinais de cansaço de Uke.'
      },
      {
        title: 'O papel ativo de Uke: proteção e postura',
        content: 'Uke não é um mero boneco passivo. Uke acompanha o movimento com sensibilidade, pratica o ukemi correto para dissipar o impacto no chão e mantém a comunicação sobre seus limites.'
      },
      {
        title: 'Comunicação e alinhamento mútuo',
        content: 'Antes de iniciar uma sequência, os parceiros podem combinar a velocidade e a intensidade. Durante a execução, qualquer um pode sinalizar a necessidade de uma pausa.'
      },
      {
        title: 'A regra suprema do sinal de desistência',
        content: 'Ao menor toque duplo (bater com a mão ou o pé) ou aviso verbal de parada ("Maita" / "Parou"), Tori tem o dever inegociável de soltar imediatamente qualquer pegada ou pressão articular.'
      }
    ],
    summaryPoints: [
      'Tori projeta e controla; Uke recebe e realiza o amortecimento de queda.',
      'Ambos são guardiões da integridade física e do aprendizado um do outro.',
      'O sinal de desistência (bater) encerra a técnica no mesmo milissegundo.'
    ],
    onTatame: 'Ao aplicar uma técnica, sustente a manga do parceiro durante a projeção para auxiliá-lo a cair em segurança e amortecer o impacto.',
    inLife: 'Relações saudáveis se apoiam em cooperação e confiança mútua, onde ambas as partes escutam e respeitam os limites estabelecidos.',
    japaneseWord: {
      romaji: 'Tori & Uke',
      kanji: '取り / 受け',
      pronunciation: 'Tô-ri & U-kê',
      definition: 'Tori (aquele que aplica a técnica) e Uke (aquele que recebe o movimento e executa a queda).'
    },
    reflectionScenario: {
      question: 'Durante um treino de imobilização no solo (osaekomi), seu parceiro bate duas vezes no tatame sinalizando desistência. O que fazer?',
      options: [
        'Manter a pegada por mais 10 segundos para treinar a resistência dele.',
        'Soltar a imobilização imediatamente e verificar se ele precisa de ajuda ou ar.',
        'Dizer que ele bateu muito rápido e continuar a luta.',
        'Perguntar o motivo antes de aliviar a pressão.'
      ],
      correctOptionIndex: 1,
      explanation: 'A segurança é prioridade absoluta. O sinal de desistência deve ser atendido de forma instantânea e sem hesitação.'
    },
    quizQuestionIds: ['QZ_TH_005_1', 'QZ_TH_005_2', 'QZ_TH_005_3'],
    flashcardIds: ['FC_TH_005_1', 'FC_TH_005_2', 'FC_TH_005_3'],
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-KOD-001'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige supervisão profissional qualificada.'
  },

  // =========================================================================
  // TRILHA 4: CIÊNCIA DO MOVIMENTO NO JUDÔ
  // =========================================================================
  {
    id: 'TH_MOV_001',
    slug: 'centro-gravidade-base-apoio',
    trackNumber: 4,
    trackSlug: 'ciencia-do-movimento-no-judo',
    trackTitle: 'Ciência do Movimento no Judô',
    lessonNumber: 16,
    title: 'Centro de gravidade e base de apoio',
    subtitle: 'Compreenda a biomecânica do equilíbrio, postura e estabilidade no tatame.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Entender a relação entre centro de gravidade e base de apoio.',
      'Identificar posturas que favorecem a estabilidade e a mobilidade.',
      'Analisar movimentos tecnicamente sem tentar executá-los fora do dojo.'
    ],
    introduction: 'O Judô é uma manifestação prática da física e da biomecânica humana. Compreender onde se localiza o centro de gravidade e como a base de apoio reage ao contato do solo permite ao judoca economizar energia, manter a firmeza de sua postura (Shisei) e identificar os instantes exatos de vulnerabilidade do oponente.',
    sections: [
      {
        title: 'O que é o centro de gravidade no corpo?',
        content: 'De maneira simplificada, o centro de gravidade é o ponto onde o peso corporal se equilibra. No corpo humano em pé, situa-se próximo à região do baixo abdômen (Tanden / Hara). Ao flexionar os joelhos, rebaixamos o centro de gravidade, aumentando a estabilidade.'
      },
      {
        title: 'Base de apoio e polígono de sustentação',
        content: 'A base de apoio é a área demarcada pelos pés no chão. Pés excessivamente juntos deixam o praticante instável; pés excessivamente abertos travam o quadril e dificultam giros e deslocamentos rápidos (Tai-sabaki).'
      },
      {
        title: 'Equilíbrio dinâmico em movimento',
        content: 'No combate, o equilíbrio nunca é estático. A cada passo deslizado (Tsugi-ashi ou Ayumi-ashi), o praticante transfere peso de uma perna para a outra sem cruzar os pés nem projetar o tronco para fora da sua base.'
      },
      {
        title: 'Estudo conceitual seguro',
        content: 'Este conhecimento serve para aguçar o olhar analítico do aluno durante os treinos presenciais. Não se deve tentar replicar projeções sozinho em pisos duros ou ambientes caseiros.'
      }
    ],
    summaryPoints: [
      'Rebaixar o centro de gravidade com joelhos semiflexionados melhora a estabilidade.',
      'A base de apoio deve ser firme e elástica, permitindo movimentação rápida.',
      'A biomecânica deve ser compreendida na teoria e aprimorada sob supervisão no dojo.'
    ],
    onTatame: 'Mantenha a postura ereta (Shisei), os ombros relaxados e os pés deslizando suavemente no tatame sem bater os calcanhares nem cruzar as pernas.',
    inLife: 'Consciência postural e distribuição equilibrada de peso protegem a coluna ao levantar pesos, caminhar ou passar longas horas sentado diante do computador.',
    japaneseWord: {
      romaji: 'Shisei',
      kanji: '姿勢',
      pronunciation: 'Shi-ssêi',
      definition: 'Postura corporal equilibrada, ereta e natural (Shizentai), base da estabilidade marcial.'
    },
    reflectionScenario: {
      question: 'Ao se deslocar no tatame, um judoca dá passos muito largos e inclina o tronco para a frente, saindo da sua base de apoio. O que acontece com ele?',
      options: [
        'Ele fica mais rápido e protegido contra golpes.',
        'Ele perde o equilíbrio e fica extremamente vulnerável a qualquer desequilíbrio (kuzushi).',
        'Ele aumenta sua força de pegada.',
        'Sua postura torna-se perfeita para o Judô.'
      ],
      correctOptionIndex: 1,
      explanation: 'Inclinar o tronco para fora do polígono de sustentação desloca o centro de gravidade, tornando fácil para o parceiro aplicar uma projeção.'
    },
    quizQuestionIds: ['QZ_TH_006_1', 'QZ_TH_006_2', 'QZ_TH_006_3'],
    flashcardIds: ['FC_TH_006_1', 'FC_TH_006_2', 'FC_TH_006_3'],
    referenceIds: ['REF-KOD-001', 'REF-IJF-002', 'REF-IJF-003'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige tatame adequado e supervisão de professor.'
  },

  // =========================================================================
  // TRILHA 5: SEGURANÇA, SAÚDE E LONGEVIDADE
  // =========================================================================
  {
    id: 'TH_SEG_001',
    slug: 'dor-fadiga-limites-decisao-parar',
    trackNumber: 5,
    trackSlug: 'seguranca-saude-e-longevidade',
    trackTitle: 'Segurança, Saúde e Longevidade',
    lessonNumber: 23,
    title: 'Dor, fadiga, limites e decisão de parar',
    subtitle: 'Aprenda a reconhecer sinais do corpo em que a prudência e a segurança devem falar mais alto.',
    estimatedTimeMinutes: 6,
    recommendedAge: '12 a 99 anos',
    recommendedLevel: 'Todos os níveis',
    learningObjectives: [
      'Diferenciar cansaço muscular normal de sinais graves de alerta e dor lesiva.',
      'Compreender que respeitar os próprios limites é prova de maturidade e inteligência.',
      'Saber quando interromper uma atividade e buscar orientação médica profissional.'
    ],
    introduction: 'O Judô estimula superação e persistência, mas esses valores nunca devem ser confundidos com imprudência. Reconhecer sinais como dor aguda, tonturas, palpitações ou exaustão extrema é fundamental para preservar o corpo e garantir décadas de prática contínua e saudável no tatame.',
    sections: [
      {
        title: 'Cansaço saudável versus dor de alarme',
        content: 'A fadiga muscular transitória ao fim de um treino é uma resposta natural ao esforço. Por outro lado, pontadas agudas nas articulações, estalos acompanhados de dor, dormência nos membros ou tontura são alertas vermelhos que exigem parada imediata.'
      },
      {
        title: 'Parar não é covardia, é responsabilidade',
        content: 'O mito de que o atleta "nunca deve parar" causa lesões crônicas evitáveis. Comunicar ao professor que precisa de uma pausa para respirar ou tratar um incômodo protege você e seu parceiro.'
      },
      {
        title: 'Atenção aos colegas ao seu redor',
        content: 'Se durante um treino você perceber que seu parceiro está pálido, com dificuldade respiratória anormal ou desorientado, interrompa imediatamente a atividade e chame o professor.'
      },
      {
        title: 'Educação sem prescrição médica',
        content: 'As diretrizes do aplicativo têm caráter estritamente educativo. Em qualquer ocorrência de trauma, dor persistente ou problema de saúde, a consulta presencial com médicos e fisioterapeutas é indispensável.'
      }
    ],
    summaryPoints: [
      'A preservação da integridade física está sempre acima do desempenho imediato.',
      'Sinais como tontura, dor aguda e falta de ar exigem interrupção e aviso ao professor.',
      'Descanso e recuperação fazem parte do treinamento sério do judoca.'
    ],
    onTatame: 'Avise o professor antes do início da aula se estiver retornando de lesão ou se tiver qualquer restrição física diagnosticada por médico.',
    inLife: 'Aprenda a escutar os limites do seu corpo e da sua mente no trabalho e nos estudos, evitando estresse excessivo e esgotamento.',
    japaneseWord: {
      romaji: 'Yasume',
      kanji: '休め',
      pronunciation: 'Iá-ssu-mê',
      definition: 'Comando de descanso ou relaxamento. Lembrete de que a recuperação é pilar da longevidade.'
    },
    reflectionScenario: {
      question: 'Durante um treino intenso de randori, você sente uma tontura forte e perda momentânea de equilíbrio. Qual a decisão mais correta?',
      options: [
        'Continuar lutando para não demonstrar fraqueza perante os colegas.',
        'Tentar compensar a tontura usando força máxima no adversário.',
        'Interromper a luta na hora, sentar-se em local arejado e avisar o sensei.',
        'Tomar remédio por conta própria sem saber a causa.'
      ],
      correctOptionIndex: 2,
      explanation: 'Tontura e perda de equilíbrio são sinais claros de que o corpo precisa de pausa e avaliação. A segurança é inegociável.'
    },
    quizQuestionIds: ['QZ_TH_007_1', 'QZ_TH_007_2', 'QZ_TH_007_3'],
    flashcardIds: ['FC_TH_007_1', 'FC_TH_007_2', 'FC_TH_007_3'],
    referenceIds: ['REF-IJF-001', 'REF-IJF-003', 'REF-LGPD-001'],
    author: 'Equipe Editorial Dojo Digital',
    technicalReviewer: 'Sensei Curador de Acervo',
    safetyReviewer: 'Comissão de Salvaguarda Pedagógica',
    creationDate: '2026-03-01',
    lastRevisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '1.0',
    editorialStatus: 'publicado',
    safetyWarning: 'Este conteúdo é educativo e complementar. A prática de Judô exige avaliação médica e supervisão presencial em dojo adequado.'
  }
];

export const getTheoryLessonBySlug = (slug: string): TheoryLesson | undefined => {
  return theoryLessons.find(l => l.slug === slug);
};

export const getTheoryLessonsByTrackSlug = (trackSlug: string): TheoryLesson[] => {
  return theoryLessons.filter(l => l.trackSlug === trackSlug);
};
