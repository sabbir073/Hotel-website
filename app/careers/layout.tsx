import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Careers - Join Our Team",
  description: "Join the THEATRE HOTEL d.o.o. family in Split, Croatia. Explore exciting career opportunities in hospitality. We're hiring front desk staff, housekeeping, chefs, management positions. Build your career at Croatia's premier luxury hotel.",
  url: "/careers",
  keywords: [
    "hotel jobs Split",
    "careers Croatia hotel",
    "hospitality jobs Split",
    "hotel employment Croatia",
    "front desk jobs Split",
    "chef jobs Croatia",
    "hotel management careers",
    "work at hotel Split",
    "luxury hotel jobs",
    "Theatre Hotel careers",
  ],
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
