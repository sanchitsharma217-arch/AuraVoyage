import React, { useState } from 'react';
import { Restaurant } from '../../types';
import { useTravel } from '../../context/TravelContext';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShoppingBag,
  Check,
} from 'lucide-react';

interface TableReserveModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onConfirmReservation: (
    restaurant: Restaurant,
    date: string,
    timeSlot: string,
    guests: number,
    seatingPreference: string,
    notes: string,
    estimatedCostUSD: number
  ) => void;
}

export const TableReserveModal: React.FC<TableReserveModalProps> = ({
  restaurant,
  onClose,
  onConfirmReservation,
}) => {
  const { currency } = useTravel();

  if (!restaurant) return null;

  const [date, setDate] = useState('2026-11-20');
  const [selectedSlot, setSelectedSlot] = useState(
    restaurant.reservationSlots[0] || '7:00 PM'
  );
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState('Terrace / Sunset View');
  const [specialNotes, setSpecialNotes] = useState('');

  const seatingOptions = [
    'Terrace / Sunset View',
    'Candlelit Romantic Corner',
    'Main Dining Hall',
    'Private VIP Booth',
  ];

  const estimatedCostUSD = restaurant.avgCostPerPersonUSD * guestsCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReservation(
      restaurant,
      date,
      selectedSlot,
      guestsCount,
      seatingPreference,
      specialNotes,
      estimatedCostUSD
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="animate-modal-pop relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        {/* Modal Top Banner */}
        <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={restaurant.featuredImage}
            alt={restaurant.name}
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

          {/* Restaurant Header */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1 text-xs">
              <span className="bg-white/20 backdrop-blur-sm text-white font-medium px-2 py-0.5 rounded text-[10px]">
                {restaurant.ambience}
              </span>
              <div className="flex items-center gap-1 font-semibold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{restaurant.rating.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{restaurant.destination}</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{restaurant.name}</h3>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                Party Size
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Available Time Slot
            </label>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.reservationSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seating Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Seating Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              {seatingOptions.map((opt) => {
                const isSelected = seatingPreference === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSeatingPreference(opt)}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Dietary Notes or Occasion (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Anniversary celebration, vegetarian menu requested"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
            <span>
              Dress Code: <strong className="text-slate-700">{restaurant.dressCode}</strong>
            </span>
            <span>No reservation deposit required</span>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] uppercase font-medium text-slate-400">
                Est. Tally for {guestsCount} Guest{guestsCount > 1 ? 's' : ''}
              </span>
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(estimatedCostUSD, currency)}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
