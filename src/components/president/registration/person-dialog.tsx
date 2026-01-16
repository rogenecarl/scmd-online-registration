"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GenderEnum } from "@/schemas/enums";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UsersRound, ChefHat, Loader2 } from "lucide-react";

// Schema for person form
const personFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  nickname: z
    .string()
    .min(1, "Nickname is required")
    .max(50, "Nickname must be 50 characters or less")
    .trim(),
  age: z
    .number({ message: "Age must be a valid number" })
    .min(1, "Age must be at least 1")
    .max(120, "Age must be 120 or less"),
  gender: GenderEnum,
});

export type PersonFormData = z.infer<typeof personFormSchema>;

export type PersonType = "delegate" | "sibling" | "cook";

interface PersonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: PersonType;
  mode: "add" | "edit";
  initialData?: PersonFormData;
  onSubmit: (data: PersonFormData) => void;
}

const typeConfig = {
  delegate: {
    icon: Users,
    label: "Delegate",
    description: "Add a delegate who will attend the event",
    color: "text-primary",
  },
  sibling: {
    icon: UsersRound,
    label: "Sibling",
    description: "Add a sibling to get discounted rates (3+ siblings required)",
    color: "text-emerald-600",
  },
  cook: {
    icon: ChefHat,
    label: "Cook",
    description: "Add a cook who will prepare food for the delegation",
    color: "text-amber-600",
  },
};

export function PersonDialog({
  open,
  onOpenChange,
  type,
  mode,
  initialData,
  onSubmit,
}: PersonDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personFormSchema),
    defaultValues: initialData ?? {
      fullName: "",
      nickname: "",
      age: 0,
      gender: undefined,
    },
  });

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (open) {
      if (initialData) {
        form.reset(initialData);
      } else {
        form.reset({
          fullName: "",
          nickname: "",
          age: 0,
          gender: undefined,
        });
      }
    }
  }, [open, initialData, form]);

  const handleSubmit = async (data: PersonFormData) => {
    setIsSubmitting(true);
    try {
      onSubmit(data);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            {mode === "add" ? `Add ${config.label}` : `Edit ${config.label}`}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Dela Cruz"
                      autoComplete="off"
                      {...field}
                    />
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
                  <FormLabel>Nickname *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="For ID"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        placeholder="25"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? 0 : parseInt(value, 10));
                        }}
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
                    <FormLabel>Gender *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "add" ? `Add ${config.label}` : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
