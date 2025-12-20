"use client";

import { use } from "react";
import { RegistrationDetail } from "@/components/admin/registrations";

interface RegistrationDetailPageProps {
  params: Promise<{ registrationId: string }>;
}

export default function RegistrationDetailPage({
  params,
}: RegistrationDetailPageProps) {
  const { registrationId } = use(params);

  return <RegistrationDetail registrationId={registrationId} />;
}
