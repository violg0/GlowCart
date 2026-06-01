"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "@/hooks/CartContext";
import ProductCard from "@/components/shop/ProductCard";
import Footer from "@/components/layout/Footer";
import { Product, Collection } from "@/types";

interface Props {
  product: Product;
  collection: Collection | null;
  similar: Product[];
}

export default function ProductDetail({ product, collection, similar }: Props) {
  const { addItem, openCart } = useCartContext();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const inStock = product.stock > 0;

  return (
    <>
      {/* ── LACE BACKGROUND PATTERN ──────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238d4a61' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-10 pt-8 pb-0">
          <nav className="flex items-center gap-2 text-[10px] tracking-[1.5px] uppercase text-ink-muted">
            <Link href="/" className="hover:text-rose-deep transition-colors">Inicio</Link>
            <span className="text-rose-mid">✦</span>
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-rose-deep transition-colors capitalize">
              {product.categorySlug}
            </Link>
            <span className="text-rose-mid">✦</span>
            <span className="text-ink truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* ── MAIN LAYOUT ─────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 items-start">

          {/* ── IMAGEN ─────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Marco decorativo tipo encaje */}
            <div className="absolute -inset-3 border border-rose-mid/30 pointer-events-none z-10" />
            <div className="absolute -inset-1.5 border border-rose-mid/20 pointer-events-none z-10" />

            {product.badge && (
              <span className="absolute top-4 left-4 z-20 bg-rose-deep text-white text-[9px] tracking-[2px] uppercase px-3 py-1.5 font-body">
                {product.badge}
              </span>
            )}

            <div
              className="w-full overflow-hidden bg-gradient-to-br from-[#fdf0f5] via-[#fdf6f0] to-[#f0eaf8]"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Decoración esquina */}
            <span className="absolute -bottom-3 -right-3 font-display text-[60px] font-light italic text-rose-mid/20 pointer-events-none select-none leading-none">
              ✦
            </span>
            <span className="absolute -top-3 -left-3 font-display text-[40px] font-light italic text-rose-mid/20 pointer-events-none select-none leading-none">
              ✦
            </span>

            {/* Tags */}
            <div className="flex gap-2 mt-6">
              {product.isBestSeller && (
                <span className="bg-amber-50 border border-amber-200 text-amber-600 text-[9px] tracking-[1.5px] uppercase px-3 py-1.5">
                  ★ Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="bg-rose/40 border border-rose-mid text-rose-deep text-[9px] tracking-[1.5px] uppercase px-3 py-1.5">
                  Nuevo
                </span>
              )}
              <span className={`text-[9px] tracking-[1.5px] uppercase px-3 py-1.5 border ${inStock ? "bg-green-50 border-green-200 text-green-600" : "bg-silver border-silver-mid text-ink-muted"}`}>
                {inStock ? `${product.stock} disponibles` : "Agotado"}
              </span>
            </div>
          </div>

          {/* ── INFO DERECHA ────────────────────────────────────────────── */}
          <div className="flex flex-col lg:sticky lg:top-[80px]">

            {/* Colección badge */}
            {collection && (
              <Link href={`/collections/${collection.slug}`} className="self-start mb-5">
                <span className="text-[9px] tracking-[3px] uppercase text-rose-deep border border-rose-mid px-3 py-1.5 hover:bg-rose transition-colors font-body">
                  ✦ Colección {collection.name}
                </span>
              </Link>
            )}

            {/* Nombre */}
            <h1 className="font-display text-[clamp(26px,4vw,40px)] font-light leading-[1.1] text-ink mb-3 italic">
              {product.name}
            </h1>

            {/* Separador decorativo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid to-transparent" />
              <span className="text-rose-mid text-xs tracking-widest">✦ ✦ ✦</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid to-transparent" />
            </div>

            {/* Precio */}
            <div className="mb-6">
              <span className="font-display text-[35px] font-light text-rose-deep leading-none">
                ₩{product.price.toLocaleString()}
              </span>
              <p className="text-[10px] text-ink-muted mt-1.5 tracking-[1px] uppercase">
                Envío calculado al finalizar la compra
              </p>
            </div>

            {/* Descripción */}
            <div className="mb-4 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-rose-mid text-xs">✦</span>
                <p className="text-[9px] tracking-[2.5px] uppercase text-ink-muted">Descripción</p>
              </div>
              <p className="text-[13px] text-ink leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <p className="text-[9px] tracking-[2.5px] uppercase text-ink-muted mb-3">Cantidad</p>
              <div className="flex items-center gap-0 self-start border border-rose-mid/50">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-11 h-11 flex items-center justify-center text-ink-muted hover:bg-rose hover:text-rose-deep transition-colors disabled:opacity-30 border-r border-rose-mid/30 text-lg"
                >
                  −
                </button>
                <span className="w-14 text-center font-display text-[22px] font-light text-ink">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  disabled={qty >= product.stock}
                  className="w-11 h-11 flex items-center justify-center text-ink-muted hover:bg-rose hover:text-rose-deep transition-colors disabled:opacity-30 border-l border-rose-mid/30 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón añadir */}
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`w-full py-4 text-[11px] tracking-[3px] uppercase transition-all duration-300 mb-3 font-body ${
                added
                  ? "bg-green-600 text-white"
                  : inStock
                  ? "bg-rose-deep text-white hover:bg-ink"
                  : "bg-silver text-ink-muted cursor-not-allowed"
              }`}
            >
              {added
                ? "✓ Añadido al carrito"
                : inStock
                ? `Añadir al carrito · ₩${(product.price * qty).toLocaleString()}`
                : "Sin stock"}
            </button>

            

            {/* Card de colección */}
            {collection && (
              <div className="mt-6 p-5 border border-rose-mid/40 bg-gradient-to-br from-[#fdf0f5]/80 to-transparent relative overflow-hidden">
                {/* Encaje decorativo esquina */}
                <span className="absolute top-2 right-3 font-display text-[50px] font-light italic text-rose-mid/10 pointer-events-none select-none leading-none">✦</span>
                <p className="text-[9px] tracking-[2.5px] uppercase text-rose-deep mb-2">✦ Parte de la colección</p>
                <p className="font-display text-[20px] font-light italic text-ink mb-1">{collection.name}</p>
                <p className="text-[11px] text-ink-muted leading-relaxed mb-3">{collection.description}</p>
                <Link href={`/collections/${collection.slug}`} className="text-[10px] tracking-[2px] uppercase text-rose-deep hover:underline inline-flex items-center gap-1">
                  Ver toda la colección →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── SEPARADOR DECORATIVO ────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-10 py-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid/40 to-transparent" />
            <span className="text-rose-mid/50 tracking-[8px] text-xs">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid/40 to-transparent" />
          </div>
        </div>

        {/* ── PRODUCTOS SIMILARES ─────────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-10 py-14">
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[3px] uppercase text-rose-dark mb-2">descubre más</p>
              <h2 className="font-display text-[30px] font-light italic text-ink">
                También te puede gustar
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-silver-mid border border-silver-mid">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/categories/${product.categorySlug}`}
                className="inline-flex items-center gap-2 text-[10px] tracking-[2.5px] uppercase text-ink-muted hover:text-rose-deep transition-colors border border-silver-mid px-8 py-3 hover:border-rose-mid"
              >
                Ver todos en {product.categorySlug} →
              </Link>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}