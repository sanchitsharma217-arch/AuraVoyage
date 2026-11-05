import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext';
import { BookingConfirmation } from '../../types';
import { formatPrice } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Tag,
  Lock,
  Ticket,
  Printer,
  Check,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, currency, addBooking, addToast, setIsMyBookingsOpen } = useTravel();

  if (!isOpen) return null;

  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('alexander.wright@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [country, setCountry] = useState('United States');
  const [promoCodeInput, setPromoCodeInput] = useState('VOYAGE10');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('VOYAGE10');
  const [promoDiscountPct, setPromoDiscountPct] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'pay_later'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);

  const subtotalUSD = cart.reduce(
    (acc, item) => acc + item.unitPriceUSD * item.quantity,
    0
  );

  const discountUSD = appliedPromo
    ? Math.round(subtotalUSD * (promoDiscountPct / 100))
    : 0;

  const taxUSD = Math.round((subtotalUSD - discountUSD) * 0.05);
  const totalUSD = subtotalUSD - discountUSD + taxUSD;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'VOYAGE10') {
      setAppliedPromo('VOYAGE10');
      setPromoDiscountPct(10);
      addToast('Promo code VOYAGE10 applied (10% OFF)', 'success');
    } else if (code === 'WANDER20') {
      setAppliedPromo('WANDER20');
      setPromoDiscountPct(20);
      addToast('Promo code WANDER20 applied (20% OFF)', 'success');
    } else {
      addToast('Invalid promo code. Try VOYAGE10 or WANDER20', 'warning');
    }
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      addToast('Please fill in your contact details', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBookingId = 'AV-' + Math.floor(100000 + Math.random() * 900000);
      const bookingRecord: BookingConfirmation = {
        bookingId: newBookingId,
        createdAt: new Date().toISOString(),
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        items: [...cart],
        subtotalUSD,
        discountUSD,
        taxUSD,
        totalUSD,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'apple'
            ? 'Apple Pay'
            : 'Pay upon Arrival',
        paymentStatus: 'Confirmed',
        voucherCodeUsed: appliedPromo || undefined,
      };

      addBooking(bookingRecord);
      setConfirmedBooking(bookingRecord);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="animate-modal-pop relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">Secure Checkout</h3>
              <span className="text-[10px] text-slate-500">
                Encrypted Reservation Confirmation
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmed Screen or Checkout Form */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block bg-amber-400/20 text-amber-900 border border-amber-300 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest mb-2.5">
                ✦ VIP Reservation Guaranteed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Voyage Reserved, {confirmedBooking.customerName.split(' ')[0]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
                Your luxury concierge travel pass has been issued and assigned to our 24/7 dedicated dispatch team.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-amber-500/30 p-5 sm:p-6 rounded-2xl text-left max-w-lg mx-auto space-y-3.5 shadow-xl">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Official Pass Reference
                  </span>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {confirmedBooking.bookingId}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Concierge</span>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Allocated
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Reserved Portfolio:</span>
                {confirmedBooking.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-300">
                    <span className="line-clamp-1">
                      {it.quantity}x {it.title}
                    </span>
                    <span className="font-semibold text-white shrink-0 ml-2">
                      {formatPrice(it.unitPriceUSD * it.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                <span className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Grand Total:</span>
                <span className="text-xl font-serif font-bold text-amber-300">
                  {formatPrice(confirmedBooking.totalUSD, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setIsMyBookingsOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer hover:scale-105"
              >
                <Ticket className="w-4 h-4" />
                <span>Open VIP Boarding Pass</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher Slip</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmCheckout} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* Contact Details */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                1. Traveler Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                Voucher / Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="VOYAGE10 or WANDER20"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs uppercase font-medium text-slate-800 outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-[11px] text-slate-700 font-medium mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3 text-slate-600" />
                  Code {appliedPromo} applied: {promoDiscountPct}% discount credited.
                </p>
              )}
            </div>

            {/* Payment Options */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                2. Payment Method
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">Card</span>
                    {paymentMethod === 'card' && <Check className="w-3 h-3 text-slate-900" />}
                  </div>
                  <span className="text-[10px] text-slate-500">Credit / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    paymentMethod === 'apple'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">Wallet</span>
                    {paymentMethod === 'apple' && <Check className="w-3 h-3 text-slate-900" />}
                  </div>
                  <span className="text-[10px] text-slate-500">Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay_later')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    paymentMethod === 'pay_later'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">On Arrival</span>
                    {paymentMethod === 'pay_later' && <Check className="w-3 h-3 text-slate-900" />}
                  </div>
                  <span className="text-[10px] text-slate-500">At Concierge</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotalUSD, currency)}</span>
              </div>
              {discountUSD > 0 && (
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Discount:</span>
                  <span>-{formatPrice(discountUSD, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Taxes & Levies (5%):</span>
                <span>{formatPrice(taxUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total:</span>
                <span>{formatPrice(totalUSD, currency)}</span>
              </div>
            </div>

            {/* Minimalist Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-lg transition-colors"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Securing...' : `Confirm & Pay ${formatPrice(totalUSD, currency)}`}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
