import React from 'react';
import { Coffee, LogOut, Shield } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bond Coffee</h1>
              <p className="text-amber-200 text-sm flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Адміністративна панель
              </p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="bg-amber-800 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Вийти</span>
          </button>
        </div>
      </div>
    </header>
  );
};