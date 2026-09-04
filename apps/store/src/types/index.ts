export type ProductCategory =
  | 'todos'
  | 'prendas'
  | 'regalos'
  | 'kits'
  | 'marroquineria';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  badge?: string;
  description: string;
  highlight: string;
  features: string[];
  materials: string;
  price: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  imageUrl: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  note?: string;
}

export interface OrderCheckout {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  notes?: string;
  items: CartItem[];
}
