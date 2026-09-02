import { DetailedBiomechanicalSheet } from '../types';

export const STANDARD_SAFETY_TEXT =
  'A técnica deve parar imediatamente se o parceiro bater no tatame, em si mesmo ou no parceiro, comunicar verbalmente que deseja parar (sinal de desistência / Maitta), demonstrar dor, dificuldade para respirar, mal-estar ou se houver intervenção do professor. A segurança e a integridade física prevalecem sobre qualquer contagem, competição ou execução da técnica.';

export const SENSITIVE_CONTENT_REGULATORY_DISCLAIMER =
  'Consulte sempre o regulamento vigente da sua federação, categoria, evento e as orientações diretas do seu sensei presencial. Regra sujeita a atualização conforme diretrizes da CBJ / IJF.';

export const DETAILED_TECHNIQUES: Record<string, DetailedBiomechanicalSheet> = {
  // 1. O-Soto-Gari (Ashi-waza)
  'AS_004': {
    technicalObjective: 'Projetar o oponente para trás com grande amplitude através de uma varredura potente na parte posterior da coxa/panturrilha.',
    contextAndDistance: 'Distância média-curta (Ai-yotsu ou Kenka-yotsu). Ocorre geralmente quando o Uke recua o peso nos calcanhares ou durante o avanço do Tori.',
    kuzushi: 'Etapa 1 (Kuzushi): Desequilíbrio vigoroso para trás e para a diagonal direita do Uke (Migi-ushiro-sumi-kuzushi), tracionando a manga para baixo e empurrando a gola com o antebraço colado ao peito.',
    tsukuri: 'Etapa 2 (Tsukuri): Tori avança o pé esquerdo paralelamente ao pé direito do Uke, colando peito com peito e transferindo todo o centro de massa para o pé de apoio.',
    kake: 'Etapa 3 (Kake): Tori projeta a perna direita estendida para a frente e executa uma foice contínua para trás na coxa do Uke, inclinando o tronco ligeiramente para a frente sem dobrar a coluna.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter a pegada firme na manga esquerda do Uke para orientar a queda amortecida, finalizando em pé com equilíbrio estável (Shisei) sem desabar sobre o tronco do parceiro.',
    ukemiAndSafety: `Ukemi & Salvaguarda: Uke executa Ushiro-ukemi com o queixo rigidamente colado ao peito para proteger a nuca. ${STANDARD_SAFETY_TEXT}`,
    commonMistakes: [
      'Tentativa de derrubar apenas com a foice de perna sem quebra prévia do equilíbrio',
      'Falta de contato peito com peito no Tsukuri (ficar muito distante)',
      'Dobrar o joelho da perna que varre em vez de manter a alavanca estendida',
      'Cair com o peso inteiro sobre a caixa torácica do parceiro'
    ],
    prerequisites: [
      'Domínio completo do Ushiro-Ukemi (queda para trás)',
      'Postura natural Migi-shizentai e avanço fluido com Tsugi-ashi',
      'Kumikata fundamental de gola e manga'
    ],
    relatedTechniques: ['O-soto-guruma', 'O-soto-otoshi', 'Harai-goshi (combinação)'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    variations: ['O-soto-otoshi (varredura pelo calcanhar)', 'O-soto-gaeshi (contra-ataque)'],
    reviewChecklist: [
      'Quebra de equilíbrio na diagonal traseira executada?',
      'Contato peito com peito mantido durante a entrada?',
      'Pé de apoio apontado para a direção da projeção?',
      'Manga tracionada para garantir a queda segura do Uke?'
    ],
    flashcards: [
      {
        id: 'fc-as004-1',
        question: 'Qual é o principal foco do Kuzushi no O-soto-gari?',
        answer: 'Desequilibrar o Uke para trás e para a diagonal direita (Migi-ushiro-sumi-kuzushi), colando o peito e puxando a manga.',
        hint: 'Para qual direção o Uke deve perder o equilíbrio?'
      },
      {
        id: 'fc-as004-2',
        question: 'O que o Uke deve fazer para se proteger durante a queda?',
        answer: 'Executar Ushiro-ukemi colando o queixo no peito e batendo os braços no tatame no ângulo de 45 graus.',
        hint: 'Como proteger a nuca?'
      }
    ],
    quizQuestions: [
      {
        id: 'qz-as004-1',
        question: 'No O-Soto-Gari, qual erro é mais comum na fase de Tsukuri?',
        options: [
          'Entrar colado ao peito do Uke',
          'Ficar distante do Uke sem contato do tronco e sem puxar a gola',
          'Flexionar ligeiramente o joelho do pé de apoio',
          'Manter a pegada firme na manga'
        ],
        correctIndex: 1,
        explanation: 'Se Tori não colar o peito no Uke durante o Tsukuri, a alavanca é perdida e a técnica falha ou gera risco de lesão.'
      }
    ],
    editorialSources: ['src-kodokan-100', 'src-cbj-exames', 'src-dojo-internal'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 2. De-Ashi-Harai (Ashi-waza)
  'AS_001': {
    technicalObjective: 'Varrer o pé avançado do oponente no exato instante em que o calcanhar toca ou está prestes a tocar o tatame.',
    contextAndDistance: 'Distância média. Aplicado no tempo de passada do Uke (deslocamento Ayumi-ashi ou Tsugi-ashi).',
    kuzushi: 'Etapa 1 (Kuzushi): Desequilíbrio lateral-diagonal (Migi-mae-sumi) sincronizado com o passo do Uke, flutuando o peso da perna que avança.',
    tsukuri: 'Etapa 2 (Tsukuri): Tori desloca o corpo lateralmente e posiciona a sola côncava do pé esquerdo na lateral externa do tornozelo do Uke.',
    kake: 'Etapa 3 (Kake): Ação rápida e contínua de varrer o tornozelo rente ao solo enquanto os braços executam um movimento circular semelhante a girar um volante.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Sustentar levemente a manga do Uke para suavizar o impacto e manter base firme em Shisei.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Uke executa Yoko-ukemi (queda lateral). Tori NUNCA deve chutar a canela do Uke, apenas varrer a lateral externa do pé.',
    commonMistakes: [
      'Chutar a canela do colega em vez de varrer com a sola do pé',
      'Varrer fora do tempo motor (quando o pé do Uke já está com 100% do peso firme no chão)',
      'Não usar os braços para conduzir a rotação do corpo'
    ],
    prerequisites: ['Yoko-ukemi (queda lateral)', 'Shintai (deslocamento fluido)', 'Kumikata leve'],
    relatedTechniques: ['Okuri-ashi-harai', 'Harai-tsurikomi-ashi', 'Hiza-guruma'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    variations: ['De-ashi-harai recuando', 'De-ashi-harai em deslocamento lateral'],
    reviewChecklist: [
      'O pé do Uke foi varrido no momento de transferência de peso?',
      'A sola do pé do Tori foi usada como uma colher côncava?',
      'Os braços participaram do movimento de volante?'
    ],
    flashcards: [
      {
        id: 'fc-as001-1',
        question: 'Qual é o segredo do timing no De-ashi-harai?',
        answer: 'Varrer o pé no exato milissegundo em que o Uke apoia ou retira o peso da perna avançada.',
        hint: 'Momento de transição de peso.'
      }
    ],
    quizQuestions: [
      {
        id: 'qz-as001-1',
        question: 'Qual superfície do pé o Tori deve usar para varrer no De-Ashi-Harai?',
        options: ['O calcanhar', 'A ponta dos dedos', 'A sola côncava do pé (planta lateral)', 'O peito do pé'],
        correctIndex: 2,
        explanation: 'A sola do pé age como uma colher para varrer o tornozelo sem machucar a canela do parceiro.'
      }
    ],
    editorialSources: ['src-kodokan-100', 'src-dojo-internal'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 3. Hiza-Guruma (Ashi-waza)
  'AS_002': {
    technicalObjective: 'Projetar o oponente em rotação bloqueando a patela/joelho e puxando em círculo.',
    contextAndDistance: 'Distância média. Eficaz quando o Uke avança em linha reta.',
    kuzushi: 'Etapa 1 (Kuzushi): Tracionar a gola e a manga em um arco circular para frente e para cima.',
    tsukuri: 'Etapa 2 (Tsukuri): Apoiar a sola do pé na parte externa do joelho do Uke sem chutar.',
    kake: 'Etapa 3 (Kake): Puxar vigorosamente com os dois braços fazendo o Uke girar sobre a perna bloqueada.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter o tronco ereto e o controle da manga na queda do Uke.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi ou Mae-mawari-ukemi. Proibido travar a articulação com força em tranco.',
    commonMistakes: ['Chutar o joelho do Uke em vez de apenas apoiar a sola como ponto de rotação'],
    prerequisites: ['Mae-mawari-ukemi', 'Kuzushi circular'],
    relatedTechniques: ['Sasae-tsurikomi-ashi', 'Ashi-guruma'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    reviewChecklist: ['Pé posicionado no joelho sem chutar?', 'Puxada circular eficaz?'],
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 4. Sasae-Tsurikomi-Ashi (Ashi-waza)
  'AS_003': {
    technicalObjective: 'Projetar o oponente bloqueando a parte inferior da canela/tornozelo enquanto puxa a gola para cima e para a frente.',
    contextAndDistance: 'Distância média. Puxando o Uke em círculo.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar a gola para cima (Tsurikomi) e a manga em arco.',
    tsukuri: 'Etapa 2 (Tsukuri): Posicionar o pé travando o tornozelo do Uke rente ao tatame.',
    kake: 'Etapa 3 (Kake): Girar o tronco projetando o oponente sobre o tornozelo bloqueado.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter equilíbrio firme na perna de apoio.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi seguro. Respeitar limites mecânicos do tornozelo.',
    commonMistakes: ['Colocar o pé no joelho em vez do tornozelo (confundir com Hiza-guruma)'],
    prerequisites: ['Tsurikomi (ação de pescar a gola)', 'Yoko-ukemi'],
    relatedTechniques: ['Hiza-guruma', 'Harai-tsurikomi-ashi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 5. O-Uchi-Gari (Ashi-waza)
  'AS_005': {
    technicalObjective: 'Projetar o oponente ceifando por dentro a coxa do lado posterior.',
    contextAndDistance: 'Distância curta (corpo a corpo).',
    kuzushi: 'Etapa 1 (Kuzushi): Empurrar o Uke para trás na diagonal esquerda/direita, forçando o peso nos calcanhares.',
    tsukuri: 'Etapa 2 (Tsukuri): Avançar profundamente entre as pernas do Uke.',
    kake: 'Etapa 3 (Kake): Desenhar um arco circular com a perna ceifando a coxa do Uke por dentro.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Acompanhar a queda sem bater a cabeça no chão.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Ushiro-ukemi. Uke deve manter o queixo no peito.',
    commonMistakes: ['Entrar com o quadril longe do Uke', 'Fazer movimento reto em vez de arco em semi-círculo'],
    prerequisites: ['Ushiro-ukemi', 'Entrada em profundidade'],
    relatedTechniques: ['Ko-uchi-gari', 'O-soto-gari (combinação)'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 6. Ko-Uchi-Gari (Ashi-waza)
  'AS_007': {
    technicalObjective: 'Pequena ceifada interna no calcanhar do oponente.',
    contextAndDistance: 'Distância média-curta.',
    kuzushi: 'Etapa 1 (Kuzushi): Desequilíbrio para trás e para baixo.',
    tsukuri: 'Etapa 2 (Tsukuri): Posicionar a sola do pé varrendo o calcanhar interno do Uke.',
    kake: 'Etapa 3 (Kake): Empurrar o peito do Uke enquanto ceifa o calcanhar rente ao tatame.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter o controle superior para Ne-waza.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Ushiro-ukemi suave.',
    commonMistakes: ['Tentar bater no calcanhar com a ponta dos dedos'],
    prerequisites: ['Ushiro-ukemi'],
    relatedTechniques: ['O-uchi-gari', 'Seoi-nage (combinação)'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 7. Uki-Goshi (Koshi-waza - Clássico do Sensei Kano)
  'KO_001': {
    technicalObjective: 'Projetar o oponente com rotação rápida de quadril sem erguer o corpo dele no ar.',
    contextAndDistance: 'Distância curta. Técnica favorita de Jigoro Kano.',
    kuzushi: 'Etapa 1 (Kuzushi): Tração para frente e lateral, colando o Uke no flanco.',
    tsukuri: 'Etapa 2 (Tsukuri): Envolver a cintura do Uke com o braço enquanto gira o quadril metade do caminho (45-90°).',
    kake: 'Etapa 3 (Kake): Giro de tronco arremessando o Uke de lado sem suspender.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Base ereta e olhar fixo no parceiro.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi.',
    commonMistakes: ['Tentar erguer o Uke nas costas em vez de apenas girar o quadril em contato'],
    prerequisites: ['Yoko-ukemi', 'Tai-sabaki parcial'],
    relatedTechniques: ['O-goshi', 'Harai-goshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 8. O-Goshi (Koshi-waza)
  'KO_002': {
    technicalObjective: 'Grande projeção carregando o oponente sobre o quadril flexionando os joelhos.',
    contextAndDistance: 'Distância curta.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar o Uke para frente elevando o centro de massa dele.',
    tsukuri: 'Etapa 2 (Tsukuri): Abaixar o quadril abaixo da faixa do Uke e abraçar as costas dele.',
    kake: 'Etapa 3 (Kake): Estender as pernas e girar o tronco projetando por cima do quadril.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter a pegada de manga para controlar a queda.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi ou Mae-mawari-ukemi.',
    commonMistakes: ['Entrar com as pernas esticadas sem abaixar o centro de gravidade'],
    prerequisites: ['Yoko-ukemi', 'Agachamento com base firme'],
    relatedTechniques: ['Uki-goshi', 'Koshi-guruma'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 9. Koshi-Guruma (Koshi-waza)
  'KO_003': {
    technicalObjective: 'Roda de quadril envolvendo a cabeça/pescoço do oponente.',
    contextAndDistance: 'Distância curta.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar o Uke para a frente.',
    tsukuri: 'Etapa 2 (Tsukuri): Envolver o pescoço do Uke com o braço e encaixar o quadril.',
    kake: 'Etapa 3 (Kake): Girar o tronco arremessando o Uke em roda.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Soltar o pescoço assim que o Uke inicia a queda para evitar lesão cervical.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: NUNCA pressionar a cervical do Uke durante o arremesso.',
    commonMistakes: ['Puxar a cabeça do Uke para baixo em tranco'],
    prerequisites: ['O-goshi', 'Segurança cervical'],
    relatedTechniques: ['O-goshi', 'Kubi-nage'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 10. Tsurikomi-Goshi (Koshi-waza)
  'KO_004': {
    technicalObjective: 'Projeção de quadril suspensa puxando a gola alta.',
    contextAndDistance: 'Distância média.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar a gola para cima e para frente elevando o Uke.',
    tsukuri: 'Etapa 2 (Tsukuri): Abaixar profundamente o quadril com joelhos flexionados.',
    kake: 'Etapa 3 (Kake): Projeção sobre o quadril baixíssimo.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Estabilidade pós-arremesso.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Mae-mawari-ukemi.',
    commonMistakes: ['Não elevar a gola com o braço em alavanca'],
    prerequisites: ['O-goshi'],
    relatedTechniques: ['Sode-tsurikomi-goshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 11. Harai-Goshi (Koshi-waza)
  'KO_006': {
    technicalObjective: 'Varredura de quadril com a perna apoiada na coxa do Uke.',
    contextAndDistance: 'Distância média-curta.',
    kuzushi: 'Etapa 1 (Kuzushi): Desequilibrar o Uke para a frente e direita.',
    tsukuri: 'Etapa 2 (Tsukuri): Encaixar o quadril e posicionar a perna na coxa externa do Uke.',
    kake: 'Etapa 3 (Kake): Varrer a coxa e girar o tronco em um movimento poderoso.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter a manga para amortecer a queda do parceiro.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi com amplitude.',
    commonMistakes: ['Tentar varrer com a perna sem ter o quadril em contato com o Uke'],
    prerequisites: ['O-goshi', 'Yoko-ukemi'],
    relatedTechniques: ['Hane-goshi', 'Uchi-mata'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 12. Seoi-Nage (Te-waza)
  'TE_001': {
    technicalObjective: 'Projetar o oponente por cima do próprio ombro/costas com duas mãos na pegada.',
    contextAndDistance: 'Distância média.',
    kuzushi: 'Etapa 1 (Kuzushi): Desequilíbrio para frente (Mae-kuzushi) elevando os braços do Uke.',
    tsukuri: 'Etapa 2 (Tsukuri): Giro de 180° com Tai-sabaki, flexionando joelhos abaixo da faixa do Uke.',
    kake: 'Etapa 3 (Kake): Extensão de pernas e rotação do tronco projetando por cima do ombro.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter tração da manga.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Mae-mawari-ukemi. Não soltar a manga.',
    commonMistakes: ['Entrar com pernas esticadas', 'Não agachar o suficiente'],
    prerequisites: ['Mae-mawari-ukemi', 'Tai-sabaki 180°'],
    relatedTechniques: ['Ippon-seoi-nage', 'Seoi-otoshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 13. Ippon-Seoi-Nage (Te-waza)
  'TE_002': {
    technicalObjective: 'Projetar prendendo o braço do oponente na dobra do cotovelo/bíceps.',
    contextAndDistance: 'Distância média.',
    kuzushi: 'Etapa 1 (Kuzushi): Erguer o braço do Uke para a frente.',
    tsukuri: 'Etapa 2 (Tsukuri): Encaixar o braço sob a axila do Uke e girar sob o centro de gravidade.',
    kake: 'Etapa 3 (Kake): Extensão explosiva das pernas e rotação de ombro.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Controle seguro pós-queda.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Mae-mawari-ukemi.',
    commonMistakes: ['Deixar espaço entre o ombro e a axila do oponente'],
    prerequisites: ['Mae-mawari-ukemi'],
    relatedTechniques: ['Seoi-nage'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 14. Tai-Otoshi (Te-waza)
  'TE_004': {
    technicalObjective: 'Queda do corpo estendendo a perna de bloqueio na frente das pernas do Uke.',
    contextAndDistance: 'Distância média-longa.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar fortemente em arco para frente.',
    tsukuri: 'Etapa 2 (Tsukuri): Girar o corpo e estender a perna direita no chão bloqueando as canelas do Uke.',
    kake: 'Etapa 3 (Kake): Tração forte dos braços fazendo o Uke capotar por cima da perna estendida.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter equilíbrio na perna de apoio sem tocar o joelho no chão.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi. NUNCA dobrar o joelho da perna estendida para trás.',
    commonMistakes: ['Tocar o joelho estendido no tatame', 'Não tracionar a manga em rotação'],
    prerequisites: ['Yoko-ukemi'],
    relatedTechniques: ['Seoi-nage', 'Harai-goshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 15. Kata-Guruma (Te-waza - Versão Adaptada sem pegada nas pernas)
  'TE_005': {
    technicalObjective: 'Roda nos ombros (adaptado para regras modernas IJF/CBJ).',
    contextAndDistance: 'Distância média.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxada baixa para a frente.',
    tsukuri: 'Etapa 2 (Tsukuri): Agachar profundamente sob o centro de gravidade sem agarrar as pernas.',
    kake: 'Etapa 3 (Kake): Elevação de tronco em rotação arremessando o Uke de lado.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Postura ereta.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Yoko-ukemi amplo.',
    commonMistakes: ['Tentar agarrar a perna do Uke (falta de conformidade com regras atuais)'],
    prerequisites: ['Mae-mawari-ukemi'],
    relatedTechniques: ['Uki-otoshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Avançado (Laranja/Verde)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100', 'src-ijf-rules'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 16. Tomoe-Nage (Ma-sutemi-waza)
  'SU_001': {
    technicalObjective: 'Projetar em círculo frontal sacrificando a própria postura ereta.',
    contextAndDistance: 'Distância média. Eficaz quando o Uke empurra com força.',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar o Uke para frente forçando ele a projetar o tronco.',
    tsukuri: 'Etapa 2 (Tsukuri): Sentar próximo ao calcanhar e apoiar a planta do pé na virilha do Uke.',
    kake: 'Etapa 3 (Kake): Rolar de costas estendendo a perna para arremessar o Uke por cima da cabeça.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Rolar para montar ou subir em base.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Mae-mawari-ukemi (rolamento por cima).',
    commonMistakes: ['Chutar com a perna antes de sentar e apoiar o pé na virilha'],
    prerequisites: ['Mae-mawari-ukemi impecável', 'Consciência de rolar de costas'],
    relatedTechniques: ['Yoko-tomoe-nage', 'Sumi-gaeshi'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 17. Tani-Otoshi (Yoko-sutemi-waza)
  'SU_007': {
    technicalObjective: 'Derrubo no vale por trás deslizando a perna na lateral posterior.',
    contextAndDistance: 'Distância curta (contra-ataque).',
    kuzushi: 'Etapa 1 (Kuzushi): Puxar o Uke para trás na diagonal.',
    tsukuri: 'Etapa 2 (Tsukuri): Posicionar-se atrás do Uke e estender a perna no tatame.',
    kake: 'Etapa 3 (Kake): Sentar de lado puxando o Uke para o solo.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Manter controle de Ne-waza.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: NUNCA cair sobre o joelho posterior do Uke. Risco grave de ligamento se mal executado.',
    commonMistakes: ['Atirar o corpo sobre a articulação do joelho do parceiro'],
    prerequisites: ['Yoko-ukemi', 'Consciência de salvaguarda em contra-ataques'],
    relatedTechniques: ['Ko-soto-gake', 'Ura-nage'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Intermediário (Azul/Amarela)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 18. Hon-Kesa-Gatame (Ne-waza / Osaekomi-waza)
  'OS_001': {
    technicalObjective: 'Imobilização lateral principal mantendo controle torácico e de pescoço.',
    contextAndDistance: 'Solo (Ne-waza). Tori ao lado das costelas do Uke.',
    kuzushi: 'Etapa 1 (Kuzushi): Bloquear a mobilidade dos ombros do Uke.',
    tsukuri: 'Etapa 2 (Tsukuri): Envolver o pescoço com o braço e prender o braço do Uke sob a axila.',
    kake: 'Etapa 3 (Kake): Abrir pernas em tesoura no tatame e pressionar o peito.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Ajustar o centro de gravidade conforme as tentativas de fuga (Ebi).',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Sinal de desistência: bater duas vezes no parceiro ou tatame caso sinta sufocamento.',
    commonMistakes: ['Erguer a cabeça facilitando a ponte de fuga do Uke'],
    prerequisites: ['Fuga de quadril (Ebi)', 'Sinal de desistência'],
    relatedTechniques: ['Kuzure-kesa-gatame', 'Kata-gatame'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 19. Kami-Shiho-Gatame (Ne-waza / Osaekomi-waza)
  'OS_009': {
    technicalObjective: 'Imobilização por cima dos quatro cantos (posição Norte-Sul).',
    contextAndDistance: 'Solo (Ne-waza). Tori posicionado sobre a cabeça do Uke.',
    kuzushi: 'Etapa 1 (Kuzushi): Imobilizar os dois ombros do Uke.',
    tsukuri: 'Etapa 2 (Tsukuri): Passar os braços sob os ombros e agarrar a faixa de ambos os lados.',
    kake: 'Etapa 3 (Kake): Abaixar o quadril colando o peito na cabeça/peito do Uke.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): Bloquear giros de quadril.',
    ukemiAndSafety: 'Ukemi & Salvaguarda: Sinal de desistência claro se houver compressão excessiva.',
    commonMistakes: ['Deixar o quadril alto'],
    prerequisites: ['Sinal de desistência'],
    relatedTechniques: ['Kuzure-kami-shiho-gatame'],
    isSensitiveOrAdvanced: false,
    pedagogicalLevel: 'Iniciante (Branca/Cinza)',
    recommendedAge: 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100'],
    status: 'publicado',
    revisionDate: '2026-03-01'
  },

  // 20. Ude-Hishigi-Juji-Gatame (Kansetsu-waza - Chave de Braço com Restrição Etária)
  'KA_001': {
    technicalObjective: 'Chave de braço em cruz hiperextendendo a articulação do cotovelo com controle do quadril.',
    contextAndDistance: 'Solo (Ne-waza). Tori perpendicular ao Uke.',
    kuzushi: 'Etapa 1 (Kuzushi): Isolar o braço e prender o tronco do Uke.',
    tsukuri: 'Etapa 2 (Tsukuri): Passar as pernas sobre a cabeça e peito do Uke fechando os joelhos.',
    kake: 'Etapa 3 (Kake): Segurar o punho com o polegar para cima e elevar a bacia com extrema suavidade.',
    continuityZanshin: 'Continuidade, postura e atenção após a ação (Zanshin): SOLTAR IMEDIATAMENTE ao menor sinal de toque ou desistência.',
    ukemiAndSafety: `ORIENTAÇÕES DE SEGURANÇA E QUADRO REGULATÓRIO:
a) Recomendação pedagógica do Dojo Digital: Estudo técnico em acervo recomendado para praticantes a partir dos 15 anos ou faixa verde.
b) Regras de competição esportiva: Em torneios oficiais da CBJ e IJF, o uso de Kansetsu-waza é restrito por categoria de idade.
c) Decisão do Sensei presencial: A liberação prática no tatame depende exclusivamente do professor responsável pelo Dojo.
d) Regulamento de entidade: Diretriz de Arbitragem da Confederação Brasileira de Judô (CBJ) e IJF.
${STANDARD_SAFETY_TEXT}`,
    commonMistakes: ['Dar tranco no cotovelo', 'Deixar joelhos abertos', 'Girar o polegar do parceiro para o lado errado'],
    prerequisites: ['Recomendação etária do Dojo', 'Domínio de segurança no solo', 'Supervisão direta do Sensei'],
    relatedTechniques: ['Ude-garami', 'Waki-gatame'],
    isSensitiveOrAdvanced: true,
    pedagogicalLevel: 'Avançado (Laranja/Verde)',
    recommendedAge: 'Recomendação Pedagógica: 15+ anos (Consulte o regulamento da sua federação)',
    editorialSources: ['src-kodokan-100', 'src-cbj-exames', 'src-ijf-rules'],
    status: 'publicado',
    regulatoryNotice: SENSITIVE_CONTENT_REGULATORY_DISCLAIMER,
    ruleSubjectToUpdateNotice: 'Regra e diretriz sujeitas a atualização conforme publicação dos boletins oficiais da CBJ e IJF.',
    author: 'Comissão Técnica de Kansetsu-waza',
    technicalReviewer: 'Sensei Revisor Arbitragem CBJ',
    safetyReviewer: 'Comissão de Salvaguarda Médica e Esportiva',
    creationDate: '2026-01-10',
    revisionDate: '2026-03-01',
    nextRevisionDate: '2026-09-01',
    version: '3.0.0-CBJ2026'
  }
};

export function getDetailedSheet(techId: string, defaultName: string, defaultCategory: string): DetailedBiomechanicalSheet {
  if (DETAILED_TECHNIQUES[techId]) {
    return DETAILED_TECHNIQUES[techId];
  }

  const isSensitive = defaultCategory.includes('Shime') || defaultCategory.includes('Kansetsu');

  // Ficha biomecânica e pedagógica padrão
  return {
    technicalObjective: `Dominar e aplicar a técnica ${defaultName} seguindo os princípios de máxima eficiência e cooperação mútua (Seiryoku Zenyo e Jita Kyoei).`,
    contextAndDistance: `Distância de combate do grupo ${defaultCategory}. Aplicável quando o oponente reage à movimentação.`,
    kuzushi: `Etapa 1 (Kuzushi): Quebra de equilíbrio na direção fundamental do Happo-no-Kuzushi correspondente a ${defaultName}.`,
    tsukuri: `Etapa 2 (Tsukuri): Ajuste corporal do Tori com Tai-sabaki ágil para encaixe de alavanca.`,
    kake: `Etapa 3 (Kake): Execução e arremesso contínuo com coordenação de pernas, quadril e braços.`,
    continuityZanshin: `Continuidade, postura e atenção após a ação (Zanshin): Manter postura ereta (Shisei) e olhar no parceiro.`,
    ukemiAndSafety: `Ukemi & Salvaguarda: Praticar estritamente sob supervisão do Sensei. ${STANDARD_SAFETY_TEXT}`,
    commonMistakes: [
      'Executar a técnica sem quebra prévia do equilíbrio (Kuzushi insuficiente)',
      'Perder o contato da pegada durante a fase de projeção',
      'Atirar o corpo descontroladamente sobre o parceiro de treino'
    ],
    prerequisites: [
      'Domínio completo dos Ukemis fundamentais',
      'Postura natural e movimentação fluida (Shisei e Shintai)',
      'Kumikata padrão'
    ],
    relatedTechniques: ['Técnicas da mesma família do ' + defaultCategory],
    isSensitiveOrAdvanced: isSensitive,
    pedagogicalLevel: isSensitive ? 'Avançado (Laranja/Verde)' : 'Intermediário (Azul/Amarela)',
    recommendedAge: isSensitive ? 'Recomendação Pedagógica: 15+ anos (Consulte a federação)' : 'A partir de 12 anos',
    editorialSources: ['src-kodokan-100', 'src-dojo-internal'],
    status: 'publicado',
    regulatoryNotice: isSensitive ? SENSITIVE_CONTENT_REGULATORY_DISCLAIMER : undefined,
    ruleSubjectToUpdateNotice: isSensitive ? 'Regra e diretriz sujeitas a atualização conforme publicação de boletins oficiais.' : undefined,
    author: 'Equipe Pedagógica Dojo Digital',
    technicalReviewer: 'Sensei Revisor Kodokan/CBJ',
    safetyReviewer: 'Comissão de Salvaguarda no Esporte',
    creationDate: '2026-01-15',
    revisionDate: '2026-03-01',
    version: '3.0.0'
  };
}

