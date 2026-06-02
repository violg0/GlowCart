# Glow Cart — Frontend

Tienda de accesorios con identidad estética. Construida con Next.js 14, TypeScript y Tailwind CSS. Consume la API REST del backend propio.

---

## 🛠️ Tecnologías

- **Next.js 14** — App Router, server components
- **TypeScript** — tipado estático
- **Tailwind CSS** — estilos utilitarios con paleta personalizada
- **JWT** — sesión persistente para el panel admin

---

## 🗂️ Arquitectura limpia

```
src/
├── app/
│   ├── page.tsx                  → Home: hero, best sellers, nuevos, categorías, colecciones
│   ├── login/page.tsx            → Login del administrador
│   ├── admin/page.tsx            → Panel admin protegido
│   ├── categories/[slug]/        → Página de cada categoría
│   ├── collections/[slug]/       → Página de cada colección
│   ├── products/[id]/            → Detalle de producto
│   └── not-found.tsx             → Página 404
│
├── components/
│   ├── layout/                   → Navbar, CartDrawer, Footer, AdminGuard
│   ├── shop/                     → ProductCard, CategoryCard, CollectionCard
│   └── ui/                       → Marquee, HorizontalCarousel
│
├── hooks/
│   ├── useCart.ts                → Lógica del carrito con localStorage
│   ├── CartContext.tsx           → Estado global del carrito
│   └── AuthContext.tsx           → Sesión JWT, login, logout, interceptor 401
│
├── services/
│   ├── productService.ts         → Llamadas a la API de productos
│   ├── categoryService.ts        → Datos de categorías
│   ├── collectionService.ts      → Datos de colecciones
│   └── adminService.ts           → Llamadas protegidas con token
│
└── types/
    └── index.ts                  → Product, Category, Collection, Cart
```

---

## 🚀 Setup local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/glow-cart-front.git
cd glow-cart-front

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env.local en la raíz con:
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# 4. Correr en desarrollo
npm run dev
```

> El backend debe estar corriendo en `http://localhost:4000` para que el front funcione correctamente.

- Frontend: `http://localhost:3000`

---

## 🔑 Variables de entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

## 📄 Páginas

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Home con hero, carruseles y categorías | ❌ |
| `/login` | Login del administrador | ❌ |
| `/admin` | Panel de gestión de productos | ✅ JWT |
| `/categories/[slug]` | Productos de una categoría | ❌ |
| `/collections/[slug]` | Productos de una colección | ❌ |
| `/products/[id]` | Detalle de un producto | ❌ |

---

## 🔐 Autenticación

- El admin inicia sesión en `/login` con email y contraseña
- El JWT se guarda en `localStorage` y persiste al recargar
- Si el token expira, cualquier respuesta 401 redirige automáticamente a `/login`
- Si ya hay sesión activa y se accede a `/login`, redirige a `/admin`
- Logout limpia el token y redirige a `/login`

---

## 🎨 Colecciones

| Colección | Estética |
|-----------|----------|
| Angelic Silvery | Plata · Azul · Blanco · Rosa claro |
| Neapolitan Chocolate | Café · Rosa · Crema · Amarillo |
| Vampire Goth | Negro · Rojo vino · Gris oscuro |

---

## 🗂️ Categorías

Aretes · Collares · Pulseras · Anillos · Llaveros · Accesorios para el cabello · Pines & Broches
