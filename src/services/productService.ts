import { Product } from "@/types";

const PRODUCTS: Product[] = [

  // ── COLLARES ──────────────────────────────────────────────────────────────
  { id: "col-1",  name: "Alas de Ángel",       price: 35000, description: "Collar delicado con dije de alas de ángel en plata.",           image: "/images/collares/alas de angel.jfif",   categorySlug: "collares", collectionSlug: "angelic-silvery", stock: 8,  badge: "",         isBestSeller: false, isNew: false },
  { id: "col-2",  name: "Angel Silver",         price: 42000, description: "Collar de cadena plateada con detalles angelicales.",           image: "/images/collares/Angel Silver.jfif",    categorySlug: "collares", collectionSlug: "angelic-silvery", stock: 5,  badge: "Limitado", isBestSeller: true,  isNew: false },
  { id: "col-3",  name: "Angelic",              price: 38000, description: "Collar etéreo con cristales blancos y detalles en plata.",      image: "/images/collares/angelic.jfif",         categorySlug: "collares", collectionSlug: "angelic-silvery", stock: 10, badge: "",         isBestSeller: false, isNew: false },
  { id: "col-4",  name: "Collar Clásico",       price: 28000, description: "Collar base de la colección, versátil y elegante.",             image: "/images/collares/collares.jfif",        categorySlug: "collares",                                   stock: 15, badge: "",         isBestSeller: false, isNew: false },
  { id: "col-5",  name: "Dark Angel",           price: 45000, description: "Collar oscuro con dije de ángel caído, plata oxidada.",         image: "/images/collares/dark angel.jfif",      categorySlug: "collares", collectionSlug: "angelic-silvery", stock: 6,  badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "col-6",  name: "Goth Heart",           price: 32000, description: "Collar gótico con corazón en tono vino y negro.",               image: "/images/collares/goth-heart.jfif",      categorySlug: "collares", collectionSlug: "vampire-goth",    stock: 7,  badge: "",         isBestSeller: false, isNew: false },
  { id: "col-7",  name: "Hello Kitty Collar",   price: 30000, description: "Collar kawaii con dije de Hello Kitty.",                        image: "/images/collares/hello-kitty.jfif",     categorySlug: "collares",                                   stock: 12, badge: "",         isBestSeller: false, isNew: false },
  { id: "col-8",  name: "Lazo Collar",          price: 25000, description: "Collar con lazo satinado, delicado y romántico.",               image: "/images/collares/lazo.jfif",            categorySlug: "collares",                                   stock: 20, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "col-9",  name: "Pearls",               price: 40000, description: "Collar de perlas naturales con cierre dorado.",                 image: "/images/collares/pearls.jfif",          categorySlug: "collares",                                   stock: 8,  badge: "",         isBestSeller: false, isNew: false },
  { id: "col-10", name: "Royal Chocolate",      price: 38000, description: "Collar napolitano con tonos chocolate y rosa.",                 image: "/images/collares/royal-chocolate.jfif", categorySlug: "collares", collectionSlug: "neapolitan",      stock: 6,  badge: "",         isBestSeller: false, isNew: false },
  { id: "col-11", name: "Vivienne WestWood",             price: 55000, description: "Collar inspirado en el estilo Vivienne Westwood.",              image: "/images/collares/westwood.jfif",        categorySlug: "collares",                                   stock: 4,  badge: "Limitado", isBestSeller: false, isNew: false },
  { id: "col-12", name: "Vivienne WestWood II",          price: 55000, description: "Segunda versión del collar Westwood con acabado premium.",      image: "/images/collares/westwood2.jfif",       categorySlug: "collares",                                   stock: 4,  badge: "Limitado", isBestSeller: false, isNew: false },

  // ── CABELLO ────────────────────────────────────────────────────────────────
  { id: "cab-1",  name: "Accesorios Cabello",      price: 22000, description: "Set de accesorios básicos para el cabello.",                   image: "/images/cabello/accesorios-cabello.jfif",        categorySlug: "cabello",                                   stock: 15, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-2",  name: "Alas de Ángel Hair",      price: 28000, description: "Accesorio para el cabello con alas de ángel en plata.",        image: "/images/cabello/alas-angel.jfif",                categorySlug: "cabello",  collectionSlug: "angelic-silvery", stock: 8,  badge: "",         isBestSeller: true,  isNew: false },
  { id: "cab-3",  name: "Angel Hair Claw",          price: 32000, description: "Pasador tipo garra con diseño angelical brillante.",                     image: "/images/cabello/Angel hair claw.jfif",           categorySlug: "cabello",  collectionSlug: "angelic-silvery", stock: 10, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "cab-4",  name: "Angel Hair Claw II",       price: 32000, description: "Segunda versión del pasador angelical version mate.",         image: "/images/cabello/angel hair claw2.jfif",          categorySlug: "cabello",  collectionSlug: "angelic-silvery", stock: 10, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-5",  name: "Biscuit Chocolate",        price: 25000, description: "Accesorio en tonos chocolate y crema, estilo napolitano.",     image: "/images/cabello/biscuit-chocolate.jfif",         categorySlug: "cabello",  collectionSlug: "neapolitan",      stock: 12, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-6",  name: "Hello Kitty Hair",         price: 22000, description: "Pasador kawaii con Hello Kitty.",                              image: "/images/cabello/hello-kitty.jfif",               categorySlug: "cabello",                                   stock: 18, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-7",  name: "Lazo Chocolate Napolitano",price: 20000, description: "Lazo en tonos chocolate y napolitano.",                        image: "/images/cabello/lazo chocolate-napolitano.jfif", categorySlug: "cabello",  collectionSlug: "neapolitan",      stock: 14, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-8",  name: "Napolitano",               price: 24000, description: "Accesorio de cabello en paleta napolitana.",                   image: "/images/cabello/napolitano.jfif",                categorySlug: "cabello",  collectionSlug: "neapolitan",      stock: 9,  badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-9",  name: "Neapolitan",               price: 26000, description: "Pasador inspirado en los colores del helado napolitano.",      image: "/images/cabello/neapolitan.jfif",                categorySlug: "cabello",  collectionSlug: "neapolitan",      stock: 11, badge: "",         isBestSeller: false, isNew: false },
  { id: "cab-10", name: "Red Pink",                 price: 22000, description: "Accesorio en tonos rojo y rosa brillante.",                    image: "/images/cabello/red-pink.jfif",                  categorySlug: "cabello",                                   stock: 13, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "cab-11", name: "Tiburón Clip",             price: 20000, description: "Pasador tipo tiburón con diseño divertido.",                   image: "/images/cabello/tiburon.jfif",                   categorySlug: "cabello",                                   stock: 20, badge: "",         isBestSeller: false, isNew: false },

  // ── PULSERAS ───────────────────────────────────────────────────────────────
  { id: "pul-1",  name: "Angel Silver Pulsera",  price: 38000, description: "Pulsera de plata con charms angelicales.",                    image: "/images/pulseras/angel-silver-pulsera.jfif",  categorySlug: "pulseras", collectionSlug: "angelic-silvery", stock: 7,  badge: "",         isBestSeller: true,  isNew: false },
  { id: "pul-2",  name: "Cute Teeth Neapolitan", price: 32000, description: "Pulsera napolitana con dientes kawaii en tonos pastel.",      image: "/images/pulseras/cute-teeth-neapolitan.jfif", categorySlug: "pulseras", collectionSlug: "neapolitan",      stock: 8,  badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "pul-3",  name: "Fairy",                 price: 35000, description: "Pulsera etérea con detalles de hada y cristales.",           image: "/images/pulseras/fairy.jfif",                 categorySlug: "pulseras", collectionSlug: "angelic-silvery", stock: 9,  badge: "",         isBestSeller: false, isNew: false },
  { id: "pul-4",  name: "Flowers",               price: 28000, description: "Pulsera floral con flores en resina.",                       image: "/images/pulseras/flowers.jfif",               categorySlug: "pulseras",                                   stock: 14, badge: "",         isBestSeller: false, isNew: false },
  { id: "pul-5",  name: "Hello Kitty Pulsera",   price: 25000, description: "Pulsera kawaii con Hello Kitty.",                            image: "/images/pulseras/hello-kitty.jfif",           categorySlug: "pulseras",                                   stock: 16, badge: "",         isBestSeller: false, isNew: false },
  { id: "pul-6",  name: "Pulsera Clásica",       price: 22000, description: "Pulsera base versátil para cualquier look.",                 image: "/images/pulseras/pulseras.jfif",              categorySlug: "pulseras",                                   stock: 20, badge: "",         isBestSeller: false, isNew: false },
  { id: "pul-7",  name: "Vampire Goth Pulsera",  price: 42000, description: "Pulsera gótica en negro y vino con charms de vampiro.",      image: "/images/pulseras/vampire-goth.jfif",          categorySlug: "pulseras", collectionSlug: "vampire-goth",    stock: 5,  badge: "Limitado", isBestSeller: false, isNew: false },

  // ── PINES & BROCHES ────────────────────────────────────────────────────────
  { id: "pin-1",  name: "pink-brown bears",    price: 28000, description: "Pin con cadena angelical, plata y cristal.",              image: "/images/pines/osos.jfif",      categorySlug: "broches", collectionSlug: "neapolitan", stock: 10, badge: "",         isBestSeller: true,  isNew: false },
  { id: "pin-2",  name: "Broches de osos",           price: 18000, description: "Pin de oso kawaii en esmalte.",                          image: "/images/pines/bear.jfif",             categorySlug: "broches",                                   stock: 20, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "pin-3",  name: "Broches Napolitanos",   price: 22000, description: "Set de pines en paleta napolitana.",                     image: "/images/pines/pines-napolitanos.jfif", categorySlug: "broches", collectionSlug: "neapolitan",      stock: 12, badge: "",         isBestSeller: false, isNew: false },
  { id: "pin-4",  name: "Estrellas",           price: 16000, description: "Pin de estrella en esmalte brillante.",                  image: "/images/pines/star.jfif",             categorySlug: "broches",                                   stock: 25, badge: "",         isBestSeller: false, isNew: false },
  { id: "pin-5",  name: "Pines Clásicos",     price: 15000, description: "Set de pines básicos para personalizar tu look.",        image: "/images/pines/pines.jfif",            categorySlug: "broches",                                   stock: 30, badge: "",         isBestSeller: false, isNew: false },

  // ── ANILLOS ────────────────────────────────────────────────────────────────
  { id: "ani-1",  name: "Angel Wings Ring",        price: 22000, description: "Anillo con alas de ángel en plata 925.",             image: "/images/anillos/angel-wings.jfif",                  categorySlug: "anillos", collectionSlug: "angelic-silvery", stock: 12, badge: "",         isBestSeller: true,  isNew: false },
  { id: "ani-3",  name: "Lazo Ring",               price: 18000, description: "Anillo con detalle de lazo, delicado y femenino.",   image: "/images/anillos/lazo.jfif",                         categorySlug: "anillos",                                   stock: 15, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "ani-5",  name: "Vampire Goth Cuervo",     price: 24000, description: "Anillo gótico con cuervo y rosa en vino y negro.",   image: "/images/anillos/vampire-goth-cuervo y rosa.jfif",  categorySlug: "anillos", collectionSlug: "vampire-goth",    stock: 7,  badge: "Limitado", isBestSeller: false, isNew: false },
  { id: "ani-6",  name: "Blue Butterflies",          price: 16000, description: "Anillo básico apilable en plata.",                   image: "/images/anillos/anillos.jfif",                      categorySlug: "anillos",                                   stock: 20, badge: "",         isBestSeller: false, isNew: false },

  // ── ARETES ─────────────────────────────────────────────────────────────────
  { id: "are-1",  name: "Angel Wings",  price: 28000, description: "Aretes colgantes con alas de ángel en plata.",       image: "/images/aretes/angel-wings.jfif",    categorySlug: "aretes", collectionSlug: "angelic-silvery", stock: 9,  badge: "",         isBestSeller: true,  isNew: false },
  { id: "are-2",  name: "Aretes Clásicos",     price: 22000, description: "Aretes base versátiles para cualquier ocasión.",    image: "/images/aretes/aretes.jfif",        categorySlug: "aretes",                                   stock: 18, badge: "",         isBestSeller: false, isNew: false },
  { id: "are-3",  name: "Aretes Goth",         price: 26000, description: "Aretes góticos en negro y rojo vino.",              image: "/images/aretes/aretes-goth.jfif",   categorySlug: "aretes", collectionSlug: "vampire-goth",    stock: 8,  badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "are-4",  name: "Lazos",         price: 24000, description: "Aretes con lazo satinado, románticos y delicados.", image: "/images/aretes/lazo.jfif",          categorySlug: "aretes",                                   stock: 12, badge: "",         isBestSeller: false, isNew: false },
  { id: "are-5",  name: "Planet ",            price: 30000, description: "Aretes con planetas en esmalte colorido.",          image: "/images/aretes/planetas.jfif",      categorySlug: "aretes",                                   stock: 10, badge: "",         isBestSeller: false, isNew: false },
  { id: "ani-2",  name: "black",               price: 20000, description: "Anillo gótico en tono oscuro.",                      image: "/images/aretes/goth.jfif",                         categorySlug: "anillos", collectionSlug: "vampire-goth",    stock: 10, badge: "",         isBestSeller: false, isNew: false },


  // ── LLAVEROS ───────────────────────────────────────────────────────────────
  { id: "lla-1",  name: "Biscuit Chocolate Bear", price: 22000, description: "Llavero de oso biscuit en tonos chocolate.",          image: "/images/llaveros/biscuit-cookie-bear.jfif", categorySlug: "llaveros", collectionSlug: "neapolitan",  stock: 10, badge: "",         isBestSeller: true,  isNew: false },
  { id: "lla-2",  name: "Chocolate Cookie",       price: 20000, description: "Llavero cookie de chocolate, estilo napolitano.",     image: "/images/llaveros/chocolate-cookie.jfif",      categorySlug: "llaveros", collectionSlug: "neapolitan",  stock: 12, badge: "",         isBestSeller: false, isNew: false },
  { id: "lla-3",  name: "Hello Kitty Llavero",    price: 18000, description: "Llavero kawaii con Hello Kitty.",                     image: "/images/llaveros/hello-kitty.jfif",           categorySlug: "llaveros", collectionSlug: "kawaii", stock: 18, badge: "Nuevo",    isBestSeller: false, isNew: true  },
  { id: "lla-4",  name: "Biscuit chocolate Bear ll", price: 15000, description: "Llavero de oso biscuit en tonos chocolate.",          image: "/images/llaveros/llaveros.jfif",              categorySlug: "llaveros", collectionSlug: "neapolitan",       stock: 25, badge: "",         isBestSeller: false, isNew: false },
];

export const productService = {
  getAll: (): Product[] => PRODUCTS,

  getByCategory: (slug: string): Product[] =>
    PRODUCTS.filter((p) => p.categorySlug === slug),

  getByCollection: (slug: string): Product[] =>
    PRODUCTS.filter((p) => p.collectionSlug === slug),

  getBestSellers: (): Product[] =>
    PRODUCTS.filter((p) => p.isBestSeller),

  getNew: (): Product[] =>
    PRODUCTS.filter((p) => p.isNew),

  getById: (id: string): Product | undefined =>
    PRODUCTS.find((p) => p.id === id),
};
