import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { CategoryType } from '../types';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Compass,
  Palmtree,
  Hotel,
  UtensilsCrossed,
  Coffee,
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  ChevronDown,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedDestinationFilter,
    setSelectedDestinationFilter,
  } = useTravel();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [travelMonth, setTravelMonth] = useState('Anytime');

  const destinationOptions = [
    'All Destinations',
    'Bali',
    'Switzerland',
    'Amalfi Coast',
    'Kyoto',
    'Dubai',
    'Santorini',
    'Zanzibar',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    const targetElement = document.getElementById(
      activeCategory === 'all' ? 'catalog-section' : activeCategory
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs: { label: string; category: CategoryType; icon: React.ElementType }[] = [
    { label: 'All Collections', category: 'all', icon: Compass },
    { label: 'Curated Tours', category: 'tours', icon: Palmtree },
    { label: '5-Star Sanctuaries', category: 'hotels', icon: Hotel },
    { label: 'Michelin Dining', category: 'restaurants', icon: UtensilsCrossed },
    { label: 'Artisan Refreshments', category: 'refreshments', icon: Coffee },
  ];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-950 min-h-[92vh] flex items-center justify-center">
      {/* Background Banner with Cinematic Ken Burns Effect & Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
          alt="Luxury coastal sanctuary"
          className="w-full h-full object-cover opacity-65 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-slate-950" />
        {/* Subtle Ambient Orbs */}
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-ambient-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-ambient-pulse animation-delay-300 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 flex flex-col items-center text-center">
        {/* Minimalist Subhead Tag with Gentle Floating Animation */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-widest uppercase mb-5 sm:mb-6 shadow-xl hover:border-amber-400/60 transition-all cursor-default animate-float-gentle">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin duration-[10000ms]" />
          <span>Private Concierge • Curated Expeditions • Five-Star Living</span>
        </div>

        {/* Hero Title with Gold Gradient Shimmer Animation */}
        <h1 className="animate-fade-in-up animation-delay-100 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12] max-w-4xl mb-4 sm:mb-5">
          <span className="gold-gradient-text">Journeys Beyond</span>
          <br />
          The Ordinary
        </h1>

        {/* Hero Subtitle */}
        <p className="animate-fade-in-up animation-delay-200 text-xs sm:text-base md:text-lg text-slate-300/90 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal">
          Hand-crafted multi-day expeditions, private island villas, guaranteed Michelin tables, and bespoke travel hampers across the world's most breathtaking sanctuaries.
        </p>

        {/* Unified Search & Booking Bar with Entrance Pop */}
        <div className="animate-fade-in-up animation-delay-300 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 sm:p-5 shadow-2xl border border-white/50 text-slate-800 transition-all hover:shadow-amber-500/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-slate-100 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeCategory === tab.category;
              return (
                <button
                  key={tab.category}
                  onClick={() => setActiveCategory(tab.category)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-amber-300 shadow-sm scale-102 font-bold ring-1 ring-amber-400/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'opacity-70'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-left">
            {/* Input 1: Destination */}
            <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-amber-400/60 transition-all focus-within:ring-2 focus-within:ring-amber-400/20">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                Destination
              </label>
              <select
                value={selectedDestinationFilter}
                onChange={(e) => {
                  setSelectedDestinationFilter(e.target.value);
                  setLocalSearch(e.target.value === 'All Destinations' ? '' : e.target.value);
                  setSearchQuery(e.target.value === 'All Destinations' ? '' : e.target.value);
                }}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none cursor-pointer"
              >
                {destinationOptions.map((dest) => (
                  <option key={dest} value={dest} className="text-slate-900">
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Dates */}
            <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-amber-400/60 transition-all focus-within:ring-2 focus-within:ring-amber-400/20">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" />
                Travel Dates
              </label>
              <select
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none cursor-pointer"
              >
                <option value="Anytime">Flexible / Anytime</option>
                <option value="Nov - Dec 2026">Nov – Dec 2026</option>
                <option value="Jan - Feb 2027">Jan – Feb 2027</option>
                <option value="Spring 2027">Spring 2027</option>
                <option value="Summer 2027">Summer 2027</option>
              </select>
            </div>

            {/* Input 3: Guests */}
            <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-amber-400/60 transition-all focus-within:ring-2 focus-within:ring-amber-400/20">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-600" />
                Travelers
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none cursor-pointer"
              >
                <option value="1 Solo Traveler">1 Solo Traveler</option>
                <option value="2 Guests (Couple / Pair)">2 Guests (Couple)</option>
                <option value="3-4 Guests (Family / Suite)">3–4 Guests (Family)</option>
                <option value="5+ Group Travelers">5+ Private Party</option>
              </select>
            </div>

            {/* Action Button with Card-Sheen and Scale */}
            <div className="flex items-center sm:col-span-2 md:col-span-1">
              <button
                type="submit"
                className="card-sheen btn-luxury w-full h-full min-h-[46px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:from-slate-900 hover:to-slate-800 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-amber-500/30 hover:border-amber-400 hover:shadow-lg"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>

          {/* Quick Keywords */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-slate-400 font-medium">Curated destinations:</span>
            {['Bali', 'Switzerland', 'Amalfi Coast', 'Kyoto', 'Dubai', 'Santorini'].map(
              (keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => {
                    setSearchQuery(keyword);
                    setLocalSearch(keyword);
                    setSelectedDestinationFilter(keyword);
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 transition-all text-[11px] font-medium cursor-pointer hover:scale-105 active:scale-95"
                >
                  {keyword}
                </button>
              )
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="animate-fade-in-up animation-delay-400 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-10 sm:mt-12 w-full max-w-4xl text-left border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 group">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-white font-serif font-bold text-xs sm:text-sm">Verified Sanctuaries</h4>
              <p className="text-slate-400 text-[11px]">Hand-inspected suites</p>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <UtensilsCrossed className="w-5 h-5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-white font-serif font-bold text-xs sm:text-sm">Guaranteed Tables</h4>
              <p className="text-slate-400 text-[11px]">Michelin allocations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <Award className="w-5 h-5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-white font-serif font-bold text-xs sm:text-sm">White Glove Service</h4>
              <p className="text-slate-400 text-[11px]">24/7 dedicated concierge</p>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-white font-serif font-bold text-xs sm:text-sm">4.98 / 5 Rating</h4>
              <p className="text-slate-400 text-[11px]">18,400+ satisfied guests</p>
            </div>
          </div>
        </div>

        {/* Floating Scroll Down Indicator */}
        <div className="mt-8 sm:mt-10 animate-float flex flex-col items-center gap-1 text-slate-400 text-[10px] tracking-widest uppercase cursor-pointer hover:text-amber-300 transition-colors"
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Explore Collections</span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
