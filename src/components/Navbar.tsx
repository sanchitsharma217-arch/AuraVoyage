import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { Currency, CategoryType } from '../types';
import { CURRENCY_RATES } from '../utils/formatters';
import {
  Compass,
  Heart,
  ShoppingBag,
  TicketCheck,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  Globe,
  Palmtree,
  Hotel,
  UtensilsCrossed,
  Coffee,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    activeCategory,
    setActiveCategory,
    wishlist,
    cartTotalCount,
    bookings,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsMyBookingsOpen,
  } = useTravel();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (category: CategoryType) => {
    setActiveCategory(category);
    setIsMobileMenuOpen(false);

    const sectionElement = document.getElementById(category === 'all' ? 'hero' : category);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems: { label: string; category: CategoryType; icon: React.ElementType }[] = [
    { label: 'Tours', category: 'tours', icon: Palmtree },
    { label: 'Hotels', category: 'hotels', icon: Hotel },
    { label: 'Dining', category: 'restaurants', icon: UtensilsCrossed },
    { label: 'Refreshments', category: 'refreshments', icon: Coffee },
    { label: 'Trip Studio', category: 'builder', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors shadow-xs">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] px-3 sm:px-6 py-1.5 border-b border-slate-900">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="text-amber-400 font-mono tracking-wider uppercase text-[9px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 shrink-0 font-bold">
              ✦ VIP Privilege
            </span>
            <span className="truncate text-slate-300 text-[11px]">
              <span className="hidden sm:inline">Reserve today with code <strong className="text-amber-300 font-semibold">VOYAGE10</strong> for 10% curated savings & complimentary Champagne transfer.</span>
              <span className="sm:hidden">Code <strong className="text-amber-300">VOYAGE10</strong> for 10% VIP savings</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-slate-400 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px]">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>24/7 Concierge: +1 (800) 792-VOYAGE</span>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-slate-200 hover:text-white bg-slate-900 px-2.5 py-0.5 rounded-md text-[11px] font-medium border border-slate-800 transition-colors cursor-pointer"
                aria-label="Select Currency"
              >
                <Globe className="w-3 h-3 text-amber-400" />
                <span>{currency}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-slate-800 animate-in fade-in zoom-in-95">
                  {(Object.keys(CURRENCY_RATES) as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50/70 transition-colors cursor-pointer ${
                        currency === curr ? 'font-bold text-amber-900 bg-amber-50' : 'text-slate-600'
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="container mx-auto px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('all')}
          className="flex items-center gap-2.5 cursor-pointer group select-none py-1"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-slate-950 to-slate-800 border border-amber-500/30 flex items-center justify-center text-amber-300 transition-all group-hover:scale-105 group-hover:border-amber-400 shrink-0 shadow-md">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900">
                Aura<span className="text-amber-700 italic font-normal">Voyage</span>
              </span>
              <span className="hidden md:inline-block text-[9px] uppercase tracking-widest font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                Concierge
              </span>
            </div>
            <span className="text-[9px] tracking-widest uppercase text-slate-400 block font-medium -mt-1">
              Curated Travel Sanctuaries
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Wishlist, Bookings, Cart, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 transition-colors cursor-pointer"
            aria-label="Wishlist"
            title="Saved Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Bookings Button */}
          <button
            onClick={() => setIsMyBookingsOpen(true)}
            className="relative p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 transition-colors cursor-pointer"
            aria-label="VIP Passes"
            title="My Bookings & Boarding Passes"
          >
            <TicketCheck className="w-4 h-4 text-amber-600" />
            {bookings.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-amber-300 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-amber-400/40">
                {bookings.length}
              </span>
            )}
          </button>

          {/* Trip Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-950 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm cursor-pointer border border-white/10 hover:border-amber-400/40"
            aria-label="Trip Bag"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Trip Bag</span>
            {cartTotalCount > 0 && (
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-md text-[10px] font-extrabold shadow-xs">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sub-Header Category Pills Bar */}
      <div className="lg:hidden bg-slate-950 border-t border-slate-800/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shadow-md">
        <button
          onClick={() => handleNavClick('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span>All</span>
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.category;
          return (
            <button
              key={item.category}
              onClick={() => handleNavClick(item.category)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Icon className={`w-3 h-3 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1.5 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive ? 'bg-slate-900 text-amber-300' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-1 mt-2">
            <span>24/7 Helpline:</span>
            <a href="tel:+18007928692" className="text-amber-800 font-bold">+1 (800) 792-VOYAGE</a>
          </div>
        </div>
      )}
    </header>
  );
};
