import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { allChapters } from '../data/chapters';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

export function ChapterPage() {
  const { slug } = useParams();
  const { completedChapters, toggleChapter, getProgressPercentage } = useProgress();
  
  const currentIndex = allChapters.findIndex(c => c.slug === slug);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentIndex !== -1) {
      const chapterTitle = allChapters[currentIndex].title;
      document.title = `${chapterTitle} | Dojo Digital`;
    }
  }, [slug, currentIndex]);

  if (currentIndex === -1) {
    return <Navigate to="/capitulo/introducao" replace />;
  }

  const chapter = allChapters[currentIndex];
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const progress = getProgressPercentage(allChapters.length);
  const isCompleted = slug ? completedChapters.includes(slug) : false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-10 pb-16"
    >
      {/* Progress Bar Top */}
      <div className="fixed top-20 left-0 lg:left-72 right-0 h-1 bg-zinc-100 dark:bg-zinc-800 z-20">
        <div 
          className="h-full bg-blue-600 dark:bg-amber-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col bg-white dark:bg-[#0A0E17] rounded-3xl shadow-sm border border-blue-100 dark:border-zinc-800 overflow-hidden relative">
        {/* Pattern Background for Hero */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-blue-900/5 dark:bg-blue-900/10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(29, 78, 216, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="py-4 sm:py-8 px-4 sm:px-8 md:px-12 relative z-10">
          <article className="prose prose-slate dark:prose-invert prose-blue lg:prose-lg mx-auto w-full max-w-none">
            <div className="markdown-body">
              <Markdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => (
                    <div className="bg-gradient-to-br from-blue-900 to-[#0A0E17] dark:from-[#0A0E17] dark:to-zinc-950 text-white p-8 sm:p-14 -mx-4 sm:-mx-8 md:-mx-12 -mt-8 sm:-mt-12 mb-12 rounded-b-[2.5rem] shadow-2xl border-b border-blue-900/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full mb-4 uppercase tracking-widest border border-amber-500/30">Módulo {currentIndex + 1}</span>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-0 mb-4 font-['Bebas_Neue',sans-serif] uppercase" {...props} />
                        <div className="w-20 h-1.5 bg-amber-500 rounded-full mt-6 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                      </div>
                    </div>
                  ),
                  h2: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-zinc-100 mt-14 mb-6 border-b border-blue-100 dark:border-zinc-800 pb-4 font-['Bebas_Neue',sans-serif] uppercase" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-amber-500 mt-10 mb-4" {...props} />,
                  p: ({node, ...props}) => <p className="leading-relaxed text-slate-600 dark:text-zinc-300 mb-6 text-lg" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-600 dark:text-zinc-300 space-y-3 mb-6 ml-4" {...props} />,
                  li: ({node, ...props}) => <li className="pl-2" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-slate-800 dark:text-zinc-200 p-6 rounded-r-xl italic my-8 shadow-sm font-['Cormorant_Garamond',serif] text-xl" {...props} />,
                  iframe: ({node, ...props}) => (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl my-10 border border-blue-200 dark:border-zinc-800 bg-black group">
                      <iframe className="absolute inset-0 w-full h-full" allowFullScreen {...props} />
                    </div>
                  ),
                  img: ({node, ...props}) => (
                    <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-blue-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex justify-center items-center">
                      <img className="max-w-full h-auto object-cover" {...props} />
                    </div>
                  ),
                }}
              >
                {chapter.content}
              </Markdown>
            </div>
          </article>
        </div>
      </div>

      {/* Completion Button */}
      <div className="flex justify-center -mt-4 relative z-10">
        <button
          onClick={() => slug && toggleChapter(slug)}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-xl border-2",
            isCompleted 
              ? "bg-white dark:bg-[#0A0E17] border-blue-600 text-blue-600 dark:border-amber-500 dark:text-amber-500 hover:bg-blue-50 dark:hover:bg-amber-950/30" 
              : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:scale-105 dark:bg-amber-500 dark:border-amber-500 dark:text-[#0A0E17] dark:hover:bg-amber-600"
          )}
        >
          <CheckCircle2 size={24} className={cn("transition-transform duration-300", isCompleted && "scale-110")} />
          {isCompleted ? "Aula Concluída. Desmarcar?" : "Marcar Aula como Concluída"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        {prevChapter ? (
          <Link 
            to={`/capitulo/${prevChapter.slug}`}
            className="flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium shadow-sm"
          >
            <ArrowLeft size={18} className="text-zinc-400" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold mb-0.5">Capítulo Anterior</span>
              <span className="text-slate-800 dark:text-zinc-200 font-semibold text-base">{prevChapter.title}</span>
            </div>
          </Link>
        ) : <div className="w-full sm:w-auto" />}

        {nextChapter ? (
          <Link 
            to={`/capitulo/${nextChapter.slug}`}
            className="flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-amber-500 dark:text-[#0A0E17] dark:hover:bg-amber-600 transition-colors text-sm font-medium shadow-md hover:shadow-lg"
          >
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-blue-200 dark:text-amber-900 font-bold mb-0.5">Próximo Capítulo</span>
              <span className="font-semibold text-base">{nextChapter.title}</span>
            </div>
            <ArrowRight size={18} />
          </Link>
        ) : <div className="w-full sm:w-auto" />}
      </div>
    </motion.div>
  );
}
