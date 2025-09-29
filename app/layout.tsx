import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hotel du Théâtre - Luxury Hotel in Split, Croatia",
  description: "Experience luxury and comfort at Hotel du Théâtre, your premium destination in the heart of Split, Croatia. Book your unforgettable stay today.",
  keywords: "hotel, Split, Croatia, luxury, accommodation, boutique hotel, adriatic sea, Croatian hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}