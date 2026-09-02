import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { SubscriptionStatusCard } from '../components/SubscriptionStatusCard';

export const MySubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Dojo</span>
          </button>

          <a
            href="mailto:suporte@dojodigital.com.br?subject=Dúvida sobre Minha Assinatura"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <HelpCircle size={14} />
            <span>Suporte</span>
          </a>
        </div>

        <div className="flex justify-center">
          <SubscriptionStatusCard />
        </div>
      </div>
    </div>
  );
};
