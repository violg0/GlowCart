"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useCart } from "@/hooks/useCart";
import { Cart, Product } from "@/types";

interface CartContextValue {
  cart: Cart;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartContext.Provider value={{ ...cartHook, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext debe usarse dentro de CartProvider");
  return ctx;
}
