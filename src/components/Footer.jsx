import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export default function Footer({ onTabChange }) {
  return (
    <footer className="mt-4 px-2 sm:px-4 w-full max-w-full z-10 relative">
      <div className="glass-nav rounded-xl px-4 py-2.5 border border-white/80 shadow-md text-slate-700 w-full">
        
        {/* Top/Main Footer Content Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-2 border-b border-slate-200/50">
          
          {/* Left: Brand & Status */}
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#96a01d] to-[#7a8315] text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 font-extrabold text-xs text-slate-900 leading-none">
                <span>AGAM Project Management</span>
                <span className="text-[8px] px-1 py-0.2 rounded bg-[#96a01d]/25 text-slate-950 border border-[#96a01d]/40 font-extrabold">
                  v1.0.0
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-medium leading-none mt-0.5">Enterprise Glassmorphism Lifecycle Platform</p>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-3.5 text-[11px] font-semibold text-slate-600">
            <button
              onClick={() => onTabChange('projects')}
              className="hover:text-slate-900 transition-colors"
            >
              Projects
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onTabChange('workspace')}
              className="hover:text-slate-900 transition-colors"
            >
              Workspace
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onTabChange('applications')}
              className="hover:text-slate-900 transition-colors"
            >
              Applications
            </button>
            <span className="text-slate-300">•</span>
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-0.5"
            >
              <span>Docs</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
            </a>
          </div>

          {/* Right: Operational Badge */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold border border-emerald-200 flex items-center gap-1 shadow-xs">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              Operational 99.99%
            </span>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 text-[9px] font-medium text-slate-500">
          <div>
            © 2026 AGAM Inc. Architected by <strong className="text-slate-800">Silambarasan</strong>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span>React + Glassmorphism UI (#96a01d)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
