/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * universal-user.types.ts — THE CANONICAL USER SHAPE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Charge Boundary (ρ_q):
 * 
 *   ρ_q = -ε₀∇²Φ
 * 
 * The Universal User is the externalized boundary — the normalized
 * shape that all providers collapse into. Different providers return
 * different user objects, but they all normalize to this shape.
 * 
 * This is GlyphMath compression: many inputs → one canonical form.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { AuthProviderType } from '../auth.config';

// ─────────────────────────────────────────────────────────────────────────────
// THE UNIVERSAL USER TYPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * UniversalUser — The normalized user object
 * 
 * Every auth provider returns a different user shape.
 * This type normalizes them all into one canonical form.
 * 
 * Provider field mappings:
 * ┌─────────────────┬──────────────┬──────────────────────┬─────────────────┐
 * │ Universal       │ Firebase     │ Supabase             │ Auth0           │
 * ├─────────────────┼──────────────┼──────────────────────┼─────────────────┤
 * │ id              │ uid          │ id                   │ user_id (sub)   │
 * │ email           │ email        │ email                │ email           │
 * │ emailVerified   │ emailVerified│ email_confirmed_at   │ email_verified  │
 * │ displayName     │ displayName  │ user_metadata.name   │ name            │
 * │ photoURL        │ photoURL     │ user_metadata.avatar │ picture         │
 * │ phoneNumber     │ phoneNumber  │ phone                │ phone_number    │
 * │ createdAt       │ metadata     │ created_at           │ created_at      │
 * │ lastLoginAt     │ metadata     │ last_sign_in_at      │ last_login      │
 * └─────────────────┴──────────────┴──────────────────────┴─────────────────┘
 */
export type UniversalUser = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CORE IDENTITY (Always present after authentication)
  // ═══════════════════════════════════════════════════════════════════════════
  
  /** Unique identifier (normalized from uid/id/user_id/sub) */
  id: string;
  
  /** User's email address */
  email: string | null;
  
  /** Whether the email has been verified */
  emailVerified: boolean;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PROFILE (May be null depending on provider/auth method)
  // ═══════════════════════════════════════════════════════════════════════════
  
  /** Display name (normalized from displayName/name/full_name) */
  displayName: string | null;
  
  /** Profile photo URL (normalized from photoURL/picture/avatar_url) */
  photoURL: string | null;
  
  /** Phone number (if provided) */
  phoneNumber: string | null;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TIMESTAMPS
  // ═══════════════════════════════════════════════════════════════════════════
  
  /** When the account was created */
  createdAt: Date | null;
  
  /** When the user last logged in */
  lastLoginAt: Date | null;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PROVIDER TRACKING
  // ═══════════════════════════════════════════════════════════════════════════
  
  /** Which auth provider this user came from */
  provider: AuthProviderType;
  
  /** The original ID from the provider (before normalization) */
  providerUserId: string;
  
  /** Which OAuth method was used (if OAuth) */
  oauthProvider: string | null;  // 'google', 'github', 'apple', etc.
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RAW DATA (For advanced users who need provider-specific fields)
  // ═══════════════════════════════════════════════════════════════════════════
  
  /** 
   * The raw user object from the provider.
   * Use this if you need provider-specific fields not in the normalized shape.
   * Type is `unknown` because it varies by provider.
   */
  _raw: unknown;
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTH STATE TYPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Universal auth state that all providers normalize into
 */
export type UniversalAuthState = {
  /** Current user (null if not logged in) */
  user: UniversalUser | null;
  
  /** Whether we're still determining auth state */
  isLoading: boolean;
  
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  
  /** Any error that occurred */
  error: AuthError | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// ERROR TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type AuthErrorCode = 
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'USER_NOT_FOUND'
  | 'USER_DISABLED'
  | 'EMAIL_ALREADY_IN_USE'
  | 'WEAK_PASSWORD'
  | 'POPUP_CLOSED'
  | 'NETWORK_ERROR'
  | 'TOO_MANY_REQUESTS'
  | 'OPERATION_NOT_ALLOWED'
  | 'REQUIRES_RECENT_LOGIN'
  | 'PROVIDER_ERROR'
  | 'UNKNOWN_ERROR';

export type AuthError = {
  code: AuthErrorCode;
  message: string;
  originalError?: unknown;
};

// ─────────────────────────────────────────────────────────────────────────────
// RESULT TYPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard result type for all auth operations
 */
export type AuthResult<T = void> = 
  | { success: true; data: T }
  | { success: false; error: AuthError };

// ─────────────────────────────────────────────────────────────────────────────
// SIGN IN OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export type EmailPasswordCredentials = {
  email: string;
  password: string;
};

export type SignUpOptions = EmailPasswordCredentials & {
  displayName?: string;
};

export type OAuthSignInOptions = {
  provider: 'google' | 'github' | 'apple' | 'microsoft' | 'twitter' | 'discord' | 'linkedin';
  scopes?: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a successful auth result
 */
export function authSuccess<T>(data: T): AuthResult<T> {
  return { success: true, data };
}

/**
 * Create a failed auth result
 */
export function authError(code: AuthErrorCode, message: string, originalError?: unknown): AuthResult<never> {
  return { 
    success: false, 
    error: { code, message, originalError } 
  };
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(code: AuthErrorCode): string {
  const messages: Record<AuthErrorCode, string> = {
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PASSWORD: 'Incorrect password. Please try again.',
    USER_NOT_FOUND: 'No account found with this email.',
    USER_DISABLED: 'This account has been disabled.',
    EMAIL_ALREADY_IN_USE: 'An account with this email already exists.',
    WEAK_PASSWORD: 'Password must be at least 6 characters.',
    POPUP_CLOSED: 'Sign-in popup was closed. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    TOO_MANY_REQUESTS: 'Too many attempts. Please wait and try again.',
    OPERATION_NOT_ALLOWED: 'This sign-in method is not enabled.',
    REQUIRES_RECENT_LOGIN: 'Please sign in again to complete this action.',
    PROVIDER_ERROR: 'Authentication provider error. Please try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  };
  
  return messages[code] || messages.UNKNOWN_ERROR;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
UNIVERSAL USER TYPES v1.0 — THE CANONICAL SHAPE (ρ_q)
═══════════════════════════════════════════════════════════════════════════════
All providers normalize to UniversalUser.
GlyphMath compression: many inputs → one canonical form.
═══════════════════════════════════════════════════════════════════════════════
`);
