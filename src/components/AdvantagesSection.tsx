import React from 'react';
import { Coffee, Truck, Shield, Award, Clock, Heart } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      icon: Coffee,
      title: "100% Арабіка",
      description: "Використовуємо тільки найкращі зерна арабіки з перевірених плантацій світу",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Преміум якість",
      description: "Кожна партія проходить ретельний контроль якості та професійне обсмаження",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: Clock,
      title: "Свіжість гарантована",
      description: "Обсмажуємо каву щотижня та доставляємо протягом 24 годин після обсмаження",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Truck,
      title: "Безкоштовна доставка",
      description: "Доставляємо по всій Україні безкоштовно при замовленні від 500 грн",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Гарантія якості",
      description: "Повернемо кошти, якщо кава вас не влаштує протягом 14 днів",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Heart,
      title: "З любов'ю до кави",
      description: "Кожен пакет упакований з любов'ю та увагою до найменших деталей",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Декоративні елементи */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/20 to-amber-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-6">
            Чому обирають Bond Coffee?
          </h2>
          <p className="text-amber-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Ми не просто продаємо каву - ми створюємо неповторний досвід для справжніх цінителів якісного напою
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 group"
              >
                <div className={`bg-gradient-to-r ${advantage.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4 text-center">
                  {advantage.title}
                </h3>
                <p className="text-amber-800 text-center leading-relaxed font-medium">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 via-orange-50/50 to-amber-50/50 rounded-2xl"></div>
            <div>
              <div className="relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-2">8</div>
                <div className="text-amber-700 font-medium">Унікальних сортів</div>
              </div>
            </div>
            <div>
              <div className="relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-amber-700 font-medium">Натуральна кава</div>
              </div>
            </div>
            <div>
              <div className="relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-2">24h</div>
                <div className="text-amber-700 font-medium">Швидка доставка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};