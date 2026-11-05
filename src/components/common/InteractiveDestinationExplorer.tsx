import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { MapPin, Sun, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface DestinationMeta {
  name: string;
  country: string;
  vibe: string;
  weather: string;
  temp: string;
  bestTime: string;
  image: string;
}

const DESTINATIONS: DestinationMeta[] = [
  {
    name: 'Bali',
    country: 'Indonesia',
    vibe: 'Spiritual Luxury & Oceanfront Villas',
    weather: 'Tropical Breeze',
    temp: '29°C',
    bestTime: 'Apr – Nov',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Switzerland',
    country: 'Europe',
    vibe: 'Glacier Express & Alpine Chalets',
    weather: 'Alpine Crisp',
    temp: '12°C',
    bestTime: 'Dec – Mar & Jun – Sep',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    vibe: 'Private Yacht & Cliffside Dining',
    weather: 'Mediterranean Sun',
    temp: '24°C',
    bestTime: 'May – Oct',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    vibe: 'Historic Ryokans & Kaiseki Tea',
    weather: 'Autumn Leaves',
    temp: '18°C',
    bestTime: 'Mar – May & Oct – Nov',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    vibe: 'Desert Stargazing & Penthouse Panoramas',
    weather: 'Golden Sunshine',
    temp: '28°C',
    bestTime: 'Nov – Mar',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Santorini',
    country: 'Greece',
    vibe: 'Caldera Sunset Suites & Catamarans',
    weather: 'Aegean Warmth',
    temp: '26°C',
    bestTime: 'Apr – Oct',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
  },
];

export const InteractiveDestinationExplorer: React.FC = () => {
  const { selectedDestinationFilter, setSelectedDestinationFilter, setSearchQuery } = useTravel();

  const handleSelect = (destName: string) => {
    if (selectedDestinationFilter.toLowerCase() === destName.toLowerCase()) {
      setSelectedDestinationFilter('All');
      setSearchQuery('');
    } else {
      setSelectedDestinationFilter(destName);
      setSearchQuery(destName);
    }
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full mb-2 border border-amber-200/60">
            <Compass className="w-3.5 h-3.5 text-amber-600 animate-spin duration-[12000ms]" />
            <span>Interactive Destination Atlas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Select Your Sanctuary
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-normal">
            Click any sanctuary to instantly filter our curated expeditions, 5-star suites, and reserved tables.
          </p>
        </div>

        {selectedDestinationFilter !== 'All' && (
          <div className="flex items-center gap-2.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="text-xs text-slate-600">
              Active: <strong className="text-amber-900 font-bold">{selectedDestinationFilter}</strong>
            </span>
            <button
              onClick={() => {
                setSelectedDestinationFilter('All');
                setSearchQuery('');
              }}
              className="text-xs text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
            >
              Reset to All
            </button>
          </div>
        )}
      </div>

      {/* Destinations Grid with Staggered Transitions & Shimmer */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {DESTINATIONS.map((dest, idx) => {
          const isSelected =
            selectedDestinationFilter.toLowerCase().includes(dest.name.toLowerCase());

          return (
            <div
              key={dest.name}
              onClick={() => handleSelect(dest.name)}
              className={`card-sheen group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between aspect-[3/4] ${
                isSelected
                  ? 'ring-3 ring-amber-400 shadow-xl scale-[1.03] animate-ring-pulse'
                  : 'hover:shadow-xl hover:-translate-y-1.5 border border-slate-200/90'
              }`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />

              {/* Weather badge top */}
              <div className="relative z-10 p-2.5 sm:p-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10 group-hover:border-amber-400/40 transition-colors">
                  <Sun className="w-2.5 h-2.5 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span>{dest.temp}</span>
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px] shadow-md">
                    ✓
                  </span>
                )}
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-3 sm:p-3.5 text-white">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-300 block">
                  {dest.country}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-[10px] text-slate-300 mt-1 line-clamp-1 opacity-90">
                  {dest.vibe}
                </p>
                <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-slate-300">
                  <span>Best: {dest.bestTime}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
