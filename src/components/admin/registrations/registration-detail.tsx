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
  useBatch,
  useApproveBatch,
  useRejectBatch,
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
  UsersRound,
  ChefHat,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  Receipt,
  ExternalLink,
  Hash,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BatchDetailProps {
  batchId: string;
}

// Renamed from RegistrationDetail to BatchDetail but keeping export name for compatibility
export function RegistrationDetail({ registrationId }: { registrationId: string }) {
  return <BatchDetail batchId={registrationId} />;
}

export function BatchDetail({ batchId }: BatchDetailProps) {
  const router = useRouter();
  const { data: batch, isLoading, error } = useBatch(batchId);
  const approveMutation = useApproveBatch();
  const rejectMutation = useRejectBatch();

  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const handleApprove = async () => {
    await approveMutation.mutateAsync(batchId);
    setShowApprovalDialog(false);
  };

  const handleReject = async (remarks: string) => {
    await rejectMutation.mutateAsync({ batchId, remarks });
    setShowRejectionDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !batch) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-destructive mb-4" />
        <h2 className="text-base md:text-lg font-semibold text-center">Batch Not Found</h2>
        <p className="text-sm md:text-base text-muted-foreground mb-4 text-center">
          {error?.message || "The batch you're looking for doesn't exist."}
        </p>
        <Button variant="outline" onClick={() => router.back()} className="touch-target">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  // Use stored fees (captured at registration time)
  const delegateFee = batch.delegateFeePerPerson;
  const cookFee = batch.cookFeePerPerson;
  const totalFees = batch.totalFee;

  // Count regular delegates vs siblings
  const regularDelegates = batch.delegates.filter((d) => !d.isSibling);
  const siblings = batch.delegates.filter((d) => d.isSibling);
  const regularCount = regularDelegates.length;
  const siblingCount = siblings.length;

  // Get sibling discount fee from event
  const siblingDiscountFee = batch.isPreRegistration
    ? batch.registration.event.preRegistrationSiblingDiscount
    : batch.registration.event.onsiteSiblingDiscount;

  // Sibling discount applies when 3+ siblings are registered AND discount fee is available
  const siblingDiscountApplies = siblingCount >= 3 && siblingDiscountFee > 0;

  // Calculate fees breakdown
  const regularDelegateFees = regularCount * delegateFee;
  const siblingFees = siblingDiscountApplies
    ? siblingCount * siblingDiscountFee
    : siblingCount * delegateFee; // If less than 3 siblings, they pay regular rate
  const totalCookFees = batch.cooks.length * cookFee;

  // Calculate potential savings
  const potentialSavings = siblingDiscountApplies
    ? siblingCount * (delegateFee - siblingDiscountFee)
    : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 md:gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0 touch-target -ml-2 md:ml-0">
            <Link href="/admin/registrations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold">Batch #{batch.batchNumber}</h1>
              <Badge variant="outline" className="hidden sm:flex">
                <Hash className="h-3 w-3 mr-1" />
                {batch.id.slice(0, 8)}
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Submitted on {formatDateTime(batch.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {batch.status === "PENDING" && (
          <div className="flex gap-2 [&>button]:flex-1 md:[&>button]:flex-none">
            <Button
              variant="outline"
              onClick={() => setShowRejectionDialog(true)}
              className="touch-target"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => setShowApprovalDialog(true)}
              className="bg-green-600 hover:bg-green-700 text-white touch-target"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </div>

      {/* Status Banner */}
      {batch.status !== "PENDING" && (
        <Card className={
          batch.status === "APPROVED"
            ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
            : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
        }>
          <CardContent className="py-3 md:py-4">
            <div className="flex items-start gap-3 md:gap-4">
              {batch.status === "APPROVED" ? (
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <p className="text-sm md:text-base font-semibold">
                  Batch {batch.status.toLowerCase()}
                </p>
                {batch.reviewer && (
                  <p className="text-xs md:text-sm text-muted-foreground">
                    by {batch.reviewer.name} on{" "}
                    {batch.reviewedAt
                      ? formatDateTime(batch.reviewedAt)
                      : "Unknown date"}
                  </p>
                )}
                {batch.status === "REJECTED" && batch.remarks && (
                  <p className="text-xs md:text-sm mt-1">
                    <strong>Reason:</strong> {batch.remarks}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {/* Event Information */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              Event Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Event Name</p>
              <p className="text-sm md:text-base font-medium">{batch.registration.event.name}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
              <span className="text-xs md:text-sm">{batch.registration.event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
              <span className="text-xs md:text-sm">
                {formatDate(batch.registration.event.startDate)} -{" "}
                {formatDate(batch.registration.event.endDate)}
              </span>
            </div>
            <div>
              <EventStatusBadge status={batch.registration.event.status} />
            </div>
          </CardContent>
        </Card>

        {/* Church & President Information */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Church className="h-4 w-4 md:h-5 md:w-5" />
              Church Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Church Name</p>
              <p className="text-sm md:text-base font-medium">{batch.registration.church.name}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Division</p>
              <p className="text-sm md:text-base">{batch.registration.church.division.name}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
              <span className="text-sm md:text-base font-medium">{batch.registration.president.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
              <span className="text-xs md:text-sm break-all">{batch.registration.president.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Summary */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Fee Summary</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Registration fees based on{" "}
            {batch.isPreRegistration ? "pre-registration" : "on-site"} rates
            (recorded at registration time)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-4">
          {/* Fee Breakdown */}
          <div className="space-y-3">
            {/* Regular Delegates */}
            {regularCount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Regular Delegates</p>
                    <p className="text-xs text-muted-foreground">
                      {regularCount} × {formatCurrency(delegateFee)}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(regularDelegateFees)}</p>
              </div>
            )}

            {/* Siblings */}
            {siblingCount > 0 && (
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                siblingDiscountApplies
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                  : "bg-muted/50"
              }`}>
                <div className="flex items-center gap-3">
                  <UsersRound className={`h-5 w-5 shrink-0 ${
                    siblingDiscountApplies ? "text-emerald-600" : "text-primary"
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${
                        siblingDiscountApplies ? "text-emerald-700 dark:text-emerald-300" : ""
                      }`}>
                        Siblings
                      </p>
                      {siblingDiscountApplies && (
                        <Badge variant="outline" className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">
                          Discounted
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs ${
                      siblingDiscountApplies ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}>
                      {siblingCount} × {formatCurrency(siblingDiscountApplies ? siblingDiscountFee : delegateFee)}
                    </p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${
                  siblingDiscountApplies ? "text-emerald-700 dark:text-emerald-300" : ""
                }`}>
                  {formatCurrency(siblingFees)}
                </p>
              </div>
            )}

            {/* Show placeholder if no delegates */}
            {regularCount === 0 && siblingCount === 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">No Delegates</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">{formatCurrency(0)}</p>
              </div>
            )}

            {/* Cooks */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <ChefHat className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Cooks</p>
                  <p className="text-xs text-muted-foreground">
                    {batch.cooks.length} × {formatCurrency(cookFee)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold">{formatCurrency(totalCookFees)}</p>
            </div>
          </div>

          {/* Savings Badge */}
          {potentialSavings > 0 && (
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3 text-center">
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Saved {formatCurrency(potentialSavings)} with sibling discount!
              </p>
            </div>
          )}

          {/* Total */}
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-semibold">Total Amount</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {formatCurrency(totalFees)}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <p className="text-lg md:text-xl font-bold">{batch.delegates.length}</p>
              <p className="text-xs text-muted-foreground">Total Delegates</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <p className="text-lg md:text-xl font-bold">{siblingCount}</p>
              <p className="text-xs text-muted-foreground">Siblings</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <p className="text-lg md:text-xl font-bold">{batch.cooks.length}</p>
              <p className="text-xs text-muted-foreground">Cooks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Receipt */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Receipt className="h-4 w-4 md:h-5 md:w-5" />
            Payment Receipt
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Payment receipt image uploaded by the president
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          {batch.receiptImage ? (
            <div className="space-y-3 md:space-y-4">
              <div className="relative aspect-video max-w-lg overflow-hidden rounded-lg border">
                <Image
                  src={batch.receiptImage}
                  alt="Payment receipt"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              </div>
              <Button variant="outline" size="sm" asChild className="touch-target">
                <a
                  href={batch.receiptImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Image
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 md:py-8 text-center">
              <Receipt className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mb-3 md:mb-4" />
              <p className="text-sm md:text-base text-muted-foreground">No payment receipt uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delegates */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Users className="h-4 w-4 md:h-5 md:w-5" />
              Delegates
            </CardTitle>
            <Badge variant="secondary">{batch.delegates.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[400px] px-4 md:px-0 md:min-w-0">
              <DelegatesTable delegates={batch.delegates} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cooks */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <ChefHat className="h-4 w-4 md:h-5 md:w-5" />
              Cooks
            </CardTitle>
            <Badge variant="secondary">{batch.cooks.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[400px] px-4 md:px-0 md:min-w-0">
              <CooksTable cooks={batch.cooks} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Status */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Batch Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <RegistrationStatusBadge status={batch.status} />
            <span className="text-xs md:text-sm text-muted-foreground">
              Last updated: {formatDateTime(batch.updatedAt)}
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
