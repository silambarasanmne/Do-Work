import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, KeyRound, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage({ onLogin, showToast }) {
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

      if (email === 'silam@agam.com' && password === 'admin123') {
        const user = {
          name: 'Silambarasan',
          email: 'silam@agam.com',
          role: 'Lead Architect',
          isAdmin: true,
          avatar: '👨‍💻'
        };
        onLogin(user);
        showToast('Login Successful', 'Welcome back, Silambarasan (Admin)', 'success');
      } else if (email === 'dev@agam.com' && password === 'dev123') {
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
        setError('Invalid Email or Password. Try quick demo logins below.');
      }
    }, 600);
  };

  const fillDemoAdmin = () => {
    setEmail('silam@agam.com');
    setPassword('admin123');
    setError('');
  };

  const fillDemoDev = () => {
    setEmail('dev@agam.com');
    setPassword('dev123');
    setError('');
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

        {/* Demo Quick Logins Box */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 text-center space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            ⚡ Quick Demo Logins
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={fillDemoAdmin}
              type="button"
              className="p-2 rounded-xl glass hover:bg-white text-left border border-slate-200 transition-all text-xs"
            >
              <div className="font-extrabold text-slate-900 flex items-center gap-1">
                <span>👑 Admin</span>
              </div>
              <div className="text-[9px] text-slate-500 truncate">silam@agam.com</div>
            </button>

            <button
              onClick={fillDemoDev}
              type="button"
              className="p-2 rounded-xl glass hover:bg-white text-left border border-slate-200 transition-all text-xs"
            >
              <div className="font-extrabold text-slate-900 flex items-center gap-1">
                <span>👩‍💻 QA Dev</span>
              </div>
              <div className="text-[9px] text-slate-500 truncate">dev@agam.com</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
