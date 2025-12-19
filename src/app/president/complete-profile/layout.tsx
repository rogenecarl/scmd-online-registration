import { requireRole } from "@/lib/auth-server";

export default async function CompleteProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only check role, not church assignment
  await requireRole("PRESIDENT");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container max-w-4xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">SCMD Events</h1>
          <p className="mt-2 text-muted-foreground">
            Church Event Registration System
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
