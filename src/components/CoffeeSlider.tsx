import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CoffeeCard } from './CoffeeCard';
import { CoffeeModal } from './CoffeeModal';
import { coffees } from '../data/coffees';
import { Coffee } from '../types/coffee';

export const CoffeeSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % coffees.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + coffees.length) % coffees.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleLearnMore = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoffee(null);
  };


  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen) {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating, isModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) return;
      if (event.key === 'ArrowLeft') prevSlide();
      if (event.key === 'ArrowRight') nextSlide();
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleLearnMore(coffees[currentIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, currentIndex, isModalOpen]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main slider container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {coffees.map((coffee, index) => (
            <div key={coffee.id} className="w-full flex-shrink-0 px-4">
              <CoffeeCard 
                coffee={coffee} 
                isActive={index === currentIndex}
                onLearnMore={() => handleLearnMore(coffee)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        aria-label="Попередня кава"
      >
        <ChevronLeft className="w-6 h-6 text-amber-900" />
      </button>

      <button 
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        aria-label="Наступна кава"
      >
        <ChevronRight className="w-6 h-6 text-amber-900" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {coffees.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-amber-600 scale-125' 
                : 'bg-amber-300 hover:bg-amber-400'
            }`}
            aria-label={`Перейти до кави ${index + 1}`}
          />
        ))}
      </div>

      {/* Coffee counter */}
      <div className="text-center mt-4 text-amber-700 font-medium">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
          <span>{currentIndex + 1} з {coffees.length}</span>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Modals */}
      {selectedCoffee && (
        <CoffeeModal 
          coffee={selectedCoffee}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};