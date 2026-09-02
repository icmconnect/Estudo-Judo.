import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  category?: string;
  subtitle?: string;
  allowExternalBackup?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  url, 
  title, 
  category, 
  subtitle,
  allowExternalBackup = true 
}) => {
  // Extrai o ID do YouTube seja a URL normal watch?v= ou /embed/
  const extractVideoId = (src: string): string => {
    if (!src) return '';
    const match = src.match(/(?:embed\/|watch\?v=|youtu\.be\/|\/v\/|list=)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  const getEmbedUrl = (src: string): string => {
    if (!src) return '';
    if (src.includes('/embed/')) return src;
    if (src.includes('list=')) {
      const listId = src.split('list=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/videoseries?list=${listId}&rel=0`;
    }
    const videoId = extractVideoId(src);
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : src;
  };

  const embedUrl = getEmbedUrl(url);
  const videoId = extractVideoId(url);
  const directYoutubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;

  return (
    <div 
      className="w-full my-8 flex flex-col rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-white shadow-2xl transition-all duration-300"
      aria-label={`Player de vídeo: ${title}`}
    >
      {/* Header do Player */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" aria-hidden="true"></span>
          {category && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded shrink-0">
              {category}
            </span>
          )}
          <span className="text-xs sm:text-sm font-semibold text-zinc-200 truncate" title={title}>
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-400 font-medium bg-zinc-800/60 px-2 py-1 rounded">
            <ShieldCheck size={13} className="text-emerald-400" aria-hidden="true" />
            Player Interno
          </span>
          {allowExternalBackup && directYoutubeUrl && (
            <a 
              href={directYoutubeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Abrir no YouTube (Apoio secundário)"
              aria-label={`Abrir ${title} no YouTube`}
            >
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Frame do Vídeo */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={embedUrl}
          title={`Vídeo demonstrativo: ${title}`}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Rodapé informativo opcional */}
      {subtitle && (
        <div className="px-4 py-2.5 bg-zinc-900/60 text-xs text-zinc-400 border-t border-zinc-800/80 flex items-center justify-between">
          <span className="truncate">{subtitle}</span>
          <span className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wider shrink-0 ml-2">
            HD Kodokan
          </span>
        </div>
      )}
    </div>
  );
};
