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
  useCreateBatch,
  useUpdateBatch,
} from "@/hooks/use-registrations";
import {
  createRegistrationSchema,
  createBatchSchema,
  updateBatchSchema,
  type CreateRegistrationInput,
  type CreateBatchInput,
  type UpdateBatchInput,
} from "@/schemas";
import { PersonForm } from "./person-form";
import { FeeSummary } from "./fee-summary";
import { ImageUpload } from "@/components/shared/image-upload";
import { Loader2, Plus, Users, ChefHat, AlertCircle, Receipt, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { EventForRegistration, BatchWithDetails } from "@/actions/registrations";

// Form mode types
type FormMode = "create" | "add-batch" | "edit-batch";

interface RegistrationFormProps {
  mode: FormMode;
  event: EventForRegistration;
  registrationId?: string; // Required for add-batch and edit-batch modes
  batchData?: BatchWithDetails; // Required for edit-batch mode
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

// Combined form schema type
type FormInput = CreateRegistrationInput | CreateBatchInput | UpdateBatchInput;

export function RegistrationForm({ mode, event, registrationId, batchData }: RegistrationFormProps) {
  const router = useRouter();
  const createRegistrationMutation = useCreateRegistration();
  const createBatchMutation = useCreateBatch();
  const updateBatchMutation = useUpdateBatch();

  // Determine which schema to use based on mode
  const getSchema = () => {
    switch (mode) {
      case "create":
        return createRegistrationSchema;
      case "add-batch":
        return createBatchSchema;
      case "edit-batch":
        return updateBatchSchema;
    }
  };

  // Get default values based on mode
  const getDefaultValues = (): FormInput => {
    switch (mode) {
      case "create":
        return {
          eventId: event.id,
          delegates: [{ ...emptyDelegate }],
          cooks: [],
          receiptImage: "",
        };
      case "add-batch":
        return {
          registrationId: registrationId!,
          delegates: [{ ...emptyDelegate }],
          cooks: [],
          receiptImage: "",
        };
      case "edit-batch":
        return {
          delegates: batchData?.delegates.map((d) => ({
            fullName: d.fullName,
            nickname: d.nickname ?? "",
            age: d.age,
            gender: d.gender,
          })) ?? [],
          cooks: batchData?.cooks.map((c) => ({
            fullName: c.fullName,
            nickname: c.nickname ?? "",
            age: c.age,
            gender: c.gender,
          })) ?? [],
          receiptImage: batchData?.receiptImage ?? "",
        };
    }
  };

  const form = useForm<FormInput>({
    resolver: zodResolver(getSchema()) as unknown as Resolver<FormInput>,
    defaultValues: getDefaultValues(),
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

  const isPending =
    createRegistrationMutation.isPending ||
    createBatchMutation.isPending ||
    updateBatchMutation.isPending;

  const watchedDelegates = useWatch({ control: form.control, name: "delegates" });
  const watchedCooks = useWatch({ control: form.control, name: "cooks" });

  const onSubmit = async (data: FormInput) => {
    try {
      switch (mode) {
        case "create": {
          const result = await createRegistrationMutation.mutateAsync(data as CreateRegistrationInput);
          router.push(`/president/registrations/${result.id}`);
          break;
        }
        case "add-batch": {
          const batchInput: CreateBatchInput = {
            registrationId: registrationId!,
            delegates: data.delegates,
            cooks: data.cooks,
            receiptImage: (data as CreateBatchInput).receiptImage,
          };
          await createBatchMutation.mutateAsync(batchInput);
          router.push(`/president/registrations/${registrationId}`);
          break;
        }
        case "edit-batch": {
          await updateBatchMutation.mutateAsync({
            batchId: batchData!.id,
            input: data as UpdateBatchInput,
          });
          router.push(`/president/registrations/${registrationId}`);
          break;
        }
      }
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof FormInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  // Form title and description based on mode
  const getFormInfo = () => {
    switch (mode) {
      case "create":
        return {
          title: "Register for Event",
          description: `You are registering for ${event.name}.`,
          submitLabel: "Submit Registration",
        };
      case "add-batch":
        return {
          title: "Add More Delegates/Cooks",
          description: `Adding to your existing registration for ${event.name}.`,
          submitLabel: "Submit Batch",
        };
      case "edit-batch":
        return {
          title: `Edit Batch #${batchData?.batchNumber}`,
          description: `Editing batch for ${event.name}.`,
          submitLabel: "Update Batch",
        };
    }
  };

  const formInfo = getFormInfo();

  // Determine minimum delegates required
  const minDelegatesRequired = mode === "create" ? 1 : 0;

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
                {formInfo.description}{" "}
                {event.isPreRegistration
                  ? "Early bird rates apply."
                  : "Standard rates apply."}
              </AlertDescription>
            </Alert>

            {/* Info about existing registration */}
            {mode === "add-batch" && event.totalApprovedDelegates > 0 && (
              <Alert variant="default">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs md:text-sm">
                  You already have {event.totalApprovedDelegates} approved delegates
                  {event.totalApprovedCooks > 0 && ` and ${event.totalApprovedCooks} approved cooks`}.
                  This new batch will be reviewed separately.
                </AlertDescription>
              </Alert>
            )}

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
                      {mode === "create"
                        ? "Add the delegates from your church who will attend"
                        : "Add delegates for this batch"}
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
                      {minDelegatesRequired > 0
                        ? "No delegates added yet. At least one delegate is required."
                        : "No delegates added yet."}
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
                      control={form.control as never}
                      onRemove={() => removeDelegate(index)}
                      canRemove={delegateFields.length > minDelegatesRequired}
                    />
                  ))
                )}
                {form.formState.errors.delegates && (
                  <p className="text-sm text-destructive">
                    {(form.formState.errors.delegates as { message?: string })?.message ||
                      (form.formState.errors.delegates as { root?: { message?: string } })?.root?.message}
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
                      control={form.control as never}
                      onRemove={() => removeCook(index)}
                      canRemove={true}
                    />
                  ))
                )}
                {form.formState.errors.cooks && (
                  <p className="text-sm text-destructive">
                    {(form.formState.errors.cooks as { message?: string })?.message ||
                      (form.formState.errors.cooks as { root?: { message?: string } })?.root?.message}
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
                  <span className="text-destructive">*</span>
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Upload a photo or screenshot of your payment receipt for verification.
                  <span className="font-medium text-destructive"> This is required.</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                <FormField
                  control={form.control as never}
                  name="receiptImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value as string | null | undefined}
                          onChange={field.onChange}
                          folder="receipts"
                          aspectRatio="video"
                          placeholder="Upload payment receipt (required)"
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
                  {formInfo.submitLabel}
                </Button>
              </FormActions>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
