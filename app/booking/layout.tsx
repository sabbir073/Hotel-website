import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Book Your Stay - Online Reservation",
  description: "Book your luxury stay at THEATRE HOTEL d.o.o. Split, Croatia. Secure online booking, best rate guarantee, instant confirmation. Reserve your Standard Room, Deluxe Suite, or Presidential Suite. Easy cancellation, 24/7 customer support.",
  url: "/booking",
  keywords: [
    "book hotel Split",
    "Split hotel reservation",
    "online hotel booking Croatia",
    "luxury hotel booking Split",
    "reserve room Split",
    "hotel booking Diocletian Palace",
    "Split accommodation booking",
    "best rate guarantee Split",
    "instant confirmation hotel",
    "secure hotel booking",
  ],
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
