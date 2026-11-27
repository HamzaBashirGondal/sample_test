import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Package, Truck } from 'lucide-react';
import { US_STATES } from '../data/products';
import { CartItem, ConfirmedOrder } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CheckoutViewProps {
  items: CartItem[];
  promoCode: string | null;
  onBackToShop: () => void;
  onOrderConfirmed: (order: ConfirmedOrder) => void;
}

type ShippingOption = 'ground' | 'express';
type PaymentOption = 'card' | 'express_pay' | 'cod';

export function CheckoutView({
  items,
  promoCode,
  onBackToShop,
  onOrderConfirmed,
}: CheckoutViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('CA');
  const [zip, setZip] = useState('');

  const [shippingOption, setShippingOption] = useState<ShippingOption>('ground');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('card');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoCode === 'KROFT10' ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const groundCost = discountedSubtotal >= 120 ? 0 : 9;
  const shippingCost = shippingOption === 'express' ? 18 : groundCost;
  const tax = +(discountedSubtotal * 0.0825).toFixed(2);
  const total = +(discountedSubtotal + shippingCost + tax).toFixed(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !street.trim() || !city.trim() || !zip.trim()) {
      setFormError('Please complete all required US shipping contact and address fields.');
      return;
    }
    if (paymentOption === 'card' && (cardNumber.replace(/\s/g, '').length < 12 || !cardExpiry.trim() || !cardCvc.trim())) {
      setFormError('Please enter valid card details or select Express Pay / Cash on Delivery.');
      return;
    }
    setFormError('');

    const orderNumber = `KR-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentLabel =
      paymentOption === 'card'
        ? `Card ending in ${cardNumber.slice(-4) || '4242'}`
        : paymentOption === 'express_pay'
        ? 'Express Checkout'
        : 'Cash on Delivery (COD)';

    const order: ConfirmedOrder = {
      orderNumber,
      placedAt: 'Nov 22, 2026',
      customerName: fullName.trim(),
      email: email.trim(),
      shippingAddress: `${street.trim()}${apt ? `, ${apt.trim()}` : ''}, ${city.trim()}, ${stateCode} ${zip.trim()}`,
      shippingMethod:
        shippingOption === 'express'
          ? '2-Day Express Air'
          : groundCost === 0
          ? 'Free US Ground'
          : 'Standard US Ground',
      paymentMethod: paymentLabel,
      items: [...items],
      subtotal,
      discount,
      shippingCost,
      tax,
      total,
    };

    setConfirmedOrder(order);
    onOrderConfirmed(order);
  };

  if (confirmedOrder) {
    return (
      <section className="py-12 sm:py-20 bg-[#F6F5F1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="p-6 sm:p-10 rounded-xl bg-white border border-[#0E0E0E]/12">
            <div className="flex items-center gap-3 text-[#4A5240]">
              <CheckCircle2 className="w-7 h-7 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-wider">
                Order Verified &amp; Confirmed
              </p>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0E0E0E] mt-3">
              Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
            </h1>
            <p className="text-sm text-[#575755] mt-2">
              A confirmation receipt has been sent to{' '}
              <span className="font-medium text-[#0E0E0E]">{confirmedOrder.email}</span>. Ships
              from our Los Angeles warehouse.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[#EAE6DD]/45 text-xs">
              <div>
                <p className="text-[#575755]">Ship To</p>
                <p className="font-semibold text-[#0E0E0E] mt-1">{confirmedOrder.customerName}</p>
                <p className="text-[#2A2B2A] mt-0.5">{confirmedOrder.shippingAddress}</p>
              </div>
              <div>
                <p className="text-[#575755]">Delivery &amp; Payment</p>
                <p className="font-semibold text-[#0E0E0E] mt-1">{confirmedOrder.shippingMethod}</p>
                <p className="text-[#2A2B2A] mt-0.5">{confirmedOrder.paymentMethod}</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-[#0E0E0E]/10 border-y border-[#0E0E0E]/10">
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-[#0E0E0E]">{item.name}</p>
                    <p className="text-xs text-[#575755]">
                      {item.color.name} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-semibold tabular-nums text-[#0E0E0E]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#575755]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${confirmedOrder.subtotal.toFixed(2)}</span>
              </div>
              {confirmedOrder.discount > 0 && (
                <div className="flex justify-between text-[#4A5240]">
                  <span>Promo Discount</span>
                  <span className="font-mono tabular-nums">-${confirmedOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#575755]">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {confirmedOrder.shippingCost === 0
                    ? 'FREE'
                    : `$${confirmedOrder.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[#575755]">
                <span>Estimated Tax</span>
                <span className="font-mono tabular-nums">${confirmedOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#0E0E0E] pt-2 border-t border-[#0E0E0E]/12">
                <span>Total Paid / Due</span>
                <span className="font-mono text-base tabular-nums">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToShop}
              className="mt-8 w-full sm:w-auto px-6 py-3 min-h-[44px] bg-[#0E0E0E] text-[#F6F5F1] text-sm font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 bg-[#F6F5F1]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2A2B2A] hover:text-[#0E0E0E] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        <h1 className="font-display text-3xl font-bold text-[#0E0E0E] mt-4 pb-6 border-b border-[#0E0E0E]/10">
          US Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact & Shipping */}
            <div className="p-6 rounded-xl bg-white border border-[#0E0E0E]/12 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#0E0E0E]">
                01. Contact &amp; Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jordan Vance"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    US Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(310) 555-0194"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="742 Mateo St"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Apt / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    placeholder="Unit 4B"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Los Angeles"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    State *
                  </label>
                  <select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md bg-white focus:outline-none focus:border-[#0E0E0E]"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="90021"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="p-6 rounded-xl bg-white border border-[#0E0E0E]/12 space-y-3">
              <h2 className="font-display text-lg font-bold text-[#0E0E0E]">
                02. Delivery Speed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShippingOption('ground')}
                  className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                    shippingOption === 'ground'
                      ? 'border-[#0E0E0E] bg-[#EAE6DD]/50'
                      : 'border-[#0E0E0E]/15 hover:border-[#0E0E0E]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-[#0E0E0E]">
                    <span className="inline-flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      US Ground (3–5 Days)
                    </span>
                    <span className="font-mono tabular-nums">
                      {groundCost === 0 ? 'FREE' : `$${groundCost}`}
                    </span>
                  </div>
                  <p className="text-xs text-[#575755] mt-1">
                    Free on orders $120+ from Los Angeles
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingOption('express')}
                  className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                    shippingOption === 'express'
                      ? 'border-[#0E0E0E] bg-[#EAE6DD]/50'
                      : 'border-[#0E0E0E]/15 hover:border-[#0E0E0E]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-[#0E0E0E]">
                    <span className="inline-flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      2-Day Express Air
                    </span>
                    <span className="font-mono tabular-nums">$18</span>
                  </div>
                  <p className="text-xs text-[#575755] mt-1">
                    Priority courier with SMS tracking
                  </p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-xl bg-white border border-[#0E0E0E]/12 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#0E0E0E]">
                03. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentOption('card')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    paymentOption === 'card'
                      ? 'bg-[#0E0E0E] text-[#F6F5F1] border-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] border-[#0E0E0E]/20'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentOption('express_pay')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    paymentOption === 'express_pay'
                      ? 'bg-[#0E0E0E] text-[#F6F5F1] border-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] border-[#0E0E0E]/20'
                  }`}
                >
                  Express Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentOption('cod')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    paymentOption === 'cod'
                      ? 'bg-[#0E0E0E] text-[#F6F5F1] border-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] border-[#0E0E0E]/20'
                  }`}
                >
                  Cash on Delivery (COD)
                </button>
              </div>

              {paymentOption === 'card' && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-[#575755] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm font-mono border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="09/29"
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                      Security Code
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="842"
                      className="w-full px-3.5 py-2.5 text-sm font-mono border border-[#0E0E0E]/20 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                    />
                  </div>
                </div>
              )}

              {paymentOption === 'express_pay' && (
                <p className="text-xs text-[#575755] bg-[#EAE6DD]/45 p-3.5 rounded-md">
                  One-tap US encrypted express settlement will finalize immediately on submit.
                </p>
              )}

              {paymentOption === 'cod' && (
                <div className="text-xs text-[#2A2B2A] bg-[#EAE6DD]/55 p-4 rounded-md space-y-1">
                  <p className="font-semibold text-[#0E0E0E]">
                    Cash on Delivery — Total Due at Door: ${total.toFixed(2)}
                  </p>
                  <p className="text-[#575755]">
                    Verified via phone &amp; US ZIP code above. Orders over $120 qualify for free
                    US ground delivery.
                  </p>
                </div>
              )}
            </div>

            {formError && (
              <p className="text-sm font-medium text-[#5C4033]" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 min-h-[50px] bg-[#0E0E0E] text-[#F6F5F1] text-sm font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span className="tabular-nums">Place Order — ${total.toFixed(2)}</span>
            </button>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 p-6 rounded-xl bg-[#EAE6DD]/55 border border-[#0E0E0E]/12">
              <h2 className="font-display text-lg font-bold text-[#0E0E0E] pb-4 border-b border-[#0E0E0E]/10">
                Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </h2>

              <div className="divide-y divide-[#0E0E0E]/10 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center gap-3.5">
                    <div className="w-14 h-16 rounded overflow-hidden bg-[#EAE6DD] shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E0E0E] truncate">{item.name}</p>
                      <p className="text-xs text-[#575755]">
                        {item.color.name} · {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-semibold tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#0E0E0E]/12 space-y-2 text-sm">
                <div className="flex justify-between text-[#575755]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#4A5240]">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#575755]">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#575755]">
                  <span>Estimated US Tax</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#0E0E0E] pt-3 border-t border-[#0E0E0E]/12">
                  <span>Total</span>
                  <span className="font-mono text-lg tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
