import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { cart } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
    >
      <ShoppingCart className="w-6 h-6 text-amber-900" />
      {cart.totalItems > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-900 to-orange-800 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
          {cart.totalItems > 99 ? '99+' : cart.totalItems}
        </div>
      )}
    </button>
  );
};