import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw, Volume2, CheckCircle2, Bookmark, FileText, Sparkles, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import { ReviewItem } from '../types';
import { useAccessibility } from '../hooks/useAccessibility';

interface ReviewCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewItem[];
  onCompleteReview: (id: string) => void;
  onToggleFavorite: (sourceId: string) => void;
  isFavorite: (sourceId: string) => boolean;
  onSaveNote: (sourceId: string, text: string) => void;
  getNote: (sourceId: string) => string;
}

export const ReviewCenterModal: React.FC<ReviewCenterModalProps> = ({
  isOpen,
  onClose,
  reviews,
  onCompleteReview,
  onToggleFavorite,
  isFavorite,
  onSaveNote,
  getNote
}) => {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const { speakText } = useAccessibility();

  if (!isOpen) return null;

  const handleSelectReview = (item: ReviewItem) => {
    setSelectedReview(item);
    setIsFlipped(false);
    setNoteText(getNote(item.sourceId));
    setIsEditingNote(false);
  };

  const handleCompleteCurrent = () => {
    if (!selectedReview) return;
    onCompleteReview(selectedReview.id);
    setSelectedReview(null);
  };

  const handleSaveNoteSubmit = () => {
    if (!selectedReview) return;
    onSaveNote(selectedReview.sourceId, noteText);
    setIsEditingNote(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <RotateCcw size={18} />
            </span>
            <div className="min-w-0">
              <h3 id="review-modal-title" className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">
                Revisão Inteligente & Flashcards
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate">
                Ciclos pedagógicos espaçados (1, 7, 15 e 30 dias) para fixação motora
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!selectedReview ? (
            /* Lista de Itens Pendentes */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Itens na Fila de Repetição Espaçada ({reviews.length})
                </h4>
              </div>

              {reviews.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Revisões em dia!</p>
                  <p className="text-xs text-zinc-500">Quando você errar questões no quiz ou marcar técnicas, elas aparecerão aqui.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reviews.map((item) => {
                    const isDue = new Date(item.nextReviewDate).getTime() <= Date.now() + 3600000;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectReview(item)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          isDue
                            ? 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/40'
                            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                              {item.category}
                            </span>
                            <h5 className="text-sm font-bold text-zinc-900 dark:text-white mt-1.5">{item.title}</h5>
                            {item.japaneseTitle && (
                              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{item.japaneseTitle}</p>
                            )}
                          </div>
                          {isDue && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-zinc-950 shrink-0">
                              Revisar Hoje
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                          <span>Ciclo: {item.intervalDays} dias</span>
                          <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                            Abrir Flashcard <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Modo Flashcard Interativo */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  ← Voltar para a lista
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(selectedReview.sourceId)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isFavorite(selectedReview.sourceId)
                        ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'
                    }`}
                    title="Favoritar Técnica"
                  >
                    <Bookmark size={16} />
                  </button>
                  <button
                    onClick={() => setIsEditingNote(!isEditingNote)}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    title="Anotação Pessoal"
                  >
                    <FileText size={16} />
                  </button>
                </div>
              </div>

              {/* Card Fliping */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full min-h-[260px] p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between shadow-lg select-none ${
                  !isFlipped
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white'
                    : 'bg-zinc-50 dark:bg-zinc-900 border-amber-500/40 text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {!isFlipped ? (
                  /* Frente do Flashcard */
                  <div className="space-y-4 my-auto text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-zinc-950">
                      {selectedReview.category}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-white">{selectedReview.title}</h4>
                    {selectedReview.japaneseTitle && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-bold text-amber-400">{selectedReview.japaneseTitle}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(selectedReview.japaneseTitle || selectedReview.title);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
                          title="Ouvir Pronúncia em Japonês"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-zinc-400 pt-4">Toque no card para virar e ver a explicação técnica e segurança</p>
                  </div>
                ) : (
                  /* Verso do Flashcard */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                        Orientações Pedagógicas & Segurança
                      </span>
                      <span className="text-xs text-zinc-400">Toque para desvirar</span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                      {selectedReview.securityTip ? (
                        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 flex items-start gap-2">
                          <ShieldCheck size={18} className="shrink-0 mt-0.5 text-rose-600" />
                          <div>
                            <strong className="block font-bold">Ponto Crítico de Segurança:</strong>
                            {selectedReview.securityTip}
                          </div>
                        </div>
                      ) : (
                        <p className="text-zinc-600 dark:text-zinc-300">
                          Mantenha o Kuzushi fluido e aplique com coordenação de pegada e deslocamento natural.
                        </p>
                      )}

                      {getNote(selectedReview.sourceId) && (
                        <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                          <strong className="text-[11px] uppercase tracking-wider text-zinc-500 block mb-1">
                            Sua Anotação:
                          </strong>
                          <p className="text-xs italic text-zinc-700 dark:text-zinc-200">
                            "{getNote(selectedReview.sourceId)}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Editor de Anotações */}
              {isEditingNote && (
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <label className="block text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                    Minha Anotação Pessoal para este Conteúdo
                  </label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={2}
                    placeholder="Ex: No próximo treino presencial, pedir para o Sensei checar a posição do meu cotovelo..."
                    className="w-full p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingNote(false)}
                      className="px-3 py-1.5 text-xs text-zinc-500"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveNoteSubmit}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      Salvar Anotação
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedReview && (
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
            <span className="text-xs text-zinc-500">
              Próximo ciclo: {selectedReview.intervalDays === 1 ? '7 dias' : selectedReview.intervalDays === 7 ? '15 dias' : '30 dias'}
            </span>
            <button
              onClick={handleCompleteCurrent}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <CheckCircle2 size={15} />
              <span>Marcar como Revisado</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
