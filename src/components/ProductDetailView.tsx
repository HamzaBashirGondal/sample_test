import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { SIZE_GUIDE_ROWS } from '../data/products';
import {
  ProductColorOption,
  ProductReview,
  ShirtProduct,
  ShirtSize,
} from '../types/shop';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface ProductDetailViewProps {
  product: ShirtProduct;
  initialColor?: ProductColorOption;
  relatedProducts: ShirtProduct[];
  onBack: () => void;
  onAddToCart: (
    product: ShirtProduct,
    color: ProductColorOption,
    size: ShirtSize,
    quantity: number
  ) => void;
  onSelectProduct: (product: ShirtProduct, selectedColor?: ProductColorOption) => void;
  onOpenCart: () => void;
}

export function ProductDetailView({
  product,
  initialColor,
  relatedProducts,
  onBack,
  onAddToCart,
  onSelectProduct,
  onOpenCart,
}: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColorOption>(
    initialColor || product.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<ShirtSize>('L');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Local interactive reviews state so users can also post a review
  const [customReviews, setCustomReviews] = useState<ProductReview[]>(product.reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      location: 'United States',
      verifiedSize: selectedSize,
      heightNote: 'Verified Buyer',
      rating: reviewRating,
      date: 'Nov 22, 2026',
      title: reviewTitle.trim() || 'Great heavyweight boxy fit',
      comment: reviewComment.trim(),
    };
    setCustomReviews((prev) => [newRev, ...prev]);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="bg-[#F6F5F1] pb-24 md:pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#0E0E0E]/10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2A2B2A] hover:text-[#0E0E0E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#575755]">
            <span>Collection</span>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#0E0E0E] font-medium">{product.name}</span>
          </div>
        </div>

        {/* Main PDP Two-Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Gallery Left */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#EAE6DD]">
              <ResilientImage
                src={selectedColor.image}
                alt={`${product.name} in ${selectedColor.name}`}
                fallbackLabel={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Alternate Color Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.colors.map((color) => {
                const isActive = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-lg bg-[#EAE6DD] border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#0E0E0E]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={color.image}
                      alt={`${product.name} ${color.name} thumbnail`}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-[#0E0E0E]/75 text-[#F6F5F1] text-[10px] font-medium py-1 px-1.5 truncate text-center">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Contiguous Purchase Module Right */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-2 text-xs text-[#575755]">
              <div className="flex items-center gap-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{product.gsm} GSM</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{product.sku}</span>
              </div>
              <span className="font-medium text-[#4A5240]">{product.stockNote}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0E] mt-2">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center justify-between gap-4 pb-5 border-b border-[#0E0E0E]/10">
              <div className="flex items-baseline gap-2.5 font-mono tabular-nums">
                <span className="text-2xl font-bold text-[#0E0E0E]">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#575755] line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <a
                href="#pdp-reviews"
                className="inline-flex items-center gap-1.5 text-sm text-[#0E0E0E] hover:underline tabular-nums"
              >
                <Star className="w-4 h-4 fill-[#0E0E0E] text-[#0E0E0E]" />
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-[#575755]">({customReviews.length} reviews)</span>
              </a>
            </div>

            <p className="mt-5 text-sm sm:text-base text-[#2A2B2A] leading-relaxed">
              {product.description}
            </p>
            <p className="mt-2 text-xs text-[#575755]">{product.modelNote}</p>

            {/* Color Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#0E0E0E]">Color</span>
                <span className="text-[#575755]">{selectedColor.name}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                {product.colors.map((color) => {
                  const active = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color.name}`}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'border-[#0E0E0E] bg-[#EAE6DD]/60 text-[#0E0E0E]'
                          : 'border-[#0E0E0E]/15 text-[#2A2B2A] hover:border-[#0E0E0E]/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-[#0E0E0E]/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection (S, M, L, XL, XXL) */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#0E0E0E]">
                  Size · <span className="font-normal text-[#575755]">{product.fit}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E0E0E] hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              <div className="mt-2.5 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={active}
                      className={`py-2.5 min-h-[44px] text-sm font-semibold rounded-md border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#0E0E0E] text-[#F6F5F1] border-[#0E0E0E]'
                          : 'bg-white text-[#0E0E0E] border-[#0E0E0E]/15 hover:border-[#0E0E0E]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expandable Size Guide Table */}
            {showSizeGuide && (
              <div className="mt-4 p-4 rounded-lg bg-[#EAE6DD]/60 border border-[#0E0E0E]/12">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-[#0E0E0E]">
                    Garment Measurements (Inches · Relaxed Boxy Cut)
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(false)}
                    aria-label="Close size guide"
                    className="text-[#575755] hover:text-[#0E0E0E] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left tabular-nums">
                    <thead>
                      <tr className="border-b border-[#0E0E0E]/15 text-[#575755]">
                        <th className="py-1.5 pr-2 font-medium">Size</th>
                        <th className="py-1.5 px-2 font-medium">Chest</th>
                        <th className="py-1.5 px-2 font-medium">Length</th>
                        <th className="py-1.5 px-2 font-medium">Shoulder</th>
                        <th className="py-1.5 pl-2 font-medium">Height</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0E0E0E]/10 text-[#0E0E0E]">
                      {SIZE_GUIDE_ROWS.map((row) => (
                        <tr key={row.size}>
                          <td className="py-1.5 pr-2 font-semibold">{row.size}</td>
                          <td className="py-1.5 px-2 font-mono">{row.chest}</td>
                          <td className="py-1.5 px-2 font-mono">{row.length}</td>
                          <td className="py-1.5 px-2 font-mono">{row.shoulder}</td>
                          <td className="py-1.5 pl-2 text-[#575755]">{row.recommendedHeight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex items-stretch gap-3">
              <div className="inline-flex items-center border border-[#0E0E0E]/20 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2.5 min-h-[46px] text-[#0E0E0E] hover:bg-[#EAE6DD]/60 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-mono font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="px-3 py-2.5 min-h-[46px] text-[#0E0E0E] hover:bg-[#EAE6DD]/60 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 px-6 py-3 min-h-[46px] text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  justAdded
                    ? 'bg-[#4A5240] text-[#F6F5F1]'
                    : 'bg-[#0E0E0E] text-[#F6F5F1] hover:bg-[#2A2B2A]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span className="tabular-nums">
                    Add to Bag — ${(product.price * quantity).toFixed(2)}
                  </span>
                )}
              </button>
            </div>

            {justAdded && (
              <button
                type="button"
                onClick={onOpenCart}
                className="mt-2.5 w-full py-2.5 text-xs font-semibold text-[#0E0E0E] border border-[#0E0E0E]/20 rounded-md hover:bg-[#EAE6DD]/60 transition-colors cursor-pointer"
              >
                Open Shopping Bag &amp; Checkout →
              </button>
            )}

            {/* Shipping & Guarantee Summary */}
            <div className="mt-6 pt-5 border-t border-[#0E0E0E]/10 space-y-2.5 text-xs text-[#2A2B2A]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#4A5240] shrink-0" />
                <span>Free US shipping over $120 · Same-day dispatch before 2 PM PST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#4A5240] shrink-0" />
                <span>30-day complimentary US size exchange &amp; returns</span>
              </div>
            </div>

            {/* Fabric & Construction Specs */}
            <div className="mt-6 pt-5 border-t border-[#0E0E0E]/10">
              <h2 className="text-sm font-semibold text-[#0E0E0E]">
                Fabric &amp; Construction Details
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[#575755]">
                {product.fabricDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-[#0E0E0E] mt-0.5">
                      —
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Customer Reviews */}
        <section id="pdp-reviews" className="mt-16 pt-12 border-t border-[#0E0E0E]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0E0E0E]">
                Verified Fit Reviews ({customReviews.length})
              </h2>
              <p className="text-sm text-[#575755] mt-1">
                Real sizing feedback from KROFT customers wearing {product.name}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="px-4 py-2.5 min-h-[40px] border border-[#0E0E0E]/20 rounded-md text-xs font-semibold text-[#0E0E0E] hover:bg-[#EAE6DD] transition-colors cursor-pointer self-start sm:self-auto"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="mt-6 p-6 rounded-lg bg-[#EAE6DD]/50 border border-[#0E0E0E]/12 max-w-2xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Jordan T."
                    className="w-full px-3 py-2 text-sm bg-white border border-[#0E0E0E]/15 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                    Rating
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#0E0E0E]/15 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                  >
                    <option value={5}>5 Stars — Perfect Fit</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Solid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="How does the drape and cotton feel?"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#0E0E0E]/15 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0E0E0E] mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your height, size ordered, and fit experience..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#0E0E0E]/15 rounded-md focus:outline-none focus:border-[#0E0E0E]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {customReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-lg bg-[#EAE6DD]/40 border border-[#0E0E0E]/10"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-[#575755]">
                  <span>
                    {rev.author} · {rev.location}
                  </span>
                  <span className="font-mono">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#0E0E0E] text-[#0E0E0E]" />
                  ))}
                  <span className="text-xs text-[#575755] ml-2">
                    Size {rev.verifiedSize} · {rev.heightNote}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#0E0E0E] mt-3">{rev.title}</h3>
                <p className="text-sm text-[#2A2B2A] mt-1.5 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Baggy Shirts */}
        <section className="mt-16 pt-12 border-t border-[#0E0E0E]/10">
          <h2 className="font-display text-2xl font-bold text-[#0E0E0E]">
            Complete the Rotation
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard
                key={`rel-${rel.id}`}
                product={rel}
                onSelectProduct={onSelectProduct}
                onQuickAdd={(p, c, s) => onAddToCart(p, c, s, 1)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (<= 10% viewport height) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F6F5F1]/95 backdrop-blur-sm border-t border-[#0E0E0E]/12 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#0E0E0E] truncate">{product.name}</p>
          <p className="text-xs text-[#575755] font-mono tabular-nums">
            ${product.price} · {selectedColor.name} · {selectedSize}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 min-h-[40px] bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold rounded-md whitespace-nowrap shrink-0 cursor-pointer"
        >
          {justAdded ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}
