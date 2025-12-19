import { Sidebar, Header } from "@/components/dashboard";
import { presidentNavSections } from "@/components/president";
import { requireRole } from "@/lib/auth-server";

export default async function PresidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side role check - redirects if not PRESIDENT role
  await requireRole("PRESIDENT");

  return (
    <div className="flex min-h-screen">
      <Sidebar sections={presidentNavSections} brandName="SCMD Events" />
      <div className="flex-1 flex flex-col">
        <Header title="Church Dashboard" description="Manage your church registrations" />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
