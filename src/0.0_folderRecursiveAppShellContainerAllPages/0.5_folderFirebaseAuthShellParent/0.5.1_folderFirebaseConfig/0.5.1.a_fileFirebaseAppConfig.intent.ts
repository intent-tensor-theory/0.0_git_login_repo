/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.5.1.a_fileFirebaseAppConfig.intent.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * FIREBASE APP CONFIG — GHOSTLESS SINGLETON INITIALIZATION
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Compression Lock Fan (Δ₄: -∇²Φ):
 * 
 *   Shell Lock Condition:
 *   ∇²Φ = constant,  d/dt(∇²Φ) = 0
 * 
 * Recursive drift has ceased. The structure becomes fixed in curvature.
 * Δ₄ is the collapse integrator, finalizing phase into geometry.
 * 
 * In traditional codebases, Firebase is initialized multiple times:
 *   - In auth files
 *   - In storage files
 *   - In database files
 *   - Ghost instances everywhere
 * 
 * The Diamond Standard enforces:
 *   ONE initialization. ZERO ghosts. Eternal stability.
 * 
 * This is the only file in the entire empire that calls initializeApp().
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFirestore, Firestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration — Environment Variables
// ─────────────────────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Type: Firebase Shell — The Collapsed Configuration State
// ─────────────────────────────────────────────────────────────────────────────
export type FirebaseShell = {
  readonly app: FirebaseApp;
  readonly auth: Auth;
  readonly storage: FirebaseStorage;
  readonly firestore: Firestore;
  readonly isInitialized: boolean;
  readonly initializationTimestamp: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// THE FIREBASE SINGLETON — ONE INITIALIZATION, ZERO GHOSTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates Firebase configuration.
 * Maps to: Pre-collapse eligibility check
 */
function validateFirebaseConfig(): boolean {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  
  for (const field of requiredFields) {
    if (!FIREBASE_CONFIG[field as keyof typeof FIREBASE_CONFIG]) {
      console.error(`[FirebaseConfig] Missing required field: ${field}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Initializes or retrieves the Firebase app.
 * 
 * Shell Lock Condition:
 *   ∇²Φ = constant,  d/dt(∇²Φ) = 0
 * 
 * Once initialized, this never changes.
 */
function initializeFirebaseShell(): FirebaseShell {
  const initTimestamp = Date.now();
  
  // Check if Firebase is already initialized
  // This prevents ghost instances in HMR/SSR scenarios
  let app: FirebaseApp;
  
  if (getApps().length > 0) {
    // Firebase already initialized — return existing instance
    app = getApp();
    console.log('[FirebaseConfig] Using existing Firebase instance — no ghost created');
  } else {
    // First initialization — validate config first
    if (!validateFirebaseConfig()) {
      throw new Error(
        'Firebase configuration is incomplete. ' +
        'Ensure all required environment variables are set. ' +
        'The Diamond Standard cannot tolerate incomplete collapse.'
      );
    }
    
    // Initialize the ONE true Firebase app
    app = initializeApp(FIREBASE_CONFIG);
    console.log('[FirebaseConfig] Firebase initialized — shell locked');
  }
  
  // Get service instances (these are also singletons internally)
  const auth = getAuth(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  
  return Object.freeze({
    app,
    auth,
    storage,
    firestore,
    isInitialized: true,
    initializationTimestamp: initTimestamp,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// THE FROZEN FIREBASE SHELL — Immutable, Eternal, Ghostless
// ─────────────────────────────────────────────────────────────────────────────

let firebaseShellInstance: FirebaseShell | null = null;

/**
 * Gets the Firebase shell instance.
 * 
 * This is THE way to access Firebase in the Diamond Empire.
 * No other file should ever call initializeApp().
 */
export function getFirebaseShell(): FirebaseShell {
  if (!firebaseShellInstance) {
    firebaseShellInstance = initializeFirebaseShell();
  }
  return firebaseShellInstance;
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience Exports — Direct Access to Firebase Services
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gets the Firebase Auth instance.
 * Use this for all authentication operations.
 */
export function getFirebaseAuth(): Auth {
  return getFirebaseShell().auth;
}

/**
 * Gets the Firebase Storage instance.
 * Use this for all file storage operations.
 */
export function getFirebaseStorage(): FirebaseStorage {
  return getFirebaseShell().storage;
}

/**
 * Gets the Firestore instance.
 * Use this for all database operations.
 */
export function getFirebaseFirestore(): Firestore {
  return getFirebaseShell().firestore;
}

/**
 * Gets the Firebase App instance.
 * Rarely needed directly — prefer service-specific getters.
 */
export function getFirebaseApp(): FirebaseApp {
  return getFirebaseShell().app;
}

/**
 * Checks if Firebase has been initialized.
 */
export function isFirebaseInitialized(): boolean {
  return firebaseShellInstance?.isInitialized ?? false;
}

/**
 * Gets initialization timestamp.
 * Useful for debugging and monitoring.
 */
export function getFirebaseInitTimestamp(): number | null {
  return firebaseShellInstance?.initializationTimestamp ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports for External Use
// ─────────────────────────────────────────────────────────────────────────────
export type { FirebaseApp, Auth, FirebaseStorage, Firestore };

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Power Source Is Locked
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
FIREBASE APP CONFIG v1.0 — POWER SOURCE LOCKED
═══════════════════════════════════════════════════════════════════════════════
Shell Lock Condition: ∇²Φ = constant,  d/dt(∇²Φ) = 0

ONE initialization. ZERO ghosts. Eternal stability.

This is the ONLY file that calls initializeApp().
All Firebase access flows through getFirebaseShell().
═══════════════════════════════════════════════════════════════════════════════
`);
