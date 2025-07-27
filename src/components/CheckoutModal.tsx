import React, { useState } from 'react';
import { X, User, Phone, Mail, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../api/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Створюємо окреме замовлення для кожного товару в корзині
      const orderPromises = cart.items.map(item =>
        createOrder({
          customer_name: formData.customerName,
          customer_phone: formData.customerPhone,
          customer_email: formData.customerEmail,
          coffee_type: item.coffeeName,
          package_size: item.packageSize,
          quantity: item.quantity,
          total_price: item.totalPrice
        })
      );

      await Promise.all(orderPromises);
      
      setIsSubmitted(true);
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      alert('Не вдалося створити замовлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Оформлення замовлення</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-emerald-100/30"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent mb-3">
                  Замовлення успішно створено!
                </h3>
                <p className="text-green-700 mb-4 font-medium">
                  Дякуємо за ваше замовлення! Ми зв'яжемося з вами найближчим часом для підтвердження деталей.
                </p>
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-green-200 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">Товарів:</span>
                      <span className="text-green-900 font-bold">{cart.totalItems}</span>
                    </div>
                    <div className="border-t border-green-200 pt-2 flex justify-between items-center">
                      <span className="text-green-800 font-bold text-lg">Загальна сума:</span>
                      <span className="text-green-900 font-bold text-xl">{cart.totalPrice} грн</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-4 font-medium">
                  Це вікно закриється автоматично через кілька секунд
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Огляд замовлення */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ваше замовлення</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 max-h-48 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{item.coffeeName}</p>
                        <p className="text-sm text-gray-600">{item.packageSize} × {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">{item.totalPrice} грн</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Загальна сума:</span>
                    <span className="font-bold text-xl text-amber-900">{cart.totalPrice} грн</span>
                  </div>
                </div>
              </div>

              {/* Форма замовлення */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Ваше ім'я та прізвище"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Номер телефону"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Електронна пошта"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-900 to-orange-800 hover:from-amber-800 hover:to-orange-700 disabled:from-amber-600 disabled:to-orange-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Підтвердити замовлення</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};