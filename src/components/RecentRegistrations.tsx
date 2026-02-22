import React from 'react';
import { MoreVertical, ExternalLink } from 'lucide-react';
import { Registration } from '../types';
import { motion } from 'motion/react';

const mockRegistrations: Registration[] = [
  { id: '1', name: 'Ahmad Subarjo', package: 'Paket Ramadhan Gold', date: '21 Feb 2026', status: 'confirmed', amount: 'Rp 35.000.000' },
  { id: '2', name: 'Siti Aminah', package: 'Paket Umroh Reguler', date: '20 Feb 2026', status: 'pending', amount: 'Rp 28.500.000' },
  { id: '3', name: 'Budi Santoso', package: 'Paket Plus Turki', date: '19 Feb 2026', status: 'confirmed', amount: 'Rp 42.000.000' },
  { id: '4', name: 'Laila Sari', package: 'Paket Ramadhan Gold', date: '19 Feb 2026', status: 'cancelled', amount: 'Rp 35.000.000' },
  { id: '5', name: 'Hendra Wijaya', package: 'Paket Umroh Reguler', date: '18 Feb 2026', status: 'confirmed', amount: 'Rp 28.500.000' },
];

export default function RecentRegistrations() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Pendaftaran Terbaru</h3>
        <button className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
          Lihat Semua <ExternalLink size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Jamaah</th>
              <th className="px-6 py-4">Paket</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total Bayar</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockRegistrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      {reg.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-700">{reg.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{reg.package}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{reg.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                    reg.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                    reg.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {reg.status === 'confirmed' ? 'Dikonfirmasi' : 
                     reg.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700">{reg.amount}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
