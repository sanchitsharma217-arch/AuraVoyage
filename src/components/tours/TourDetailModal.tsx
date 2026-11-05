import React, { useState } from 'react';
import { TourPackage } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  Star,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Check,
  Ban,
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingBag,
  Sparkles,
  Award,
} from 'lucide-react';

interface TourDetailModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBookNow: (tour: TourPackage, date: string, travelers: number) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  onClose,
  onBookNow,
}) => {
  const { currency, isInWishlist, toggleWishlist } = useTravel();

  if (!tour) return null;

  const [activeImage, setActiveImage] = useState(tour.featuredImage);
  const [selectedDate, setSelectedDate] = useState(tour.startDates[0] || '2026-11-20');
  const [travelersCount, setTravelersCount] = useState(2);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const totalPriceUSD = tour.priceUSD * travelersCount;
  const isFavorited = isInWishlist(tour.id);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const allImages = [tour.featuredImage, ...(tour.galleryImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="animate-modal-pop relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-amber-500/30">
        {/* Modal Header with Image & Gallery */}
        <div className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={activeImage}
            alt={tour.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

          {/* Close & Wishlist Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => toggleWishlist(tour.id, tour.title)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isFavorited
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-black/50 text-white hover:bg-white hover:text-slate-900'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Gallery Thumbnails Overlay */}
          <div className="absolute top-4 left-4 flex gap-1.5 z-10">
            {allImages.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-amber-400 scale-105' : 'border-white/40 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Title & Location in Header */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="bg-amber-400/20 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ✦ {tour.theme} Expedition
              </span>
              <div className="flex items-center gap-1 font-semibold text-amber-300 text-xs bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tour.rating.toFixed(2)}</span>
                <span className="text-white/70 font-normal">({tour.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 text-xs bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {tour.destination}, {tour.country}
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif font-bold tracking-tight text-white leading-tight">
              {tour.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-normal hidden sm:block">
              {tour.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-white">
          {/* Overview Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Expedition Overview</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{tour.overview}</p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-3 sm:p-4 rounded-2xl border border-amber-200/60">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Duration
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {tour.durationDays}D / {tour.durationNights}N
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Party Size
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                {tour.groupSize}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Experience Pace
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 block">
                {tour.difficulty} Luxury
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Concierge Status
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Itinerary
              </span>
            </div>
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-serif font-bold text-slate-900 flex items-center gap-2">
                <span>Curated Day-by-Day Timeline</span>
                <span className="text-xs font-sans font-normal text-slate-500">
                  ({tour.itinerary.length} Days)
                </span>
              </h3>
              <span className="text-xs text-amber-700 font-semibold">
                All transfers & dining coordinated
              </span>
            </div>

            <div className="space-y-2.5">
              {tour.itinerary.map((dayPlan) => {
                const isExpanded = expandedDay === dayPlan.day;
                return (
                  <div
                    key={dayPlan.day}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => toggleDay(dayPlan.day)}
                      className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-300 font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          D{dayPlan.day}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900 line-clamp-1">
                            {dayPlan.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            Sanctuary: <strong className="text-slate-700">{dayPlan.stay}</strong>
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-600 space-y-2.5">
                        <p className="leading-relaxed font-normal">{dayPlan.description}</p>
                        <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                          <span>Culinary: <strong className="text-slate-800">{dayPlan.meals}</strong></span>
                          <span>Overnight: <strong className="text-slate-800">{dayPlan.stay}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/40 border border-emerald-200/60 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-700" />
                White-Glove Inclusions
              </h4>
              <ul className="space-y-2">
                {tour.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-600 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                <Ban className="w-4 h-4 text-slate-400" />
                Additional Preferences (Exclusions)
              </h4>
              <ul className="space-y-2">
                {tour.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Booking Footer */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex-1 sm:flex-initial">
              <label className="block text-[9px] text-slate-300 font-semibold uppercase">
                Departure Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer w-full"
              >
                {tour.startDates.map((date) => (
                  <option key={date} value={date} className="text-slate-900">
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex-1 sm:flex-initial">
              <label className="block text-[9px] text-slate-300 font-semibold uppercase">
                Party Size
              </label>
              <select
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer w-full"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                  <option key={n} value={n} className="text-slate-900">
                    {n} Guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
            <div className="text-left sm:text-right">
              <span className="block text-[9px] uppercase text-slate-400 font-medium">
                Total for {travelersCount} Guests
              </span>
              <span className="text-lg sm:text-2xl font-serif font-bold text-amber-300">
                {formatPrice(totalPriceUSD, currency)}
              </span>
            </div>

            <button
              onClick={() => onBookNow(tour, selectedDate, travelersCount)}
              className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Reserve Journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
