import React from 'react';
import { Restaurant } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onOpenReserve: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onOpenReserve,
}) => {
  const { currency, isInWishlist, toggleWishlist } = useTravel();
  const isFavorited = isInWishlist(restaurant.id);

  return (
    <div
      onClick={() => onOpenReserve(restaurant)}
      className="card-sheen group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col cursor-pointer luxury-card-hover shadow-sm"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={restaurant.featuredImage}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

        {/* Minimalist Ambience & Price Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
            ✦ {restaurant.ambience}
          </span>
          <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
            {restaurant.priceBracket}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(restaurant.id, restaurant.name);
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

        {/* Destination Location */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{restaurant.destination}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Cost */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">
                ({restaurant.reviewsCount} reviews)
              </span>
            </div>
            <span className="text-amber-800 font-serif font-bold text-xs">
              ~{formatPrice(restaurant.avgCostPerPersonUSD, currency)} / guest
            </span>
          </div>

          {/* Restaurant Name */}
          <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
            {restaurant.name}
          </h3>

          {/* Cuisines */}
          <p className="text-xs text-slate-600 font-medium mb-3">
            {restaurant.cuisine.slice(0, 2).join(' • ')}
          </p>

          {/* Signature Dish Highlights */}
          <div className="mb-3 space-y-1 bg-amber-50/40 p-2.5 rounded-xl border border-amber-200/50">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-amber-800">
              Signature Chef Offerings
            </span>
            {restaurant.signatureDishes.slice(0, 2).map((dish, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                <span className="text-amber-600 font-bold shrink-0">✦</span>
                <span className="line-clamp-1">{dish}</span>
              </div>
            ))}
          </div>

          {/* Dietary Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {restaurant.dietaryOptions.slice(0, 2).map((opt, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Reservation Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="line-clamp-1">{restaurant.openingHours.split(',')[0]}</span>
          </div>

          <button
            onClick={() => onOpenReserve(restaurant)}
            className="btn-luxury px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all flex items-center gap-1 shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 cursor-pointer"
          >
            <span>Reserve Table</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
