import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Heart, 
  ChevronDown, 
  Star, 
  Users, 
  Check, 
  Zap, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  Smile, 
  Compass, 
  Flame,
  Sun,
  Moon,
  GraduationCap
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { useTheme } from '../hooks/useTheme';

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: '1. Meu filho nunca praticou Judô. O Dojo Digital é adequado para iniciantes absolutos?',
      a: 'Sim, absolutamente! A plataforma foi desenhada passo a passo, começando do zero absoluto: ensinamos desde a etiqueta de entrada no dojô, como amarrar a faixa (obi), saudações (rei-ho) e técnicas de como cair com total segurança (ukemi) até os primeiros golpes da faixa branca e cinza.'
    },
    {
      q: '2. O Dojo Digital substitui as aulas presenciais no tatame com o Sensei?',
      a: 'Não substitui, e sim potencializa! O Dojo Digital funciona como o livro didático interativo e guia oficial de apoio. Ele acelera o aprendizado das crianças, permitindo que elas revisem os nomes em japonês, a ordem dos golpes do Gokyo e os fundamentos em casa com os pais antes de cada treino e exame.'
    },
    {
      q: '3. A partir de qual idade uma criança pode começar a usar a plataforma?',
      a: 'A partir dos 4 anos de idade. Temos o módulo infantil completo que aborda a primeira graduação (Faixa Branca/Cinza - 11º Kyu), com linguagem simples, foco em valores humanos, disciplina, higiene e respeito à família.'
    },
    {
      q: '4. O pagamento é mensalidade ou taxa única?',
      a: 'É PAGAMENTO ÚNICO! Não cobramos mensalidades, anuidades ou assinaturas recorrentes. Você paga uma única vez e seu filho garante acesso vitalício a todos os módulos atuais e futuras atualizações da plataforma.'
    },
    {
      q: '5. O conteúdo ajuda meu filho a se preparar para os exames de faixa da federação?',
      a: 'Sim! Toda a grade curricular do Dojo Digital é 100% alinhada ao Regulamento Nacional de Graus da CBJ (Confederação Brasileira de Judô) e do Instituto Kodokan do Japão. Mostramos exatamente o que é exigido em cada faixa: vocabulário, golpes, quedas e histórico.'
    },
    {
      q: '6. Como o Judô e a plataforma ajudam crianças tímidas ou com dificuldades de foco?',
      a: 'O Judô é reconhecido pela UNESCO como um dos esportes mais completos para a infância. Através dos princípios de Seiryoku Zen\'yo (Melhor Uso da Energia) e Jita Kyoei (Prosperidade Mútua), a criança desenvolve foco motor, autocontrole emocional, autoconfiança contra o bullying e respeito ao próximo.'
    },
    {
      q: '7. Como funciona a garantia de 7 dias?',
      a: 'Você tem 7 dias de garantia incondicional com risco zero. Se por qualquer motivo você ou seu filho não ficarem encantados com as aulas e a plataforma, basta nos enviar um único e-mail e devolveremos 100% do seu dinheiro sem perguntas.'
    },
    {
      q: '8. Podemos acessar pelo celular, tablet, computador ou televisão?',
      a: 'Sim! A plataforma é totalmente responsiva e compatível com smartphones (Android e iPhone), tablets, notebooks e Smart TVs via navegador web. Os vídeos carregam rápido e a interface se adapta perfeitamente.'
    },
    {
      q: '9. Os vídeos e técnicas ensinados são seguros para crianças praticarem em casa?',
      a: 'Nosso material enfatiza constantemente a segurança e o autocuidado. As crianças aprendem em casa a teoria, as posturas e os nomes dos golpes. Enfatizamos que as projeções corporais devem ser executadas no dojô sobre tatames adequados e com o professor presente.'
    },
    {
      q: '10. Já sou aluno ou já comprei, como faço para entrar no sistema?',
      a: 'Basta clicar no botão "Já tenho acesso" no canto superior direito da página ou no botão "Entrar no Sistema". Você será direcionado imediatamente para a área do aluno sem complicação!'
    }
  ];

  const beltStages = [
    { name: 'Branca / Cinza', kyu: '11º Kyu (4 anos)', color: 'bg-zinc-200 text-zinc-800 border-zinc-300' },
    { name: 'Cinza', kyu: '10º Kyu (5 anos)', color: 'bg-zinc-400 text-zinc-950 border-zinc-500' },
    { name: 'Azul', kyu: '8º Kyu (7 anos)', color: 'bg-blue-600 text-white border-blue-700' },
    { name: 'Amarela', kyu: '6º Kyu (9 anos)', color: 'bg-amber-400 text-zinc-950 border-amber-500' },
    { name: 'Laranja', kyu: '4º Kyu (11 anos)', color: 'bg-orange-500 text-white border-orange-600' },
    { name: 'Verde', kyu: '3º Kyu (12 anos)', color: 'bg-emerald-600 text-white border-emerald-700' },
    { name: 'Roxa', kyu: '2º Kyu (13 anos)', color: 'bg-purple-600 text-white border-purple-700' },
    { name: 'Marrom', kyu: '1º Kyu (14 anos)', color: 'bg-amber-900 text-white border-amber-950' },
    { name: 'Preta (Sho Dan)', kyu: '1º Dan (16+ anos)', color: 'bg-zinc-950 text-amber-400 border-zinc-800' }
  ];

  const moralVirtues = [
    { title: 'Cortesia', jp: 'Reigi', desc: 'Respeito e gentileza com colegas, professores e pais.' },
    { title: 'Coragem', jp: 'Yuuki', desc: 'Fazer o que é certo e vencer o medo de errar.' },
    { title: 'Sinceridade', jp: 'Magokoro', desc: 'Falar sempre a verdade com pureza no coração.' },
    { title: 'Honra', jp: 'Eiyo', desc: 'Ser fiel à palavra dada e manter conduta limpa.' },
    { title: 'Modéstia', jp: 'Kenson', desc: 'Falar de si sem arrogância e aprender sempre.' },
    { title: 'Respeito', jp: 'Keii', desc: 'A base da confiança e do carinho no tatame.' },
    { title: 'Autocontrole', jp: 'Gaman', desc: 'Dominar as emoções e a impulsividade com calma.' },
    { title: 'Amizade', jp: 'Yuujou', desc: 'O sentimento mais puro que une todos os judocas.' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#07090E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors">
      
      {/* ========================================================================= */}
      {/* NAVBAR SUPERIOR ELEGANTE */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size="md" showSubtitle={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-700 dark:text-zinc-300">
            <a href="#beneficios" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Para Crianças</a>
            <a href="#gokyo" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Catálogo Gokyo</a>
            <a href="#virtudes" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Código Moral</a>
            <a href="#precos" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Preço Único</a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Dúvidas (FAQ)</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-zinc-600 hover:bg-zinc-100 rounded-xl dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Alternar tema claro/escuro"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
            </button>

            {/* BOTÃO JÁ TENHO ACESSO REQUISITADO */}
            <Link
              to="/capitulo/introducao"
              className="px-4 sm:px-5 py-2.5 rounded-xl border-2 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Lock size={15} aria-hidden="true" />
              <span>Já tenho acesso</span>
            </Link>

            <a
              href="#precos"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-sm shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Zap size={16} className="fill-current" />
              <span>Começar Agora</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION - FOCO EM CRIANÇAS E PAIS (ALTO NÍVEL VISUAL) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-zinc-200 dark:border-zinc-800/60">
        {/* Fundo com gradiente sutil nas cores da marca */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Coluna de Texto & Proposta de Valor */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Badge de Destaque */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-6 shadow-xs">
                <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>O Dojo Digital Oficial do Seu Filho • Da Branca à Preta</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white uppercase font-['Bebas_Neue',sans-serif] tracking-tight leading-[1.05] mb-6">
                Formando <span className="text-emerald-700 dark:text-emerald-400 underline decoration-amber-500 decoration-wavy decoration-2">Campeões na Vida</span> e no Tatame com a Sabedoria do Judô
              </h1>

              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed max-w-2xl font-normal">
                A plataforma didática mais completa do Brasil para crianças e jovens praticantes. Aprenda os <strong>fundamentos, história, código moral das 8 virtudes e mais de 100 técnicas do Gokyo Kodokan</strong> com vídeos oficiais e metodologia lúdica e segura.
              </p>

              {/* Botões de Ação Principal */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
                <Link
                  to="/planos"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-base text-center shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles size={20} className="fill-current" />
                  <span>Liberar acesso completo — R$ 97,00</span>
                </Link>

                <Link
                  to="/capitulo/introducao"
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-bold text-base text-center transition-all flex flex-col items-center justify-center shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-emerald-600" />
                    <span>Conheça grátis</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Sem cartão. Explore conteúdos selecionados.
                  </span>
                </Link>
              </div>

              {/* Prova Social & Selos de Confiança */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">100% Pedagógico</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Padrão Oficial CBJ & Kodokan</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Heart size={16} className="text-rose-500 fill-current" />
                  <span>Ideal para Crianças e Pais</span>
                </div>
              </div>

            </div>

            {/* Coluna Visual do Player / Card Interativo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Moldura de Vídeo Decorativa */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 bg-zinc-950 text-white">
                  <div className="aspect-video relative flex items-center justify-center bg-zinc-900 group cursor-pointer" onClick={() => setShowVideoModal(true)}>
                    <img 
                      src="https://img.youtube.com/vi/FWoXF9nQw1U/maxresdefault.jpg" 
                      alt="Boas-vindas ao Dojo Digital" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center shadow-xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
                        <Play size={28} className="fill-current ml-1" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        Assistir Apresentação Oficial
                      </span>
                    </div>
                  </div>

                  {/* Detalhes do Card */}
                  <div className="p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black">
                        柔
                      </div>
                      <div>
                        <h4 className="text-sm font-bold leading-tight">Dojo Digital • Ensino Kodokan</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">100+ Aulas em Vídeo & Catálogo</p>
                      </div>
                    </div>

                    <Link
                      to="/capitulo/introducao"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                    >
                      Acessar
                    </Link>
                  </div>
                </div>

                {/* Card Flutuante com Estatísticas */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black">
                    <Award size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-500 dark:text-zinc-400">Currículo Completo</span>
                    <span className="text-sm font-black text-zinc-900 dark:text-white">6 Módulos + Gokyo 100%</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO DE BENEFÍCIOS PARA CRIANÇAS & FAMÍLIA */}
      {/* ========================================================================= */}
      <section id="beneficios" className="py-20 bg-white dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Desenvolvimento Infantil & Juvenil
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] mt-4 tracking-tight">
              Mais que uma Luta: Uma Escola de Valores para o Futuro do Seu Filho
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-3">
              Segundo a UNESCO, o Judô é a melhor atividade física inicial para crianças de 4 a 14 anos, promovendo educação psicomotora e formação cívica integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-amber-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smile size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Autoconfiança & Antibullying</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Crianças confiantes não praticam e não aceitam bullying. O Judô ensina a postura ereta, o equilíbrio e a coragem necessária para se defender pacificamente.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Foco e Disciplina Escolar</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A prática dos rituais de silêncio e atenção plena (Mokuso) desenvolve a concentração, refletindo diretamente em melhores notas e foco nos estudos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-amber-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Aprender a Cair com Segurança</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Com o domínio dos Ukemis (quedas amortecidas), a criança protege a cabeça e articulações contra acidentes no dia a dia, brincadeiras e esportes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Respeito aos Pais e Mestres</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A hierarquia e a etiqueta japonesa (Rei-ho) ensinam a valorizar a autoridade dos pais, a paciência e a cooperação mútua dentro de casa.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-amber-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Preparo para Exames de Faixa</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Acabe com a insegurança antes do exame de graduação. Seu filho memoriza com facilidade os nomes em japonês e os golpes obrigatórios da sua faixa.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Socialização & Amizade Pura</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sob o princípio do Jita Kyoei (Prosperidade Mútua), os pequenos judocas aprendem que não existem inimigos, e sim parceiros essenciais para evoluir.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO TRILHA DE FAIXAS (DO 11º KYU À FAIXA PRETA) */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Progressão Pedagógica Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] mt-4 tracking-tight">
              A Jornada das Faixas: Um Passo de Cada Vez
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Conheça as graduações contempladas na plataforma com requisitos de idade, carência e técnicas da CBJ:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {beltStages.map((belt, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-3 rounded-full mb-3 border ${belt.color} shadow-xs`}></div>
                <span className="text-xs font-black text-zinc-900 dark:text-white text-center leading-tight mb-1">
                  {belt.name}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
                  {belt.kyu}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO DO CÓDIGO MORAL (8 VIRTUDES DO JUDÔ) */}
      {/* ========================================================================= */}
      <section id="virtudes" className="py-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Filosofia & Caráter
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] mt-4 tracking-tight">
              O Código Moral das 8 Virtudes
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Pilares ensinados em cada aula do Dojo Digital para formar seres humanos íntegros e admiráveis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moralVirtues.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {v.jp}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">0{idx + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1.5">{v.title}</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO DO GOKYO INTERATIVO (100+ TÉCNICAS) */}
      {/* ========================================================================= */}
      <section id="gokyo" className="py-20 bg-white dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-4">
                Enciclopédia Completa em Vídeo
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] tracking-tight mb-6">
                Mais de 100 Técnicas Oficiais do Gokyo Kodokan Catalogadas
              </h2>
              <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                Tenha na palma da mão a biblioteca técnica definitiva com vídeos em alta resolução dos maiores mestres da Kodokan:
              </p>

              <ul className="space-y-3 mb-8 w-full text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><strong>Tachi-Waza:</strong> Te-waza (Braços), Koshi-waza (Quadril), Ashi-waza (Pernas).</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><strong>Sutemi-Waza:</strong> Ma-sutemi (Sacrifício Frontal) e Yoko-sutemi (Lateral).</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><strong>Katame-Waza:</strong> Imobilizações (Osae), Estrangulamentos (Shime) e Chaves (Kansetsu).</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><strong>Katas Sagrados:</strong> Nage-no-Kata, Katame-no-Kata e Ju-no-Kata.</span>
                </li>
              </ul>

              <Link
                to="/capitulo/catalogo-gokyo"
                className="px-6 py-3.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black text-sm flex items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md"
              >
                <span>Acessar o Catálogo Gokyo</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-bold text-zinc-500">Filtro Rápido Gokyo</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {['Dai-Ikkyo (1º Grupo)', 'Dai-Nikyo (2º Grupo)', 'Dai-Sankyo (3º Grupo)', 'Dai-Yonkyo (4º Grupo)', 'Dai-Gokyo (5º Grupo)', 'Shinmeisho-no-Waza', 'Habukareta-Waza', 'Osaekomi-Waza', 'Katas Kodokan'].map((cat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-bold text-zinc-800 dark:text-zinc-200 text-center shadow-2xs">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO DE OFERTA E PREÇO ÚNICO (ONE-TIME PAYMENT) */}
      {/* ========================================================================= */}
      <section id="precos" className="py-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-[#090D16] dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
              Investimento Único • Sem Mensalidades
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] mt-4 tracking-tight">
              Garanta o Acesso Vitalício do Seu Filho
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-2">
              Acesso ilimitado e vitalício a todos os materiais, vídeos e atualizações futuras.
            </p>
          </div>

          {/* CARD DE PREÇO ÚNICO DESTACADO */}
          <div className="max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-3xl border-2 border-emerald-600 dark:border-emerald-500 shadow-2xl overflow-hidden text-left relative transform hover:scale-[1.01] transition-all">
            
            {/* Tag no topo */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-2.5 px-4 text-xs font-black uppercase tracking-widest">
              🔥 Oferta Especial de Lançamento • Pagamento Único
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] tracking-wide">
                    Plano Dojo Digital Completo
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Acesso Vitalício Familiar para Crianças e Pais</p>
                </div>
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black rounded-lg uppercase">
                  Vitalício
                </span>
              </div>

              {/* Preço */}
              <div className="my-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-sm text-zinc-500 line-through block mb-1">De R$ 297,00</span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Por apenas</span>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-700 dark:text-emerald-400">R$ 97</span>
                  <span className="text-xs font-bold text-zinc-500">à vista</span>
                </div>
                <span className="block text-xs font-bold text-amber-700 dark:text-amber-400 mt-2">
                  Ou até 12x de R$ 9,68 no cartão
                </span>
              </div>

              {/* O que está incluso */}
              <div className="space-y-3.5 mb-8">
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">O Que Você Recebe Imediatamente:</span>
                
                {[
                  'Acesso Vitalício e Ilimitado a todos os 6 Módulos do Curso',
                  'Módulo Dojo Seguro: 10 Regras de Ouro, Prevenção e Salvaguarda',
                  'Módulo Arbitragem CBJ / IJF: Ippon, Waza-ari, Shido e Hansoku-make',
                  'Trilhas Adaptadas por Faixa Etária (12-14, 15-17, 18-39 e 40+ Veteranos)',
                  'Enciclopédia Completa do Gokyo com mais de 100 Técnicas em Vídeo',
                  'Fichas Biomecânicas (Kuzushi, Tsukuri, Kake e Zanshin)',
                  'Simulados Interativos e Banco de Quizzes Pedagógicos',
                  'Módulo Completo do Código Moral (8 Virtudes) e Filosofia do Budo',
                  'Histórico do Mestre Jigoro Kano e Chegada do Judô ao Brasil',
                  'Controle Visual de Progresso de Aulas em Tempo Real',
                  'Garantia Incondicional de 7 Dias com Devolução Total',
                  'Suporte às Atualizações Futuras sem Nenhum Custo Adicional'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Botão de Checkout / Acesso */}
              <Link
                to="/planos"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-base uppercase text-center shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Liberar Acesso Completo — R$ 97,00</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-zinc-500 dark:text-zinc-400">
                <Lock size={12} />
                <span>Pagamento Seguro • Acesso Imediato Liberado</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO FAQ (10 PERGUNTAS E RESPOSTAS COMPLETAS) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Tire Suas Dúvidas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase font-['Bebas_Neue',sans-serif] mt-4 tracking-tight">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Tudo o que você precisa saber sobre o Dojo Digital e o aprendizado do seu filho:
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-expanded={openFaq === idx}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`shrink-0 text-zinc-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-emerald-600' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER OFICIAL COM OSSCONNECT & AVISO INSTITUCIONAL */}
      {/* ========================================================================= */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" showSubtitle={true} />
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link to="/capitulo/introducao" className="hover:text-amber-500 transition-colors">Acessar Aulas</Link>
            <Link to="/capitulo/catalogo-gokyo" className="hover:text-amber-500 transition-colors">Catálogo Gokyo</Link>
            <Link to="/login" className="hover:text-amber-500 transition-colors">Login</Link>
          </div>

          <div className="text-center md:text-right">
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              DOJO DIGITAL • Feito por <a href="https://ossconnect.com.br" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">OssConnect</a>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              Todos os direitos reservados. Judô Kodokan Tradicional.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-center text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
          <strong>Aviso Institucional & Pedagógico:</strong> O Dojo Digital é uma plataforma educacional independente desenvolvida para apoiar o estudo teórico, histórico e técnico do Judô. O treinamento prático de projeções e combate corporal deve ser supervisionado por professores qualificados em ambiente seguro. O projeto não possui afiliação formal com o Instituto Kodokan do Japão, CBJ ou FIJ, salvo indicação em contrário.
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL DE VÍDEO OFICIAL */}
      {/* ========================================================================= */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="w-full max-w-3xl bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <span className="text-sm font-bold text-white">Mensagem de Boas-Vindas • Dojo Digital</span>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold"
              >
                Fechar (Esc)
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/FWoXF9nQw1U?autoplay=1&rel=0&modestbranding=1"
                title="Apresentação Oficial Dojo Digital"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
