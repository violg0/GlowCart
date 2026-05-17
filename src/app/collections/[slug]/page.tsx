import { notFound } from "next/navigation";
import Link from "next/link";
import { collectionService } from "@/services/collectionService";
import { productService }    from "@/services/productService";
import { categoryService }   from "@/services/categoryService";
import ProductCard            from "@/components/shop/ProductCard";
import Footer                 from "@/components/layout/Footer";

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return collectionService.getAll().map((c) => ({ slug: c.slug }));
}

// Paletas de acento por colección
const ACCENTS: Record<string, { bg: string; text: string; border: string; tag: string }> = {
  "angelic-silvery": { bg: "bg-slate-50",  text: "text-slate-400",  border: "border-slate-200", tag: "bg-blue-100 text-blue-600"  },
  "neapolitan":      { bg: "bg-amber-50",  text: "text-amber-500",  border: "border-amber-200", tag: "bg-amber-100 text-amber-700" },
  "vampire-goth":    { bg: "bg-zinc-900",  text: "text-red-400",    border: "border-zinc-700",  tag: "bg-red-900 text-red-300"    },
};

export default function CollectionPage({ params }: Props) {
  const collection = collectionService.getBySlug(params.slug);
  if (!collection) notFound();

  const products   = productService.getByCollection(params.slug);
  const accent     = ACCENTS[params.slug] ?? ACCENTS["angelic-silvery"];
  const isGoth     = params.slug === "vampire-goth";

  // Agrupar productos por categoría
  const byCategory = products.reduce<Record<string, typeof products>>((acc, p) => {
    acc[p.categorySlug] = acc[p.categorySlug] ?? [];
    acc[p.categorySlug].push(p);
    return acc;
  }, {});

  return (
    <div className={isGoth ? "bg-zinc-950 text-white" : "bg-cream text-ink"}>
      {/* Banner */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={collection.bannerImage} alt={collection.name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${isGoth ? "bg-gradient-to-t from-zinc-950/90 to-zinc-950/30" : "bg-gradient-to-t from-ink/70 to-transparent"}`} />
        <div className="absolute bottom-10 left-10 max-w-[600px]">
          <span className={`text-[9px] tracking-[3px] uppercase px-3 py-1 mb-4 inline-block ${accent.tag}`}>
            {collection.palette}
          </span>
          <h1 className="font-display text-[52px] font-light italic text-cream leading-tight mb-3">
            {collection.name}
          </h1>
          <p className={`text-[14px] leading-relaxed ${isGoth ? "text-zinc-300" : "text-cream/80"}`}>
            {collection.description}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-10 pt-10">
        <nav className={`flex items-center gap-2 text-[11px] tracking-[1px] uppercase mb-10 ${isGoth ? "text-zinc-500" : "text-ink-muted"}`}>
          <Link href="/" className="hover:text-rose-deep transition-colors">Inicio</Link>
          <span>›</span>
          <Link href="/#colecciones" className="hover:text-rose-deep transition-colors">Colecciones</Link>
          <span>›</span>
          <span>{collection.name}</span>
        </nav>

        {/* Todos los productos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-silver-mid border border-silver-mid mb-16">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="font-display text-2xl font-light italic text-ink-muted">Próximamente…</p>
          </div>
        )}

        <div className="mt-4 mb-16 text-center">
          <Link href="/#colecciones" className={`text-[11px] tracking-[2px] uppercase transition-colors hover:text-rose-deep ${isGoth ? "text-zinc-500" : "text-ink-muted"}`}>
            ← Ver todas las colecciones
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
