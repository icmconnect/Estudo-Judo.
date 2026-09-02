import React from 'react';
import { Download, Smartphone, X, Share2, PlusSquare, CheckCircle, Info } from 'lucide-react';
import { usePwaInstall } from '../hooks/usePwaInstall';

export const InstallAppButton: React.FC = () => {
  const {
    canInstall,
    isStandalone,
    isIos,
    isDismissed,
    showIosModal,
    setShowIosModal,
    triggerInstall,
    dismissPrompt
  } = usePwaInstall();

  // Não renderizar se já estiver em modo standalone ou se não puder instalar e não estiver em iOS
  if (isStandalone || (!canInstall && !isIos) || isDismissed) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={triggerInstall}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 text-xs font-black shadow-sm transition-all cursor-pointer border border-amber-400/80 shrink-0"
        title="Instalar Dojo Digital no seu celular ou computador"
        aria-label="Instalar aplicativo Dojo Digital"
      >
        <Download size={14} className="stroke-[2.5]" aria-hidden="true" />
        <span className="hidden xs:inline">Instalar app</span>
      </button>

      {/* Modal Educativo de Instalação no iPhone / iPad (iOS Safari) */}
      {showIosModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
        >
          <div
            className="absolute inset-0"
            onClick={() => setShowIosModal(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-white z-10 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Smartphone size={22} />
                </div>
                <div>
                  <h3 id="ios-install-title" className="text-base font-bold text-zinc-100">
                    Instalar Dojo Digital no iOS
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Acesso rápido e tela cheia no iPhone ou iPad
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Passo a Passo Ilustrado */}
            <div className="space-y-3 text-xs bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-zinc-200 flex items-center gap-1.5">
                    Toque em Compartilhar <Share2 size={13} className="text-sky-400" />
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    Na barra de navegação inferior do Safari do seu iPhone/iPad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-zinc-200 flex items-center gap-1.5">
                    Selecione "Adicionar à Tela de Início" <PlusSquare size={13} className="text-emerald-400" />
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    Role a lista de opções para baixo até encontrar o botão com ícone de "+".
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-zinc-200 flex items-center gap-1.5">
                    Confirme tocando em "Adicionar" <CheckCircle size={13} className="text-amber-400" />
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    No canto superior direito da janela do Safari. O app será criado na sua tela!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={dismissPrompt}
                className="text-xs text-zinc-400 hover:text-zinc-200 font-medium underline cursor-pointer"
              >
                Não mostrar por 7 dias
              </button>

              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
