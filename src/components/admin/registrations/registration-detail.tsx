"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RegistrationStatusBadge, EventStatusBadge } from "@/components/shared/status-badge";
import { DelegatesTable } from "./delegates-table";
import { CooksTable } from "./cooks-table";
import { ApprovalDialog } from "./approval-dialog";
import { RejectionDialog } from "./rejection-dialog";
import {
  useRegistration,
  useApproveRegistration,
  useRejectRegistration,
} from "@/hooks/use-registrations";
import { formatDate, formatDateTime, formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Church,
  User,
  Mail,
  Users,
  ChefHat,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  Receipt,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RegistrationDetailProps {
  registrationId: string;
}

export function RegistrationDetail({ registrationId }: RegistrationDetailProps) {
  const router = useRouter();
  const { data: registration, isLoading, error } = useRegistration(registrationId);
  const approveMutation = useApproveRegistration();
  const rejectMutation = useRejectRegistration();

  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const handleApprove = async () => {
    await approveMutation.mutateAsync(registrationId);
    setShowApprovalDialog(false);
  };

  const handleReject = async (remarks: string) => {
    await rejectMutation.mutateAsync({ registrationId, remarks });
    setShowRejectionDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-lg font-semibold">Registration Not Found</h2>
        <p className="text-muted-foreground mb-4">
          {error?.message || "The registration you're looking for doesn't exist."}
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  // Use stored fees (captured at registration time)
  const delegateFee = registration.delegateFeePerPerson;
  const cookFee = registration.cookFeePerPerson;
  const totalDelegateFees = registration.delegates.length * delegateFee;
  const totalCookFees = registration.cooks.length * cookFee;
  const totalFees = registration.totalFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/registrations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Registration Details</h1>
            <p className="text-muted-foreground">
              Submitted on {formatDateTime(registration.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {registration.status === "PENDING" && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectionDialog(true)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => setShowApprovalDialog(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </div>

      {/* Status Banner */}
      {registration.status !== "PENDING" && (
        <Card className={
          registration.status === "APPROVED"
            ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
            : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
        }>
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              {registration.status === "APPROVED" ? (
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
              <div>
                <p className="font-semibold">
                  Registration {registration.status.toLowerCase()}
                </p>
                {registration.reviewer && (
                  <p className="text-sm text-muted-foreground">
                    by {registration.reviewer.name} on{" "}
                    {registration.reviewedAt
                      ? formatDateTime(registration.reviewedAt)
                      : "Unknown date"}
                  </p>
                )}
                {registration.status === "REJECTED" && registration.remarks && (
                  <p className="text-sm mt-1">
                    <strong>Reason:</strong> {registration.remarks}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Event Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Event Name</p>
              <p className="font-medium">{registration.event.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{registration.event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(registration.event.startDate)} -{" "}
                {formatDate(registration.event.endDate)}
              </span>
            </div>
            <div>
              <EventStatusBadge status={registration.event.status} />
            </div>
          </CardContent>
        </Card>

        {/* Church & President Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5" />
              Church Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Church Name</p>
              <p className="font-medium">{registration.church.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Division</p>
              <p>{registration.church.division.name}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{registration.president.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{registration.president.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Summary</CardTitle>
          <CardDescription>
            Registration fees based on{" "}
            {registration.isPreRegistration ? "pre-registration" : "on-site"} rates
            (recorded at registration time)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{registration.delegates.length}</p>
                <p className="text-sm text-muted-foreground">
                  Delegates @ {formatCurrency(delegateFee)}
                </p>
                <p className="font-medium">{formatCurrency(totalDelegateFees)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <ChefHat className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{registration.cooks.length}</p>
                <p className="text-sm text-muted-foreground">
                  Cooks @ {formatCurrency(cookFee)}
                </p>
                <p className="font-medium">{formatCurrency(totalCookFees)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(totalFees)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Receipt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Receipt
          </CardTitle>
          <CardDescription>
            Payment receipt image uploaded by the president
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registration.receiptImage ? (
            <div className="space-y-4">
              <div className="relative aspect-video max-w-lg overflow-hidden rounded-lg border">
                <Image
                  src={registration.receiptImage}
                  alt="Payment receipt"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={registration.receiptImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Image
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No payment receipt uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delegates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Delegates
            </CardTitle>
            <Badge variant="secondary">{registration.delegates.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <DelegatesTable delegates={registration.delegates} />
        </CardContent>
      </Card>

      {/* Cooks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Cooks
            </CardTitle>
            <Badge variant="secondary">{registration.cooks.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CooksTable cooks={registration.cooks} />
        </CardContent>
      </Card>

      {/* Registration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <RegistrationStatusBadge status={registration.status} />
            <span className="text-muted-foreground">
              Last updated: {formatDateTime(registration.updatedAt)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ApprovalDialog
        open={showApprovalDialog}
        onOpenChange={setShowApprovalDialog}
        onConfirm={handleApprove}
        isLoading={approveMutation.isPending}
      />

      <RejectionDialog
        open={showRejectionDialog}
        onOpenChange={setShowRejectionDialog}
        onConfirm={handleReject}
        isLoading={rejectMutation.isPending}
      />
    </div>
  );
}
