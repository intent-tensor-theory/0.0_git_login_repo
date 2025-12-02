/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * auth-provider.interface.ts — THE CONTRACT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Tension Alignment Gate (Δ₁: ∇Φ):
 * 
 *   F⃗ = ∇Φ  (Collapse Direction Vector)
 *   |∇Φ| > θ_min for shell initiation
 * 
 * This interface defines the GRADIENT — the direction all auth
 * providers must align to. Each adapter implements this contract,
 * ensuring consistent behavior regardless of underlying provider.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { 
  UniversalUser, 
  UniversalAuthState,
  AuthResult, 
  EmailPasswordCredentials,
  SignUpOptions,
  OAuthSignInOptions,
} from './universal-user.types';

// ─────────────────────────────────────────────────────────────────────────────
// THE AUTH PROVIDER INTERFACE — All adapters must implement this
// ─────────────────────────────────────────────────────────────────────────────

/**
 * AuthProviderInterface — The Universal Contract
 * 
 * Every auth provider adapter (Firebase, Supabase, Auth0, etc.)
 * must implement this interface. This ensures:
 * 
 * 1. Consistent API regardless of underlying provider
 * 2. Type safety across the application
 * 3. Easy provider switching (just change config, not code)
 * 4. Predictable behavior for the UI layer
 */
export interface AuthProviderInterface {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Initialize the auth provider
   * Called once at app startup
   */
  initialize(): Promise<void>;
  
  /**
   * Clean up resources
   * Called when provider is being switched or app is closing
   */
  destroy(): void;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH STATE
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Get current auth state
   */
  getAuthState(): UniversalAuthState;
  
  /**
   * Subscribe to auth state changes
   * Returns unsubscribe function
   */
  onAuthStateChange(callback: (state: UniversalAuthState) => void): () => void;
  
  /**
   * Get the current user (null if not logged in)
   */
  getCurrentUser(): UniversalUser | null;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL/PASSWORD AUTH
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Sign in with email and password
   */
  signInWithEmail(credentials: EmailPasswordCredentials): Promise<AuthResult<UniversalUser>>;
  
  /**
   * Create a new account with email and password
   */
  signUpWithEmail(options: SignUpOptions): Promise<AuthResult<UniversalUser>>;
  
  /**
   * Send password reset email
   */
  sendPasswordResetEmail(email: string): Promise<AuthResult<void>>;
  
  /**
   * Send email verification
   */
  sendEmailVerification(): Promise<AuthResult<void>>;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // OAUTH / SOCIAL AUTH
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Sign in with an OAuth provider (Google, GitHub, Apple, etc.)
   * Opens popup or redirects depending on provider implementation
   */
  signInWithOAuth(options: OAuthSignInOptions): Promise<AuthResult<UniversalUser>>;
  
  /**
   * Check if a specific OAuth provider is supported by this adapter
   */
  supportsOAuthProvider(provider: OAuthSignInOptions['provider']): boolean;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SIGN OUT
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Sign out the current user
   */
  signOut(): Promise<AuthResult<void>>;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // USER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Update user profile (display name, photo URL)
   */
  updateProfile(updates: { displayName?: string; photoURL?: string }): Promise<AuthResult<void>>;
  
  /**
   * Update user email (may require re-authentication)
   */
  updateEmail(newEmail: string): Promise<AuthResult<void>>;
  
  /**
   * Update user password (may require re-authentication)
   */
  updatePassword(newPassword: string): Promise<AuthResult<void>>;
  
  /**
   * Delete the current user's account
   */
  deleteAccount(): Promise<AuthResult<void>>;
  
  /**
   * Reload the current user's data from the server
   */
  reloadUser(): Promise<AuthResult<UniversalUser>>;
}

// ─────────────────────────────────────────────────────────────────────────────
// OAUTH PROVIDER INFO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * OAuth provider metadata for UI rendering
 */
export type OAuthProviderInfo = {
  id: OAuthSignInOptions['provider'];
  name: string;
  icon: string;        // SVG path or icon name
  color: string;       // Brand color
  bgColor: string;     // Background color for button
  textColor: string;   // Text color for button
};

/**
 * OAuth provider display information
 */
export const OAUTH_PROVIDERS: Record<OAuthSignInOptions['provider'], OAuthProviderInfo> = {
  google: {
    id: 'google',
    name: 'Google',
    icon: 'google',
    color: '#4285F4',
    bgColor: '#ffffff',
    textColor: '#1f1f1f',
  },
  github: {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    color: '#24292e',
    bgColor: '#24292e',
    textColor: '#ffffff',
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    icon: 'apple',
    color: '#000000',
    bgColor: '#000000',
    textColor: '#ffffff',
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    icon: 'microsoft',
    color: '#00a4ef',
    bgColor: '#ffffff',
    textColor: '#1f1f1f',
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'twitter',
    color: '#000000',
    bgColor: '#000000',
    textColor: '#ffffff',
  },
  discord: {
    id: 'discord',
    name: 'Discord',
    icon: 'discord',
    color: '#5865F2',
    bgColor: '#5865F2',
    textColor: '#ffffff',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    bgColor: '#0A66C2',
    textColor: '#ffffff',
  },
};

/**
 * Get OAuth provider info by ID
 */
export function getOAuthProviderInfo(provider: OAuthSignInOptions['provider']): OAuthProviderInfo {
  return OAUTH_PROVIDERS[provider];
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
AUTH PROVIDER INTERFACE v1.0 — THE CONTRACT (Δ₁: ∇Φ)
═══════════════════════════════════════════════════════════════════════════════
Tension Alignment Gate: F⃗ = ∇Φ
All adapters must align to this gradient.
═══════════════════════════════════════════════════════════════════════════════
`);
