import { ArbitrageScenario } from '../types';

export const ARBITRAGE_SCENARIOS: ArbitrageScenario[] = [
  {
    id: 'scen-1',
    situationTitle: 'Cenário 1: Projeção com Impacto Parcial e Rolamento',
    description: 'O atleta de branco aplica Seoi-nage no atleta de azul. O atleta de azul cai de lado (90 graus com o tatame) e rola imediatamente para as costas após o impacto, sem parar diretamente de costas inteiras no solo.',
    options: [
      {
        decision: 'Ippon para o atleta Branco',
        isCorrect: false,
        explanation: 'Para Ippon em projeção, é obrigatório haver velocidade, força e impacto nítido predominantemente com as costas inteiras no solo.'
      },
      {
        decision: 'Waza-ari para o atleta Branco',
        isCorrect: true,
        explanation: 'Correto! A queda de lado ou com apenas parte das costas/ombro no solo configura Waza-ari no regulamento oficial da FIJ/CBJ.'
      },
      {
        decision: 'Shido para o atleta Azul por defesa passiva',
        isCorrect: false,
        explanation: 'O atleta azul sofreu uma ação técnica legítima, não cabendo penalidade por esse motivo.'
      },
      {
        decision: 'Matte sem qualquer pontuação',
        isCorrect: false,
        explanation: 'Houve desequilíbrio e queda com controle parcial suficiente para Waza-ari.'
      }
    ],
    officialRuleRef: {
      entity: 'IJF',
      ruleTitle: 'IJF Sport and Refereeing Rules 2024-2028 (Artigo 19 - Critérios de Waza-ari)',
      version: 'Edição Paris 2024 / Ciclo 2028',
      publicationDate: '2024-01-10',
      sourceUrl: 'https://www.ijf.org/rules',
      lastReviewedInApp: '2026-03-01'
    }
  },
  {
    id: 'scen-2',
    situationTitle: 'Cenário 2: Pegada Abaixo da Faixa na Luta em Pé (Tachi-waza)',
    description: 'Durante a disputa de pegada em pé, sem que haja uma ação de contra-ataque iniciada, o atleta de azul estende o braço e segura diretamente a calça do judogi do atleta branco na altura do joelho.',
    options: [
      {
        decision: 'Hansoku-make direto (desclassificação)',
        isCorrect: false,
        explanation: 'Pegadas ilegais abaixo da faixa em pé são penalizadas com Shido, a menos que haja risco à integridade física articular (como chaves de perna proibidas).'
      },
      {
        decision: 'Penalidade de Shido para o atleta Azul',
        isCorrect: true,
        explanation: 'Correto! Agarrar a perna ou calça diretamente na fase de Tachi-waza constitui infração leve (Shido) nas regras atuais da FIJ/CBJ.'
      },
      {
        decision: 'Waza-ari para o atleta Branco',
        isCorrect: false,
        explanation: 'Infrações regulamentares geram penalidades (Shido/Hansoku-make), não atribuem pontuação técnica direta.'
      },
      {
        decision: 'Seguir a luta normalmente (ação permitida)',
        isCorrect: false,
        explanation: 'Pegadas de perna na luta em pé foram banidas do circuito oficial para valorizar o Judô clássico e a postura ereta.'
      }
    ],
    officialRuleRef: {
      entity: 'CBJ',
      ruleTitle: 'Regulamento Geral de Competições e Arbitragem CBJ / FIJ',
      version: 'Atualização 2024/2025',
      publicationDate: '2024-03-01',
      sourceUrl: 'https://cbj.com.br/arbitragem',
      lastReviewedInApp: '2026-03-01'
    }
  },
  {
    id: 'scen-3',
    situationTitle: 'Cenário 3: Imobilização no Solo e Tempo Regulamentar',
    description: 'O judoca aplica Hon-kesa-gatame no solo e o árbitro anuncia "Osaekomi". O cronômetro atinge 12 segundos contínuos e o adversário consegue enroscar as pernas na perna do judoca que imobilizava (árbitro anuncia "Toketa").',
    options: [
      {
        decision: 'Nenhuma pontuação (tempo insuficiente para Ippon)',
        isCorrect: false,
        explanation: 'Com a mudança de regras, o tempo de 10 a 19 segundos confere Waza-ari válido mesmo que ocorra Toketa.'
      },
      {
        decision: 'Waza-ari para o atleta que imobilizou',
        isCorrect: true,
        explanation: 'Correto! Imobilizações mantidas entre 10 e 19 segundos garantem Waza-ari. Se atingissem 20 segundos contínuos, seria Ippon.'
      },
      {
        decision: 'Ippon imediato',
        isCorrect: false,
        explanation: 'Para Ippon no solo, a imobilização precisa atingir 20 segundos completos ininterruptos.'
      },
      {
        decision: 'Dois Shidos para quem estava embaixo por demorar a escapar',
        isCorrect: false,
        explanation: 'Escapar de imobilização é um mérito técnico e não cabe penalidade.'
      }
    ],
    officialRuleRef: {
      entity: 'IJF',
      ruleTitle: 'IJF Refereeing Rules (Artigo 24 - Osaekomi-waza e tempos)',
      version: 'Regras 2024-2028',
      publicationDate: '2024-01-15',
      sourceUrl: 'https://www.ijf.org',
      lastReviewedInApp: '2026-03-01'
    }
  },
  {
    id: 'scen-4',
    situationTitle: 'Cenário 4: Empurrar o Oponente para Fora da Área de Combate',
    description: 'O atleta branco, estando na área central, empurra repetidamente o atleta azul para fora da área amarela do tatame sem tentar nenhuma técnica de projeção própria.',
    options: [
      {
        decision: 'Shido para o atleta Azul por sair da área',
        isCorrect: false,
        explanation: 'Quando o judoca é forçado/empurrado para fora sem ação técnica pelo adversário, a penalidade é atribuída a quem empurrou.'
      },
      {
        decision: 'Shido para o atleta Branco por empurrar para fora (Pushing out)',
        isCorrect: true,
        explanation: 'Correto! Forçar intencionalmente o adversário para fora da área de combate sem executar ataque válido é passível de Shido por conduta antidesportiva/passividade.'
      },
      {
        decision: 'Waza-ari para o atleta Branco',
        isCorrect: false,
        explanation: 'Empurrão não é técnica de Judô e não pontua.'
      },
      {
        decision: 'Matte e recomeço sem qualquer observação',
        isCorrect: false,
        explanation: 'A ação constitui infração explícita prevista no livro de regras.'
      }
    ],
    officialRuleRef: {
      entity: 'CBJ',
      ruleTitle: 'Manual de Arbitragem CBJ - Infrações e Condutas Proibidas',
      version: 'Edição 2024',
      publicationDate: '2024-02-01',
      sourceUrl: 'https://cbj.com.br',
      lastReviewedInApp: '2026-03-01'
    }
  }
];
