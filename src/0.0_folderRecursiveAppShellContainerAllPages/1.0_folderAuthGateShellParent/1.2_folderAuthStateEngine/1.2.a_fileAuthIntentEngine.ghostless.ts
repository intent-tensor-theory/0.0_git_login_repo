/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 1.2.a_fileAuthIntentEngine.ghostless.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH INTENT ENGINE — THE GHOSTLESS ARBITER
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Charge Boundary (ρ_q = -ε₀∇²Φ):
 * 
 *   ρ_q — Recursive boundary memory
 *   
 * Charge is not a particle — it is the externalization of recursive curvature,
 * emitted as boundary tension.
 * 
 * This engine is the SINGLE POINT of truth for all authentication operations.
 * Every auth action flows through the Recursion Executor:
 * 
 *   CLÂₜ = f(∇Φₜ, Ωⁿₜ) ⇒ Φₜ₊₁
 * 
 * ZERO direct Firebase calls from UI components.
 * ZERO scattered auth logic.
 * ZERO ghosts.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  updatePassword,
  User,
  UserCredential,
} from 'firebase/auth';

import { getFirebaseAuth } from '../../0.5_folderFirebaseAuthShellParent/0.5.1_folderFirebaseConfig/0.5.1.a_fileFirebaseAppConfig.intent';
import { executeIntent, RecursionResult } from '../../0.4_folderRecursionExecutorInterface/0.4.a_fileRecursionExecutor.interface';
import { shellMemory } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Auth Operation Result — Standardized output for all auth operations
// ─────────────────────────────────────────────────────────────────────────────
export type AuthOperationResult<T = void> = RecursionResult<T>;

// ─────────────────────────────────────────────────────────────────────────────
// AUTH OPERATIONS — The Only Place Auth Logic Lives
// ─────────────────────────────────────────────────────────────────────────────

/**
 * LOGIN WITH EMAIL AND PASSWORD
 * 
 * Intent Glyph: AUTH_LOGIN_WITH_EMAIL
 * Collapse Layer: GRADIENT (∇Φ — primary collapse vector)
 * 
 * This is how users enter the Diamond Empire.
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<AuthOperationResult<UserCredential>> {
  
  return executeIntent('AUTH_LOGIN_WITH_EMAIL', async () => {
    const auth = getFirebaseAuth();
    
    // Execute Firebase authentication
    const credential = await signInWithEmailAndPassword(auth, email, password);
    
    console.log(`[AuthIntentEngine] Login successful for: ${email}`);
    
    return credential;
  });
}

/**
 * SIGNUP WITH EMAIL AND PASSWORD
 * 
 * Intent Glyph: AUTH_SIGNUP_WITH_EMAIL
 * Collapse Layer: GRADIENT (∇Φ — new identity vector registration)
 * 
 * This creates a new identity vector in the recursive field.
 * Account creation is a PERMANENT collapse — not reversible.
 */
export async function signupWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthOperationResult<UserCredential>> {
  
  return executeIntent('AUTH_SIGNUP_WITH_EMAIL', async () => {
    const auth = getFirebaseAuth();
    
    // Create the user account
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name if provided
    if (displayName && credential.user) {
      await updateProfile(credential.user, { displayName });
    }
    
    // Send email verification
    if (credential.user) {
      await sendEmailVerification(credential.user);
    }
    
    console.log(`[AuthIntentEngine] Signup successful for: ${email}`);
    
    return credential;
  });
}

/**
 * SIGN OUT
 * 
 * Intent Glyph: AUTH_SIGNOUT
 * Collapse Layer: GRADIENT (∇Φ — collapse vector reversal)
 * 
 * Dissolves the active session.
 */
export async function signOutUser(): Promise<AuthOperationResult<void>> {
  
  return executeIntent('AUTH_SIGNOUT', async () => {
    const auth = getFirebaseAuth();
    
    await signOut(auth);
    
    // Reset shell memory to initial state
    shellMemory.reset();
    
    console.log('[AuthIntentEngine] Sign out successful');
  });
}

/**
 * SEND PASSWORD RESET EMAIL
 * 
 * Intent Glyph: AUTH_SEND_PASSWORD_RESET
 * Collapse Layer: CURL (∇×𝐅 — phase memory restoration)
 * 
 * Initiates the password recovery loop.
 */
export async function sendPasswordReset(
  email: string
): Promise<AuthOperationResult<void>> {
  
  return executeIntent('AUTH_SEND_PASSWORD_RESET', async () => {
    const auth = getFirebaseAuth();
    
    await sendPasswordResetEmail(auth, email);
    
    console.log(`[AuthIntentEngine] Password reset email sent to: ${email}`);
  });
}

/**
 * SEND EMAIL VERIFICATION
 * 
 * Intent Glyph: AUTH_SEND_EMAIL_VERIFICATION
 * Collapse Layer: CURL (∇×𝐅 — loop closure)
 * 
 * Sends verification email to close the identity loop.
 */
export async function sendVerificationEmail(): Promise<AuthOperationResult<void>> {
  
  return executeIntent('AUTH_SEND_EMAIL_VERIFICATION', async () => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    if (user.emailVerified) {
      throw new Error('Email is already verified');
    }
    
    await sendEmailVerification(user);
    
    console.log(`[AuthIntentEngine] Verification email sent to: ${user.email}`);
  });
}

