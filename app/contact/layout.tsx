import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description: "Contact THEATRE HOTEL d.o.o. Split, Croatia. Get in touch with our team for reservations, inquiries, or assistance. Phone: +385 92 451 2500, Email: info@theatrehoteldoo.com. Located at Matošića ul., Split 21000. 24/7 customer support.",
  keywords: [
    "contact hotel Split",
    "Split hotel phone number",
    "hotel email Split",
    "Theatre Hotel contact",
    "Split hotel address",
    "hotel inquiries Croatia",
    "hotel reservation phone",
    "customer support Split hotel",
    "hotel location Split",
  ],
  openGraph: {
    title: "Contact Us | THEATRE HOTEL d.o.o. Split",
    description: "Get in touch with our team. Phone: +385 92 451 2500, Email: info@theatrehoteldoo.com. 24/7 customer support.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Contact THEATRE HOTEL d.o.o.",
      },
    ],
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
