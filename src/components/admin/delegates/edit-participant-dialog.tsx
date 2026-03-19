"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminUpdateParticipant } from "@/hooks/use-registrations";
import { Loader2 } from "lucide-react";
import type { AdminApprovedParticipant } from "@/actions/approval";

type EditParticipantFormValues = {
  fullName: string;
  nickname: string;
  age: number;
  gender: "MALE" | "FEMALE";
};

interface EditParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: AdminApprovedParticipant | null;
}

export function EditParticipantDialog({
  open,
  onOpenChange,
  participant,
}: EditParticipantDialogProps) {
  const updateMutation = useAdminUpdateParticipant();

  const form = useForm<EditParticipantFormValues>({
    defaultValues: {
      fullName: "",
      nickname: "",
      age: 0,
      gender: "MALE",
    },
  });

  useEffect(() => {
    if (participant && open) {
      form.reset({
        fullName: participant.fullName,
        nickname: participant.nickname ?? "",
        age: participant.age,
        gender: participant.gender,
      });
    }
  }, [participant, open, form]);

  const onSubmit = async (data: EditParticipantFormValues) => {
    if (!participant) return;

    try {
      await updateMutation.mutateAsync({
        id: participant.id,
        type: participant.type,
        fullName: data.fullName.trim(),
        nickname: data.nickname.trim(),
        age: Number(data.age),
        gender: data.gender,
      });
      onOpenChange(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
    }
    onOpenChange(newOpen);
  };

  const typeLabel =
    participant?.type === "cook"
      ? "Cook"
      : participant?.type === "sibling"
        ? "Delegate (Sibling)"
        : "Delegate";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Participant</DialogTitle>
          <DialogDescription>
            Edit {typeLabel} from{" "}
            <strong>{participant?.churchName}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter nickname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                rules={{
                  required: "Age is required",
                  min: { value: 1, message: "Age must be at least 1" },
                  max: { value: 120, message: "Age must be 120 or less" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        placeholder="Age"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
