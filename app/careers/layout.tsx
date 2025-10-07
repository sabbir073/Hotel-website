import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Join Our Team",
  description: "Join the THEATRE HOTEL d.o.o. family in Split, Croatia. Explore exciting career opportunities in hospitality. We're hiring front desk staff, housekeeping, chefs, management positions. Build your career at Croatia's premier luxury hotel.",
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
  openGraph: {
    title: "Careers - Join Our Team | THEATRE HOTEL d.o.o.",
    description: "Explore exciting career opportunities at Split's premier luxury hotel. Join our team and build your hospitality career.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Careers at THEATRE HOTEL d.o.o.",
      },
    ],
  },
  alternates: {
    canonical: "https://theatrehoteldoo.com/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
