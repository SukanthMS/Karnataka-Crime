import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const HeaderBadge = ({ title = "KARNATAKA CRIME DASHBOARD" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Emblem Gold Box */}
      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/5">
        <Shield className="w-5 h-5 fill-amber-500/20" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold tracking-wider text-amber-500 uppercase">
            GOVERNMENT OF KARNATAKA
          </span>
          <span className="bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            KA-AI CRIME PORTAL
          </span>
        </div>
        <h1 className="text-xl font-black text-white tracking-tight uppercase">
          {title}
        </h1>
      </div>
    </div>
  );
};
