import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, MoreVertical, Filter, Image as ImageIcon } from 'lucide-react';
import { Payment } from '../types';
import { motion } from 'motion/react';

const mockPayments: Payment[] = [
  { id: '1', jamaahName: 'Ahmad Subarjo', package: 'Paket Ramadhan Gold', amount: 'Rp 15.000.000', transferDate: '21 Feb 2026', status: 'pending', proofUrl: 'https://picsum.photos/seed/proof1/400/600' },
  { id: '2', jamaahName: 'Siti Aminah', package: 'Paket Umroh Reguler', amount: 'Rp 28.500.000', transferDate: '20 Feb 2026', status: 'approved', proofUrl: 'https://picsum.photos/seed/proof2/400/600' },
  { id: '3', jamaahName: 'Budi Santoso', package: 'Paket Plus Turki', amount: 'Rp 10.000.000', transferDate: '19 Feb 2026', status: 'pending', proofUrl: 'https://picsum.photos/seed/proof3/400/600' },
  { id: '4', jamaahName: 'Laila Sari', package: 'Paket Ramadhan Gold', amount: 'Rp 35.000.000', transferDate: '19 Feb 2026', status: 'rejected', proofUrl: 'https://picsum.photos/seed/proof4/400/600' },
  { id: '5', jamaahName: 'Hendra Wijaya', package: 'Paket Umroh Reguler', amount: 'Rp 5.000.000', transferDate: '18 Feb 2026', status: 'pending', proofUrl: 'https://picsum.photos/seed/proof5/400/600' },
];

export default function ManagePayments() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = mockPayments.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
    const matchesSearch = p.jamaahName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.package.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Konfirmasi Pembayaran</h2>
          <p className="text-sm md:text-base text-slate-500">Verifikasi bukti transfer dan update status pembayaran jamaah.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama jamaah..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeFilter === f 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f === 'all' ? 'Semua' : f === 'pending' ? 'Menunggu' : f === 'approved' ? 'Disetujui' : 'Ditolak'}
                </button>
              ))}
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Nama Jamaah</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4">Tanggal Transfer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((payment, index) => (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-sm">
                        {payment.jamaahName.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700">{payment.jamaahName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{payment.package}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800">{payment.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{payment.transferDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      payment.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                      payment.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {payment.status === 'approved' ? 'Disetujui' : 
                       payment.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 hover:bg-primary-soft hover:text-primary rounded-lg text-xs font-bold transition-all">
                        <ImageIcon size={14} />
                        Bukti
                      </button>
                      {payment.status === 'pending' && (
                        <>
                          <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Setujui">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Tolak">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
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
          <p>Menampilkan {filteredPayments.length} transaksi</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
