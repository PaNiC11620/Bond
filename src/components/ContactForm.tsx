import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { createContactMessage } from '../api/contact';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createContactMessage(formData);
      
      // Показуємо успішне повідомлення
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Приховуємо повідомлення через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Помилка при відправці повідомлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4">
          Зв'яжіться з нами
        </h3>
        <p className="text-amber-800 font-medium">
          Маєте питання про нашу каву? Ми завжди раді допомогти!
        </p>
      </div>

      {isSubmitted && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20"></div>
          <div className="relative z-10">
            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-green-800 font-bold text-xl mb-2">Дякуємо за ваше повідомлення!</p>
            <p className="text-green-700 font-medium">Ми зв'яжемося з вами найближчим часом.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше ім'я"
            required
            className="w-full pl-14 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ваш email"
            required
            className="w-full pl-14 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium"
          />
        </div>

        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 text-amber-600 w-5 h-5" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ваше повідомлення"
            required
            rows={4}
            className="w-full pl-14 pr-4 py-4 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-900 to-orange-800 hover:from-amber-800 hover:to-orange-700 disabled:from-amber-600 disabled:to-orange-600 text-white py-4 px-6 rounded-xl transition-all duration-300 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Надіслати повідомлення</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};