import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApp from '../hooks/useApp';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const handleReturn = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Redirect user to their designated dashboard
    if (currentUser.role === 'PANITIA') navigate('/panitia');
    else if (currentUser.role === 'STAF') navigate('/staf');
    else if (currentUser.role === 'ADMIN') navigate('/admin');
    else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center bg-slate-900/40 border-slate-800 space-y-6">
        {/* Error icon overlay */}
        <div className="inline-flex p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-3xl animate-pulse">
          <ShieldAlert className="h-12 w-12" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-100 tracking-tight">Halaman Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau Anda salah memasukkan alamat URL.
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="secondary"
          onClick={handleReturn}
          className="w-full"
          icon={ArrowLeft}
        >
          Kembali ke Halaman Utama
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
