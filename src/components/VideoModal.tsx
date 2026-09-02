import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, ShieldCheck, Video, Info, AlertTriangle, Layers, Volume2, Bookmark, PlusCircle, CheckCircle2 } from 'lucide-react';
import { getDetailedSheet } from '../data/detailedTechniques';
import { AUDITED_VIDEOS } from '../data/videoAuditData';
import { useAccessibility } from '../hooks/useAccessibility';
import { useReviewSystem } from '../hooks/useReviewSystem';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  japaneseName?: string;
  category?: string;
  videoId: string;
  description?: string;
  techId?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  japaneseName,
  category = 'Nage-waza',
  videoId,
  description,
  techId = 'AS_004'
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'ficha'>('video');
  const [addedToReview, setAddedToReview] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const { speakText } = useAccessibility();
  const { isFavorite, toggleFavorite, addReviewItem } = useReviewSystem();

  const detailedSheet = getDetailedSheet(techId, title, category);
  const auditedVideo = AUDITED_VIDEOS.find(v => v.techniqueId === techId || v.videoId === videoId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      // Focus trap
      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusables = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

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

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setEmbedError(false);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) return null;

  const handleAddToReview = () => {
    addReviewItem({
      type: 'tecnica',
      title,
      japaneseTitle: japaneseName,
      category,
      sourceId: techId,
      securityTip: detailedSheet.ukemiAndSafety
    });
    setAddedToReview(true);
    setTimeout(() => setAddedToReview(false), 2500);
  };

  const isExternalInValidation = auditedVideo?.validationStatus === 'a_validar' || auditedVideo?.origin === 'Referência a validar';
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedSrc = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Backdrop click to close */}
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div 
        ref={modalContainerRef}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto"
      >
        {/* Header do Modal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-6 py-3 sm:py-4 bg-zinc-900/95 border-b border-zinc-800 shrink-0">
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-zinc-950 rounded-md shrink-0">
                  {category}
                </span>
              )}
              {japaneseName && (
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs font-bold text-amber-400">
                    {japaneseName}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(japaneseName)}
                    className="p-1 text-zinc-400 hover:text-amber-400 rounded transition-colors cursor-pointer"
                    title="Ouvir pronúncia"
                    aria-label={`Ouvir pronúncia de ${japaneseName}`}
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
              )}
            </div>
            <h3 id="video-modal-title" className="text-sm sm:text-lg font-bold text-white mt-1 break-words line-clamp-1 sm:line-clamp-none">
              {title}
            </h3>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0 pt-1 sm:pt-0 border-t border-zinc-800/60 sm:border-0">
            {/* Abas Alternáveis */}
            <div className="flex items-center bg-zinc-800 p-0.5 sm:p-1 rounded-xl border border-zinc-700">
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-amber-500 text-zinc-950 shadow font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
                aria-selected={activeTab === 'video'}
              >
                <Video size={13} aria-hidden="true" />
                <span>Vídeo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ficha')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'ficha'
                    ? 'bg-amber-500 text-zinc-950 shadow font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
                aria-selected={activeTab === 'ficha'}
              >
                <Layers size={13} aria-hidden="true" />
                <span>Ficha</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(techId)}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                isFavorite(techId)
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
              }`}
              title="Favoritar técnica"
              aria-label="Favoritar técnica"
            >
              <Bookmark size={15} />
            </button>

            <a 
              href={youtubeWatchUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
              title="Abrir no YouTube (Nova Aba)"
            >
              <ExternalLink size={13} aria-hidden="true" />
              <span>YouTube</span>
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Fechar Janela"
              aria-label="Fechar vídeo"
            >
              <X size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Status de Auditoria do Vídeo se estiver em validação */}
        {isExternalInValidation && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-amber-300 shrink-0">
            <span className="font-semibold flex items-center gap-1.5">
              <Info size={14} className="text-amber-400 shrink-0" />
              Vídeo de referência externa em validação editorial
            </span>
            <span className="text-[11px] text-zinc-400">Origem: {auditedVideo?.channel || 'Acervo Externo'}</span>
          </div>
        )}

        {/* Conteúdo Principal do Modal */}
        {activeTab === 'video' ? (
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Player Iframe 16:9 Responsivo Completo */}
            <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
              {!embedError ? (
                <iframe
                  src={embedSrc}
                  title={`Vídeo demonstrativo oficial de ${title} (${japaneseName || ''})`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onError={() => setEmbedError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-900 text-zinc-200">
                  <AlertTriangle className="text-amber-500 mb-2" size={32} />
                  <p className="text-sm font-bold text-white mb-1">
                    Este vídeo não permite reprodução direta dentro do aplicativo.
                  </p>
                  <p className="text-xs text-zinc-400 mb-4 max-w-md">
                    Você pode assistir à demonstração oficial diretamente no YouTube em nova aba segura.
                  </p>
                  <a
                    href={youtubeWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition-transform active:scale-95 shadow-md"
                  >
                    <ExternalLink size={14} />
                    <span>Abrir no YouTube</span>
                  </a>
                </div>
              )}
            </div>

            {/* Descrição / Instruções Técnicas Rápidas */}
            <div className="p-4 sm:p-5 bg-zinc-900/70 text-xs sm:text-sm text-zinc-200 border-t border-zinc-800/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                  Objetivo Técnico & Contexto (Gokyo)
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href={youtubeWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:hidden flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                  >
                    <ExternalLink size={12} />
                    <span>Abrir no YouTube</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleAddToReview}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-amber-400 transition-colors cursor-pointer"
                  >
                    {addedToReview ? <CheckCircle2 size={13} className="text-emerald-400" /> : <PlusCircle size={13} />}
                    <span>{addedToReview ? 'Adicionado!' : 'Revisar Depois'}</span>
                  </button>
                </div>
              </div>
              <p className="leading-relaxed text-zinc-300">{detailedSheet.technicalObjective}</p>
              <p className="text-xs text-zinc-400"><strong>Distância e Oportunidade:</strong> {detailedSheet.contextAndDistance}</p>
            </div>
          </div>
        ) : (
          /* Ficha Biomecânica Pedagógica Estruturada */
          <div className="p-4 sm:p-6 md:p-8 bg-zinc-900/90 overflow-y-auto space-y-5 text-zinc-200 flex-1">
            {/* Objetivo e Contexto */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                1. Objetivo Técnico & 2. Contexto de Combate
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">{detailedSheet.technicalObjective}</p>
              <p className="text-xs text-zinc-400"><strong>Distância e Timing:</strong> {detailedSheet.contextAndDistance}</p>
            </div>

            {/* Fases Clássicas: Kuzushi, Tsukuri e Kake */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Info size={14} /> As 3 Fases Biomecânicas Clássicas do Judô
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <strong className="text-amber-300 block font-bold">1. Kuzushi (崩し):</strong>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Quebra de Equilíbrio</span>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">{detailedSheet.kuzushi}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <strong className="text-amber-300 block font-bold">2. Tsukuri (作り):</strong>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Encaixe Corporal</span>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">{detailedSheet.tsukuri}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <strong className="text-amber-300 block font-bold">3. Kake (掛け):</strong>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Execução & Projeção</span>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">{detailedSheet.kake}</p>
                </div>
              </div>

              {/* Continuidade e Zanshin (Seção Complementar) */}
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                <strong className="text-emerald-400 block font-bold mb-1">Continuidade & Zanshin (残心 - Atenção e Equilíbrio Final):</strong>
                <p className="text-zinc-300 leading-relaxed text-[11px]">{detailedSheet.continuityZanshin}</p>
              </div>
            </div>

            {/* Ukemi, Segurança e Erros Comuns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                  Ukemi & Preservação do Uke (Salvaguarda)
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">{detailedSheet.ukemiAndSafety}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  Erros Comuns de Execução
                </span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {detailedSheet.commonMistakes.map((err, i) => (
                    <li key={i} className="text-[11px] leading-tight">• {err}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Aviso Regulatório e Idade Recomendada se for sensível */}
            {detailedSheet.regulatoryNotice && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> Aviso Regulatório e Recomendação Etária
                </span>
                <p className="text-zinc-200 leading-relaxed text-[11px]">{detailedSheet.regulatoryNotice}</p>
                {detailedSheet.ruleSubjectToUpdateNotice && (
                  <p className="text-amber-300 text-[10px] italic">{detailedSheet.ruleSubjectToUpdateNotice}</p>
                )}
              </div>
            )}

            {/* Ficha de Metadados Editoriais */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-zinc-400">
              <div>
                <strong className="text-zinc-300 block">Autor / Origem Editorial:</strong>
                <span>{detailedSheet.author || 'Equipe Dojo Digital'}</span>
              </div>
              <div>
                <strong className="text-zinc-300 block">Revisão Técnica e Salvaguarda:</strong>
                <span>{detailedSheet.technicalReviewer || 'Sensei Revisor Kodokan/CBJ'}</span>
              </div>
              <div>
                <strong className="text-zinc-300 block">Última Revisão:</strong>
                <span>{detailedSheet.revisionDate} (Versão {detailedSheet.version || '3.0.0'})</span>
              </div>
              <div>
                <strong className="text-zinc-300 block">Status Editorial:</strong>
                <span className="uppercase text-emerald-400 font-bold">{detailedSheet.status || 'publicado'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="px-4 sm:px-6 py-3 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 border-t border-zinc-900 shrink-0">
          <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
            Revisão de Segurança: {detailedSheet.revisionDate}
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleAddToReview}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-colors cursor-pointer text-center text-xs"
            >
              {addedToReview ? '✓ Adicionado aos Flashcards' : '+ Revisar Técnica'}
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};


