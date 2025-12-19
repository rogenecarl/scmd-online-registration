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
      <div className="space-y-6">
        <PageHeader title="Registration Details" description="Loading..." />
        <FormSkeleton />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="space-y-6">
        <PageHeader title="Registration Details">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
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

  const canEdit = registration.status === "PENDING";
  const delegateTotal = registration.delegates.length * registration.event.preRegistrationFee;
  const cookTotal = registration.cooks.length * registration.event.cookRegistrationFee;
  const grandTotal = delegateTotal + cookTotal;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registration Details"
        description={`Registration for ${registration.event.name}`}
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {canEdit && (
            <>
              <Button variant="outline" asChild>
                <Link href={`/president/registrations/${registration.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={cancelDialog.open}
                disabled={cancelMutation.isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </PageHeader>

      {/* Status Alert */}
      {registration.status === "REJECTED" && registration.remarks && (
        <Card className="border-red-300 bg-red-50/50">
          <CardContent className="flex items-start gap-4 py-4">
            <XCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Registration Rejected</p>
              <p className="text-sm text-red-700 mt-1">
                <strong>Reason:</strong> {registration.remarks}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Event Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Information</CardTitle>
                {getStatusBadge(registration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{registration.event.name}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{registration.event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Delegates ({registration.delegates.length})
              </CardTitle>
              <CardDescription>Registered delegates for this event</CardDescription>
            </CardHeader>
            <CardContent>
              {registration.delegates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No delegates registered.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Nickname</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registration.delegates.map((delegate, index) => (
                      <TableRow key={delegate.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{delegate.fullName}</TableCell>
                        <TableCell>{delegate.nickname || "-"}</TableCell>
                        <TableCell>{delegate.age}</TableCell>
                        <TableCell>{formatGender(delegate.gender)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Cooks */}
          {registration.cooks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Cooks ({registration.cooks.length})
                </CardTitle>
                <CardDescription>Registered cooks for this event</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Nickname</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registration.cooks.map((cook, index) => (
                      <TableRow key={cook.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{cook.fullName}</TableCell>
                        <TableCell>{cook.nickname || "-"}</TableCell>
                        <TableCell>{cook.age}</TableCell>
                        <TableCell>{formatGender(cook.gender)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fee Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Fee Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Delegates ({registration.delegates.length})
                  </span>
                  <span>{formatCurrency(delegateTotal)}</span>
                </div>
                {registration.cooks.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <ChefHat className="h-4 w-4" />
                      Cooks ({registration.cooks.length})
                    </span>
                    <span>{formatCurrency(cookTotal)}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                *Estimated based on pre-registration rates
              </p>
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Church</span>
                <span className="font-medium">{registration.church.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submitted</span>
                <span className="font-medium">
                  {format(new Date(registration.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
              {registration.reviewedAt && (
                <div className="flex justify-between">
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
