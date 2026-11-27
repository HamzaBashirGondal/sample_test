import { ArrowRight } from 'lucide-react';
import { BRAND_IMAGES } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onShopCollection: () => void;
  onExploreNewArrivals: () => void;
}

const HERO_SPECS = [
  { label: 'Fabric Weight', value: '300–340 GSM' },
  { label: 'Pattern Block', value: 'Los Angeles Boxy Cut' },
  { label: 'Size Range', value: 'S · M · L · XL · XXL' },
  { label: 'US Delivery', value: 'Free Express Over $120' },
];

export function HeroSection({
  onShopCollection,
  onExploreNewArrivals,
}: HeroSectionProps) {
  return (
    <section id="top" className="bg-[#F6F5F1]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-xl bg-[#2A2B2A] min-h-[520px] lg:min-h-[640px] flex items-end">
          <ResilientImage
            src={BRAND_IMAGES.hero}
            alt="Male and female streetwear models wearing KROFT heavyweight oversized baggy shirts in jet black and off-white inside a Los Angeles concrete loft"
            fallbackLabel="KROFT Autumn Lookbook"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Measured multi-stop scrim guaranteeing >4.5:1 contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-[#0E0E0E]/45 to-[#0E0E0E]/15"
          />

          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium tracking-wider text-[#EAE6DD] mb-3">
                Los Angeles Heavyweight Studio · Fall / Winter Drop
              </p>
              <h1
                style={{ textWrap: 'balance' }}
                className="font-display text-[clamp(2.35rem,4.6vw,4.25rem)] font-bold leading-[1.03] tracking-tight text-[#F6F5F1]"
              >
                Heavyweight Drape. Built Oversized.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#EAE6DD] leading-relaxed max-w-xl">
                Small-batch 300–340 GSM ring-spun baggy shirts engineered for clean shoulder
                drops, structured collars, and effortless everyday US streetwear.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onShopCollection}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[44px] bg-[#F6F5F1] text-[#0E0E0E] text-sm font-semibold rounded-md hover:bg-[#EAE6DD] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F5F1]"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onExploreNewArrivals}
                  className="inline-flex items-center gap-2 px-5 py-3.5 min-h-[44px] border border-[#F6F5F1]/40 text-[#F6F5F1] text-sm font-medium rounded-md hover:bg-[#F6F5F1]/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F5F1]"
                >
                  <span>View New Arrivals</span>
                </button>
              </div>
            </div>

            <div className="hidden lg:block text-right text-[#EAE6DD] shrink-0">
              <p className="text-xs tracking-wider text-[#D6CFC2]">Featured Silhouette</p>
              <p className="text-sm font-semibold text-[#F6F5F1] mt-1">
                Jet Black &amp; Off White Boxy Uniform
              </p>
              <p className="font-mono text-xs tabular-nums text-[#D6CFC2] mt-1">
                From $64.00 USD
              </p>
            </div>
          </div>
        </div>

        {/* Full-width 4-column craft specification strip below hero */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#0E0E0E]/10 divide-y lg:divide-y-0 lg:divide-x divide-[#0E0E0E]/10 mt-4">
          {HERO_SPECS.map((spec) => (
            <div key={spec.label} className="py-4 px-2 sm:px-5 first:pl-0">
              <p className="text-xs text-[#575755]">{spec.label}</p>
              <p className="text-sm font-semibold text-[#0E0E0E] mt-0.5 tabular-nums">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
