import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const { currentRole } = useApp();
  const navigate = useNavigate();

  const handleReturn = () => {
    // Navigate user back to their authorized role dashboard
    if (currentRole === 'PANITIA') {
      navigate('/panitia');
    } else if (currentRole === 'STAF') {
      navigate('/staf');
    } else if (currentRole === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70svh] text-center p-6 space-y-6">
      {/* Icon Area */}
      <div className="p-4 bg-rose-500/10 border border-rose-500/25 text-rose-500 rounded-3xl animate-bounce">
        <ShieldAlert className="h-16 w-16" />
      </div>

      {/* Message Area */}
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">Akses Ditolak (Unauthorized)</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Maaf, Anda tidak memiliki izin yang cukup untuk mengakses halaman ini. Peran (role) Anda saat ini didaftarkan sebagai <span className="font-bold text-amber-500">{currentRole}</span>.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleReturn}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-slate-100 text-xs font-bold rounded-xl border border-slate-700/80 transition-all shadow-lg"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Kembali ke Dashboard Saya</span>
      </button>
    </div>
  );
};

export default Unauthorized;
