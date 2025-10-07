import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Admin Dashboard",
  description: "Admin area for THEATRE HOTEL d.o.o.",
  url: "/admin",
  noindex: true,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
