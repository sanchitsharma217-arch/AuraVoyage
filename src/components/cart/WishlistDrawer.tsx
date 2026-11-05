import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { TOURS_DATA } from '../../data/toursData';
import { HOTELS_DATA } from '../../data/hotelsData';
import { RESTAURANTS_DATA } from '../../data/restaurantsData';
import { REFRESHMENTS_DATA } from '../../data/refreshmentsData';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  MapPin,
} from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    currency,
  } = useTravel();

  if (!isWishlistOpen) return null;

  const getWishlistDetails = () => {
    return wishlist
      .map((id) => {
        const tour = TOURS_DATA.find((t) => t.id === id);
        if (tour) {
          return {
            id,
            type: 'tour' as const,
            title: tour.title,
            destination: tour.destination,
            priceUSD: tour.priceUSD,
            image: tour.featuredImage,
            subtitle: `${tour.durationDays}D / ${tour.durationNights}N`,
            rating: tour.rating,
          };
        }
        const hotel = HOTELS_DATA.find((h) => h.id === id);
        if (hotel) {
          return {
            id,
            type: 'hotel' as const,
            title: hotel.name,
            destination: hotel.destination,
            priceUSD: hotel.pricePerNightUSD,
            image: hotel.featuredImage,
            subtitle: `${hotel.starRating}-Star ${hotel.propertyType}`,
            rating: hotel.rating,
          };
        }
        const restaurant = RESTAURANTS_DATA.find((r) => r.id === id);
        if (restaurant) {
          return {
            id,
            type: 'restaurant' as const,
            title: restaurant.name,
            destination: restaurant.destination,
            priceUSD: restaurant.avgCostPerPersonUSD,
            image: restaurant.featuredImage,
            subtitle: restaurant.ambience,
            rating: restaurant.rating,
          };
        }
        const refreshment = REFRESHMENTS_DATA.find((rf) => rf.id === id);
        if (refreshment) {
          return {
            id,
            type: 'refreshment' as const,
            title: refreshment.name,
            destination: refreshment.destination,
            priceUSD: refreshment.priceUSD,
            image: refreshment.featuredImage,
            subtitle: refreshment.type,
            rating: refreshment.rating,
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const items = getWishlistDetails();

  const handleMoveToCart = (item: NonNullable<ReturnType<typeof getWishlistDetails>[0]>) => {
    addToCart({
      cartItemId: `${item.type}-${item.id}-${Date.now()}`,
      itemType: item.type,
      referenceId: item.id,
      title: item.title,
      destination: item.destination,
      image: item.image,
      unitPriceUSD: item.priceUSD,
      quantity: 1,
    });
    toggleWishlist(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">Saved Favorites</h3>
                <span className="text-[10px] text-slate-500">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Items List */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item!.id}
                  className="p-3 rounded-xl border border-slate-200 bg-white flex gap-3 hover:border-slate-300 transition-colors"
                >
                  <img
                    src={item!.image}
                    alt={item!.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-semibold text-slate-500">
                          {item!.type}
                        </span>
                        <button
                          onClick={() => toggleWishlist(item!.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">
                        {item!.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item!.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <span className="font-bold text-xs text-slate-900">
                        {formatPrice(item!.priceUSD, currency)}
                      </span>
                      <button
                        onClick={() => handleMoveToCart(item!)}
                        className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Heart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-medium text-slate-700 text-xs">No favorites saved</h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Click the heart icon on any experience or hotel stay to save it here.
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
