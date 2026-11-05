import React from 'react';
import { Plane, Crown, Utensils, Headphones, Shield, Sparkles } from 'lucide-react';

export const LuxuryBrandValueBanner: React.FC = () => {
  const pillars = [
    {
      icon: Crown,
      title: 'Hand-Inspected Sanctuaries',
      desc: 'Exclusive private cliffside villas, 5-star mountain chalets & heritage suites.',
      badge: 'Tier 1 Stays',
    },
    {
      icon: Plane,
      title: 'Private Wings & Chauffeurs',
      desc: 'Helicopter scenic transfers and dedicated executive airport chauffeurs.',
      badge: 'Seamless Transit',
    },
    {
      icon: Utensils,
      title: 'Guaranteed Michelin Tables',
      desc: 'Pre-reserved chef tables and curated culinary pairings across 6 continents.',
      badge: 'Priority Access',
    },
    {
      icon: Headphones,
      title: '24/7 White-Glove Concierge',
      desc: 'Dedicated destination specialists handling private requests at any hour.',
      badge: 'Dedicated Team',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-12 sm:py-16 border-y border-slate-800 relative overflow-hidden">
      {/* Ambient Pulsing Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-ambient-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-ambient-pulse animation-delay-300 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 shadow-md animate-float-gentle">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin duration-[8000ms]" />
            <span>The AuraVoyage Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Curated For The Discerning Traveler
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal leading-relaxed">
            Every itinerary is individually verified by our destination connoisseurs to ensure absolute perfection from arrival to departure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="card-sheen group p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-all duration-400 hover:bg-white/[0.06] hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-amber-300/80 font-medium">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>100% Quality Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
