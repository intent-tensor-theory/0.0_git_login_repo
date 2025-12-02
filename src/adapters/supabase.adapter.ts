// ═══════════════════════════════════════════════════════════════════════════════
// SUPABASE ADAPTER — Implements UniversalAuthAdapter for Supabase
// ═══════════════════════════════════════════════════════════════════════════════
// 
// This adapter translates the universal auth interface into Supabase-specific calls.
// The user only needs to provide their Supabase config in auth.config.ts.
//
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import { AUTH_CONFIG } from '../auth.config';
import type { UniversalUser, AuthResult, OAuthProvider as OAuthProviderType } from '../types/universal-auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZE SUPABASE
// ─────────────────────────────────────────────────────────────────────────────

let supabase: SupabaseClient;

const initializeSupabase = (): SupabaseClient => {
  if (!supabase) {
    const config = AUTH_CONFIG.credentials.supabase;
    
    if (!config.url || config.url === 'https://YOUR-PROJECT.supabase.co') {
      throw new Error(
        '[Supabase Adapter] Missing Supabase configuration!\n' +
        'Please edit src/auth.config.ts and add your Supabase credentials.\n' +
        'Get them from: https://supabase.com/dashboard → Project Settings → API'
      );
    }
    
    supabase = createClient(config.url, config.anonKey);
  }
  
  return supabase;
};

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZE SUPABASE USER → UNIVERSAL USER
// ─────────────────────────────────────────────────────────────────────────────

const normalizeUser = (supabaseUser: SupabaseUser): UniversalUser => ({
  id: supabaseUser.id,
  email: supabaseUser.email || null,
  displayName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null,
  photoURL: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null,
  emailVerified: supabaseUser.email_confirmed_at !== null,
  provider: 'supabase',
  providerData: {
    id: supabaseUser.id,
    aud: supabaseUser.aud,
    role: supabaseUser.role,
    createdAt: supabaseUser.created_at,
    lastSignInAt: supabaseUser.last_sign_in_at,
    appMetadata: supabaseUser.app_metadata,
    userMetadata: supabaseUser.user_metadata,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// MAP OAUTH PROVIDER TO SUPABASE PROVIDER
// ─────────────────────────────────────────────────────────────────────────────

type SupabaseOAuthProvider = 'google' | 'github' | 'apple' | 'discord' | 'twitter' | 'linkedin' | 'azure';

const mapOAuthProvider = (provider: OAuthProviderType): SupabaseOAuthProvider => {
  const mapping: Record<OAuthProviderType, SupabaseOAuthProvider> = {
    google: 'google',
    github: 'github',
    apple: 'apple',
    microsoft: 'azure', // Supabase uses 'azure' for Microsoft
    twitter: 'twitter',
    discord: 'discord',
    linkedin: 'linkedin',
  };
  
  return mapping[provider];
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE AUTH ADAPTER
// ─────────────────────────────────────────────────────────────────────────────

export const SupabaseAdapter = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL/PASSWORD AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return {
          success: false,
          error: {
            code: error.message.includes('Invalid') ? 'auth/invalid-credentials' : 'auth/unknown',
            message: error.message,
          },
        };
      }
      
      if (!data.user) {
        return {
          success: false,
          error: {
            code: 'auth/no-user',
            message: 'No user returned from sign in.',
          },
        };
      }
      
      // Check if email verification is required
      if (AUTH_CONFIG.options.requireEmailVerification && !data.user.email_confirmed_at) {
        return {
          success: false,
          error: {
            code: 'auth/email-not-verified',
            message: 'Please verify your email before signing in.',
          },
          user: normalizeUser(data.user),
        };
      }
      
      return {
        success: true,
        user: normalizeUser(data.user),
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  async signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
          },
        },
      });
      
      if (error) {
        // Check for existing user
        if (error.message.includes('already registered')) {
          return {
            success: false,
            error: {
              code: 'auth/email-already-in-use',
              message: 'An account with this email already exists.',
            },
          };
        }
        
        return {
          success: false,
          error: {
            code: 'auth/unknown',
            message: error.message,
          },
        };
      }
      
      if (!data.user) {
        return {
          success: false,
          error: {
            code: 'auth/no-user',
            message: 'No user returned from sign up.',
          },
        };
      }
      
      return {
        success: true,
        user: normalizeUser(data.user),
        message: AUTH_CONFIG.options.requireEmailVerification
          ? 'Account created! Please check your email to verify.'
          : 'Account created successfully!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // OAUTH AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signInWithOAuth(provider: OAuthProviderType): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const supabaseProvider = mapOAuthProvider(provider);
      
      const { data, error } = await client.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: window.location.origin + AUTH_CONFIG.options.redirectAfterLogin,
        },
      });
      
      if (error) {
        return {
          success: false,
          error: {
            code: 'auth/oauth-error',
            message: error.message,
          },
        };
      }
      
      // OAuth redirects, so we return success (the redirect will happen)
      return {
        success: true,
        message: 'Redirecting to provider...',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PASSWORD RESET
  // ═══════════════════════════════════════════════════════════════════════════
  
  async sendPasswordReset(email: string): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        return {
          success: false,
          error: {
            code: 'auth/reset-error',
            message: error.message,
          },
        };
      }
      
      return {
        success: true,
        message: 'Password reset email sent!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async resendVerificationEmail(): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const { data: { user } } = await client.auth.getUser();
      
      if (!user?.email) {
        return {
          success: false,
          error: {
            code: 'auth/no-user',
            message: 'No user is currently signed in.',
          },
        };
      }
      
      const { error } = await client.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      if (error) {
        return {
          success: false,
          error: {
            code: 'auth/resend-error',
            message: error.message,
          },
        };
      }
      
      return {
        success: true,
        message: 'Verification email sent!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SIGN OUT
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signOut(): Promise<AuthResult> {
    try {
      const client = initializeSupabase();
      const { error } = await client.auth.signOut();
      
      if (error) {
        return {
          success: false,
          error: {
            code: 'auth/signout-error',
            message: error.message,
          },
        };
      }
      
      return {
        success: true,
        message: 'Signed out successfully.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH STATE OBSERVER
  // ═══════════════════════════════════════════════════════════════════════════
  
  onAuthStateChanged(callback: (user: UniversalUser | null) => void): () => void {
    const client = initializeSupabase();
    
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        callback(normalizeUser(session.user));
      } else {
        callback(null);
      }
    });
    
    return () => subscription.unsubscribe();
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // GET CURRENT USER
  // ═══════════════════════════════════════════════════════════════════════════
  
  async getCurrentUser(): Promise<UniversalUser | null> {
    const client = initializeSupabase();
    const { data: { user } } = await client.auth.getUser();
    return user ? normalizeUser(user) : null;
  },
};

export default SupabaseAdapter;
