import React, { useState } from 'react';
import useApp from '../hooks/useApp';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { formatDate } from '../utils/helper';
import { 
  Package, 
  CheckCircle, 
  FileText, 
  ThumbsUp, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  PlusCircle, 
  Clock, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

const PanitiaDashboard = () => {
  const { museumItems, loanRequests, addLoanRequest, currentUser } = useApp();
  
  // Dashboard Tabs & Filters
  const [activeTab, setActiveTab] = useState('katalog'); // katalog | riwayat
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua'); // Semua | Tersedia | Dipinjam | Perbaikan

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Filter My Requests
  const myRequests = loanRequests.filter(
    (req) => req.peminjam.startsWith(currentUser?.name || '')
  );
  const approvedRequests = myRequests.filter((req) => req.status === 'Approved');

  // Stats Data
  const stats = [
    { title: 'Total Barang', value: museumItems.length, icon: Package, variant: 'primary' },
    { 
      title: 'Barang Tersedia', 
      value: museumItems.filter((i) => i.status === 'Tersedia').length, 
      icon: CheckCircle, 
      variant: 'success' 
    },
    { title: 'Pengajuan Saya', value: myRequests.length, icon: FileText, variant: 'warning' },
    { title: 'Approved', value: approvedRequests.length, icon: ThumbsUp, variant: 'info' },
  ];

  // Filter & Search Catalog Items
  const filteredItems = museumItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.origin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Open Loan Form Modal
  const handleOpenLoanModal = (item) => {
    setSelectedItem(item);
    setFormData({
      eventName: '',
      location: '',
      startDate: '',
      endDate: '',
    });
    setErrors({});
    setSubmitSuccess('');
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess('');

    const newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = 'Nama Acara wajib diisi!';
    if (!formData.location.trim()) newErrors.location = 'Lokasi Pameran wajib diisi!';
    if (!formData.startDate) newErrors.startDate = 'Tanggal mulai wajib dipilih!';
    if (!formData.endDate) newErrors.endDate = 'Tanggal selesai wajib dipilih!';
    
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'Tanggal selesai tidak boleh sebelum tanggal mulai!';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit request to global context state
    addLoanRequest({
      barangId: selectedItem.id,
      namaBarang: selectedItem.name,
      namaAcara: formData.eventName,
      lokasi: formData.location,
      tanggalMulai: formData.startDate,
      tanggalSelesai: formData.endDate,
    });

    setSubmitSuccess('Pengajuan peminjaman berhasil dikirim! Menunggu konfirmasi dari staf.');
    
    // Smooth delay for auto switching view
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedItem(null);
      setSubmitSuccess('');
      setActiveTab('riwayat');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header component */}
      <PageHeader 
        title="Dashboard Panitia Peminjam" 
        description="Pantau katalog museum dan ajukan permohonan peminjaman untuk pameran luar area museum."
      >
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'katalog' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Katalog Aset
          </button>
          <button
            onClick={() => setActiveTab('riwayat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'riwayat' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Riwayat Saya ({myRequests.length})
          </button>
        </div>
      </PageHeader>

      {/* Metrics Row */}
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

      {activeTab === 'katalog' ? (
        /* CATALOG TAB VIEW */
        <div className="space-y-6 animate-fade-in">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Cari nama barang, kategori, atau asal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl pl-10 pr-4 py-2.5 placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Status Pills Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Filter className="h-3.5 w-3.5 text-blue-500" />
                <span>Filter:</span>
              </span>
              <div className="flex gap-1">
                {['Semua', 'Tersedia', 'Dipinjam', 'Perbaikan'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === status
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/25'
                        : 'bg-transparent text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <Card className="p-16 text-center border-dashed border-slate-800 bg-slate-900/10">
              <AlertCircle className="h-10 w-10 text-slate-650 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Tidak ada barang pameran yang cocok dengan kriteria filter.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="flex flex-col justify-between" hoverable>
                  {/* Card Image and Content */}
                  <div>
                    {/* Item Image with Badge Overlay */}
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge status={item.status}>{item.status}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-900/90 text-slate-400 border border-slate-800/80 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                        <div className="flex gap-4 mt-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                          <span>Asal: {item.origin}</span>
                          <span>Era: {item.year}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-450 leading-relaxed pt-2 border-t border-slate-800/60">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="p-5 pt-0 border-t border-slate-850 bg-slate-900/10">
                    {item.status === 'Tersedia' ? (
                      <Button
                        variant="primary"
                        onClick={() => handleOpenLoanModal(item)}
                        className="w-full mt-4"
                        icon={PlusCircle}
                        size="sm"
                      >
                        Ajukan Peminjaman
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        disabled
                        className="w-full mt-4 text-slate-500 border-slate-800/50"
                        size="sm"
                      >
                        Tidak Tersedia
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* LOAN REQUEST HISTORY TAB VIEW */
        <div className="animate-fade-in">
          <Table
            headers={[
              'Tanggal Pengajuan',
              'Barang Museum',
              'Nama Acara',
              'Lokasi Pameran',
              'Durasi Peminjaman',
              { label: 'Status Pengajuan', className: 'text-center' }
            ]}
            isEmpty={myRequests.length === 0}
            emptyMessage="Anda belum pernah mengajukan peminjaman barang."
          >
            {myRequests.map((loan) => (
              <tr key={loan.id} className="hover:bg-slate-900/25 transition-all text-slate-300">
                <td className="p-4 text-slate-400 font-semibold">{formatDate(loan.tanggalPengajuan)}</td>
                <td className="p-4 text-slate-150 font-bold">{loan.namaBarang}</td>
                <td className="p-4">{loan.namaAcara}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-slate-450">
                    <MapPin className="h-3.5 w-3.5 text-blue-500/80" />
                    <span>{loan.lokasi}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-slate-450">
                    <Calendar className="h-3.5 w-3.5 text-slate-600" />
                    <span>{formatDate(loan.tanggalMulai)} - {formatDate(loan.tanggalSelesai)}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <Badge status={loan.status}>{loan.status}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}

      {/* LOAN FORM MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Pengajuan Pinjam: ${selectedItem?.name}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitSuccess && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{submitSuccess}</span>
            </div>
          )}

          {/* Event Name Input */}
          <Input
            label="Nama Acara / Pameran"
            name="eventName"
            placeholder="Contoh: Pameran Pusaka Budaya Nusantara"
            value={formData.eventName}
            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
            required
            error={errors.eventName}
          />

          {/* Exhibition Location Input */}
          <Input
            label="Lokasi Pameran"
            name="location"
            placeholder="Contoh: Gedung Agung Yogyakarta"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            error={errors.location}
          />

          {/* Start and End Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tanggal Mulai"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              error={errors.startDate}
            />
            <Input
              label="Tanggal Selesai"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
              error={errors.endDate}
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800/80 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              size="sm"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Kirim Pengajuan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PanitiaDashboard;
