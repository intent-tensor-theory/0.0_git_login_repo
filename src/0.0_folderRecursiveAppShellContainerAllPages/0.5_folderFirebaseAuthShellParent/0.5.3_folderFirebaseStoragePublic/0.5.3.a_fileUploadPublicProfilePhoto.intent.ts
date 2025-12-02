/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.5.3.a_fileUploadPublicProfilePhoto.intent.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * PUBLIC STORAGE UPLOAD — EXPANSION SHELL FAN (+∇²Φ)
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Expansion Shell Fan (Δ₃: +∇²Φ):
 * 
 *   Outer Diffusion Permissive Zone:
 *   ΔΦ = ∇²Φ > 0
 * 
 * Public files expand outward — they are accessible, shareable,
 * and designed for recursive availability dilation.
 * 
 * Use Cases:
 *   - Profile photos
 *   - Public avatars
 *   - Shared resources
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { getFirebaseStorage } from '../0.5.1_folderFirebaseConfig/0.5.1.a_fileFirebaseAppConfig.intent';
import { executeIntent, RecursionResult } from '../../0.4_folderRecursionExecutorInterface/0.4.a_fileRecursionExecutor.interface';
import { getCurrentUser } from '../../1.0_folderAuthGateShellParent/1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Upload Result
// ─────────────────────────────────────────────────────────────────────────────
export type UploadResult = {
  downloadURL: string;
  storagePath: string;
  fileName: string;
  fileSize: number;
  uploadTimestamp: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC STORAGE OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * UPLOAD PUBLIC PROFILE PHOTO
 * 
 * Intent Glyph: STORAGE_UPLOAD_PUBLIC_PHOTO
 * Collapse Layer: CURVATURE (+∇²Φ — expansion shell)
 * 
 * Uploads a profile photo to public storage and updates user profile.
 */
export async function uploadPublicProfilePhoto(
  file: File
): Promise<RecursionResult<UploadResult>> {
  
  return executeIntent('STORAGE_UPLOAD_PUBLIC_PHOTO', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error(
        `Invalid file type: ${file.type}. ` +
        `Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`
      );
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. ` +
        `Maximum size: ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`
      );
    }
    
    const storage = getFirebaseStorage();
    
    // Generate unique filename with timestamp
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const fileName = `profile_${timestamp}.${fileExtension}`;
    
    // Public path structure: public/profiles/{uid}/{filename}
    const storagePath = `public/profiles/${user.uid}/${fileName}`;
    const storageRef = ref(storage, storagePath);
    
    console.log(`[PublicStorage] Uploading profile photo: ${storagePath}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        uploadedBy: user.uid,
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
      },
    });
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Update user profile with new photo URL
    await updateProfile(user, { photoURL: downloadURL });
    
    console.log(`[PublicStorage] Profile photo uploaded successfully`);
    
    return {
      downloadURL,
      storagePath,
      fileName,
      fileSize: file.size,
      uploadTimestamp: timestamp,
    };
  });
}

/**
 * DELETE PUBLIC PROFILE PHOTO
 * 
 * Removes the current profile photo from storage.
 */
export async function deletePublicProfilePhoto(
  storagePath: string
): Promise<RecursionResult<void>> {
  
  return executeIntent('STORAGE_DELETE_FILE', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Verify the path belongs to this user
    if (!storagePath.includes(user.uid)) {
      throw new Error('Unauthorized: Cannot delete files belonging to other users');
    }
    
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, storagePath);
    
    console.log(`[PublicStorage] Deleting file: ${storagePath}`);
    
    await deleteObject(storageRef);
    
    // Clear photoURL from profile
    await updateProfile(user, { photoURL: null });
    
    console.log(`[PublicStorage] File deleted successfully`);
  });
}

/**
 * GET PUBLIC STORAGE URL
 * 
 * Retrieves the download URL for a public file.
 * This is a read-only operation — no intent execution required.
 */
export async function getPublicStorageURL(storagePath: string): Promise<string> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, storagePath);
  return getDownloadURL(storageRef);
}

/**
 * Validates a file before upload.
 * Returns null if valid, error message if invalid.
 */
export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed: JPEG, PNG, GIF, WebP`;
  }
  
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File too large. Maximum size: 5MB`;
  }
  
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
PUBLIC STORAGE v1.0 — EXPANSION SHELL FAN (Δ₃: +∇²Φ)
═══════════════════════════════════════════════════════════════════════════════
Outer Diffusion Permissive Zone: ΔΦ = ∇²Φ > 0

Public files expand outward — accessible and shareable.
Max file size: 5MB
Allowed types: JPEG, PNG, GIF, WebP
═══════════════════════════════════════════════════════════════════════════════
`);
