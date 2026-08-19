import React from 'react';
import { Check } from 'lucide-react';

export default function WorkflowStepper({ currentStage, onStageClick }) {
  const stages = [
    { id: 'development', label: 'Development', desc: 'Code & Build' },
    { id: 'testing', label: 'Testing', desc: 'QA & Test Cases' },
    { id: 'decision', label: 'Release Decision', desc: 'Rework or Deploy' },
    { id: 'released', label: 'Release Success', desc: 'Production Live' }
  ];

  const getStageStatus = (stageId) => {
    const stageOrder = ['development', 'testing', 'decision', 'released'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="glass rounded-lg p-2 sm:p-2.5 mb-3 border border-white/80 shadow-xs bg-white/70 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[460px] sm:min-w-0 max-w-3xl mx-auto relative px-2 sm:px-3">
        
        {/* Progress bar line connecting nodes */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-3 h-0.5 bg-slate-200/80 rounded-full z-0 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] transition-all duration-300 shadow-xs"
            style={{
              width: 
                currentStage === 'development' ? '0%' :
                currentStage === 'testing' ? '33.3%' :
                currentStage === 'decision' ? '66.6%' : '100%'
            }}
          />
        </div>

        {stages.map((stage, idx) => {
          const status = getStageStatus(stage.id);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          return (
            <div 
              key={stage.id}
              onClick={() => onStageClick && onStageClick(stage.id)}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              {/* Circle Node */}
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 shadow-xs ${
                isCompleted
                  ? 'bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 shadow-[#96a01d]/30 scale-105 font-bold'
                  : isCurrent
                  ? 'bg-white text-slate-950 border-2 border-[#96a01d] shadow-sm shadow-[#96a01d]/30 ring-2 ring-[#96a01d]/25 scale-105'
                  : 'bg-white/90 text-slate-400 border border-slate-200'
              }`}>
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
                ) : isCurrent ? (
                  <div className="relative flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#96a01d] animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-[#96a01d] relative" />
                  </div>
                ) : (
                  <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                )}
              </div>

              {/* Text Label */}
              <div className="text-center mt-1">
                <span className={`block text-[11px] font-bold transition-colors ${
                  isCurrent
                    ? 'text-slate-950 font-extrabold scale-105'
                    : isCompleted
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}>
                  {stage.label}
                </span>
                <span className="block text-[8px] text-slate-500 font-medium leading-none mt-0.2">
                  {isCurrent ? 'Current Phase' : stage.desc}
                </span>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}
