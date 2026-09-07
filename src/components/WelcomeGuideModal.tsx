import { useEffect, useRef } from 'react';
import { Compass, BookOpen, TrendingUp, X, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TipData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  linkText: string;
  linkTo: string;
  imageSrc?: string;
  imageAlt?: string;
}

const TIPS: TipData[] = [
  {
    id: "welcome-start",
    title: "Comece por aqui",
    description: "Abra o Portal do Judoca para conhecer a plataforma, revisar fundamentos e seguir sua trilha de estudo.",
    icon: Compass,
    linkText: "Ir para o Portal do Judoca",
    linkTo: "/capitulo/introducao" // Or main active route
  },
  {
    id: "welcome-techniques",
    title: "Estude técnicas",
    description: "Acesse o Arsenal Técnico e o Catálogo Gokyo para pesquisar técnicas, ver referências e revisar conceitos.",
    icon: Shirt,
    linkText: "Explorar Gokyo",
    linkTo: "/formacao-teorica" 
  },
  {
    id: "welcome-progress",
    title: "Acompanhe sua evolução",
    description: "Marque as aulas concluídas e acompanhe seu progresso, metas e próximas revisões.",
    icon: TrendingUp,
    linkText: "Ver meu progresso",
    linkTo: "/capitulo/introducao" 
  },
  {
    id: "welcome-notebook",
    title: "Use o Caderno Técnico",
    description: "Salve técnicas favoritas, dúvidas e anotações para revisar antes do próximo treino.",
    icon: BookOpen,
    linkText: "Abrir Caderno Técnico",
    linkTo: "/caderno-tecnico"
  }
];

interface WelcomeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeGuideModal({ isOpen, onClose }: WelcomeGuideModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Close on Escape and Focus Trap
  useEffect(() => {
    if (!isOpen) return;
    
    // Focus management - initial focus
    if (startButtonRef.current) {
      setTimeout(() => {
        startButtonRef.current?.focus();
      }, 100);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Focus Trap
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div 
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        className="relative flex flex-col bg-white dark:bg-zinc-900 w-full rounded-3xl shadow-2xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800"
        style={{ width: 'min(100%, 720px)', maxHeight: 'calc(100dvh - 24px)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-8 pb-4 shrink-0 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h2 id="welcome-modal-title" className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Bem-vindo ao Dojo Digital!
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1.5 text-sm sm:text-base font-medium max-w-xl">
              Estude Judô no seu ritmo. Veja rapidamente onde encontrar os principais recursos.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 -mr-2 -mt-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shrink-0"
            aria-label="Fechar guia inicial"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIPS.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div 
                  key={tip.id} 
                  className="flex flex-col bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                        {index + 1}
                      </span>
                      {tip.title}
                    </h3>
                  </div>
                  
                  {tip.imageSrc && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                      <img 
                        src={tip.imageSrc} 
                        alt={tip.imageAlt}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 leading-relaxed">
                    {tip.description}
                  </p>
                  
                  {/* Option for routing if desired, but user wants actions to close modal or navigate without closing. We just do close for now and routing if clicked. */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-5 sm:p-8 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mb-6 leading-relaxed max-w-2xl mx-auto">
            <span className="font-bold text-amber-600 dark:text-amber-500">Aviso:</span> O Dojo Digital complementa o treino presencial. Pratique técnicas somente com orientação de professor qualificado, parceiro preparado e ambiente adequado.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              ref={startButtonRef}
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 shadow-xl shadow-amber-500/20"
            >
              Começar agora
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 font-bold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Ver novamente depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
