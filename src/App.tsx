import React, { useState } from 'react';
import { TravelProvider, useTravel } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseDemoBar } from './components/common/ShowcaseDemoBar';
import { LuxuryBrandValueBanner } from './components/common/LuxuryBrandValueBanner';
import { InteractiveDestinationExplorer } from './components/common/InteractiveDestinationExplorer';
import { CategoryPills } from './components/CategoryPills';
import { TourList } from './components/tours/TourList';
import { HotelList } from './components/hotels/HotelList';
import { RestaurantList } from './components/restaurants/RestaurantList';
import { RefreshmentList } from './components/refreshments/RefreshmentList';
import { CustomPackageBuilder } from './components/custom-package/CustomPackageBuilder';
import { TestimonialsSection } from './components/reviews/TestimonialsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/cart/WishlistDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { MyBookingsModal } from './components/bookings/MyBookingsModal';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { activeCategory } = useTravel();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-500 selection:text-white pb-16 md:pb-0">
      {/* Toast Notification Container */}
      <Toast />

      {/* Recruiter / Client Showcase Guide Bar */}
      <ShowcaseDemoBar />

      {/* Main Luxury Navbar */}
      <Navbar />

      {/* Hero with Unified Search Bar */}
      <Hero />

      {/* Brand Value Pillars: The AuraVoyage Standard */}
      <LuxuryBrandValueBanner />

      {/* Interactive Destination Atlas & Weather Explorer */}
      <InteractiveDestinationExplorer />

      {/* Category Navigation Pills */}
      <CategoryPills />

      {/* Main Sections */}
      <main className="flex-1">
        {activeCategory === 'all' && (
          <>
            <TourList />
            <HotelList />
            <RestaurantList />
            <RefreshmentList />
            <CustomPackageBuilder />
          </>
        )}

        {activeCategory === 'tours' && <TourList />}
        {activeCategory === 'hotels' && <HotelList />}
        {activeCategory === 'restaurants' && <RestaurantList />}
        {activeCategory === 'refreshments' && <RefreshmentList />}
        {activeCategory === 'builder' && <CustomPackageBuilder />}

        {/* Traveler Testimonials & Reviews */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Drawers & Modals */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistDrawer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <MyBookingsModal />

      {/* Floating Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <TravelProvider>
      <MainContent />
    </TravelProvider>
  );
}
