import React from 'react';
import { Wrench, TestTube, Rocket, CheckCircle2, Lock } from 'lucide-react';

export default function ProjectStatusCards({ project, currentStage, onStageClick }) {
  if (!project) return null;

  const isDevActive = currentStage === 'development';
  const isDevDone = currentStage !== 'development';

  const isTestingActive = currentStage === 'testing';
  const isTestingDone = currentStage === 'decision' || currentStage === 'released';

  const isReleaseActive = currentStage === 'decision' || currentStage === 'released';
  const isReleasedDone = currentStage === 'released';

  const cards = [
    {
      id: 'development',
      title: 'Development',
      icon: Wrench,
      progress: isDevDone ? '100%' : `${project.devProgress}%`,
      status: isDevDone ? 'Completed' : 'In Progress',
      subtext: isDevDone ? 'Build v0.9.4 Compiled' : 'Active Sprint',
      isActive: isDevActive,
      isDone: isDevDone,
      badgeBg: isDevDone ? 'bg-emerald-100 text-emerald-800' : 'bg-[#96a01d]/25 text-slate-950 font-extrabold border border-[#96a01d]/40'
    },
    {
      id: 'testing',
      title: 'Testing',
      icon: TestTube,
      progress: isTestingDone ? '100% Passed' : isTestingActive ? `${project.testProgress}%` : 'Pending',
      status: isTestingDone ? 'Passed' : isTestingActive ? 'In Progress' : 'Not Started',
      subtext: isTestingDone ? '23/25 Cases Verified' : isTestingActive ? 'Running Automated Specs' : 'Awaiting Dev Build',
      isActive: isTestingActive,
      isDone: isTestingDone,
      badgeBg: isTestingDone ? 'bg-emerald-100 text-emerald-800' : isTestingActive ? 'bg-[#96a01d]/25 text-slate-950 font-extrabold border border-[#96a01d]/40' : 'bg-slate-100 text-slate-600'
    },
    {
      id: 'released',
      title: 'Release',
      icon: Rocket,
      progress: isReleasedDone ? 'v1.0.0 Live' : currentStage === 'decision' ? 'Ready to Deploy' : 'Locked',
      status: isReleasedDone ? 'Released' : currentStage === 'decision' ? 'Pending Approval' : 'Waiting',
      subtext: isReleasedDone ? 'Production Target Met' : currentStage === 'decision' ? 'Decision Required' : 'Awaiting QA Sign-off',
      isActive: isReleaseActive,
      isDone: isReleasedDone,
      badgeBg: isReleasedDone ? 'bg-emerald-100 text-emerald-800' : currentStage === 'decision' ? 'bg-[#96a01d]/25 text-slate-950 font-extrabold border border-[#96a01d]/40' : 'bg-slate-100 text-slate-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            onClick={() => onStageClick && onStageClick(card.id)}
            className={`cursor-pointer rounded-xl p-3 sm:p-3.5 transition-all duration-200 relative overflow-hidden group active:scale-[0.98] ${
              card.isActive
                ? 'glass-active scale-[1.005] shadow-md border-[#96a01d]/60'
                : 'glass-card hover:-translate-y-0.5'
            }`}
          >
            {/* Reflective top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                card.isActive
                  ? 'bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 shadow-xs shadow-[#96a01d]/30 scale-105'
                  : card.isDone
                  ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200/60'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <span className={`text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/80 shadow-xs ${card.badgeBg}`}>
                {card.status}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                Stage 0{cards.findIndex(c => c.id === card.id) + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#7a8315] transition-colors flex items-center justify-between">
                {card.title}
                {card.isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />}
                {!card.isDone && !card.isActive && <Lock className="w-3.5 h-3.5 text-slate-400 inline" />}
              </h3>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between">
              <div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                  {card.progress}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium mt-0.5">
                  {card.subtext}
                </div>
              </div>

              {card.isActive && (
                <div className="w-2 h-2 rounded-full bg-[#96a01d] animate-ping" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
