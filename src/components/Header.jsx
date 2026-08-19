import React, { useState } from 'react';
import { Bell, Sparkles, ChevronDown, Check, ShieldCheck, Menu, X, Plus, LogOut, LogIn, User } from 'lucide-react';

export default function Header({ 
  projects, 
  activeProject, 
  onSelectProject, 
  showToast,
  glowIntensity,
  setGlowIntensity,
  activeTab,
  onTabChange,
  onOpenNewProject,
  currentUser,
  onLogout,
  onOpenLogin
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Development build v0.9.4 succeeded', time: '5m ago', type: 'success' },
    { id: 2, text: 'Test suite passed 23/25 test cases', time: '18m ago', type: 'info' },
    { id: 3, text: 'Silambarasan assigned as Lead Developer', time: '1h ago', type: 'system' }
  ];

  return (
    <header className="sticky top-1 z-40 px-2 sm:px-4 w-full max-w-full mb-2">
      <div className="glass-nav rounded-xl px-3 sm:px-4 py-1.5 flex items-center justify-between shadow-sm border border-white/80 transition-all duration-300 w-full">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="relative group cursor-pointer" onClick={() => showToast('AGAM System', 'Enterprise Project Lifecycle Workspace active', 'info')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 transition-transform">
              ⚡
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">
                AGAM
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-[#96a01d]/25 text-slate-950 border border-[#96a01d]/40 leading-none">
                PRO
              </span>
            </div>
            <p className="text-[9px] text-slate-500 font-medium hidden md:block leading-none mt-0.5">Project Lifecycle Management</p>
          </div>

          {/* Vertical Divider */}
          <div className="h-4 w-[1px] bg-slate-200/80 mx-1 hidden md:block" />

          {/* Project Selector Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-lg bg-white/80 hover:bg-white border border-white/90 text-xs font-semibold text-slate-800 shadow-xs transition-all min-h-[36px] sm:min-h-[30px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#96a01d] animate-ping" />
              <span className="truncate max-w-[100px] sm:max-w-[120px] md:max-w-[180px] text-slate-900 font-bold text-xs">
                {activeProject?.name || 'Select Project'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 glass-strong rounded-xl p-1.5 shadow-xl border border-white/90 z-50 animate-in fade-in max-h-64 overflow-y-auto">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Projects
                </div>
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      setDropdownOpen(false);
                      showToast('Switched Project', `Now managing ${proj.name}`, 'info');
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between min-h-[40px] transition-colors ${
                      activeProject?.id === proj.id 
                        ? 'bg-[#96a01d]/25 text-slate-950 font-extrabold border border-[#96a01d]/40' 
                        : 'hover:bg-white/80 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{proj.name}</div>
                      <div className="text-[9px] text-slate-500">{proj.category}</div>
                    </div>
                    {activeProject?.id === proj.id && (
                      <Check className="w-4 h-4 text-slate-900 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Desktop Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          
          {/* Ambient Glow Intensity Toggle */}
          <button
            onClick={() => {
              const next = glowIntensity === 'high' ? 'low' : glowIntensity === 'low' ? 'medium' : 'high';
              setGlowIntensity(next);
              showToast('Ambient Glass Effect', `Glow intensity set to ${next.toUpperCase()}`, 'info');
            }}
            title="Toggle Ambient Glass Glow"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#96a01d]/15 hover:bg-[#96a01d]/25 border border-[#96a01d]/40 text-[10px] font-bold text-slate-900 transition-colors min-h-[30px]"
          >
            <Sparkles className="w-3 h-3 text-slate-800" />
            <span className="capitalize">{glowIntensity} Ambient</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-1.5 rounded-md bg-white/70 hover:bg-white border border-white/90 text-slate-700 shadow-xs transition-all relative"
            >
              <Bell className="w-3.5 h-3.5 text-slate-700" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#96a01d] animate-pulse" />
            </button>

            {notifOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 glass-strong rounded-lg p-1.5 shadow-lg border border-white/90 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200/50 mb-1">
                  <span className="text-[11px] font-bold text-slate-800">Notifications</span>
                  <span className="text-[8px] px-1.5 py-0.2 bg-[#96a01d]/20 text-slate-950 rounded-full font-extrabold border border-[#96a01d]/40">3 New</span>
                </div>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-1.5 rounded bg-white/60 text-[10px] transition-colors">
                      <p className="text-slate-800 font-medium leading-snug">{n.text}</p>
                      <span className="text-[8px] text-slate-400 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Auth Profile Pill / Login Control */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200/60">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-white via-[#fef8e7] to-[#96a01d]/40 border border-white shadow-xs flex items-center justify-center text-[11px] shrink-0 font-bold">
                {currentUser.avatar || '👤'}
              </div>
              <div className="hidden md:block">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-0.5 leading-none">
                  <span>{currentUser.name}</span>
                  {currentUser.isAdmin && <ShieldCheck className="w-3 h-3 text-amber-700 inline" />}
                </div>
                <span className="text-[8px] text-slate-500 font-medium block leading-none">{currentUser.role}</span>
              </div>

              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-gradient-to-r from-[#96a01d] to-[#7a8315] text-slate-950 font-extrabold text-[11px] shadow-xs active:scale-95 transition-all min-h-[30px]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>

        {/* Mobile Header Quick Actions */}
        <div className="sm:hidden flex items-center gap-1.5">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg bg-white/80 hover:bg-white text-slate-800 border border-white/90 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <Bell className="w-4 h-4 text-slate-800" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-950 text-[#96a01d] border border-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-1.5 glass-strong rounded-xl p-3 border border-white/90 shadow-xl space-y-3 animate-in fade-in z-50">
          
          {/* User Auth Profile inside Mobile Drawer */}
          {currentUser ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/80 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentUser.avatar || '👤'}</span>
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    <span>{currentUser.name}</span>
                    {currentUser.isAdmin && <span className="text-[8px] bg-[#96a01d] text-slate-950 font-extrabold px-1 rounded">ADMIN</span>}
                  </div>
                  <div className="text-[9px] text-slate-500">{currentUser.role}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#96a01d] text-slate-950 font-extrabold text-xs shadow-xs flex items-center justify-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Account</span>
            </button>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Project
              </span>
              <button
                onClick={() => {
                  onOpenNewProject && onOpenNewProject();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-extrabold text-slate-950 bg-[#96a01d] px-2 py-0.5 rounded-md"
              >
                <Plus className="w-3 h-3" />
                <span>New Project</span>
              </button>
            </div>

            <div className="space-y-1">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between min-h-[44px] ${
                    activeProject?.id === proj.id ? 'bg-[#96a01d]/25 font-bold text-slate-950 border border-[#96a01d]/40' : 'bg-white/70 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold">{proj.name}</div>
                    <div className="text-[9px] text-slate-500">{proj.category}</div>
                  </div>
                  {activeProject?.id === proj.id && <Check className="w-4 h-4 text-slate-900 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
            <span className="text-[10px] font-bold text-slate-500">Ambient Lighting</span>

            <button
              onClick={() => {
                const next = glowIntensity === 'high' ? 'low' : glowIntensity === 'low' ? 'medium' : 'high';
                setGlowIntensity(next);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#96a01d]/20 text-[10px] font-extrabold text-slate-950 border border-[#96a01d]/40 min-h-[32px]"
            >
              {glowIntensity.toUpperCase()} Glow
            </button>
          </div>

        </div>
      )}

    </header>
  );
}
