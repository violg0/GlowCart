"use client";

import Link from "next/link";
import { useCartContext } from "@/hooks/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCartContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-rose-mid h-[60px] flex items-center justify-between px-10">
      <Link href="/" className="font-display text-xl font-light tracking-[3px] text-ink flex items-center gap-2">
        ✦ <em className="text-rose-deep not-italic">Glow</em> Cart
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/#categorias"   className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Categorías</Link>
        <Link href="/#colecciones"  className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Colecciones</Link>
        <Link href="/admin"         className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Admin</Link>
      </div>

      <button onClick={openCart} aria-label="Abrir carrito" className="relative text-ink-light hover:text-rose-deep transition-colors">
        <span className="text-xl">🛍️</span>
        {cart.itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-rose-deep text-white rounded-full w-[17px] h-[17px] text-[10px] flex items-center justify-center font-medium">
            {cart.itemCount}
          </span>
        )}
      </button>
    </nav>
  );
}
