import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "THEATRE HOTEL d.o.o. Privacy Policy. Learn how we collect, use, and protect your personal information. GDPR compliant data protection practices for our Split, Croatia hotel.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
