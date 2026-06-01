"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) { setError("El email es requerido"); return; }
    if (!password) { setError("La contraseña es requerida"); return; }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message ?? "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-[#fdf6f0] to-[#f0eaf8] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Decoración de fondo */}
      <span className="absolute font-display text-[300px] font-light italic text-rose-mid/5 pointer-events-none select-none leading-none left-[-80px] bottom-[-60px]">✦</span>
      <span className="absolute font-display text-[300px] font-light italic text-rose-mid/5 pointer-events-none select-none leading-none right-[-80px] top-[-60px]">✦</span>

      <div className="w-full max-w-[420px] relative">

        {/* Marco decorativo exterior */}
        <div className="absolute -inset-3 border border-rose-mid/20 pointer-events-none" />
        <div className="absolute -inset-1.5 border border-rose-mid/15 pointer-events-none" />

        <div className="bg-white/80 backdrop-blur-sm border border-rose-mid/30 px-10 py-12 relative">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <p className="font-display text-[11px] tracking-[3px] uppercase text-ink-muted hover:text-rose-deep transition-colors">
                ← Volver a la tienda
              </p>
            </Link>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-mid/50" />
              <span className="text-rose-mid text-sm tracking-widest">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-mid/50" />
            </div>

            <h1 className="font-display text-[32px] font-light italic text-ink leading-tight mb-2">
              Panel Admin
            </h1>
            <p className="text-[11px] tracking-[2px] uppercase text-ink-muted">
              Glow Cart · Acceso exclusivo
            </p>

            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-mid/40" />
              <span className="text-rose-mid/60 text-xs tracking-widest">✦ ✦ ✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-mid/40" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@glowcart.com"
                className="w-full border border-rose-mid/40 bg-white/60 px-4 py-3 text-[13px] text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-rose-deep transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] tracking-[2px] uppercase text-ink-muted mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-rose-mid/40 bg-white/60 px-4 py-3 text-[13px] text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-rose-deep transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[12px] text-red-600 flex items-center gap-2">
                  <span>✕</span> {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-rose-deep text-white text-[11px] tracking-[3px] uppercase hover:bg-ink transition-colors duration-300 disabled:opacity-60 mt-2"
            >
              {loading ? "Verificando..." : "Ingresar ✦"}
            </button>
          </form>

          {/* Footer decorativo */}
          <div className="mt-8 text-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-mid/30 to-transparent" />
            </div>
            <p className="text-[10px] tracking-[1.5px] uppercase text-ink-muted/50">
              Glow Cart · Admin ✦
            </p>
          </div>

          {/* Esquinas decorativas */}
          <span className="absolute top-3 left-3 font-display text-[20px] italic text-rose-mid/20 leading-none">✦</span>
          <span className="absolute top-3 right-3 font-display text-[20px] italic text-rose-mid/20 leading-none">✦</span>
          <span className="absolute bottom-3 left-3 font-display text-[20px] italic text-rose-mid/20 leading-none">✦</span>
          <span className="absolute bottom-3 right-3 font-display text-[20px] italic text-rose-mid/20 leading-none">✦</span>
        </div>
      </div>
    </div>
  );
}
