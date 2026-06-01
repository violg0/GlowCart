import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const adminService = {
  async createProduct(token: string, data: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Error al crear producto");
    }
    return res.json();
  },

  async updateProduct(token: string, id: string, data: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Error al editar producto");
    }
    return res.json();
  },

  async deleteProduct(token: string, id: string): Promise<void> {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Error al eliminar producto");
    }
  },

  async registerAdmin(token: string, email: string, password: string, role: "superadmin" | "admin"): Promise<void> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Error al registrar admin");
  }
},
};
