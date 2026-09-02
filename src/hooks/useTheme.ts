import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'dojo_digital_theme_v1';
const LEGACY_STORAGE_KEY = 'garca_judo_theme_v1';
const GENERIC_THEME_KEY = 'theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) || 
                     localStorage.getItem(LEGACY_STORAGE_KEY) || 
                     localStorage.getItem(GENERIC_THEME_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Aplica classe no documentElement e persiste no localStorage
  const applyTheme = useCallback((newTheme: Theme, shouldPersist = true) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    if (shouldPersist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        localStorage.setItem(LEGACY_STORAGE_KEY, newTheme);
        localStorage.setItem(GENERIC_THEME_KEY, newTheme);
      } catch (err) {
        console.warn('Erro ao salvar tema no localStorage:', err);
      }
    }
  }, []);

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme, applyTheme]);

  // Ouvir alterações de preferência do sistema operacional se o usuário não definiu uma preferência manual explícita
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem(GENERIC_THEME_KEY);
      // Se não houver escolha manual explícita, acompanha o sistema operacional
      if (!stored) {
        const systemTheme: Theme = e.matches ? 'dark' : 'light';
        setTheme(systemTheme);
        applyTheme(systemTheme, false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme: Theme = prevTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme, true);
      return nextTheme;
    });
  }, [applyTheme]);

  const setExplicitTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme, true);
  }, [applyTheme]);

  return { theme, toggleTheme, setTheme: setExplicitTheme };
}

