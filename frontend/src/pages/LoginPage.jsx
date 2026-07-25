import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff, Sparkles, MapPin, Database, CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';

export const LoginPage = () => {
  const [username, setUsername] = useState('officer');
  const [password, setPassword] = useState('karnataka2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 200);
  };

  return (
    <div className="gov-bg-container min-h-screen w-full text-white flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
      {/* Login Main Container - 60% Left Hero / 40% Right Glass Card */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Section (60%) */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <img src="/karnataka_emblem.png" alt="Karnataka Emblem" className="w-5 h-5 object-contain" />
              Government of Karnataka • Official Intelligence Portal
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              KARNATAKA POLICE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
                AI CRIME DETECTION SYSTEM
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Enterprise AI Powered Crime Analytics Platform for state-level predictive risk modeling, GIS incident tracking, and law enforcement intelligence.
            </p>
          </div>

          {/* 4 Premium Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="gov-card p-4 flex items-start gap-3.5 hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-[14px] bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Crime Prediction</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">94.2% accuracy machine learning risk forecasting & patrol dispatch.</p>
              </div>
            </div>

            <div className="gov-card p-4 flex items-start gap-3.5 hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-[14px] bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">FIR Analytics</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">Incident trend analysis and multi-year historical tracking.</p>
              </div>
            </div>

            <div className="gov-card p-4 flex items-start gap-3.5 hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Crime Heat Maps</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">Real-time spatial GIS clustering across all 31 districts.</p>
              </div>
            </div>

            <div className="gov-card p-4 flex items-start gap-3.5 hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-[14px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Secure Government Network</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">256-bit encrypted state police intelligence pipeline.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (40%) - Floating Glass Login Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="gov-card p-8 w-full max-w-md shadow-2xl bg-[#0F172A]/85 backdrop-blur-2xl border border-slate-700/60 rounded-[22px]">
            {/* Header Emblem Logo */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-700/60">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10 mb-3">
                <img src="/karnataka_emblem.png" alt="State Emblem" className="w-12 h-12 object-contain" />
              </div>
              <span className="text-[10px] font-extrabold tracking-wider text-amber-500 uppercase">
                Government of Karnataka
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight mt-0.5">Officer Portal Login</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Enter your badge credentials to authenticate</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 mt-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Username / Badge ID
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter badge ID or username..."
                    className="w-full bg-[#070E1E] border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-[#070E1E] border border-slate-700 text-white text-xs rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword((prev) => !prev);
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 z-10 p-1 text-slate-400 hover:text-white cursor-pointer focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-blue-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-[#070E1E] text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  Remember badge session
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact Karnataka State Police System Admin to reset badge password."); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Security Notice */}
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Secure Government Network • 256-Bit Encrypted • Official Karnataka Police</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

