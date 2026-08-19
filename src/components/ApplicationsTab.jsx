import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Search } from 'lucide-react';

export default function ApplicationsTab({ applications, onOpenAppModal, showToast }) {
  const [search, setSearch] = useState('');
  const [filterEnv, setFilterEnv] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Copied URL', `${url} copied to clipboard`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                          app.url.toLowerCase().includes(search.toLowerCase()) ||
                          app.category.toLowerCase().includes(search.toLowerCase());
    const matchesEnv = filterEnv === 'all' || app.environment.toLowerCase() === filterEnv.toLowerCase();
    return matchesSearch && matchesEnv;
  });

  return (
    <div className="space-y-4 animate-in fade-in w-full">
      
      {/* Header Bar with Search & Filter */}
      <div className="glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Production Applications
            </h2>
            <span className="px-2 py-0.2 rounded-full bg-[#96a01d]/25 text-slate-950 text-[10px] font-extrabold border border-[#96a01d]/40">
              {filteredApps.length} Deployed
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Live SaaS platforms and active cloud deployments</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications..."
              className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 font-medium min-h-[36px]"
            />
          </div>

          {/* Environment Filter */}
          <div className="flex items-center gap-1 glass p-0.5 rounded-lg text-xs bg-white/70">
            <button
              onClick={() => setFilterEnv('all')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterEnv === 'all' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterEnv('production')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterEnv === 'production' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Production
            </button>
            <button
              onClick={() => setFilterEnv('staging')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterEnv === 'staging' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Staging
            </button>
          </div>

        </div>
      </div>

      {/* Full-Width Grid: 1 col mobile, 2 col tablet, 3 col desktop, 4 col ultra-wide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="glass-card rounded-xl p-3.5 border border-white/90 shadow-md flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Reflective top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

            <div>
              {/* Header with icon and name */}
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 flex items-center justify-center text-sm shadow-xs shadow-[#96a01d]/30 group-hover:scale-105 transition-transform font-bold">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight group-hover:text-[#7a8315] transition-colors leading-tight">
                      {app.name}
                    </h3>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {app.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border shadow-xs ${
                  app.environment === 'Production'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-[#96a01d]/25 text-slate-950 border-[#96a01d]/40'
                }`}>
                  {app.environment}
                </span>
              </div>

              {/* Specs Table */}
              <div className="glass rounded-lg p-2 space-y-1 mb-2.5 border border-white/70 text-[10px] bg-white/70">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">Version</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-1 py-0.2 rounded border border-slate-200 text-[9px]">
                    {app.version}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">Environment</span>
                  <span className="font-semibold text-slate-900">{app.environment}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">Release Date</span>
                  <span className="font-semibold text-slate-900">{app.releaseDate}</span>
                </div>
              </div>

              {/* Key Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-1 mb-2.5 text-center">
                <div className="bg-white/50 p-1 rounded border border-white/70">
                  <span className="text-[8px] text-slate-500 block font-medium">Uptime</span>
                  <span className="text-[10px] font-extrabold text-emerald-700">{app.uptime}</span>
                </div>
                <div className="bg-white/50 p-1 rounded border border-white/70">
                  <span className="text-[8px] text-slate-500 block font-medium">Latency</span>
                  <span className="text-[10px] font-extrabold text-slate-900">{app.latency}</span>
                </div>
                <div className="bg-white/50 p-1 rounded border border-white/70">
                  <span className="text-[8px] text-slate-500 block font-medium">Users</span>
                  <span className="text-[10px] font-extrabold text-slate-900">{app.activeUsers}</span>
                </div>
              </div>

              {/* Application Link Input Box */}
              <div className="glass-input rounded-md p-1 flex items-center justify-between gap-1 border border-white/90 shadow-xs mb-3 text-[10px] font-mono">
                <span className="truncate text-slate-800 pl-1 font-medium">
                  {app.url.replace('https://', '')}
                </span>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={() => handleCopyUrl(app.url, app.id)}
                    className="p-1 rounded bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 min-h-[30px] min-w-[30px] flex items-center justify-center"
                    title="Copy URL"
                  >
                    {copiedId === app.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Opening Link', `Redirecting to ${app.url}`, 'info');
                    }}
                    className="p-1 rounded bg-[#96a01d]/25 hover:bg-[#96a01d]/40 text-slate-950 border border-[#96a01d]/50 min-h-[30px] min-w-[30px] flex items-center justify-center"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

            {/* Main Action Button */}
            <button
              onClick={() => onOpenAppModal(app)}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/30 hover:scale-[1.005] active:scale-95 transition-all duration-200 flex items-center justify-center gap-1 group min-h-[44px]"
            >
              <span>[ Open Application ]</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
