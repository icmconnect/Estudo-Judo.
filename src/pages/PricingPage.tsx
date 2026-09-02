import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { PlanComparison } from '../components/PlanComparison';
import { ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Navigation */}
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
            href="mailto:suporte@dojodigital.com.br?subject=Dúvidas sobre planos do Dojo Digital"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <HelpCircle size={14} />
            <span>Dúvidas comerciais</span>
          </a>
        </div>

        {/* Pricing Cards */}
        <PricingSection />

        {/* Comparativo Detalhado */}
        <PlanComparison />

        {/* FAQ Rápido e Esclarecimentos */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <ShieldCheck size={20} className="text-amber-400" />
            Perguntas Frequentes sobre Pagamento e Acesso
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-300">
            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-100">Como funciona o pagamento único?</h4>
              <p className="text-zinc-400 leading-relaxed">
                Você paga R$ 97,00 uma única vez com Pix ou cartão de crédito. Não há mensalidades automáticas, cobranças recorrentes ou taxas surpresa.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-100">O que acontece após o pagamento?</h4>
              <p className="text-zinc-400 leading-relaxed">
                O Stripe processa a transação e envia a confirmação diretamente ao sistema. Seu acesso é liberado instantaneamente na sua conta.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-100">O certificado serve como faixa oficial de Judô?</h4>
              <p className="text-zinc-400 leading-relaxed">
                Não. O certificado do Dojo Digital comprova cumprimento de horas formativas em plataforma educacional. Exames técnicos de faixa, registros e graduações oficiais são prerrogativas exclusivas da Confederação Brasileira de Judô (CBJ), Federações Estaduais e do Instituto Kodokan.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-100">Posso continuar usando a versão gratuita?</h4>
              <p className="text-zinc-400 leading-relaxed">
                Sim! O plano gratuito permite navegar livremente pelo catálogo, assistir às aulas abertas e consultar o glossário sem restrição de tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
