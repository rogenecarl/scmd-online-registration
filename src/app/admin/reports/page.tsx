"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
} from "@/components/dashboard";
import { Skeleton } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  ReportFilters,
  ExportButton,
  ExportTriggerButton,
  type ReportFiltersState,
} from "@/components/admin/reports";
import {
  useEventsForExport,
  useDivisionsForExport,
  useExportRegistrations,
} from "@/hooks/use-dashboard";
import type { ExportData, ExportFilters } from "@/actions/dashboard";
import { format } from "date-fns";
import {
  FileSpreadsheet,
  Users,
  ChefHat,
  DollarSign,
  FileText,
  AlertCircle,
  BarChart3,
} from "lucide-react";

export default function ReportsPage() {
  const [filters, setFilters] = useState<ReportFiltersState>({});
  const [exportData, setExportData] = useState<ExportData | undefined>();

  const { data: events = [], isLoading: isLoadingEvents } =
    useEventsForExport();
  const { data: divisions = [], isLoading: isLoadingDivisions } =
    useDivisionsForExport();
  const exportMutation = useExportRegistrations();

  const handleGenerateExport = useCallback(() => {
    // Convert filters to the format expected by the API
    const exportFilters: ExportFilters = {
      eventId: filters.eventId,
      status: filters.status,
      divisionId: filters.divisionId,
      dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
      dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined,
    };

    exportMutation.mutate(exportFilters, {
      onSuccess: (data) => {
        setExportData(data);
      },
    });
  }, [filters, exportMutation]);

  // Preview columns for the data table
  const previewColumns = [
    {
      key: "division",
      header: "Division",
      render: (row: ExportData["rows"][0]) => (
        <span className="font-medium">{row.divisionName}</span>
      ),
    },
    {
      key: "church",
      header: "Church",
      render: (row: ExportData["rows"][0]) => row.churchName,
    },
    {
      key: "event",
      header: "Event",
      render: (row: ExportData["rows"][0]) => row.eventName,
    },
    {
      key: "personType",
      header: "Type",
      render: (row: ExportData["rows"][0]) => (
        <Badge
          variant={row.personType === "Delegate" ? "default" : "secondary"}
        >
          {row.personType}
        </Badge>
      ),
    },
    {
      key: "personName",
      header: "Name",
      render: (row: ExportData["rows"][0]) => row.personFullName,
    },
    {
      key: "gender",
      header: "Gender",
      render: (row: ExportData["rows"][0]) => row.personGender,
    },
    {
      key: "status",
      header: "Status",
      render: (row: ExportData["rows"][0]) => (
        <Badge
          variant={
            row.batchStatus === "APPROVED"
              ? "default"
              : row.batchStatus === "PENDING"
                ? "secondary"
                : "destructive"
          }
        >
          {row.batchStatus}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Export"
        description="Generate and download registration reports"
      />

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Export Filters
          </CardTitle>
          <CardDescription>
            Select filters to narrow down the export data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReportFilters
            filters={filters}
            onFiltersChange={setFilters}
            events={events}
            divisions={divisions}
            isLoadingEvents={isLoadingEvents}
            isLoadingDivisions={isLoadingDivisions}
          />

          <div className="flex items-center gap-4 pt-4 border-t">
            <ExportTriggerButton
              onExport={handleGenerateExport}
              isLoading={exportMutation.isPending}
            />
            {exportData && (
              <ExportButton
                data={exportData}
                isLoading={false}
                filename="scmd-registrations"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats Card */}
      {exportData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Export Summary
            </CardTitle>
            <CardDescription>
              Generated on{" "}
              {format(new Date(exportData.generatedAt), "MMM d, yyyy h:mm a")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                icon={FileText}
                title="Batches"
                value={exportData.summary.totalBatches}
                description="Total registration batches"
              />
              <SummaryCard
                icon={Users}
                title="Delegates"
                value={exportData.summary.totalDelegates}
                description="Total registered delegates"
              />
              <SummaryCard
                icon={ChefHat}
                title="Cooks"
                value={exportData.summary.totalCooks}
                description="Total registered cooks"
              />
              <SummaryCard
                icon={DollarSign}
                title="Total Fees"
                value={`₱${exportData.summary.totalFees.toLocaleString()}`}
                description="Sum of all registration fees"
              />
            </div>

            {/* Status Breakdown */}
            {Object.keys(exportData.summary.byStatus).length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">
                  Batches by Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(exportData.summary.byStatus).map(
                    ([status, count]) => (
                      <Badge
                        key={status}
                        variant={
                          status === "APPROVED"
                            ? "default"
                            : status === "PENDING"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-sm px-3 py-1"
                      >
                        {status}: {count}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Division Breakdown */}
            {Object.keys(exportData.summary.byDivision).length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">
                  Batches by Division
                </h4>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(exportData.summary.byDivision).map(
                    ([division, count]) => (
                      <div
                        key={division}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span className="text-sm">{division}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview Table */}
      {exportData && exportData.rows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
            <CardDescription>
              Showing first {Math.min(exportData.rows.length, 20)} of{" "}
              {exportData.rows.length} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={previewColumns}
              data={exportData.rows.slice(0, 20)}
              emptyMessage="No data to display"
            />
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!exportData && !exportMutation.isPending && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Export Generated</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Use the filters above to select the data you want to export, then
              click &quot;Generate Export&quot; to preview and download the
              data.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {exportMutation.isPending && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {exportMutation.isError && (
        <Card className="border-destructive">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Export Failed</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {exportMutation.error?.message ||
                "An error occurred while generating the export. Please try again."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: typeof Users;
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
