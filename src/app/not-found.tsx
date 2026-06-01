import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-[#fdf6f0] to-[#f0eaf8] flex items-center justify-center px-4 relative overflow-hidden">

      <span className="absolute font-display text-[300px] font-light italic text-rose-mid/5 pointer-events-none select-none leading-none left-[-80px] bottom-[-60px]">✦</span>
      <span className="absolute font-display text-[300px] font-light italic text-rose-mid/5 pointer-events-none select-none leading-none right-[-80px] top-[-60px]">✦</span>

      <div className="text-center relative">
        <p className="font-display text-[120px] font-light leading-none text-rose-mid/30 mb-0">404</p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-mid/40" />
          <span className="text-rose-mid/60 text-xs tracking-widest">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-mid/40" />
        </div>

        <h1 className="font-display text-[32px] font-light italic text-ink mb-3">
          Página no encontrada
        </h1>
        <p className="text-[13px] text-ink-muted mb-10 max-w-[320px] mx-auto leading-relaxed">
          Esta página no existe o fue removida. Vuelve a la tienda y sigue explorando.
        </p>

        <Link href="/"
          className="inline-flex items-center gap-3 bg-rose-deep text-white px-8 py-3.5 text-[11px] tracking-[2.5px] uppercase hover:bg-ink transition-colors">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}