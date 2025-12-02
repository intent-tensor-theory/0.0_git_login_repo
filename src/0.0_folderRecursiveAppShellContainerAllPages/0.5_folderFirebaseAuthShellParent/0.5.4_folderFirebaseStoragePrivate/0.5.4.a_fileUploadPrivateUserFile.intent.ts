/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.5.4.a_fileUploadPrivateUserFile.intent.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * PRIVATE STORAGE UPLOAD — COMPRESSION LOCK FAN (-∇²Φ)
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Compression Lock Fan (Δ₄: -∇²Φ):
 * 
 *   Shell Collapse Stability Thresholds:
 *   ∇²Φ < 0
 * 
 * Private files compress inward — they are locked, protected,
 * and accessible only by the owning identity vector.
 * 
 * Security Rules Required:
 *   - Files stored under user's UID namespace
 *   - Firebase Security Rules must enforce UID matching
 *   - No public access allowed
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  getMetadata,
  StorageReference 
} from 'firebase/storage';
import { getFirebaseStorage } from '../0.5.1_folderFirebaseConfig/0.5.1.a_fileFirebaseAppConfig.intent';
import { executeIntent, RecursionResult } from '../../0.4_folderRecursionExecutorInterface/0.4.a_fileRecursionExecutor.interface';
import { getCurrentUser } from '../../1.0_folderAuthGateShellParent/1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type PrivateFileUploadResult = {
  downloadURL: string;
  storagePath: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  uploadTimestamp: number;
};

export type PrivateFileMetadata = {
  name: string;
  storagePath: string;
  size: number;
  contentType: string;
  createdAt: string;
  updatedAt: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const MAX_PRIVATE_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB for private files
const PRIVATE_STORAGE_BASE = 'private/users';

// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE STORAGE OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * UPLOAD PRIVATE USER FILE
 * 
 * Intent Glyph: STORAGE_UPLOAD_PRIVATE_FILE
 * Collapse Layer: CURVATURE (-∇²Φ — compression lock)
 * 
 * Uploads a file to the user's private storage vault.
 * Only the authenticated user can access their private files.
 */
export async function uploadPrivateUserFile(
  file: File,
  subfolder?: string
): Promise<RecursionResult<PrivateFileUploadResult>> {
  
  return executeIntent('STORAGE_UPLOAD_PRIVATE_FILE', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Validate file size
    if (file.size > MAX_PRIVATE_FILE_SIZE_BYTES) {
      throw new Error(
        `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. ` +
        `Maximum size: ${MAX_PRIVATE_FILE_SIZE_BYTES / 1024 / 1024}MB`
      );
    }
    
    const storage = getFirebaseStorage();
    
    // Generate unique filename with timestamp to prevent collisions
    const timestamp = Date.now();
    const sanitizedFileName = sanitizeFileName(file.name);
    const fileName = `${timestamp}_${sanitizedFileName}`;
    
    // Build private path: private/users/{uid}/{subfolder?}/{filename}
    const folderPath = subfolder 
      ? `${PRIVATE_STORAGE_BASE}/${user.uid}/${subfolder}`
      : `${PRIVATE_STORAGE_BASE}/${user.uid}`;
    const storagePath = `${folderPath}/${fileName}`;
    const storageRef = ref(storage, storagePath);
    
    console.log(`[PrivateStorage] Uploading private file: ${storagePath}`);
    
    // Upload with metadata
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        uploadedBy: user.uid,
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
        isPrivate: 'true',
      },
    });
    
    // Get download URL (requires authentication via security rules)
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`[PrivateStorage] Private file uploaded successfully`);
    
    return {
      downloadURL,
      storagePath,
      fileName,
      fileSize: file.size,
      contentType: file.type || 'application/octet-stream',
      uploadTimestamp: timestamp,
    };
  });
}

/**
 * DELETE PRIVATE USER FILE
 * 
 * Removes a file from the user's private storage.
 */
