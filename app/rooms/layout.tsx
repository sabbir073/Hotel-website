import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites in Split",
  description: "Discover our exquisite selection of luxury rooms and suites at THEATRE HOTEL d.o.o. From elegant Standard Rooms to opulent Presidential Suites, experience world-class comfort in Split, Croatia. Free WiFi, sea views, premium amenities.",
  keywords: [
    "luxury rooms Split",
    "hotel suites Croatia",
    "Split accommodation rooms",
    "boutique hotel rooms",
    "sea view rooms Split",
    "presidential suite Split",
    "deluxe rooms Croatia",
    "hotel rooms near Diocletian Palace",
    "luxury accommodation Split",
    "5-star hotel rooms",
  ],
  openGraph: {
    title: "Luxury Rooms & Suites | THEATRE HOTEL d.o.o. Split",
    description: "Discover our exquisite selection of luxury rooms and suites. From elegant Standard Rooms to opulent Presidential Suites in Split, Croatia.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Luxury Hotel Rooms at THEATRE HOTEL d.o.o.",
      },
    ],
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/rooms",
  },
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
