import React, { useState } from 'react';
import { Plus, Search, ArrowRight } from 'lucide-react';

export default function ProjectsTab({ projects, onSelectProject, onOpenNewProjectModal, showToast }) {
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in w-full">
      
      {/* Header Bar */}
      <div className="glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 backdrop-blur-md">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Workspace Projects
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">Manage project lifecycles, sprints, and release pipelines</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 font-medium min-h-[36px]"
            />
          </div>

          <button
            onClick={onOpenNewProjectModal}
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/30 hover:scale-[1.005] active:scale-95 transition-all flex items-center gap-1 min-h-[36px]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Full-Width Grid: 1 col mobile, 2 col tablet, 3 col desktop, 4 col ultra-wide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-xl p-3.5 border border-white/90 shadow-md flex flex-col justify-between relative group"
          >
            {/* Reflective top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[8px] font-extrabold px-1.5 py-0.2 rounded-full bg-[#96a01d]/25 text-slate-950 border border-[#96a01d]/40 uppercase tracking-wider">
                    {project.key}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-1 group-hover:text-[#7a8315] transition-colors leading-tight">
                    {project.name}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">{project.category}</span>
                </div>

                <div className="w-7 h-7 rounded-lg bg-[#96a01d]/20 text-slate-950 flex items-center justify-center font-bold text-xs border border-[#96a01d]/40">
                  ⚡
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-medium line-clamp-2 mb-2.5 leading-snug">
                {project.description}
              </p>

              {/* Stage & Progress Badge */}
              <div className="glass rounded-lg p-2 border border-white/70 space-y-1 mb-2.5 bg-white/70">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-600">Current Stage</span>
                  <span className="font-extrabold capitalize text-slate-950 text-[11px]">{project.stage}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#96a01d] to-[#7a8315] rounded-full"
                    style={{
                      width: project.stage === 'released' ? '100%' : project.stage === 'decision' ? '90%' : project.stage === 'testing' ? '70%' : '40%'
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium mb-3">
                <span>Dev: <strong>{project.developer}</strong></span>
                <span>Version: <strong className="font-mono text-slate-800">{project.version}</strong></span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectProject(project);
                showToast('Workspace Switched', `Opened ${project.name} in Workspace tab`, 'info');
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-[#96a01d] font-extrabold text-[11px] shadow-xs active:scale-95 transition-all duration-200 flex items-center justify-center gap-1 group-hover:shadow-sm min-h-[44px]"
            >
              <span>Open in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
