import React, { useState } from 'react';
import { X, Package, Phone, Mail, User, ShoppingCart, CheckCircle } from 'lucide-react';
import { Coffee } from '../types/coffee';
import { createOrder } from '../api/orders';

interface OrderModalProps {
  coffee: Coffee;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ coffee, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    packageSize: '500g',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrderData, setSubmittedOrderData] = useState<{
    packageSize: string;
    quantity: number;
    totalPrice: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCurrentPrice = () => {
    if (formData.packageSize === '250g') return coffee.details.price250g;
    if (formData.packageSize === '500g') return coffee.details.price500g;
    return coffee.details.price1kg;
  };

  const getTotalPrice = () => {
    return getCurrentPrice() * formData.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        packageSize: formData.packageSize,
        quantity: formData.quantity,
        totalPrice: getTotalPrice()
      };

      await createOrder({
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
        coffee_type: coffee.name,
        package_size: formData.packageSize,
        quantity: formData.quantity,
        total_price: getTotalPrice()
      });
      
      setSubmittedOrderData(orderData); 
      setIsSubmitted(true);

      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        packageSize: '500g',
        quantity: 1
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedOrderData(null);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      alert('Не вдалося створити замовлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <img
            src={coffee.imageUrl}
            alt={coffee.name}
            className="w-full h-48 object-cover rounded-t-2xl"
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
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">{coffee.name}</h2>
          <p className="text-amber-700 text-sm mb-6">{coffee.roastLevel}</p>

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
                      <span className="text-green-800 font-medium">Замовлення:</span>
                      <span className="text-green-900 font-bold">{coffee.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">Розфасовка:</span>
                       <span className="text-green-900 font-bold">{submittedOrderData?.packageSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">Кількість:</span>
                      <span className="text-green-900 font-bold">{submittedOrderData?.quantity} шт</span>
                    </div>
                    <div className="border-t border-green-200 pt-2 flex justify-between items-center">
                      <span className="text-green-800 font-bold text-lg">Сума:</span>
                     <span className="text-green-900 font-bold text-xl">{submittedOrderData?.totalPrice} грн</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-4 font-medium">
                  Це вікно закриється автоматично через кілька секунд
                </p>
              </div>
            </div>
          ) : (
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
                  className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
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
                  className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
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
                  className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                <select
                  name="packageSize"
                  value={formData.packageSize}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                >
                  <option value="500г">500г - {coffee.details.price500g} грн</option>
                  <option value="1кг">1кг - {coffee.details.price1kg} грн</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Кількість пакетів
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-sm text-amber-800">
                  <span>Ціна за пакет:</span>
                  <span>{getCurrentPrice()} грн</span>
                </div>
                <div className="flex justify-between items-center text-sm text-amber-800">
                  <span>Кількість:</span>
                  <span>{formData.quantity} шт</span>
                </div>
                <div className="border-t border-amber-200 mt-2 pt-2 flex justify-between items-center font-bold text-amber-900">
                  <span>Загальна сума:</span>
                  <span>{getTotalPrice()} грн</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-900 hover:bg-amber-800 disabled:bg-amber-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Оформити замовлення</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};