import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  ClipboardList, 
  CheckSquare, 
  Database, 
  ShieldAlert, 
  Award,
  Layers
} from 'lucide-react';

const Sidebar = () => {
  const { currentRole, currentUser } = useApp();

  // Define sidebar menu items based on role
  const menuItems = {
    PANITIA: [
      {
        name: 'Katalog & Pengajuan',
        path: '/panitia',
        icon: Compass,
      },
    ],
    STAF: [
      {
        name: 'Verifikasi Peminjaman',
        path: '/staf',
        icon: CheckSquare,
      },
    ],
    ADMIN: [
      {
        name: 'Manajemen Aset',
        path: '/admin',
        icon: Database,
      },
    ],
  };

  const currentMenu = menuItems[currentRole] || [];

  return (
    <aside className="w-64 glass-card min-h-screen flex flex-col justify-between border-r border-slate-800 text-slate-200">
      {/* Brand Logo Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-500">
            <Award className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 leading-tight tracking-wider">
              NUSA<span className="text-amber-500">MUSEUM</span>
            </h2>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
              Exhibition Hub
            </span>
          </div>
        </div>

        {/* User Profile Mini Card */}
        <div className="p-4 mx-4 my-6 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full border border-slate-700 object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">{currentUser.name}</p>
            <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Menu Utama
          </div>
          {currentMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-800/80 text-[11px] text-slate-500 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-400">
          <Layers className="h-3 w-3 text-amber-500" />
          <span>RBAC System Active</span>
        </div>
        <p>© 2026 NusaMuseum. v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
