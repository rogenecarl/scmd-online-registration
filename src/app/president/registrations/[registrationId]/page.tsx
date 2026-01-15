"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { PageHeader, FormSkeleton, EmptyState, ConfirmDialog, useConfirmDialog } from "@/components/shared";
import { ProfileGuard } from "@/components/president";
import { useMyRegistration, useCancelBatch } from "@/hooks/use-registrations";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChefHat,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Receipt,
  Package,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import type { RegistrationStatus, Gender } from "@/lib/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

function getStatusBadge(status: RegistrationStatus) {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Approved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
  }
}

function formatGender(gender: Gender): string {
  return gender === "MALE" ? "Male" : "Female";
}

function RegistrationDetailContent() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;

  const { data: registration, isLoading, error } = useMyRegistration(registrationId);
  const cancelBatchMutation = useCancelBatch();
  const cancelDialog = useConfirmDialog();

  const handleCancelBatch = async (batchId: string) => {
    await cancelBatchMutation.mutateAsync(batchId);
    // If the entire registration is deleted (last batch), go back to list
    if (registration?.batches.length === 1) {
      router.push("/president/registrations");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Registration Details" description="Loading..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="space-y-4 md:space-y-6">
        <PageHeader title="Registration Details">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </PageHeader>
        <EmptyState
          icon={AlertCircle}
          title="Registration not found"
          description={error?.message || "The registration you're looking for doesn't exist."}
        />
      </div>
    );
  }

  // Check if adding more is allowed (before event starts and event is open)
  const now = new Date();
  const eventStarted = registration.event.startDate
    ? now >= new Date(registration.event.startDate)
    : false;
  const eventStatus = String(registration.event.status);
  const eventNotOpen = !["UPCOMING", "ONGOING"].includes(eventStatus);
  const canAddMore = !eventStarted && !eventNotOpen;

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader
        title="Registration Details"
        description={`Registration for ${registration.event.name}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => router.back()} className="touch-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          {canAddMore && (
            <Button asChild className="touch-target">
              <Link href={`/president/registrations/${registration.id}/add-batch`}>
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Add More</span>
              </Link>
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          {/* Event Info */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Event Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold">{registration.event.name}</h3>
                </div>
                <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
                    <span>{registration.event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" />
                    <span>
                      {format(new Date(registration.event.startDate), "MMM d")} -{" "}
                      {format(new Date(registration.event.endDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Batches */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Package className="h-4 w-4 md:h-5 md:w-5" />
                Registration Batches ({registration.batches.length})
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Each batch is reviewed separately by the admin
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <Accordion type="single" collapsible className="w-full" defaultValue="batch-0">
                {registration.batches.map((batch, index) => (
                  <AccordionItem key={batch.id} value={`batch-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-1 items-center justify-between pr-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">Batch #{batch.batchNumber}</span>
                          {getStatusBadge(batch.status)}
                        </div>
                        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {batch._count.delegates}
                          </span>
                          <span className="flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            {batch._count.cooks}
                          </span>
                          <span>{formatCurrency(batch.totalFee)}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {/* Batch Status Alert */}
                        {batch.status === "REJECTED" && batch.remarks && (
                          <div className="rounded-lg border border-red-300 bg-red-50/50 p-3">
                            <div className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-red-800">Rejected</p>
                                <p className="text-xs text-red-700 mt-1">{batch.remarks}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Batch Info */}
                        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                          <div>
                            <span className="text-muted-foreground">Submitted:</span>
                            <span className="ml-2 font-medium">
                              {format(new Date(batch.createdAt), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fee Type:</span>
                            <span className="ml-2 font-medium">
                              {batch.isPreRegistration ? "Pre-Registration" : "On-Site"}
                            </span>
                          </div>
                        </div>

                        {/* Delegates */}
                        {batch.delegates.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Delegates ({batch.delegates.length})
                            </h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="text-xs">#</TableHead>
                                    <TableHead className="text-xs">Full Name</TableHead>
                                    <TableHead className="text-xs">Nickname</TableHead>
                                    <TableHead className="text-xs">Age</TableHead>
                                    <TableHead className="text-xs">Gender</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {batch.delegates.map((delegate, i) => (
                                    <TableRow key={delegate.id}>
                                      <TableCell className="text-xs">{i + 1}</TableCell>
                                      <TableCell className="text-xs">{delegate.fullName}</TableCell>
                                      <TableCell className="text-xs">{delegate.nickname || "-"}</TableCell>
                                      <TableCell className="text-xs">{delegate.age}</TableCell>
                                      <TableCell className="text-xs">{formatGender(delegate.gender)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}

                        {/* Cooks */}
                        {batch.cooks.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <ChefHat className="h-4 w-4" />
                              Cooks ({batch.cooks.length})
                            </h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="text-xs">#</TableHead>
                                    <TableHead className="text-xs">Full Name</TableHead>
                                    <TableHead className="text-xs">Nickname</TableHead>
                                    <TableHead className="text-xs">Age</TableHead>
                                    <TableHead className="text-xs">Gender</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {batch.cooks.map((cook, i) => (
                                    <TableRow key={cook.id}>
                                      <TableCell className="text-xs">{i + 1}</TableCell>
                                      <TableCell className="text-xs">{cook.fullName}</TableCell>
                                      <TableCell className="text-xs">{cook.nickname || "-"}</TableCell>
                                      <TableCell className="text-xs">{cook.age}</TableCell>
                                      <TableCell className="text-xs">{formatGender(cook.gender)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}

                        {/* Batch Fee Summary */}
                        <div className="rounded-lg bg-muted/50 p-3 space-y-2 text-xs md:text-sm">
                          <div className="flex justify-between">
                            <span>Delegates ({batch._count.delegates} x {formatCurrency(batch.delegateFeePerPerson)})</span>
                            <span>{formatCurrency(batch._count.delegates * batch.delegateFeePerPerson)}</span>
                          </div>
                          {batch._count.cooks > 0 && (
                            <div className="flex justify-between">
                              <span>Cooks ({batch._count.cooks} x {formatCurrency(batch.cookFeePerPerson)})</span>
                              <span>{formatCurrency(batch._count.cooks * batch.cookFeePerPerson)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Batch Total</span>
                            <span>{formatCurrency(batch.totalFee)}</span>
                          </div>
                        </div>

                        {/* Batch Actions */}
                        {batch.status === "PENDING" && canAddMore && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link href={`/president/registrations/${registration.id}/batch/${batch.id}/edit`}>
                                <Edit className="mr-1 h-3 w-3" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancelDialog.open()}
                              disabled={cancelBatchMutation.isPending}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Cancel
                            </Button>
                            <ConfirmDialog
                              open={cancelDialog.isOpen}
                              onOpenChange={cancelDialog.setIsOpen}
                              title="Cancel Batch"
                              description={
                                registration.batches.length === 1
                                  ? "This is the only batch. Cancelling it will delete the entire registration. Are you sure?"
                                  : "Are you sure you want to cancel this batch? This action cannot be undone."
                              }
                              confirmLabel="Cancel Batch"
                              onConfirm={() => handleCancelBatch(batch.id)}
                              variant="destructive"
                              isLoading={cancelBatchMutation.isPending}
                            />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Overall Summary */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Receipt className="h-4 w-4 md:h-5 md:w-5" />
                Overall Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Batches</span>
                  <span className="font-medium">{registration.batches.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Delegates</span>
                  <span className="font-medium">{registration.totalDelegates}</span>
                </div>
                {registration.totalCooks > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Cooks</span>
                    <span className="font-medium">{registration.totalCooks}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3 space-y-2 text-xs md:text-sm">
                <div className="flex justify-between text-emerald-600">
                  <span>Approved</span>
                  <span className="font-medium">
                    {registration.totalApprovedDelegates} delegates
                    {registration.totalApprovedCooks > 0 && `, ${registration.totalApprovedCooks} cooks`}
                  </span>
                </div>
                {registration.hasPendingBatch && (
                  <div className="flex justify-between text-yellow-600">
                    <span>Pending</span>
                    <span className="font-medium">
                      {registration.totalDelegates - registration.totalApprovedDelegates} delegates
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-sm md:text-base font-semibold">Total Amount</span>
                  <span className="text-lg md:text-xl font-bold text-primary">
                    {formatCurrency(registration.totalFee)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Church Info */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Registration Info</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Church</span>
                <span className="font-medium">{registration.church.name}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">First Submitted</span>
                <span className="font-medium">
                  {format(new Date(registration.createdAt), "MMM d, yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationDetailPage() {
  return (
    <ProfileGuard>
      <RegistrationDetailContent />
    </ProfileGuard>
  );
}
