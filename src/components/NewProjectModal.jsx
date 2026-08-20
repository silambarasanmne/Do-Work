import React, { useState } from 'react';
import { X, FolderPlus, UserCheck } from 'lucide-react';

export default function NewProjectModal({ isOpen, onClose, onCreateProject, employees = [] }) {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [category, setCategory] = useState('Enterprise SaaS');
  const [developer, setDeveloper] = useState(employees[0]?.name || 'Silambarasan');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const activeEmployees = employees.filter(e => e.status === 'Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedDevName = developer || (activeEmployees[0]?.name || 'Silambarasan');
    const currentTimestamp = new Date().getTime();

    const newProj = {
      id: `proj-${currentTimestamp}`,
      name,
      key: key.toUpperCase() || name.substring(0, 3).toUpperCase(),
      category,
      stage: 'development',
      devProgress: 15,
      testProgress: 0,
      developer: selectedDevName,
      version: 'v0.1.0',
      releaseVersion: 'v1.0.0',
      devUrl: `https://dev-${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`,
      targetDate: '30 Sep 2026',
      description: description || 'New enterprise project management workspace.',
      testStats: { total: 10, passed: 0, failed: 0 },
      testCases: [],
      commits: [
        { id: `c-${currentTimestamp}`, hash: '001a2b3', message: 'initial repo commit', author: selectedDevName, date: 'Just now' }
      ]
    };

    onCreateProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-3 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className="glass-strong rounded-t-3xl sm:rounded-2xl p-5 border border-white/90 max-w-md w-full shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 shadow-sm shadow-[#96a01d]/30 font-bold">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Create New Project</h3>
              <p className="text-[10px] text-slate-500 font-medium">Initialize workspace & assign employee lead</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!key) setKey(e.target.value.substring(0, 3).toUpperCase());
              }}
              placeholder="e.g. AI Customer Analytics Portal"
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Project Key
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                placeholder="e.g. CAP"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono font-bold min-h-[44px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
              >
                <option value="Enterprise SaaS">Enterprise SaaS</option>
                <option value="Financial Tech">Financial Tech</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Logistics & AI">Logistics & AI</option>
              </select>
            </div>
          </div>

          {/* Integrated Employee Select Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between mb-1">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#96a01d]" />
                Assign Lead Developer (Employee) *
              </span>
              <span className="text-[9px] text-slate-400 font-normal">Active Directory</span>
            </label>

            <select
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold min-h-[44px]"
            >
              {activeEmployees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.avatar || '👤'} {emp.name} — {emp.role} ({emp.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of application scope..."
              className="w-full h-20 glass-input rounded-xl p-3 text-xs text-slate-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end gap-2 pb-2 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-white/60 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-md shadow-[#96a01d]/35 active:scale-95 min-h-[44px]"
            >
              Initialize Workspace
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
