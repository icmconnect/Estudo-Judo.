import { useState, useEffect } from 'react';

export function useProgress() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('dojo_progress');
    if (saved) {
      try {
        setCompletedChapters(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const toggleChapter = (slug: string) => {
    setCompletedChapters((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug];
      localStorage.setItem('dojo_progress', JSON.stringify(next));
      return next;
    });
  };

  const getProgressPercentage = (totalChapters: number) => {
    if (totalChapters === 0) return 0;
    return Math.round((completedChapters.length / totalChapters) * 100);
  };

  return { completedChapters, toggleChapter, getProgressPercentage };
}
