import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    currency,
  } = useTravel();

  if (!isCartOpen) return null;

  const subtotalUSD = cart.reduce(
    (acc, item) => acc + item.unitPriceUSD * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">Trip Bag</h3>
                <span className="text-[10px] text-slate-500">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} added
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items Container */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl border border-slate-200 bg-white flex gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-semibold text-slate-500">
                          {item.itemType.replace('_', ' ')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.destination}</span>
                      </div>

                      {/* Item Details */}
                      <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-1">
                        {item.selectedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {item.selectedDate}
                          </span>
                        )}
                        {item.timeSlot && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {item.timeSlot}
                          </span>
                        )}
                        {item.guestsCount && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            {item.guestsCount} Guests
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <div className="flex items-center bg-slate-50 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="p-1 rounded hover:bg-white text-slate-600"
                          aria-label="Decrease"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-medium text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="p-1 rounded hover:bg-white text-slate-600"
                          aria-label="Increase"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-bold text-xs text-slate-900">
                        {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-medium text-slate-700 text-xs">Your trip bag is empty</h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Add tour packages, hotel nights, restaurant tables, or refreshments to reserve them together.
                </p>
              </div>
            )}
          </div>

          {/* Minimalist Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-semibold text-slate-800">
                  {formatPrice(subtotalUSD, currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Concierge & Service:</span>
                <span className="text-slate-700 font-medium">Included</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-800 text-xs">Estimated Total:</span>
                <span className="text-xl font-serif font-bold text-slate-900">
                  {formatPrice(subtotalUSD, currency)}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:from-slate-900 hover:to-slate-800 text-amber-300 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30 hover:scale-[1.01]"
              >
                <span>Proceed to VIP Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  Secure Booking Guarantee
                </span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
