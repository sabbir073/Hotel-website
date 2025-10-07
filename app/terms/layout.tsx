import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "THEATRE HOTEL d.o.o. Terms of Service. Read our booking terms, cancellation policy, guest conduct rules, and legal terms for stays at our Split, Croatia hotel.",
  url: "/terms",
  keywords: ["terms of service", "booking terms", "cancellation policy", "hotel terms"],
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
