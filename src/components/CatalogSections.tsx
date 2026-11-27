import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { COLOR_PALETTE, SHIRT_SIZES } from '../data/products';
import { ColorName, ProductColorOption, ShirtProduct, ShirtSize } from '../types/shop';
import { ProductCard } from './ProductCard';

interface CatalogSectionsProps {
  products: ShirtProduct[];
  onSelectProduct: (product: ShirtProduct, selectedColor?: ProductColorOption) => void;
  onQuickAdd: (product: ShirtProduct, color: ProductColorOption, size: ShirtSize) => void;
}

type CategoryFilter = 'All' | ShirtProduct['category'];
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'gsm';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Heavyweight Core',
  'Mineral Wash',
  'Boxy Solids',
  'Graphic Editions',
];

const COLOR_FILTERS: ColorName[] = [
  'Jet Black',
  'Off White',
  'Charcoal Grey',
  'Beige',
  'Vintage Brown',
  'Olive Green',
];

export function CatalogSections({
  products,
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedColor, setSelectedColor] = useState<ColorName | 'All'>('All');
  const [selectedSize, setSelectedSize] = useState<ShirtSize | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const newArrivals = useMemo(
    () => products.filter((p) => p.isNewArrival).slice(0, 4),
    [products]
  );

  const bestSellers = useMemo(
    () => products.filter((p) => p.isBestSeller).slice(0, 4),
    [products]
  );

  const filteredCollection = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (
        selectedColor !== 'All' &&
        !p.colors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }
      if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) return false;
      if (query) {
        const haystack =
          `${p.name} ${p.category} ${p.shortDescription} ${p.fit} ${p.colors
            .map((c) => c.name)
            .join(' ')}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'gsm':
        sorted.sort((a, b) => b.gsm - a.gsm);
        break;
      default:
        break;
    }
    return sorted;
  }, [products, searchQuery, selectedCategory, selectedColor, selectedSize, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedColor !== 'All' ||
    selectedSize !== 'All' ||
    sortBy !== 'featured';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setSortBy('featured');
  };

  return (
    <>
      {/* 1. New Arrivals */}
      <section id="new-arrivals" className="py-16 sm:py-20 bg-[#F6F5F1]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#0E0E0E]/10">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#4A5240]">
                01. Fall / Winter Release
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                New Arrivals
              </h2>
            </div>
            <p className="text-sm text-[#575755] max-w-md">
              Freshly milled 300–340 GSM boxy silhouettes cut in small Los Angeles batches.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Best Selling Products */}
      <section id="best-sellers" className="py-16 sm:py-20 bg-[#EAE6DD]/50 border-y border-[#0E0E0E]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#0E0E0E]/10">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#5C4033]">
                02. Most Requested Cuts
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                Best Selling Shirts
              </h2>
            </div>
            <p className="text-sm text-[#575755] max-w-md">
              Proven daily rotation staples rated 4.8+ across thousands of verified US customers.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestSellers.map((product) => (
              <ProductCard
                key={`best-${product.id}`}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Full Baggy Shirt Collection Explorer */}
      <section id="collection" className="py-16 sm:py-24 bg-[#F6F5F1]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#0E0E0E]/10">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#4A5240]">
                03. Complete Archive
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0E0E0E] mt-1">
                The Baggy Shirt Collection
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#575755] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shirts, GSM, colors..."
                  aria-label="Search baggy shirt collection"
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 min-h-[42px] text-sm bg-white border border-[#0E0E0E]/15 rounded-md text-[#0E0E0E] placeholder:text-[#575755] focus:outline-none focus:border-[#0E0E0E]"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#575755] shrink-0" />
                <select
                  aria-label="Sort collection"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3.5 py-2.5 min-h-[42px] text-sm font-medium bg-white border border-[#0E0E0E]/15 rounded-md text-[#0E0E0E] focus:outline-none focus:border-[#0E0E0E] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="gsm">Heaviest GSM</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Toolbar: Category Tabs, Color Swatches, Size Filter */}
          <div className="mt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-[#0E0E0E]/10">
            {/* Category Segmented Controls */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter by shirt category">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#0E0E0E] text-[#F6F5F1]'
                        : 'bg-[#EAE6DD]/70 text-[#2A2B2A] hover:bg-[#EAE6DD]'
                    }`}
                  >
                    {category === 'All' ? `All Silhouettes (${products.length})` : category}
                  </button>
                );
              })}
            </div>

            {/* Color & Size Filter Row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#575755]">Color:</span>
                <button
                  type="button"
                  onClick={() => setSelectedColor('All')}
                  className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedColor === 'All'
                      ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F6F5F1]'
                      : 'border-[#0E0E0E]/15 text-[#2A2B2A] hover:border-[#0E0E0E]/40'
                  }`}
                >
                  All
                </button>
                {COLOR_FILTERS.map((colorName) => {
                  const active = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() =>
                        setSelectedColor((prev) => (prev === colorName ? 'All' : colorName))
                      }
                      aria-label={`Filter by ${colorName}`}
                      aria-pressed={active}
                      title={colorName}
                      className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                        active
                          ? 'ring-2 ring-offset-2 ring-offset-[#F6F5F1] ring-[#0E0E0E] scale-110'
                          : 'border-[#0E0E0E]/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: COLOR_PALETTE[colorName] }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#575755] mr-1">Size:</span>
                <button
                  type="button"
                  onClick={() => setSelectedSize('All')}
                  className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSize === 'All'
                      ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F6F5F1]'
                      : 'border-[#0E0E0E]/15 text-[#2A2B2A] hover:border-[#0E0E0E]/40'
                  }`}
                >
                  All
                </button>
                {SHIRT_SIZES.map((sz) => {
                  const active = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize((prev) => (prev === sz ? 'All' : sz))}
                      className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F6F5F1]'
                          : 'border-[#0E0E0E]/15 text-[#2A2B2A] hover:border-[#0E0E0E]/40'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Count & Clear Filters */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#575755]">
            <p className="tabular-nums">
              Showing {filteredCollection.length} of {products.length} baggy shirt silhouettes
              {selectedColor !== 'All' ? ` · ${selectedColor}` : ''}
              {selectedSize !== 'All' ? ` · Size ${selectedSize}` : ''}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E0E0E] hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Collection Product Grid */}
          {filteredCollection.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
              {filteredCollection.map((product) => (
                <ProductCard
                  key={`col-${product.id}`}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 py-16 px-6 text-center bg-[#EAE6DD]/40 rounded-lg border border-[#0E0E0E]/10">
              <p className="font-display text-lg font-semibold text-[#0E0E0E]">
                No shirts match those exact filters
              </p>
              <p className="text-sm text-[#575755] mt-1.5 max-w-md mx-auto">
                Try clearing your color or search query to view all eight heavyweight KROFT cuts.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 px-5 py-2.5 min-h-[40px] bg-[#0E0E0E] text-[#F6F5F1] text-xs font-semibold rounded-md hover:bg-[#2A2B2A] transition-colors cursor-pointer"
              >
                Show All Shirts
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
