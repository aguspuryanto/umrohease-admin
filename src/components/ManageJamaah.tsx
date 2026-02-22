import React, { useState } from 'react';
import { Search, Filter, Eye, MoreVertical, Download, UserPlus } from 'lucide-react';
import { Jamaah } from '../types';
import { motion } from 'motion/react';

const mockJamaah: Jamaah[] = [
  { id: '1', name: 'Ahmad Subarjo', package: 'Paket Ramadhan Gold', phone: '0812-3456-7890', paymentStatus: 'paid', registrationDate: '21 Feb 2026' },
  { id: '2', name: 'Siti Aminah', package: 'Paket Umroh Reguler', phone: '0813-9876-5432', paymentStatus: 'partial', registrationDate: '20 Feb 2026' },
  { id: '3', name: 'Budi Santoso', package: 'Paket Plus Turki', phone: '0856-1122-3344', paymentStatus: 'paid', registrationDate: '19 Feb 2026' },
  { id: '4', name: 'Laila Sari', package: 'Paket Ramadhan Gold', phone: '0811-5566-7788', paymentStatus: 'unpaid', registrationDate: '19 Feb 2026' },
  { id: '5', name: 'Hendra Wijaya', package: 'Paket Umroh Reguler', phone: '0812-9900-1122', paymentStatus: 'paid', registrationDate: '18 Feb 2026' },
  { id: '6', name: 'Dewi Lestari', package: 'Paket Plus Turki', phone: '0813-4455-6677', paymentStatus: 'partial', registrationDate: '17 Feb 2026' },
  { id: '7', name: 'Rahmat Hidayat', package: 'Paket Umroh Reguler', phone: '0857-8899-0011', paymentStatus: 'paid', registrationDate: '16 Feb 2026' },
];

export default function ManageJamaah() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'partial' | 'unpaid'>('all');
  const [search, setSearch] = useState('');

  const filteredJamaah = mockJamaah.filter(j => {
    const matchesFilter = filter === 'all' || j.paymentStatus === filter;
    const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase()) || 
                         j.package.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Data Jamaah</h2>
          <p className="text-sm md:text-base text-slate-500">Kelola informasi dan status pendaftaran seluruh jamaah.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <button className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Download size={18} />
            Export Data
          </button>
          <button className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
            <UserPlus size={20} />
            Tambah Jamaah
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-full xl:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau paket..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              {(['all', 'paid', 'partial', 'unpaid'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    filter === f 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f === 'all' ? 'Semua' : f === 'paid' ? 'Lunas' : f === 'partial' ? 'Cicilan' : 'Belum Bayar'}
                </button>
              ))}
            </div>
            <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Nama Jamaah</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Nomor Telepon</th>
                <th className="px-6 py-4">Status Pembayaran</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredJamaah.map((j, index) => (
                <motion.tr 
                  key={j.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-sm">
                        {j.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700">{j.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{j.package}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 font-medium">{j.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      j.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                      j.paymentStatus === 'partial' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {j.paymentStatus === 'paid' ? 'Lunas' : 
                       j.paymentStatus === 'partial' ? 'Cicilan' : 'Belum Bayar'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{j.registrationDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 hover:bg-primary-soft hover:text-primary rounded-lg text-xs font-bold transition-all">
                        <Eye size={14} />
                        Detail
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
          <p>Menampilkan {filteredJamaah.length} dari {mockJamaah.length} jamaah</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
