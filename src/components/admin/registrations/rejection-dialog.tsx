"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, XCircle } from "lucide-react";

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (remarks: string) => void | Promise<void>;
  isLoading?: boolean;
}

export function RejectionDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: RejectionDialogProps) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!remarks.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }
    if (remarks.trim().length < 10) {
      setError("Reason must be at least 10 characters");
      return;
    }
    setError("");
    await onConfirm(remarks.trim());
    setRemarks("");
  };

  const handleClose = () => {
    if (!isLoading) {
      setRemarks("");
      setError("");
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative z-50 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-lg font-semibold">Reject Registration</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Please provide a reason for rejecting this registration. This will be
          visible to the church president.
        </p>

        <div className="space-y-2">
          <Label htmlFor="remarks">Rejection Reason</Label>
          <Textarea
            id="remarks"
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter the reason for rejection..."
            rows={4}
            disabled={isLoading}
            className={error ? "border-destructive" : ""}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
