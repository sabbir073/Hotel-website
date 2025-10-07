import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Luxury Rooms & Suites in Split",
  description: "Discover our exquisite selection of luxury rooms and suites at THEATRE HOTEL d.o.o. From elegant Standard Rooms to opulent Presidential Suites, experience world-class comfort in Split, Croatia. Free WiFi, sea views, premium amenities.",
  url: "/rooms",
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
});

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
