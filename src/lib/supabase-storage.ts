import { supabase } from "./supabase-client";

const BUCKET_NAME = "ScmdStorage";

export type UploadFolder = "banners" | "receipts";

interface UploadResult {
  success: true;
  url: string;
  path: string;
}

interface UploadError {
  success: false;
  error: string;
}

export type UploadResponse = UploadResult | UploadError;

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param folder - The folder to upload to (banners or receipts)
 * @param fileName - Optional custom file name (defaults to timestamp + original name)
 */
export async function uploadFile(
  file: File,
  folder: UploadFolder,
  fileName?: string
): Promise<UploadResponse> {
  try {
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
      };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: "File size too large. Maximum size is 5MB.",
      };
    }

    // Generate unique file name
    const timestamp = Date.now();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = fileName
      ? `${fileName.replace(/[^a-zA-Z0-9-_]/g, "_")}.${ext}`
      : `${timestamp}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `${folder}/${safeName}`;

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return {
        success: false,
        error: uploadError.message || "Failed to upload file",
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}

/**
 * Delete a file from Supabase Storage
 * @param path - The file path to delete
 */
export async function deleteFile(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

/**
 * Get the file path from a Supabase storage URL
 * @param url - The full URL
 */
export function getPathFromUrl(url: string): string | null {
  try {
    const bucketUrl = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const index = url.indexOf(bucketUrl);
    if (index === -1) return null;
    return url.substring(index + bucketUrl.length);
  } catch {
    return null;
  }
}
