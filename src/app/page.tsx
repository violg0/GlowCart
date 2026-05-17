import Link from "next/link";
import { categoryService }  from "@/services/categoryService";
import { productService }   from "@/services/productService";
import { collectionService } from "@/services/collectionService";
import CategoryCard     from "@/components/shop/CategoryCard";
import ProductCard      from "@/components/shop/ProductCard";
import CollectionCard   from "@/components/shop/CollectionCard";
import HorizontalCarousel from "@/components/ui/HorizontalCarousel";
import Footer           from "@/components/layout/Footer";

export default function HomePage() {
  const categories   = categoryService.getAll();
  const bestSellers  = productService.getBestSellers();
  const newProducts  = productService.getNew();
  const collections  = collectionService.getAll();

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden bg-gradient-to-br from-[#fdf0f5] via-[#fdf6f0] to-[#f0eaf8]">
        <span className="absolute font-display text-[280px] font-light italic text-rose-mid/10 pointer-events-none select-none leading-none left-[-80px] bottom-[-40px]">✦</span>
        <span className="absolute font-display text-[280px] font-light italic text-rose-mid/10 pointer-events-none select-none leading-none right-[-80px] top-[-20px]">✦</span>

        <p className="text-[10px] tracking-[4px] uppercase text-rose-dark mb-6 animate-fade-up">
          Colecciones · Angelic · Neapolitan · Vampire Goth
        </p>
        <h1 className="font-display text-[clamp(48px,7vw,84px)] font-light leading-[1.05] text-ink mb-5 animate-fade-up">
          Accesorios<br />con <em className="text-rose-deep">identidad</em>
        </h1>
        <p className="text-[14px] text-ink-muted leading-relaxed max-w-[400px] mb-10 animate-fade-up">
          Cada pieza cuenta una historia. Explora nuestras colecciones y encuentra la tuya.
        </p>
        <div className="flex gap-4 animate-fade-up">
          <Link href="#best-sellers" className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-3.5 text-[11px] tracking-[2.5px] uppercase hover:bg-rose-deep transition-colors">
            Explorar ↓
          </Link>
          <Link href="#colecciones" className="inline-flex items-center gap-3 border border-ink text-ink px-8 py-3.5 text-[11px] tracking-[2.5px] uppercase hover:bg-rose hover:border-rose-dark transition-colors">
            Colecciones
          </Link>
        </div>

        <div className="absolute bottom-10 flex gap-12">
          {[["50+", "Productos"], ["3", "Colecciones"], ["7", "Categorías"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-[26px] font-light text-rose-deep">{n}</div>
              <div className="text-[10px] tracking-[2px] uppercase text-ink-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ────────────────────────────────────────────────── */}
      <HorizontalCarousel title="Conoce nuestros Best Sellers" subtitle="los más queridos de la colección" sectionId="best-sellers">
        {bestSellers.map((p) => (
          <ProductCard key={p.id} product={p} compact />
        ))}
      </HorizontalCarousel>

      {/* ── NUEVOS PRODUCTOS ────────────────────────────────────────────── */}
      <div className="bg-silver/40 py-2">
        <HorizontalCarousel title="Productos Nuevos" subtitle="recién llegados a la tienda">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </HorizontalCarousel>
      </div>

      {/* ── CATEGORÍAS ──────────────────────────────────────────────────── */}
      <section id="categorias" className="max-w-[1200px] mx-auto px-10 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-[34px] font-light text-ink mb-1">Categorías</h2>
          <p className="text-[11px] tracking-[2px] uppercase text-ink-muted">elige tu tipo de accesorio</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* ── COLECCIONES ─────────────────────────────────────────────────── */}
      <div className="bg-ink py-2">
        <HorizontalCarousel title="Explora nuestras Colecciones" subtitle="universos con identidad propia" sectionId="colecciones">
          {collections.map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </HorizontalCarousel>
      </div>

      <Footer />
    </>
  );
}
