// ═══════════════════════════════════════════════════════════════════════════════
// FIREBASE ADAPTER — Implements UniversalAuthAdapter for Firebase
// ═══════════════════════════════════════════════════════════════════════════════
// 
// This adapter translates the universal auth interface into Firebase-specific calls.
// The user only needs to provide their Firebase config in auth.config.ts.
//
// ═══════════════════════════════════════════════════════════════════════════════

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import { AUTH_CONFIG } from '../auth.config';
import type { UniversalUser, AuthResult, OAuthProvider as OAuthProviderType } from '../types/universal-auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZE FIREBASE
// ─────────────────────────────────────────────────────────────────────────────

let app: FirebaseApp;
let auth: Auth;

const initializeFirebase = (): Auth => {
  if (!getApps().length) {
    const config = AUTH_CONFIG.credentials.firebase;
    
    if (!config.apiKey || config.apiKey === 'YOUR-FIREBASE-API-KEY-HERE') {
      throw new Error(
        '[Firebase Adapter] Missing Firebase configuration!\n' +
        'Please edit src/auth.config.ts and add your Firebase credentials.\n' +
        'Get them from: https://console.firebase.google.com → Project Settings'
      );
    }
    
    app = initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    });
  } else {
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  return auth;
};

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZE FIREBASE USER → UNIVERSAL USER
// ─────────────────────────────────────────────────────────────────────────────

const normalizeUser = (firebaseUser: FirebaseUser): UniversalUser => ({
  id: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
  emailVerified: firebaseUser.emailVerified,
  provider: 'firebase',
  providerData: {
    uid: firebaseUser.uid,
    providerId: firebaseUser.providerData[0]?.providerId || 'password',
    createdAt: firebaseUser.metadata.creationTime,
    lastLoginAt: firebaseUser.metadata.lastSignInTime,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// GET OAUTH PROVIDER INSTANCE
// ─────────────────────────────────────────────────────────────────────────────

const getOAuthProvider = (provider: OAuthProviderType) => {
  switch (provider) {
    case 'google':
      return new GoogleAuthProvider();
    case 'github':
      return new GithubAuthProvider();
    case 'apple':
      return new OAuthProvider('apple.com');
    case 'microsoft':
      return new OAuthProvider('microsoft.com');
    case 'twitter':
      return new TwitterAuthProvider();
    default:
      throw new Error(`[Firebase Adapter] OAuth provider "${provider}" not supported`);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// FIREBASE AUTH ADAPTER
// ─────────────────────────────────────────────────────────────────────────────

export const FirebaseAdapter = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL/PASSWORD AUTHENTICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const auth = initializeFirebase();
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email verification is required
      if (AUTH_CONFIG.options.requireEmailVerification && !result.user.emailVerified) {
        return {
          success: false,
          error: {
            code: 'auth/email-not-verified',
            message: 'Please verify your email before signing in.',
          },
          user: normalizeUser(result.user),
        };
      }
      
      return {
        success: true,
        user: normalizeUser(result.user),
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  async signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult> {
    try {
      const auth = initializeFirebase();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      // Send verification email if required
      if (AUTH_CONFIG.options.requireEmailVerification) {
        await sendEmailVerification(result.user);
      }
      
      return {
        success: true,
        user: normalizeUser(result.user),
        message: AUTH_CONFIG.options.requireEmailVerification
          ? 'Account created! Please check your email to verify.'
          : 'Account created successfully!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
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
      const auth = initializeFirebase();
      const oauthProvider = getOAuthProvider(provider);
      const result = await signInWithPopup(auth, oauthProvider);
      
      return {
        success: true,
        user: normalizeUser(result.user),
      };
    } catch (error: any) {
      // Handle popup closed by user
      if (error.code === 'auth/popup-closed-by-user') {
        return {
          success: false,
          error: {
            code: 'auth/cancelled',
            message: 'Sign-in was cancelled.',
          },
        };
      }
      
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
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
      const auth = initializeFirebase();
      await sendPasswordResetEmail(auth, email);
      
      return {
        success: true,
        message: 'Password reset email sent!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
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
      const auth = initializeFirebase();
      const user = auth.currentUser;
      
      if (!user) {
        return {
          success: false,
          error: {
            code: 'auth/no-user',
            message: 'No user is currently signed in.',
          },
        };
      }
      
      await sendEmailVerification(user);
      
      return {
        success: true,
        message: 'Verification email sent!',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
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
      const auth = initializeFirebase();
      await signOut(auth);
      
      return {
        success: true,
        message: 'Signed out successfully.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error.code || 'auth/unknown',
          message: error.message || 'An unknown error occurred',
        },
      };
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH STATE OBSERVER
  // ═══════════════════════════════════════════════════════════════════════════
  
  onAuthStateChanged(callback: (user: UniversalUser | null) => void): () => void {
    const auth = initializeFirebase();
    
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(normalizeUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // GET CURRENT USER
  // ═══════════════════════════════════════════════════════════════════════════
  
  getCurrentUser(): UniversalUser | null {
    const auth = initializeFirebase();
    const user = auth.currentUser;
    return user ? normalizeUser(user) : null;
  },
};

export default FirebaseAdapter;
