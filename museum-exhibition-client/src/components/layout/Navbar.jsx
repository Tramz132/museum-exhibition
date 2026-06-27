import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApp from '../../hooks/useApp';
import { RefreshCw, Bell, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSwitch = (e) => {
    const role = e.target.value;
    switchRole(role);
    
    // Smooth route transition depending on target role
    if (role === 'PANITIA') navigate('/panitia');
    else if (role === 'STAF') navigate('/staf');
    else if (role === 'ADMIN') navigate('/admin');
  };

  return (
    <header className="glass-nav sticky top-0 z-40 w-full flex items-center justify-between px-6 py-4 text-slate-100">
      {/* Navbar Title */}
      <div>
        <h1 className="text-md font-bold text-slate-150 m-0 tracking-tight flex items-center gap-2">
          <span>Manajemen Pameran Eksternal</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20">
            PROD READY
          </span>
        </h1>
      </div>

      {/* Control panel */}
      {currentUser && (
        <div className="flex items-center gap-5">
          {/* Quick Switch simulator */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              <RefreshCw className="h-3 w-3 text-blue-500 animate-spin-slow" />
              <span>Simulasi:</span>
            </div>
            <select
              value={currentUser.role}
              onChange={handleRoleSwitch}
              className="bg-transparent border-0 text-slate-200 text-xs font-bold focus:outline-none focus:ring-0 cursor-pointer p-0 pr-6"
            >
              <option value="PANITIA">Panitia (Peminjam)</option>
              <option value="STAF">Staf (Approver)</option>
              <option value="ADMIN">Admin (Maintenance)</option>
            </select>
          </div>

          {/* Profile and notification indicators */}
          <div className="flex items-center gap-4 border-l border-slate-850 pl-5">
            <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-850 rounded-xl transition-all relative cursor-pointer">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            </button>
            
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-250 leading-none">{currentUser.name}</p>
                <span className="text-[9px] font-semibold text-slate-500 uppercase">{currentUser.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
