import { supabase, isSupabaseConfigured } from './supabase';

const BUCKET_NAME = 'profile-photos';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export interface UploadResult {
  url: string | null;
  error: string | null;
}

/**
 * Validates file format and file size for avatar uploads.
 */
export function validateProfileImage(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a JPEG, PNG, WebP, or GIF image.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeInMb} MB). Maximum allowed size is 5 MB.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads a profile image to Supabase Storage (profile-photos bucket)
 * or creates a base64 Data URL in offline/guest mode.
 */
export async function uploadProfilePhoto(file: File, userId: string): Promise<UploadResult> {
  const validation = validateProfileImage(file);
  if (!validation.valid) {
    return { url: null, error: validation.error || 'Invalid image file.' };
  }

  // Local/Guest fallback mode using FileReader
  if (!isSupabaseConfigured || userId === 'guest-user-123') {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ url: reader.result as string, error: null });
      };
      reader.onerror = () => {
        resolve({ url: null, error: 'Failed to read image file.' });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filePath = `${userId}/profile.${fileExt}`;

    // Upload with upsert enabled so existing photo is replaced
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Supabase Storage Upload Error:', uploadError);
      return { url: null, error: uploadError.message || 'Failed to upload photo to storage.' };
    }

    // Get public URL
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    
    // Add cache buster timestamp query parameter so the UI updates immediately
    const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;
    return { url: cacheBustedUrl, error: null };
  } catch (err: any) {
    console.error('Storage upload exception:', err);
    return { url: null, error: err.message || 'An unexpected error occurred during photo upload.' };
  }
}

/**
 * Deletes user's profile photo from storage.
 */
export async function deleteProfilePhoto(userId: string, currentUrl?: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured || userId === 'guest-user-123') {
    return { success: true, error: null };
  }

  try {
    // List files in the user's directory
    const { data: files } = await supabase.storage.from(BUCKET_NAME).list(userId);
    if (files && files.length > 0) {
      const pathsToDelete = files.map((f) => `${userId}/${f.name}`);
      await supabase.storage.from(BUCKET_NAME).remove(pathsToDelete);
    }
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Error deleting profile photo from storage:', err);
    return { success: false, error: err.message || 'Failed to delete photo from storage.' };
  }
}

/**
 * Generates a unique, deterministic or random Certificate ID (e.g. HP-CERT-8F29A1).
 */
export function generateCertificateId(seed?: string): string {
  if (seed) {
    // Deterministic hash from seed string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
    return `HP-CERT-${hex}`;
  }
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HP-CERT-${randomHex}`;
}

/**
 * Generates a unique Result ID (e.g. HP-8F29A1).
 */
export function generateResultId(seed?: string): string {
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
    return `HP-${hex}`;
  }
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HP-${randomHex}`;
}
