import React, { useState } from 'react';
import { TourPackage } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import {
  Heart,
  Star,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Plus,
  Sparkles,
} from 'lucide-react';

interface TourCardProps {
  tour: TourPackage;
  onOpenDetails: (tour: TourPackage) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onOpenDetails }) => {
  const { currency, isInWishlist, toggleWishlist, addToCart } = useTravel();
  const [imageIndex, setImageIndex] = useState(0);

  const discount = tour.originalPriceUSD
    ? calculateDiscount(tour.originalPriceUSD, tour.priceUSD)
    : 0;

  const isFavorited = isInWishlist(tour.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      cartItemId: 'tour-' + tour.id + '-' + Date.now(),
      itemType: 'tour',
      referenceId: tour.id,
      title: tour.title,
      destination: tour.destination,
      image: tour.featuredImage,
      unitPriceUSD: tour.priceUSD,
      quantity: 1,
      selectedDate: tour.startDates[0],
      guestsCount: 2,
    });
  };

  return (
    <div
      onClick={() => onOpenDetails(tour)}
      className="card-sheen group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col cursor-pointer luxury-card-hover shadow-sm"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={tour.galleryImages[imageIndex] || tour.featuredImage}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

        {/* Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {tour.badges.slice(0, 1).map((badge, idx) => (
            <span
              key={idx}
              className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider"
            >
              ✦ {badge}
            </span>
          ))}
          {discount > 0 && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(tour.id, tour.title);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-125 z-10 ${
            isFavorited
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/40 text-white hover:bg-white hover:text-slate-950'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Destination Tag */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>
            {tour.destination}, {tour.country}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Theme */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-slate-800 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tour.rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">({tour.reviewsCount})</span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {tour.theme}
            </span>
          </div>

          {/* Tour Title */}
          <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
            {tour.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {tour.tagline}
          </p>

          {/* Specs Matrix */}
          <div className="flex items-center gap-3 text-xs text-slate-600 mb-3 py-2 border-y border-slate-100">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{tour.durationDays}D / {tour.durationNights}N</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{tour.groupSize}</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-1.5 mb-3">
            {tour.inclusions.slice(0, 2).map((inc, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              Experience Investment
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-serif font-bold text-slate-900">
                {formatPrice(tour.priceUSD, currency)}
              </span>
              {tour.originalPriceUSD && (
                <span className="text-[11px] text-slate-400 line-through">
                  {formatPrice(tour.originalPriceUSD, currency)}
                </span>
              )}
              <span className="text-[10px] text-slate-400">/ person</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="btn-luxury p-2 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 transition-colors cursor-pointer"
              title="Quick Add to Trip Bag"
              aria-label="Quick Add"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenDetails(tour)}
              className="btn-luxury px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
