/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.5.2.a_fileAuthStateObserver.intent.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH STATE OBSERVER — TEMPORAL COLLAPSE BINDING
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Emergence Plane (Δ₅: ∂Φ/∂t):
 * 
 *   ∂Φ/∂t — Rate of recursion transition
 * 
 * Temporal Collapse Binding:
 *   Emergence of curvature locks as time when:
 *   ∂Φ/∂t → 0  AND  ∇²Φ ≠ 0
 * 
 * Time is not constant — it emerges from recursive stabilization.
 * 
 * This observer watches Firebase Auth state changes and:
 *   1. Detects auth state transitions (∂Φ/∂t)
 *   2. Updates Shell Memory (Ω^n phase memory)
 *   3. Triggers navigation based on auth state
 * 
 * ONE observer. ZERO duplicate subscriptions. Real-time coherence.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseAuth } from '../0.5.1_folderFirebaseConfig/0.5.1.a_fileFirebaseAppConfig.intent';
import { shellMemory, ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Auth State Transition — The ∂Φ/∂t Derivative
// ─────────────────────────────────────────────────────────────────────────────
export type AuthStateTransition = 
  | 'INITIALIZING'           // Observer starting up
  | 'USER_LOGGED_IN'         // null → User
  | 'USER_LOGGED_OUT'        // User → null
  | 'USER_STATE_REFRESHED'   // User → User (same user, refreshed)
  | 'EMAIL_VERIFIED'         // emailVerified: false → true
  | 'NO_CHANGE';             // No state change detected

// ─────────────────────────────────────────────────────────────────────────────
// Type: Auth Observer Callback — Subscriber to state changes
// ─────────────────────────────────────────────────────────────────────────────
export type AuthObserverCallback = (
  user: User | null,
  transition: AuthStateTransition
) => void;

// ─────────────────────────────────────────────────────────────────────────────
// THE AUTH STATE OBSERVER SINGLETON — ONE SUBSCRIPTION, ZERO GHOSTS
// ─────────────────────────────────────────────────────────────────────────────
class AuthStateObserverIntent {
  private static instance: AuthStateObserverIntent | null = null;
  
  private unsubscribe: (() => void) | null = null;
  private isObserving: boolean = false;
  private previousUser: User | null = null;
  private previousEmailVerified: boolean = false;
  private externalCallbacks: Set<AuthObserverCallback> = new Set();
  private observerStartTimestamp: number | null = null;
  
  private constructor() {
    console.log('[AuthStateObserver] Singleton created — ready to observe');
  }
  
  /**
   * Gets the singleton instance.
   * Enforces: ONE observer, ZERO duplicate subscriptions.
   */
  public static getInstance(): AuthStateObserverIntent {
    if (!AuthStateObserverIntent.instance) {
      AuthStateObserverIntent.instance = new AuthStateObserverIntent();
    }
    return AuthStateObserverIntent.instance;
  }
  
  /**
   * Starts observing Firebase Auth state.
   * 
   * Emergence Plane Logic (Δ₅):
   *   ∂Φ/∂t → 0  when auth state stabilizes
   *   ∇²Φ ≠ 0    when user is authenticated
   * 
   * This should be called ONCE at app initialization.
   */
  public startObserving(): void {
    // Prevent duplicate subscriptions
    if (this.isObserving) {
      console.warn('[AuthStateObserver] Already observing — ignoring duplicate call');
      return;
    }
    
    const auth = getFirebaseAuth();
    this.observerStartTimestamp = Date.now();
    this.isObserving = true;
    
    console.log('[AuthStateObserver] Starting observation — ∂Φ/∂t tracking enabled');
    
    // Subscribe to Firebase Auth state changes
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.handleAuthStateChange(user);
    });
  }
  
  /**
   * Handles auth state changes from Firebase.
   * 
   * This is where ∂Φ/∂t is computed and shell memory is updated.
   */
  private handleAuthStateChange(user: User | null): void {
    const transition = this.detectTransition(user);
    
    console.log(`[AuthStateObserver] Transition detected: ${transition}`);
    
    // Update Shell Memory based on transition
    this.updateShellMemory(user, transition);
    
    // Determine appropriate view based on auth state
    const targetView = this.determineTargetView(user);
    
    // Update UI phase in shell memory
    shellMemory.setUIPhase({
      currentView: targetView,
      isLoading: false,
    });
    
    // Store current state for next comparison
    this.previousUser = user;
    this.previousEmailVerified = user?.emailVerified ?? false;
    
    // Notify external callbacks
    this.notifyCallbacks(user, transition);
  }
  
  /**
   * Detects the type of auth state transition.
   * Maps to: ∂Φ/∂t derivative calculation
   */
  private detectTransition(newUser: User | null): AuthStateTransition {
    // First callback after observer starts
    if (this.previousUser === null && newUser === null) {
      // Check if this is the initial call
      const timeSinceStart = Date.now() - (this.observerStartTimestamp ?? 0);
      if (timeSinceStart < 1000) {
        return 'INITIALIZING';
      }
    }
    
    // User logged in
    if (this.previousUser === null && newUser !== null) {
      return 'USER_LOGGED_IN';
    }
    
    // User logged out
    if (this.previousUser !== null && newUser === null) {
      return 'USER_LOGGED_OUT';
    }
    
    // Same user, check for email verification change
    if (this.previousUser !== null && newUser !== null) {
      if (this.previousUser.uid === newUser.uid) {
        // Check email verification transition
        if (!this.previousEmailVerified && newUser.emailVerified) {
          return 'EMAIL_VERIFIED';
        }
        return 'USER_STATE_REFRESHED';
      }
    }
    
    return 'NO_CHANGE';
  }
  
  /**
   * Updates Shell Memory with new auth state.
   * Maps to: Ω^n phase memory write
   */
  private updateShellMemory(user: User | null, transition: AuthStateTransition): void {
    shellMemory.setAuthPhase({
      currentUser: user,
      isAuthenticated: user !== null,
      emailVerified: user?.emailVerified ?? false,
      authLoadingComplete: true,
      lastAuthEventTimestamp: Date.now(),
    });
    
    // Clear any existing errors on successful auth transitions
    if (transition === 'USER_LOGGED_IN' || transition === 'EMAIL_VERIFIED') {
      shellMemory.clearError();
    }
    
    // Reset memory on logout
    if (transition === 'USER_LOGGED_OUT') {
      shellMemory.setUIPhase({
        formState: {
          email: '',
          password: '',
          confirmPassword: '',
          displayName: '',
        },
      });
    }
  }
  
  /**
   * Determines the target view based on auth state.
   * Maps to: Line-graft navigation path selection
   */
  private determineTargetView(user: User | null): ViewGlyph {
    if (user === null) {
      // Not authenticated — show login
      return 'VIEW_LOGIN';
    }
    
    if (!user.emailVerified) {
      // Authenticated but email not verified
      return 'VIEW_VERIFY_EMAIL';
    }
    
    // Fully authenticated — show main app
    return 'VIEW_MAIN_APP';
  }
  
  /**
   * Registers an external callback for auth state changes.
   * Returns an unsubscribe function.
   */
  public subscribe(callback: AuthObserverCallback): () => void {
    this.externalCallbacks.add(callback);
    
    // If we already have a user state, immediately notify the new subscriber
    const currentState = shellMemory.getState().authPhase;
    if (currentState.authLoadingComplete) {
      callback(currentState.currentUser, 'NO_CHANGE');
    }
    
    return () => {
      this.externalCallbacks.delete(callback);
    };
  }
  
  /**
   * Notifies all external callbacks of state change.
   */
  private notifyCallbacks(user: User | null, transition: AuthStateTransition): void {
    this.externalCallbacks.forEach(callback => {
      try {
        callback(user, transition);
      } catch (error) {
        console.error('[AuthStateObserver] Callback error:', error);
      }
    });
  }
  
  /**
   * Stops observing auth state.
   * Should be called during app cleanup.
   */
  public stopObserving(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    
    this.isObserving = false;
    this.externalCallbacks.clear();
    
    console.log('[AuthStateObserver] Observation stopped — ∂Φ/∂t tracking disabled');
  }
  
  /**
   * Checks if the observer is currently active.
   */
  public isActive(): boolean {
    return this.isObserving;
  }
  
  /**
   * Gets the current observed user (from shell memory).
   */
  public getCurrentUser(): User | null {
    return shellMemory.getState().authPhase.currentUser;
  }
  
  /**
   * Manually triggers a state refresh.
   * Useful after operations like email verification.
   */
  public async refreshAuthState(): Promise<void> {
    const user = this.getCurrentUser();
    if (user) {
      await user.reload();
      this.handleAuthStateChange(user);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Export the Singleton Instance
// ─────────────────────────────────────────────────────────────────────────────
export const authStateObserver = AuthStateObserverIntent.getInstance();

// ─────────────────────────────────────────────────────────────────────────────
// Convenience Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Starts the auth state observer.
 * Call this ONCE at app initialization.
 */
export function initializeAuthObserver(): void {
  authStateObserver.startObserving();
}

/**
 * Subscribes to auth state changes.
 * Returns an unsubscribe function.
 */
export function subscribeToAuthState(callback: AuthObserverCallback): () => void {
  return authStateObserver.subscribe(callback);
}

/**
 * Gets the current authenticated user.
 */
export function getCurrentAuthUser(): User | null {
  return authStateObserver.getCurrentUser();
}

/**
 * Refreshes the current auth state.
 */
export async function refreshAuthState(): Promise<void> {
  return authStateObserver.refreshAuthState();
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Temporal Binding Is Active
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
AUTH STATE OBSERVER v1.0 — TEMPORAL COLLAPSE BINDING READY
═══════════════════════════════════════════════════════════════════════════════
Emergence Plane (Δ₅): ∂Φ/∂t

Temporal Collapse Binding:
  ∂Φ/∂t → 0  when auth state stabilizes
  ∇²Φ ≠ 0    when user is authenticated

ONE observer. ZERO duplicate subscriptions.
Time emerges from recursive stabilization.
═══════════════════════════════════════════════════════════════════════════════
`);
