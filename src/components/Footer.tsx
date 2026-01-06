import React from 'react';
import { Heart, Coffee, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Coffee className="w-6 h-6 text-amber-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Bond Coffee</h3>
                <p className="text-amber-200 text-sm">Обсмажена кава преміум класу</p>
              </div>
            </div>
            <p className="text-amber-200 leading-relaxed mb-4">
              Ми обсмажуємо найкращі кавові зерна з усього світу та пакуємо їх у зручні пакети 500г, 1кг та можливість продажі без пакування. 
              Кожна партія обсмажується з любов'ю та увагою до деталей.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-amber-800 hover:bg-amber-700 p-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Контакти</h4>
            <div className="space-y-3">
              <a href="tel:+380123456789" className="flex items-center space-x-2 text-amber-200 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+380 (93) 190-67-31</span>
              </a>
              <a href="mailto:info@bondcoffee.ua" className="flex items-center space-x-2 text-amber-200 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>BondCoffe2025@ukr.net</span>
              </a>
              <div className="flex items-start space-x-2 text-amber-200">
                <MapPin className="w-4 h-4 mt-1" />
                <span>вул. Чигиринська, 23/1<br />Черкаси, Україна</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4">Режим роботи</h4>
            <div className="space-y-2 text-amber-200">
              <div className="flex justify-between">
                <span>Пн-Пт:</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Сб:</span>
                <span>10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>Нд:</span>
                <span>Вихідний</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-amber-200">Створено з</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span className="text-amber-200">для любителів кави</span>
            </div>
            <p className="text-amber-300 text-sm">
              © 2025 Bond Coffee. Всі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};