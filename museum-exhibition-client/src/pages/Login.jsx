import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApp from '../hooks/useApp';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Boxes, AlertCircle, KeyRound, Mail } from 'lucide-react';

const Login = () => {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect them to their respective dashboard
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'PANITIA') navigate('/panitia');
      else if (currentUser.role === 'STAF') navigate('/staf');
      else if (currentUser.role === 'ADMIN') navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi!');
      return;
    }

    setLoading(true);
    // Add small delay to simulate server communication lag
    setTimeout(() => {
      const res = login(email.trim(), password);
      setLoading(false);
      
      if (res.success) {
        // Redirection is handled in useEffect but let's do it here as well for speed
        const targetRole = res.role; 
        // Note: AppContext returns the role info, let's verify redirect
      } else {
        setError(res.message);
      }
    }, 800);
  };

  const fillMockCredentials = (mockEmail) => {
    setEmail(mockEmail);
    setPassword('123456');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Museum Branding Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-blue-500 mb-2">
            <Boxes className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-105 tracking-wide uppercase">
            NUSA<span className="text-blue-500">MUSEUM</span>
          </h2>
          <p className="text-xs text-slate-400">
            Sistem Peminjaman Aset Pameran Eksternal
          </p>
        </div>

        {/* Login Box */}
        <Card className="p-6 md:p-8 bg-slate-900/40 border-slate-800">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6 text-center">
            Masuk ke Akun Anda
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Input
                label="Alamat Email"
                name="email"
                type="email"
                placeholder="contoh: panitia@museum.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 mt-4"
              disabled={loading}
            >
              {loading ? 'Menghubungkan...' : 'Masuk'}
            </Button>
          </form>
        </Card>

        {/* Demo Credential Assistant */}
        <div className="bg-slate-900/20 border border-slate-850 p-4.5 rounded-2xl space-y-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
            Pintasan Akun Demo (Klik untuk Isi)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => fillMockCredentials('panitia@museum.id')}
              className="px-2 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-[10px] font-bold text-slate-350 transition-all cursor-pointer text-center"
            >
              Panitia
            </button>
            <button
              onClick={() => fillMockCredentials('staf@museum.id')}
              className="px-2 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-[10px] font-bold text-slate-350 transition-all cursor-pointer text-center"
            >
              Staf
            </button>
            <button
              onClick={() => fillMockCredentials('admin@museum.id')}
              className="px-2 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-[10px] font-bold text-slate-350 transition-all cursor-pointer text-center"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
