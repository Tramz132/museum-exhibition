import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary', // primary | secondary | danger | success | outline
  size = 'md', // sm | md | lg
  onClick,
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) => {
  // Base classes for consistent design
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  // Variant mappings matching our enterprise colors
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 focus:ring-blue-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 focus:ring-slate-500',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 focus:ring-emerald-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 focus:ring-rose-500',
    outline: 'bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white focus:ring-slate-500',
  };

  // Size mappings
  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} shrink-0`} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
