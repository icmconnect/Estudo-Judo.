import { useState, useEffect, useCallback } from 'react';

export type FontSizeOption = 'normal' | 'large' | 'extra-large';

interface A11ySettings {
  fontSize: FontSizeOption;
  highContrast: boolean;
  simplifiedReading: boolean;
  speechSpeed: number;
}

const A11Y_STORAGE_KEY = 'dojo_digital_a11y_v2';

const DEFAULT_A11Y: A11ySettings = {
  fontSize: 'normal',
  highContrast: false,
  simplifiedReading: false,
  speechSpeed: 1.0
};

export function useAccessibility() {
  const [settings, setSettingsState] = useState<A11ySettings>(() => {
    try {
      const saved = localStorage.getItem(A11Y_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler a11y:', e);
    }
    return DEFAULT_A11Y;
  });

  const updateSettings = useCallback((updates: Partial<A11ySettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar a11y:', e);
      }
      return updated;
    });
  }, []);

  // Aplica classe de tamanho de fonte e alto contraste no elemento raiz (HTML)
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove classes anteriores
    root.classList.remove('font-size-large', 'font-size-xl', 'high-contrast-mode');
    
    if (settings.fontSize === 'large') {
      root.classList.add('font-size-large');
    } else if (settings.fontSize === 'extra-large') {
      root.classList.add('font-size-xl');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast-mode');
    }
  }, [settings.fontSize, settings.highContrast]);

  // Função utilitária para sintetizar voz (Pronúncia de termos em japonês / português)
  const speakText = useCallback((text: string, lang = 'ja-JP') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Síntese de voz não suportada no navegador');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.speechSpeed || 0.9;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }, [settings.speechSpeed]);

  return {
    fontSize: settings.fontSize,
    setFontSize: (fontSize: FontSizeOption) => updateSettings({ fontSize }),
    highContrast: settings.highContrast,
    toggleHighContrast: () => updateSettings({ highContrast: !settings.highContrast }),
    simplifiedReading: settings.simplifiedReading,
    toggleSimplifiedReading: () => updateSettings({ simplifiedReading: !settings.simplifiedReading }),
    speechSpeed: settings.speechSpeed,
    setSpeechSpeed: (speechSpeed: number) => updateSettings({ speechSpeed }),
    speakText
  };
}
