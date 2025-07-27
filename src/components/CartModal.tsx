import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CheckoutModal } from './CheckoutModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleOrderSuccess = () => {
    clearCart();
    setIsCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-900 p-2 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Корзина</h2>
                  <p className="text-gray-600 text-sm">
                    {cart.totalItems} {cart.totalItems === 1 ? 'товар' : cart.totalItems < 5 ? 'товари' : 'товарів'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-96">
            {cart.items.length === 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Корзина порожня</h3>
                <p className="text-gray-600">Додайте каву до корзини, щоб продовжити</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
                    <img
                      src={item.coffeeImage}
                      alt={item.coffeeName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.coffeeName}</h4>
                      <p className="text-sm text-gray-600">{item.packageSize}</p>
                      <p className="text-sm font-medium text-amber-900">{item.pricePerItem} грн за шт</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{item.totalPrice} грн</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1 mt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Видалити</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-900">Загальна сума:</span>
                <span className="text-2xl font-bold text-amber-900">{cart.totalPrice} грн</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  Очистити корзину
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-2 bg-gradient-to-r from-amber-900 to-orange-800 hover:from-amber-800 hover:to-orange-700 text-white py-3 px-6 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Package className="w-5 h-5" />
                  <span>Оформити замовлення</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        onSuccess={handleOrderSuccess}
      />
    </>
  );
};