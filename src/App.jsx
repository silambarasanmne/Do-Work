import React, { useState } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import DashboardHero from './components/DashboardHero';
import ProjectStatusCards from './components/ProjectStatusCards';
import WorkflowStepper from './components/WorkflowStepper';
import DevelopmentCard from './components/DevelopmentCard';
import TestingCard from './components/TestingCard';
import DecisionCard from './components/DecisionCard';
import ReleaseSuccessCard from './components/ReleaseSuccessCard';
import ApplicationsTab from './components/ApplicationsTab';
import ProjectsTab from './components/ProjectsTab';
import EmployeeTab from './components/EmployeeTab';
import LoginPage from './components/LoginPage';
import NewProjectModal from './components/NewProjectModal';
import LiveAppModal from './components/LiveAppModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

import { INITIAL_PROJECTS, INITIAL_APPLICATIONS } from './data/mockData';
import { INITIAL_EMPLOYEES } from './data/mockEmployees';

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Authentication State - Default landing page is Login (currentUser = null)
  const [currentUser, setCurrentUser] = useState(null);

  const [activeProjectId, setActiveProjectId] = useState('proj-1');
  const [activeTab, setActiveTab] = useState('login'); // Default Landing Tab is 'login'
  const [glowIntensity, setGlowIntensity] = useState('high');
  const [toast, setToast] = useState(null);
  
  // Modals
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [selectedAppForModal, setSelectedAppForModal] = useState(null);

  // Active project helper
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab('workspace'); // Redirect to workspace upon successful authentication
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login'); // Redirect to login landing page upon logout
    showToast('Logged Out', 'You have been signed out safely.', 'info');
  };

  // Employee Handlers
  const handleAddEmployee = (newEmp) => {
    setEmployees(prev => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (empId, updatedFields) => {
    setEmployees(prev => prev.map(e => e.id === empId ? { ...e, ...updatedFields } : e));
  };

  const handleToggleEmployeeStatus = (empId) => {
    setEmployees(prev => prev.map(e => e.id === empId ? { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' } : e));
  };

  const handleDeleteEmployee = (empId) => {
    setEmployees(prev => prev.filter(e => e.id !== empId));
  };

  // Update active project helper function
  const updateProject = (updatedFields) => {
    setProjects(prev => prev.map(p => p.id === activeProject.id ? { ...p, ...updatedFields } : p));
  };

  // Stage Transitions
  const handleFinishDev = () => {
    updateProject({ 
      stage: 'testing',
      devProgress: 100 
    });
    showToast('Development Complete', 'Project workflow moved to Testing stage', 'success');
  };

  const handleFinishTesting = () => {
    updateProject({ 
      stage: 'decision',
      testProgress: 100 
    });
    showToast('Testing Complete', 'All test cases verified. Proceed to Release Decision.', 'success');
  };

  const handleRework = (notes) => {
    updateProject({
      stage: 'development',
      devProgress: 80,
      commits: [
        { id: `c-${Date.now()}`, hash: '9b3c41e', message: `rework: ${notes || 'fix edge case QA findings'}`, author: activeProject.developer, date: 'Just now' },
        ...activeProject.commits
      ]
    });
    showToast('Returned to Development', 'Project sprint re-opened for rework', 'info');
  };

  const handleRelease = () => {
    updateProject({
      stage: 'released'
    });

    const existingAppIndex = applications.findIndex(a => a.name.toLowerCase().includes(activeProject.name.toLowerCase()));
    const appUrl = activeProject.devUrl || `https://${activeProject.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`;

    if (existingAppIndex >= 0) {
      setApplications(prev => prev.map((a, i) => i === existingAppIndex ? {
        ...a,
        version: activeProject.releaseVersion || 'v1.0.0',
        releaseDate: '19 Aug 2026',
        url: appUrl,
        environment: 'Production'
      } : a));
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        name: activeProject.name,
        version: activeProject.releaseVersion || 'v1.0.0',
        environment: 'Production',
        releaseDate: '19 Aug 2026',
        url: appUrl,
        uptime: '99.99%',
        latency: '28ms',
        activeUsers: '1,200',
        status: 'Healthy',
        icon: '⚡',
        category: activeProject.category,
        features: ['Core Enterprise Workflow', '#96a01d + #ffffff Glass UI', 'Production Telemetry']
      };
      setApplications(prev => [newApp, ...prev]);
    }

    showToast('Release Successful', `${activeProject.name} is now deployed to Production!`, 'success');
  };

  const handleRestartCycle = () => {
    updateProject({
      stage: 'development',
      devProgress: 15,
      version: 'v1.1.0-dev',
      releaseVersion: 'v1.1.0',
      commits: [
        { id: `c-${Date.now()}`, hash: 'f1a2b3c', message: 'chore: init v1.1.0 release branch', author: activeProject.developer, date: 'Just now' },
        ...activeProject.commits
      ]
    });
    showToast('New Cycle Initialized', 'Started development for version v1.1.0', 'info');
  };

  const handleCreateProject = (newProj) => {
    setProjects(prev => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
    setActiveTab('workspace');

    // Automatically append project to assigned projects of the selected Lead Developer!
    setEmployees(prev => prev.map(emp => {
      if (emp.name.toLowerCase() === newProj.developer.toLowerCase()) {
        const existingProjects = emp.assignedProjects || [];
        if (!existingProjects.includes(newProj.name)) {
          return { ...emp, assignedProjects: [...existingProjects, newProj.name] };
        }
      }
      return emp;
    }));

    showToast('Project Created', `${newProj.name} assigned to ${newProj.developer}`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-[#fcfde9] to-[#fffdf7] text-slate-800 relative selection:bg-[#96a01d] selection:text-slate-950 pb-24 sm:pb-6 overflow-x-hidden">
      
      {/* Background Soft #96a01d Ambient Lighting & Blurred Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Soft Ambient Glow 1 (Top Left) */}
        <div className={`absolute -top-28 -left-28 w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-[#96a01d]/30 to-[#a8b422]/20 blur-3xl transition-all duration-1000 ${
          glowIntensity === 'high' ? 'opacity-100 animate-float' : glowIntensity === 'medium' ? 'opacity-60' : 'opacity-30'
        }`} />

        {/* Soft Ambient Glow 2 (Right Center) */}
        <div className={`absolute top-1/3 -right-28 w-[40rem] h-[40rem] rounded-full bg-gradient-to-bl from-[#96a01d]/25 via-[#f9fce0]/40 to-lime-100/20 blur-3xl transition-all duration-1000 ${
          glowIntensity === 'high' ? 'opacity-100 animate-float-slow' : glowIntensity === 'medium' ? 'opacity-60' : 'opacity-30'
        }`} />

        {/* Soft Ambient Glow 3 (Bottom Center) */}
        <div className={`absolute -bottom-28 left-1/3 w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-[#96a01d]/20 via-[#a8b422]/15 to-transparent blur-3xl transition-all duration-1000 ${
          glowIntensity === 'high' ? 'opacity-100 animate-float' : glowIntensity === 'medium' ? 'opacity-50' : 'opacity-20'
        }`} />

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(150,160,29,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      </div>

      {/* Main App Layout Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <Header
            projects={projects}
            activeProject={activeProject}
            onSelectProject={(proj) => {
              setActiveProjectId(proj.id);
              if (currentUser) {
                setActiveTab('workspace');
              } else {
                setActiveTab('login');
                showToast('Authentication Required', 'Please sign in to view project workspace.', 'info');
              }
            }}
            showToast={showToast}
            glowIntensity={glowIntensity}
            setGlowIntensity={setGlowIntensity}
            activeTab={activeTab}
            onTabChange={(tab) => {
              if (!currentUser && tab !== 'login') {
                setActiveTab('login');
                showToast('Authentication Required', 'Please sign in to access workspace features.', 'info');
              } else {
                setActiveTab(tab);
              }
            }}
            onOpenNewProject={() => {
              if (currentUser) {
                setIsNewProjectOpen(true);
              } else {
                setActiveTab('login');
                showToast('Authentication Required', 'Please sign in to create new projects.', 'info');
              }
            }}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenLogin={() => setActiveTab('login')}
          />

          {/* Desktop Navigation Tabs - Shown when logged in */}
          {currentUser && activeTab !== 'login' && (
            <div className="hidden sm:block">
              <NavigationTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                appCount={applications.length}
                projectCount={projects.length}
                employeeCount={employees.length}
              />
            </div>
          )}

          {/* View Router */}
          <main className="w-full max-w-[98%] 2xl:max-w-[1800px] mx-auto px-2.5 sm:px-6 md:px-8">
            
            {/* LOGIN LANDING PAGE (Default on app open) */}
            {(!currentUser || activeTab === 'login') && (
              <LoginPage
                onLogin={handleLogin}
                showToast={showToast}
                employees={employees}
              />
            )}

            {/* TAB 1: WORKSPACE (Protected) */}
            {currentUser && activeTab === 'workspace' && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-300">
                
                {/* Dashboard Hero Section */}
                <DashboardHero project={activeProject} />

                {/* Project Status Cards */}
                <ProjectStatusCards
                  project={activeProject}
                  currentStage={activeProject.stage}
                  onStageClick={(stageId) => {
                    updateProject({ stage: stageId });
                    showToast('Stage Navigation', `Navigated to ${stageId} view`, 'info');
                  }}
                />

                {/* Workflow Stepper */}
                <WorkflowStepper
                  currentStage={activeProject.stage}
                  onStageClick={(stageId) => {
                    updateProject({ stage: stageId });
                  }}
                />

                {/* Interactive Stage Specific Card */}
                {activeProject.stage === 'development' && (
                  <DevelopmentCard
                    project={activeProject}
                    onFinishDev={handleFinishDev}
                    onUpdateDevProgress={(progress) => updateProject({ devProgress: progress })}
                    onUpdateDevUrl={(url) => updateProject({ devUrl: url })}
                    showToast={showToast}
                  />
                )}

                {activeProject.stage === 'testing' && (
                  <TestingCard
                    project={activeProject}
                    onFinishTesting={handleFinishTesting}
                    onRunTests={() => updateProject({ testProgress: 100 })}
                    showToast={showToast}
                  />
                )}

                {activeProject.stage === 'decision' && (
                  <DecisionCard
                    project={activeProject}
                    onRework={handleRework}
                    onRelease={handleRelease}
                    showToast={showToast}
                  />
                )}

                {activeProject.stage === 'released' && (
                  <ReleaseSuccessCard
                    project={activeProject}
                    onOpenApp={(proj) => {
                      const app = applications.find(a => a.name.toLowerCase().includes(proj.name.toLowerCase())) || {
                        name: proj.name,
                        version: proj.releaseVersion || 'v1.0.0',
                        environment: 'Production',
                        url: proj.devUrl || `https://${proj.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`,
                        uptime: '100.00%',
                        latency: '24ms',
                        activeUsers: '1,500'
                      };
                      setSelectedAppForModal(app);
                    }}
                    onViewApplications={() => setActiveTab('applications')}
                    onRestartCycle={handleRestartCycle}
                    showToast={showToast}
                  />
                )}

              </div>
            )}

            {/* TAB 2: APPLICATIONS (Protected) */}
            {currentUser && activeTab === 'applications' && (
              <ApplicationsTab
                applications={applications}
                onOpenAppModal={(app) => setSelectedAppForModal(app)}
                showToast={showToast}
              />
            )}

            {/* TAB 3: PROJECTS (Protected) */}
            {currentUser && activeTab === 'projects' && (
              <ProjectsTab
                projects={projects}
                onSelectProject={(proj) => {
                  setActiveProjectId(proj.id);
                  setActiveTab('workspace');
                }}
                onOpenNewProjectModal={() => setIsNewProjectOpen(true)}
                showToast={showToast}
              />
            )}

            {/* TAB 4: EMPLOYEES (Protected) */}
            {currentUser && activeTab === 'employees' && (
              <EmployeeTab
                employees={employees}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onToggleStatus={handleToggleEmployeeStatus}
                onDeleteEmployee={handleDeleteEmployee}
                currentUser={currentUser}
                showToast={showToast}
              />
            )}

          </main>
        </div>

        {/* Global Footer */}
        <Footer onTabChange={(tab) => {
          if (!currentUser && tab !== 'login') {
            setActiveTab('login');
            showToast('Authentication Required', 'Please sign in to access workspace features.', 'info');
          } else {
            setActiveTab(tab);
          }
        }} />

      </div>

      {/* Mobile Bottom Navigation Dock - Shown when logged in */}
      {currentUser && activeTab !== 'login' && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenNewProject={() => setIsNewProjectOpen(true)}
          appCount={applications.length}
          projectCount={projects.length}
          employeeCount={employees.length}
        />
      )}

      {/* Global Modals & Toasts */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
        employees={employees}
      />

      <LiveAppModal
        app={selectedAppForModal}
        onClose={() => setSelectedAppForModal(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
