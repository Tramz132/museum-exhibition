import React from 'react';
import Card from './Card';

const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = 'primary', // primary (blue) | success (emerald) | warning (amber) | danger (rose) | info (sky)
  className = '',
  ...props
}) => {
  const iconVariants = {
    primary: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
    danger: 'bg-rose-500/10 border-rose-500/20 text-rose-500',
    info: 'bg-sky-500/10 border-sky-500/20 text-sky-500',
  };

  return (
    <Card className={`p-5 flex items-center justify-between bg-slate-900/60 ${className}`} {...props}>
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
          {title}
        </span>
        <p className="text-2xl font-black text-slate-100 leading-none">
          {value}
        </p>
      </div>
      {Icon && (
        <div className={`p-3 border rounded-xl ${iconVariants[variant]}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      )}
    </Card>
  );
};

export default StatCard;
