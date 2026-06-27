import React, { useState } from 'react';
import useApp from '../hooks/useApp';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/ui/StatCard';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { formatDate } from '../utils/helper';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ListTodo, 
  MapPin, 
  Calendar, 
  UserCircle,
  Check,
  X
} from 'lucide-react';

const StafDashboard = () => {
  const { loanRequests, approveLoan, rejectLoan } = useApp();
  const [filter, setFilter] = useState('Pending'); // Pending | Approved | Rejected | Semua

  // ConfirmDialog State
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    type: 'approve', // approve | reject
    loanId: null,
    itemName: '',
  });

  // Filter requests
  const filteredLoans = loanRequests.filter((req) => {
    if (filter === 'Semua') return true;
    return req.status === filter;
  });

  // Stats calculation
  const totalCount = loanRequests.length;
  const pendingCount = loanRequests.filter((l) => l.status === 'Pending').length;
  const approvedCount = loanRequests.filter((l) => l.status === 'Approved').length;
  const rejectedCount = loanRequests.filter((l) => l.status === 'Rejected').length;

  const stats = [
    { title: 'Menunggu Verifikasi', value: pendingCount, icon: Clock, variant: 'warning' },
    { title: 'Disetujui (Approved)', value: approvedCount, icon: CheckCircle, variant: 'success' },
    { title: 'Ditolak (Rejected)', value: rejectedCount, icon: XCircle, variant: 'danger' },
    { title: 'Total Permohonan', value: totalCount, icon: ListTodo, variant: 'primary' },
  ];

  // Open confirmation dialog
  const openConfirmDialog = (type, loan) => {
    setConfirmState({
      isOpen: true,
      type,
      loanId: loan.id,
      itemName: loan.namaBarang,
    });
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmState({
      isOpen: false,
      type: 'approve',
      loanId: null,
      itemName: '',
    });
  };

  // Handle confirm action
  const handleConfirmAction = () => {
    const { type, loanId } = confirmState;
    if (type === 'approve') {
      approveLoan(loanId);
    } else {
      rejectLoan(loanId);
    }
    closeConfirmDialog();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="Dashboard Verifikasi Staf" 
        description="Verifikasi permohonan peminjaman aset museum dari Panitia Pameran eksternal."
      >
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {['Pending', 'Approved', 'Rejected', 'Semua'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status} {status === 'Pending' ? `(${pendingCount})` : ''}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Request Verification Grid Table */}
      <div className="animate-fade-in">
        <Table
          headers={[
            'Pemohon Pameran',
            'Barang Museum',
            'Detail Acara & Lokasi',
            'Masa Pameran',
            'Tanggal Pengajuan',
            { label: 'Status', className: 'text-center' },
            { label: 'Aksi Verifikasi', className: 'text-right' }
          ]}
          isEmpty={filteredLoans.length === 0}
          emptyMessage={`Tidak ada permohonan peminjaman dengan status "${filter}".`}
        >
          {filteredLoans.map((loan) => (
            <tr key={loan.id} className="hover:bg-slate-900/25 transition-all text-slate-350">
              {/* Requester */}
              <td className="p-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-800/80 rounded-lg text-slate-400 border border-slate-700/50">
                    <UserCircle className="h-4.5 w-4.5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">{loan.peminjam}</p>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Panitia</span>
                  </div>
                </div>
              </td>

              {/* Item details */}
              <td className="p-4">
                <p className="font-bold text-blue-500">{loan.namaBarang}</p>
                <span className="text-[9px] text-slate-500 font-semibold uppercase">ID Aset: #{loan.barangId}</span>
              </td>

              {/* Event / Location */}
              <td className="p-4 space-y-1 max-w-xs">
                <p className="font-semibold text-slate-200 truncate">{loan.namaAcara}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <MapPin className="h-3 w-3 text-slate-600" />
                  <span className="truncate">{loan.lokasi}</span>
                </div>
              </td>

              {/* Event duration */}
              <td className="p-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-650" />
                  <span>{formatDate(loan.tanggalMulai)} - {formatDate(loan.tanggalSelesai)}</span>
                </div>
              </td>

              {/* Request Date */}
              <td className="p-4 text-slate-450 font-semibold">{formatDate(loan.tanggalPengajuan)}</td>

              {/* Status Badge */}
              <td className="p-4 text-center">
                <Badge status={loan.status}>{loan.status}</Badge>
              </td>

              {/* Action columns */}
              <td className="p-4 text-right">
                {loan.status === 'Pending' ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openConfirmDialog('reject', loan)}
                      className="px-2.5 py-1.5 border-rose-600/30 hover:bg-rose-500/10 text-rose-500 hover:text-rose-450"
                      icon={X}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => openConfirmDialog('approve', loan)}
                      className="px-3.5 py-1.5 shadow-emerald-600/15"
                      icon={Check}
                    >
                      Setujui
                    </Button>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pr-2">
                    Terverifikasi
                  </span>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* CONFIRM DIALOG OVERLAYS */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmAction}
        title={confirmState.type === 'approve' ? 'Setujui Pengajuan Peminjaman' : 'Tolak Pengajuan Peminjaman'}
        message={
          confirmState.type === 'approve'
            ? `Apakah Anda yakin ingin menyetujui peminjaman barang "${confirmState.itemName}"? Tindakan ini secara otomatis akan mengubah status ketersediaan barang tersebut menjadi "Dipinjam".`
            : `Apakah Anda yakin ingin menolak permohonan peminjaman barang "${confirmState.itemName}"? Barang tersebut akan tetap berstatus "Tersedia" di katalog.`
        }
        confirmText={confirmState.type === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
        cancelText="Batal"
        variant={confirmState.type === 'approve' ? 'success' : 'danger'}
      />
    </div>
  );
};

export default StafDashboard;
