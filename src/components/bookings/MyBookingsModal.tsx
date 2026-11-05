import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import {
  X,
  TicketCheck,
  Calendar,
  MapPin,
  Clock,
  Printer,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  QrCode,
  Share2,
  Compass,
} from 'lucide-react';

export const MyBookingsModal: React.FC = () => {
  const { isMyBookingsOpen, setIsMyBookingsOpen, bookings, currency, addToast } = useTravel();
  const [expandedId, setExpandedId] = useState<string | null>(
    bookings.length > 0 ? bookings[0].bookingId : null
  );

  if (!isMyBookingsOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSharePass = (bookingId: string) => {
    if (navigator.share) {
      navigator.share({
        title: `AuraVoyage VIP Pass #${bookingId}`,
        text: `Here is my confirmed AuraVoyage luxury reservation pass #${bookingId}.`,
        url: window.location.href,
      }).catch(() => {
        addToast('Pass link copied to clipboard!', 'info');
      });
    } else {
      addToast('Reservation pass details copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="animate-modal-pop relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-amber-500/20">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow">
              <TicketCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                  VIP Concierge Passes & Vouchers
                </h3>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {bookings.length} Confirmed Reservation{bookings.length !== 1 ? 's' : ''} • Ready for check-in
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMyBookingsOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const isExpanded = expandedId === booking.bookingId;
              const primaryItem = booking.items[0];

              return (
                <div
                  key={booking.bookingId}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : booking.bookingId)}
                    className="p-4 bg-white hover:bg-slate-50/80 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-slate-900 text-sm">
                            Pass #{booking.bookingId}
                          </span>
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ● {booking.paymentStatus}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          Guest: <strong className="text-slate-700 font-semibold">{booking.customerName}</strong> • Reserved {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                          Grand Total
                        </span>
                        <span className="text-base font-bold text-slate-900 font-serif">
                          {formatPrice(booking.totalUSD, currency)}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Luxury Boarding Pass & Concierge Voucher */}
                  {isExpanded && (
                    <div id="printable-voucher" className="p-4 sm:p-6 bg-slate-50/70 border-t border-slate-100 space-y-4">
                      {/* Luxury Boarding Pass Card */}
                      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-amber-400/30 overflow-hidden">
                        {/* Decorative watermark */}
                        <div className="absolute right-4 -bottom-10 text-white/5 font-serif font-bold text-9xl pointer-events-none select-none">
                          AV
                        </div>

                        {/* Pass Top Branding */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-serif font-bold text-base sm:text-lg tracking-wider">
                              AURAVOYAGE
                            </span>
                            <span className="text-white/40 text-xs">•</span>
                            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-slate-300 font-semibold truncate">
                              Executive Concierge Pass
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider self-start sm:self-auto">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>First Class Allocation</span>
                          </div>
                        </div>

                        {/* Passenger & Flight/Stay Specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5 text-left">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                              Primary Guest
                            </span>
                            <strong className="text-sm font-semibold text-white block mt-0.5">
                              {booking.customerName}
                            </strong>
                            <span className="text-[10px] text-slate-400">{booking.customerEmail}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                              Booking Ref
                            </span>
                            <strong className="text-sm font-mono font-bold text-amber-300 block mt-0.5">
                              {booking.bookingId}
                            </strong>
                            <span className="text-[10px] text-slate-400">Status: Guaranteed</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                              Sanctuary Destination
                            </span>
                            <strong className="text-sm font-semibold text-white block mt-0.5">
                              {primaryItem?.destination || 'Global Itinerary'}
                            </strong>
                            <span className="text-[10px] text-slate-400">Class: Ultra-Luxury</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                              Concierge Status
                            </span>
                            <strong className="text-sm font-semibold text-emerald-400 block mt-0.5">
                              Agent Assigned
                            </strong>
                            <span className="text-[10px] text-slate-400">24/7 Priority Desk</span>
                          </div>
                        </div>

                        {/* Perforated Divider with Notches */}
                        <div className="relative my-4 flex items-center justify-between">
                          <div className="w-full border-t border-dashed border-white/20" />
                        </div>

                        {/* Barcode & Digital Verification */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                              <QrCode className="w-full h-full text-slate-900" />
                            </div>
                            <div className="text-[11px] text-slate-300">
                              <span className="font-mono text-xs font-semibold text-white block tracking-wider">
                                {booking.bookingId}-VERIFIED-PASS
                              </span>
                              <span className="text-slate-400 text-[10px]">
                                Scan at private terminal or hotel concierge check-in
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSharePass(booking.bookingId)}
                              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share Pass</span>
                            </button>
                            <button
                              onClick={handlePrint}
                              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Voucher</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Itemized Voucher Breakdown */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                          Included In This Reservation ({booking.items.length})
                        </span>

                        {booking.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-100"
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                    {item.itemType.replace('_', ' ')}
                                  </span>
                                  <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                                </div>
                                <h5 className="font-semibold text-xs text-slate-900 mt-0.5">
                                  {item.title}
                                </h5>
                                <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-slate-400" />
                                    {item.destination}
                                  </span>
                                  {item.selectedDate && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3 text-slate-400" />
                                      {item.selectedDate}
                                    </span>
                                  )}
                                  {item.roomType && (
                                    <span className="text-slate-600 font-medium">
                                      Room: {item.roomType}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <span className="font-serif font-bold text-sm text-slate-900 shrink-0">
                              {formatPrice(item.unitPriceUSD * item.quantity, currency)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Payment info footer */}
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Paid with <strong>{booking.paymentMethod}</strong> • No additional on-site fees</span>
                        </div>
                        <span className="font-medium text-slate-500">
                          Support Hotline: +1 (800) 792-VOYAGE (Ext. 1)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
              <TicketCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-serif font-bold text-slate-800 text-base">No confirmed bookings yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore our curated tours, reserve a 5-star suite, or customize your dream journey in the Trip Studio.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500">
            AuraVoyage Executive Travel Guarantee
          </span>
          <button
            onClick={() => setIsMyBookingsOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Passes
          </button>
        </div>
      </div>
    </div>
  );
};
