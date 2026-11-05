import React, { useState } from 'react';
import { Hotel } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  ShoppingBag,
  BedDouble,
} from 'lucide-react';

interface HotelBookingModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onConfirmBooking: (
    hotel: Hotel,
    roomType: string,
    checkIn: string,
    checkOut: string,
    nights: number,
    guests: number,
    unitPriceUSD: number
  ) => void;
}

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  hotel,
  onClose,
  onConfirmBooking,
}) => {
  const { currency } = useTravel();

  if (!hotel) return null;

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-23');
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  const calculateNights = () => {
    try {
      const start = new Date(checkInDate).getTime();
      const end = new Date(checkOutDate).getTime();
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 3;
    }
  };

  const nights = calculateNights();
  const selectedRoom = hotel.roomTypes[selectedRoomIndex] || hotel.roomTypes[0];
  const pricePerNightUSD = Math.round(hotel.pricePerNightUSD * selectedRoom.priceMultiplier);
  const totalStayPriceUSD = pricePerNightUSD * nights;

  const handleBooking = () => {
    onConfirmBooking(
      hotel,
      selectedRoom.name,
      checkInDate,
      checkOutDate,
      nights,
      guestsCount,
      pricePerNightUSD
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="animate-modal-pop relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        {/* Modal Top Banner */}
        <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={hotel.featuredImage}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black text-white backdrop-blur-sm transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hotel Summary */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="bg-white/20 backdrop-blur-sm text-white font-medium px-2 py-0.5 rounded text-[10px]">
                {hotel.propertyType}
              </span>
              <div className="flex items-center gap-1 font-semibold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{hotel.starRating}-Star</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{hotel.destination}</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{hotel.name}</h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Room Selection */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-slate-600" />
              Select Room Tier
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {hotel.roomTypes.map((room, idx) => {
                const isSelected = selectedRoomIndex === idx;
                const roomPrice = Math.round(hotel.pricePerNightUSD * room.priceMultiplier);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedRoomIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-slate-900">
                          {room.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mb-2">
                        {room.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[10px]">Max {room.capacity}</span>
                      <span className="font-bold text-slate-900">
                        {formatPrice(roomPrice, currency)}/nt
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Guests
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none cursor-pointer"
              >
                {Array.from({ length: selectedRoom.capacity }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Special Requests (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Quiet room, early check-in, anniversary bed arrangement"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
            />
          </div>

          {/* Perks Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1 font-medium">
              <Check className="w-3.5 h-3.5 text-slate-700" />
              Complimentary Daily Breakfast
            </span>
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              {hotel.cancellationPolicy}
            </span>
          </div>
        </div>

        {/* Modal Booking Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-left">
            <span className="block text-[10px] uppercase text-slate-400 font-medium">
              Total for {nights} Night{nights > 1 ? 's' : ''}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                {formatPrice(totalStayPriceUSD, currency)}
              </span>
              <span className="text-xs text-slate-400">
                ({formatPrice(pricePerNightUSD, currency)} / night)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Confirm & Add to Trip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
