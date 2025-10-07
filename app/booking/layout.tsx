import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay - Online Reservation",
  description: "Book your luxury stay at THEATRE HOTEL d.o.o. Split, Croatia. Secure online booking, best rate guarantee, instant confirmation. Reserve your Standard Room, Deluxe Suite, or Presidential Suite. Easy cancellation, 24/7 customer support.",
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
  openGraph: {
    title: "Book Your Luxury Stay | THEATRE HOTEL d.o.o. Split",
    description: "Secure online booking with best rate guarantee. Reserve your luxury room in Split, Croatia with instant confirmation.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Book Your Stay at THEATRE HOTEL d.o.o.",
      },
    ],
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/booking",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
