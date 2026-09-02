import React, { useState } from 'react';
import { X, Award, Printer, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { IssuedCertificate } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onGenerateCert: (name: string, track: string, hours: number) => IssuedCertificate;
  existingCertificates: IssuedCertificate[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  completedLessonsCount,
  totalLessonsCount,
  onGenerateCert,
  existingCertificates
}) => {
  const [customName, setCustomName] = useState(studentName || 'Judoca Dedicado');
  const [activeCert, setActiveCert] = useState<IssuedCertificate | null>(
    existingCertificates.length > 0 ? existingCertificates[0] : null
  );

  if (!isOpen) return null;

  const isEligible = completedLessonsCount >= 1; // Permite emitir após iniciar ou concluir módulos

  const handleIssue = () => {
    const cert = onGenerateCert(
      customName.trim() || 'Judoca Dedicado',
      'Trilha de Formação Integral em Judô & Fundamentos Kodokan',
      Math.max(12, Math.round(completedLessonsCount * 1.5))
    );
    setActiveCert(cert);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Award size={18} />
            </span>
            <div>
              <h3 id="certificate-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Certificado Digital de Conclusão Educacional
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Reconhecimento de dedicação aos estudos teóricos e biomecânicos
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!activeCert ? (
            <div className="space-y-4 max-w-lg mx-auto text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <Award size={32} />
              </div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                Emitir seu Certificado de Estudos
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Você concluiu <strong>{completedLessonsCount} aulas</strong> no Dojo Digital. Confirme seu nome completo para emissão do comprovante com código verificador único.
              </p>

              <div className="text-left space-y-1.5 pt-2">
                <label className="block text-xs font-bold uppercase text-zinc-500">Nome do Judoca no Certificado</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-900 dark:text-white"
                  placeholder="Nome completo..."
                />
              </div>

              <button
                onClick={handleIssue}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Gerar Certificado Digital Oficial
              </button>
            </div>
          ) : (
            /* Layout do Certificado */
            <div className="space-y-6">
              <div className="p-8 sm:p-10 rounded-3xl border-4 border-double border-amber-500/60 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 text-center space-y-5 shadow-xl relative overflow-hidden">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                    PLATAFORMA DOJO DIGITAL • ENSINO KODOKAN
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif font-black text-zinc-900 dark:text-white tracking-wide">
                    CERTIFICADO DE CONCLUSÃO
                  </h4>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Certificamos que o(a) praticante
                </p>

                <div className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400 border-b border-amber-500/40 pb-2 max-w-md mx-auto">
                  {activeCert.studentName}
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto">
                  completou com êxito a <strong>{activeCert.trackName}</strong>, com carga horária de estudo de <strong>{activeCert.completedHours} horas</strong>, abrangendo história, filosofia do Budo, etiqueta e biomecânica do Judô.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
                  <div>
                    <span>Data de Emissão: </span>
                    <strong className="text-zinc-700 dark:text-zinc-300">{activeCert.issueDate}</strong>
                  </div>
                  <div>
                    <span>Código Autenticador: </span>
                    <strong className="text-amber-600 dark:text-amber-400 font-mono">{activeCert.verificationCode}</strong>
                  </div>
                </div>
              </div>

              {/* Disclaimer Obrigatório */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-[11px] text-amber-900 dark:text-amber-300">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Termo de Esclarecimento Técnico:</strong> {activeCert.disclaimer}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          {activeCert ? (
            <button
              onClick={() => setActiveCert(null)}
              className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              ← Alterar Nome
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {activeCert && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-sm"
              >
                <Printer size={14} />
                <span>Imprimir / Salvar PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
