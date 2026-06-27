import React from 'react';

const Table = ({
  headers = [], // Array of string or objects { label, className }
  children,
  className = '',
  emptyMessage = 'Tidak ada data yang tersedia.',
  isEmpty = false,
  ...props
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/10 shadow-xl ${className}`} {...props}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-850 bg-slate-900/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {headers.map((header, index) => {
                const isObj = typeof header === 'object' && header !== null;
                const label = isObj ? header.label : header;
                const headerClass = isObj ? header.className : '';
                return (
                  <th key={index} className={`p-4 font-bold ${headerClass}`}>
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {isEmpty ? (
              <tr>
                <td colSpan={headers.length} className="p-8 text-center text-slate-500 font-medium">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
