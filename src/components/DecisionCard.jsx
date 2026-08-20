import React, { useState } from 'react';
import { RotateCcw, Rocket, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function DecisionCard({ project, onRework, onRelease }) {
  const [reworkNotes, setReworkNotes] = useState('');
  const [showReworkModal, setShowReworkModal] = useState(false);

  if (!project) return null;

  return (
    <div className="glass-strong rounded-xl p-3.5 sm:p-5 border border-white/90 shadow-md relative overflow-hidden backdrop-blur-md mb-3 w-full text-center">
      {/* Reflective top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

      {/* Glow highlight effect */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-xs shadow-[#96a01d]/30 font-bold">
        <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
      </div>

      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 mb-1.5">
        Testing Completed ✓
      </div>

      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-1">
        What would you like to do?
      </h2>
      <p className="text-[11px] sm:text-xs text-slate-600 font-medium max-w-md mx-auto mb-4 leading-relaxed">
        Testing phase verified 23/25 test cases. Select whether to send back for bug fixes or proceed to production deployment.
      </p>

      {/* Decision Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch mb-3 text-left max-w-4xl mx-auto">
        
        {/* Card 1: REWORK */}
        <div className="glass-card rounded-xl p-3.5 border border-white/90 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 w-fit mb-2 border border-slate-200">
              <RotateCcw className="w-4 h-4" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              REWORK
            </h3>

            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed mb-3">
              Return to Development stage to address failed edge case tests or add requested feature modifications.
            </p>

            <div className="space-y-1 text-[10px] text-slate-500 font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Re-opens sprint task list</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Preserves existing test history</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowReworkModal(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs border border-slate-300/80 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[ Rework ]</span>
          </button>
        </div>

        {/* Card 2: RELEASE (Visually Dominant in #96a01d theme!) */}
        <div className="glass-theme rounded-xl p-3.5 border-2 border-[#96a01d]/70 flex flex-col justify-between relative shadow-sm shadow-[#96a01d]/20 scale-[1.005] transform transition-all hover:scale-[1.01]">
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-[#96a01d] text-[8px] font-extrabold tracking-wider uppercase shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#96a01d]" />
              RECOMMENDED
            </span>
          </div>

          <div>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 w-fit mb-2 shadow-xs shadow-[#96a01d]/35 font-bold">
              <Rocket className="w-4 h-4" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              RELEASE
            </h3>

            <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed mb-3">
              Deploy version <strong className="font-mono text-slate-950 font-extrabold">{project.releaseVersion || 'v1.0.0'}</strong> directly to Production environment with zero downtime.
            </p>

            <div className="space-y-1 text-[10px] text-slate-900 font-bold mb-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Production Security Audit Passed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Generates Live SSL Application Card</span>
              </div>
            </div>
          </div>

          <button
            onClick={onRelease}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/35 hover:scale-[1.005] active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 group min-h-[44px]"
          >
            <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>[ Release Application ]</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Rework Modal Dialog (Mobile Bottom Sheet) */}
      {showReworkModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-3 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
          <div className="glass-strong rounded-t-3xl sm:rounded-2xl p-4 sm:p-5 border border-white/90 max-w-sm w-full shadow-2xl text-left">
            <h3 className="text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#96a01d]" />
              Return Project to Development
            </h3>
            <p className="text-xs text-slate-600 mb-2.5">
              Please enter brief rework comments or bug reports for the development team:
            </p>
            <textarea
              value={reworkNotes}
              onChange={(e) => setReworkNotes(e.target.value)}
              placeholder="e.g. Fix sub-pixel calculation offset in dashboard layout test..."
              className="w-full h-20 glass-input rounded-xl p-3 text-xs mb-3 text-slate-800"
            />
            <div className="flex items-center justify-end gap-2 pb-3 sm:pb-0">
              <button
                onClick={() => setShowReworkModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-white/60 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReworkModal(false);
                  onRework(reworkNotes);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-[#96a01d] font-extrabold text-xs shadow-xs hover:bg-slate-900 min-h-[44px] active:scale-95"
              >
                Confirm Rework
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

