"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdminDeleteParticipant } from "@/hooks/use-registrations";
import { Loader2, TriangleAlert } from "lucide-react";
import type { AdminApprovedParticipant } from "@/actions/approval";

const CONFIRM_TEXT = "DELETE";

interface DeleteParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: AdminApprovedParticipant | null;
}

export function DeleteParticipantDialog({
  open,
  onOpenChange,
  participant,
}: DeleteParticipantDialogProps) {
  const deleteMutation = useAdminDeleteParticipant();
  const [confirmText, setConfirmText] = useState("");

  const isConfirmed = confirmText === CONFIRM_TEXT;

  const typeLabel =
    participant?.type === "cook"
      ? "Cook"
      : participant?.type === "sibling"
        ? "Delegate (Sibling)"
        : "Delegate";

  const handleDelete = async () => {
    if (!participant || !isConfirmed) return;

    try {
      await deleteMutation.mutateAsync({
        id: participant.id,
        type: participant.type,
      });
      onOpenChange(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setConfirmText("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="h-5 w-5" />
            Delete Participant
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>{participant?.fullName}</strong> ({typeLabel}) from{" "}
            <strong>{participant?.churchName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <p className="text-sm text-muted-foreground">
            Type <strong>{CONFIRM_TEXT}</strong> to confirm deletion.
          </p>
          <Input
            placeholder={`Type ${CONFIRM_TEXT} to confirm`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || deleteMutation.isPending}
          >
            {deleteMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete Participant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
