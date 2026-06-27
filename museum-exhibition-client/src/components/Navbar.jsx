import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Bell, RefreshCw, UserCheck, Shield } from 'lucide-react';

const Navbar = () => {
  const { currentRole, currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    switchRole(newRole);
    // Redirect to the appropriate dashboard on role switch to ensure smooth routing simulation
    if (newRole === 'PANITIA') {
      navigate('/panitia');
    } else if (newRole === 'STAF') {
      navigate('/staf');
    } else if (newRole === 'ADMIN') {
      navigate('/admin');
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-40 w-full flex items-center justify-between px-6 py-4 text-slate-100">
      {/* Title / Description */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 m-0 tracking-tight flex items-center gap-2">
          <span>Sistem Peminjaman Pameran Eksternal</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Mock Mode
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Kelola aset museum untuk pameran luar area dengan Role-Based Access Control
        </p>
      </div>

      {/* Right Side Control Bar */}
      <div className="flex items-center gap-6">
        {/* Quick Switch Role Simulator Panel */}
        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <RefreshCw className="h-3.5 w-3.5 animate-spin-slow text-amber-500" />
            <span>Simulasi Role:</span>
          </div>
          <select
            value={currentRole}
            onChange={handleRoleChange}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="PANITIA">Panitia (Peminjam)</option>
            <option value="STAF">Staf (Approver)</option>
            <option value="ADMIN">Admin (Maintenance)</option>
          </select>
        </div>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
          {/* Notification Icon */}
          <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>

          {/* User Display Badge */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-200 leading-none">{currentUser.name}</p>
              <span className="text-[10px] font-semibold text-slate-400">{currentRole} account</span>
            </div>
            <div className="p-1 bg-slate-800/80 border border-slate-700 rounded-lg">
              <Shield className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
