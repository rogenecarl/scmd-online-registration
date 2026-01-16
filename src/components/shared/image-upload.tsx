"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile, deleteFile, getPathFromUrl, type UploadFolder } from "@/lib/supabase-storage";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder: UploadFolder;
  disabled?: boolean;
  className?: string;
  aspectRatio?: "square" | "video" | "banner";
  placeholder?: string;
  /** When true, file is stored locally instead of uploading immediately. Use onFileSelect to get the File. */
  deferUpload?: boolean;
  /** Called when a file is selected in deferred mode */
  onFileSelect?: (file: File | null) => void;
  /** Local preview URL for deferred mode (blob URL) */
  previewUrl?: string | null;
}

// Allowed file types and max size
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({
  value,
  onChange,
  folder,
  disabled = false,
  className,
  aspectRatio = "banner",
  placeholder = "Click to upload or drag and drop",
  deferUpload = false,
  onFileSelect,
  previewUrl,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[3/1]",
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

  // Handle file selection in deferred mode
  const handleDeferredFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      onChange(blobUrl); // Store blob URL as value for preview
      onFileSelect?.(file);
    },
    [onChange, onFileSelect]
  );

  // Handle immediate upload
  const handleImmediateUpload = useCallback(
    async (file: File) => {
      setError(null);
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsUploading(true);

      try {
        const result = await uploadFile(file, folder);

        if (!result.success) {
          setError(result.error);
          return;
        }

        // Delete old file if exists
        if (value && !value.startsWith("blob:")) {
          const oldPath = getPathFromUrl(value);
          if (oldPath) {
            await deleteFile(oldPath);
          }
        }

        onChange(result.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, value, onChange]
  );

  // Main file handler
  const handleFile = useCallback(
    (file: File) => {
      if (deferUpload) {
        handleDeferredFile(file);
      } else {
        handleImmediateUpload(file);
      }
    },
    [deferUpload, handleDeferredFile, handleImmediateUpload]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

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
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRemove = async () => {
    if (deferUpload) {
      // In deferred mode, just clear the preview
      if (value && value.startsWith("blob:")) {
        URL.revokeObjectURL(value);
      }
      onChange(null);
      onFileSelect?.(null);
    } else {
      // In immediate mode, delete from storage
      if (value && !value.startsWith("blob:")) {
        const path = getPathFromUrl(value);
        if (path) {
          await deleteFile(path);
        }
      }
      onChange(null);
    }
  };

  // Determine what to display
  const displayUrl = previewUrl || value;
  const hasImage = !!displayUrl;

  // Clean up blob URLs when component unmounts or value changes
  useEffect(() => {
    return () => {
      if (value && value.startsWith("blob:")) {
        URL.revokeObjectURL(value);
      }
    };
  }, [value]);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          aspectClasses[aspectRatio],
          dragActive && !disabled && "border-primary bg-primary/5",
          !hasImage && !dragActive && "border-muted-foreground/25",
          hasImage && "border-transparent",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={disabled ? undefined : handleDrop}
      >
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl!}
              alt="Uploaded image"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  <span className="ml-1">Change</span>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                  <span className="ml-1">Remove</span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8" />
                <span className="text-sm">{placeholder}</span>
                <span className="text-xs text-muted-foreground">
                  JPEG, PNG, WebP up to 5MB
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
    </div>
  );
}
