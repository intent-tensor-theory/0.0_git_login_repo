// ═══════════════════════════════════════════════════════════════════════════════
// AUTH PROVIDER FACTORY — Routes to the correct adapter based on auth.config.ts
// ═══════════════════════════════════════════════════════════════════════════════
//
// This is the magic routing layer. It reads your auth.config.ts and automatically
// uses the correct provider adapter (Firebase, Supabase, Auth0, etc.)
//
// You never import adapters directly — you import this factory.
//
// ═══════════════════════════════════════════════════════════════════════════════

import { AUTH_CONFIG } from '../auth.config';
import type { AuthResult, OAuthProvider, UniversalUser } from '../types/universal-auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// LAZY-LOAD ADAPTERS (Only loads what you need)
// ─────────────────────────────────────────────────────────────────────────────

const getAdapter = async () => {
  const provider = AUTH_CONFIG.provider;
  
  switch (provider) {
    case 'firebase': {
      const { FirebaseAdapter } = await import('./firebase.adapter');
      return FirebaseAdapter;
    }
    case 'supabase': {
      const { SupabaseAdapter } = await import('./supabase.adapter');
      return SupabaseAdapter;
    }
    case 'auth0': {
      const { Auth0Adapter } = await import('./auth0.adapter');
      return Auth0Adapter;
    }
    case 'cognito': {
      throw new Error(
        '[Auth Factory] AWS Cognito adapter coming soon!\n' +
        'For now, please use Firebase, Supabase, or Auth0.'
      );
    }
    case 'clerk': {
      throw new Error(
        '[Auth Factory] Clerk adapter coming soon!\n' +
        'For now, please use Firebase, Supabase, or Auth0.'
      );
    }
    default:
      throw new Error(
        `[Auth Factory] Unknown provider: "${provider}"\n` +
        'Valid options: firebase, supabase, auth0, cognito, clerk'
      );
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL AUTH API
// ─────────────────────────────────────────────────────────────────────────────
//
// These are the functions you import and use in your components.
// They automatically route to the correct provider.
//

export const UniversalAuth = {
  
  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.signInWithEmail(email, password);
  },
  
  /**
   * Create a new account with email and password
   */
  async signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.signUpWithEmail(email, password, displayName);
  },
  
  /**
   * Sign in with an OAuth provider (Google, GitHub, Apple, etc.)
   */
  async signInWithOAuth(provider: OAuthProvider): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.signInWithOAuth(provider);
  },
  
  /**
   * Send a password reset email
   */
  async sendPasswordReset(email: string): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.sendPasswordReset(email);
  },
  
  /**
   * Resend the email verification link
   */
  async resendVerificationEmail(): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.resendVerificationEmail();
  },
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<AuthResult> {
    const adapter = await getAdapter();
    return adapter.signOut();
  },
  
  /**
   * Subscribe to auth state changes
   * Returns an unsubscribe function
   */
  onAuthStateChanged(callback: (user: UniversalUser | null) => void): () => void {
    // We need to handle this synchronously for the initial setup
    // So we use a flag to track if we've initialized
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    
    getAdapter().then((adapter) => {
      if (!cancelled) {
        unsubscribe = adapter.onAuthStateChanged(callback);
      }
    });
    
    return () => {
      cancelled = true;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  },
  
  /**
   * Get the current user (may be async for some providers)
   */
  async getCurrentUser(): Promise<UniversalUser | null> {
    const adapter = await getAdapter();
    const user = await adapter.getCurrentUser();
    return user;
  },
  
  /**
   * Handle OAuth redirect callback (for redirect-based providers like Auth0)
   */
  async handleRedirectCallback(): Promise<AuthResult> {
    const provider = AUTH_CONFIG.provider;
    
    if (provider === 'auth0') {
      const { Auth0Adapter } = await import('./auth0.adapter');
      return Auth0Adapter.handleRedirectCallback();
    }
    
    // Firebase and Supabase handle redirects automatically
    return { success: true };
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONVENIENCE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const {
  signInWithEmail,
  signUpWithEmail,
  signInWithOAuth,
  sendPasswordReset,
  resendVerificationEmail,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
  handleRedirectCallback,
} = UniversalAuth;

export default UniversalAuth;
