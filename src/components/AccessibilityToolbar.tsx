import React from 'react';
import { Eye, Sun, Moon, Type, Volume2, Shield } from 'lucide-react';
import { useAccessibility, FontSizeOption } from '../hooks/useAccessibility';

export const AccessibilityToolbar: React.FC = () => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    simplifiedReading,
    toggleSimplifiedReading,
    speechSpeed,
    setSpeechSpeed
  } = useAccessibility();

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300">
      {/* Font Size Controls */}
      <div className="flex items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-1.5">
        <button
          onClick={() => setFontSize('normal')}
          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
            fontSize === 'normal' ? 'bg-amber-500 text-zinc-950' : 'hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="Tamanho de Fonte Padrão"
        >
          A
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
            fontSize === 'large' ? 'bg-amber-500 text-zinc-950' : 'hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="Tamanho de Fonte Ampliado (+20%)"
        >
          A+
        </button>
        <button
          onClick={() => setFontSize('extra-large')}
          className={`px-2 py-1 rounded-lg font-bold text-sm transition-all ${
            fontSize === 'extra-large' ? 'bg-amber-500 text-zinc-950' : 'hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="Tamanho de Fonte Extra Grande (+40%)"
        >
          A++
        </button>
      </div>

      {/* High Contrast Toggle */}
      <button
        onClick={toggleHighContrast}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
          highContrast ? 'bg-amber-500 text-zinc-950' : 'hover:text-zinc-900 dark:hover:text-white'
        }`}
        title="Modo de Alto Contraste (WCAG AAA)"
      >
        <Eye size={13} />
        <span className="hidden sm:inline">Alto Contraste</span>
      </button>

      {/* Simplified Reading Toggle */}
      <button
        onClick={toggleSimplifiedReading}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
          simplifiedReading ? 'bg-emerald-600 text-white' : 'hover:text-zinc-900 dark:hover:text-white'
        }`}
        title="Modo Leitura Focada / Simplificada"
      >
        <Shield size={13} />
        <span className="hidden sm:inline">Leitura Focada</span>
      </button>
    </div>
  );
};
