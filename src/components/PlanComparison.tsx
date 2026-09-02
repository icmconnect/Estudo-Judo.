import React from 'react';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  category: string;
  free: boolean | string;
  founder: boolean | string;
  note?: string;
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: 'Acesso à Plataforma e Catálogo',
    category: 'Geral',
    free: 'Acesso Básico',
    founder: 'Acesso Completo'
  },
  {
    name: 'Navegação sem limite de tempo',
    category: 'Geral',
    free: true,
    founder: true,
    note: 'Livre navegação sem cronômetro artificial'
  },
  {
    name: 'Glossário Ilustrado com Termos em Japonês',
    category: 'Conteúdo',
    free: true,
    founder: true
  },
  {
    name: 'Aulas Introdutórias e Históricas (Preview)',
    category: 'Conteúdo',
    free: 'Selecionadas',
    founder: '100% Liberadas'
  },
  {
    name: 'Arsenal Técnico e os 5 Grupos do Gokyo (40 técnicas)',
    category: 'Técnico',
    free: 'Demonstrativo (4 técnicas)',
    founder: '40 Técnicas Oficiais'
  },
  {
    name: 'Acervo dos 139 Vídeos Técnicos e Pedagógicos',
    category: 'Técnico',
    free: false,
    founder: true
  },
  {
    name: 'Fichas Biomecânicas (Kuzushi, Tsukuri, Kake, Zanshin)',
    category: 'Técnico',
    free: false,
    founder: true
  },
  {
    name: 'Formação Teórica Autoral em 6 Trilhas',
    category: 'Formação',
    free: 'Trilha 1 (Intro)',
    founder: '6 Trilhas Completas'
  },
  {
    name: 'Quizzes, Flashcards e Revisão Espaçada',
    category: 'Estudo',
    free: 'Amostra básica',
    founder: true
  },
  {
    name: 'Caderno Técnico e Diário de Treino Presencial',
    category: 'Ferramentas',
    free: false,
    founder: true
  },
  {
    name: 'Cenários de Arbitragem com Regras CBJ / IJF',
    category: 'Arbitragem',
    free: false,
    founder: true
  },
  {
    name: 'Certificados Internos de Horas Formativas',
    category: 'Certificação',
    free: false,
    founder: true,
    note: 'Comprovação formativa interna complementar'
  }
];

export const PlanComparison: React.FC = () => {
  return (
    <div className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300">
          <Sparkles size={13} className="text-amber-400" />
          <span>Comparativo Detalhado de Recursos</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
          Escolha a modalidade ideal para o seu treino
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Conheça os conteúdos abertos do Plano Gratuito ou acelere seus estudos com a biblioteca integral do Plano Fundador.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-xs sm:text-sm">
              <th className="py-4 px-3 sm:px-4 text-zinc-400 font-semibold w-1/2">
                Funcionalidade / Conteúdo
              </th>
              <th className="py-4 px-3 sm:px-4 text-center text-zinc-300 font-bold w-1/4 bg-zinc-900/40 rounded-t-xl">
                Plano Gratuito
                <span className="block text-[11px] font-normal text-zinc-500 mt-0.5">R$ 0,00</span>
              </th>
              <th className="py-4 px-3 sm:px-4 text-center text-amber-400 font-black w-1/4 bg-amber-500/10 rounded-t-xl border-t border-x border-amber-500/30">
                Plano Fundador
                <span className="block text-[11px] font-bold text-amber-300/80 mt-0.5">R$ 97,00 (único)</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-xs sm:text-sm">
            {COMPARISON_FEATURES.map((feat, index) => (
              <tr key={index} className="hover:bg-zinc-900/30 transition-colors">
                <td className="py-3.5 px-3 sm:px-4 text-zinc-300">
                  <div className="font-medium text-zinc-200">{feat.name}</div>
                  {feat.note && (
                    <div className="text-[11px] text-zinc-500 mt-0.5">{feat.note}</div>
                  )}
                </td>
                
                {/* Coluna Plano Gratuito */}
                <td className="py-3.5 px-3 sm:px-4 text-center bg-zinc-900/20">
                  {typeof feat.free === 'boolean' ? (
                    feat.free ? (
                      <Check size={18} className="text-emerald-400 mx-auto" aria-label="Incluso" />
                    ) : (
                      <X size={18} className="text-zinc-600 mx-auto" aria-label="Não incluso" />
                    )
                  ) : (
                    <span className="text-xs text-zinc-400 font-medium">{feat.free}</span>
                  )}
                </td>

                {/* Coluna Plano Fundador */}
                <td className="py-3.5 px-3 sm:px-4 text-center bg-amber-500/5 font-semibold text-zinc-100 border-x border-amber-500/20">
                  {typeof feat.founder === 'boolean' ? (
                    feat.founder ? (
                      <Check size={18} className="text-amber-400 mx-auto stroke-[2.5]" aria-label="Incluso" />
                    ) : (
                      <X size={18} className="text-zinc-600 mx-auto" aria-label="Não incluso" />
                    )
                  ) : (
                    <span className="text-xs text-amber-300 font-bold">{feat.founder}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-start gap-2 text-[11px] text-zinc-400">
        <ShieldCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Nota institucional importante:</strong> O certificado interno do Dojo Digital comprova cumprimento de horas formativas em plataforma educacional digital e <strong>não equivale a exame técnico oficial de graduação, homologação de faixa ou credenciamento federativo (CBJ / Federações Estaduais / Kodokan)</strong>.
        </span>
      </div>
    </div>
  );
};
