import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

export const PaymentCanceledPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-zinc-900 text-zinc-400 flex items-center justify-center mx-auto border border-zinc-800">
          <AlertCircle size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Pagamento não concluído
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
            A transação foi cancelada ou interrompida. Nenhuma cobrança foi realizada no seu cartão ou conta bancária.
          </p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400 text-left space-y-1">
          <p className="font-semibold text-zinc-300">Você pode:</p>
          <p>• Tentar novamente escolhendo Pix ou outra bandeira de cartão.</p>
          <p>• Continuar utilizando os conteúdos e glossário do Plano Gratuito.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/planos')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Tentar novamente por R$ 97</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/app')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs border border-zinc-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Voltar ao conteúdo grátis</span>
          </button>
        </div>

        <div className="border-t border-zinc-800/80 pt-4">
          <a
            href="mailto:suporte@dojodigital.com.br?subject=Dúvida sobre pagamento cancelado"
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1"
          >
            <HelpCircle size={13} />
            <span>Dúvidas ou dificuldades técnicas? Fale com o suporte</span>
          </a>
        </div>
      </div>
    </div>
  );
};
