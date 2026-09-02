import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Insígnia Oficial do Dojo Digital */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-zinc-950 p-0.5 shadow-md shadow-emerald-700/20`}>
        <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[10px] flex items-center justify-center relative overflow-hidden p-0.5">
          <svg className="w-full h-full text-emerald-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M50 4 C58 10, 64 12, 70 18 C78 26, 82 32, 88 40 C94 48, 96 54, 96 60 C94 68, 88 74, 80 82 C72 88, 64 92, 50 96 C36 92, 28 88, 20 82 C12 74, 6 68, 4 60 C4 54, 6 48, 12 40 C18 32, 22 26, 30 18 C36 12, 42 10, 50 4 Z" 
              stroke="#008A45" 
              strokeWidth="5" 
              fill="rgba(0, 138, 69, 0.08)"
            />
            <path 
              d="M50 10 C56 15, 61 17, 66 22 C73 29, 77 34, 82 42 C87 49, 89 54, 89 59 C87 66, 82 71, 75 78 C68 83, 61 87, 50 90 C39 87, 32 83, 25 78 C18 71, 13 66, 11 59 C11 54, 13 49, 18 42 C23 34, 27 29, 34 22 C39 17, 44 15, 50 10 Z" 
              stroke="#09090B" 
              strokeWidth="2.5" 
              className="dark:stroke-zinc-700"
            />
            <text x="50" y="44" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="sans-serif" fill="#09090B" className="dark:fill-white">柔</text>
            <text x="50" y="66" textAnchor="middle" fontSize="13" fontWeight="900" letterSpacing="1" fontFamily="sans-serif" fill="#008A45">DOJO</text>
          </svg>
        </div>
      </div>

      <div className="flex flex-col leading-tight shrink min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className={`font-extrabold tracking-wider uppercase text-zinc-900 dark:text-white font-['Bebas_Neue',sans-serif] ${size === 'sm' ? 'text-base sm:text-lg' : textSizes[size]} shrink min-w-0 truncate`}>
            DOJO DIGITAL
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-emerald-600 text-white rounded shrink-0">
            OFICIAL
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400 hidden sm:block">
            Plataforma de Ensino Kodokan
          </span>
        )}
      </div>
    </div>
  );
};
