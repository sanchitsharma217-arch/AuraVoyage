import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CategoryType, CartItem, BookingConfirmation, UserReview } from '../types';
import { INITIAL_REVIEWS } from '../data/testimonialsData';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export const SAMPLE_VIP_BOOKING: BookingConfirmation = {
  bookingId: 'AV-8842-VIP',
  createdAt: new Date().toISOString(),
  customerName: 'Alexander Vance',
  customerEmail: 'alexander.vance@auravoyage.luxury',
  customerPhone: '+1 (555) 792-8692',
  items: [
    {
      cartItemId: 'sample-tour-1',
      itemType: 'tour',
      referenceId: 'tour-1',
      title: 'Bali Ultra-Luxury Villa & Private Yacht Expedition',
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      unitPriceUSD: 2450,
      quantity: 1,
      selectedDate: '2026-12-10',
      endDate: '2026-12-17',
      guestsCount: 2,
      roomType: 'Presidential Cliffside Sanctuary',
      specialRequests: 'VIP Chauffeur pickup upon arrival, Dom Pérignon welcome bottle in villa.'
    },
    {
      cartItemId: 'sample-rest-1',
      itemType: 'restaurant',
      referenceId: 'rest-1',
      title: 'Locavore NXT Private Tasting Table',
      destination: 'Ubud, Bali',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
      unitPriceUSD: 195,
      quantity: 2,
      selectedDate: '2026-12-12',
      timeSlot: '19:30 - Sunset Chef Table',
      guestsCount: 2
    }
  ],
  subtotalUSD: 2840,
  discountUSD: 284,
  taxUSD: 255.6,
  totalUSD: 2811.6,
  paymentMethod: 'Black Card / Concierge Pay',
  paymentStatus: 'Confirmed',
  voucherCodeUsed: 'VOYAGE10'
};

interface TravelContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDestinationFilter: string;
  setSelectedDestinationFilter: (dest: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string, title?: string) => void;
  isInWishlist: (id: string) => boolean;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  bookings: BookingConfirmation[];
  addBooking: (booking: BookingConfirmation) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isMyBookingsOpen: boolean;
  setIsMyBookingsOpen: (open: boolean) => void;
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'date'>) => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  cartTotalCount: number;
  seedSampleBooking: () => void;
  resetDemo: () => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('auravoyage_currency') as Currency) || 'USD';
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('All');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('auravoyage_wishlist');
      return saved ? JSON.parse(saved) : ['tour-1', 'hotel-3'];
    } catch {
      return ['tour-1', 'hotel-3'];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('auravoyage_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<BookingConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem('auravoyage_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [SAMPLE_VIP_BOOKING];
    } catch {
      return [SAMPLE_VIP_BOOKING];
    }
  });

  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem('auravoyage_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    localStorage.setItem('auravoyage_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('auravoyage_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('auravoyage_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auravoyage_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('auravoyage_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    addToast(`Currency switched to ${c}`, 'info');
  };

  const toggleWishlist = (id: string, title?: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(title ? `Removed "${title}" from Wishlist` : 'Removed from Wishlist', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast(title ? `Added "${title}" to Wishlist!` : 'Added to Wishlist!', 'success');
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.referenceId === item.referenceId && ci.itemType === item.itemType && ci.selectedDate === item.selectedDate
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    addToast(`Added "${item.title}" to Trip Bag!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from trip bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addBooking = (booking: BookingConfirmation) => {
    setBookings((prev) => [booking, ...prev]);
    clearCart();
    addToast(`Reservation #${booking.bookingId} confirmed! Concierge dispatched.`, 'success');
  };

  const addReview = (newReview: Omit<UserReview, 'id' | 'date'>) => {
    const fullReview: UserReview = {
      ...newReview,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [fullReview, ...prev]);
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  const seedSampleBooking = () => {
    setBookings((prev) => {
      if (prev.some((b) => b.bookingId === SAMPLE_VIP_BOOKING.bookingId)) {
        return prev;
      }
      return [SAMPLE_VIP_BOOKING, ...prev];
    });
    setIsMyBookingsOpen(true);
    addToast('Loaded VIP Concierge Sample Booking!', 'success');
  };

  const resetDemo = () => {
    localStorage.removeItem('auravoyage_bookings');
    localStorage.removeItem('auravoyage_cart');
    localStorage.removeItem('auravoyage_wishlist');
    setBookings([SAMPLE_VIP_BOOKING]);
    setCart([]);
    setWishlist(['tour-1', 'hotel-3']);
    addToast('Demo environment refreshed successfully', 'info');
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <TravelContext.Provider
      value={{
        currency,
        setCurrency,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedDestinationFilter,
        setSelectedDestinationFilter,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        bookings,
        addBooking,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
        reviews,
        addReview,
        toasts,
        addToast,
        removeToast,
        cartTotalCount,
        seedSampleBooking,
        resetDemo,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
