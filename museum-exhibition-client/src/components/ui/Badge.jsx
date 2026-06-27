import React from 'react';
import { getStatusBadgeColor } from '../../utils/helper';

const Badge = ({
  children,
  status = null, // Will use helper if status is passed (e.g., Tersedia, Pending, Approved)
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border';
  
  // Resolve classes based on status string, or fallback to a default slate styling
  const statusClasses = status 
    ? getStatusBadgeColor(status) 
    : 'bg-slate-800 text-slate-300 border-slate-700/60';

  // Extract a pulsing indicator for active statuses
  const showPulse = status === 'Tersedia' || status === 'Pending';
  const pulseColor = status === 'Tersedia' ? 'bg-emerald-400' : 'bg-amber-400';

  return (
    <span
      className={`${baseClasses} ${statusClasses} ${className}`}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${pulseColor}`}></span>
        </span>
      )}
      <span>{children || status}</span>
    </span>
  );
};

export default Badge;
