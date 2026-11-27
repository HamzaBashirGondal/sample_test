import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  onGoHome: () => void;
}

const NAV_LINKS = [
  { label: 'New Arrivals', target: 'new-arrivals' },
  { label: 'Best Sellers', target: 'best-sellers' },
  { label: 'Collection', target: 'collection' },
  { label: 'About', target: 'about' },
  { label: 'FAQ', target: 'faq' },
];

export function Header({
  cartCount,
  onOpenCart,
  onNavigateSection,
  onGoHome,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(target);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F5F1]/95 backdrop-blur-sm border-b border-[#0E0E0E]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onGoHome();
          }}
          className="font-display text-xl font-extrabold tracking-[0.14em] text-[#0E0E0E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E0E0E]"
        >
          KROFT
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => handleLinkClick(item.target)}
              className="text-sm font-medium text-[#2A2B2A] hover:text-[#0E0E0E] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E0E0E]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu trigger only on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} items`}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold tracking-wide rounded-md hover:bg-[#2A2B2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E0E0E]"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
            <span>Bag</span>
            <span className="font-mono tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#0E0E0E] border border-[#0E0E0E]/15 rounded-md hover:bg-[#EAE6DD] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#0E0E0E]/10 bg-[#F6F5F1] px-4 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="w-full text-left px-3 py-3 text-base font-medium text-[#0E0E0E] hover:bg-[#EAE6DD] rounded-md transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
