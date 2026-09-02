import { Module } from '../types';

import introducao from '../content/introducao.md?raw';
import jigoroKano from '../content/jigoro-kano.md?raw';
import historia from '../content/historia.md?raw';
import fundamentos from '../content/fundamentos.md?raw';
import seguranca from '../content/seguranca.md?raw';
import tecnicas from '../content/tecnicas.md?raw';
import catalogo from '../content/catalogo.md?raw';
import katas from '../content/katas.md?raw';
import arbitragem from '../content/arbitragem.md?raw';

export const modules: Module[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: Apresentação e História',
    chapters: [
      {
        id: 'cap-1',
        title: 'Portal do Judoca: Boas-Vindas & Filosofia do Budo',
        category: 'Apresentação',
        slug: 'introducao',
        content: introducao,
        videoUrl: 'https://www.youtube.com/embed/FWoXF9nQw1U',
        summary: 'Mensagem de abertura oficial, vídeo motivacional com os melhores ippons e os pilares educacionais do Judô.'
      },
      {
        id: 'cap-1-1',
        title: '1.1 Jigoro Kano: O Pai do Judô e Missão Educacional',
        category: 'História',
        slug: 'jigoro-kano',
        content: jigoroKano,
        videoUrl: 'https://www.youtube.com/embed/zkNVxb1RJW8',
        summary: 'Nascimento em 1860, as escolas Tenjin Shin\'yo-ryu e Kito-ryu, a fundação da Kodokan em 1882 e os lemas Seiryoku Zen\'yo e Jita Kyoei.'
      },
      {
        id: 'cap-1-2',
        title: '1.2 História do Judô: Da Defesa Pessoal ao Esporte Olímpico',
        category: 'História',
        slug: 'historia',
        content: historia,
        videoUrl: 'https://www.youtube.com/embed/cWBysMuzgho',
        summary: 'A evolução pedagógica do Ju-jutsu, o desafio policial de Tóquio, Conde Koma no Brasil e o Judô nas Olimpíadas.'
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Filosofia e Fundamentos',
    chapters: [
      {
        id: 'cap-2-1',
        title: '2.1 Princípios, Código Moral e Fundamentos Práticos',
        category: 'Fundamentos',
        slug: 'fundamentos',
        content: fundamentos,
        videoUrl: 'https://www.youtube.com/embed/guJ-HlAKEA8',
        summary: 'O Código Moral das 8 virtudes, saudações Rei-ho, divisão do Dojô, amortecimento de quedas Ukemi e as 5 fases da projeção.'
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Dojo Seguro e Regras de Tatame',
    chapters: [
      {
        id: 'cap-3-0',
        title: '3.1 Dojo Seguro: Regras de Ouro, Higiene & Prevenção',
        category: 'Segurança',
        slug: 'seguranca',
        content: seguranca,
        summary: 'As 10 regras de segurança, sinal de desistência, higiene e adaptações pedagógicas para praticantes de 12 a 99 anos.'
      },
    ],
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Arsenal Técnico e Gokyo (139 Vídeos)',
    chapters: [
      {
        id: 'cap-4-1',
        title: '4.1 Arsenal Técnico: Nage-Waza e Katame-Waza',
        category: 'Nage-waza',
        slug: 'tecnicas-projecao',
        content: tecnicas,
        summary: 'Visão geral das projeções de braço, quadril, perna e sacrifício, além de imobilizações, estrangulamentos e chaves de braço.'
      },
      {
        id: 'cap-4-2',
        title: '4.2 Catálogo Interativo Gokyo (139 Vídeos Kodokan)',
        category: 'Nage-waza',
        slug: 'catalogo-gokyo',
        content: catalogo,
        summary: 'Catálogo de busca refinada e player interno para todos os 139 golpes oficiais da Kodokan.'
      },
    ],
  },
  {
    id: 'mod-5',
    title: 'Módulo 5: Katas e Playlists Complementares',
    chapters: [
      {
        id: 'cap-5-1',
        title: '5.1 Os Katas Oficiais da Kodokan e Playlists',
        category: 'Katas',
        slug: 'katas',
        content: katas,
        summary: 'Nage-no-Kata, Katame-no-Kata, Kime-no-Kata, Goshin-jutsu, Ju-no-Kata e playlists completas de estudo.'
      },
    ],
  },
  {
    id: 'mod-6',
    title: 'Módulo 6: Arbitragem e Competição (CBJ / IJF)',
    chapters: [
      {
        id: 'cap-6-1',
        title: '6.1 Arbitragem Oficial, Pontuações & Regras de Competição',
        category: 'Arbitragem',
        slug: 'arbitragem',
        content: arbitragem,
        summary: 'Comandos do árbitro (Hajime, Matte, Osaekomi), pontuações Ippon e Waza-ari, faltas Shido e categorias de idade CBJ.'
      },
    ],
  },
];

export const allChapters = modules.flatMap((m) => m.chapters);
