import React, { useState } from 'react';
import { TechnicalNotebook } from '../components/TechnicalNotebook';
import { PrivacyModal } from '../components/PrivacyModal';
import { ShieldCheck, HardDrive, Lock } from 'lucide-react';

export function TechnicalNotebookPage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto pb-20 animate-fade-in">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <HardDrive size={14} className="text-emerald-400" />
          <span>Dados do perfil e caderno salvos neste dispositivo</span>
        </div>

        <button
          onClick={() => setIsPrivacyOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
        >
          <ShieldCheck size={14} />
          <span>Privacidade & Dados</span>
        </button>
      </div>

      <TechnicalNotebook />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
