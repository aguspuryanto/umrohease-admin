import React from 'react';

export type NavItem = 'dashboard' | 'paket' | 'jamaah' | 'pembayaran' | 'laporan';

export interface StatData {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export interface Registration {
  id: string;
  name: string;
  package: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  amount: string;
}

export interface UmrohPackage {
  id: string;
  name: string;
  price: string;
  departureDate: string;
  facilities: string[];
  status: 'active' | 'full' | 'draft';
}

export interface Jamaah {
  id: string;
  name: string;
  package: string;
  phone: string;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  registrationDate: string;
}

export interface Payment {
  id: string;
  jamaahName: string;
  package: string;
  amount: string;
  transferDate: string;
  status: 'pending' | 'approved' | 'rejected';
  proofUrl: string;
}
