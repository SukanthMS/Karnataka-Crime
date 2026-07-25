import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  FileCode,
  CheckCircle2,
  TrendingUp,
  BarChart,
  PieChart as PieIcon,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { useCrimeData } from '../hooks/useCrimeData';
import { exportToCSV, exportToExcel, exportToPDF } from '../services/exportService';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

export const ReportsPage = () => {
  const [downloading, setDownloading] = useState(null);
  const { firs, topDistricts, monthlyTrend, crimeCategories, loading } = useCrimeData();

  const handleDownload = async (type, format) => {
    setDownloading(`${type}-${format}`);
    try {
      let exportData = firs;

      if (type === 'district') {
        exportData = topDistricts.map(d => ({
          District: d.district,
          'Total FIRs': d.firsCount,
          'Risk Level': d.riskLevel
        }));
      } else if (type === 'monthly') {
        exportData = monthlyTrend.map(m => ({
          Month: m.month,
          'Historical Crimes': m.crimes,
          'AI Predicted': m.predicted
        }));
      } else if (type === 'category') {
        exportData = crimeCategories.map(c => ({
          'Crime Category': c.fullName,
          'Incident Count': c.count,
          'Percentage Share': `${c.percentage}%`
        }));
      }

      const filename = `Karnataka_Police_${type.toUpperCase()}_Report.${format}`;

      if (format === 'csv') {
        exportToCSV(exportData, filename);
      } else if (format === 'xlsx') {
        exportToExcel(exportData, filename);
      } else if (format === 'pdf') {
        await exportToPDF('report-charts-preview', filename);
      }
    } catch (e) {
      console.error("Export error:", e);
    } finally {
      setTimeout(() => setDownloading(null), 800);
    }
  };

  if (loading) return <LoadingSkeleton count={4} height="h-32" />;

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="gov-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            Official Government Crime Report Generator
          </h3>
          <p className="text-[11px] text-slate-400">Generate and export official crime dossiers in CSV, Excel XLSX, and PDF formats</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <CheckCircle2 className="w-4 h-4" /> Live Data Exporter Active
        </div>
      </div>

      {/* 4 Report Generator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* District Wise Report */}
        <div className="gov-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
              <BarChart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase">District Wise Report</h4>
            <p className="text-[11px] text-slate-400 mt-1">Detailed Breakdown of all 31 Karnataka districts</p>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#334155]">
            <button
              onClick={() => handleDownload('district', 'csv')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Export CSV
            </button>
            <button
              onClick={() => handleDownload('district', 'xlsx')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Export Excel
            </button>
            <button
              onClick={() => handleDownload('district', 'pdf')}
              disabled={!!downloading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>

        {/* Crime Type Report */}
        <div className="gov-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <PieIcon className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase">Crime Type Report</h4>
            <p className="text-[11px] text-slate-400 mt-1">Distribution across IPC sections and offenses</p>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#334155]">
            <button
              onClick={() => handleDownload('category', 'csv')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Export CSV
            </button>
            <button
              onClick={() => handleDownload('category', 'xlsx')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Export Excel
            </button>
            <button
              onClick={() => handleDownload('category', 'pdf')}
              disabled={!!downloading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>

        {/* Monthly Trend Report */}
        <div className="gov-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase">Monthly Trend Report</h4>
            <p className="text-[11px] text-slate-400 mt-1">2024-2026 month-by-month incident progression</p>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#334155]">
            <button
              onClick={() => handleDownload('monthly', 'csv')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Export CSV
            </button>
            <button
              onClick={() => handleDownload('monthly', 'xlsx')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Export Excel
            </button>
            <button
              onClick={() => handleDownload('monthly', 'pdf')}
              disabled={!!downloading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>

        {/* Full Dataset Report */}
        <div className="gov-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase">Complete FIR Dataset</h4>
            <p className="text-[11px] text-slate-400 mt-1">Full state dataset containing all parsed records</p>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#334155]">
            <button
              onClick={() => handleDownload('all', 'csv')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Export CSV
            </button>
            <button
              onClick={() => handleDownload('all', 'xlsx')}
              disabled={!!downloading}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-700 text-slate-200 border border-[#334155] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Export Excel
            </button>
            <button
              onClick={() => handleDownload('all', 'pdf')}
              disabled={!!downloading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Report Preview Charts Container for PDF Print */}
      <div id="report-charts-preview" className="gov-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-[#334155] flex items-center gap-2">
          <BarChart className="w-4 h-4 text-blue-400" />
          Live State District Comparison Preview
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={topDistricts.slice(0, 8)}>
              <XAxis dataKey="district" stroke="#64748B" fontSize={10} />
              <YAxis stroke="#64748B" fontSize={10} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '10px' }} />
              <Bar dataKey="firsCount" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
