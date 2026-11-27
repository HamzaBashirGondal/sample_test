export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ColorName =
  | 'Jet Black'
  | 'Off White'
  | 'Charcoal Grey'
  | 'Beige'
  | 'Vintage Brown'
  | 'Olive Green';

export interface ProductColorOption {
  name: ColorName;
  hex: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  verifiedSize: ShirtSize;
  heightNote: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface ShirtProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: 'Boxy Solids' | 'Graphic Editions' | 'Heavyweight Core' | 'Mineral Wash';
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  gsm: number;
  fit: 'Boxy Oversized' | 'Drop-Shoulder Wide' | 'Relaxed Architectural';
  shortDescription: string;
  description: string;
  fabricDetails: string[];
  modelNote: string;
  image: string;
  colors: ProductColorOption[];
  sizes: ShirtSize[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  stockNote: string;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // product.id + '-' + color.name + '-' + size
  productId: string;
  name: string;
  price: number;
  image: string;
  color: ProductColorOption;
  size: ShirtSize;
  quantity: number;
  gsm: number;
}

export interface BrandTestimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  productPurchased: string;
  sizePurchased: ShirtSize;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Sizing & Fit' | 'Fabric & Care' | 'Shipping & Returns';
}

export interface SizeMeasurement {
  size: ShirtSize;
  chest: string;
  length: string;
  shoulder: string;
  sleeve: string;
  recommendedHeight: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  placedAt: string;
  customerName: string;
  email: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
}

export type AppView = 'home' | 'product' | 'checkout';
