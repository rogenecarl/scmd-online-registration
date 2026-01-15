import { requireRole } from "@/lib/auth-server";

export default async function CompleteProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only check role, not church assignment
  await requireRole("PRESIDENT");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
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
