import React from 'react';

const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'glass-card rounded-2xl overflow-hidden shadow-xl border border-slate-800/80 transition-all duration-300';
  const hoverClasses = hoverable 
    ? 'hover:scale-[1.01] hover:shadow-2xl hover:border-slate-700/80 cursor-pointer' 
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
