import { useState } from 'react';
import { Star } from 'lucide-react';
import { ProductColorOption, ShirtProduct, ShirtSize } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: ShirtProduct;
  onSelectProduct: (product: ShirtProduct, selectedColor?: ProductColorOption) => void;
  onQuickAdd: (product: ShirtProduct, color: ProductColorOption, size: ShirtSize) => void;
}

export function ProductCard({
  product,
  onSelectProduct,
  onQuickAdd,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColorOption>(product.colors[0]);
  const [addedSize, setAddedSize] = useState<ShirtSize | null>(null);

  const handleQuickSizeClick = (size: ShirtSize) => {
    onQuickAdd(product, selectedColor, size);
    setAddedSize(size);
    window.setTimeout(() => setAddedSize(null), 1100);
  };

  return (
    <article className="group flex flex-col">
      {/* 3:4 Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#EAE6DD]">
        <button
          type="button"
          onClick={() => onSelectProduct(product, selectedColor)}
          aria-label={`View ${product.name}`}
          className="block w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E0E0E]"
        >
          <ResilientImage
            src={selectedColor.image}
            alt={`${product.name} in ${selectedColor.name}`}
            fallbackLabel={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {/* Single subtle text tag (never badge clusters) */}
        <span className="pointer-events-none absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase text-[#0E0E0E] bg-[#F6F5F1]/90 px-2.5 py-1 rounded">
          {product.isNewArrival ? 'New Arrival' : product.isBestSeller ? 'Best Seller' : product.stockNote}
        </span>

        {/* Quick-Add Size Overlay on Desktop Hover */}
        <div className="hidden md:block absolute inset-x-3 bottom-3 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out bg-[#F6F5F1]/95 backdrop-blur-sm rounded-md p-2.5 border border-[#0E0E0E]/10">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-medium text-[#2A2B2A]">
              {addedSize ? `Added ${addedSize} to Bag` : 'Quick Add Size'}
            </span>
            <span className="text-[11px] text-[#575755]">{selectedColor.name}</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleQuickSizeClick(size)}
                className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
                  addedSize === size
                    ? 'bg-[#4A5240] text-[#F6F5F1]'
                    : 'bg-[#EAE6DD]/70 text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F6F5F1]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consistent Card Metadata Order */}
      <div className="mt-3.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 text-xs text-[#575755]">
          <div className="flex items-center gap-1.5 truncate">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{product.gsm} GSM</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 tabular-nums text-[#0E0E0E]">
            <Star className="w-3.5 h-3.5 fill-[#0E0E0E] text-[#0E0E0E]" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-[#575755]">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectProduct(product, selectedColor)}
            className="text-left text-base font-semibold text-[#0E0E0E] hover:underline underline-offset-4 cursor-pointer"
          >
            {product.name}
          </button>
          <div className="flex items-baseline gap-1.5 shrink-0 font-mono tabular-nums">
            <span className="text-[15px] font-semibold text-[#0E0E0E]">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#575755] line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
        </div>

        <p className="mt-1.5 text-sm text-[#575755] leading-snug line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Color Swatch Selector + Mobile Quick View */}
        <div className="mt-3 pt-2.5 border-t border-[#0E0E0E]/8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2" role="group" aria-label={`Colors for ${product.name}`}>
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={isSelected}
                  title={color.name}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-offset-[#F6F5F1] ring-[#0E0E0E] scale-105'
                      : 'border-[#0E0E0E]/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
            <span className="text-xs text-[#575755] ml-1 truncate">
              {selectedColor.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct(product, selectedColor)}
            className="text-xs font-semibold text-[#0E0E0E] hover:text-[#4A5240] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Select Size →
          </button>
        </div>
      </div>
    </article>
  );
}
