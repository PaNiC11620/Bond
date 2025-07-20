import React from 'react';
import { Coffee } from '../types/coffee';
import { Package } from 'lucide-react';

interface CoffeeCardProps {
  coffee: Coffee;
  isActive: boolean;
  onLearnMore: () => void;
  onOrder: () => void;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, isActive, onLearnMore, onOrder }) => {
  return (
    <div className={`transform transition-all duration-700 ease-in-out ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}`}>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
        <div className="relative h-80 overflow-hidden">
          <img 
            src={coffee.imageUrl} 
            alt={coffee.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          {/* Градієнтний оверлей */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-900 to-orange-800 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {coffee.origin}
          </div>
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-amber-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {coffee.roastLevel}
          </div>
          
          {/* Інтенсивність внизу зображення */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-3">
            <span className="text-white text-xs font-bold bg-gradient-to-r from-amber-900/80 to-orange-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              Інтенсивність:
            </span>
            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < coffee.intensity / 2 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg' 
                      : 'bg-white/40 border border-white/20'
                  }`}
                />
              ))}
              <span className="text-white text-xs font-bold ml-1">{coffee.intensity}/10</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">
              {coffee.name}
            </h3>
          </div>
          
          <p className="text-amber-800/90 leading-relaxed text-base mb-6 font-medium">
            {coffee.description}
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl mb-6 border border-amber-200">
            <p className="text-sm text-amber-900 font-bold mb-2">Склад:</p>
            <p className="text-sm text-amber-800 font-medium">{coffee.composition}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl mb-6 border border-amber-200">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-300"></div>
              <p className="text-sm text-amber-900 font-bold mx-3">Ціни</p>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-300"></div>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-amber-800 font-medium">250г</span>
              <span className="font-bold text-amber-900 bg-gradient-to-r from-white to-amber-50 px-3 py-1.5 rounded-lg shadow-sm border border-amber-200">{coffee.details.price250g} грн</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-amber-800 font-medium">500г</span>
              <span className="font-bold text-amber-900 bg-gradient-to-r from-white to-amber-50 px-3 py-1.5 rounded-lg shadow-sm border border-amber-200">{coffee.details.price500g} грн</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-800 font-medium">1кг</span>
              <span className="font-bold text-amber-900 bg-gradient-to-r from-white to-amber-50 px-3 py-1.5 rounded-lg shadow-sm border border-amber-200">{coffee.details.price1kg} грн</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={onLearnMore}
              className="flex-1 border-2 border-amber-900 text-amber-900 hover:bg-gradient-to-r hover:from-amber-900 hover:to-orange-800 hover:text-white py-3 px-4 rounded-full transition-all duration-300 font-bold text-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              Детальніше
            </button>
            <button 
              onClick={onOrder}
              className="flex-1 bg-gradient-to-r from-amber-900 to-orange-800 hover:from-amber-800 hover:to-orange-700 text-white py-3 px-4 rounded-full transition-all duration-300 font-bold hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm"
            >
              <Package className="w-4 h-4" />
              <span>Замовити</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};