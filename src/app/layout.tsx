import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/layout/CartDrawer";
import Marquee from "@/components/ui/Marquee";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Glow Cart · Accesorios",
  description: "Accesorios con identidad. Colecciones Angelic Silvery, Neapolitan y Vampire Goth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-cream font-body text-ink">
        <CartProvider>
          <Navbar />
          <Marquee />
          <main className="pt-[60px]">{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
