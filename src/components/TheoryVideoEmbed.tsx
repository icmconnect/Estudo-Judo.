import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Play, AlertCircle, Info, Video, CheckCircle2 } from 'lucide-react';
import { TheoryVideo } from '../data/theoryVideos';

interface TheoryVideoEmbedProps {
  video: TheoryVideo;
  autoPlay?: boolean;
}

export const TheoryVideoEmbed: React.FC<TheoryVideoEmbedProps> = ({ video, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [embedError, setEmbedError] = useState(false);

  return (
    <section 
      className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg space-y-0 text-white"
      aria-label={`Vídeo de Referência: ${video.title}`}
    >
      {/* Header com Metadados Oficiais */}
      <div className="p-3.5 sm:p-5 bg-zinc-950/80 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 shrink-0">
              <Video size={11} /> Referência Audiovisual Externa
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              Fonte: <strong className="text-zinc-200">{video.sourceEntity}</strong> ({video.sourceChannel})
            </span>
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-zinc-100 break-words">
            {video.title}
          </h3>
          <p className="text-xs text-zinc-400 font-medium break-words">
            Tópico relacionado: <span className="text-amber-300">{video.topic}</span>
          </p>
        </div>

        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-bold border border-zinc-700 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
          title="Abrir no YouTube oficial em nova aba"
        >
          <ExternalLink size={13} />
          <span>Abrir no YouTube</span>
        </a>
      </div>

      {/* Container de Vídeo Responsivo 16:9 */}
      <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
        {isPlaying && !embedError ? (
          <iframe
            src={`${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={`Vídeo: ${video.title}`}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setEmbedError(true)}
          />
        ) : embedError ? (
          <div className="p-6 text-center space-y-3 max-w-md">
            <AlertCircle className="mx-auto text-amber-500" size={36} />
            <p className="text-sm font-bold text-zinc-200">
              Este vídeo externo não permite reprodução direta incorporada.
            </p>
            <p className="text-xs text-zinc-400">
              Você pode assistir diretamente no canal oficial do YouTube com toda segurança e alta definição.
            </p>
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <ExternalLink size={14} />
              <span>Assistir no YouTube</span>
            </a>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950/90 text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 cursor-pointer" onClick={() => setIsPlaying(true)}>
              <Play size={28} className="ml-1" />
            </div>
            <div className="space-y-1 max-w-md">
              <p className="text-sm font-bold text-zinc-100">
                Clique para carregar o vídeo de apoio
              </p>
              <p className="text-xs text-zinc-400">
                {video.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-amber-400 border border-zinc-700 cursor-pointer"
            >
              Carregar Player Incorporado
            </button>
          </div>
        )}
      </div>

      {/* Avisos de Segurança, Salvaguarda e Auditoria Editorial */}
      <div className="p-4 sm:p-5 bg-zinc-950 text-xs space-y-3 border-t border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-zinc-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>Auditoria Editorial: <strong className="text-zinc-300">Verificado em {video.verifiedAt}</strong></span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Classificação: {video.recommendedAge === 'all_ages' ? 'Livre para todas as idades' : video.recommendedAge === '12_plus' ? 'Recomendado 12+ anos' : 'Recomendado 15+ anos'}
          </span>
        </div>

        {/* Aviso de Segurança */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed flex items-start gap-2">
          <Info size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-300">Aviso Pedagógico:</strong> {video.safetyNotice}
          </div>
        </div>

        {/* Aviso Regulatório se existir */}
        {video.regulatoryNotice && (
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs leading-relaxed">
            <strong className="text-zinc-200 block mb-0.5">Nota de Arbitragem:</strong>
            {video.regulatoryNotice}
          </div>
        )}

        <div className="text-[10px] text-zinc-400 pt-1 leading-normal">
          {video.attribution} • {video.licenseStatus}
        </div>
      </div>
    </section>
  );
};
