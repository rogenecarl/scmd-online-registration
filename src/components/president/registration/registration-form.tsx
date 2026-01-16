"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
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
  type CreateRegistrationInput,
  type CreateBatchInput,
  type UpdateBatchInput,
} from "@/schemas";
import { PersonDialog, type PersonFormData, type PersonType } from "./person-dialog";
import { PersonTable } from "./person-table";
import { ImageExtractDialog } from "./image-extract-dialog";
import { FeeSummary } from "./fee-summary";
import { ImageUpload } from "@/components/shared/image-upload";
import { uploadFile } from "@/lib/supabase-storage";
import { Loader2, AlertCircle, Receipt, Info, UsersRound } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegistrationFormStore } from "@/stores/registration-form-store";
import type { EventForRegistration, BatchWithDetails } from "@/actions/registrations";

// Form mode types
type FormMode = "create" | "add-batch" | "edit-batch";

interface RegistrationFormProps {
  mode: FormMode;
  event: EventForRegistration;
  registrationId?: string;
  batchData?: BatchWithDetails;
}

// Internal form schema - accepts both blob URLs (preview) and http URLs (uploaded)
const formSchema = z.object({
  receiptPreview: z.string().min(1, "Payment receipt is required"),
});

type FormInput = z.infer<typeof formSchema>;

// Dialog state type
type DialogState = {
  open: boolean;
  type: PersonType;
  mode: "add" | "edit";
  editIndex?: number;
};

