import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const productService = {

  // Funciones de lectura
  getAll: async (page = 1, limit = 20): Promise<{ data: Product[]; meta: any }> => {
    const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`, { cache: 'no-store' });
    const data = await res.json();
    return data; // Devuelve { data, meta } para el Admin
  },

  getByCategory: async (slug: string): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products?category=${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || []; // Abre la caja paginada del backend
  },

  getByCollection: async (slug: string): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products?collection=${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || []; // Abre la caja paginada del backend
  },

  getBestSellers: async (): Promise<Product[]> => {
    const { data: products } = await productService.getAll(1, 100);
    return (products || []).filter((p) => p.isBestSeller);
  },

  getNew: async (): Promise<Product[]> => {
    const { data: products } = await productService.getAll(1, 100);
    return (products || []).filter((p) => p.isNew);
  },

  getById: async (id: string): Promise<Product | undefined> => {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    const data = await res.json();
    // Si tu backend también paginó/envolvió las búsquedas por ID individuales, cambia la línea de abajo por: return data.data;
    return data; 
  },

  // Funciones de escritura (admin)
  create: async (product: Omit<Product, "id">, token: string): Promise<Product> => {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error al crear el producto");
    return res.json();
  },

  edit: async (id: string, product: Partial<Omit<Product, "id">>, token: string): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error al editar el producto");
    return res.json();
  },

  // Delete solo para superadmin
  delete: async (id: string, token: string): Promise<void> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");
  },
};