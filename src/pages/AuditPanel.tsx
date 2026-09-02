import React, { useState } from 'react';
import { AUDITED_VIDEOS, getAudioVisualAuditSummary } from '../data/videoAuditData';
import { EDITORIAL_SOURCES as EDITORIAL_SOURCES_LIST } from '../data/editorialSources';
import { VideoMetadata, VideoOriginType } from '../types';
import { ShieldCheck, Video, Search, Filter, AlertTriangle, CheckCircle2, Clock, FileText, ExternalLink, RefreshCw, BookOpen } from 'lucide-react';

export const AuditPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'fontes' | 'editorial'>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [originFilter, setOriginFilter] = useState<string>('todos');

  const summary = getAudioVisualAuditSummary();

  const filteredVideos = AUDITED_VIDEOS.filter(video => {
    const matchesSearch =
      video.techniqueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.techniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'todos' || video.validationStatus === statusFilter;

    const matchesOrigin =
      originFilter === 'todos' || video.origin === originFilter;

    return matchesSearch && matchesStatus && matchesOrigin;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cabeçalho da Central Editorial */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
              <ShieldCheck size={16} /> Central de Curadoria Editorial & Auditoria
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Painel de Auditoria Audiovisual & Fontes (3.0.0)
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Gestão de integridade das 100 técnicas do Gokyo, 139 mídias de demonstração, direções pedagógicas e referências oficiais da CBJ/IJF.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-2xl border border-zinc-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'videos'
                  ? 'bg-amber-500 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Video size={14} />
              <span>Auditoria Mídias ({summary.total})</span>
            </button>
            <button
              onClick={() => setActiveTab('fontes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'fontes'
                  ? 'bg-amber-500 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen size={14} />
              <span>Fontes e Revisões ({EDITORIAL_SOURCES_LIST.length})</span>
            </button>
          </div>
        </div>

        {/* Resumo Métrico de Auditoria de Vídeos */}
        {activeTab === 'videos' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Total de Vídeos Mapeados</span>
                <div className="text-2xl font-black text-white">{summary.total}</div>
                <span className="text-[11px] text-zinc-500 block">Acervo Gokyo + Arbitragem</span>
              </div>

              <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Canal Confirmado
                </span>
                <div className="text-2xl font-black text-emerald-400">{summary.confirmados}</div>
                <span className="text-[11px] text-zinc-500 block">Kodokan / IJF Academy / CBJ</span>
              </div>

              <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Clock size={12} /> Em Validação
                </span>
                <div className="text-2xl font-black text-amber-400">{summary.aValidar}</div>
                <span className="text-[11px] text-zinc-500 block">Referências Externas Identificadas</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Data da Última Auditoria</span>
                <div className="text-sm font-bold text-zinc-200 mt-2">{summary.auditDate}</div>
                <span className="text-[11px] text-zinc-500 block">{summary.auditorResponsible}</span>
              </div>
            </div>

            {/* Barra de Busca e Filtros */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar por técnica, canal ou ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="a_validar">A Validar</option>
                    <option value="em_revisao">Em Revisão</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Origem:</span>
                  <select
                    value={originFilter}
                    onChange={e => setOriginFilter(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
                  >
                    <option value="todos">Todas as Origens</option>
                    <option value="Canal oficial confirmado">Canal Oficial Confirmado</option>
                    <option value="Incorporação permitida">Incorporação Permitida</option>
                    <option value="Referência a validar">Referência a Validar</option>
                    <option value="Apenas link externo">Apenas Link Externo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabela de Resultados de Auditoria */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 uppercase font-extrabold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">ID / Técnica</th>
                      <th className="p-4">Status & Origem</th>
                      <th className="p-4">Canal / Fonte</th>
                      <th className="p-4">Tipo de Uso & Licença</th>
                      <th className="p-4">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredVideos.map(v => (
                      <tr key={v.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="p-4 font-mono">
                          <span className="text-amber-400 font-bold block">{v.techniqueId}</span>
                          <span className="text-white font-sans font-semibold text-xs">{v.techniqueName}</span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase w-fit ${
                                v.validationStatus === 'confirmado'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {v.validationStatus === 'confirmado' ? '✓ Confirmado' : '⚡ A Validar'}
                            </span>
                            <span className="text-[11px] text-zinc-400">{v.origin}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="text-zinc-200 font-medium block">{v.channel}</span>
                          <span className="text-[10px] text-zinc-500">Resp: {v.editorialResponsible}</span>
                        </td>

                        <td className="p-4">
                          <span className="text-zinc-300 block">{v.usageType}</span>
                          <span className="text-[10px] text-zinc-400 block truncate max-w-xs">{v.license}</span>
                        </td>

                        <td className="p-4">
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs transition-colors"
                          >
                            <ExternalLink size={12} />
                            Assistir
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Tab de Fontes e Revisões Editoriais */}
        {activeTab === 'fontes' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="text-amber-400" size={20} /> Painel de Fontes Editoriais e Normas Técnicas
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Todas as fichas técnicas, vídeos, regras de arbitragem e diretrizes de salvaguarda do Dojo Digital são estritamente ancorados em fontes pedagógicas oficiais reconhecidas pela comunidade internacional e nacional do Judô.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {EDITORIAL_SOURCES_LIST.map(src => (
                  <div key={src.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                        {src.entity}
                      </span>
                      <span className="text-[11px] text-zinc-500">Versão {src.version} ({src.publicationYear})</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{src.title}</h3>
                    <p className="text-xs text-zinc-400">{src.notes}</p>

                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>Licença: {src.license}</span>
                      <a
                        href={src.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        Fonte Oficial <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
