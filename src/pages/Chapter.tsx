import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { allChapters, modules } from '../data/chapters';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, ShieldCheck, AlertCircle, Lock, Sparkles, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { useSubscription } from '../contexts/SubscriptionContext';
import { GokyoCatalog } from '../components/GokyoCatalog';
import { StudentDashboard } from '../components/StudentDashboard';

export function ChapterPage() {
  const { slug } = useParams();
  const { completedChapters, toggleChapter, getProgressPercentage } = useProgress();
  const { isFree, checkCanAccessContent, openPaywallModal } = useSubscription();
  
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
  const currentModule = modules.find(m => m.chapters.some(c => c.slug === slug));
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const progress = getProgressPercentage(allChapters.length);
  const isCompleted = slug ? completedChapters.includes(slug) : false;
  const hasAccess = checkCanAccessContent('chapter', chapter.slug);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-20"
    >
      {/* Barra de Progresso Superior Fixa */}
      <div 
        className="fixed top-20 left-0 lg:left-80 right-0 h-1.5 bg-zinc-200 dark:bg-zinc-800 z-20"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso do curso: ${progress}%`}
      >
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Se estiver no Portal do Judoca (Introdução), exibe o Dashboard do Aluno antes do conteúdo */}
      {slug === 'introducao' && (
        <StudentDashboard />
      )}

      {/* Card Principal do Artigo com Hero Contrastante (WCAG AA Compliance) */}
      <article 
        className="flex flex-col bg-white dark:bg-zinc-950 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden relative"
        aria-labelledby="chapter-main-title"
      >
        {/* Banner Hero com Alto Contraste (Fundo Escuro Nobre com Tipografia Branca e Dourada) */}
        <header className="bg-gradient-to-br from-zinc-950 via-[#0B1120] to-zinc-950 text-white p-5 sm:p-10 md:p-12 relative overflow-hidden border-b border-zinc-800">
          {/* Padrão geométrico suave no fundo */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.4) 1px, transparent 0)', 
              backgroundSize: '24px 24px' 
            }}
            aria-hidden="true"
          />
          
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500 text-zinc-950 text-xs font-black rounded-lg uppercase tracking-wider shadow-md shadow-amber-500/20">
                {currentModule?.title.split(':')[0] || 'Módulo'}
              </span>
              <span className="px-3 py-1 bg-zinc-800/90 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30 uppercase tracking-wider">
                {chapter.category || 'Judô Tradicional'}
              </span>
              {!hasAccess && (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1">
                  <Lock size={12} />
                  <span>Conteúdo Completo</span>
                </span>
              )}
            </div>

            <h1 
              id="chapter-main-title"
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-['Bebas_Neue',sans-serif] leading-tight break-words"
            >
              {chapter.title}
            </h1>

            {chapter.summary && (
              <p className="text-xs sm:text-base text-zinc-200 max-w-2xl leading-relaxed">
                {chapter.summary}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-2 border-t border-zinc-800/80 w-full mt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen size={14} className="text-amber-400" aria-hidden="true" />
                Material Didático Oficial
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <ShieldCheck size={14} aria-hidden="true" />
                Kodokan Judo Gokyo Oficial
              </span>
            </div>
          </div>
        </header>

        {/* Corpo do Conteúdo ou Paywall */}
        <div className="py-6 sm:py-12 px-4 sm:px-8 md:px-14 relative z-10">
          {!hasAccess ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border-2 border-amber-500/30 text-center max-w-2xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-500">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] tracking-wide mb-3">
                Esta aula faz parte do Acesso Completo
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                No plano gratuito você tem acesso ao Portal do Aluno, fundamentos iniciais e demonstração do Gokyo. Para desbloquear todas as aulas completas, apostilas, 139 vídeos técnicos e 7 trilhas de formação teórica, adquira o Plano Fundador por taxa única.
              </p>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6 text-left space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                  O que você libera com o Plano Fundador:
                </span>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500 shrink-0" />
                  <span>Arsenal Técnico Completo com 139 vídeos em alta definição</span>
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500 shrink-0" />
                  <span>Formação Teórica Autoral com 7 trilhas pedagógicas</span>
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500 shrink-0" />
                  <span>Caderno Técnico, Quizzes e Certificados de Conclusão</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link
                  to="/planos"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Liberar por R$ 97,00 (Pagamento Único)</span>
                </Link>
                <Link
                  to="/capitulo/introducao"
                  className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-2xl transition-all"
                >
                  Voltar ao Início Gratuito
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-['Bebas_Neue',sans-serif] prose-headings:tracking-tight prose-headings:uppercase prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:border-b prose-h2:border-zinc-200 dark:prose-h2:border-zinc-800 prose-h2:pb-3 prose-h2:text-zinc-900 dark:prose-h2:text-white prose-h3:text-xl prose-h3:text-amber-700 dark:prose-h3:text-amber-400 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-p:leading-relaxed prose-p:text-base sm:prose-p:lg prose-strong:text-zinc-950 dark:prose-strong:text-white prose-li:text-zinc-800 dark:prose-li:text-zinc-200">
                <div className="markdown-body">
                  <Markdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: () => null, // O título principal já é exibido no Hero Banner
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-amber-500 bg-amber-50/90 dark:bg-amber-950/20 text-zinc-900 dark:text-amber-100 p-6 rounded-r-2xl italic my-8 shadow-sm font-['Cormorant_Garamond',serif] text-xl not-italic" {...props} />
                      ),
                      iframe: ({node, ...props}) => (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl my-8 border border-zinc-200 dark:border-zinc-800 bg-black group">
                          <iframe className="absolute inset-0 w-full h-full" allowFullScreen {...props} />
                        </div>
                      ),
                      table: ({node, ...props}) => (
                        <div className="my-8 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                          <table className="w-full text-left border-collapse text-sm" {...props} />
                        </div>
                      ),
                      th: ({node, ...props}) => (
                        <th className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold p-3.5 border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider text-xs" {...props} />
                      ),
                      td: ({node, ...props}) => (
                        <td className="p-3.5 border-b border-zinc-100 dark:border-zinc-800/60 text-zinc-800 dark:text-zinc-200" {...props} />
                      ),
                    }}
                  >
                    {chapter.content}
                  </Markdown>
                </div>
              </div>

              {/* Renderização Especial do Catálogo Gokyo quando for a página do catálogo */}
              {chapter.slug === 'catalogo-gokyo' && (
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                  <GokyoCatalog />
                </div>
              )}

              {/* Aviso Fixo de Salvaguarda & Segurança nos Estudos */}
              <div className="mt-10 p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
                <div className="leading-relaxed">
                  <strong className="text-zinc-900 dark:text-zinc-200 font-bold block mb-0.5">
                    Aviso Educacional de Segurança & Prática Consciente:
                  </strong>
                  O Dojo Digital é uma plataforma de estudo complementar. Técnicas de projeção, solo e arbitragem devem ser praticadas unicamente em tatames apropriados sob supervisão direta de professores certificados.
                </div>
              </div>
            </>
          )}
        </div>
      </article>

      {/* Botão de Marcar Aula como Concluída (apenas se tiver acesso) */}
      {hasAccess && (
        <section 
          className="flex justify-center -mt-4 relative z-10"
          aria-label="Controle de conclusão da aula"
        >
          <button
            onClick={() => slug && toggleChapter(slug)}
            aria-pressed={isCompleted}
            aria-label={isCompleted ? "Aula concluída. Clique para desmarcar" : "Marcar esta aula como concluída"}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 shadow-xl border-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50",
              isCompleted 
                ? "bg-white dark:bg-zinc-900 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20" 
                : "bg-amber-500 border-amber-500 text-zinc-950 hover:bg-amber-600 hover:scale-105 shadow-amber-500/25 active:scale-95"
            )}
          >
            <CheckCircle2 size={22} className={cn("transition-transform duration-300", isCompleted && "scale-110")} aria-hidden="true" />
            <span>{isCompleted ? "✓ Aula Concluída (Clique para Desmarcar)" : "Marcar Esta Aula como Concluída"}</span>
          </button>
        </section>
      )}

      {/* Navegação entre Capítulos (Anterior e Próximo) */}
      <nav 
        aria-label="Navegação entre aulas anterior e próxima"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800/80"
      >
        {prevChapter ? (
          <Link 
            to={`/capitulo/${prevChapter.slug}`}
            className="flex w-full sm:w-auto items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all text-sm font-medium shadow-sm hover:shadow group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`Ir para a aula anterior: ${prevChapter.title}`}
          >
            <ArrowLeft size={20} className="text-zinc-500 group-hover:text-amber-500 transition-colors shrink-0" aria-hidden="true" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Aula Anterior</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-bold text-sm sm:text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">{prevChapter.title}</span>
            </div>
          </Link>
        ) : <div className="w-full sm:w-auto" />}

        {nextChapter ? (
          <Link 
            to={`/capitulo/${nextChapter.slug}`}
            className="flex w-full sm:w-auto items-center justify-end gap-3 px-6 py-4 rounded-2xl bg-amber-500 text-zinc-950 hover:bg-amber-600 transition-all text-sm font-bold shadow-md hover:shadow-xl group active:scale-98 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
            aria-label={`Ir para a próxima aula: ${nextChapter.title}`}
          >
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-900 font-black">Próxima Aula</span>
              <span className="font-extrabold text-sm sm:text-base line-clamp-1">{nextChapter.title}</span>
            </div>
            <ArrowRight size={20} className="shrink-0" aria-hidden="true" />
          </Link>
        ) : <div className="w-full sm:w-auto" />}
      </nav>
    </motion.div>
  );
}

