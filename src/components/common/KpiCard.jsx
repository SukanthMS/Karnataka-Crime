import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const KpiCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = 'up',
  iconColor = 'text-blue-500',
  iconBg = 'bg-blue-500/10 border-blue-500/20',
  isPercentage = false
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value !== 'number') return;
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = (end - start) / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const formattedValue = isPercentage
    ? `${value}%`
    : typeof value === 'number'
    ? formatNumber(displayValue)
    : value;

  return (
    <div className="gov-card p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            {title}
          </span>
          <div className="text-3xl font-black text-white mt-2 tracking-tight">
            {formattedValue}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          {trendDirection === 'up' ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {trend}
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              {trend}
            </span>
          )}
          <span className="text-slate-400 text-[11px]">vs last month</span>
        </div>
      )}
    </div>
  );
};
