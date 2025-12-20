import { ResponsiveLayout } from "@/components/dashboard";
import {
  presidentNavSections,
  presidentBottomNavItems,
  presidentMoreNavItems,
} from "@/components/president";
import { requireRole } from "@/lib/auth-server";

export default async function PresidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side role check - redirects if not PRESIDENT role
  await requireRole("PRESIDENT");

  return (
    <ResponsiveLayout
      sections={presidentNavSections}
      brandName="SCMD Events"
      headerTitle="Church Dashboard"
      headerDescription="Manage your church registrations"
      bottomNavItems={presidentBottomNavItems}
      bottomNavMoreItems={presidentMoreNavItems}
    >
      {children}
    </ResponsiveLayout>
  );
}
