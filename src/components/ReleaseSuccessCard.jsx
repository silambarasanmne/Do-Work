import React, { useEffect } from 'react';
import { Rocket, ExternalLink, RefreshCw, Layers, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReleaseSuccessCard({ 
  project, 
  onOpenApp, 
  onViewApplications, 
  onRestartCycle, 
  showToast 
}) {
  if (!project) return null;

  const liveUrl = `https://${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`;

  useEffect(() => {
    // Fire festive celebration confetti burst in theme #96a01d!
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#96a01d', '#a8b422', '#ffffff', '#7a8315']
    });
  }, []);

  return (
    <div className="glass-strong rounded-xl p-4 sm:p-6 border border-white/90 shadow-lg relative overflow-hidden backdrop-blur-md mb-3 text-center max-w-4xl mx-auto">
      {/* Reflective top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

      {/* Main Celebration Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#96a01d]/40 font-bold scale-105 animate-bounce">
        <Rocket className="w-8 h-8 stroke-[2.5]" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200 mb-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
        Production Deployment Successful
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
        🎉 Release Complete!
      </h2>

      <p className="text-xs text-slate-600 font-medium max-w-md mx-auto mb-4 leading-relaxed">
        <strong className="text-slate-900 font-bold">{project.name}</strong> version{' '}
        <strong className="font-mono text-slate-950 font-extrabold">{project.releaseVersion || 'v1.0.0'}</strong> is now live on Production servers with SSL security & real-time telemetry.
      </p>

      {/* Live Application URL Box */}
      <div className="max-w-md mx-auto glass-card rounded-xl p-2.5 border border-white/90 shadow-sm mb-4 text-left">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Production Application Endpoint
        </span>

        <div className="flex items-center justify-between gap-2 font-mono text-xs text-slate-900 bg-white/80 p-2 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-emerald-500">🔒</span>
            <span className="truncate font-bold">{liveUrl}</span>
          </div>

          <button
            onClick={() => onOpenApp(project)}
            className="px-2.5 py-1 rounded-md bg-[#96a01d] hover:bg-[#a8b422] text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shrink-0 transition-colors shadow-xs"
          >
            <span>Launch App</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Deployment Metadata Cards */}
      <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto mb-5 text-center">
        <div className="bg-white/60 p-2 rounded-lg border border-white/80">
          <span className="text-[9px] font-bold text-slate-400 block uppercase">Status</span>
          <span className="text-xs font-extrabold text-emerald-600 flex items-center justify-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            Healthy
          </span>
        </div>
        <div className="bg-white/60 p-2 rounded-lg border border-white/80">
          <span className="text-[9px] font-bold text-slate-400 block uppercase">Latency</span>
          <span className="text-xs font-extrabold text-slate-900 font-mono">24ms</span>
        </div>
        <div className="bg-white/60 p-2 rounded-lg border border-white/80">
          <span className="text-[9px] font-bold text-slate-400 block uppercase">Security</span>
          <span className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-0.5">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            Verified
          </span>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
        <button
          onClick={() => onOpenApp(project)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-md shadow-[#96a01d]/35 hover:scale-[1.01] active:scale-95 min-h-[44px] transition-all flex items-center justify-center gap-1.5"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Launch Live App</span>
        </button>

        <button
          onClick={onViewApplications}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs border border-slate-200 shadow-xs active:scale-95 min-h-[44px] transition-all flex items-center justify-center gap-1.5"
        >
          <Layers className="w-4 h-4 text-slate-600" />
          <span>View Apps Gallery</span>
        </button>

        <button
          onClick={onRestartCycle}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-[#96a01d] font-extrabold text-xs shadow-md active:scale-95 min-h-[44px] transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4 text-[#96a01d]" />
          <span>Start v1.1.0 Sprint</span>
        </button>
      </div>

    </div>
  );
}
