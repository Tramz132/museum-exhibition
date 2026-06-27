import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useApp from '../../hooks/useApp';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  ShieldCheck, 
  Users, 
  LogOut,
  Boxes
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Nav configurations based on role
  const menuConfig = {
    PANITIA: [
      {
        name: 'Dashboard Panitia',
        path: '/panitia',
        icon: LayoutDashboard,
      },
    ],
    STAF: [
      {
        name: 'Verifikasi Peminjaman',
        path: '/staf',
        icon: ShieldCheck,
      },
    ],
    ADMIN: [
      {
        name: 'Manajemen Aset',
        path: '/admin',
        icon: Package,
      },
    ],
  };

  const navItems = menuConfig[currentUser?.role] || [];

  return (
    <aside className="w-64 glass-card min-h-screen flex flex-col justify-between border-r border-slate-800/80 text-slate-200 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-500">
            <Boxes className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-100 leading-tight tracking-wider uppercase">
              NUSA<span className="text-blue-500">MUSEUM</span>
            </h2>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mt-0.5">
              Exhibition Hub
            </span>
          </div>
        </div>

        {/* Current User Profile Card */}
        <div className="p-4 mx-4 my-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full border border-slate-700 object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate">{currentUser?.name}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md uppercase tracking-wider">
              {currentUser?.role}
            </span>
          </div>
        </div>

        {/* Sidebar Nav links */}
        <nav className="px-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Menu Utama
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-400 hover:text-slate-150 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Footer */}
      <div className="p-4 border-t border-slate-850">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold text-rose-450 hover:text-white hover:bg-rose-600/10 border border-transparent hover:border-rose-600/20 transition-all cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0 text-rose-500" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
