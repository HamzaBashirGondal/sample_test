import { BRAND_IMAGES, WHY_CHOOSE_PILLARS } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface BrandStorySectionProps {
  onShopCollection: () => void;
}

export function BrandStorySection({ onShopCollection }: BrandStorySectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#EAE6DD]/55 border-t border-[#0E0E0E]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* About Us Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 overflow-hidden rounded-xl bg-[#2A2B2A] min-h-[340px]">
            <ResilientImage
              src={BRAND_IMAGES.atelier}
              alt="Neatly folded stacks of KROFT heavyweight cotton fabrics in jet black, off-white, beige, vintage brown, and olive green inside our Los Angeles workshop"
              fallbackLabel="KROFT Los Angeles Textile Atelier"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#4A5240]">
                04. About KROFT
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0E] mt-2 leading-[1.1]"
              >
                Built in Los Angeles for the Modern Oversized Uniform.
              </h2>
              <p className="mt-5 text-base text-[#2A2B2A] leading-relaxed">
                KROFT started in 2021 with a simple frustration shared across Downtown LA studios:
                finding a genuinely baggy shirt that didn&apos;t require buying two sizes too big,
                suffering a sagging collar, or settling for flimsy 160 GSM fabric.
              </p>
              <p className="mt-4 text-base text-[#575755] leading-relaxed">
                We partner directly with California knitting mills to produce 300–340 GSM organic
                cotton jersey dyed exclusively in timeless architectural neutrals—Jet Black, Off
                White, Charcoal Grey, Beige, Vintage Brown, and Olive Green. Every pattern is graded
                specifically for men and women ages 18 to 30 who value clean urban proportions.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0E0E0E]/12 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8">
                <div>
                  <p className="font-display text-2xl font-bold text-[#0E0E0E] tabular-nums">
                    320+ GSM
                  </p>
                  <p className="text-xs text-[#575755] mt-0.5">Ring-spun jersey density</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#0E0E0E] tabular-nums">
                    48,000+
                  </p>
                  <p className="text-xs text-[#575755] mt-0.5">US orders shipped</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#0E0E0E] tabular-nums">
                    4.9 / 5.0
                  </p>
                  <p className="text-xs text-[#575755] mt-0.5">Average verified fit score</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onShopCollection}
                className="px-5 py-2.5 min-h-[42px] bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore All Cuts
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose Our Brand */}
        <div className="mt-16 pt-14 border-t border-[#0E0E0E]/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#5C4033]">
                05. Garment Engineering
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                Why Choose KROFT
              </h3>
            </div>
            <p className="text-sm text-[#575755] max-w-md">
              Four measurable construction standards separating our boxy silhouettes from standard
              blanks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#0E0E0E]/12 divide-y md:divide-y-0 md:divide-x divide-[#0E0E0E]/10">
            {WHY_CHOOSE_PILLARS.map((pillar) => (
              <div key={pillar.number} className="py-6 md:px-6 first:pl-0 last:pr-0">
                <p className="font-mono text-xs font-medium text-[#4A5240] tabular-nums">
                  {pillar.number}
                </p>
                <h4 className="font-display text-lg font-bold text-[#0E0E0E] mt-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[#575755] leading-relaxed mt-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
