// ═══════════════════════════════════════════════════════════════════════════════
// AUTH0 ADAPTER — Implements UniversalAuthAdapter for Auth0
// ═══════════════════════════════════════════════════════════════════════════════
// 
// This adapter translates the universal auth interface into Auth0-specific calls.
// The user only needs to provide their Auth0 config in auth.config.ts.
//
// ═══════════════════════════════════════════════════════════════════════════════

import { Auth0Client, User as Auth0User } from '@auth0/auth0-spa-js';
import { AUTH_CONFIG } from '../auth.config';
import type { UniversalUser, AuthResult, OAuthProvider as OAuthProviderType } from '../types/universal-auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZE AUTH0
// ─────────────────────────────────────────────────────────────────────────────

let auth0Client: Auth0Client;

const initializeAuth0 = async (): Promise<Auth0Client> => {
  if (!auth0Client) {
    const config = AUTH_CONFIG.credentials.auth0;
    
    if (!config.domain || config.domain === 'YOUR-TENANT.auth0.com') {
      throw new Error(
        '[Auth0 Adapter] Missing Auth0 configuration!\n' +
        'Please edit src/auth.config.ts and add your Auth0 credentials.\n' +
        'Get them from: https://manage.auth0.com → Applications → Your App'
      );
    }
    
    auth0Client = new Auth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin + AUTH_CONFIG.options.redirectAfterLogin,
        audience: config.audience,
      },
    });
  }
  
  return auth0Client;
};

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZE AUTH0 USER → UNIVERSAL USER
// ─────────────────────────────────────────────────────────────────────────────

const normalizeUser = (auth0User: Auth0User): UniversalUser => ({
  id: auth0User.sub || '',
  email: auth0User.email || null,
  displayName: auth0User.name || auth0User.nickname || null,
  photoURL: auth0User.picture || null,
  emailVerified: auth0User.email_verified || false,
  provider: 'auth0',
  providerData: {
    sub: auth0User.sub,
    nickname: auth0User.nickname,
    updatedAt: auth0User.updated_at,
    ...auth0User,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH0 ADAPTER
// ─────────────────────────────────────────────────────────────────────────────

export const Auth0Adapter = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL/PASSWORD AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  // 
  // Note: Auth0 handles email/password through their Universal Login page.
  // For embedded login, you need Auth0's Lock widget or custom API calls.
  // This implementation uses the redirect flow.
  //
  
  async signInWithEmail(_email: string, _password: string): Promise<AuthResult> {
    try {
      const client = await initializeAuth0();
      
      // Auth0 uses redirect-based authentication by default
      // For embedded login, you'd need the Auth0 Lock widget or Resource Owner Password Grant
      await client.loginWithRedirect({
        authorizationParams: {
          screen_hint: 'login',
        },
      });
      
      // This won't execute immediately due to redirect
      return {
        success: true,
        message: 'Redirecting to Auth0...',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/redirect-error',
          message: error.message || 'Failed to redirect to Auth0',
        },
      };
    }
  },
  
  async signUpWithEmail(_email: string, _password: string, _displayName?: string): Promise<AuthResult> {
    try {
      const client = await initializeAuth0();
      
      // Auth0 handles signup through their Universal Login page
      await client.loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
      
      return {
        success: true,
        message: 'Redirecting to Auth0...',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/redirect-error',
          message: error.message || 'Failed to redirect to Auth0',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // OAUTH AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signInWithOAuth(provider: OAuthProviderType): Promise<AuthResult> {
    try {
      const client = await initializeAuth0();
      
      // Map provider to Auth0 connection name
      const connectionMap: Record<OAuthProviderType, string> = {
        google: 'google-oauth2',
        github: 'github',
        apple: 'apple',
        microsoft: 'windowslive',
        twitter: 'twitter',
        discord: 'discord',
        linkedin: 'linkedin',
      };
      
      await client.loginWithRedirect({
        authorizationParams: {
          connection: connectionMap[provider],
        },
      });
      
      return {
        success: true,
        message: 'Redirecting to provider...',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/oauth-error',
          message: error.message || 'Failed to initiate OAuth',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLE REDIRECT CALLBACK
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // Call this when the user returns from Auth0
  //
  
  async handleRedirectCallback(): Promise<AuthResult> {
    try {
      const client = await initializeAuth0();
      await client.handleRedirectCallback();
      
      const user = await client.getUser();
      
      if (!user) {
        return {
          success: false,
          error: {
            code: 'auth/no-user',
            message: 'No user returned after redirect',
          },
        };
      }
      
      return {
        success: true,
        user: normalizeUser(user),
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/callback-error',
          message: error.message || 'Failed to handle redirect',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PASSWORD RESET
  // ═══════════════════════════════════════════════════════════════════════════
  
  async sendPasswordReset(email: string): Promise<AuthResult> {
    try {
      const config = AUTH_CONFIG.credentials.auth0;
      
      // Auth0 password reset requires a direct API call
      const response = await fetch(`https://${config.domain}/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: config.clientId,
          email: email,
          connection: 'Username-Password-Authentication',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }
      
      return {
        success: true,
        message: 'Password reset email sent!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/reset-error',
          message: error.message || 'Failed to send password reset',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async resendVerificationEmail(): Promise<AuthResult> {
    // Auth0 handles email verification through their dashboard/rules
    // This would require the Management API with appropriate permissions
    return {
      success: false,
      error: {
        code: 'auth/not-implemented',
        message: 'Email verification resend requires Auth0 Management API. Please check your email or contact support.',
      },
    };
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SIGN OUT
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signOut(): Promise<AuthResult> {
    try {
      const client = await initializeAuth0();
      
      await client.logout({
        logoutParams: {
          returnTo: window.location.origin + AUTH_CONFIG.options.redirectAfterLogout,
        },
      });
      
      return {
        success: true,
        message: 'Signed out successfully.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'auth/signout-error',
          message: error.message || 'Failed to sign out',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH STATE
  // ═══════════════════════════════════════════════════════════════════════════
  
  onAuthStateChanged(callback: (user: UniversalUser | null) => void): () => void {
    // Auth0 doesn't have a built-in auth state listener
    // We check auth state on initialization and after redirects
    let intervalId: number;
    
    const checkAuth = async () => {
      try {
        const client = await initializeAuth0();
        const isAuthenticated = await client.isAuthenticated();
        
        if (isAuthenticated) {
          const user = await client.getUser();
          callback(user ? normalizeUser(user) : null);
        } else {
          callback(null);
        }
      } catch {
        callback(null);
      }
    };
    
    // Check immediately
    checkAuth();
    
    // Poll periodically (not ideal, but Auth0 doesn't provide listeners)
    intervalId = window.setInterval(checkAuth, 5000);
    
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // GET CURRENT USER
  // ═══════════════════════════════════════════════════════════════════════════
  
  async getCurrentUser(): Promise<UniversalUser | null> {
    try {
      const client = await initializeAuth0();
      const isAuthenticated = await client.isAuthenticated();
      
      if (!isAuthenticated) {
        return null;
      }
      
      const user = await client.getUser();
      return user ? normalizeUser(user) : null;
    } catch {
      return null;
    }
  },
};

export default Auth0Adapter;
