import { Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onGoHome: () => void;
}

export function Footer({ onNavigateSection, onGoHome }: FooterProps) {
  return (
    <footer className="bg-[#F6F5F1] border-t border-[#0E0E0E]/12 text-[#0E0E0E]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#0E0E0E]/10">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={onGoHome}
              className="font-display text-2xl font-extrabold tracking-[0.14em] text-[#0E0E0E] cursor-pointer"
            >
              KROFT
            </button>
            <p className="mt-3 text-sm text-[#575755] max-w-sm leading-relaxed">
              Los Angeles heavyweight streetwear atelier crafting 300–340 GSM oversized baggy
              shirts in timeless earth and monochrome palettes.
            </p>
            <p className="mt-3 text-xs text-[#575755]">
              742 Mateo St, Arts District, Los Angeles, CA 90021
            </p>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-[#575755]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('new-arrivals')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('best-sellers')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('collection')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  Full Collection
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
              Brand
            </h3>
            <ul className="space-y-2 text-sm text-[#575755]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  About KROFT
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-[#0E0E0E] cursor-pointer"
                >
                  Sizing &amp; FAQ
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
              Connect
            </h3>
            <p className="text-sm text-[#575755]">support@kroftgarments.com</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="KROFT on Instagram"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#0E0E0E]/15 text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F6F5F1] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="KROFT on TikTok"
                className="px-3 h-10 inline-flex items-center justify-center rounded-md border border-[#0E0E0E]/15 text-xs font-semibold text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F6F5F1] transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="KROFT on X"
                className="px-3 h-10 inline-flex items-center justify-center rounded-md border border-[#0E0E0E]/15 text-xs font-semibold text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F6F5F1] transition-colors"
              >
                X
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="KROFT on YouTube"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#0E0E0E]/15 text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F6F5F1] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#575755]">
          <p>© {new Date().getFullYear()} KROFT Garments LLC. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Free US Returns · 30 Days</span>
            <span>·</span>
            <span>Los Angeles, California</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
