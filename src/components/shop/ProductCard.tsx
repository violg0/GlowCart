"use client";

import { Product } from "@/types";
import { useCartContext } from "@/hooks/CartContext";

interface Props {
  product: Product;
  compact?: boolean; // para carrusel
}

export default function ProductCard({ product, compact = false }: Props) {
  const { addItem } = useCartContext();

  return (
    <article
      className={`group bg-white flex flex-col hover:bg-blush transition-colors duration-150 border border-silver-mid flex-shrink-0 ${compact ? "w-[220px]" : "w-full"}`}
      style={compact ? { scrollSnapAlign: "start" } : {}}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-silver" style={{ aspectRatio: "1" }}>
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-rose-deep text-white text-[9px] tracking-[1.5px] uppercase px-2 py-1">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[13px] text-ink leading-snug mb-1 font-medium">{product.name}</h3>
        {!compact && <p className="text-[11px] text-ink-muted mb-3 leading-relaxed line-clamp-2">{product.description}</p>}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-display text-[19px] text-rose-deep font-light">
            ₩{product.price.toLocaleString()}
          </span>
          <button
            onClick={() => addItem(product)}
            className="border border-rose-dark text-rose-deep text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 hover:bg-rose-deep hover:text-white hover:border-rose-deep transition-all duration-200"
          >
            + Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
