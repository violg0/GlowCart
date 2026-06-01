"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface Admin {
  adminId: string;
  email: string;
  role: "superadmin" | "admin";
}

interface AuthContextValue {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin]     = useState<Admin | null>(null);
  const [token, setToken]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Rehidratar sesión al recargar
  useEffect(() => {
    const stored = localStorage.getItem("glow-token");
    if (stored) {
      try {
        const payload = JSON.parse(atob(stored.split(".")[1]));
        const expired = payload.exp * 1000 < Date.now();
        if (expired) {
          localStorage.removeItem("glow-token");
        } else {
          setToken(stored);
          setAdmin({ adminId: payload.adminId, email: payload.email, role: payload.role });
        }
      } catch {
        localStorage.removeItem("glow-token");
      }
    }
    setIsLoading(false);
  }, []);

    useEffect(() => {
    const interceptFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await interceptFetch(...args);
      if (res.status === 401) {
        localStorage.removeItem("glow-token");
        setToken(null);
        setAdmin(null);
        router.push("/login");
      }
      return res;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Credenciales inválidas");
    }

    const data = await res.json();
    const payload = JSON.parse(atob(data.token.split(".")[1]));

    localStorage.setItem("glow-token", data.token);
    setToken(data.token);
    setAdmin({ adminId: payload.adminId, email: payload.email, role: payload.role });
    router.push("/admin");
  };

  const logout = () => {
    localStorage.removeItem("glow-token");
    setToken(null);
    setAdmin(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
