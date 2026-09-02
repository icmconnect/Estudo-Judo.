import React, { useState } from 'react';
import { X, Sparkles, Target, Clock, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { UserProfile, AgeGroup, JudoGrade, MainGoal, InterestTopic } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (profile: Partial<UserProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(currentProfile.name || '');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(currentProfile.ageGroup || '18-39');
  const [grade, setGrade] = useState<JudoGrade>(currentProfile.grade || 'Branca (6º Kyu)');
  const [mainGoal, setMainGoal] = useState<MainGoal>(currentProfile.mainGoal || 'fundamentos');
  const [weeklyHours, setWeeklyHours] = useState<number>(currentProfile.weeklyHours || 3);
  const [interests, setInterests] = useState<InterestTopic[]>(
    currentProfile.interests || ['fundamentos', 'recreativo']
  );

  if (!isOpen) return null;

  const toggleInterest = (val: InterestTopic) => {
    setInterests((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));
  };

  const handleSave = () => {
    onSaveProfile({
      name: name.trim() || 'Judoca Praticante',
      ageGroup,
      grade,
      mainGoal,
      weeklyHours,
      interests
    });
    onClose();
  };

  // Trilha recomendada calculada
  const getRecommendedTrack = () => {
    if (ageGroup === '12-14') return 'Trilha Juvenil & Formação Inicial (12–14 anos)';
    if (ageGroup === '15-17') return 'Trilha Cadete & Transição Técnica (15–17 anos)';
    if (ageGroup === 'veteranos') return 'Trilha Longevidade, Mobilidade & Masters (40+ anos)';
    if (mainGoal === 'competicao') return 'Trilha Alta Performance & Arbitragem CBJ/IJF';
    if (mainGoal === 'kata') return 'Trilha Tradição & Katas Oficiais Kodokan';
    return 'Trilha Geral de Fundamentos & Gokyo do Judoca (18–39 anos)';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 id="onboarding-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Plano de Estudos Personalizado
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Passo {step} de 3 — Adapte seu ritmo e objetivos no tatame
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Como gostaria de ser chamado(a)?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Pedro Silva"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Sua Faixa Etária (Trilha Pedagógica)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: '12-14', label: '12 a 14 anos', desc: 'Sub-13 / Sub-15 (Formação)' },
                    { id: '15-17', label: '15 a 17 anos', desc: 'Sub-18 (Cadete)' },
                    { id: '18-39', label: '18 a 39 anos', desc: 'Sênior / Adulto' },
                    { id: 'veteranos', label: '40+ anos', desc: 'Veteranos / Longevidade' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAgeGroup(item.id as AgeGroup)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        ageGroup === item.id
                          ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white'
                          : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{item.label}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Sua Graduação Atual no Judô
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as JudoGrade)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Branca (6º Kyu)">Faixa Branca (Iniciante)</option>
                  <option value="Cinza (5º Kyu)">Faixa Cinza</option>
                  <option value="Azul (4º Kyu)">Faixa Azul</option>
                  <option value="Amarela (3º Kyu)">Faixa Amarela</option>
                  <option value="Laranja (2º Kyu)">Faixa Laranja</option>
                  <option value="Verde (1º Kyu)">Faixa Verde</option>
                  <option value="Roxa">Faixa Roxa</option>
                  <option value="Marrom">Faixa Marrom</option>
                  <option value="Preta (1º Dan+)">Faixa Preta / Yudansha (1º Dan+)</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Qual é o seu objetivo principal de estudo agora?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'fundamentos', label: 'Dominar Fundamentos e Ukemis (Quedas Seguras)', icon: ShieldCheck },
                    { id: 'exame_faixa', label: 'Preparação para Exame de Faixa (Gokyo)', icon: Target },
                    { id: 'competicao', label: 'Competição, Tática e Arbitragem CBJ/IJF', icon: Target },
                    { id: 'kata', label: 'Estudo dos Katas Oficiais e Filosofia Kodokan', icon: Sparkles },
                    { id: 'longevidade_recreativo', label: 'Saúde, Longevidade e Judô Recreativo', icon: Clock }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMainGoal(item.id as MainGoal)}
                        className={`w-full p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                          mainGoal === item.id
                            ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white'
                            : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                        }`}
                      >
                        <span className={`p-2 rounded-lg ${mainGoal === item.id ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                          <Icon size={16} />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold flex-1">{item.label}</span>
                        {mainGoal === item.id && <Check size={16} className="text-amber-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Tempo Semanal Estimado de Estudo Digital
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 5, 8].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setWeeklyHours(hours)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        weeklyHours === hours
                          ? 'bg-amber-500 text-zinc-950 border-amber-500'
                          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      {hours}h / sem
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                  Áreas de Maior Interesse (Múltipla Escolha)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'filosofia', label: 'História & Filosofia do Budo' },
                    { id: 'recreativo', label: 'Técnicas de Nage-waza (Gokyo)' },
                    { id: 'kata', label: 'Katas Tradicionais Kodokan' },
                    { id: 'arbitragem', label: 'Regras de Arbitragem CBJ / IJF' },
                    { id: 'competicao', label: 'Táticas de Combate & Pegada' },
                    { id: 'condicionamento', label: 'Judô Longevidade & Ne-waza' }
                  ].map((item) => {
                    const isSelected = interests.includes(item.id as any);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInterest(item.id as any)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                            : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box de Recomendação de Trilha */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles size={13} /> Trilha Recomendada com base no seu perfil
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{getRecommendedTrack()}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Meta calculada: <strong>{Math.max(2, Math.round(weeklyHours * 1.5))} aulas por semana</strong> (~{Math.round((weeklyHours * 60) / 5)} min/dia) + revisões espaçadas no tatame.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <span>Avançar</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Check size={15} />
              <span>Salvar e Ativar Meu Plano</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
