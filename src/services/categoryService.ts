import { Category } from "@/types";

// Mock data — cuando el back esté listo, reemplazar por fetch() a la API
const CATEGORIES: Category[] = [
  { slug: "collares",  name: "Collares & Chokers", emoji: "📿", image: "/images/collares/collares.jfif",          description: "Gargantillas · cadenas · charms · lazos",  productCount: 12, featured: true  },
  { slug: "aretes",    name: "Aretes",             emoji: "✨", image: "/images/aretes/aretes.jfif",              description: "Colgantes · perlas · cristal · ear cuffs", productCount: 5,  featured: false },
  { slug: "anillos",   name: "Anillos",            emoji: "💍", image: "/images/anillos/anillos.jfif",            description: "Candy · florales · charms · apilables",    productCount: 6,  featured: false },
  { slug: "pulseras",  name: "Pulseras",           emoji: "⛓️", image: "/images/pulseras/pulseras.jfif",          description: "Cadenas · lazos · dúos combinados",        productCount: 7,  featured: false },
  { slug: "cabello",   name: "Para el cabello",    emoji: "🎀", image: "/images/cabello/accesorios-cabello.jfif", description: "Pasadores · broches · diademas · lazos",   productCount: 11, featured: true  },
  { slug: "broches",   name: "Pines & Broches",    emoji: "🌸", image: "/images/pines/pines.jfif",                description: "Brooches · esmalte · plata",               productCount: 5,  featured: false },
  { slug: "llaveros",  name: "Llaveros",           emoji: "🔑", image: "/images/llaveros/llaveros.jfif",          description: "Llaveros · charms · colgantes",            productCount: 4,  featured: false },
];

export const categoryService = {
  getAll: (): Category[] => CATEGORIES,
  getBySlug: (slug: string): Category | undefined =>
    CATEGORIES.find((c) => c.slug === slug),
};
