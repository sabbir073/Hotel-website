import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Story & Heritage",
  description: "Discover the story behind THEATRE HOTEL d.o.o., Split's premier luxury boutique hotel. Learn about our commitment to excellence, rich Croatian heritage, and dedication to providing unforgettable experiences in the heart of Dalmatia.",
  keywords: [
    "about Theatre Hotel",
    "Split hotel history",
    "luxury hotel Croatia story",
    "boutique hotel Split heritage",
    "Croatian hospitality",
    "Dalmatian hotel culture",
    "hotel near Diocletian Palace history",
    "Split accommodation heritage",
  ],
  openGraph: {
    title: "About Us - Our Story & Heritage | THEATRE HOTEL d.o.o.",
    description: "Discover the story behind Split's premier luxury boutique hotel. Our commitment to excellence and Croatian heritage.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "About THEATRE HOTEL d.o.o. Split",
      },
    ],
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
