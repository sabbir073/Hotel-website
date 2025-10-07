import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Admin Login",
  description: "Admin login for THEATRE HOTEL d.o.o.",
  url: "/admin/login",
  noindex: true,
});

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
