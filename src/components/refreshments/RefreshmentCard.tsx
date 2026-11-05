import React, { useState } from 'react';
import { Refreshment } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  Heart,
  Star,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  ShoppingBag,
} from 'lucide-react';

interface RefreshmentCardProps {
  item: Refreshment;
}

export const RefreshmentCard: React.FC<RefreshmentCardProps> = ({ item }) => {
  const { currency, isInWishlist, toggleWishlist, addToCart } = useTravel();
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(item.id);

  const handleAdd = () => {
    addToCart({
      cartItemId: `refr-${item.id}-${Date.now()}`,
      itemType: 'refreshment',
      referenceId: item.id,
      title: item.name,
      destination: item.destination,
      image: item.featuredImage,
      unitPriceUSD: item.priceUSD,
      quantity: quantity,
      specialRequests: item.type,
    });
  };

  return (
    <div className="card-sheen group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between luxury-card-hover shadow-sm">
      <div>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src={item.featuredImage}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

          {/* Minimalist Type Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
            <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
              ✦ {item.type}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(item.id, item.name)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-125 z-10 ${
              isFavorited
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/40 text-white hover:bg-white hover:text-slate-950'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Destination */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{item.destination}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(2)}</span>
              <span className="text-slate-400 font-normal">({item.reviewsCount} reviews)</span>
            </div>
            <span className="text-[10px] text-amber-800 uppercase tracking-wider font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Artisan Grade
            </span>
          </div>

          <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-1">
            {item.name}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* Included Items Box */}
          {item.itemsIncluded && (
            <div className="bg-amber-50/40 border border-amber-200/50 rounded-xl p-3 mb-3 text-xs">
              <span className="block font-bold text-amber-900 text-[9px] uppercase tracking-wider mb-1.5">
                Hamper Inclusions:
              </span>
              <ul className="space-y-1">
                {item.itemsIncluded.slice(0, 2).map((packItem, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{packItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.caloriesOrPerk && (
            <p className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              {item.caloriesOrPerk}
            </p>
          )}
        </div>
      </div>

      {/* Pricing and Action Footer */}
      <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">Price</span>
          <span className="text-base font-serif font-bold text-slate-900">
            {formatPrice(item.priceUSD, currency)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Stepper */}
          <div className="flex items-center bg-slate-50 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded hover:bg-white text-slate-600 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-semibold text-slate-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded hover:bg-white text-slate-600 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="btn-luxury px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
