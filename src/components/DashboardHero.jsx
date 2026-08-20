import React from 'react';
import { ShieldCheck, Calendar, Code, Sparkles } from 'lucide-react';

export default function DashboardHero({ project }) {
  if (!project) return null;

  let stageLabel = 'Development';
  let progressPct = project.devProgress || 75;

  if (project.stage === 'testing') {
    stageLabel = 'Testing Phase';
    progressPct = project.testProgress || 92;
  } else if (project.stage === 'decision') {
    stageLabel = 'Decision Pending';
    progressPct = 96;
  } else if (project.stage === 'released') {
    stageLabel = 'Released to Production';
    progressPct = 100;
  }

  return (
    <div className="relative mb-3 group">
      {/* Background Soft Glow behind Card */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#96a01d]/20 via-[#a8b422]/10 to-[#96a01d]/20 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Main Glass Hero Container */}
      <div className="relative glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md overflow-hidden backdrop-blur-md">
        
        {/* Subtle Shimmer top highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative z-10">
          
          {/* Left Text Information */}
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.2 rounded-full bg-[#96a01d]/20 text-slate-900 border border-[#96a01d]/40 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                PROJECT WORKSPACE
              </span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white/80 text-slate-700 border border-white">
                Key: {project.key}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {project.name}
            </h1>

            <p className="text-[11px] text-slate-600 font-medium leading-normal line-clamp-1">
              {project.description}
            </p>

            {/* Quick Specs Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <div className="flex items-center gap-1 text-[11px] text-slate-700 glass px-2 py-0.5 rounded-md border border-white/80 font-medium">
                <Code className="w-3 h-3 text-amber-600" />
                <span>Developer: <strong className="text-slate-900">{project.developer}</strong></span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-700 glass px-2 py-0.5 rounded-md border border-white/80 font-medium">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>Build: <strong className="text-slate-900 font-mono">{project.version}</strong></span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-700 glass px-2 py-0.5 rounded-md border border-white/80 font-medium">
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>Target: <strong className="text-slate-900">{project.targetDate}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Progress Widget */}
          <div className="glass-card rounded-lg p-2.5 sm:p-3 border border-white/80 w-full lg:w-auto min-w-full sm:min-w-[230px] shrink-0 bg-white/70 backdrop-blur-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#96a01d] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#96a01d]"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 uppercase tracking-wide">
                  {stageLabel}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">
                {progressPct}%
              </span>
            </div>

            {/* Custom Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-white shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] rounded-full transition-all duration-400 shadow-xs shadow-[#96a01d]/40 relative"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-1.5 text-[9px] text-slate-500 font-bold">
              <span>Initiated</span>
              <span>QA Audit</span>
              <span>Deploy</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
