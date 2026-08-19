import React, { useState } from 'react';
import { TestTube, CheckCircle2, XCircle, RefreshCw, ArrowRight, ShieldAlert } from 'lucide-react';

export default function TestingCard({ project, onFinishTesting, onRunTests, showToast }) {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  if (!project) return null;

  const testStats = project.testStats || { total: 25, passed: 23, failed: 2 };
  const testCases = project.testCases || [];

  const handleRunAllTests = () => {
    setIsRunningTests(true);
    showToast('Running QA Suite', 'Executing 25 automated integration tests...', 'info');

    setTimeout(() => {
      setIsRunningTests(false);
      onRunTests && onRunTests();
      showToast('Test Suite Complete', '23 Passed, 2 Failed. QA analysis ready.', 'success');
    }, 1200);
  };

  const filteredCases = testCases.filter(t => {
    if (activeTab === 'passed') return t.status === 'passed';
    if (activeTab === 'failed') return t.status === 'failed';
    return true;
  });

  return (
    <div className="glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md relative overflow-hidden backdrop-blur-md mb-3">
      {/* Reflective top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 shadow-xs shadow-[#96a01d]/30">
            <TestTube className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              🧪 Testing Phase
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">Automated & Manual Quality Assurance</p>
          </div>
        </div>

        <button
          onClick={handleRunAllTests}
          disabled={isRunningTests}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-800 border border-white/90 text-xs font-bold shadow-xs transition-all disabled:opacity-50 min-h-[36px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isRunningTests ? 'animate-spin' : ''}`} />
          {isRunningTests ? 'Executing QA Suite...' : 'Re-run All Tests'}
        </button>
      </div>

      {/* Statistic Glass Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        
        {/* Pill 1: Total Cases */}
        <div className="glass-card rounded-lg p-2.5 border border-white/80 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Test Cases
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {testStats.total}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-slate-100/90 text-slate-800 text-xs font-bold border border-slate-200">
            {testStats.total} Cases
          </div>
        </div>

        {/* Pill 2: Passed Cases */}
        <div className="glass-card rounded-lg p-2.5 border border-emerald-200/80 bg-emerald-500/5 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">
              Passed Tests
            </span>
            <span className="text-lg font-extrabold text-emerald-700">
              {testStats.passed}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ✓ {testStats.passed} Passed
          </div>
        </div>

        {/* Pill 3: Failed Cases */}
        <div className="glass-card rounded-lg p-2.5 border border-[#96a01d]/60 bg-[#96a01d]/10 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-slate-900 uppercase tracking-wider block">
              Failed / Edge Cases
            </span>
            <span className="text-lg font-extrabold text-slate-950">
              {testStats.failed}
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#96a01d]/30 text-slate-950 text-xs font-extrabold border border-[#96a01d]/50 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-slate-900" />
            ✕ {testStats.failed} Failed
          </div>
        </div>

      </div>

      {/* Testing Progress Bar */}
      <div className="glass-card rounded-lg p-2.5 border border-white/80 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
            Testing Progress
          </span>
          <span className="text-xs font-extrabold font-mono text-slate-900">
            92%
          </span>
        </div>

        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-white/90 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] rounded-full transition-all duration-300 shadow-xs shadow-[#96a01d]/30"
            style={{ width: '92%' }}
          />
        </div>
      </div>

      {/* Detailed Test Suite Breakdown */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
            Test Case Suite Results
          </h3>
          
          {/* Tab Filter */}
          <div className="flex items-center gap-1 glass p-0.5 rounded-md text-xs bg-white/70">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded font-bold transition-all text-[10px] ${
                activeTab === 'all' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({testCases.length})
            </button>
            <button
              onClick={() => setActiveTab('passed')}
              className={`px-2 py-0.5 rounded font-bold transition-all text-[10px] ${
                activeTab === 'passed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Passed ({testCases.filter(t => t.status === 'passed').length})
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              className={`px-2 py-0.5 rounded font-bold transition-all text-[10px] ${
                activeTab === 'failed' ? 'bg-[#96a01d]/40 text-slate-950 font-extrabold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Failed ({testCases.filter(t => t.status === 'failed').length})
            </button>
          </div>
        </div>

        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
          {filteredCases.map((tc) => (
            <div
              key={tc.id}
              className={`p-2 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                tc.status === 'passed'
                  ? 'glass bg-white/70 border-emerald-100 hover:bg-emerald-50/40'
                  : 'glass-theme bg-[#96a01d]/15 border-[#96a01d]/40 hover:bg-[#96a01d]/25'
              }`}
            >
              <div className="flex items-start gap-2">
                {tc.status === 'passed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {tc.name}
                  </div>
                  {tc.error && (
                    <div className="text-[9px] text-slate-950 font-mono mt-0.5 flex items-center gap-1 bg-[#96a01d]/30 px-1.5 py-0.2 rounded border border-[#96a01d]/50">
                      <ShieldAlert className="w-3 h-3 text-slate-900 shrink-0" />
                      <span>{tc.error}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto text-[9px] font-mono font-semibold text-slate-500">
                <span>Exec: {tc.time}</span>
                <span className={`px-1.5 py-0.2 rounded font-extrabold uppercase ${
                  tc.status === 'passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-[#96a01d]/40 text-slate-950'
                }`}>
                  {tc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Finish Testing Button */}
      <div className="pt-2 border-t border-slate-200/60 flex justify-center">
        <button
          onClick={onFinishTesting}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/30 hover:scale-[1.005] active:scale-95 min-h-[44px] transition-all duration-200 flex items-center justify-center gap-1.5 group"
        >
          <span>Finish Testing</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
