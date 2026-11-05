import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { Sparkles, TicketCheck, Layers, RotateCcw, X, ChevronRight, Award } from 'lucide-react';

export const ShowcaseDemoBar: React.FC = () => {
  const { setIsMyBookingsOpen, setActiveCategory, resetDemo, seedSampleBooking } = useTravel();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-16 md:bottom-4 right-3 md:right-4 z-50 bg-slate-900/95 text-white hover:bg-slate-900 px-3 py-1.5 rounded-full text-[11px] font-medium shadow-2xl border border-amber-400/30 flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105"
        title="Show Portfolio Showcase Guide"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Portfolio Showcase Controls</span>
      </button>
    );
  }

  return (
    <aside aria-label="Portfolio showcase guide" className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white text-xs border-b border-amber-500/20 px-3 sm:px-6 py-2 relative z-50 transition-all shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Project Badge & Highlights */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase shrink-0">
            <Award className="w-3 h-3 text-amber-400" />
            <span>Showcase Project</span>
          </div>
          <span className="text-slate-300 text-[11px] font-normal hidden sm:inline">
            AuraVoyage Luxury Concierge — built with <strong className="text-white font-medium">React 19, TypeScript, Tailwind & Live State Engine</strong>
          </span>
        </div>

        {/* Right: Quick Demo Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Action 1: VIP Boarding Pass */}
          <button
            onClick={() => {
              seedSampleBooking();
              setIsMyBookingsOpen(true);
            }}
            className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/15 transition-all hover:border-amber-400/40"
            title="Inspect realistic VIP Boarding Pass with printable voucher"
          >
            <TicketCheck className="w-3 h-3 text-amber-300" />
            <span>VIP Boarding Pass</span>
          </button>

          {/* Action 2: Custom Trip Studio */}
          <button
            onClick={() => {
              setActiveCategory('builder');
              const el = document.getElementById('builder');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/15 transition-all"
            title="Launch interactive Custom Package Builder"
          >
            <Layers className="w-3 h-3 text-sky-300" />
            <span>Trip Studio</span>
            <ChevronRight className="w-2.5 h-2.5 opacity-60" />
          </button>

          {/* Action 3: Reset Demo */}
          <button
            onClick={resetDemo}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded text-[10px] transition-colors"
            title="Reset localStorage & demo state"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>

          {/* Close / Dismiss */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Dismiss guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

