"use client";

import { useParams, redirect } from "next/navigation";
import { useEffect } from "react";

// This page is deprecated - registration editing is now done at the batch level.
// Redirect to the registration detail page where users can edit individual batches.
export default function EditRegistrationPage() {
  const params = useParams();
  const registrationId = params.registrationId as string;

  useEffect(() => {
    redirect(`/president/registrations/${registrationId}`);
  }, [registrationId]);

  return null;
}
