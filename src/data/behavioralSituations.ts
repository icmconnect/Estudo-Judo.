export interface BehavioralSituation {
  id: string;
  title: string;
  theme: 'Segurança' | 'Respeito' | 'Jita Kyoei' | 'Autocontrole' | 'Inclusão' | 'Conduta';
  prompt: string;
  dilemma: string;
  correctChoiceIndex: number;
  choices: {
    text: string;
    feedback: string;
  }[];
  moralPrinciple: string;
}

export const BEHAVIORAL_SITUATIONS: BehavioralSituation[] = [
  {
    id: 'sit-1',
    title: 'Parceiro Mais Leve ou Menos Graduado',
    theme: 'Jita Kyoei',
    prompt: 'No Randori livre, o Sensei pede para você treinar com um colega faixa-branca 15 kg mais leve que você.',
    dilemma: 'Como conduzir esse treino mantendo a segurança e o espírito do Judô?',
    correctChoiceIndex: 1,
    choices: [
      {
        text: 'Usar toda a sua força e peso corporal para projetá-lo o mais rápido possível e mostrar sua superioridade.',
        feedback: 'Inadequado. Usar força desproporcional contra parceiros mais leves gera risco de lesão grave e viola a essência do Jita Kyoei.'
      },
      {
        text: 'Ajustar a intensidade, treinar a precisão da pegada (Kumikata) e do desequilíbrio (Kuzushi), permitindo também que o colega tente suas técnicas com segurança.',
        feedback: 'Excelente! O treino cooperativo permite que o judoca mais graduado refine o timing e a técnica sutil, enquanto protege e ensina o parceiro mais novo.'
      },
      {
        text: 'Recusar o treino e pedir para trocar por alguém do seu peso ou faixa mais alta.',
        feedback: 'Incorreto. Todo judoca deve ser capaz de treinar com qualquer colega com respeito e adaptação técnica.'
      }
    ],
    moralPrinciple: 'Jita Kyoei (Prosperidade Mútua) e Modéstia (Kenson).'
  },
  {
    id: 'sit-2',
    title: 'Sentiu Dor ou Suspeita de Lesão Durante a Prática',
    theme: 'Segurança',
    prompt: 'Durante uma projeção, você caiu em falso e sentiu uma pontada no ombro ou tornozelo.',
    dilemma: 'Qual deve ser sua atitude imediata?',
    correctChoiceIndex: 0,
    choices: [
      {
        text: 'Sinalizar imediatamente ao parceiro com a saudação de pausa, sentar-se e comunicar ao Sensei para avaliação responsável.',
        feedback: 'Correto! Proteger a saúde e integridade física é prioridade absoluta. Ignorar uma dor pode transformar um desconforto leve em lesão cirúrgica.'
      },
      {
        text: 'Esconder a dor para não parecer fraco diante da turma e continuar lutando com o mesmo vigor.',
        feedback: 'Perigoso e imprudente! O falso orgulho coloca em risco sua permanência no esporte e a segurança do próprio parceiro.'
      },
      {
        text: 'Ficar em pé reclamando e culpando o colega por ter aplicado o golpe com força.',
        feedback: 'Incorreto. A prática do Judô envolve quedas naturais; o foco deve ser a preservação da saúde e o diálogo sereno com o Sensei.'
      }
    ],
    moralPrinciple: 'Autoproteção, Responsabilidade e Respeito à Saúde.'
  },
  {
    id: 'sit-3',
    title: 'O Árbitro Anunciou "Matte" Durante o Combate',
    theme: 'Conduta',
    prompt: 'Em uma luta disputada, você está prestes a encaixar uma chave no solo quando o árbitro grita "Matte!"',
    dilemma: 'Qual é a ação obrigatória a tomar?',
    correctChoiceIndex: 1,
    choices: [
      {
        text: 'Apertar mais 2 segundos na esperança de o oponente bater antes de o árbitro separar.',
        feedback: 'Grave infração ética e disciplinar passível de Hansoku-make por desobediência e risco à integridade do colega.'
      },
      {
        text: 'Interromper a pressão no exato milissegundo do comando verbal, soltar a pegada e retornar calmamente à linha de posição de início.',
        feedback: 'Perfeito! O comando de Matte é soberano e incondicional para garantir a segurança dos atletas no tatame.'
      },
      {
        text: 'Gesticular para o árbitro reclamando que a posição já estava quase finalizada.',
        feedback: 'Inadequado. O Judô preza pela serenidade e aceitação com respeito às decisões da arbitragem.'
      }
    ],
    moralPrinciple: 'Disciplina (Reigi), Autocontrole (Gaman) e Respeito (Sonkei).'
  },
  {
    id: 'sit-4',
    title: 'Vitória em Competição ou no Dojô',
    theme: 'Respeito',
    prompt: 'Você acaba de vencer uma luta importante por Ippon perfeito após meses de dedicação.',
    dilemma: 'Como demonstrar o verdadeiro espírito do Judoca após a vitória?',
    correctChoiceIndex: 0,
    choices: [
      {
        text: 'Ajeitar o judogi em silêncio, curvar-se em saudação sincera ao adversário (Rei), agradecer aos árbitros e aos senseis com humildade.',
        feedback: 'Perfeito! No Judô, a vitória sobre o oponente é secundária diante da vitória sobre si mesmo. A modéstia enaltece o vencedor.'
      },
      {
        text: 'Sair correndo pelo tatame gritando, subindo nas placas e provocando a torcida adversária.',
        feedback: 'Comportamento terminantemente condenado pelo Código de Ética da CBJ, FIJ e Kodokan, podendo anular o resultado por conduta antidesportiva.'
      },
      {
        text: 'Ignorar a saudação final e ir direto para o celular gravar vídeos de comemoração.',
        feedback: 'Inaceitável. Sem o Rei final, a prática marcial é desrespeitada.'
      }
    ],
    moralPrinciple: 'Modéstia (Kenson), Honra (Meiyo) e Gratidão (Kansha).'
  },
  {
    id: 'sit-5',
    title: 'Inclusão e Empatia no Tatame',
    theme: 'Inclusão',
    prompt: 'Um aluno novo tímido ou com dificuldades motoras/adaptações chega ao dojo e ninguém se voluntaria para fazer dupla com ele.',
    dilemma: 'Como aplicar os ensinamentos de Jigoro Kano nessa situação?',
    correctChoiceIndex: 1,
    choices: [
      {
        text: 'Fingir que não viu e continuar treinando apenas com seus amigos mais experientes.',
        feedback: 'Contraria o ideal de inclusão e fraternidade do Judô.'
      },
      {
        text: 'Aproximar-se com um sorriso acolhedor, fazer a saudação (Rei), apresentar-se e convidá-lo com entusiasmo para treinar os fundamentos juntos.',
        feedback: 'Magnífico! Essa é a manifestação mais pura de Jita Kyoei. O dojo é uma grande família que acolhe a todos com igual dignidade.'
      },
      {
        text: 'Dizer ao Sensei que o aluno não está pronto para a turma principal.',
        feedback: 'Inadequado. O papel de orientar e adaptar pertence ao professor, cabendo aos colegas acolher e apoiar.'
      }
    ],
    moralPrinciple: 'Amizade (Yujo), Cortesia (Reigi) e Jita Kyoei.'
  }
];
