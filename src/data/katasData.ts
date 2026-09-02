import { KataBlock } from '../types';

export const OFFICIAL_KATAS: KataBlock[] = [
  {
    id: 'nage-no-kata-1',
    kataName: 'Nage-no-Kata (Formas de Projeção)',
    seriesName: '1ª Série: Te-waza (Técnicas de Braço)',
    objective: 'Estudar os princípios clássicos de quebra de equilíbrio e projeção utilizando primordialmente a ação dos braços.',
    etiquette: 'Rei formal de entrada a 4 metros de distância em postura natural (Shizen-tai). Tori à direita do Kamiza e Uke à esquerda.',
    videoUrl: 'https://www.youtube.com/embed/5aCkWQZ7d5M',
    steps: [
      {
        stepNumber: 1,
        name: 'Uki-otoshi (Queda Flutuante)',
        japanese: '浮落',
        toriRole: 'Recua três passos em Tsugi-ashi tracionando o Uke para baixo e desferindo a projeção ao ajoelhar o joelho esquerdo.',
        ukeRole: 'Avança com iniciativa ofensiva tentando recuperar o equilíbrio e amortecendo a queda com Mae-mawari-ukemi amplo.',
        keyPoints: ['Tração contínua sem agarrar o corpo do Uke', 'Joelho de Tori toca o tatame sem impacto brusco'],
        commonMistakes: ['Puxar com os cotovelos dobrados em vez de braços estendidos em círculo'],
        safetyNote: 'Uke deve rolar suavemente sem bater a cabeça no solo.'
      },
      {
        stepNumber: 2,
        name: 'Seoi-nage (Projeção por Cima do Ombro)',
        japanese: '背負投',
        toriRole: 'Avança, induz o golpe do Uke por cima (Tegatana) e gira 180° sob o centro de gravidade do Uke.',
        ukeRole: 'Avança com golpe descendente na cabeça e recebe a projeção de ombro com amortecimento completo.',
        keyPoints: ['Encaixe profundo do ombro', 'Flexão de pernas'],
        commonMistakes: ['Não agachar o suficiente no Tsukuri'],
        safetyNote: 'Tori deve sustentar o braço do Uke até a finalização do impacto.'
      },
      {
        stepNumber: 3,
        name: 'Kata-guruma (Roda de Ombros)',
        japanese: '肩車',
        toriRole: 'Avança, mergulha sob a cintura do Uke apoiando-o nos ombros e projeta transversalmente.',
        ukeRole: 'Mantém o corpo arqueado e rígido durante a rotação nos ombros do Tori.',
        keyPoints: ['Entrada profunda rente ao chão', 'Levantamento com força das pernas'],
        commonMistakes: ['Curvar a coluna lombar ao erguer o Uke'],
        safetyNote: 'Projeção de alta amplitude: Uke deve ter domínio de Ukemi avançado.'
      }
    ],
    officialReference: 'Kodokan Judo Kata Textbook (Kodokan Institute, Tóquio)',
    revisionDate: '2026-02-15'
  },
  {
    id: 'nage-no-kata-2',
    kataName: 'Nage-no-Kata (Formas de Projeção)',
    seriesName: '2ª Série: Koshi-waza (Técnicas de Quadril)',
    objective: 'Aprender a utilização da bacia e do centro de gravidade como ponto de apoio e alavanca nas projeções.',
    etiquette: 'Retorno ao centro do tatame com ajuste de judogi e postura Shizen-tai.',
    videoUrl: 'https://www.youtube.com/embed/5aCkWQZ7d5M',
    steps: [
      {
        stepNumber: 1,
        name: 'Uki-goshi (Quadril Flutuante)',
        japanese: '浮腰',
        toriRole: 'Abraça a cintura do Uke com o braço direito e gira o quadril projetando-o em meia-volta.',
        ukeRole: 'Desfere ataque na cabeça e aceita o giro em torno do quadril do Tori.',
        keyPoints: ['Golpe característico e favorito do Sensei Jigoro Kano', 'Giro rápido e econômico'],
        commonMistakes: ['Erguer o Uke com força excessiva em vez de girar'],
        safetyNote: 'Manter a pegada da manga firme para amparar a queda.'
      },
      {
        stepNumber: 2,
        name: 'Harai-goshi (Varredura de Quadril)',
        japanese: '払腰',
        toriRole: 'Envolve as costas do Uke e projeta varrendo a perna direita pela lateral da coxa do Uke.',
        ukeRole: 'Resiste ao movimento circular e é projetado com grande amplitude.',
        keyPoints: ['Contato total peito com peito', 'Varredura ampla de perna'],
        commonMistakes: ['Afastar o quadril no momento do Kake'],
        safetyNote: 'Uke deve manter queixo no peito e braço estendido a 45 graus.'
      },
      {
        stepNumber: 3,
        name: 'Tsurikomi-goshi (Quadril Puxado e Erguido)',
        japanese: '釣込腰',
        toriRole: 'Ergue o braço da lapela em ação de pesca (Tsurikomi) e entra sob a linha da cintura.',
        ukeRole: 'Empurra o Tori para trás e tem o centro de gravidade elevado.',
        keyPoints: ['Punho da gola erguido como se segurasse uma vara de pesca'],
        commonMistakes: ['Deixar o braço da gola baixo'],
        safetyNote: 'Flexão dos joelhos de Tori obrigatória.'
      }
    ],
    officialReference: 'Kodokan Judo Kata Textbook (Kodokan Institute, Tóquio)',
    revisionDate: '2026-02-15'
  },
  {
    id: 'katame-no-kata-1',
    kataName: 'Katame-no-Kata (Formas de Controle no Solo)',
    seriesName: '1ª Série: Osaekomi-waza (Imobilizações)',
    objective: 'Demonstrar os princípios técnicos das 5 imobilizações fundamentais e as respectivas tentativas de escape.',
    etiquette: 'Saudação de joelhos (Zarei) e deslocamento em Shikko (andar de joelhos).',
    videoUrl: 'https://www.youtube.com/embed/O8YQy8p5Vyc',
    steps: [
      {
        stepNumber: 1,
        name: 'Kesa-gatame (Controle em Gravata)',
        japanese: '袈裟固',
        toriRole: 'Aplica a imobilização lateral mantendo controle de cabeça e braço.',
        ukeRole: 'Executa 3 tentativas canônicas de escape: abraçar o pescoço, fazer ponte e puxar o braço.',
        keyPoints: ['Peito colado', 'Base de pernas aberta e firme'],
        commonMistakes: ['Erguer a cabeça e facilitar a ponte do Uke'],
        safetyNote: 'Não realizar pressão que obstrua a respiração do parceiro no treino de Kata.'
      },
      {
        stepNumber: 2,
        name: 'Kata-gatame (Controle de Ombro e Cabeça)',
        japanese: '肩固',
        toriRole: 'Pressiona o próprio ombro do Uke contra a carótida deste, travando as mãos.',
        ukeRole: 'Tenta girar para fora e empurrar o quadril do Tori.',
        keyPoints: ['Travamento hermético com a cabeça de Tori'],
        commonMistakes: ['Deixar espaço entre o pescoço e o braço'],
        safetyNote: 'Ajuste estritamente posicional, sem compressão excessiva.'
      },
      {
        stepNumber: 3,
        name: 'Kami-shiho-gatame (Controle Superior por Quatro Cantos)',
        japanese: '上四方固',
        toriRole: 'Segura as duas faixas por baixo dos ombros e apoia o peito sobre o rosto/peito do Uke.',
        ukeRole: 'Tenta girar em pêndulo para os dois lados.',
        keyPoints: ['Pés vivos e dedos cravados no tatame'],
        commonMistakes: ['Relaxar os pés e perder a estabilidade para frente'],
        safetyNote: 'Garantir que as vias respiratórias do Uke fiquem livres.'
      }
    ],
    officialReference: 'Kodokan Judo Katame-no-Kata Official Guide',
    revisionDate: '2026-02-15'
  }
];
