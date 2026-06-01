"use client";

import { useEffect, useState } from "react";
import { productService }  from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { adminService }    from "@/services/adminService";
import { useAuth }         from "@/hooks/AuthContext";
import AdminGuard          from "@/components/layout/AdminGuard";
import { Product } from "@/types";
import Link from "next/link";

const EMPTY: Omit<Product, "id"> = {
  name: "", price: 0, description: "", image: "", categorySlug: "collares",
  collectionSlug: "", stock: 0, badge: "", isBestSeller: false, isNew: false,
};


function AdminContent() {
  const { admin, token, logout } = useAuth();
  const cats = categoryService.getAll();
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [editing, setEditing]   = useState<Product | null>(null);
  const [form, setForm]         = useState<Omit<Product, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [saving, setSaving]     = useState(false);

const [showRegister, setShowRegister] = useState(false);
const [regForm, setRegForm] = useState({ email: "", password: "", role: "admin" as "superadmin" | "admin" });
const [regError, setRegError] = useState("");
const [regSaving, setRegSaving] = useState(false);

const handleRegister = async () => {
  if (!regForm.email || !regForm.password) { setRegError("Email y contraseña son requeridos"); return; }
  if (regForm.password.length < 6) { setRegError("La contraseña debe tener al menos 6 caracteres"); return; }
  setRegSaving(true);
  setRegError("");
  try {
    await adminService.registerAdmin(token!, regForm.email, regForm.password, regForm.role);
    setShowRegister(false);
    setRegForm({ email: "", password: "", role: "admin" });
  } catch (e: any) {
    setRegError(e.message);
  } finally {
    setRegSaving(false);
  }

};

useEffect(() => {
  setLoading(true);

  productService.getAll(page).then((res) => {
    setProducts(res.data);
    setMeta(res.meta);
    setLoading(false);
  });
}, [page]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categorySlug.includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setError("");
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, description: p.description, image: p.image, categorySlug: p.categorySlug, collectionSlug: p.collectionSlug ?? "", stock: p.stock, badge: p.badge ?? "", isBestSeller: p.isBestSeller ?? false, isNew: p.isNew ?? false });
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (admin?.role !== "superadmin") {
      alert("Solo el superadmin puede eliminar productos");
      return;
    }
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await adminService.deleteProduct(token!, id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) { setError("Nombre y precio son requeridos"); return; }
    setSaving(true);
    setError("");
    try {
      if (editing) {
        const updated = await adminService.updateProduct(token!, editing.id, form);
        setProducts(prev => prev.map(p => p.id === editing.id ? updated : p));
      } else {
        const created = await adminService.createProduct(token!, form);
        setProducts(prev => [created, ...prev]);
      }
      setShowForm(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div>
      <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key] as string | number}
        onChange={e => setForm(prev => ({ ...prev, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] text-ink bg-white focus:outline-none focus:border-rose-deep transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/" className="text-[10px] tracking-[1.5px] uppercase text-ink-muted hover:text-rose-deep transition-colors">
            ← Volver a la tienda
          </Link>
          <h1 className="font-display text-[38px] font-light italic text-ink mt-2">Panel Admin</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-[11px] text-ink-muted">{admin?.email}</p>
            <span className={`text-[9px] tracking-[1.5px] uppercase px-2 py-1 border ${admin?.role === "superadmin" ? "bg-rose/40 border-rose-mid text-rose-deep" : "bg-silver border-silver-mid text-ink-muted"}`}>
              {admin?.role}
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={openAdd} className="bg-rose-deep text-white px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors">
            + Nuevo producto
          </button>

           {admin?.role === "superadmin" && (
              <button onClick={() => { setShowRegister(true); setRegError(""); }}
                className="border border-rose-mid text-rose-deep px-6 py-3 text-[10px] tracking-[2px] uppercase hover:bg-rose transition-colors">
                + Crear admin
              </button>
            )}

          <button onClick={logout} className="border border-silver-mid text-ink-muted px-5 py-3 text-[10px] tracking-[2px] uppercase hover:border-rose-mid hover:text-rose-deep transition-colors">
            Salir
          </button>
        </div>
      </div>

      {/* Separador */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid/40 to-transparent" />
        <span className="text-rose-mid/50 tracking-[6px] text-xs">✦ ✦ ✦</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid/40 to-transparent" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          [products.length.toString(), "Productos"],
          [products.filter(p => p.isBestSeller).length.toString(), "Best Sellers"],
          [products.filter(p => p.isNew).length.toString(), "Nuevos"],
        ].map(([n, l]) => (
          <div key={l} className="border border-rose-mid/20 bg-gradient-to-br from-[#fdf0f5]/60 to-transparent p-5 text-center">
            <p className="font-display text-[32px] font-light text-rose-deep">{n}</p>
            <p className="text-[10px] tracking-[2px] uppercase text-ink-muted">{l}</p>
          </div>
        ))}
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-rose-mid/30 px-4 py-3 text-[13px] mb-6 bg-white focus:outline-none focus:border-rose-deep transition-colors"
      />

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20">
          <p className="font-display text-[28px] font-light italic text-ink-muted animate-pulse">✦</p>
          <p className="text-[10px] tracking-[2px] uppercase text-ink-muted mt-2">Cargando productos...</p>
        </div>
      ) : (
        <div className="border border-rose-mid/20 overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gradient-to-r from-[#fdf0f5]/80 to-transparent border-b border-rose-mid/20">
                {["Imagen", "Nombre", "Precio", "Categoría", "Colección", "Stock", "Badges", "Acciones"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[9px] tracking-[2px] uppercase text-ink-muted font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`border-b border-rose-mid/10 ${i % 2 === 0 ? "bg-white" : "bg-[#fdf0f5]/20"} hover:bg-blush transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 border border-rose-mid/20 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[160px] truncate">{p.name}</td>
                  <td className="px-4 py-3 font-display text-[15px] text-rose-deep font-light">₩{p.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-ink-muted text-[12px]">{p.categorySlug}</td>
                  <td className="px-4 py-3 text-ink-muted text-[12px]">{p.collectionSlug || "—"}</td>
                  <td className="px-4 py-3 text-[12px]">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.badge && <span className="bg-rose-deep text-white text-[9px] px-2 py-0.5">{p.badge}</span>}
                      {p.isBestSeller && <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5">★</span>}
                      {p.isNew && <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5">New</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(p)} className="text-[10px] tracking-[1px] uppercase text-ink-muted hover:text-rose-deep transition-colors">Editar</button>
                      {admin?.role === "superadmin" && (
                        <button onClick={() => handleDelete(p.id)} className="text-[10px] tracking-[1px] uppercase text-ink-muted hover:text-red-500 transition-colors">Eliminar</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-center gap-6 mt-8 py-6 border-t border-rose-mid/20">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="text-[10px] tracking-[2px] uppercase text-ink-muted hover:text-rose-deep transition-colors disabled:opacity-40"
              disabled={page === 1}
            >
              ← Anterior
            </button>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-deep rounded-full opacity-60" />
              <span className="text-[11px] tracking-[2px] uppercase text-ink-muted">
                Página {page}
              </span>
              <div className="w-2 h-2 bg-rose-deep rounded-full opacity-60" />
            </div>

            <button
              onClick={() => setPage(p => p + 1)}
              disabled={meta && page >= meta.totalPages}
              className="text-[10px] tracking-[2px] uppercase text-ink-muted hover:text-rose-deep transition-colors"
            >
              Siguiente →
            </button>

          </div>

        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-ink/40 z-[80] flex items-center justify-center p-4">
          <div className="bg-cream w-full max-w-[580px] max-h-[90vh] overflow-y-auto border border-rose-mid/40 relative">
            <div className="absolute -inset-1 border border-rose-mid/15 pointer-events-none" />

            <div className="flex items-center justify-between px-7 py-5 border-b border-rose-mid/20">
              <h2 className="font-display text-2xl font-light italic">{editing ? "Editar producto" : "Nuevo producto"}</h2>
              <button onClick={() => setShowForm(false)} className="text-ink-muted hover:text-rose-deep text-xl transition-colors">✕</button>
            </div>

            <div className="px-7 py-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">{field("Nombre", "name")}</div>
              {field("Precio", "price", "number")}
              {field("Stock", "stock", "number")}
              <div className="col-span-2">{field("Descripción", "description")}</div>
              <div className="col-span-2">{field("Imagen (ruta)", "image")}</div>

              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Categoría</label>
                <select value={form.categorySlug} onChange={e => setForm(p => ({ ...p, categorySlug: e.target.value as any }))}
                  className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep">
                  {cats.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Colección</label>
                <select value={form.collectionSlug ?? ""} onChange={e => setForm(p => ({ ...p, collectionSlug: e.target.value }))}
                  className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep">
                  <option value="">Sin colección</option>
                  <option value="angelic-silvery">Angelic Silvery</option>
                  <option value="neapolitan">Neapolitan Chocolate</option>
                  <option value="vampire-goth">Vampire Goth</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Badge</label>
                <select value={form.badge ?? ""} onChange={e => setForm(p => ({ ...p, badge: e.target.value as any }))}
                  className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep">
                  <option value="">Sin badge</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Limitado">Limitado</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </div>

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

            {error && (
              <div className="mx-7 mb-4 border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[12px] text-red-600">✕ {error}</p>
              </div>
            )}

            <div className="px-7 pb-7 flex gap-3">
              <button onClick={handleSubmit} disabled={saving}
                className="flex-1 py-3 bg-rose-deep text-white text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-60">
                {saving ? "Guardando..." : editing ? "Guardar cambios" : "Agregar producto"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-rose-mid/30 text-ink-muted text-[10px] tracking-[1.5px] uppercase hover:bg-rose transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

{showRegister && (
  <div className="fixed inset-0 bg-ink/40 z-[80] flex items-center justify-center p-4">
    <div className="bg-cream w-full max-w-[440px] border border-rose-mid/40 relative">
      <div className="absolute -inset-1 border border-rose-mid/15 pointer-events-none" />

      <div className="flex items-center justify-between px-7 py-5 border-b border-rose-mid/20">
        <h2 className="font-display text-2xl font-light italic">Crear admin</h2>
        <button onClick={() => setShowRegister(false)} className="text-ink-muted hover:text-rose-deep text-xl transition-colors">✕</button>
      </div>

      <div className="px-7 py-6 flex flex-col gap-4">
        <div>
          <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Email</label>
          <input type="email" value={regForm.email}
            onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
            className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Contraseña</label>
          <input type="password" value={regForm.password}
            onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
            className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-1.5">Rol</label>
          <select value={regForm.role} onChange={e => setRegForm(p => ({ ...p, role: e.target.value as any }))}
            className="w-full border border-rose-mid/40 px-3 py-2.5 text-[13px] bg-white focus:outline-none focus:border-rose-deep">
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {regError && (
          <div className="border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-[12px] text-red-600">✕ {regError}</p>
          </div>
        )}
      </div>

      <div className="px-7 pb-7 flex gap-3">
        <button onClick={handleRegister} disabled={regSaving}
          className="flex-1 py-3 bg-rose-deep text-white text-[10px] tracking-[2px] uppercase hover:bg-ink transition-colors disabled:opacity-60">
          {regSaving ? "Creando..." : "Crear admin"}
        </button>
        <button onClick={() => setShowRegister(false)}
          className="px-6 py-3 border border-rose-mid/30 text-ink-muted text-[10px] tracking-[1.5px] uppercase hover:bg-rose transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  );
}