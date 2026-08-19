import React, { useState } from 'react';
import { UserPlus, Search, Edit2, Power, UserCheck, Mail, Briefcase, Building2, X, Eye, Calendar, FolderGit2 } from 'lucide-react';

export default function EmployeeTab({ 
  employees, 
  onAddEmployee, 
  onUpdateEmployee, 
  onToggleStatus, 
  currentUser, 
  showToast 
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [viewingEmp, setViewingEmp] = useState(null);

  // Form states for Add/Edit
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Full Stack Developer');
  const [department, setDepartment] = useState('Engineering');
  const [status, setStatus] = useState('Active');
  const [assignedProjectInput, setAssignedProjectInput] = useState('AGAM Workspace');

  const filteredEmployees = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                          e.email.toLowerCase().includes(search.toLowerCase()) ||
                          e.role.toLowerCase().includes(search.toLowerCase()) ||
                          e.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || e.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    if (!currentUser?.isAdmin) {
      showToast('Admin Access Required', 'Only Admin accounts can add new employees.', 'error');
      return;
    }
    setName('');
    setEmail('');
    setRole('Full Stack Developer');
    setDepartment('Engineering');
    setStatus('Active');
    setAssignedProjectInput('AGAM Workspace');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    if (!currentUser?.isAdmin) {
      showToast('Admin Access Required', 'Only Admin accounts can edit employee records.', 'error');
      return;
    }
    setEditingEmp(emp);
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
    setDepartment(emp.department);
    setStatus(emp.status);
    setAssignedProjectInput(emp.assignedProjects?.join(', ') || 'AGAM Workspace');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newEmp = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      role,
      department,
      status,
      joinedDate: '19 Aug 2026',
      assignedProjects: assignedProjectInput.split(',').map(s => s.trim()).filter(Boolean),
      avatar: role.includes('QA') ? '👩‍🔬' : role.includes('Designer') ? '🎨' : role.includes('Architect') ? '👨‍💻' : '👤'
    };

    onAddEmployee(newEmp);
    setIsAddModalOpen(false);
    showToast('Employee Created', `${newEmp.name} added to ${department}`, 'success');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingEmp) return;

    onUpdateEmployee(editingEmp.id, {
      name,
      email,
      role,
      department,
      status,
      assignedProjects: assignedProjectInput.split(',').map(s => s.trim()).filter(Boolean)
    });

    setEditingEmp(null);
    showToast('Employee Updated', `Updated details for ${name}`, 'success');
  };

  return (
    <div className="space-y-4 animate-in fade-in w-full">
      
      {/* Header Bar */}
      <div className="glass-strong rounded-xl p-3 sm:p-4 border border-white/90 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Employee Directory & Team Management
            </h2>
            <span className="px-2 py-0.2 rounded-full bg-[#96a01d]/25 text-slate-950 text-[10px] font-extrabold border border-[#96a01d]/40">
              {filteredEmployees.length} Members
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Manage team members, roles, departments, and active statuses</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, email..."
              className="w-full glass-input rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 font-medium min-h-[36px]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 glass p-0.5 rounded-lg text-xs bg-white/70">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterStatus === 'all' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterStatus === 'active' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus('inactive')}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all min-h-[30px] ${
                filterStatus === 'inactive' ? 'bg-[#96a01d] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inactive
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-xs shadow-[#96a01d]/30 hover:scale-[1.005] active:scale-95 transition-all flex items-center gap-1 min-h-[36px]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>

        </div>
      </div>

      {/* Employee Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className={`glass-card rounded-xl p-3.5 border shadow-md flex flex-col justify-between relative group ${
              emp.status === 'Active' ? 'border-white/90' : 'border-slate-200 bg-slate-50/50 opacity-85'
            }`}
          >
            {/* Top highlight */}
            <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#96a01d] to-transparent ${
              emp.status === 'Active' ? 'opacity-100' : 'opacity-30'
            }`} />

            <div>
              {/* Header with Avatar & ID */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#96a01d]/20 to-[#a8b422]/40 border border-[#96a01d]/40 text-slate-950 flex items-center justify-center text-lg shadow-xs font-bold shrink-0">
                    {emp.avatar || '👤'}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                      {emp.name}
                    </h3>
                    <span className="text-[9px] font-mono font-bold text-slate-500">
                      ID: {emp.id}
                    </span>
                  </div>
                </div>

                <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border shadow-xs ${
                  emp.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-slate-200 text-slate-700 border-slate-300'
                }`}>
                  ● {emp.status}
                </span>
              </div>

              {/* Specs & Role Box */}
              <div className="glass rounded-lg p-2 space-y-1.5 mb-2.5 border border-white/70 text-[10px] bg-white/70">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                  <Mail className="w-3 h-3 text-amber-700 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Briefcase className="w-3 h-3 text-amber-700 shrink-0" />
                  <span className="font-bold text-slate-900">{emp.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Building2 className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>{emp.department}</span>
                </div>
              </div>

              {/* Assigned Projects */}
              <div className="mb-3">
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Assigned Projects
                </span>
                <div className="flex flex-wrap gap-1">
                  {emp.assignedProjects?.map((p, i) => (
                    <span key={i} className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-1.5">
              <button
                onClick={() => setViewingEmp(emp)}
                className="py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200 shadow-xs flex items-center justify-center gap-1 min-h-[36px]"
                title="View Employee Profile"
              >
                <Eye className="w-3 h-3 text-slate-600" />
                <span>View</span>
              </button>

              <button
                onClick={() => handleOpenEdit(emp)}
                className="py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200 shadow-xs flex items-center justify-center gap-1 min-h-[36px]"
              >
                <Edit2 className="w-3 h-3 text-slate-600" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => {
                  if (!currentUser?.isAdmin) {
                    showToast('Admin Access Required', 'Only Admin accounts can activate/deactivate employees.', 'error');
                    return;
                  }
                  onToggleStatus(emp.id);
                  showToast(
                    emp.status === 'Active' ? 'Employee Deactivated' : 'Employee Activated',
                    `${emp.name} status updated to ${emp.status === 'Active' ? 'Inactive' : 'Active'}`,
                    emp.status === 'Active' ? 'info' : 'success'
                  );
                }}
                className={`py-1.5 px-2 rounded-lg font-bold text-[11px] border shadow-xs flex items-center gap-1 min-h-[36px] ${
                  emp.status === 'Active'
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}
              >
                <Power className="w-3 h-3" />
                <span>{emp.status === 'Active' ? 'Off' : 'On'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* View Profile Drawer Modal */}
      {viewingEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
          <div className="glass-strong rounded-2xl p-5 border border-white/90 max-w-md w-full shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#96a01d]/20 text-slate-950 flex items-center justify-center text-xl font-bold border border-[#96a01d]/40">
                  {viewingEmp.avatar || '👤'}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{viewingEmp.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-slate-500">{viewingEmp.id}</span>
                </div>
              </div>
              <button
                onClick={() => setViewingEmp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-800">
              <div className="glass p-2.5 rounded-xl border border-white/80 space-y-1.5 bg-white/70">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <span className="font-bold text-slate-900">{viewingEmp.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Role:</span>
                  <span className="font-bold text-slate-900">{viewingEmp.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Department:</span>
                  <span className="font-bold text-slate-900">{viewingEmp.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <span className={`font-extrabold px-2 py-0.2 rounded text-[10px] ${
                    viewingEmp.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {viewingEmp.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Joined Date:</span>
                  <span className="font-bold text-slate-900">{viewingEmp.joinedDate || '15 Jan 2024'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Active Projects Assigned
                </span>
                <div className="flex flex-wrap gap-1">
                  {viewingEmp.assignedProjects?.map((p, idx) => (
                    <span key={idx} className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-amber-600" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex justify-end mt-4">
              <button
                onClick={() => setViewingEmp(null)}
                className="px-5 py-2 rounded-xl bg-[#96a01d] text-slate-950 font-extrabold text-xs shadow-xs"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {(isAddModalOpen || editingEmp) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-3 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
          <div className="glass-strong rounded-t-3xl sm:rounded-2xl p-5 border border-white/90 max-w-md w-full shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#96a01d]" />
                {editingEmp ? 'Edit Employee Details' : 'Add New Employee'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingEmp(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingEmp ? handleEditSubmit : handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@agam.com"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
                  >
                    <option value="Lead Architect">Lead Architect</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Senior QA Engineer">Senior QA Engineer</option>
                    <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                    <option value="DevOps Specialist">DevOps Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Design System">Design System</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Assigned Projects (comma separated)
                </label>
                <input
                  type="text"
                  value={assignedProjectInput}
                  onChange={(e) => setAssignedProjectInput(e.target.value)}
                  placeholder="e.g. AGAM Portal, AI Analytics"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold min-h-[44px]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={status === 'Active'}
                      onChange={() => setStatus('Active')}
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={status === 'Inactive'}
                      onChange={() => setStatus('Inactive')}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingEmp(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-white/60 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-md shadow-[#96a01d]/35 min-h-[44px]"
                >
                  {editingEmp ? 'Save Changes' : 'Create Employee'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
