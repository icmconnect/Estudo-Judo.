import React, { useState } from 'react';
import { X, ShieldCheck, Download, Trash2, HardDrive, AlertTriangle, FileText, Lock } from 'lucide-react';
import { userRepository } from '../repositories/UserRepository';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataCleared?: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, onDataCleared }) => {
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      const jsonString = await userRepository.exportUserData();
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dojo_digital_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportMessage('Dados exportados com sucesso em formato JSON!');
      setTimeout(() => setExportMessage(null), 4000);
    } catch (err) {
      console.error('Erro ao exportar dados:', err);
    }
  };

  const handleClearData = async () => {
    try {
      await userRepository.clearUserData();
      setIsConfirmingClear(false);
      if (onDataCleared) onDataCleared();
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('Erro ao apagar dados:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">Privacidade & Armazenamento Local</h3>
              <p className="text-xs text-zinc-400 mt-1">Transparência total e controle de dados no seu dispositivo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300">
          
          {/* Card Informativo do Modo Dispositivo */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
            <HardDrive size={22} className="text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-emerald-300 text-sm">Modo de Armazenamento Local (Dispositivo)</h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                O Dojo Digital opera por padrão em <strong>modo de armazenamento local e privativo</strong>. Seus dados de perfil, progresso de aulas, favoritos, anotações do caderno técnico, histórico de quizzes, diário de treino e certificados emitidos ficam salvos <strong>exclusivamente neste dispositivo e navegador (localStorage)</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-zinc-950/60 border border-emerald-500/20 text-[11px] text-zinc-300 space-y-1">
                <strong className="text-emerald-400 block font-bold">Limitações do Modo Local:</strong>
                <p>• A sincronização automática entre múltiplos dispositivos ou celulares requer conta em nuvem futuramente.</p>
                <p>• Ao limpar o cache ou histórico do navegador, os dados não exportados serão perdidos.</p>
              </div>
            </div>
          </div>

          {/* Alerta Importante para Menores e Responsáveis Legal */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-amber-300 text-sm">Proteção de Menores e Gestão de Consentimento</h4>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                <strong>Aviso Legal Importante:</strong> O modo de armazenamento local não é adequado para gerenciar consentimentos formais e jurídicos de responsáveis por menores de idade.
              </p>
              <ul className="text-[11px] text-amber-200/80 space-y-1 list-disc pl-4">
                <li>Coletamos apenas a <strong>faixa etária</strong> (ex: 12-14, 15-17) para fins exclusivamente pedagógicos, sem solicitar a data de nascimento completa.</li>
                <li>Não há chat aberto, rede social ou compartilhamento público de anotações técnicas de praticantes menores.</li>
                <li>Futuramente, no modo em nuvem com Firebase, o consentimento de pais/responsáveis será autenticado via e-mail e persistido com registros auditáveis no banco de dados.</li>
              </ul>
            </div>
          </div>

          {/* Diretrizes da LGPD / Privacidade */}
          <div className="space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Lock size={16} className="text-amber-400" />
              Seus Direitos de Privacidade e Controle
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <li className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-start gap-2">
                <FileText size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sem Cookies Rastreadores:</strong> Não utilizamos cookies de rastreamento de terceiros nem perfilamento publicitário.</span>
              </li>
              <li className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-start gap-2">
                <HardDrive size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sua Posse Total:</strong> Você possui 100% de controle sobre o seu caderno técnico e pode exportá-lo a qualquer momento em JSON ou Markdown.</span>
              </li>
            </ul>
          </div>

          {exportMessage && (
            <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center animate-fade-in">
              {exportMessage}
            </div>
          )}

          {/* Ações de Exportação e Apagar Dados */}
          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Ações de Gerenciamento de Dados</h4>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <Download size={16} />
                <span>Exportar Meus Dados (JSON)</span>
              </button>

              {!isConfirmingClear ? (
                <button
                  onClick={() => setIsConfirmingClear(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 border border-zinc-700 hover:border-rose-500/40 font-bold text-xs transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                  <span>Apagar Meus Dados Deste Dispositivo</span>
                </button>
              ) : (
                <div className="flex-1 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 flex flex-col gap-2">
                  <p className="text-xs text-rose-200 font-bold">
                    Tem certeza? Isso apagará permanentemente seu progresso e anotações deste navegador.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearData}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      Sim, Apagar Tudo
                    </button>
                    <button
                      onClick={() => setIsConfirmingClear(false)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs cursor-pointer transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500">
          <span>Dojo Digital v3.0 • Proteção de Dados Local</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
