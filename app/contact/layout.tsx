import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact Us - Get in Touch",
  description: "Contact THEATRE HOTEL d.o.o. Split, Croatia. Get in touch with our team for reservations, inquiries, or assistance. Phone: +385 92 451 2500, Email: info@theatrehoteldoo.com. Located at Matošića ul., Split 21000. 24/7 customer support.",
  url: "/contact",
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
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
