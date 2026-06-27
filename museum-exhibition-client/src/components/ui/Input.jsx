import React from 'react';

const Input = ({
  label,
  name,
  type = 'text', // text | date | email | password | textarea
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  rows = 3,
  className = '',
  ...props
}) => {
  const inputBaseClasses = `w-full bg-slate-950 border text-xs text-slate-100 rounded-xl px-4 py-3 placeholder-slate-600 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/50 ${
    error 
      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20' 
      : 'border-slate-800 focus:border-blue-500/80'
  }`;

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputBaseClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputBaseClasses}
          {...props}
        />
      )}

      {error && (
        <p className="text-[10px] font-semibold text-rose-500 tracking-wide mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
