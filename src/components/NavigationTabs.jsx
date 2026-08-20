import React from 'react';
import { LayoutGrid, Cpu, Smartphone, Users } from 'lucide-react';

export default function NavigationTabs({ 
  activeTab, 
  onTabChange, 
  appCount = 4, 
  projectCount = 3,
  employeeCount = 5 
}) {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: LayoutGrid, count: projectCount },
    { id: 'workspace', label: 'Workspace', icon: Cpu, badge: 'Active' },
    { id: 'applications', label: 'Applications', icon: Smartphone, count: appCount },
    { id: 'employees', label: 'Employees', icon: Users, count: employeeCount }
  ];

  return (
    <div className="flex justify-center mb-3 px-2">
      <div className="glass p-1 rounded-full shadow-xs border border-white/80 flex items-center gap-1 bg-white/70 max-w-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-1 rounded-full text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 shrink-0 group min-h-[36px] ${
                isActive
                  ? 'bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 shadow-xs shadow-[#96a01d]/30 scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 active:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'scale-105 text-slate-950' : 'group-hover:scale-105 text-slate-600'}`} />
              <span>{tab.label}</span>
              
              {tab.count !== undefined && (
                <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                  isActive ? 'bg-slate-950/15 text-slate-950' : 'bg-slate-200/70 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}

              {tab.badge && (
                <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-extrabold uppercase tracking-wider ${
                  isActive ? 'bg-slate-950 text-[#96a01d] shadow-xs' : 'bg-[#96a01d]/20 text-slate-900 border border-[#96a01d]/40'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

