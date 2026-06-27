import React from 'react';

const PageHeader = ({
  title,
  description,
  children, // Optional action elements like buttons
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-md ${className}`}>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight leading-none">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
