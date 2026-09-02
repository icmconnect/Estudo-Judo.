import { useState, useCallback } from 'react';
import { DoubtQuestion } from '../types';

const DOUBTS_STORAGE_KEY = 'dojo_digital_doubts_v2';

const INITIAL_DOUBTS: DoubtQuestion[] = [
  {
    id: 'doubt-1',
    studentName: 'Lucas Oliveira',
    studentGrade: 'Branca (6º Kyu)',
    chapterSlug: 'fundamentos',
    chapterTitle: '2.1 Princípios, Código Moral e Fundamentos Práticos',
    questionText: 'Sensei, quando faço Ushiro-ukemi ainda sinto um leve impacto no pescoço. Como ajustar o queixo?',
    status: 'respondida',
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    answeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    teacherResponse: 'Excelente pergunta, Lucas! O segredo é fixar o olhar na sua própria faixa (Obi) durante toda a descida e bater o braço a exatamente 45 graus com a palma espalmada para dissipar a energia antes que as costas cheguem ao tatame.',
    teacherName: 'Sensei Coordenador'
  }
];

export function useDoubtSystem() {
  const [doubts, setDoubtsState] = useState<DoubtQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(DOUBTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler dúvidas:', e);
    }
    return INITIAL_DOUBTS;
  });

  const submitQuestion = useCallback((question: Omit<DoubtQuestion, 'id' | 'status' | 'submittedAt'>) => {
    setDoubtsState((prev) => {
      const newDoubt: DoubtQuestion = {
        ...question,
        id: `doubt-${Date.now()}`,
        status: 'enviada',
        submittedAt: new Date().toISOString()
      };
      const updated = [newDoubt, ...prev];
      try {
        localStorage.setItem(DOUBTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar dúvida:', e);
      }
      return updated;
    });
  }, []);

  const answerQuestion = useCallback((id: string, response: string, teacherName: string) => {
    setDoubtsState((prev) => {
      const updated = prev.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          status: 'respondida' as const,
          answeredAt: new Date().toISOString(),
          teacherResponse: response,
          teacherName
        };
      });
      try {
        localStorage.setItem(DOUBTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao responder dúvida:', e);
      }
      return updated;
    });
  }, []);

  const archiveQuestion = useCallback((id: string) => {
    setDoubtsState((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, status: 'arquivada' as const } : d));
      try {
        localStorage.setItem(DOUBTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao arquivar dúvida:', e);
      }
      return updated;
    });
  }, []);

  return {
    doubts,
    submitQuestion,
    answerQuestion,
    archiveQuestion
  };
}
