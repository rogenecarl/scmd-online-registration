"use client";

import { useForm, useFieldArray, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormActions } from "@/components/shared";
import {
  useCreateRegistration,
  useUpdateRegistration,
} from "@/hooks/use-registrations";
import {
  createRegistrationSchema,
  type CreateRegistrationInput,
  type UpdateRegistrationInput,
} from "@/schemas";
import { PersonForm } from "./person-form";
import { FeeSummary } from "./fee-summary";
import { ImageUpload } from "@/components/shared/image-upload";
import { Loader2, Plus, Users, ChefHat, AlertCircle, Receipt } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EventForRegistration, RegistrationWithDetails } from "@/actions/registrations";

interface RegistrationFormProps {
  mode: "create" | "edit";
  event: EventForRegistration;
  initialData?: RegistrationWithDetails;
}

const emptyDelegate = {
  fullName: "",
  nickname: "",
  age: "" as unknown as number,
  gender: "" as "MALE" | "FEMALE",
};

const emptyCook = {
  fullName: "",
  nickname: "",
  age: "" as unknown as number,
  gender: "" as "MALE" | "FEMALE",
};

export function RegistrationForm({ mode, event, initialData }: RegistrationFormProps) {
  const router = useRouter();
  const createMutation = useCreateRegistration();
  const updateMutation = useUpdateRegistration();

  // Always use the create schema since it's a superset of update schema
  // Type assertion needed due to Zod transform in delegate/cook age fields
  const form = useForm<CreateRegistrationInput>({
    resolver: zodResolver(createRegistrationSchema) as unknown as Resolver<CreateRegistrationInput>,
    defaultValues: {
      eventId: event.id,
      delegates: initialData?.delegates.map((d) => ({
        fullName: d.fullName,
        nickname: d.nickname ?? "",
        age: d.age,
        gender: d.gender,
      })) ?? [{ ...emptyDelegate }],
      cooks: initialData?.cooks.map((c) => ({
        fullName: c.fullName,
        nickname: c.nickname ?? "",
        age: c.age,
        gender: c.gender,
      })) ?? [],
      receiptImage: initialData?.receiptImage ?? null,
    },
  });

  const {
    fields: delegateFields,
    append: appendDelegate,
    remove: removeDelegate,
  } = useFieldArray({
    control: form.control,
    name: "delegates",
  });

  const {
    fields: cookFields,
    append: appendCook,
    remove: removeCook,
  } = useFieldArray({
    control: form.control,
    name: "cooks",
  });

  const isPending = createMutation.isPending || updateMutation.isPending;
  const watchedDelegates = useWatch({ control: form.control, name: "delegates" });
  const watchedCooks = useWatch({ control: form.control, name: "cooks" });

  const onSubmit = async (data: CreateRegistrationInput) => {
    try {
      if (mode === "create") {
        const result = await createMutation.mutateAsync(data);
        router.push(`/president/registrations/${result.id}`);
      } else if (initialData) {
        const updateData: UpdateRegistrationInput = {
          delegates: data.delegates,
          cooks: data.cooks,
          receiptImage: data.receiptImage,
        };
        await updateMutation.mutateAsync({ id: initialData.id, input: updateData });
        router.push(`/president/registrations/${initialData.id}`);
      }
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof CreateRegistrationInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            {/* Event Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs md:text-sm">
                You are registering for <strong>{event.name}</strong>.{" "}
                {event.isPreRegistration
                  ? "Early bird rates apply."
                  : "Standard rates apply."}
              </AlertDescription>
            </Alert>

            {/* Delegates Section */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Users className="h-4 w-4 md:h-5 md:w-5" />
                      Delegates
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Add the delegates from your church who will attend
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendDelegate({ ...emptyDelegate })}
                    disabled={delegateFields.length >= 100}
                    className="touch-target w-full sm:w-auto"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Delegate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                {delegateFields.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-8 text-center">
                    <Users className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No delegates added yet. At least one delegate is required.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => appendDelegate({ ...emptyDelegate })}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add First Delegate
                    </Button>
                  </div>
                ) : (
                  delegateFields.map((field, index) => (
                    <PersonForm
                      key={field.id}
                      type="delegates"
                      index={index}
                      control={form.control}
                      onRemove={() => removeDelegate(index)}
                      canRemove={delegateFields.length > 1}
                    />
                  ))
                )}
                {form.formState.errors.delegates && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.delegates.message ||
                      form.formState.errors.delegates.root?.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Cooks Section */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <ChefHat className="h-4 w-4 md:h-5 md:w-5" />
                      Cooks
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Optionally add cooks who will prepare food for your delegation
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCook({ ...emptyCook })}
                    disabled={cookFields.length >= 50}
                    className="touch-target w-full sm:w-auto"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Cook
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                {cookFields.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-8 text-center">
                    <ChefHat className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No cooks added. This section is optional.
                    </p>
                  </div>
                ) : (
                  cookFields.map((field, index) => (
                    <PersonForm
                      key={field.id}
                      type="cooks"
                      index={index}
                      control={form.control}
                      onRemove={() => removeCook(index)}
                      canRemove={true}
                    />
                  ))
                )}
                {form.formState.errors.cooks && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.cooks.message ||
                      form.formState.errors.cooks.root?.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Payment Receipt Section */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Receipt className="h-4 w-4 md:h-5 md:w-5" />
                  Payment Receipt
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Upload a photo or screenshot of your payment receipt for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                <FormField
                  control={form.control}
                  name="receiptImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          folder="receipts"
                          aspectRatio="video"
                          placeholder="Upload payment receipt"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Accepted formats: JPEG, PNG, WebP (max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Fee Summary Sidebar */}
          <div className="lg:col-span-1">
            <FeeSummary
              delegateCount={watchedDelegates?.length ?? 0}
              cookCount={watchedCooks?.length ?? 0}
              delegateFee={event.currentFee}
              cookFee={event.cookRegistrationFee}
              feeType={event.feeType === "pre-registration" ? "Pre-Registration" : "On-Site"}
            />

            {/* Submit Buttons */}
            <div className="mt-4 md:mt-6">
              <FormActions>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                  className="touch-target"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="touch-target"
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === "create" ? "Submit Registration" : "Update Registration"}
                </Button>
              </FormActions>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
