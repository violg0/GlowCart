import Link from "next/link";
import { Collection } from "@/types";

interface Props {
  collection: Collection;
}

export default function CollectionCard({ collection }: Props) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative overflow-hidden flex-shrink-0 w-[340px] h-[420px] block"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Imagen de portada */}
      <img
        src={collection.coverImage}
        alt={collection.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="text-[9px] tracking-[3px] uppercase text-mauve mb-2">{collection.palette}</p>
        <h3 className="font-display text-[24px] font-light italic text-cream mb-2 leading-tight">{collection.name}</h3>
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[2px] uppercase text-cream/70 group-hover:text-mauve transition-colors">
          Explorar <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
