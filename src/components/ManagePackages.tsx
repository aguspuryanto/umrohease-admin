import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Filter, X } from 'lucide-react';
import { UmrohPackage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const initialPackages: UmrohPackage[] = [
  { 
    id: '1', 
    name: 'Paket Ramadhan Gold', 
    price: 'Rp 35.000.000', 
    departureDate: '15 Mar 2026', 
    facilities: ['Hotel *5', 'Makan 3x', 'Visa'], 
    status: 'active' 
  },
  { 
    id: '2', 
    name: 'Paket Umroh Reguler', 
    price: 'Rp 28.500.000', 
    departureDate: '10 Apr 2026', 
    facilities: ['Hotel *4', 'Makan 3x', 'Visa'], 
    status: 'active' 
  },
  { 
    id: '3', 
    name: 'Paket Plus Turki', 
    price: 'Rp 42.000.000', 
    departureDate: '05 Mei 2026', 
    facilities: ['Hotel *5', 'Tur Turki', 'Visa'], 
    status: 'full' 
  },
  { 
    id: '4', 
    name: 'Paket Syawal Berkah', 
    price: 'Rp 32.000.000', 
    departureDate: '20 Mei 2026', 
    facilities: ['Hotel *4', 'Makan 3x', 'Visa'], 
    status: 'draft' 
  },
];

export default function ManagePackages() {
  const [packages, setPackages] = useState<UmrohPackage[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrohPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<UmrohPackage>>({
    name: '',
    price: '',
    departureDate: '',
    facilities: [],
    status: 'draft'
  });

  const handleOpenModal = (pkg?: UmrohPackage) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData(pkg);
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        price: '',
        departureDate: '',
        facilities: [],
        status: 'draft'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? { ...p, ...formData } as UmrohPackage : p));
    } else {
      const newPackage: UmrohPackage = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as UmrohPackage;
      setPackages([...packages, newPackage]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Kelola Paket Umroh</h2>
          <p className="text-sm md:text-base text-slate-500">Atur daftar paket perjalanan umroh yang tersedia.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <Plus size={20} />
          Tambah Paket
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama paket..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Nama Paket</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Keberangkatan</th>
                <th className="px-6 py-4">Fasilitas</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPackages.map((pkg, index) => (
                <motion.tr 
                  key={pkg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-700">{pkg.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-primary">{pkg.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 font-medium">{pkg.departureDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.facilities.map((f, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      pkg.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                      pkg.status === 'full' ? 'bg-rose-50 text-rose-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {pkg.status === 'active' ? 'Tersedia' : 
                       pkg.status === 'full' ? 'Penuh' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(pkg)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary-soft rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-50 flex justify-between items-center text-sm text-slate-500">
          <p>Menampilkan {filteredPackages.length} paket</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  {editingPackage ? 'Edit Paket Umroh' : 'Tambah Paket Baru'}
                </h3>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nama Paket</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Contoh: Paket Ramadhan Gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Harga</label>
                    <input 
                      type="text" 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Contoh: Rp 35.000.000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Keberangkatan</label>
                    <input 
                      type="text" 
                      required
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Contoh: 15 Mar 2026"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="active">Tersedia</option>
                    <option value="full">Penuh</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Fasilitas (Pisahkan dengan koma)</label>
                  <input 
                    type="text" 
                    value={formData.facilities?.join(', ')}
                    onChange={(e) => setFormData({ ...formData, facilities: e.target.value.split(',').map(f => f.trim()) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Contoh: Hotel *5, Makan 3x, Visa"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    Simpan Paket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
