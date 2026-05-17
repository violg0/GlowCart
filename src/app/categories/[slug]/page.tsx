import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryService } from "@/services/categoryService";
import { productService }  from "@/services/productService";
import ProductCard         from "@/components/shop/ProductCard";
import Footer              from "@/components/layout/Footer";

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return categoryService.getAll().map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: Props) {
  const category = categoryService.getBySlug(params.slug);
  if (!category) notFound();

  const products = productService.getByCategory(params.slug);

  return (
    <>
      {/* Banner de categoría */}
      <div className="relative h-[260px] overflow-hidden">
        {category.image ? (
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-rose flex items-center justify-center text-7xl">{category.emoji}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="absolute bottom-8 left-10">
          <p className="text-[10px] tracking-[3px] uppercase text-mauve mb-2">{products.length} piezas disponibles</p>
          <h1 className="font-display text-[42px] font-light italic text-cream">{category.name}</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-ink-muted mb-8">
          <Link href="/" className="hover:text-rose-deep transition-colors">Inicio</Link>
          <span className="text-rose-dark">›</span>
          <Link href="/#categorias" className="hover:text-rose-deep transition-colors">Categorías</Link>
          <span className="text-rose-dark">›</span>
          <span>{category.name}</span>
        </nav>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-5xl">🛠️</span>
            <p className="font-display text-2xl font-light italic text-ink-muted">Próximamente…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-silver-mid border border-silver-mid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/#categorias" className="text-[11px] tracking-[2px] uppercase text-ink-muted hover:text-rose-deep transition-colors">
            ← Volver a categorías
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
