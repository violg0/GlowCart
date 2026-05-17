"use client";

import { useState } from "react";
import { productService }  from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { Product } from "@/types";
import Link from "next/link";

const EMPTY: Omit<Product, "id"> = {
  name: "", price: 0, description: "", image: "", categorySlug: "collares",
  collectionSlug: "", stock: 0, badge: "", isBestSeller: false, isNew: false,
};

export default function AdminPage() {
  const cats = categoryService.getAll();
  const [products, setProducts] = useState<Product[]>(productService.getAll());
  const [editing, setEditing]   = useState<Product | null>(null);
  const [form, setForm]         = useState<Omit<Product, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categorySlug.includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, description: p.description, image: p.image, categorySlug: p.categorySlug, collectionSlug: p.collectionSlug ?? "", stock: p.stock, badge: p.badge ?? "", isBestSeller: p.isBestSeller ?? false, isNew: p.isNew ?? false });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este producto?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
    } else {
      const newId = `prod-${Date.now()}`;
      setProducts(prev => [...prev, { ...form, id: newId }]);
    }
    setShowForm(false);
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div>
      <label className="block text-[11px] tracking-[1px] uppercase text-ink-muted mb-1">{label}</label>
      <input
        type={type}
        value={form[key] as string | number}
        onChange={e => setForm(prev => ({ ...prev, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        className="w-full border border-silver-mid px-3 py-2 text-[13px] text-ink bg-white focus:outline-none focus:border-rose-dark"
      />
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-[11px] tracking-[1px] uppercase text-ink-muted hover:text-rose-deep transition-colors">← Volver a la tienda</Link>
          <h1 className="font-display text-[36px] font-light text-ink mt-2">Panel Admin</h1>
          <p className="text-[12px] text-ink-muted">{products.length} productos en total</p>
        </div>
        <button onClick={openAdd} className="bg-rose-deep text-white px-6 py-3 text-[11px] tracking-[2px] uppercase hover:bg-ink transition-colors">
          + Nuevo producto
        </button>
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-silver-mid px-4 py-3 text-[13px] mb-6 bg-white focus:outline-none focus:border-rose-dark"
      />

      {/* Tabla */}
      <div className="border border-silver-mid overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-silver border-b border-silver-mid">
              {["Imagen", "Nombre", "Precio", "Categoría", "Colección", "Stock", "Badges", "Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[1.5px] uppercase text-ink-muted font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className={`border-b border-silver-mid ${i % 2 === 0 ? "bg-white" : "bg-silver/30"} hover:bg-blush transition-colors`}>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 bg-silver border border-silver-mid overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium max-w-[180px] truncate">{p.name}</td>
                <td className="px-4 py-3 text-rose-deep font-display text-[15px]">₩{p.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-ink-muted">{p.categorySlug}</td>
                <td className="px-4 py-3 text-ink-muted">{p.collectionSlug || "—"}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {p.badge && <span className="bg-rose-deep text-white text-[9px] px-2 py-0.5">{p.badge}</span>}
                    {p.isBestSeller && <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5">★ Best</span>}
                    {p.isNew && <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5">Nuevo</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-[11px] tracking-[1px] uppercase text-ink-muted hover:text-rose-deep transition-colors">Editar</button>
                    <button onClick={() => handleDelete(p.id)} className="text-[11px] tracking-[1px] uppercase text-ink-muted hover:text-red-500 transition-colors">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 bg-ink/50 z-[80] flex items-center justify-center p-4">
          <div className="bg-cream w-full max-w-[600px] max-h-[90vh] overflow-y-auto border border-rose-mid">
            <div className="flex items-center justify-between px-7 py-5 border-b border-rose-mid">
              <h2 className="font-display text-2xl font-light">{editing ? "Editar producto" : "Nuevo producto"}</h2>
              <button onClick={() => setShowForm(false)} className="text-ink-muted hover:text-rose-deep text-xl">✕</button>
            </div>

            <div className="px-7 py-6 grid grid-cols-2 gap-5">
              <div className="col-span-2">{field("Nombre", "name")}</div>
              {field("Precio", "price", "number")}
              {field("Stock", "stock", "number")}
              <div className="col-span-2">{field("Descripción", "description")}</div>
              <div className="col-span-2">{field("Imagen (ruta)", "image")}</div>

              {/* Categoría */}
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-ink-muted mb-1">Categoría</label>
                <select
                  value={form.categorySlug}
                  onChange={e => setForm(prev => ({ ...prev, categorySlug: e.target.value }))}
                  className="w-full border border-silver-mid px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-rose-dark"
                >
                  {cats.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>

              {/* Colección */}
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-ink-muted mb-1">Colección</label>
                <select
                  value={form.collectionSlug ?? ""}
                  onChange={e => setForm(prev => ({ ...prev, collectionSlug: e.target.value }))}
                  className="w-full border border-silver-mid px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-rose-dark"
                >
                  <option value="">Sin colección</option>
                  <option value="angelic-silvery">Angelic Silvery</option>
                  <option value="neapolitan">Neapolitan Chocolate</option>
                  <option value="vampire-goth">Vampire Goth</option>
                </select>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-ink-muted mb-1">Badge</label>
                <select
                  value={form.badge ?? ""}
                  onChange={e => setForm(prev => ({ ...prev, badge: e.target.value as Product["badge"] }))}
                  className="w-full border border-silver-mid px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-rose-dark"
                >
                  <option value="">Sin badge</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Limitado">Limitado</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-3 justify-center">
                <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input type="checkbox" checked={form.isBestSeller} onChange={e => setForm(p => ({ ...p, isBestSeller: e.target.checked }))} className="accent-rose-deep" />
                  Best Seller
                </label>
                <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                  <input type="checkbox" checked={form.isNew} onChange={e => setForm(p => ({ ...p, isNew: e.target.checked }))} className="accent-rose-deep" />
                  Producto nuevo
                </label>
              </div>
            </div>

            <div className="px-7 pb-7 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-3 bg-rose-deep text-white text-[11px] tracking-[2px] uppercase hover:bg-ink transition-colors">
                {editing ? "Guardar cambios" : "Agregar producto"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-silver-mid text-ink-muted text-[11px] tracking-[1.5px] uppercase hover:bg-silver transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
