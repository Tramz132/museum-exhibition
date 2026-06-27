import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [], // [{ value, label }]
  required = false,
  error = '',
  className = '',
  ...props
}) => {
  const selectBaseClasses = `w-full bg-slate-950 border text-xs text-slate-100 rounded-xl px-4 py-3 placeholder-slate-600 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer ${
    error 
      ? 'border-rose-500/85 focus:border-rose-500' 
      : 'border-slate-800 focus:border-blue-500/80'
  }`;

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={selectBaseClasses}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-950 text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-[10px] font-semibold text-rose-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
