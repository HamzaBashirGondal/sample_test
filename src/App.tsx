import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { BrandStorySection } from './components/BrandStorySection';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSections } from './components/CatalogSections';
import { CheckoutView } from './components/CheckoutView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductDetailView } from './components/ProductDetailView';
import { ProofAndFaqSection } from './components/ProofAndFaqSection';
import { SHIRT_PRODUCTS } from './data/products';
import {
  AppView,
  CartItem,
  ProductColorOption,
  ShirtProduct,
  ShirtSize,
} from './types/shop';

const CART_STORAGE_KEY = 'kroft_shopping_bag_v1';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<ShirtProduct>(SHIRT_PRODUCTS[0]);
  const [selectedProductColor, setSelectedProductColor] = useState<ProductColorOption | undefined>(
    undefined
  );

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read failure
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage write failure
    }
  }, [cartItems]);

  const totalBagCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const scrollToElement = (sectionId: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      scrollToElement(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleGoHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (
    product: ShirtProduct,
    preferredColor?: ProductColorOption
  ) => {
    setSelectedProduct(product);
    setSelectedProductColor(preferredColor || product.colors[0]);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: ShirtProduct,
    color: ProductColorOption,
    size: ShirtSize,
    quantity = 1
  ) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: Math.min(10, i.quantity + quantity) } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: color.image,
          color,
          size,
          quantity,
          gsm: product.gsm,
        },
      ];
    });

    setToastMessage(`Added ${product.name} (${color.name} · ${size}) to bag`);
    window.setTimeout(() => {
      setToastMessage((current) =>
        current === `Added ${product.name} (${color.name} · ${size}) to bag`
          ? null
          : current
      );
    }, 3200);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderConfirmed = () => {
    setCartItems([]);
    setPromoCode(null);
  };

  const relatedProducts = useMemo(
    () => SHIRT_PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 4),
    [selectedProduct]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F5F1] text-[#0E0E0E]">
      <Header
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
        onGoHome={handleGoHome}
      />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection
              onShopCollection={() => handleNavigateSection('collection')}
              onExploreNewArrivals={() => handleNavigateSection('new-arrivals')}
            />
            <CatalogSections
              products={SHIRT_PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(product, color, size) => handleAddToCart(product, color, size, 1)}
            />
            <BrandStorySection
              onShopCollection={() => handleNavigateSection('collection')}
            />
            <ProofAndFaqSection />
          </>
        )}

        {activeView === 'product' && (
          <ProductDetailView
            key={`${selectedProduct.id}-${selectedProductColor?.name || 'default'}`}
            product={selectedProduct}
            initialColor={selectedProductColor}
            relatedProducts={relatedProducts}
            onBack={() => handleNavigateSection('collection')}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutView
            items={cartItems}
            promoCode={promoCode}
            onBackToShop={handleGoHome}
            onOrderConfirmed={handleOrderConfirmed}
          />
        )}
      </main>

      <Footer
        onNavigateSection={handleNavigateSection}
        onGoHome={handleGoHome}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        promoCode={promoCode}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onApplyPromo={setPromoCode}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Non-blocking Add-to-Bag Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-40 max-w-sm bg-[#0E0E0E] text-[#F6F5F1] px-4 py-3 rounded-lg shadow-xl border border-[#F6F5F1]/15 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5 text-xs font-medium">
            <Check className="w-4 h-4 text-[#EAE6DD] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-xs font-semibold text-[#EAE6DD] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
