import React, { useState } from 'react';
import { Video, ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { THEORY_VIDEOS } from '../data/theoryVideos';
import { TheoryVideoEmbed } from './TheoryVideoEmbed';

export const TheoryVideosGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(THEORY_VIDEOS[0]);

  return (
    <div className="w-full min-w-0 space-y-6 max-w-6xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link 
          to="/formacao-teorica"
          className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Video size={24} className="text-amber-500" />
            Galeria de Vídeos da Teoria
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Revisite os {THEORY_VIDEOS.length} vídeos e documentários que compõem a base visual do conteúdo teórico.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-sm overflow-hidden">
             <TheoryVideoEmbed video={activeVideo} />
          </div>
        </div>

        <div className="space-y-3 lg:h-[600px] overflow-y-auto pr-2 scrollbar-thin">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider px-1">Acervo Completo</h3>
          {THEORY_VIDEOS.map(video => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                activeVideo.id === video.id
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeVideo.id === video.id ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}>
                <Play size={16} className={activeVideo.id === video.id ? 'fill-zinc-950' : ''} />
              </div>
              <div className="min-w-0">
                <h4 className={`text-sm font-bold truncate ${
                  activeVideo.id === video.id ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-900 dark:text-zinc-100'
                }`}>
                  {video.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  Tópico: {video.topic}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
