export default function Footer() {
  return (
    <footer className="bg-ink text-[#d4c0c0] py-14 px-10 mt-0">
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-10">
        <div>
          <p className="font-display text-[22px] italic tracking-[4px] text-cream mb-3">Glow Cart</p>
          <p className="text-[11px] text-[#8d7070] leading-relaxed">Accesorios con identidad. Cada pieza cuenta una historia.</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[3px] uppercase text-mauve mb-4">Información</p>
          <div className="flex flex-col gap-2">
            {["Métodos de pago", "Tiempos de envío", "Política de devoluciones", "Preguntas frecuentes"].map(l => (
              <span key={l} className="text-[12px] text-[#8d7070] hover:text-mauve cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[3px] uppercase text-mauve mb-4">Colecciones</p>
          <div className="flex flex-col gap-2">
            {[["Angelic Silvery", "/collections/angelic-silvery"], ["Neapolitan Chocolate", "/collections/neapolitan"], ["Vampire Goth", "/collections/vampire-goth"]].map(([n, h]) => (
              <a key={n} href={h} className="text-[12px] text-[#8d7070] hover:text-mauve transition-colors">{n}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-[#3a2a2a] text-center">
        <p className="text-[10px] text-[#5a4040] tracking-[1px]">© 2025 Glow Cart · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
