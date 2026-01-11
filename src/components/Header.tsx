import React from 'react';
import { Coffee, Phone, Mail } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Coffee className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Bond Coffee</h1>
              <p className="text-amber-200 text-sm">Преміальна кава з усього світу</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+380 (67) 764-44-60</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">BondCoffe2025@ukr.net</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};