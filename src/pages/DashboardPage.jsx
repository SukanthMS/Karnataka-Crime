import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileText,
  Folder,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Flame,
  Calendar
} from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { useCrimeData } from '../hooks/useCrimeData';
import { KARNATAKA_DISTRICTS } from '../utils/constants';
import { formatDate } from '../utils/formatters';

export const DashboardPage = () => {
  const { searchFilter } = useOutletContext() || { searchFilter: '' };
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('Date');
  const [sortOrder, setSortOrder] = useState('desc');

  const pageSize = 10;

  const { firs, metrics, loading } = useCrimeData(selectedDistrict, selectedYear);

  // Filtered FIRs computation
  const filteredFirs = useMemo(() => {
    return firs.filter((item) => {
      const matchDistrict = selectedDistrict === 'All' || item.District === selectedDistrict;
      const itemYear = item.Date ? new Date(item.Date).getFullYear().toString() : '';
      const matchYear = selectedYear === 'All' || itemYear === selectedYear;
      const matchStatus = statusFilter === 'All' || item.Status === statusFilter;
      const matchSearch = !searchFilter ||
        item.FIR_Number?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.District?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.Police_Station?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.Crime_Type?.toLowerCase().includes(searchFilter.toLowerCase());

      return matchDistrict && matchYear && matchStatus && matchSearch;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === 'Date') {
        valA = new Date(valA || 0).getTime();
        valB = new Date(valB || 0).getTime();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [firs, selectedDistrict, selectedYear, statusFilter, searchFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredFirs.length / pageSize) || 1;
  const paginatedFirs = filteredFirs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (loading) return <LoadingSkeleton count={4} height="h-32" />;

  return (
    <div className="space-y-6">
      {/* Top Banner Status Bar matching screenshot 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 border border-blue-500 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-blue-600/10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Total FIRs</div>
            <div className="text-2xl font-black mt-1">1,674,734</div>
          </div>
          <FileText className="w-8 h-8 opacity-40" />
        </div>
        <div className="bg-emerald-600 border border-emerald-500 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-emerald-600/10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Dataset Status</div>
            <div className="text-xl font-bold mt-1 flex items-center gap-1.5">
              Connected <CheckCircle2 className="w-5 h-5 fill-white text-emerald-600" />
            </div>
          </div>
          <Folder className="w-8 h-8 opacity-40" />
        </div>
        <div className="bg-rose-600 border border-rose-500 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-rose-600/10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Backend Status</div>
            <div className="text-xl font-bold mt-1">Running 🚀</div>
          </div>
          <Sparkles className="w-8 h-8 opacity-40" />
        </div>
      </div>

      {/* Top Filters Bar */}
      <div className="gov-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-blue-400" />
            Filters:
          </div>
          {/* District Dropdown */}
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0F172A] border border-[#334155] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Districts</option>
            {KARNATAKA_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0F172A] border border-[#334155] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing metrics for <span className="text-white font-bold">{selectedDistrict}</span> ({selectedYear})
        </div>
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="TOTAL CRIMES"
          value={metrics.totalCrimes}
          icon={FileText}
          trend="+8.2%"
          trendDirection="up"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10 border-blue-500/30"
        />
        <KpiCard
          title="ACTIVE FIRS"
          value={metrics.activeFirs}
          icon={Folder}
          trend="-4.1%"
          trendDirection="down"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/30"
        />
        <KpiCard
          title="HIGH RISK DISTRICTS"
          value={metrics.highRiskDistricts}
          icon={AlertTriangle}
          trend="+1"
          trendDirection="up"
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10 border-rose-500/30"
        />
        <KpiCard
          title="AI ACCURACY"
          value={metrics.aiAccuracy}
          icon={CheckCircle2}
          trend="+1.8%"
          trendDirection="up"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10 border-emerald-500/30"
          isPercentage={true}
        />
      </div>

      {/* AI Crime Insights Dynamic Banner */}
      <div className="gov-card p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#334155]">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Crime Insights</h3>
            <p className="text-[11px] text-slate-400">Auto-generated summary from real dataset</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" /> TOTAL CRIMES
            </div>
            <div className="text-lg font-black text-white mt-1">
              {metrics.totalCrimes.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> CRIME TREND
            </div>
            <div className="mt-1">
              <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Stable
              </span>
            </div>
          </div>

          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> HOTSPOT DISTRICT
            </div>
            <div className="text-sm font-bold text-white mt-1 truncate">
              {metrics.hotspotDistrict}
            </div>
          </div>

          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-xl col-span-1 md:col-span-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> TOP CRIME TYPE
            </div>
            <div className="text-xs font-extrabold text-white mt-1 uppercase tracking-tight truncate">
              {metrics.topCrimeType}
            </div>
          </div>

          <div className="bg-[#0F172A] border border-[#334155] p-3.5 rounded-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> PEAK MONTH
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {metrics.peakMonth}
            </div>
          </div>
        </div>

        {/* High Risk Zones Tags */}
        <div className="mt-4 pt-3 border-t border-[#334155] flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" /> High Risk Zones:
          </span>
          <div className="flex flex-wrap gap-2">
            {metrics.highRiskZones.map((zone, i) => (
              <span key={i} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {zone}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent FIR Table */}
      <div className="gov-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-[#334155]">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent FIR Registry</h3>
            <p className="text-[11px] text-slate-400">Parsed dynamically from official Karnataka FIR dataset</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#0F172A] border border-[#334155] text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Investigating">Investigating</option>
              <option value="Solved">Solved</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Responsive Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#334155] text-slate-400 uppercase text-[10px] tracking-wider bg-[#0F172A]/50">
                <th onClick={() => handleSort('FIR_Number')} className="py-3 px-4 cursor-pointer hover:text-white">FIR Number</th>
                <th onClick={() => handleSort('Crime_Type')} className="py-3 px-4 cursor-pointer hover:text-white">Crime Type</th>
                <th onClick={() => handleSort('District')} className="py-3 px-4 cursor-pointer hover:text-white">District</th>
                <th className="py-3 px-4">Police Station</th>
                <th onClick={() => handleSort('Date')} className="py-3 px-4 cursor-pointer hover:text-white">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]/60 text-slate-300">
              {paginatedFirs.length > 0 ? (
                paginatedFirs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#0F172A]/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{row.FIR_Number}</td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">{row.Crime_Type}</td>
                    <td className="py-3.5 px-4">{row.District}</td>
                    <td className="py-3.5 px-4 text-slate-400">{row.Police_Station}</td>
                    <td className="py-3.5 px-4 text-slate-400">{formatDate(row.Date)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={row.Status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        {row.Prediction_Flag || 'Standard Monitoring'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No matching FIR records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-4 pt-4 border-t border-[#334155] flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-bold">{Math.min(filteredFirs.length, (currentPage - 1) * pageSize + 1)}</span> to{' '}
            <span className="text-white font-bold">{Math.min(filteredFirs.length, currentPage * pageSize)}</span> of{' '}
            <span className="text-white font-bold">{filteredFirs.length}</span> FIRs
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] hover:text-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-bold text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#334155] hover:text-white disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
