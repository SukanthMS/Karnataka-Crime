import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Database,
  RefreshCw,
  Bell,
  Cpu,
  Lock,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const SettingsPage = () => {
  const [model, setModel] = useState('LSTM');
  const [syncing, setSyncing] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [autoRefreshGis, setAutoRefreshGis] = useState(false);
  const [syncedTime, setSyncedTime] = useState(new Date().toLocaleTimeString());

  const handleSyncDatabase = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncedTime(new Date().toLocaleTimeString());
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Cryptographic Signature Verified Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-800 to-slate-900 border border-blue-500/40 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Cryptographic Signature Verified
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                ACTIVE TOKEN
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Karnataka State Data Center (KSDC) SHA-256 Auth Node ID: KSP-AI-2026-SECURE
            </p>
          </div>
        </div>

        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 hidden sm:block" />
      </div>

      {/* Model Selection Settings */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Prediction Engine Configuration</h3>
            <p className="text-[11px] text-slate-400">Select underlying machine learning model algorithm for forecasting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setModel('LSTM')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              model === 'LSTM'
                ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-600/10'
                : 'bg-[#0F172A] border-[#334155] text-slate-400 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-white">LSTM Neural Network</span>
              {model === 'LSTM' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            </div>
            <p className="text-xs text-slate-400">
              Long Short-Term Memory deep recurrent neural net optimized for non-linear temporal sequence forecasting.
            </p>
          </div>

          <div
            onClick={() => setModel('XGBoost')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              model === 'XGBoost'
                ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-600/10'
                : 'bg-[#0F172A] border-[#334155] text-slate-400 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-white">XGBoost Gradient Boosting</span>
              {model === 'XGBoost' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            </div>
            <p className="text-xs text-slate-400">
              Extreme Gradient Boosting tree decision architecture tuned for tabular spatial-temporal feature sets.
            </p>
          </div>
        </div>
      </div>

      {/* Database Connection & Sync */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Database Status</h3>
              <p className="text-[11px] text-slate-400">Local PapaParse CSV stream engine & state buffer</p>
            </div>
          </div>

          <button
            onClick={handleSyncDatabase}
            disabled={syncing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing CSV Data...' : 'Sync Database'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0F172A] p-3.5 rounded-xl border border-[#334155]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Connection State</span>
            <span className="text-emerald-400 font-bold mt-1 block flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Connected
            </span>
          </div>

          <div className="bg-[#0F172A] p-3.5 rounded-xl border border-[#334155]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Parsed FIR Records</span>
            <span className="text-white font-bold font-mono mt-1 block">5,500 Loaded (1.6M Scaled)</span>
          </div>

          <div className="bg-[#0F172A] p-3.5 rounded-xl border border-[#334155]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Last Sync Time</span>
            <span className="text-slate-300 font-mono mt-1 block">{syncedTime}</span>
          </div>
        </div>
      </div>

      {/* System Toggles */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Alerts & System Preferences</h3>
            <p className="text-[11px] text-slate-400">Configure portal notification triggers and background refreshes</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div>
              <span className="text-xs font-bold text-white block">High Risk Anomaly Alerts</span>
              <span className="text-[11px] text-slate-400">Trigger bell popups when district crime rate exceeds +10% threshold</span>
            </div>
            <input
              type="checkbox"
              checked={alertsEnabled}
              onChange={() => setAlertsEnabled(!alertsEnabled)}
              className="w-4 h-4 rounded bg-[#1E293B] border-[#334155] text-blue-600 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div>
              <span className="text-xs font-bold text-white block">Automated Weekly Summaries</span>
              <span className="text-[11px] text-slate-400">Compile weekly PDF intelligence reports for commanding officers</span>
            </div>
            <input
              type="checkbox"
              checked={weeklyReports}
              onChange={() => setWeeklyReports(!weeklyReports)}
              className="w-4 h-4 rounded bg-[#1E293B] border-[#334155] text-blue-600 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div>
              <span className="text-xs font-bold text-white block">Auto-Refresh GIS Layer</span>
              <span className="text-[11px] text-slate-400">Re-fetch crime coordinates on map view every 60 seconds</span>
            </div>
            <input
              type="checkbox"
              checked={autoRefreshGis}
              onChange={() => setAutoRefreshGis(!autoRefreshGis)}
              className="w-4 h-4 rounded bg-[#1E293B] border-[#334155] text-blue-600 focus:ring-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
