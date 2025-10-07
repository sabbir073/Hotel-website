import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "THEATRE HOTEL d.o.o. Privacy Policy. Learn how we collect, use, and protect your personal information. GDPR compliant data protection practices for our Split, Croatia hotel.",
  url: "/privacy",
  keywords: ["privacy policy", "data protection", "GDPR", "hotel privacy"],
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
