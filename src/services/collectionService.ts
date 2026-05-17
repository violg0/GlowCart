import { Collection } from "@/types";

// Las imágenes de portada terminan en -collection
// Las imágenes de banner de página terminan en -collection-pagina
// Deben estar en: public/images/collections/

const COLLECTIONS: Collection[] = [
  {
    slug:        "angelic-silvery",
    name:        "Angelic Silvery",
    description: "Plata, azul cielo y rosa pálido. Una colección etérea inspirada en ángeles, alas y cristales. Para quienes llevan magia en cada detalle.",
    coverImage:  "/images/collections/angel-silver-collection.jfif",
    bannerImage: "/images/collections/angel-silver-collection-pagina.jfif",
    accentColor: "text-blue-200",
    palette:     "Plata · Azul · Blanco · Rosa claro",
  },
  {
    slug:        "neapolitan",
    name:        "Neapolitan Chocolate",
    description: "Café, rosa y crema. Una colección dulce y nostálgica inspirada en el helado napolitano, el chocolate y la pastelería vintage.",
    coverImage:  "/images/collections/neapolitan-collection.jfif",
    bannerImage: "/images/collections/neapolitan-collection-pagina.jfif",
    accentColor: "text-amber-200",
    palette:     "Café · Rosa · Crema · Amarillo claro",
  },
  {
    slug:        "vampire-goth",
    name:        "Vampire Goth",
    description: "Negro, rojo vino y tonos oscuros. Una colección para las almas oscuras — gótica, intensa y poderosa.",
    coverImage:  "/images/collections/vampire-goth-collection.jfif",
    bannerImage: "/images/collections/vampire-goth-pagina.jfif",
    accentColor: "text-red-300",
    palette:     "Negro · Rojo vino · Gris oscuro",
  },
];

export const collectionService = {
  getAll: (): Collection[] => COLLECTIONS,
  getBySlug: (slug: string): Collection | undefined =>
    COLLECTIONS.find((c) => c.slug === slug),
};
