export default function Marquee() {
  const items = ["✦ Accesorios con identidad", "✦ Nuevas colecciones disponibles", "✦ Envíos a todo el país", "✦ Angelic Silvery · Neapolitan · Vampire Goth"];
  return (
    <div className="bg-rose-deep text-white py-2.5 overflow-hidden text-[10px] tracking-[2.5px] uppercase">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
