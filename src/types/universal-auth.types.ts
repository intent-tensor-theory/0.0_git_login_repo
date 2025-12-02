// ═══════════════════════════════════════════════════════════════════════════════
// UNIVERSAL AUTH TYPES — Shared types for all auth adapters
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDERS
// ─────────────────────────────────────────────────────────────────────────────

export type AuthProvider = 'firebase' | 'supabase' | 'auth0' | 'cognito' | 'clerk';

export type OAuthProvider = 
  | 'google' 
  | 'github' 
  | 'apple' 
  | 'microsoft' 
  | 'twitter' 
  | 'discord' 
  | 'linkedin';

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL USER
// ─────────────────────────────────────────────────────────────────────────────
// 
// This is the normalized user object that all adapters return.
// Regardless of whether you use Firebase, Supabase, or Auth0,
// you always get the same user shape.
//

export interface UniversalUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  provider: AuthProvider;
  providerData: Record<string, any>; // Provider-specific data
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH RESULT
// ─────────────────────────────────────────────────────────────────────────────
//
// Every auth operation returns this shape.
//

export interface AuthResult {
  success: boolean;
  user?: UniversalUser;
  error?: {
    code: string;
    message: string;
  };
  message?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH ADAPTER INTERFACE
// ─────────────────────────────────────────────────────────────────────────────
//
// Every provider adapter must implement these methods.
//

export interface UniversalAuthAdapter {
  // Email/Password
  signInWithEmail(email: string, password: string): Promise<AuthResult>;
  signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult>;
  
  // OAuth
  signInWithOAuth(provider: OAuthProvider): Promise<AuthResult>;
  
  // Password Reset
  sendPasswordReset(email: string): Promise<AuthResult>;
  
  // Email Verification
  resendVerificationEmail(): Promise<AuthResult>;
  
  // Sign Out
  signOut(): Promise<AuthResult>;
  
  // Auth State
  onAuthStateChanged(callback: (user: UniversalUser | null) => void): () => void;
  getCurrentUser(): UniversalUser | null | Promise<UniversalUser | null>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR CODES (Normalized across providers)
// ─────────────────────────────────────────────────────────────────────────────

export const AUTH_ERROR_CODES = {
  // Email/Password errors
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_CREDENTIALS: 'auth/invalid-credentials',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  
  // Verification errors
  EMAIL_NOT_VERIFIED: 'auth/email-not-verified',
  
  // Rate limiting
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  
  // OAuth errors
  OAUTH_ERROR: 'auth/oauth-error',
  POPUP_CLOSED: 'auth/popup-closed-by-user',
  CANCELLED: 'auth/cancelled',
  
  // General errors
  UNKNOWN: 'auth/unknown',
  NETWORK_ERROR: 'auth/network-error',
  NO_USER: 'auth/no-user',
} as const;

export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];
