import React from 'react';
import { X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function LiveAppModal({ app, onClose }) {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-strong rounded-2xl p-5 border border-white/90 max-w-lg w-full shadow-2xl relative text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 flex items-center justify-center text-lg font-bold shadow-md shadow-[#96a01d]/30">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {app.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  {app.environment}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {app.category}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live URL Endpoint Box */}
        <div className="glass rounded-xl p-3 border border-white/80 space-y-2 mb-4 bg-white/70">
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>Production URL</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> SSL Active
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 font-mono text-xs text-slate-900 bg-white p-2 rounded-lg border border-slate-200">
            <span className="truncate">{app.url}</span>
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-[#96a01d] hover:bg-[#a8b422] text-slate-950 font-extrabold text-[10px] flex items-center gap-1 shrink-0 shadow-xs"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Real-time Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="glass-card rounded-lg p-2 border border-white/80">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Uptime</span>
            <span className="text-sm font-extrabold text-emerald-700">{app.uptime}</span>
          </div>
          <div className="glass-card rounded-lg p-2 border border-white/80">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Latency</span>
            <span className="text-sm font-extrabold text-slate-900">{app.latency}</span>
          </div>
          <div className="glass-card rounded-lg p-2 border border-white/80">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Users</span>
            <span className="text-sm font-extrabold text-slate-900">{app.activeUsers}</span>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Production Features
          </span>
          <div className="flex flex-wrap gap-1.5">
            {app.features?.map((f, i) => (
              <span key={i} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white/80 text-slate-800 border border-slate-200/70 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-white/60"
          >
            Close
          </button>
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-md shadow-[#96a01d]/35 flex items-center gap-1.5"
          >
            <span>Open Application</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
