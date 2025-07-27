import React from 'react';
import { Coffee } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CoffeeSlider } from '../components/CoffeeSlider';
import { ContactForm } from '../components/ContactForm';
import { AdvantagesSection } from '../components/AdvantagesSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Анімовані фонові елементи */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-amber-300/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-orange-900/5 to-amber-900/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 bg-clip-text text-transparent mb-6 leading-tight">
            Відкрийте світ преміальної кави
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Кожна чашка Bond Coffee - це подорож до найкращих кавових регіонів світу. 
            Ми обсмажуємо зерна з любов'ю та доставляємо свіжість прямо до вас.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">8</div>
              <div className="text-amber-700 text-sm font-medium">Унікальних сортів</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">100%</div>
              <div className="text-amber-700 text-sm font-medium">Натуральна кава</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">24h</div>
              <div className="text-amber-700 text-sm font-medium">Свіжість</div>
            </div>
          </div>
          
          {/* Call to Action кнопка */}
          <div className="flex justify-center">
            <button 
              onClick={() => document.getElementById('coffee-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-900 to-orange-800 hover:from-amber-800 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
            >
              <Coffee className="w-6 h-6" />
              <span>Обрати каву</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Coffee Slider Section */}
      <section id="coffee-section" className="py-20 relative">
        {/* Декоративний фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-6">
              Наша колекція кави
            </h2>
            <p className="text-amber-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Відкрийте для себе унікальні смаки з найкращих кавових регіонів світу. 
              Кожен сорт ретельно відібраний та обсмажений для досконалого смаку.
            </p>
          </div>
          
          <div className="relative">
            <CoffeeSlider />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <AdvantagesSection />

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Маєте питання?
            </h2>
            <p className="text-amber-700 text-lg">
              Ми завжди готові допомогти вам обрати ідеальну каву
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};