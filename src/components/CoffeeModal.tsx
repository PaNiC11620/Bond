import React from 'react';
import { X, Clock, Thermometer, Coffee as CoffeeIcon, Tag, Package } from 'lucide-react';
import { Coffee } from '../types/coffee';

interface CoffeeModalProps {
  coffee: Coffee;
  isOpen: boolean;
  onClose: () => void;
  onOrder: () => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ coffee, isOpen, onClose, onOrder }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <img 
            src={coffee.imageUrl} 
            alt={coffee.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5 text-amber-900" />
          </button>
          <div className="absolute bottom-4 left-4 bg-amber-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {coffee.origin}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
            {coffee.roastLevel}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-amber-900">{coffee.name}</h2>
            <div className="text-right">
              <div className="text-sm font-bold text-amber-600">250г - {coffee.details.price250g} грн</div>
              <div className="text-sm font-bold text-amber-600">500г - {coffee.details.price500g} грн</div>
              <div className="text-sm font-bold text-amber-600">1кг - {coffee.details.price1kg} грн</div>
            </div>
          </div>
          
          <p className="text-amber-800/80 leading-relaxed text-lg mb-6">
            {coffee.description}
          </p>

          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-amber-900 mb-2">Склад кави:</h4>
            <p className="text-amber-700">{coffee.composition}</p>
            <h4 className="font-medium text-amber-900 mb-2 mt-3">Країна походження:</h4>
            <p className="text-amber-700">{coffee.origin}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-900">Час заварювання</div>
                  <div className="text-amber-700">{coffee.details.brewTime}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Thermometer className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-900">Температура</div>
                  <div className="text-amber-700">{coffee.details.temperature}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CoffeeIcon className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-amber-900">Помел</div>
                  <div className="text-amber-700">{coffee.details.grindSize}</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Tag className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <div className="font-medium text-amber-900 mb-2">Смакові нотки</div>
                  <div className="flex flex-wrap gap-2">
                    {coffee.details.notes.map((note, index) => (
                      <span 
                        key={index}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-amber-900">Інтенсивність</span>
              <span className="text-amber-700">{coffee.intensity}/10</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${coffee.intensity * 10}%` }}
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-amber-900">Доступні розфасовки:</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-bold text-amber-900">250г</div>
                <div className="text-amber-600">{coffee.details.price250g} грн</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-bold text-amber-900">500г</div>
                <div className="text-amber-600">{coffee.details.price500g} грн</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="font-bold text-amber-900">1кг</div>
                <div className="text-amber-600">{coffee.details.price1kg} грн</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onOrder}
            className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 px-6 rounded-xl transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>Замовити каву</span>
          </button>
        </div>
      </div>
    </div>
  );
};