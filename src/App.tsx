import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import ManagePackages from './components/ManagePackages';
import ManageJamaah from './components/ManageJamaah';
import ManagePayments from './components/ManagePayments';
import Reports from './components/Reports';
import { NavItem } from './types';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (item: NavItem) => {
    setActiveTab(item);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'paket':
        return <ManagePackages />;
      case 'jamaah':
        return <ManageJamaah />;
      case 'pembayaran':
        return <ManagePayments />;
      case 'laporan':
        return <Reports />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Menu size={18} />
          </div>
          <span className="font-bold text-slate-800">UmrohEase</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Sidebar 
        activeItem={activeTab} 
        onNavigate={handleNavigate} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}
