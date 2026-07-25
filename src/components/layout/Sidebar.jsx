import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  MapPin,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Crime Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'FIR Management', path: '/firs', icon: FileText },
    { name: 'Crime Map', path: '/map', icon: MapPin },
    { name: 'AI Prediction', path: '/prediction', icon: Sparkles },
    { name: 'Officers', path: '/officers', icon: ShieldCheck },
    { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-[#0F172A] border-r border-[#334155] h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header Logo */}
      <div>
        <div className="h-20 flex items-center px-5 border-b border-[#334155] gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 shadow-lg shadow-amber-500/10">
            <Shield className="w-6 h-6 fill-amber-500/30" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight overflow-hidden whitespace-nowrap">
              <span className="font-extrabold text-amber-500 text-sm tracking-wider uppercase">
                KARNATAKA POLICE
              </span>
              <span className="font-bold text-blue-400 text-[10px] tracking-widest uppercase">
                AI CRIME DETECTION
              </span>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group relative ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    {!collapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Box & Collapse Toggle */}
      <div className="p-3 border-t border-[#334155]">
        {!collapsed ? (
          <div className="bg-[#1E293B] border border-[#334155] p-3 rounded-xl mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              KA-AI v2.4 Active • Models Synced
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-9 bg-[#1E293B] border border-[#334155] rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
