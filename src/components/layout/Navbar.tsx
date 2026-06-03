"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "@/hooks/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-rose-mid h-[60px] flex items-center justify-between px-6 md:px-10">
        {/* Hamburguesa — solo móvil */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menú"
          >
            <span className={`block w-5 h-px bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
          
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-light tracking-[3px] text-ink flex items-center gap-2">
          ✦ <em className="text-rose-deep not-italic">Glow</em> Cart
        </Link>

        {/* Links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#categorias"  className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Categorías</Link>
          <Link href="/#colecciones" className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Colecciones</Link>
          <Link href="/admin"        className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors">Admin</Link>
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <button onClick={openCart} aria-label="Abrir carrito" className="relative text-ink-light hover:text-rose-deep transition-colors">
            <span className="text-xl">🛍️</span>
            {cart.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-deep text-white rounded-full w-[17px] h-[17px] text-[10px] flex items-center justify-center font-medium">
                {cart.itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-rose-mid md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/#categorias"  onClick={() => setMenuOpen(false)} className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors py-2 border-b border-silver-mid">Categorías</Link>
            <Link href="/#colecciones" onClick={() => setMenuOpen(false)} className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors py-2 border-b border-silver-mid">Colecciones</Link>
            <Link href="/admin"        onClick={() => setMenuOpen(false)} className="text-[11px] tracking-[2px] uppercase text-ink-light hover:text-rose-deep transition-colors py-2">Admin</Link>
          </div>
        </div>
      )}
    </>
  );
}