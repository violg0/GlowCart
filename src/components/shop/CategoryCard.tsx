import Link from "next/link";
import { Category } from "@/types";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white border border-silver-mid flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(141,74,97,0.12)] hover:border-rose-mid transition-all duration-200 relative overflow-hidden"
    >
      {/* Accent bar */}
      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-deep scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left z-10" />

      {/* Image */}
      <div className="w-full h-48 overflow-hidden bg-silver flex items-center justify-center">
        {category.image ? (
          <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <span className="text-5xl">{category.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-[18px] font-normal text-ink mb-1">{category.name}</h3>
        <p className="text-[11px] text-ink-muted leading-relaxed mb-2">{category.description}</p>
        <span className="text-[10px] tracking-[1.5px] uppercase text-rose-deep inline-flex items-center gap-1">
          {category.productCount} piezas
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
