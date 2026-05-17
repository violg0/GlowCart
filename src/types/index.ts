export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categorySlug: string;
  collectionSlug?: string;
  stock: number;
  badge?: "Nuevo" | "Limitado" | "Oferta" | "";
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  image?: string;
  description: string;
  productCount: number;
  featured?: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  coverImage: string;   // termina en -collection
  bannerImage: string;  // termina en -collection-pagina
  accentColor: string;  // clase tailwind para color de acento
  palette: string;      // descripción de paleta
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
