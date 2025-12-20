"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile, deleteFile, getPathFromUrl, type UploadFolder } from "@/lib/supabase-storage";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder: UploadFolder;
  disabled?: boolean;
  className?: string;
  aspectRatio?: "square" | "video" | "banner";
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder,
  disabled = false,
  className,
  aspectRatio = "banner",
  placeholder = "Click to upload or drag and drop",
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

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      try {
        const result = await uploadFile(file, folder);

        if (!result.success) {
          setError(result.error);
          return;
        }

        // Delete old file if exists
        if (value) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
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
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleRemove = async () => {
    if (value) {
      const path = getPathFromUrl(value);
      if (path) {
        await deleteFile(path);
      }
      onChange(null);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          aspectClasses[aspectRatio],
          dragActive && !disabled && "border-primary bg-primary/5",
          !value && !dragActive && "border-muted-foreground/25",
          value && "border-transparent",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={disabled ? undefined : handleDrop}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
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