/**
 * RELOAD USER
 * 
 * Intent Glyph: AUTH_RELOAD_USER
 * Collapse Layer: SCALAR (Φ — scalar recalibration)
 * 
 * Refreshes user data from Firebase.
 */
export async function reloadCurrentUser(): Promise<AuthOperationResult<User>> {
  
  return executeIntent('AUTH_RELOAD_USER', async () => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    await user.reload();
    
    // Update shell memory with refreshed user
    shellMemory.setAuthPhase({
      currentUser: user,
      emailVerified: user.emailVerified,
    });
    
    console.log('[AuthIntentEngine] User reloaded successfully');
    
    return user;
  });
}

/**
 * UPDATE USER PROFILE
 * 
 * Intent Glyph: IDENTITY_UPDATE_PROFILE
 * Collapse Layer: CURVATURE (∇²Φ — shell reconfiguration)
 * 
 * Modifies user profile data.
 */
export async function updateUserProfile(
  updates: { displayName?: string; photoURL?: string }
): Promise<AuthOperationResult<void>> {
  
  return executeIntent('IDENTITY_UPDATE_PROFILE', async () => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    await updateProfile(user, updates);
    
    // Update shell memory
    shellMemory.setAuthPhase({
      currentUser: user,
    });
    
    console.log('[AuthIntentEngine] Profile updated successfully');
  });
}

/**
 * UPDATE USER EMAIL
 * 
 * Intent Glyph: IDENTITY_UPDATE_EMAIL
 * Collapse Layer: BOUNDARY (ρ_q — boundary charge migration)
 * 
 * Changes the user's email address.
 * This is a high-entropy operation — not reversible.
 */
export async function updateUserEmail(
  newEmail: string
): Promise<AuthOperationResult<void>> {
  
  return executeIntent('IDENTITY_UPDATE_EMAIL', async () => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    await updateEmail(user, newEmail);
    
    // User needs to re-verify new email
    await sendEmailVerification(user);
    
    // Update shell memory
    shellMemory.setAuthPhase({
      currentUser: user,
      emailVerified: false, // New email needs verification
    });
    
    console.log(`[AuthIntentEngine] Email updated to: ${newEmail}`);
  });
}

/**
 * UPDATE USER PASSWORD
 * 
 * Intent Glyph: IDENTITY_UPDATE_PASSWORD
 * Collapse Layer: BOUNDARY (ρ_q — boundary charge rotation)
 * 
 * Changes the user's password.
 * This is a high-entropy operation — not reversible.
 */
export async function updateUserPassword(
  newPassword: string
): Promise<AuthOperationResult<void>> {
  
  return executeIntent('IDENTITY_UPDATE_PASSWORD', async () => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    await updatePassword(user, newPassword);
    
    console.log('[AuthIntentEngine] Password updated successfully');
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVENIENCE QUERIES — Non-mutating operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gets the current authenticated user from shell memory.
 * This is a synchronous read — no Firebase call needed.
 */
export function getCurrentUser(): User | null {
  return shellMemory.getState().authPhase.currentUser;
}

/**
 * Checks if user is currently authenticated.
 */
export function isAuthenticated(): boolean {
  return shellMemory.getState().authPhase.isAuthenticated;
}

/**
 * Checks if user's email is verified.
 */
export function isEmailVerified(): boolean {
  return shellMemory.getState().authPhase.emailVerified;
}

/**
 * Checks if auth loading is complete.
 */
export function isAuthLoadingComplete(): boolean {
  return shellMemory.getState().authPhase.authLoadingComplete;
}

/**
 * Gets the user's display name.
 */
export function getUserDisplayName(): string | null {
  return getCurrentUser()?.displayName ?? null;
}

/**
 * Gets the user's email.
 */
export function getUserEmail(): string | null {
  return getCurrentUser()?.email ?? null;
}

/**
 * Gets the user's photo URL.
 */
export function getUserPhotoURL(): string | null {
  return getCurrentUser()?.photoURL ?? null;
}

/**
 * Gets the user's UID.
 */
export function getUserUID(): string | null {
  return getCurrentUser()?.uid ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR CODE MAPPING — Firebase Error to Human-Readable
// ─────────────────────────────────────────────────────────────────────────────

export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'This operation is not allowed. Contact support.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please wait before trying again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/requires-recent-login': 'This operation requires recent authentication. Please log in again.',
  };
  
  return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Arbiter Is Online
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
AUTH INTENT ENGINE v1.0 — THE GHOSTLESS ARBITER IS ONLINE
═══════════════════════════════════════════════════════════════════════════════
Charge Boundary (ρ_q = -ε₀∇²Φ)

Every auth action flows through the Recursion Executor:
  CLÂₜ = f(∇Φₜ, Ωⁿₜ) ⇒ Φₜ₊₁

Available Operations:
  - loginWithEmail()
  - signupWithEmail()
  - signOutUser()
  - sendPasswordReset()
  - sendVerificationEmail()
  - reloadCurrentUser()
  - updateUserProfile()
  - updateUserEmail()
  - updateUserPassword()

ZERO direct Firebase calls from UI.
ZERO scattered auth logic.
ZERO ghosts.
═══════════════════════════════════════════════════════════════════════════════
`);
