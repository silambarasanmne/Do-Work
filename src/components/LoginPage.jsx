import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLogin, showToast, employees = [] }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const matchedEmp = employees.find(
        emp => emp.email.toLowerCase() === email.trim().toLowerCase() && (emp.password === password || (!emp.password && (password === 'admin123' || password === 'dev123')))
      );

      if (email.trim().toLowerCase() === 'silam@agam.com' && password === 'admin123') {
        const user = {
          name: 'Silambarasan',
          email: 'silam@agam.com',
          role: 'Lead Architect',
          isAdmin: true,
          avatar: '👨‍💻'
        };
        onLogin(user);
        showToast('Login Successful', 'Welcome back, Silambarasan (Admin)', 'success');
      } else if (matchedEmp) {
        const user = {
          name: matchedEmp.name,
          email: matchedEmp.email,
          role: matchedEmp.role,
          isAdmin: matchedEmp.role.toLowerCase().includes('architect') || matchedEmp.role.toLowerCase().includes('lead') || matchedEmp.role.toLowerCase().includes('admin'),
          avatar: matchedEmp.avatar || '👤'
        };
        onLogin(user);
        showToast('Login Successful', `Welcome back, ${matchedEmp.name}`, 'success');
      } else if (email.trim().toLowerCase() === 'dev@agam.com' && password === 'dev123') {
        const user = {
          name: 'Ananya Sharma',
          email: 'dev@agam.com',
          role: 'QA Engineer',
          isAdmin: false,
          avatar: '👩‍🔬'
        };
        onLogin(user);
        showToast('Login Successful', 'Welcome back, Ananya Sharma', 'success');
      } else {
        setError('Invalid Email or Password. Please check your credentials.');
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 animate-in fade-in">
      <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl max-w-md w-full relative overflow-hidden backdrop-blur-2xl">
        
        {/* Top Shimmer Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#96a01d] to-transparent" />

        {/* Header Icon & Brand */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#96a01d]/30 font-bold text-2xl">
            ⚡
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#96a01d]/20 text-slate-950 text-xs font-extrabold border border-[#96a01d]/40 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>AGAM ENTERPRISE PORTAL</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Workspace
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Access project lifecycles, test suites & employee management
          </p>
        </div>

        {/* Error Feedback Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@agam.com"
                className="w-full glass-input rounded-xl pl-10 pr-3.5 py-3 text-xs text-slate-900 font-semibold min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input rounded-xl pl-10 pr-10 py-3 text-xs text-slate-900 font-semibold min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-slate-400 hover:text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#96a01d] via-[#a8b422] to-[#7a8315] text-slate-950 font-extrabold text-xs shadow-md shadow-[#96a01d]/35 hover:scale-[1.005] active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to AGAM</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Single Quick Login Button */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 text-center">
          <button
            type="button"
            onClick={() => {
              setEmail('silam@agam.com');
              setPassword('admin123');
              setError('');
            }}
            className="w-full p-2.5 rounded-xl glass hover:bg-white text-left border border-slate-200/80 transition-all flex items-center justify-between min-h-[44px] active:scale-95 group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">👨‍💻</span>
              <div>
                <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>Silambarasan</span>
                  <span className="text-[9px] bg-[#96a01d] text-slate-950 px-1.5 py-0.2 rounded font-extrabold">ADMIN</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">silam@agam.com</div>
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#7a8315] group-hover:underline">
              Quick Fill ⚡
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
