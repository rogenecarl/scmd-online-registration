import { AdminOverview } from "@/components/admin";

export const metadata = {
  title: "Admin Dashboard | SCMD Event Registration",
  description: "Manage event registrations, review delegate submissions, and oversee church coordination.",
};

export default function AdminDashboardPage() {
  return <AdminOverview />;
}
