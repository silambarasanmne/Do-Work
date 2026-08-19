import React, { useState } from 'react';
import { Wrench, ExternalLink, Copy, Check, Play, User, GitBranch, Terminal, ArrowRight, Edit3, Save } from 'lucide-react';

export default function DevelopmentCard({ project, onFinishDev, onUpdateDevProgress, onUpdateDevUrl, showToast }) {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [devUrlInput, setDevUrlInput] = useState(project?.devUrl || '');

  const [buildLogs, setBuildLogs] = useState([
    '[08:14:02] Compiling TypeScript AST modules...',
    '[08:14:05] Theme tokens #96a01d + #ffffff injected into glass matrix',
    '[08:14:10] Build artifact v0.9.4 successfully bundled in 1.4s'
  ]);

  if (!project) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(devUrlInput);
    setCopied(true);
    showToast('Link Copied', 'Development URL copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = () => {
    setIsEditingUrl(false);
    if (onUpdateDevUrl) {
      onUpdateDevUrl(devUrlInput);
    }
    showToast('Development Link Saved', `Updated to ${devUrlInput}`, 'success');
  };

  const handleSimulateBuild = () => {
    setIsSimulating(true);
    showToast('Build Simulation', 'Running build optimization & linting...', 'info');

    let current = project.devProgress;
    const interval = setInterval(() => {
      current += 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setIsSimulating(false);
        onUpdateDevProgress(100);
        setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✅ Build 100% complete! Ready for QA testing.`]);
        showToast('Build Completed', 'Development reached 100%! Ready to move to Testing.', 'success');
      } else {
        onUpdateDevProgress(current);
      }
    }, 200);
  };

  return (
    <div className="glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md relative overflow-hidden backdrop-blur-md mb-3">
      {/* Reflective top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 shadow-xs shadow-[#96a01d]/30">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              🛠 Development Stage
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">Core Application Code & Build Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#96a01d]/25 text-slate-950 text-[10px] font-extrabold border border-[#96a01d]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#96a01d] animate-ping" />
            ● Active Stage
          </span>
        </div>
      </div>

      {/* Card Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3">
        
        {/* Left Column: Progress & Info */}
        <div className="space-y-3">
          
          {/* Progress Box */}
          <div className="glass-card rounded-lg p-2.5 border border-white/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Development Progress
              </span>
              <span className="text-xs font-extrabold font-mono text-slate-900">
                {project.devProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-white/90 shadow-inner mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] rounded-full transition-all duration-300 shadow-xs shadow-[#96a01d]/35"
                style={{ width: `${project.devProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleSimulateBuild}
                disabled={isSimulating || project.devProgress >= 100}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#96a01d]/20 hover:bg-[#96a01d]/35 text-slate-950 text-[10px] font-extrabold border border-[#96a01d]/50 transition-all disabled:opacity-50 min-h-[32px]"
              >
                <Play className={`w-3 h-3 text-slate-900 ${isSimulating ? 'animate-spin' : ''}`} />
                {isSimulating ? 'Compiling Build...' : 'Simulate Build to 100%'}
              </button>

              <span className="text-[9px] text-slate-500 font-medium">
                Target: Sprint #14
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-card rounded-lg p-2.5 border border-white/80">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Lead Developer
              </span>
              <div className="flex items-center gap-1 font-bold text-slate-800 text-[11px] mt-0.5">
                <User className="w-3 h-3 text-amber-600" />
                <span>{project.developer}</span>
              </div>
            </div>

            <div className="glass-card rounded-lg p-2.5 border border-white/80">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Build Version
              </span>
              <div className="flex items-center gap-1 font-bold text-slate-800 text-[11px] mt-0.5">
                <GitBranch className="w-3 h-3 text-amber-600" />
                <span className="font-mono">{project.version}</span>
              </div>
            </div>
          </div>

          {/* Editable Development Link Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                Development Link (Editable)
              </label>
              <button
                onClick={() => {
                  if (isEditingUrl) {
                    handleSaveUrl();
                  } else {
                    setIsEditingUrl(true);
                  }
                }}
                className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#96a01d]/20 hover:bg-[#96a01d]/35 text-slate-950 border border-[#96a01d]/40 flex items-center gap-1"
              >
                {isEditingUrl ? (
                  <>
                    <Save className="w-2.5 h-2.5 text-emerald-700" />
                    <span>Save Link</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="glass-input rounded-lg p-1.5 flex items-center justify-between gap-1.5 border border-white/90 shadow-xs text-[11px]">
              {isEditingUrl ? (
                <input
                  type="text"
                  value={devUrlInput}
                  onChange={(e) => setDevUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveUrl();
                  }}
                  autoFocus
                  placeholder="https://your-dev-url.com"
                  className="w-full bg-white/90 rounded px-2 py-1 text-xs text-slate-900 font-mono font-bold focus:outline-none border border-[#96a01d]"
                />
              ) : (
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-800 truncate pl-1">
                  <span className="text-amber-500">🔗</span>
                  <span className="truncate font-semibold">{devUrlInput}</span>
                </div>
              )}

              <div className="flex items-center gap-1 shrink-0">
                {isEditingUrl ? (
                  <button
                    onClick={handleSaveUrl}
                    className="p-1 rounded bg-[#96a01d] text-slate-950 border border-[#96a01d] shadow-xs text-[10px] font-extrabold px-2 min-h-[30px]"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Copy link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    </button>
                    <a
                      href={devUrlInput}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Opening Link', `Redirecting to ${devUrlInput}`, 'info');
                      }}
                      className="p-1.5 rounded bg-[#96a01d]/20 hover:bg-[#96a01d]/35 text-slate-950 border border-[#96a01d]/40 shadow-xs flex items-center gap-1 text-[10px] font-extrabold px-2.5 min-h-[32px]"
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Build Logs & Git Commits */}
        <div className="space-y-2">
          <div className="glass-card rounded-lg p-2.5 border border-white/80 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-amber-600" />
                  Live Build Output Log
                </span>
                <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                  stdout
                </span>
              </div>

              <div className="bg-slate-950 text-[#96a01d] font-mono text-[10px] p-2 rounded-md space-y-0.5 shadow-inner max-h-24 overflow-y-auto border border-slate-800">
                {buildLogs.map((log, idx) => (
                  <p key={idx} className="leading-tight opacity-90">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Git Commits Feed */}
            <div className="mt-2 pt-1.5 border-t border-slate-200/50">
              <span className="text-[10px] font-bold text-slate-700 block mb-1">
                Recent Commits
              </span>
              <div className="space-y-1">
                {project.commits.map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-[10px] bg-white/50 p-1.5 rounded border border-white/70">
                    <div className="flex items-center gap-1 truncate">
                      <span className="font-mono text-slate-900 font-bold text-[9px] bg-[#96a01d]/30 px-1 py-0.2 rounded border border-[#96a01d]/40">
                        {c.hash}
                      </span>
                      <span className="truncate text-slate-700 font-medium text-[10px]">{c.message}</span>
                    </div>
                    <span className="text-[8px] text-slate-400 shrink-0 ml-1">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Main Finish Development Button */}
      <div className="pt-2 border-t border-slate-200/60 flex justify-center">
        <button
          onClick={onFinishDev}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/30 hover:scale-[1.005] active:scale-95 min-h-[44px] transition-all duration-200 flex items-center justify-center gap-1.5 group"
        >
          <span>Finish Development</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
