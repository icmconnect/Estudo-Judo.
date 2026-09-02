import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ShieldCheck, ArrowRight, Video, BookOpen, Layers, Award } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { PLANS_DATA } from '../data/plansData';

export const PricingSection: React.FC = () => {
  const { user } = useAuth();
  const { isActive } = useSubscription();
  const navigate = useNavigate();

  const freePlan = PLANS_DATA[0];
  const founderPlan = PLANS_DATA[1];

  const handleFreeAction = () => {
    if (!user) {
      navigate('/login?redirect=/app');
    } else {
      navigate('/app');
    }
  };

  return (
    <section className="w-full py-8 space-y-10" id="planos">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400">
          <Sparkles size={13} />
          <span>Acesso Seguro e Transparente</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-100 tracking-tight">
          Planos e Modalidades de Acesso
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Sem mensalidades ocultas ou renovações automáticas. Escolha entre explorar gratuitamente ou garantir o acesso completo com pagamento único.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        {/* CARD 1: PLANO GRATUITO */}
        <div className="flex flex-col justify-between bg-zinc-950/70 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 hover:border-zinc-700 transition-all shadow-lg relative">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300">
                Modalidade de Entrada
              </span>
              <h3 className="text-2xl font-black text-zinc-100">{freePlan.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {freePlan.description}
              </p>
            </div>

            <div className="py-4 border-y border-zinc-900 space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-zinc-100">R$ 0,00</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold">
                Sem cartão. Explore conteúdos selecionados.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                O que você pode acessar:
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                {freePlan.entitlements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-md bg-zinc-800 text-zinc-400 shrink-0 mt-0.5">
                      <Check size={13} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="button"
              onClick={handleFreeAction}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-98 text-zinc-200 font-bold text-sm border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <span>{user ? 'Acessar conteúdos grátis' : 'Conheça grátis'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* CARD 2: PLANO FUNDADOR (DESTAQUE) */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-zinc-950 via-zinc-950 to-amber-950/20 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 hover:border-amber-400 transition-all shadow-2xl relative overflow-hidden">
          {/* Badge superior */}
          <div className="absolute top-0 right-0">
            <div className="bg-amber-500 text-zinc-950 text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wider">
              Mais Recomendado
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-black text-amber-300">
                Acesso Completo
              </span>
              <h3 className="text-2xl font-black text-zinc-100">{founderPlan.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {founderPlan.description}
              </p>
            </div>

            <div className="py-4 border-y border-zinc-800/80 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400">R$ 97,00</span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                  pagamento único
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Sem mensalidades recorrentes • Pagamento com Pix ou Cartão
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Acesso irrestrito a todos os módulos:
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-200">
                {founderPlan.entitlements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-md bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Check size={13} className="stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col items-center gap-3">
            <CheckoutButton className="w-full" buttonText="Pagar com Pix ou cartão" />
            <p className="text-[11px] text-zinc-500 text-center leading-normal">
              * Acesso liberado automaticamente via confirmação segura do Stripe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
