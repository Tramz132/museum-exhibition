import React, { useState } from 'react';
import useApp from '../hooks/useApp';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/ui/StatCard';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { 
  Package, 
  Share2, 
  Wrench, 
  ClipboardList, 
  Plus, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const { museumItems, loanRequests, addMuseumItem, updateMuseumItem, deleteMuseumItem } = useApp();

  // Stats calculation
  const totalItems = museumItems.length;
  const borrowedItems = museumItems.filter((i) => i.status === 'Dipinjam').length;
  const repairItems = museumItems.filter((i) => i.status === 'Perbaikan').length;
  const totalRequests = loanRequests.length;

  const stats = [
    { title: 'Total Barang', value: totalItems, icon: Package, variant: 'primary' },
    { title: 'Sedang Dipinjam', value: borrowedItems, icon: Share2, variant: 'info' },
    { title: 'Dalam Perbaikan', value: repairItems, icon: Wrench, variant: 'warning' },
    { title: 'Total Pengajuan', value: totalRequests, icon: ClipboardList, variant: 'success' },
  ];

  // Form & CRUD Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    origin: '',
    year: '',
    status: 'Tersedia',
    image: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Delete Confirmation State
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    itemId: null,
    itemName: '',
  });

  // Open Form for Adding New Item
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setSelectedItemId(null);
    setFormData({
      name: '',
      category: '',
      origin: '',
      year: '',
      status: 'Tersedia',
      image: '',
      description: '',
    });
    setErrors({});
    setSubmitSuccess('');
    setIsModalOpen(true);
  };

  // Open Form for Editing Item
  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setSelectedItemId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      origin: item.origin,
      year: item.year,
      status: item.status,
      image: item.image,
      description: item.description,
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

    // Field Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama barang museum wajib diisi!';
    if (!formData.category.trim()) newErrors.category = 'Kategori barang wajib diisi!';
    if (!formData.origin.trim()) newErrors.origin = 'Asal daerah barang wajib diisi!';
    if (!formData.year.trim()) newErrors.year = 'Estimasi tahun/era wajib diisi!';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Default image if empty
    const finalImage = formData.image.trim() || 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=500&auto=format&fit=crop&q=60';

    if (isEditMode) {
      updateMuseumItem(selectedItemId, {
        name: formData.name,
        category: formData.category,
        origin: formData.origin,
        year: formData.year,
        status: formData.status,
        image: finalImage,
        description: formData.description,
      });
      setSubmitSuccess('Aset museum berhasil diperbarui!');
    } else {
      addMuseumItem({
        name: formData.name,
        category: formData.category,
        origin: formData.origin,
        year: formData.year,
        status: formData.status,
        image: finalImage,
        description: formData.description,
      });
      setSubmitSuccess('Aset baru berhasil ditambahkan ke inventaris!');
    }

    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitSuccess('');
    }, 1500);
  };

  // Trigger Delete Confirmation Dialog
  const handleOpenDeleteDialog = (item) => {
    setDeleteDialog({
      isOpen: true,
      itemId: item.id,
      itemName: item.name,
    });
  };

  // Execute Deletion
  const handleConfirmDelete = () => {
    deleteMuseumItem(deleteDialog.itemId);
    setDeleteDialog({ isOpen: false, itemId: null, itemName: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header Component */}
      <PageHeader 
        title="Dashboard Admin (Maintenance Aset)" 
        description="Kelola inventaris aset museum, perbarui status kepemilikan, dan pantau ringkasan statistik peminjaman."
      >
        <Button
          variant="primary"
          onClick={handleOpenCreateModal}
          size="sm"
          icon={Plus}
        >
          Tambah Aset
        </Button>
      </PageHeader>

      {/* Statistics widgets */}
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

      {/* CRUD Table */}
      <div className="animate-fade-in">
        <Table
          headers={[
            'ID',
            'Nama Barang',
            'Kategori',
            'Asal & Era',
            'Keterangan Deskripsi',
            { label: 'Status Aset', className: 'text-center' },
            { label: 'Tindakan', className: 'text-right' }
          ]}
          isEmpty={museumItems.length === 0}
          emptyMessage="Tidak ada barang museum di dalam inventaris."
        >
          {museumItems.map((item) => (
            <tr key={item.id} className="hover:bg-slate-900/25 transition-all text-slate-350">
              <td className="p-4 text-slate-550 font-bold">#{item.id.toString().slice(-4)}</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <span className="font-bold text-slate-100">{item.name}</span>
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-0.5 bg-slate-800 text-[10px] font-semibold text-slate-450 border border-slate-700/50 rounded">
                  {item.category}
                </span>
              </td>
              <td className="p-4">
                <p className="font-medium text-slate-300">{item.origin}</p>
                <span className="text-[9px] text-slate-500 font-semibold">{item.year}</span>
              </td>
              <td className="p-4 max-w-xs truncate text-slate-400" title={item.description}>
                {item.description || '-'}
              </td>
              <td className="p-4 text-center">
                <Badge status={item.status}>{item.status}</Badge>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 border-amber-600/30 hover:bg-amber-500/10 text-amber-500 hover:text-amber-450 rounded-lg"
                    icon={Pencil}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDeleteDialog(item)}
                    className="p-1.5 border-rose-600/30 hover:bg-rose-500/10 text-rose-500 hover:text-rose-450 rounded-lg"
                    icon={Trash2}
                  />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* CRUD ADD/EDIT FORM MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Edit Aset Museum' : 'Tambah Aset Museum Baru'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitSuccess && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{submitSuccess}</span>
            </div>
          )}

          {/* Item Name Input */}
          <Input
            label="Nama Barang Museum"
            name="name"
            placeholder="Contoh: Prasasti Batu Tulis"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            error={errors.name}
          />

          {/* Category Input */}
          <Input
            label="Kategori Barang"
            name="category"
            placeholder="Contoh: Senjata, Prasasti, Patung, Perhiasan, Manuskrip"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            error={errors.category}
          />

          {/* Origin & Year in Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Asal Penemuan"
              name="origin"
              placeholder="Contoh: Jawa Timur"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              required
              error={errors.origin}
            />
            <Input
              label="Estimasi Tahun / Era"
              name="year"
              placeholder="Contoh: Abad 14"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
              error={errors.year}
            />
          </div>

          {/* Image Input */}
          <Input
            label="Tautan Gambar Aset (URL)"
            name="image"
            placeholder="Contoh: https://images.unsplash.com/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          {/* Status Selection (Dropdown) */}
          <Select
            label="Status Aset"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'Tersedia', label: 'Tersedia' },
              { value: 'Dipinjam', label: 'Dipinjam' },
              { value: 'Perbaikan', label: 'Perbaikan (Under Repair)' },
            ]}
          />

          {/* Description Input */}
          <Input
            label="Deskripsi / Catatan Sejarah"
            name="description"
            type="textarea"
            placeholder="Tuliskan ringkasan detail sejarah, kondisi fisik, atau keterangan barang..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />

          {/* Modal Buttons Actions */}
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
              Simpan Data
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRM DIALOG OVERLAYS */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, itemId: null, itemName: '' })}
        onConfirm={handleConfirmDelete}
        title="Hapus Aset Museum"
        message={`Apakah Anda yakin ingin menghapus "${deleteDialog.itemName}" dari inventaris museum? Tindakan ini bersifat permanen dan juga akan menghapus semua riwayat pengajuan peminjaman barang ini.`}
        confirmText="Hapus Permanen"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
};

export default AdminDashboard;
