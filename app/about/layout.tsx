import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About Us - Our Story & Heritage",
  description: "Discover the story behind THEATRE HOTEL d.o.o., Split's premier luxury boutique hotel. Learn about our commitment to excellence, rich Croatian heritage, and dedication to providing unforgettable experiences in the heart of Dalmatia.",
  url: "/about",
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
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
