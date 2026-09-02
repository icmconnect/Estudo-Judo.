import { useState, useCallback, useMemo } from 'react';
import { Achievement, IssuedCertificate } from '../types';

const ACHIEVEMENTS_STORAGE_KEY = 'dojo_digital_achievements_v2';
const CERTIFICATES_STORAGE_KEY = 'dojo_digital_certs_v2';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-rei',
    title: 'Primeiro Rei',
    description: 'Iniciou a jornada educacional e completou a aula de boas-vindas e filosofia do Budo.',
    iconName: 'Award',
    category: 'filosofia',
    progressPercent: 100,
    requirement: 'Concluir o Capítulo 1',
    unlockedAt: '2026-03-01'
  },
  {
    id: 'ach-guardiao-tatame',
    title: 'Guardião do Tatame',
    description: 'Estudou o Módulo 3 de Dojo Seguro e as 10 Regras de Ouro de Prevenção e Higiene.',
    iconName: 'ShieldCheck',
    category: 'seguranca',
    progressPercent: 100,
    requirement: 'Concluir módulo de segurança',
    unlockedAt: '2026-03-01'
  },
  {
    id: 'ach-ukemi-consciente',
    title: 'Ukemi Consciente',
    description: 'Completou o simulador e estudo detalhado de amortecimento de quedas.',
    iconName: 'CheckCircle',
    category: 'fundamentos',
    progressPercent: 100,
    requirement: 'Atingir 100% no Quiz de Segurança',
    unlockedAt: '2026-03-01'
  },
  {
    id: 'ach-10-tecnicas',
    title: '10 Técnicas Estudadas',
    description: 'Explorou e assistiu a pelo menos 10 fichas biomecânicas no Catálogo Gokyo.',
    iconName: 'Layers',
    category: 'tecnica',
    progressPercent: 60,
    requirement: 'Visualizar 10 técnicas no Gokyo'
  },
  {
    id: 'ach-codigo-moral',
    title: 'Código Moral Completo',
    description: 'Passou por todas as 8 virtudes do Judô e realizou os cenários de atitude.',
    iconName: 'Heart',
    category: 'filosofia',
    progressPercent: 75,
    requirement: 'Explorar os dilemas comportamentais'
  },
  {
    id: 'ach-arbitragem-expert',
    title: 'Árbitro em Formação',
    description: 'Completou o simulador interativo de cenários de luta CBJ/IJF com nota máxima.',
    iconName: 'Compass',
    category: 'arbitragem',
    progressPercent: 80,
    requirement: 'Acertar cenários de arbitragem'
  },
  {
    id: 'ach-mestre-disciplina',
    title: 'Mestre da Disciplina',
    description: 'Registrou treinos no Diário e manteve a revisão espaçada em dia.',
    iconName: 'Calendar',
    category: 'disciplina',
    progressPercent: 50,
    requirement: 'Adicionar ao menos 1 registro no diário de treino'
  }
];

export function useAchievements() {
  const [achievements, setAchievementsState] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler conquistas:', e);
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [certificates, setCertificatesState] = useState<IssuedCertificate[]>(() => {
    try {
      const saved = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler certificados:', e);
    }
    return [];
  });

  const unlockAchievement = useCallback((id: string) => {
    setAchievementsState((prev) => {
      const updated = prev.map((a) => {
        if (a.id !== id || a.unlockedAt) return a;
        return {
          ...a,
          progressPercent: 100,
          unlockedAt: new Date().toISOString()
        };
      });
      try {
        localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar conquista:', e);
      }
      return updated;
    });
  }, []);

  const generateCertificate = useCallback((studentName: string, trackName: string, completedHours: number) => {
    const certCode = `DOJO-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newCert: IssuedCertificate = {
      certificateId: `cert-${Date.now()}`,
      studentName,
      trackName,
      completedHours,
      issueDate: new Date().toLocaleDateString('pt-BR'),
      verificationCode: certCode,
      disclaimer: 'Certificado de conclusão de conteúdo digital e estudo teórico-biomecânico. Não equivale a graduação de faixa, exame técnico prático ou credenciamento oficial por entidade de administração do desporto.'
    };

    setCertificatesState((prev) => {
      const updated = [newCert, ...prev];
      try {
        localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar certificado:', e);
      }
      return updated;
    });

    return newCert;
  }, []);

  const unlockedCount = useMemo(() => {
    return achievements.filter((a) => !!a.unlockedAt).length;
  }, [achievements]);

  return {
    achievements,
    unlockAchievement,
    unlockedCount,
    totalAchievements: achievements.length,
    certificates,
    generateCertificate
  };
}
