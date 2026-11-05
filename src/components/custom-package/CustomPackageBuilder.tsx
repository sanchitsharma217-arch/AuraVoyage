import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { HOTELS_DATA } from '../../data/hotelsData';
import { RESTAURANTS_DATA } from '../../data/restaurantsData';
import { REFRESHMENTS_DATA } from '../../data/refreshmentsData';
import { formatPrice } from '../../utils/formatters';
import {
  Hotel,
  UtensilsCrossed,
  Coffee,
  Check,
  ShoppingBag,
  ShieldCheck,
  Layers,
  Sparkles,
  Crown,
  Calendar,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const CustomPackageBuilder: React.FC = () => {
  const { currency, addToCart, setIsCartOpen } = useTravel();

  const destinations = ['Bali', 'Switzerland', 'Amalfi Coast', 'Kyoto', 'Dubai', 'Santorini'];
  const [selectedDest, setSelectedDest] = useState('Bali');
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(5);
  const [startDate, setStartDate] = useState('2026-11-25');

  const availableHotels = HOTELS_DATA.filter((h) =>
    h.destination.toLowerCase().includes(selectedDest.toLowerCase())
  );
  const availableRestaurants = RESTAURANTS_DATA.filter((r) =>
    r.destination.toLowerCase().includes(selectedDest.toLowerCase())
  );
  const availableRefreshments = REFRESHMENTS_DATA.filter((rf) =>
    rf.destination.toLowerCase().includes(selectedDest.toLowerCase())
  );

  const [selectedHotelId, setSelectedHotelId] = useState<string>(
    availableHotels[0]?.id || HOTELS_DATA[0].id
  );
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
    availableRestaurants[0]?.id || null
  );
  const [selectedRefreshmentIds, setSelectedRefreshmentIds] = useState<string[]>([
    availableRefreshments[0]?.id || REFRESHMENTS_DATA[0].id,
  ]);

  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-guide']);

  const activityAddons = [
    {
      id: 'addon-guide',
      title: 'Private English-Speaking Concierge & Cultural Host',
      priceUSD: 180,
      description: 'Dedicated private local guide and personal companion',
    },
    {
      id: 'addon-photo',
      title: 'Vacation Editorial Photography (50 High-Res Prints)',
      priceUSD: 240,
      description: 'Private 3-hour shoot at iconic architectural landmarks',
    },
    {
      id: 'addon-transfer',
      title: 'Executive Airport Chauffeur (S-Class / Range Rover)',
      priceUSD: 160,
      description: 'Tarmac meet & greet with luggage handling and refreshments',
    },
    {
      id: 'addon-yacht',
      title: 'Private Sunset Catamaran / Yacht Cruise (Half-Day)',
      priceUSD: 450,
      description: 'Skippered charter with Champagne, canapés, and snorkel gear',
    },
  ];

  const chosenHotel =
    HOTELS_DATA.find((h) => h.id === selectedHotelId) || HOTELS_DATA[0];
  const chosenRestaurant = RESTAURANTS_DATA.find((r) => r.id === selectedRestaurantId);
  const chosenRefreshments = REFRESHMENTS_DATA.filter((r) =>
    selectedRefreshmentIds.includes(r.id)
  );

  const hotelTotalUSD = (chosenHotel ? chosenHotel.pricePerNightUSD : 0) * nights;
  const restaurantTotalUSD = chosenRestaurant
    ? chosenRestaurant.avgCostPerPersonUSD * travelers
    : 0;
  const refreshmentsTotalUSD = chosenRefreshments.reduce(
    (acc, curr) => acc + curr.priceUSD * (curr.isPack ? 1 : travelers),
    0
  );
  const addonsTotalUSD = activityAddons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((acc, curr) => acc + curr.priceUSD, 0);

  const subtotalUSD = hotelTotalUSD + restaurantTotalUSD + refreshmentsTotalUSD + addonsTotalUSD;
  const bundleDiscountUSD = Math.round(subtotalUSD * 0.15);
  const finalPriceUSD = subtotalUSD - bundleDiscountUSD;

  const toggleRefreshment = (id: string) => {
    setSelectedRefreshmentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookCustomBundle = () => {
    addToCart({
      cartItemId: `bundle-${Date.now()}`,
      itemType: 'custom_bundle',
      referenceId: `custom-${selectedDest.toLowerCase()}`,
      title: `Bespoke ${selectedDest} Sanctuary (${nights} Nights)`,
      destination: selectedDest,
      image: chosenHotel ? chosenHotel.featuredImage : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      unitPriceUSD: finalPriceUSD,
      quantity: 1,
      selectedDate: startDate,
      guestsCount: travelers,
      specialRequests: `Sanctuary: ${chosenHotel?.name} | Dining: ${chosenRestaurant?.name || 'None'} | Refreshments: ${chosenRefreshments.map((r) => r.name).join(', ')}`,
      bundleDetails: {
        hotelName: chosenHotel?.name,
        restaurantName: chosenRestaurant?.name,
        refreshmentsName: chosenRefreshments.map((r) => r.name),
      },
    });
    setIsCartOpen(true);
  };

  return (
    <section id="builder" className="container mx-auto px-4 lg:px-8 py-10 sm:py-16 border-t border-slate-200">
      {/* Editorial Header */}
      <div className="text-left md:text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-3 border border-amber-200">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>The Private Travel Studio</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Design Your Bespoke Itinerary
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
          Hand-select your 5-star sanctuary, pre-reserve Michelin chef tables, and curate executive add-ons. 
          Enjoy an automatic <strong className="text-amber-800 font-semibold">15% Concierge Studio privilege</strong> on bespoke combinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left 2 Columns: Configurator Controls */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* Mobile Quick-Summary Card */}
          <div className="lg:hidden bg-gradient-to-r from-slate-950 to-slate-900 text-white p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                {selectedDest} • {nights} Nights ({travelers} Guests)
              </span>
              <span className="text-base font-serif font-bold text-white">
                {formatPrice(finalPriceUSD, currency)}
              </span>
            </div>
            <button
              onClick={handleBookCustomBundle}
              className="btn-luxury bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </button>
          </div>

          {/* Step 1: Destination & Logistics */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>Sanctuary Destination & Dates</span>
            </h3>

            {/* Destination Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {destinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => {
                    setSelectedDest(dest);
                    const matchingH = HOTELS_DATA.find((h) =>
                      h.destination.toLowerCase().includes(dest.toLowerCase())
                    );
                    if (matchingH) setSelectedHotelId(matchingH.id);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedDest === dest
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/40'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  Duration
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none cursor-pointer focus:border-amber-500"
                >
                  {[2, 3, 4, 5, 7, 10, 14].map((n) => (
                    <option key={n} value={n}>
                      {n} Nights Retreat
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-600" />
                  Guests
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none cursor-pointer focus:border-amber-500"
                >
                  {[1, 2, 3, 4, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Choose Accommodation */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>Select 5-Star Sanctuary ({nights} Nights in {selectedDest})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(availableHotels.length > 0 ? availableHotels : HOTELS_DATA.slice(0, 2)).map(
                (hotel) => {
                  const isSelected = selectedHotelId === hotel.id;
                  return (
                    <div
                      key={hotel.id}
                      onClick={() => setSelectedHotelId(hotel.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-1 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={hotel.featuredImage}
                        alt={hotel.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
                              {hotel.propertyType}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mt-0.5">
                            {hotel.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {hotel.highlight}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-900 mt-1">
                          {formatPrice(hotel.pricePerNightUSD, currency)} <span className="text-[10px] font-sans font-normal text-slate-500">/ night</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Step 3: Add Dining Experience */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span>Reserve Michelin Dining (Optional)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(availableRestaurants.length > 0 ? availableRestaurants : RESTAURANTS_DATA.slice(0, 2)).map(
                (rest) => {
                  const isSelected = selectedRestaurantId === rest.id;
                  return (
                    <div
                      key={rest.id}
                      onClick={() =>
                        setSelectedRestaurantId(isSelected ? null : rest.id)
                      }
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-1 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={rest.featuredImage}
                        alt={rest.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
                              {rest.ambience}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mt-0.5">
                            {rest.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {rest.signatureDishes[0]}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-slate-900 mt-1">
                          {formatPrice(rest.avgCostPerPersonUSD, currency)} <span className="text-[10px] font-sans font-normal text-slate-500">/ guest tasting</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Step 4: Refreshments */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span>Gourmet Travel Hampers & Refreshments</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REFRESHMENTS_DATA.slice(0, 4).map((refr) => {
                const isSelected = selectedRefreshmentIds.includes(refr.id);
                return (
                  <div
                    key={refr.id}
                    onClick={() => toggleRefreshment(refr.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-400'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={refr.featuredImage}
                        alt={refr.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <h5 className="font-semibold text-xs text-slate-900 truncate">
                          {refr.name}
                        </h5>
                        <span className="text-[10px] text-slate-500">{refr.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif font-bold text-xs text-slate-900">
                        {formatPrice(refr.priceUSD, currency)}
                      </span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          isSelected ? 'bg-slate-900 text-amber-300' : 'border border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 5: Guided Excursions */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span>VIP Executive Add-ons</span>
            </h3>

            <div className="space-y-2.5">
              {activityAddons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-400'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h5 className="font-semibold text-xs sm:text-sm text-slate-900">
                        {addon.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">{addon.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-serif font-bold text-xs sm:text-sm text-slate-900">
                        +{formatPrice(addon.priceUSD, currency)}
                      </span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          isSelected ? 'bg-slate-900 text-amber-300' : 'border border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary & Checkout Card */}
        <div className="lg:sticky lg:top-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-3xl border border-amber-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 block">
                Bespoke Package Summary
              </span>
              <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                {selectedDest} Luxury Sanctuary
              </h4>
            </div>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
              {nights}N • {travelers} Guests
            </span>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium text-slate-200 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-amber-400" />
                  {chosenHotel?.name || 'Sanctuary Stay'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {nights} Nights @ {chosenHotel ? formatPrice(chosenHotel.pricePerNightUSD, currency) : ''}/nt
                </span>
              </div>
              <span className="font-serif font-semibold text-white">
                {formatPrice(hotelTotalUSD, currency)}
              </span>
            </div>

            {chosenRestaurant && (
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                    {chosenRestaurant.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Dinner for {travelers} ({chosenRestaurant.ambience})
                  </span>
                </div>
                <span className="font-serif font-semibold text-white">
                  {formatPrice(restaurantTotalUSD, currency)}
                </span>
              </div>
            )}

            {chosenRefreshments.length > 0 && (
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    Hampers & Refreshments ({chosenRefreshments.length})
                  </span>
                </div>
                <span className="font-serif font-semibold text-white">
                  {formatPrice(refreshmentsTotalUSD, currency)}
                </span>
              </div>
            )}

            {addonsTotalUSD > 0 && (
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    VIP Add-ons ({selectedAddons.length})
                  </span>
                </div>
                <span className="font-serif font-semibold text-white">
                  {formatPrice(addonsTotalUSD, currency)}
                </span>
              </div>
            )}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Standard Price:</span>
              <span>{formatPrice(subtotalUSD, currency)}</span>
            </div>
            <div className="flex justify-between text-amber-300 font-medium">
              <span>Studio Package Discount (15%):</span>
              <span>-{formatPrice(bundleDiscountUSD, currency)}</span>
            </div>
            <div className="flex justify-between items-baseline text-white pt-3 border-t border-white/10">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Journey Investment</span>
                <span className="text-[10px] text-slate-400">Includes all taxes & private concierge</span>
              </div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                {formatPrice(finalPriceUSD, currency)}
              </span>
            </div>
          </div>

          {/* Booking CTA Button */}
          <button
            onClick={handleBookCustomBundle}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Reserve Custom Journey</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Guaranteed Allocation • Free Cancellation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
