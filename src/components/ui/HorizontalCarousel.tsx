"use client";

import { useRef, ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  sectionId?: string;
}

export default function HorizontalCarousel({ title, subtitle, children, sectionId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section id={sectionId} className="py-16 max-w-[1200px] mx-auto px-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-[30px] font-light text-ink">{title}</h2>
          {subtitle && <p className="text-[11px] tracking-[2px] uppercase text-ink-muted mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 border border-silver-mid flex items-center justify-center text-ink-muted hover:border-rose-dark hover:bg-rose hover:text-rose-deep transition-all"
          >←</button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 border border-silver-mid flex items-center justify-center text-ink-muted hover:border-rose-dark hover:bg-rose hover:text-rose-deep transition-all"
          >→</button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>
    </section>
  );
}
