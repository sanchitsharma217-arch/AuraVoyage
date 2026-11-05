import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { CategoryType } from '../../types';
import {
  Compass,
  UtensilsCrossed,
  Coffee,
  Layers,
  TicketCheck,
  ShoppingBag,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    bookings,
    cartTotalCount,
    setIsMyBookingsOpen,
    setIsCartOpen,
  } = useTravel();

  const handleNav = (category: CategoryType) => {
    setActiveCategory(category);
    const targetId = category === 'all' ? 'catalog-section' : category;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-1.5 py-2 flex items-center justify-around shadow-2xl text-white select-none"
    >
      {/* 1. Explore */}
      <button
        onClick={() => handleNav('all')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all ${
          activeCategory === 'all' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-[9px] sm:text-[10px] tracking-tight">Explore</span>
      </button>

      {/* 2. Dining (Michelin Dining) */}
      <button
        onClick={() => handleNav('restaurants')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all ${
          activeCategory === 'restaurants' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-white'
        }`}
      >
        <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-[9px] sm:text-[10px] tracking-tight font-medium">Dining</span>
      </button>

      {/* 3. Refreshments (Artisan Hampers) */}
      <button
        onClick={() => handleNav('refreshments')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all ${
          activeCategory === 'refreshments' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-[9px] sm:text-[10px] tracking-tight font-medium">Refreshments</span>
      </button>

      {/* 4. Trip Studio */}
      <button
        onClick={() => handleNav('builder')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all ${
          activeCategory === 'builder' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-white'
        }`}
      >
        <div className="relative">
          <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-950 text-[7px] font-extrabold px-1 rounded-full">
            VIP
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-tight">Studio</span>
      </button>

      {/* 5. VIP Passes */}
      <button
        onClick={() => setIsMyBookingsOpen(true)}
        className="relative flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
      >
        <div className="relative">
          <TicketCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          {bookings.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {bookings.length}
            </span>
          )}
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-tight">Passes</span>
      </button>

      {/* 6. Trip Bag */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          {cartTotalCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartTotalCount}
            </span>
          )}
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-tight">Bag</span>
      </button>
    </nav>
  );
};
