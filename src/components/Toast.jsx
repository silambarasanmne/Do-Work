import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm w-full px-3">
      <div className="glass-strong rounded-xl p-3 border border-white/90 shadow-xl flex items-start gap-2.5 backdrop-blur-xl">
        <div className="mt-0.5">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          ) : (
            <Info className="w-4 h-4 text-[#96a01d]" />
          )}
        </div>

        <div className="flex-1 text-left">
          <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
            {toast.title}
          </h4>
          <p className="text-[11px] text-slate-600 font-medium leading-snug mt-0.5">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
