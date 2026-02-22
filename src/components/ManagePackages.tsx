import React from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Filter } from 'lucide-react';
import { UmrohPackage } from '../types';
import { motion } from 'motion/react';

const mockPackages: UmrohPackage[] = [
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
  return (
    <div className="p-4 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Kelola Paket Umroh</h2>
          <p className="text-sm md:text-base text-slate-500">Atur daftar paket perjalanan umroh yang tersedia.</p>
        </div>
        <button className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
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
              {mockPackages.map((pkg, index) => (
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
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-soft rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
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
          <p>Menampilkan {mockPackages.length} paket</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
