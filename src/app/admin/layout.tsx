import { ResponsiveLayout } from "@/components/dashboard";
import {
  adminNavSections,
  adminBottomNavItems,
  adminMoreNavItems,
} from "@/components/admin";
import { requireRole } from "@/lib/auth-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side role check - redirects if not ADMIN role
  await requireRole("ADMIN");

  return (
    <ResponsiveLayout
      sections={adminNavSections}
      brandName="SCMD Admin"
      headerTitle="Admin Dashboard"
      headerDescription="Manage events, churches, and registrations"
      bottomNavItems={adminBottomNavItems}
      bottomNavMoreItems={adminMoreNavItems}
    >
      {children}
    </ResponsiveLayout>
  );
}
