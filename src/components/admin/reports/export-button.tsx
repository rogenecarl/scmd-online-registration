"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import type { ExportData, ExportRow } from "@/actions/dashboard";
import { format } from "date-fns";

interface ExportButtonProps {
  data: ExportData | undefined;
  isLoading: boolean;
  disabled?: boolean;
  filename?: string;
}

/**
 * Convert export data to CSV format
 */
function convertToCSV(rows: ExportRow[]): string {
  if (rows.length === 0) {
    return "";
  }

  // Define CSV headers
  const headers = [
    "Division",
    "Church",
    "Event",
    "Event Start Date",
    "Event End Date",
    "Event Location",
    "Batch #",
    "Batch Date",
    "Batch Status",
    "Fee Type",
    "Reviewed At",
    "Reviewed By",
    "Rejection Remarks",
    "Person Type",
    "Full Name",
    "Nickname",
    "Gender",
    "Age",
    "Delegate Count",
    "Cook Count",
    "Total Fee",
  ];

  // Convert rows to CSV format
  const csvRows = rows.map((row) => {
    return [
      escapeCSV(row.divisionName),
      escapeCSV(row.churchName),
      escapeCSV(row.eventName),
      format(new Date(row.eventStartDate), "yyyy-MM-dd"),
      format(new Date(row.eventEndDate), "yyyy-MM-dd"),
      escapeCSV(row.eventLocation),
      row.batchNumber.toString(),
      format(new Date(row.batchCreatedAt), "yyyy-MM-dd HH:mm:ss"),
      row.batchStatus,
      row.isPreRegistration ? "Pre-Registration" : "On-Site",
      row.reviewedAt
        ? format(new Date(row.reviewedAt), "yyyy-MM-dd HH:mm:ss")
        : "",
      row.reviewedBy || "",
      escapeCSV(row.rejectionRemarks || ""),
      row.personType,
      escapeCSV(row.personFullName),
      escapeCSV(row.personNickname || ""),
      row.personGender,
      row.personAge.toString(),
      row.delegateCount.toString(),
      row.cookCount.toString(),
      row.totalFee.toFixed(2),
    ].join(",");
  });

  return [headers.join(","), ...csvRows].join("\n");
}

/**
 * Escape special characters for CSV
 */
function escapeCSV(value: string): string {
  if (!value) return "";
  // If the value contains comma, newline, or quotes, wrap in quotes and escape existing quotes
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Trigger file download in browser
 */
function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ExportButton({
  data,
  isLoading,
  disabled,
  filename = "registrations-export",
}: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.rows.length === 0) return;

    const csvContent = convertToCSV(data.rows);
    const timestamp = format(new Date(), "yyyy-MM-dd-HHmmss");
    downloadCSV(csvContent, `${filename}-${timestamp}.csv`);
  };

  const hasData = data && data.rows.length > 0;

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isLoading || !hasData}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download CSV
        </>
      )}
    </Button>
  );
}

/**
 * Standalone export button that triggers export mutation
 */
interface ExportTriggerButtonProps {
  onExport: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ExportTriggerButton({
  onExport,
  isLoading,
  disabled,
}: ExportTriggerButtonProps) {
  return (
    <Button
      onClick={onExport}
      disabled={disabled || isLoading}
      variant="outline"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Generate Export
        </>
      )}
    </Button>
  );
}
