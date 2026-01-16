"use client";

import { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  ImageIcon,
  Sparkles,
  Pencil,
  Trash2,
  Check,
  X,
  AlertCircle,
  Camera,
  FileText,
  Users,
  UsersRound,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { extractPersonsFromImageAction } from "@/actions/ai";
import type { PersonFormData, PersonType } from "./person-dialog";

// Allowed file types
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type ExtractedPerson = {
  fullName: string;
  nickname: string | null;
  age: number;
  gender: "MALE" | "FEMALE";
};

type Step = "upload" | "confirm" | "extracting" | "preview";

interface ImageExtractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: PersonType;
  onExtracted: (persons: PersonFormData[]) => void;
}

const typeConfig = {
  delegate: {
    icon: Users,
    label: "Delegates",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  sibling: {
    icon: UsersRound,
    label: "Siblings",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  cook: {
    icon: ChefHat,
    label: "Cooks",
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
};

export function ImageExtractDialog({
  open,
  onOpenChange,
  type,
  onExtracted,
}: ImageExtractDialogProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  const [step, setStep] = useState<Step>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [extractedPersons, setExtractedPersons] = useState<ExtractedPerson[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ExtractedPerson | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep("upload");
      setImageFile(null);
      setImagePreview(null);
      setError(null);
      setExtractedPersons([]);
      setEditingIndex(null);
      setEditForm(null);
    }
    onOpenChange(newOpen);
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload JPEG, PNG, or WebP images.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Maximum size is 5MB.";
    }
    return null;
  };

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setStep("confirm");
  }, []);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Extract persons from image
  const handleExtract = async () => {
    if (!imageFile) return;

    setStep("extracting");
    setError(null);

    try {
      const base64 = await fileToBase64(imageFile);
      const result = await extractPersonsFromImageAction({
        imageBase64: base64,
        mimeType: imageFile.type,
        personType: type,
      });

      if (!result.success) {
        setError(result.error);
        setStep("confirm");
        return;
      }

      setExtractedPersons(result.data);
      setStep("preview");
    } catch (err) {
      console.error("Extraction error:", err);
      setError("Failed to extract data. Please try again.");
      setStep("confirm");
    }
  };

  // Edit person
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...extractedPersons[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editingIndex === null || !editForm) return;

    const updated = [...extractedPersons];
    updated[editingIndex] = editForm;
    setExtractedPersons(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  // Remove person
  const removePerson = (index: number) => {
    setExtractedPersons((prev) => prev.filter((_, i) => i !== index));
  };

  // Add all to form
  const handleAddAll = () => {
    const formData: PersonFormData[] = extractedPersons.map((p) => ({
      fullName: p.fullName,
      nickname: p.nickname ?? "",
      age: p.age,
      gender: p.gender,
    }));
    onExtracted(formData);
    handleOpenChange(false);
  };

  // Go back to upload
  const handleBack = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setStep("upload");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            Import {config.label} from Image
          </DialogTitle>
          <DialogDescription>
            Upload a photo of your {config.label.toLowerCase()} list and we&apos;ll extract the
            information automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto py-4">
          {/* Step: Upload */}
          {step === "upload" && (
            <div className="space-y-4">
              {/* Upload Area */}
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full bg-muted p-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">
                      JPEG, PNG, or WebP (max 5MB)
                    </p>
                  </div>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Tips */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Tips for best results
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    Good lighting, no shadows on the list
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    Flat surface, avoid wrinkles or folds
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    Clear handwriting or printed text
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    Format: Full Name, Nickname, Age, Gender
                  </li>
                </ul>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step: Confirm */}
          {step === "confirm" && imagePreview && (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative rounded-lg overflow-hidden border bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Uploaded list"
                  className="w-full max-h-64 object-contain"
                />
              </div>

              {/* Confirmation Message */}
              <Alert className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/50">
                <Sparkles className="h-4 w-4 text-violet-600" />
                <AlertDescription className="text-violet-700 dark:text-violet-300">
                  Ready to extract {config.label.toLowerCase()} information from this image?
                  <br />
                  <span className="text-sm opacity-80">
                    This will use AI to read and extract the data.
                  </span>
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step: Extracting */}
          {step === "extracting" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="relative">
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-6">
                  <Sparkles className="h-8 w-8 text-violet-600 animate-pulse" />
                </div>
                <Loader2 className="absolute -top-1 -right-1 h-6 w-6 text-violet-600 animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-medium">Extracting {config.label.toLowerCase()}...</p>
                <p className="text-sm text-muted-foreground">
                  AI is reading your image
                </p>
              </div>
            </div>
          )}

          {/* Step: Preview */}
          {step === "preview" && (
            <div className="space-y-4">
              {/* Success Message */}
              <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50">
                <Check className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-700 dark:text-emerald-300">
                  Found {extractedPersons.length} {extractedPersons.length === 1 ? "person" : "people"}!
                  Review and edit if needed, then add them to your list.
                </AlertDescription>
              </Alert>

              {/* Extracted Data Table */}
              {extractedPersons.length > 0 ? (
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Nickname</TableHead>
                        <TableHead className="w-16">Age</TableHead>
                        <TableHead className="w-24">Gender</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {extractedPersons.map((person, index) => (
                        <TableRow key={index}>
                          {editingIndex === index ? (
                            // Edit Mode
                            <>
                              <TableCell className="font-medium text-muted-foreground">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={editForm?.fullName ?? ""}
                                  onChange={(e) =>
                                    setEditForm((prev) =>
                                      prev ? { ...prev, fullName: e.target.value } : null
                                    )
                                  }
                                  className="h-8"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={editForm?.nickname ?? ""}
                                  onChange={(e) =>
                                    setEditForm((prev) =>
                                      prev
                                        ? { ...prev, nickname: e.target.value || null }
                                        : null
                                    )
                                  }
                                  className="h-8"
                                  placeholder="Optional"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={editForm?.age ?? ""}
                                  onChange={(e) =>
                                    setEditForm((prev) =>
                                      prev
                                        ? { ...prev, age: parseInt(e.target.value) || 0 }
                                        : null
                                    )
                                  }
                                  className="h-8 w-16"
                                  min={1}
                                  max={120}
                                />
                              </TableCell>
                              <TableCell>
                                <select
                                  value={editForm?.gender ?? "MALE"}
                                  onChange={(e) =>
                                    setEditForm((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            gender: e.target.value as "MALE" | "FEMALE",
                                          }
                                        : null
                                    )
                                  }
                                  className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                                >
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                </select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                    onClick={saveEdit}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    onClick={cancelEdit}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            // View Mode
                            <>
                              <TableCell className="font-medium text-muted-foreground">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium">{person.fullName}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {person.nickname || "-"}
                              </TableCell>
                              <TableCell>{person.age}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {person.gender.toLowerCase()}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => startEdit(index)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => removePerson(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>All persons have been removed.</p>
                  <Button variant="link" onClick={handleBack} className="mt-2">
                    Upload a different image
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 gap-2 sm:gap-0">
          {step === "upload" && (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          )}

          {step === "confirm" && (
            <>
              <Button variant="outline" onClick={handleBack}>
                Change Image
              </Button>
              <Button onClick={handleExtract} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Extract {config.label}
              </Button>
            </>
          )}

          {step === "extracting" && (
            <Button variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </Button>
          )}

          {step === "preview" && (
            <>
              <Button variant="outline" onClick={handleBack}>
                Upload Different Image
              </Button>
              <Button
                onClick={handleAddAll}
                disabled={extractedPersons.length === 0}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                Add {extractedPersons.length} {config.label}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
