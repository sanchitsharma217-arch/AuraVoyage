import React from 'react';
import { useTravel } from '../context/TravelContext';
import { CategoryType } from '../types';
import {
  Compass,
  Palmtree,
  Hotel,
  UtensilsCrossed,
  Coffee,
  Layers,
} from 'lucide-react';

export const CategoryPills: React.FC = () => {
  const { activeCategory, setActiveCategory } = useTravel();

  const categories: {
    id: CategoryType;
    label: string;
    description: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'all',
      label: 'All Portfolios',
      description: 'Complete collection',
      icon: Compass,
    },
    {
      id: 'tours',
      label: 'Curated Tours',
      description: 'Multi-day expeditions',
      icon: Palmtree,
    },
    {
      id: 'hotels',
      label: '5-Star Sanctuaries',
      description: 'Suites, villas & chalets',
      icon: Hotel,
    },
    {
      id: 'restaurants',
      label: 'Michelin Dining',
      description: 'Chef tables & tastings',
      icon: UtensilsCrossed,
    },
    {
      id: 'refreshments',
      label: 'Artisan Hampers',
      description: 'Gourmet travel packs',
      icon: Coffee,
    },
    {
      id: 'builder',
      label: 'Trip Studio',
      description: 'Bespoke custom bundles',
      icon: Layers,
    },
  ];

  return (
    <section id="catalog-section" className="container mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-2 border-b border-slate-200/80 pb-3 sm:pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Curated Collections
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-normal">
          Filter bespoke expeditions, private sanctuaries, culinary tables, or bespoke studio builder.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const elem = document.getElementById(cat.id === 'all' ? 'catalog-section' : cat.id);
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex flex-col items-start text-left p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-amber-500 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className="font-serif font-bold text-xs sm:text-sm leading-snug line-clamp-1">{cat.label}</span>
              <span
                className={`text-[10px] mt-0.5 line-clamp-1 ${
                  isSelected ? 'text-amber-200' : 'text-slate-400'
                }`}
              >
                {cat.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