export function RegistrationForm({ mode, event, registrationId, batchData }: RegistrationFormProps) {
  const router = useRouter();
  const createRegistrationMutation = useCreateRegistration();
  const createBatchMutation = useCreateBatch();
  const updateBatchMutation = useUpdateBatch();

  // Zustand store
  const store = useRegistrationFormStore();

  // Track hydration state
  const [isHydrated, setIsHydrated] = useState(false);

  // File state for deferred upload (not persisted - lost on refresh)
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Track if we have an existing uploaded receipt (for edit mode)
  const existingReceiptUrl = useRef<string | null>(batchData?.receiptImage ?? null);

  // Determine current sibling discount fee based on registration period
  const currentSiblingDiscountFee = event.isPreRegistration
    ? event.preRegistrationSiblingDiscount
    : event.onsiteSiblingDiscount;

  // Show sibling section only when sibling discount is available
  const hasSiblingDiscount = currentSiblingDiscountFee > 0;

  // Dialog state
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    type: "delegate",
    mode: "add",
  });

  // Image extract dialog state
  const [imageExtractDialog, setImageExtractDialog] = useState<{
    open: boolean;
    type: PersonType;
  }>({
    open: false,
    type: "delegate",
  });

  // Form for receipt preview
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiptPreview: batchData?.receiptImage ?? "",
    },
  });

  // Handle hydration and initialize store
  useEffect(() => {
    setIsHydrated(true);

    if (mode === "edit-batch" && batchData) {
      // For edit mode, always use batch data
      const delegates = batchData.delegates
        .filter((d) => !d.isSibling)
        .map((d) => ({
          fullName: d.fullName,
          nickname: d.nickname ?? "",
          age: d.age,
          gender: d.gender as "MALE" | "FEMALE",
        }));
      const siblings = batchData.delegates
        .filter((d) => d.isSibling)
        .map((d) => ({
          fullName: d.fullName,
          nickname: d.nickname ?? "",
          age: d.age,
          gender: d.gender as "MALE" | "FEMALE",
        }));
      const cooks = batchData.cooks.map((c) => ({
        fullName: c.fullName,
        nickname: c.nickname ?? "",
        age: c.age,
        gender: c.gender as "MALE" | "FEMALE",
      }));

      store.initializeWithBatchData({
        delegates,
        siblings,
        cooks,
        receiptImage: "", // Don't store receipt URL in Zustand
      });
      store.setEventId(event.id);
      form.setValue("receiptPreview", batchData.receiptImage ?? "");
      existingReceiptUrl.current = batchData.receiptImage ?? null;
    } else {
      // For create/add-batch mode, check if stored data is for this event
      if (store.eventId !== event.id) {
        // Different event, clear the store and set new event ID
        store.clearForm();
        store.setEventId(event.id);
      }
      // Note: Receipt is not restored since File objects can't be persisted
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id, mode]);

  // Watch receipt preview for validation
  const receiptPreview = form.watch("receiptPreview");

  const isPending =
    createRegistrationMutation.isPending ||
    createBatchMutation.isPending ||
    updateBatchMutation.isPending ||
    isUploading;

  // Sibling discount applies when 3+ siblings are registered
  const siblingDiscountApplies = store.siblings.length >= 3 && currentSiblingDiscountFee > 0;

  // Open dialog for adding
  const openAddDialog = (type: PersonType) => {
    setDialogState({ open: true, type, mode: "add" });
  };

  // Open dialog for editing
  const openEditDialog = (type: PersonType, index: number) => {
    setDialogState({ open: true, type, mode: "edit", editIndex: index });
  };

  // Get current person data for editing
  const getEditData = (): PersonFormData | undefined => {
    if (dialogState.mode !== "edit" || dialogState.editIndex === undefined) return undefined;
    switch (dialogState.type) {
      case "delegate":
        return store.delegates[dialogState.editIndex];
      case "sibling":
        return store.siblings[dialogState.editIndex];
      case "cook":
        return store.cooks[dialogState.editIndex];
    }
  };

  // Handle dialog submit
  const handleDialogSubmit = (data: PersonFormData) => {
    const { type, mode: dialogMode, editIndex } = dialogState;

    if (dialogMode === "add") {
      switch (type) {
        case "delegate":
          store.addDelegate(data);
          break;
        case "sibling":
          store.addSibling(data);
          break;
        case "cook":
          store.addCook(data);
          break;
      }
    } else if (dialogMode === "edit" && editIndex !== undefined) {
      switch (type) {
        case "delegate":
          store.updateDelegate(editIndex, data);
          break;
        case "sibling":
          store.updateSibling(editIndex, data);
          break;
        case "cook":
          store.updateCook(editIndex, data);
          break;
      }
    }
  };

  // Handle remove person
  const handleRemove = (type: PersonType, index: number) => {
    switch (type) {
      case "delegate":
        store.removeDelegate(index);
        break;
      case "sibling":
        store.removeSibling(index);
        break;
      case "cook":
        store.removeCook(index);
        break;
    }
  };

  // Open image extract dialog
  const openImageExtractDialog = (type: PersonType) => {
    setImageExtractDialog({ open: true, type });
  };

  // Handle extracted persons from image
  const handleExtractedPersons = (persons: PersonFormData[]) => {
    const { type } = imageExtractDialog;
    persons.forEach((person) => {
      switch (type) {
        case "delegate":
          store.addDelegate(person);
          break;
        case "sibling":
          store.addSibling(person);
          break;
        case "cook":
          store.addCook(person);
          break;
      }
    });
  };

  // Handle file selection for deferred upload
  const handleFileSelect = (file: File | null) => {
    setReceiptFile(file);
    setUploadError(null);
    // Clear existing receipt URL when a new file is selected
    if (file) {
      existingReceiptUrl.current = null;
    }
  };

  // Validate before submit
  const canSubmit = () => {
    const hasReceipt = !!receiptPreview;
    // If siblings are added, must have at least 3 (for discount to apply)
    const siblingsValid = store.siblings.length === 0 || store.siblings.length >= 3;

    if (mode === "create") {
      return (store.delegates.length > 0 || store.siblings.length >= 3) && hasReceipt && siblingsValid;
    }
    return (store.delegates.length > 0 || store.siblings.length >= 3 || store.cooks.length > 0) && hasReceipt && siblingsValid;
  };

  // Handle form submit
  const onSubmit = async () => {
    // Validation: siblings must be 0 or 3+ (discount requires 3+)
    if (store.siblings.length > 0 && store.siblings.length < 3) {
      form.setError("receiptPreview", {
        type: "manual",
        message: `Siblings must be at least 3 for the discount. Add ${3 - store.siblings.length} more sibling${3 - store.siblings.length > 1 ? "s" : ""} or move them to Delegates.`,
      });
      return;
    }

    // Validation: need at least one person
    if (mode === "create" && store.delegates.length === 0 && store.siblings.length === 0) {
      form.setError("receiptPreview", {
        type: "manual",
        message: "At least one delegate or sibling is required",
      });
      return;
    }
    if (mode !== "create" && store.delegates.length === 0 && store.siblings.length === 0 && store.cooks.length === 0) {
      form.setError("receiptPreview", {
        type: "manual",
        message: "At least one delegate, sibling, or cook is required",
      });
      return;
    }

    try {
      setUploadError(null);
      let receiptImageUrl: string;

      // Upload receipt if we have a new file
      if (receiptFile) {
        setIsUploading(true);
        const uploadResult = await uploadFile(receiptFile, "receipts");
        setIsUploading(false);

        if (!uploadResult.success) {
          setUploadError(uploadResult.error);
          form.setError("receiptPreview", {
            type: "manual",
            message: uploadResult.error,
          });
          return;
        }
        receiptImageUrl = uploadResult.url;
      } else if (existingReceiptUrl.current) {
        // Use existing receipt URL (edit mode without changing receipt)
        receiptImageUrl = existingReceiptUrl.current;
      } else {
        form.setError("receiptPreview", {
          type: "manual",
          message: "Payment receipt is required",
        });
        return;
      }

      // Combine delegates and siblings
      const combinedDelegates = [
        ...store.delegates.map((d) => ({ ...d, isSibling: false })),
        ...store.siblings.map((d) => ({ ...d, isSibling: true })),
      ];

      switch (mode) {
        case "create": {
          const input: CreateRegistrationInput = {
            eventId: event.id,
            delegates: combinedDelegates,
            cooks: store.cooks,
            receiptImage: receiptImageUrl,
          };
          const result = await createRegistrationMutation.mutateAsync(input);
          // Clear store on successful submission
          store.clearForm();
          router.push(`/president/registrations/${result.id}`);
          break;
        }
        case "add-batch": {
          const input: CreateBatchInput = {
            registrationId: registrationId!,
            delegates: combinedDelegates,
            cooks: store.cooks,
            receiptImage: receiptImageUrl,
          };
          await createBatchMutation.mutateAsync(input);
          // Clear store on successful submission
          store.clearForm();
          router.push(`/president/registrations/${registrationId}`);
          break;
        }
        case "edit-batch": {
          const input: UpdateBatchInput = {
            delegates: combinedDelegates,
            cooks: store.cooks,
            receiptImage: receiptImageUrl,
          };
          await updateBatchMutation.mutateAsync({
            batchId: batchData!.id,
            input,
          });
          // Clear store on successful submission
          store.clearForm();
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

  // Form info based on mode
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

  // Show loading state during hydration to prevent flash
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      {/* Person Dialog */}
      <PersonDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        type={dialogState.type}
        mode={dialogState.mode}
        initialData={getEditData()}
        onSubmit={handleDialogSubmit}
      />

      {/* Image Extract Dialog */}
      <ImageExtractDialog
        open={imageExtractDialog.open}
        onOpenChange={(open) => setImageExtractDialog((prev) => ({ ...prev, open }))}
        type={imageExtractDialog.type}
        onExtracted={handleExtractedPersons}
      />

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

              {/* Data restored alert */}
              {mode !== "edit-batch" && (store.delegates.length > 0 || store.siblings.length > 0 || store.cooks.length > 0) && (
                <Alert variant="default" className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
                    Your previous progress has been restored. You can continue where you left off.
                    {!receiptFile && " Note: You may need to re-select your payment receipt."}
                  </AlertDescription>
                </Alert>
              )}

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
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                  <CardTitle className="text-base md:text-lg">Delegates</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    {mode === "create"
                      ? "Add the delegates from your church who will attend"
                      : "Add delegates for this batch"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-2 md:pt-2">
                  <PersonTable
                    type="delegate"
                    persons={store.delegates}
                    onAdd={() => openAddDialog("delegate")}
                    onEdit={(index) => openEditDialog("delegate", index)}
                    onRemove={(index) => handleRemove("delegate", index)}
                    onImportFromImage={() => openImageExtractDialog("delegate")}
                    maxCount={100}
                    emptyMessage={
                      mode === "create"
                        ? "No delegates added yet. At least one delegate or sibling is required."
                        : "No delegates added yet."
                    }
                  />
                </CardContent>
              </Card>

              {/* Siblings Section - Only show when sibling discount is available */}
              {hasSiblingDiscount && (
                <Card className="border-emerald-200 dark:border-emerald-800">
                  <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-base md:text-lg flex items-center gap-2">
                        <UsersRound className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
                        Siblings
                      </CardTitle>
                      <span className="text-xs font-normal text-emerald-600 bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded-full">
                        Discount Available
                      </span>
                    </div>
                    <CardDescription className="text-xs md:text-sm">
                      Add siblings here to get discounted rates. Discount applies when 3 or more siblings are registered.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-2 md:pt-2">
                    {/* Sibling discount alerts */}
                    {store.siblings.length > 0 && store.siblings.length < 3 && (
                      <Alert className="mb-4 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-xs md:text-sm text-amber-700 dark:text-amber-300">
                          Add {3 - store.siblings.length} more sibling{3 - store.siblings.length > 1 ? "s" : ""} to unlock the sibling discount!
                        </AlertDescription>
                      </Alert>
                    )}
                    {siblingDiscountApplies && (
                      <Alert className="mb-4 border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
                        <UsersRound className="h-4 w-4 text-emerald-600" />
                        <AlertDescription className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300">
                          Sibling discount applied! All {store.siblings.length} siblings get the discounted rate.
                        </AlertDescription>
                      </Alert>
                    )}
                    <PersonTable
                      type="sibling"
                      persons={store.siblings}
                      onAdd={() => openAddDialog("sibling")}
                      onEdit={(index) => openEditDialog("sibling", index)}
                      onRemove={(index) => handleRemove("sibling", index)}
                      onImportFromImage={() => openImageExtractDialog("sibling")}
                      maxCount={50}
                      discountApplied={siblingDiscountApplies}
                      emptyMessage="No siblings added yet. Add 3 or more siblings to get the discounted rate."
                    />
                  </CardContent>
                </Card>
              )}

              {/* Cooks Section */}
              <Card>
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                  <CardTitle className="text-base md:text-lg">Cooks</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Optionally add cooks who will prepare food for your delegation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-2 md:pt-2">
                  <PersonTable
                    type="cook"
                    persons={store.cooks}
                    onAdd={() => openAddDialog("cook")}
                    onEdit={(index) => openEditDialog("cook", index)}
                    onRemove={(index) => handleRemove("cook", index)}
                    onImportFromImage={() => openImageExtractDialog("cook")}
                    maxCount={50}
                    emptyMessage="No cooks added. This section is optional."
                  />
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
                    <span className="block mt-1 text-muted-foreground">
                      Receipt will be uploaded when you submit the registration.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <FormField
                    control={form.control}
                    name="receiptPreview"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            folder="receipts"
                            aspectRatio="video"
                            placeholder="Upload payment receipt (required)"
                            disabled={isPending}
                            deferUpload={true}
                            onFileSelect={handleFileSelect}
                          />
                        </FormControl>
                        <FormDescription>
                          Accepted formats: JPEG, PNG, WebP (max 5MB)
                        </FormDescription>
                        <FormMessage />
                        {uploadError && (
                          <p className="text-sm text-destructive">{uploadError}</p>
                        )}
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Fee Summary Sidebar */}
            <div className="lg:col-span-1">
              <FeeSummary
                delegateCount={store.delegates.length}
                siblingCount={store.siblings.length}
                cookCount={store.cooks.length}
                delegateFee={event.currentFee}
                siblingDiscountFee={currentSiblingDiscountFee}
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
                    disabled={isPending || !canSubmit()}
                    className="touch-target"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      formInfo.submitLabel
                    )}
                  </Button>
                </FormActions>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
