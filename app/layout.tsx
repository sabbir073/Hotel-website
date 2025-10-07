import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SessionProvider from "@/components/SessionProvider";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "THEATRE HOTEL d.o.o. - Luxury Hotel in Split, Croatia",
  description: "Experience luxury and comfort at THEATRE HOTEL d.o.o., your premium destination in the heart of Split, Croatia. Book your unforgettable stay today.",
  keywords: "hotel, Split, Croatia, luxury, accommodation, boutique hotel, adriatic sea, Croatian hotel, Theatre Hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <SessionProvider>
          <RecaptchaProvider>
            <LanguageProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </LanguageProvider>
          </RecaptchaProvider>
        </SessionProvider>
      </body>
    </html>
  );
}