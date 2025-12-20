"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard";
import { PageHeader, FormSkeleton, EmptyState, ConfirmDialog, useConfirmDialog } from "@/components/shared";
import { ProfileGuard } from "@/components/president";
import { useMyRegistration, useCancelRegistration } from "@/hooks/use-registrations";
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
  Edit,
  Trash2,
  Receipt,
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
          Pending Approval
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
  const cancelMutation = useCancelRegistration();
  const cancelDialog = useConfirmDialog();

  const handleCancel = async () => {
    await cancelMutation.mutateAsync(registrationId);
    router.push("/president/registrations");
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

  // Check if editing is allowed (before deadline and event is open)
  const now = new Date();
  const deadline = registration.event.registrationDeadline
    ? new Date(registration.event.registrationDeadline)
    : null;
  const deadlinePassed = deadline ? now > deadline : false;
  const eventStatus = String(registration.event.status);
  const eventNotOpen = !["UPCOMING", "ONGOING"].includes(eventStatus);
  const canEdit = !deadlinePassed && !eventNotOpen;
  const canCancel = registration.status === "PENDING";

  // Use stored fees (captured at registration time)
  const delegateTotal = registration.delegates.length * registration.delegateFeePerPerson;
  const cookTotal = registration.cooks.length * registration.cookFeePerPerson;
  const grandTotal = registration.totalFee;

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
          {canEdit && (
            <Button variant="outline" asChild className="touch-target">
              <Link href={`/president/registrations/${registration.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </Button>
          )}
          {canCancel && (
            <Button
              variant="destructive"
              onClick={cancelDialog.open}
              disabled={cancelMutation.isPending}
              className="touch-target"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Cancel</span>
            </Button>
          )}
        </div>
      </PageHeader>

      {/* Status Alert */}
      {registration.status === "REJECTED" && registration.remarks && (
        <Card className="border-red-300 bg-red-50/50">
          <CardContent className="flex items-start gap-3 md:gap-4 py-3 md:py-4">
            <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base font-semibold text-red-800">Registration Rejected</p>
              <p className="text-xs md:text-sm text-red-700 mt-1">
                <strong>Reason:</strong> {registration.remarks}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          {/* Event Info */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-base md:text-lg">Event Information</CardTitle>
                {getStatusBadge(registration.status)}
              </div>
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

          {/* Delegates */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5" />
                Delegates ({registration.delegates.length})
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Registered delegates for this event</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              {registration.delegates.length === 0 ? (
                <p className="text-xs md:text-sm text-muted-foreground">No delegates registered.</p>
              ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="min-w-[400px] px-4 md:px-0 md:min-w-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs md:text-sm">#</TableHead>
                          <TableHead className="text-xs md:text-sm">Full Name</TableHead>
                          <TableHead className="text-xs md:text-sm">Nickname</TableHead>
                          <TableHead className="text-xs md:text-sm">Age</TableHead>
                          <TableHead className="text-xs md:text-sm">Gender</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registration.delegates.map((delegate, index) => (
                          <TableRow key={delegate.id}>
                            <TableCell className="text-xs md:text-sm font-medium">{index + 1}</TableCell>
                            <TableCell className="text-xs md:text-sm">{delegate.fullName}</TableCell>
                            <TableCell className="text-xs md:text-sm">{delegate.nickname || "-"}</TableCell>
                            <TableCell className="text-xs md:text-sm">{delegate.age}</TableCell>
                            <TableCell className="text-xs md:text-sm">{formatGender(delegate.gender)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cooks */}
          {registration.cooks.length > 0 && (
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <ChefHat className="h-4 w-4 md:h-5 md:w-5" />
                  Cooks ({registration.cooks.length})
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">Registered cooks for this event</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="min-w-[400px] px-4 md:px-0 md:min-w-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs md:text-sm">#</TableHead>
                          <TableHead className="text-xs md:text-sm">Full Name</TableHead>
                          <TableHead className="text-xs md:text-sm">Nickname</TableHead>
                          <TableHead className="text-xs md:text-sm">Age</TableHead>
                          <TableHead className="text-xs md:text-sm">Gender</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registration.cooks.map((cook, index) => (
                          <TableRow key={cook.id}>
                            <TableCell className="text-xs md:text-sm font-medium">{index + 1}</TableCell>
                            <TableCell className="text-xs md:text-sm">{cook.fullName}</TableCell>
                            <TableCell className="text-xs md:text-sm">{cook.nickname || "-"}</TableCell>
                            <TableCell className="text-xs md:text-sm">{cook.age}</TableCell>
                            <TableCell className="text-xs md:text-sm">{formatGender(cook.gender)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Fee Summary */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Receipt className="h-4 w-4 md:h-5 md:w-5" />
                Fee Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3 w-3 md:h-4 md:w-4" />
                    Delegates ({registration.delegates.length})
                  </span>
                  <span>{formatCurrency(delegateTotal)}</span>
                </div>
                {registration.cooks.length > 0 && (
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <ChefHat className="h-3 w-3 md:h-4 md:w-4" />
                      Cooks ({registration.cooks.length})
                    </span>
                    <span>{formatCurrency(cookTotal)}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-3 md:pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-semibold">Total Amount</span>
                  <span className="text-lg md:text-xl font-bold text-primary">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                *Fees recorded at {registration.isPreRegistration ? "pre-registration" : "on-site"} rate
              </p>
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Church</span>
                <span className="font-medium">{registration.church.name}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Submitted</span>
                <span className="font-medium">
                  {format(new Date(registration.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
              {registration.reviewedAt && (
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <span className="text-muted-foreground">Reviewed</span>
                  <span className="font-medium">
                    {format(new Date(registration.reviewedAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        open={cancelDialog.isOpen}
        onOpenChange={cancelDialog.setIsOpen}
        title="Cancel Registration"
        description="Are you sure you want to cancel this registration? This action cannot be undone."
        confirmLabel="Cancel Registration"
        onConfirm={handleCancel}
        variant="destructive"
        isLoading={cancelMutation.isPending}
      />
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
