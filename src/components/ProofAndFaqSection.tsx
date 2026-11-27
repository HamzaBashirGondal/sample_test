import { FormEvent, useState } from 'react';
import { Check, ChevronDown, Star } from 'lucide-react';
import { BRAND_FAQS, BRAND_TESTIMONIALS } from '../data/products';
import { FaqItem } from '../types/shop';

type FaqFilter = 'All' | FaqItem['category'];

const FAQ_CATEGORIES: FaqFilter[] = [
  'All',
  'Sizing & Fit',
  'Fabric & Care',
  'Shipping & Returns',
];

export function ProofAndFaqSection() {
  const [faqCategory, setFaqCategory] = useState<FaqFilter>('All');
  const [openFaqId, setOpenFaqId] = useState<string>(BRAND_FAQS[0].id);
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const visibleFaqs =
    faqCategory === 'All'
      ? BRAND_FAQS
      : BRAND_FAQS.filter((item) => item.category === faqCategory);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <>
      {/* Customer Testimonials & Reviews */}
      <section id="reviews" className="py-16 sm:py-24 bg-[#F6F5F1] border-t border-[#0E0E0E]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#0E0E0E]/10">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#4A5240]">
                06. Verified US Community
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                Worn Across Every City
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#0E0E0E] tabular-nums">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#0E0E0E] text-[#0E0E0E]" />
                ))}
              </div>
              <span className="font-semibold">4.9 Average</span>
              <span className="text-[#575755]">· 1,417 Verified Buyers</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BRAND_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between p-6 sm:p-7 bg-[#EAE6DD]/45 rounded-lg border border-[#0E0E0E]/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#575755]">
                    <span>{item.productPurchased}</span>
                    <span className="font-mono tabular-nums">Size {item.sizePurchased}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-3">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#0E0E0E] text-[#0E0E0E]" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm sm:text-[15px] text-[#0E0E0E] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <footer className="mt-6 pt-4 border-t border-[#0E0E0E]/10">
                  <p className="text-sm font-semibold text-[#0E0E0E]">
                    {item.name}, {item.age}
                  </p>
                  <p className="text-xs text-[#575755] mt-0.5">
                    {item.role} · {item.city}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-16 sm:py-20 bg-[#F6F5F1] border-t border-[#0E0E0E]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium tracking-wider uppercase text-[#5C4033]">
                07. Support &amp; Sizing
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-[#575755] leading-relaxed">
                Everything you need to know about our boxy drop-shoulder grading, cotton density,
                care instructions, and US shipping.
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFaqCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      faqCategory === cat
                        ? 'bg-[#0E0E0E] text-[#F6F5F1]'
                        : 'bg-[#EAE6DD]/70 text-[#2A2B2A] hover:bg-[#EAE6DD]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#0E0E0E]/12 border-y border-[#0E0E0E]/12">
              {visibleFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <div>
                        <span className="text-[11px] font-medium text-[#575755] block mb-1">
                          {faq.category}
                        </span>
                        <span className="text-base font-semibold text-[#0E0E0E] group-hover:text-[#4A5240] transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#2A2B2A] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-8 text-sm text-[#575755] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section id="newsletter" className="py-16 sm:py-20 bg-[#0E0E0E] text-[#F6F5F1]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wider uppercase text-[#D6CFC2]">
                Private Drop Access
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F6F5F1] mt-2"
              >
                Get 10% Off Your First Heavyweight Drop.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#D6CFC2] max-w-xl leading-relaxed">
                Join 32,000+ US subscribers for early access to limited mineral-wash colorways,
                restock alerts, and studio lookbooks.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribedEmail ? (
                <div className="p-5 rounded-lg bg-[#2A2B2A] border border-[#F6F5F1]/15">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F6F5F1]">
                    <Check className="w-4 h-4 text-[#EAE6DD]" />
                    <span>Subscribed ({subscribedEmail})</span>
                  </div>
                  <p className="text-xs text-[#D6CFC2] mt-2 leading-relaxed">
                    Use promo code{' '}
                    <span className="font-mono font-semibold text-[#F6F5F1]">KROFT10</span> in
                    your shopping bag for 10% off your first order.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (newsletterError) setNewsletterError('');
                      }}
                      placeholder="Enter your email address"
                      aria-label="Email address for newsletter"
                      className="flex-1 px-4 py-3 min-h-[44px] text-sm bg-[#2A2B2A] text-[#F6F5F1] placeholder:text-[#D6CFC2]/70 border border-[#F6F5F1]/20 rounded-md focus:outline-none focus:border-[#F6F5F1]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 min-h-[44px] bg-[#F6F5F1] text-[#0E0E0E] text-sm font-semibold rounded-md hover:bg-[#EAE6DD] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-xs text-[#EAE6DD]" role="alert">
                      {newsletterError}
                    </p>
                  )}
                  <p className="text-xs text-[#D6CFC2]/75">
                    Zero spam. Unsubscribe in one click at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