export async function deletePrivateUserFile(
  storagePath: string
): Promise<RecursionResult<void>> {
  
  return executeIntent('STORAGE_DELETE_FILE', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Security check: Verify the path belongs to this user
    const expectedPrefix = `${PRIVATE_STORAGE_BASE}/${user.uid}/`;
    if (!storagePath.startsWith(expectedPrefix)) {
      throw new Error(
        'Unauthorized: Cannot delete files outside your private storage'
      );
    }
    
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, storagePath);
    
    console.log(`[PrivateStorage] Deleting private file: ${storagePath}`);
    
    await deleteObject(storageRef);
    
    console.log(`[PrivateStorage] Private file deleted successfully`);
  });
}

/**
 * LIST PRIVATE USER FILES
 * 
 * Lists all files in the user's private storage.
 */
export async function listPrivateUserFiles(
  subfolder?: string
): Promise<RecursionResult<PrivateFileMetadata[]>> {
  
  return executeIntent('IDENTITY_GET_CURRENT_USER', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    const storage = getFirebaseStorage();
    
    const folderPath = subfolder
      ? `${PRIVATE_STORAGE_BASE}/${user.uid}/${subfolder}`
      : `${PRIVATE_STORAGE_BASE}/${user.uid}`;
    
    const folderRef = ref(storage, folderPath);
    
    console.log(`[PrivateStorage] Listing files in: ${folderPath}`);
    
    const listResult = await listAll(folderRef);
    
    // Get metadata for each file
    const filesWithMetadata: PrivateFileMetadata[] = await Promise.all(
      listResult.items.map(async (itemRef: StorageReference) => {
        const metadata = await getMetadata(itemRef);
        return {
          name: metadata.name,
          storagePath: metadata.fullPath,
          size: metadata.size,
          contentType: metadata.contentType || 'unknown',
          createdAt: metadata.timeCreated,
          updatedAt: metadata.updated,
        };
      })
    );
    
    console.log(`[PrivateStorage] Found ${filesWithMetadata.length} files`);
    
    return filesWithMetadata;
  });
}

/**
 * GET PRIVATE FILE DOWNLOAD URL
 * 
 * Retrieves a signed download URL for a private file.
 */
export async function getPrivateFileURL(
  storagePath: string
): Promise<RecursionResult<string>> {
  
  return executeIntent('IDENTITY_GET_CURRENT_USER', async () => {
    const user = getCurrentUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Security check
    const expectedPrefix = `${PRIVATE_STORAGE_BASE}/${user.uid}/`;
    if (!storagePath.startsWith(expectedPrefix)) {
      throw new Error(
        'Unauthorized: Cannot access files outside your private storage'
      );
    }
    
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, storagePath);
    
    return getDownloadURL(storageRef);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sanitizes a filename for safe storage.
 */
function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')  // Replace unsafe chars with underscore
    .replace(/_+/g, '_')               // Collapse multiple underscores
    .replace(/^_|_$/g, '')             // Trim leading/trailing underscores
    .toLowerCase();
}

/**
 * Validates a file for private upload.
 */
export function validatePrivateFile(file: File): string | null {
  if (file.size > MAX_PRIVATE_FILE_SIZE_BYTES) {
    return `File too large. Maximum size: 50MB`;
  }
  
  if (!file.name || file.name.length > 255) {
    return `Invalid filename`;
  }
  
  return null;
}

/**
 * Gets the user's private storage base path.
 */
export function getPrivateStorageBasePath(): string | null {
  const user = getCurrentUser();
  if (!user) return null;
  return `${PRIVATE_STORAGE_BASE}/${user.uid}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
PRIVATE STORAGE v1.0 — COMPRESSION LOCK FAN (Δ₄: -∇²Φ)
═══════════════════════════════════════════════════════════════════════════════
Shell Collapse Stability: ∇²Φ < 0

Private files compress inward — locked and protected.
Only the owning identity vector may access.
Max file size: 50MB
═══════════════════════════════════════════════════════════════════════════════
`);
