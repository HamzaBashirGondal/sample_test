import { FormEvent, useState } from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  promoCode: string | null;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onApplyPromo: (code: string | null) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 120;

export function CartDrawer({
  isOpen,
  items,
  promoCode,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onApplyPromo,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [codeInput, setCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoCode === 'KROFT10' ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const progressPercent = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handlePromoSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = codeInput.trim().toUpperCase();
    if (!normalized) return;
    if (normalized === 'KROFT10') {
      onApplyPromo('KROFT10');
      setPromoMessage('KROFT10 applied — 10% off your bag.');
      setCodeInput('');
    } else {
      setPromoMessage('Try code KROFT10 for 10% off.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E0E]/55 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-md bg-[#F6F5F1] h-full flex flex-col shadow-2xl border-l border-[#0E0E0E]/15">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0E0E0E]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#0E0E0E]" />
            <h2 className="font-display text-lg font-bold text-[#0E0E0E]">
              Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md text-[#2A2B2A] hover:bg-[#EAE6DD] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#EAE6DD]/55 border-b border-[#0E0E0E]/10">
            <p className="text-xs font-medium text-[#0E0E0E] tabular-nums">
              {remainingForFreeShipping === 0
                ? 'Unlocked: Free US Express Shipping'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for Free US Shipping`}
            </p>
            <div className="mt-2 h-1.5 w-full bg-[#0E0E0E]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4A5240] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#0E0E0E]/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#575755] mb-3" strokeWidth={1.5} />
              <p className="font-display text-lg font-semibold text-[#0E0E0E]">
                Your bag is empty
              </p>
              <p className="text-sm text-[#575755] mt-1 max-w-xs">
                Explore our heavyweight 300–340 GSM baggy shirts to start building your rotation.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-5 py-2.5 min-h-[42px] bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="w-20 h-24 rounded-md overflow-hidden bg-[#EAE6DD] shrink-0">
                  <ResilientImage
                    src={item.image}
                    alt={`${item.name} in ${item.color.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#0E0E0E] leading-snug">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#575755] hover:text-[#0E0E0E] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-[#575755] mt-1">
                      {item.color.name} · Size {item.size} · {item.gsm} GSM
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[#0E0E0E]/15 rounded bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Decrease item quantity"
                        className="p-1.5 text-[#0E0E0E] hover:bg-[#EAE6DD]/60 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Increase item quantity"
                        className="p-1.5 text-[#0E0E0E] hover:bg-[#EAE6DD]/60 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-mono font-semibold text-[#0E0E0E] tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#0E0E0E]/12 bg-[#EAE6DD]/40 space-y-4">
            {/* Promo Code */}
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#575755] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Promo code (try KROFT10)"
                  aria-label="Promo code"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#0E0E0E]/15 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold bg-[#EAE6DD] text-[#0E0E0E] border border-[#0E0E0E]/15 rounded-md hover:bg-[#D6CFC2] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className="text-xs text-[#4A5240] font-medium">{promoMessage}</p>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[#575755]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-[#4A5240]">
                  <span>Discount (KROFT10 · 10%)</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between font-semibold text-[#0E0E0E] pt-2 border-t border-[#0E0E0E]/10">
                <span>Estimated Total</span>
                <span className="font-mono text-base tabular-nums">
                  ${discountedSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 min-h-[46px] bg-[#0E0E0E] text-[#F6F5F1] text-sm font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
