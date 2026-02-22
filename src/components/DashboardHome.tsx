import React from 'react';
import { Users, Package, Wallet, Bell, Search, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import RecentRegistrations from './RecentRegistrations';
import { motion } from 'motion/react';
import { StatData } from '../types';

export default function DashboardHome() {
  const stats: (StatData & { delay?: number })[] = [
    { label: 'Total Jamaah', value: '1,284', change: 12.5, icon: <Users size={24} /> },
    { label: 'Paket Aktif', value: '12', change: 5.2, icon: <Package size={24} /> },
    { label: 'Pembayaran Masuk', value: 'Rp 452M', change: 8.1, icon: <Wallet size={24} /> },
    { label: 'Keberangkatan Terdekat', value: '15 Mar', change: 0, icon: <Calendar size={24} /> },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Selamat Datang, Admin!</h2>
          <p className="text-sm md:text-base text-slate-500">Berikut adalah ringkasan operasional hari ini.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari jamaah atau paket..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary hover:border-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Budi Pratama</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/40/40" 
                alt="Admin" 
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={stat.label}>
            <StatCard 
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              delay={index * 0.1}
            />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentRegistrations />
        </div>
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h3 className="font-bold text-slate-800 mb-4">Paket Terlaris</h3>
            <div className="space-y-4">
              {[
                { name: 'Umroh Ramadhan Gold', sales: 42, color: 'bg-primary' },
                { name: 'Umroh Reguler Hemat', sales: 38, color: 'bg-blue-500' },
                { name: 'Umroh Plus Turki', sales: 25, color: 'bg-emerald-500' },
              ].map((pkg) => (
                <div key={pkg.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-600">{pkg.name}</span>
                    <span className="font-bold text-slate-800">{pkg.sales} Pax</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${pkg.color}`} style={{ width: `${(pkg.sales / 50) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-primary p-6 rounded-2xl shadow-lg shadow-primary/20 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Butuh Bantuan?</h3>
              <p className="text-white/80 text-sm mb-4">Hubungi tim support kami jika Anda mengalami kendala teknis.</p>
              <button className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                Hubungi Support
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
