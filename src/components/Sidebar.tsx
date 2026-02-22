import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  CreditCard, 
  FileText, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeItem, onNavigate, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'paket' as NavItem, label: 'Kelola Paket', icon: <Package size={20} /> },
    { id: 'jamaah' as NavItem, label: 'Data Jamaah', icon: <Users size={20} /> },
    { id: 'pembayaran' as NavItem, label: 'Konfirmasi Pembayaran', icon: <CreditCard size={20} /> },
    { id: 'laporan' as NavItem, label: 'Laporan', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`w-72 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Package size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">UmrohEase</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeItem === item.id 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-slate-500 hover:bg-primary-soft hover:text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={activeItem === item.id ? 'text-white' : 'text-slate-400 group-hover:text-primary'}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </div>
            {activeItem === item.id && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-medium">
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
    </>
  );
}
