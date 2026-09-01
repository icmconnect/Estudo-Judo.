import { Module } from '../types';

import introducao from '../content/introducao.md?raw';
import historia from '../content/historia.md?raw';
import fundamentos from '../content/fundamentos.md?raw';
import tecnicas from '../content/tecnicas.md?raw';
import katas from '../content/katas.md?raw';

export const modules: Module[] = [
  {
    id: 'mod-1',
    title: 'Apresentação e História',
    chapters: [
      {
        id: 'cap-1',
        title: 'Capa e Apresentação',
        slug: 'introducao',
        content: introducao,
      },
      {
        id: 'cap-2',
        title: 'História do Judô',
        slug: 'historia',
        content: historia,
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Prática e Fundamentos',
    chapters: [
      {
        id: 'cap-3',
        title: 'Fundamentos do Judô',
        slug: 'fundamentos',
        content: fundamentos,
      },
      {
        id: 'cap-4',
        title: 'Técnicas de Projeção',
        slug: 'tecnicas-projecao',
        content: tecnicas,
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Aperfeiçoamento',
    chapters: [
      {
        id: 'cap-5',
        title: 'Katas do Judô',
        slug: 'katas',
        content: katas,
      },
    ],
  },
];

export const allChapters = modules.flatMap((m) => m.chapters);
