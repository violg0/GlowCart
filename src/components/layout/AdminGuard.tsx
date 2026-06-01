"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { admin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/login");
    }
  }, [admin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-[#fdf6f0] to-[#f0eaf8] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-[28px] font-light italic text-ink-muted animate-pulse">
            ✦
          </p>
          <p className="text-[10px] tracking-[2px] uppercase text-ink-muted mt-2">
            Verificando sesión...
          </p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return <>{children}</>;
}
