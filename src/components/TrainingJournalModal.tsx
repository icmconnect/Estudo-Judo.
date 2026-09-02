import React, { useState } from 'react';
import { X, Calendar, Plus, MapPin, Clock, Star, Trash2, HeartPulse, Check, Shield } from 'lucide-react';
import { TrainingJournalEntry } from '../types';

interface TrainingJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: TrainingJournalEntry[];
  onAddEntry: (entry: Omit<TrainingJournalEntry, 'id' | 'createdAt'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const TrainingJournalModal: React.FC<TrainingJournalModalProps> = ({
  isOpen,
  onClose,
  entries,
  onAddEntry,
  onDeleteEntry
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('Dojo Principal');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [techniquesInput, setTechniquesInput] = useState('');
  const [effortRating, setEffortRating] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [injuriesOrDiscomfort, setInjuriesOrDiscomfort] = useState('');
  const [senseiObservations, setSenseiObservations] = useState('');
  const [nextLessonGoal, setNextLessonGoal] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techniquesStudied = techniquesInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddEntry({
      date,
      location,
      durationMinutes: Number(durationMinutes) || 60,
      techniquesStudied: techniquesStudied.length > 0 ? techniquesStudied : ['Ukemis gerais', 'Randori'],
      effortRating,
      injuriesOrDiscomfort,
      senseiObservations,
      nextLessonGoal,
      privateNotes
    });

    setShowAddForm(false);
    setTechniquesInput('');
    setInjuriesOrDiscomfort('');
    setSenseiObservations('');
    setNextLessonGoal('');
    setPrivateNotes('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Calendar size={18} />
            </span>
            <div>
              <h3 id="journal-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Diário de Treino Presencial
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Conecte os estudos digitais com sua evolução no tatame real
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Histórico de Treinos ({entries.length})
            </h4>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-sm"
            >
              <Plus size={14} />
              <span>{showAddForm ? 'Cancelar' : 'Registrar Novo Treino'}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h5 className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">Novo Registro no Tatame</h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Data</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Local / Academia</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Dojo Central"
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Duração (minutos)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    min={15}
                    max={300}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  Técnicas Estudadas (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={techniquesInput}
                  onChange={(e) => setTechniquesInput(e.target.value)}
                  placeholder="Ex: O-soto-gari, Ushiro-ukemi, Hon-kesa-gatame"
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  Sensação de Esforço / Intensidade (1 a 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setEffortRating(level as any)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                        effortRating >= level
                          ? 'bg-amber-500 text-zinc-950 border-amber-500'
                          : 'bg-white dark:bg-zinc-950 text-zinc-500 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      Nível {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                    Dores ou Desconfortos Físicos Relatados
                  </label>
                  <input
                    type="text"
                    value={injuriesOrDiscomfort}
                    onChange={(e) => setInjuriesOrDiscomfort(e.target.value)}
                    placeholder="Ex: Leve cansaço no ombro direito..."
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                    Feedback / Observação do Sensei
                  </label>
                  <input
                    type="text"
                    value={senseiObservations}
                    onChange={(e) => setSenseiObservations(e.target.value)}
                    placeholder="Ex: Melhorar a flexão de pernas no Tai-sabaki..."
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  Meta para a Próxima Aula Presencial
                </label>
                <input
                  type="text"
                  value={nextLessonGoal}
                  onChange={(e) => setNextLessonGoal(e.target.value)}
                  placeholder="Ex: Focar na tração contínua da manga no Kake..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                >
                  <Check size={14} />
                  <span>Salvar Treino</span>
                </button>
              </div>
            </form>
          )}

          {/* Lista de Registros */}
          <div className="space-y-3">
            {entries.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs">
                Nenhum treino registrado ainda. Clique em "Registrar Novo Treino" para começar!
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <Calendar size={13} />
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {entry.location} ({entry.durationMinutes} min)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        Intensidade: {entry.effortRating}/5
                      </span>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
                        title="Excluir Registro"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Técnicas */}
                  <div className="flex flex-wrap gap-1.5">
                    {entry.techniquesStudied.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Observações e Metas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200 dark:border-zinc-800/60">
                    {entry.senseiObservations && (
                      <p className="text-zinc-600 dark:text-zinc-400">
                        <strong className="text-zinc-800 dark:text-zinc-200">Sensei:</strong> {entry.senseiObservations}
                      </p>
                    )}
                    {entry.nextLessonGoal && (
                      <p className="text-amber-600 dark:text-amber-400">
                        <strong>Próxima Meta:</strong> {entry.nextLessonGoal}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
