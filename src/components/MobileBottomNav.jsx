import React from 'react';
import { LayoutGrid, Cpu, Smartphone, Users, Plus } from 'lucide-react';

export default function MobileBottomNav({ 
  activeTab, 
  onTabChange, 
  onOpenNewProject,
  appCount = 4,
  projectCount = 3,
  employeeCount = 5 
}) {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'workspace', label: 'Workspace', icon: Cpu },
    { id: 'applications', label: 'Apps', icon: Smartphone },
    { id: 'employees', label: 'Employees', icon: Users }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-2 pb-2 pt-1 pointer-events-none">
      <div className="glass-nav rounded-2xl p-1 shadow-2xl border border-white/90 flex items-center justify-around pointer-events-auto bg-white/90 backdrop-blur-2xl">
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all min-h-[44px] flex-1 ${
                isActive
                  ? 'bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold shadow-xs scale-105'
                  : 'text-slate-600 hover:text-slate-900 active:bg-white/60'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-slate-950' : 'text-slate-600'}`} />
              <span className="text-[9px] font-extrabold leading-none">{tab.label}</span>
            </button>
          );
        })}

        {/* Quick Action Floating Touch Button */}
        <button
          onClick={onOpenNewProject}
          title="Create New Project"
          className="w-10 h-10 rounded-xl bg-slate-950 text-[#96a01d] flex items-center justify-center shadow-lg shadow-slate-900/30 active:scale-95 transition-transform shrink-0 ml-0.5 font-bold"
        >
          <Plus className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
