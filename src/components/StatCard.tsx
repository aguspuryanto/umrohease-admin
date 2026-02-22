import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  delay?: number;
}

export default function StatCard({ label, value, change, icon, delay = 0 }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-primary-soft text-primary rounded-xl">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
    </motion.div>
  );
}
