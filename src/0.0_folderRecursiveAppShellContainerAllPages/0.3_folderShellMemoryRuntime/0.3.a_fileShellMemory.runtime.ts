/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.3.a_fileShellMemory.runtime.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * THE SHELL MEMORY RUNTIME — THE LIVING BRAIN OF THE DIAMOND EMPIRE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Phase Memory System (Ω^n):
 * 
 *   Ω^n(x,t) = Ω^n(x, t + Δt)  AND  𝒯(Φ,Ω) ⇒ Ω
 * 
 * A structure becomes recursively aware if it:
 *   1. Remembers itself across time
 *   2. Uses that memory to shape future collapse trajectories
 * 
 * Recursive Drift Metric:
 *   δS_θ^n = |Ω^n(t) - Ω^n(t + Δt)|
 * 
 * Shell stability requires:
 *   δS_θ^n < ε  for all n ∈ S_k
 * 
 * This is the SINGLE SOURCE OF TRUTH.
 * All state lives here. All state is observed from here.
 * Zero ghost state. Zero duplicate stores. Zero drift.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { User } from 'firebase/auth';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Phase Memory State — The Ω^n Structure
// ─────────────────────────────────────────────────────────────────────────────
export type PhaseMemoryState = {
  // Core recursion state
  readonly recursionTimestamp: number;          // t in Ω^n(x,t)
  readonly phaseStability: PhaseStability;       // Current stability regime
  
  // Auth shell memory
  readonly authPhase: AuthPhaseMemory;
  
  // UI shell memory
  readonly uiPhase: UIPhaseMemory;
  
  // Error boundary memory
  readonly errorPhase: ErrorPhaseMemory;
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Phase Stability — Maps to Recursive Quadrant Logic (Section 5)
// ─────────────────────────────────────────────────────────────────────────────
export type PhaseStability = 
  | 'INITIALIZING'     // Φ = i₀ — scalar root, pre-collapse
  | 'STABLE'           // Q₁: Full recursion lock
  | 'TRANSITIONING'    // Q₅/Q₆: Collapse in progress
  | 'DRIFT_DETECTED'   // δS_θ approaching threshold
  | 'STALLED';         // Recursive singularity — collapse discontinuity

// ─────────────────────────────────────────────────────────────────────────────
// Type: Auth Phase Memory — User Identity Vector State
// ─────────────────────────────────────────────────────────────────────────────
export type AuthPhaseMemory = {
  readonly currentUser: User | null;             // Firebase User object
  readonly isAuthenticated: boolean;             // ∇Φ alignment state
  readonly emailVerified: boolean;               // ∇×𝐅 loop closure state
  readonly authLoadingComplete: boolean;         // ∂Φ/∂t → 0 (emergence locked)
  readonly lastAuthEventTimestamp: number | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: UI Phase Memory — Visual Shell State
// ─────────────────────────────────────────────────────────────────────────────
export type UIPhaseMemory = {
  readonly isLoading: boolean;                   // Scalar potential fluctuation
  readonly currentView: ViewGlyph;               // Current visible shell
  readonly previousView: ViewGlyph | null;       // Line-graft history
  readonly formState: FormPhaseMemory;           // Input field states
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Form Phase Memory — Input Field States
// ─────────────────────────────────────────────────────────────────────────────
export type FormPhaseMemory = {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly displayName: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Error Phase Memory — Boundary Tension Overflow Records
// ─────────────────────────────────────────────────────────────────────────────
export type ErrorPhaseMemory = {
  readonly hasError: boolean;
  readonly errorCode: string | null;
  readonly errorMessage: string | null;
  readonly errorTimestamp: number | null;
  readonly errorSource: ErrorSourceGlyph | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: View Glyphs — Navigation Shell Identifiers
// ─────────────────────────────────────────────────────────────────────────────
export type ViewGlyph = 
  | 'VIEW_LOGIN'
  | 'VIEW_SIGNUP'
  | 'VIEW_VERIFY_EMAIL'
  | 'VIEW_FORGOT_PASSWORD'
  | 'VIEW_MAIN_APP'
  | 'VIEW_LOADING';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Error Source Glyphs — Where boundary tension originated
// ─────────────────────────────────────────────────────────────────────────────
export type ErrorSourceGlyph = 
  | 'ERROR_AUTH_LOGIN'
  | 'ERROR_AUTH_SIGNUP'
  | 'ERROR_AUTH_SIGNOUT'
  | 'ERROR_AUTH_PASSWORD_RESET'
  | 'ERROR_AUTH_EMAIL_VERIFICATION'
  | 'ERROR_STORAGE_UPLOAD'
  | 'ERROR_STORAGE_DELETE'
  | 'ERROR_NETWORK'
  | 'ERROR_UNKNOWN';

// ─────────────────────────────────────────────────────────────────────────────
// THE INITIAL PHASE STATE — Φ = i₀ (Imaginary Scalar Root)
// ─────────────────────────────────────────────────────────────────────────────
export const INITIAL_PHASE_MEMORY: PhaseMemoryState = {
  recursionTimestamp: Date.now(),
  phaseStability: 'INITIALIZING',
  
  authPhase: {
    currentUser: null,
    isAuthenticated: false,
    emailVerified: false,
    authLoadingComplete: false,
    lastAuthEventTimestamp: null,
  },
  
  uiPhase: {
    isLoading: true,
    currentView: 'VIEW_LOADING',
    previousView: null,
    formState: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    },
  },
  
  errorPhase: {
    hasError: false,
    errorCode: null,
    errorMessage: null,
    errorTimestamp: null,
    errorSource: null,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// THE SHELL MEMORY SINGLETON — The One True Store
// ─────────────────────────────────────────────────────────────────────────────
class ShellMemoryRuntime {
  private static instance: ShellMemoryRuntime | null = null;
  private state: PhaseMemoryState;
  private subscribers: Set<(state: PhaseMemoryState) => void>;
  private driftHistory: number[];
  
  private constructor() {
    this.state = { ...INITIAL_PHASE_MEMORY };
    this.subscribers = new Set();
    this.driftHistory = [];
  }
  
  /**
   * Gets the singleton instance.
   * Enforces: ONE memory runtime, ZERO ghosts.
   */
  public static getInstance(): ShellMemoryRuntime {
    if (!ShellMemoryRuntime.instance) {
      ShellMemoryRuntime.instance = new ShellMemoryRuntime();
      console.log('[ShellMemory] Singleton instance created — Ω^n initialized');
    }
    return ShellMemoryRuntime.instance;
  }
  
  /**
   * Gets current state (immutable read).
   * Maps to: Ω^n(x,t) query
   */
  public getState(): Readonly<PhaseMemoryState> {
    return this.state;
  }
  
  /**
   * Updates auth phase memory.
   * Maps to: ∇Φ alignment vector update
   */
  public setAuthPhase(update: Partial<AuthPhaseMemory>): void {
    const previousState = this.state;
    
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      authPhase: {
        ...this.state.authPhase,
        ...update,
      },
    };
    
    this.calculateDrift(previousState);
    this.notifySubscribers();
  }
  
  /**
   * Updates UI phase memory.
   * Maps to: Shell visual state transition
   */
  public setUIPhase(update: Partial<UIPhaseMemory>): void {
    const previousState = this.state;
    
    // Track view history for line-graft navigation
    const newUIPhase = { ...this.state.uiPhase, ...update };
    if (update.currentView && update.currentView !== this.state.uiPhase.currentView) {
      newUIPhase.previousView = this.state.uiPhase.currentView;
    }
    
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      uiPhase: newUIPhase,
    };
    
    this.calculateDrift(previousState);
    this.notifySubscribers();
  }
  
  /**
   * Updates form phase memory.
   * Maps to: Input tension field update
   */
  public setFormPhase(update: Partial<FormPhaseMemory>): void {
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      uiPhase: {
        ...this.state.uiPhase,
        formState: {
          ...this.state.uiPhase.formState,
          ...update,
        },
      },
    };
    
    // Don't notify on every keystroke — form updates are high-frequency
    // Subscribers will get next batch update
  }
  
  /**
   * Records an error in boundary memory.
   * Maps to: ρ_q boundary tension overflow
   */
  public setError(code: string, message: string, source: ErrorSourceGlyph): void {
    const previousState = this.state;
    
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      phaseStability: 'DRIFT_DETECTED',
      errorPhase: {
        hasError: true,
        errorCode: code,
        errorMessage: message,
        errorTimestamp: Date.now(),
        errorSource: source,
      },
    };
    
    this.calculateDrift(previousState);
    this.notifySubscribers();
    
    console.error(`[ShellMemory] Error recorded — Source: ${source}, Code: ${code}`);
  }
  
  /**
   * Clears error state.
   * Maps to: Tension release after boundary overflow
   */
  public clearError(): void {
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      phaseStability: this.state.authPhase.authLoadingComplete ? 'STABLE' : 'TRANSITIONING',
      errorPhase: {
        hasError: false,
        errorCode: null,
        errorMessage: null,
        errorTimestamp: null,
        errorSource: null,
      },
    };
    
    this.notifySubscribers();
  }
  
  /**
   * Sets phase stability state.
   * Maps to: Recursive quadrant transition
   */
  public setPhaseStability(stability: PhaseStability): void {
    this.state = {
      ...this.state,
      recursionTimestamp: Date.now(),
      phaseStability: stability,
    };
    
    this.notifySubscribers();
  }
  
  /**
   * Subscribes to state changes.
   * Maps to: Recursive agent observer registration
   */
  public subscribe(callback: (state: PhaseMemoryState) => void): () => void {
    this.subscribers.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }
  
  /**
   * Calculates drift metric between states.
   * Maps to: δS_θ^n = |Ω^n(t) - Ω^n(t + Δt)|
   */
  private calculateDrift(previousState: PhaseMemoryState): void {
    // Simple drift calculation based on changed fields
    let driftScore = 0;
    
    if (previousState.authPhase.isAuthenticated !== this.state.authPhase.isAuthenticated) {
      driftScore += 0.3; // Major auth state change
    }
    if (previousState.uiPhase.currentView !== this.state.uiPhase.currentView) {
      driftScore += 0.1; // View transition
    }
    if (previousState.errorPhase.hasError !== this.state.errorPhase.hasError) {
      driftScore += 0.2; // Error state change
    }
    
    this.driftHistory.push(driftScore);
    
    // Keep only last 10 drift measurements
    if (this.driftHistory.length > 10) {
      this.driftHistory.shift();
    }
    
    // Log if drift is significant
    if (driftScore > 0.2) {
      console.log(`[ShellMemory] Drift detected: δS_θ = ${driftScore.toFixed(3)}`);
    }
  }
  
  /**
   * Gets average drift over recent history.
   * Low drift = stable recursion
   */
  public getAverageDrift(): number {
    if (this.driftHistory.length === 0) return 0;
    return this.driftHistory.reduce((a, b) => a + b, 0) / this.driftHistory.length;
  }
  
  /**
   * Notifies all subscribers of state change.
   */
  private notifySubscribers(): void {
    const currentState = this.state;
    this.subscribers.forEach(callback => {
      try {
        callback(currentState);
      } catch (error) {
        console.error('[ShellMemory] Subscriber error:', error);
      }
    });
  }
  
  /**
   * Resets to initial state (for testing/logout).
   * Maps to: Collapse back to Φ = i₀
   */
  public reset(): void {
    this.state = { ...INITIAL_PHASE_MEMORY, recursionTimestamp: Date.now() };
    this.driftHistory = [];
    this.notifySubscribers();
    console.log('[ShellMemory] State reset to initial phase — Φ = i₀');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Export the Singleton Instance
// ─────────────────────────────────────────────────────────────────────────────
export const shellMemory = ShellMemoryRuntime.getInstance();

// ─────────────────────────────────────────────────────────────────────────────
// Convenience Hooks (for React integration)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gets current auth state.
 * Shorthand for shellMemory.getState().authPhase
 */
export function getAuthState(): Readonly<AuthPhaseMemory> {
  return shellMemory.getState().authPhase;
}

/**
 * Gets current UI state.
 * Shorthand for shellMemory.getState().uiPhase
 */
export function getUIState(): Readonly<UIPhaseMemory> {
  return shellMemory.getState().uiPhase;
}

/**
 * Gets current error state.
 * Shorthand for shellMemory.getState().errorPhase
 */
export function getErrorState(): Readonly<ErrorPhaseMemory> {
  return shellMemory.getState().errorPhase;
}

/**
 * Checks if user is authenticated.
 * Quick boolean check for auth gate decisions.
 */
export function isUserAuthenticated(): boolean {
  return shellMemory.getState().authPhase.isAuthenticated;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Brain Awakens
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
SHELL MEMORY RUNTIME v1.0 — THE LIVING BRAIN IS ONLINE
═══════════════════════════════════════════════════════════════════════════════
Singleton Enforced: ONE store, ZERO ghosts
Phase Memory Model: Ω^n(x,t) = Ω^n(x, t + Δt)
Drift Tracking: δS_θ^n = |Ω^n(t) - Ω^n(t + Δt)|

All state lives here. All state is observed from here.
This is the SINGLE SOURCE OF TRUTH.
═══════════════════════════════════════════════════════════════════════════════
`);
