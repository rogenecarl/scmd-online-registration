"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateEvent, useUpdateEvent } from "@/hooks/use-events";
import { createEventSchema, type EventFormInput } from "@/schemas";
import { Loader2, Calendar, DollarSign, Info } from "lucide-react";
import { format } from "date-fns";
import type { EventStatus } from "@/lib/generated/prisma";

interface EventFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    description: string | null;
    location: string;
    logo: string | null;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    preRegistrationFee: number;
    preRegistrationStart: Date;
    preRegistrationEnd: Date;
    onsiteRegistrationFee: number;
    cookRegistrationFee: number;
    status: EventStatus;
  };
}

const STATUS_OPTIONS: { value: EventStatus; label: string }[] = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

// Helper to format date for datetime-local input
function formatDateForInput(date: Date): string {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

export function EventForm({ mode, initialData }: EventFormProps) {
  const router = useRouter();
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();

  const form = useForm<EventFormInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      location: initialData?.location ?? "",
      logo: initialData?.logo ?? "",
      startDate: initialData?.startDate ?? new Date(),
      endDate: initialData?.endDate ?? new Date(),
      registrationDeadline: initialData?.registrationDeadline ?? new Date(),
      preRegistrationFee: initialData?.preRegistrationFee ?? 0,
      preRegistrationStart: initialData?.preRegistrationStart ?? new Date(),
      preRegistrationEnd: initialData?.preRegistrationEnd ?? new Date(),
      onsiteRegistrationFee: initialData?.onsiteRegistrationFee ?? 0,
      cookRegistrationFee: initialData?.cookRegistrationFee ?? 0,
      status: initialData?.status ?? "UPCOMING",
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: EventFormInput) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: data });
      }
      router.push("/admin/events");
    } catch (error) {
      // Handle field errors from mutation
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof EventFormInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>
              Enter the event name, description, and location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., SCMD Youth Congress 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Convention Center, City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event description..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/logo.png"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional URL to the event logo image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "edit" && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Event Dates */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Event Dates</CardTitle>
            </div>
            <CardDescription>
              Set the event dates and registration deadline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? formatDateForInput(new Date(field.value))
                            : ""
                        }
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? formatDateForInput(new Date(field.value))
                            : ""
                        }
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="registrationDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Deadline *</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={
                        field.value
                          ? formatDateForInput(new Date(field.value))
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    The final date when registrations will be accepted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Pre-Registration Period */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Pre-Registration Period</CardTitle>
            </div>
            <CardDescription>
              Define the early bird registration period with discounted fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="preRegistrationStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Registration Start *</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? formatDateForInput(new Date(field.value))
                            : ""
                        }
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preRegistrationEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Registration End *</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? formatDateForInput(new Date(field.value))
                            : ""
                        }
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Registration Fees */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Registration Fees</CardTitle>
            </div>
            <CardDescription>
              Set the registration fees in Philippine Peso (whole numbers only)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="preRegistrationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Registration Fee *</FormLabel>
                    <FormControl>
                      <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <span className="text-muted-foreground">₱</span>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          placeholder="0"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Early bird delegate fee</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onsiteRegistrationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>On-Site Registration Fee *</FormLabel>
                    <FormControl>
                      <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <span className="text-muted-foreground">₱</span>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          placeholder="0"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Regular delegate fee</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cookRegistrationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Registration Fee *</FormLabel>
                    <FormControl>
                      <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <span className="text-muted-foreground">₱</span>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          placeholder="0"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Fee per cook</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Event" : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
