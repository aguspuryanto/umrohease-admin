import React from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  Wallet, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Reports() {
  const summaries = [
    { label: 'Total Transaksi', value: '152', change: '+12%', isPositive: true, icon: <FileText size={20} /> },
    { label: 'Total Dana Masuk', value: 'Rp 4.2M', change: '+8%', isPositive: true, icon: <Wallet size={20} /> },
    { label: 'Jamaah Terdaftar', value: '1,284', change: '+15%', isPositive: true, icon: <Users size={20} /> },
    { label: 'Pembayaran Tertunda', value: 'Rp 850jt', change: '-5%', isPositive: false, icon: <Calendar size={20} /> },
  ];

  const packageStats = [
    { name: 'Umroh Ramadhan Gold', count: 450, revenue: 'Rp 1.575M' },
    { name: 'Umroh Reguler Hemat', count: 520, revenue: 'Rp 1.482M' },
    { name: 'Umroh Plus Turki', count: 314, revenue: 'Rp 1.318M' },
  ];

  return (
    <div className="p-4 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Laporan & Rekap Data</h2>
          <p className="text-sm md:text-base text-slate-500">Analisis performa bisnis dan rekapitulasi data operasional.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Filter size={18} />
            Filter Periode
          </button>
          <button className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
            <Download size={20} />
            Export Laporan
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaries.map((s, i) => (
          <motion.div 
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl">
                {s.icon}
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-bold ${s.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {s.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.change}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{s.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{s.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Package Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <h3 className="font-bold text-slate-800 mb-6">Jamaah per Paket</h3>
          <div className="space-y-6">
            {packageStats.map((pkg) => (
              <div key={pkg.name}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{pkg.name}</p>
                    <p className="text-xs text-slate-500">{pkg.count} Jamaah</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{pkg.revenue}</p>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(pkg.count / 600) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions Table */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-800">Rekap Transaksi Terakhir</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">ID Transaksi</th>
                  <th className="px-6 py-4">Jamaah</th>
                  <th className="px-6 py-4">Metode</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: '#TRX-9021', name: 'Ahmad Subarjo', method: 'Bank Transfer', status: 'Success', amount: 'Rp 15.000.000' },
                  { id: '#TRX-9020', name: 'Siti Aminah', method: 'Bank Transfer', status: 'Success', amount: 'Rp 28.500.000' },
                  { id: '#TRX-9019', name: 'Budi Santoso', method: 'Credit Card', status: 'Pending', amount: 'Rp 10.000.000' },
                  { id: '#TRX-9018', name: 'Laila Sari', method: 'Bank Transfer', status: 'Failed', amount: 'Rp 35.000.000' },
                  { id: '#TRX-9017', name: 'Hendra Wijaya', method: 'Bank Transfer', status: 'Success', amount: 'Rp 5.000.000' },
                ].map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-500">{trx.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{trx.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{trx.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        trx.status === 'Success' ? 'bg-emerald-50 text-emerald-600' :
                        trx.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800 text-right">{trx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
