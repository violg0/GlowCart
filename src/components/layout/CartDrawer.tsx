"use client";

import { useCartContext } from "@/hooks/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity } = useCartContext();

  return (
    <>
      <div onClick={closeCart} className={`fixed inset-0 bg-ink/40 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      <aside className={`fixed right-0 top-0 bottom-0 w-[400px] max-w-full bg-cream z-[70] flex flex-col border-l border-rose-mid transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-rose-mid">
          <h2 className="font-display text-2xl font-light">Tu carrito</h2>
          <button onClick={closeCart} className="text-ink-muted hover:text-rose-deep transition-colors text-xl">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">🛍️</span>
              <p className="font-display text-xl font-light italic text-ink-muted">Tu carrito está vacío ✦</p>
              <button onClick={closeCart} className="text-[11px] tracking-[2px] uppercase text-rose-deep hover:underline mt-2">Seguir explorando</button>
            </div>
          ) : (
            <div>
              {cart.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-5 border-b border-silver-mid">
                  {/* Imagen */}
                  <div className="w-[72px] h-[72px] bg-silver border border-silver-mid flex-shrink-0 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-ink leading-snug mb-1 truncate font-medium">{product.name}</p>
                    <p className="font-display text-[17px] font-light text-rose-deep">${product.price.toLocaleString()}</p>

                    {/* Qty */}
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-6 h-6 border border-silver-mid flex items-center justify-center text-ink-light hover:bg-rose hover:border-rose-dark transition-colors text-sm">−</button>
                      <span className="text-[13px] text-ink min-w-[20px] text-center">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-6 h-6 border border-silver-mid flex items-center justify-center text-ink-light hover:bg-rose hover:border-rose-dark transition-colors text-sm">+</button>
                      <span className="text-[11px] text-ink-muted ml-2">= ${(product.price * quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button onClick={() => removeItem(product.id)} className="text-silver-dark hover:text-rose-deep transition-colors self-start pt-1 text-lg">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con resumen */}
        {cart.items.length > 0 && (
          <div className="px-7 py-6 border-t border-rose-mid bg-silver/40">
            <div className="flex justify-between text-[12px] text-ink-muted mb-2">
              <span>{cart.itemCount} producto{cart.itemCount !== 1 ? "s" : ""}</span>
              <span>${cart.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[12px] text-ink-muted mb-2">
              <span>Envío</span>
              <span>Se calcula al pagar</span>
            </div>
            <div className="h-px bg-rose-mid my-3" />
            <div className="flex justify-between font-display text-2xl font-light mb-5">
              <span>Total</span>
              <span className="text-rose-deep">${cart.total.toLocaleString()}</span>
            </div>
            <button className="w-full py-4 bg-rose-deep text-white text-[11px] tracking-[2.5px] uppercase hover:bg-ink transition-colors mb-3">
              Proceder al pago
            </button>
            <button onClick={closeCart} className="w-full py-2 text-[11px] tracking-[1.5px] uppercase text-ink-muted hover:text-rose-deep transition-colors">
              Seguir comprando
            </button>

            {/* Info adicional */}
            <div className="mt-4 pt-4 border-t border-silver-mid grid grid-cols-3 gap-2 text-center">
              {[["🔒", "Pago seguro"], ["📦", "Envío cuidadoso"], ["↩️", "Devoluciones"]].map(([icon, label]) => (
                <div key={label} className="text-[10px] text-ink-muted">
                  <div className="text-base mb-1">{icon}</div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
