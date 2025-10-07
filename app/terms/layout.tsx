import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "THEATRE HOTEL d.o.o. Terms of Service. Read our booking terms, cancellation policy, guest conduct rules, and legal terms for stays at our Split, Croatia hotel.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
