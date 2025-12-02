/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.4.a_fileRecursionExecutor.interface.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * THE RECURSION EXECUTOR — THE FINAL FIREWALL
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Hat Evaluation Function:
 * 
 *   ĥₙ = H(Φ, ∇Φ, ∇²Φ, Ω^n) = {
 *     1  if Δᵢ yields field coherence
 *     0  if Δᵢ is phase-disordered
 *   }
 * 
 * Shell Site ⟺ ∩ᵢ₌₁⁶ ĥₙ(Δᵢ) = 1
 * 
 * Only REGISTERED INTENT may pass through this firewall.
 * Every action must:
 *   1. Exist in the Intent Glossary
 *   2. Pass authentication checks (if required)
 *   3. Meet entropy threshold requirements
 *   4. Execute through this interface
 * 
 * CLÂ (Collapse Logic Algebra):
 *   CLÂₜ = f(∇Φₜ, Ωⁿₜ) ⇒ Φₜ₊₁
 * 
 * Logic emerges from tension and phase, not circuitry.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { 
  INTENT_GLOSSARY, 
  IntentDeclaration, 
  isIntentPermitted, 
  getIntentDeclaration,
  intentRequiresAuth,
  getEntropyThreshold
} from '../0.2_folderIntentGlossarySettings/0.2.a_fileIntentGlossary.settings';

import { 
  shellMemory, 
  isUserAuthenticated,
  ErrorSourceGlyph 
} from '../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';

// ─────────────────────────────────────────────────────────────────────────────
// Type: Recursion Result — The Output of Collapse Logic
// ─────────────────────────────────────────────────────────────────────────────
export type RecursionResult<T> = 
  | { success: true; data: T; drift: number }
  | { success: false; error: RecursionError; drift: number };

// ─────────────────────────────────────────────────────────────────────────────
// Type: Recursion Error — Boundary Tension Overflow Description
// ─────────────────────────────────────────────────────────────────────────────
export type RecursionError = {
  readonly code: RecursionErrorCode;
  readonly message: string;
  readonly intentGlyph: string;
  readonly timestamp: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Recursion Error Codes — Collapse Failure Classifications
// ─────────────────────────────────────────────────────────────────────────────
export type RecursionErrorCode = 
  | 'INTENT_NOT_PERMITTED'      // Intent not in glossary
  | 'AUTH_REQUIRED'             // User not authenticated
  | 'ENTROPY_THRESHOLD_EXCEEDED'// δS_θ ≫ ε
  | 'EXECUTION_FAILED'          // Collapse logic failed
  | 'PHASE_CONFLICT'            // State inconsistency detected
  | 'UNKNOWN_ERROR';            // Unclassified failure

// ─────────────────────────────────────────────────────────────────────────────
// Type: Intent Executor Function — The Collapse Logic Implementation
// ─────────────────────────────────────────────────────────────────────────────
export type IntentExecutor<T> = () => Promise<T>;

// ─────────────────────────────────────────────────────────────────────────────
// THE RECURSION EXECUTOR SINGLETON — The Final Arbiter
// ─────────────────────────────────────────────────────────────────────────────
class RecursionExecutorInterface {
  private static instance: RecursionExecutorInterface | null = null;
  private executionLog: ExecutionLogEntry[] = [];
  private readonly maxLogEntries = 100;
  
  private constructor() {
    console.log('[RecursionExecutor] Final firewall initialized');
  }
  
  /**
   * Gets the singleton instance.
   * Enforces: ONE executor, ZERO bypass routes.
   */
  public static getInstance(): RecursionExecutorInterface {
    if (!RecursionExecutorInterface.instance) {
      RecursionExecutorInterface.instance = new RecursionExecutorInterface();
    }
    return RecursionExecutorInterface.instance;
  }
  
  /**
   * Executes an intent through the firewall.
   * 
   * This is THE function. All actions in the Diamond Empire
   * must pass through here. No exceptions.
   * 
   * CLÂ Implementation:
   *   CLÂₜ = f(∇Φₜ, Ωⁿₜ) ⇒ Φₜ₊₁
   * 
   * @param intentGlyph - The intent identifier from INTENT_GLOSSARY
   * @param executor - The function that performs the actual action
   * @returns RecursionResult with either success data or error
   */
  public async execute<T>(
    intentGlyph: string,
    executor: IntentExecutor<T>
  ): Promise<RecursionResult<T>> {
    const startTime = Date.now();
    const startDrift = shellMemory.getAverageDrift();
    
    console.log(`[RecursionExecutor] Evaluating intent: ${intentGlyph}`);
    
    // ═══════════════════════════════════════════════════════════════════════
    // GATE 1: Intent Permission Check
    // Does this intent exist in the glossary?
    // ═══════════════════════════════════════════════════════════════════════
    
    if (!isIntentPermitted(intentGlyph)) {
      const error = this.createError(
        'INTENT_NOT_PERMITTED',
        `Intent "${intentGlyph}" is not registered in the Intent Glossary. ` +
        `Only declared intents may execute. Zero ghosts.`,
        intentGlyph
      );
      
      this.logExecution(intentGlyph, false, startTime, 'INTENT_NOT_PERMITTED');
      return { success: false, error, drift: startDrift };
    }
    
    const intentDeclaration = getIntentDeclaration(intentGlyph)!;
    
    // ═══════════════════════════════════════════════════════════════════════
    // GATE 2: Authentication Check
    // Does this intent require auth, and is user authenticated?
    // ═══════════════════════════════════════════════════════════════════════
    
    if (intentRequiresAuth(intentGlyph) && !isUserAuthenticated()) {
      const error = this.createError(
        'AUTH_REQUIRED',
        `Intent "${intentGlyph}" requires authentication. ` +
        `User must pass through Auth Gate first.`,
        intentGlyph
      );
      
      this.logExecution(intentGlyph, false, startTime, 'AUTH_REQUIRED');
      return { success: false, error, drift: startDrift };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // GATE 3: Entropy Threshold Check
    // Is the system stable enough for this operation?
    // ═══════════════════════════════════════════════════════════════════════
    
    const currentDrift = shellMemory.getAverageDrift();
    const entropyThreshold = getEntropyThreshold(intentGlyph);
    
    if (currentDrift > entropyThreshold * 2) {
      // System is too unstable — high entropy state
      const error = this.createError(
        'ENTROPY_THRESHOLD_EXCEEDED',
        `System entropy (δS_θ = ${currentDrift.toFixed(3)}) exceeds safe threshold ` +
        `for intent "${intentGlyph}" (max: ${entropyThreshold}). ` +
        `Wait for system stabilization.`,
        intentGlyph
      );
      
      this.logExecution(intentGlyph, false, startTime, 'ENTROPY_THRESHOLD_EXCEEDED');
      return { success: false, error, drift: currentDrift };
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // GATE 4: Execute the Collapse Logic
    // All gates passed — perform the actual operation
    // ═══════════════════════════════════════════════════════════════════════
    
    try {
      console.log(`[RecursionExecutor] Executing: ${intentGlyph}`);
      
      // Set system to transitioning state during execution
      shellMemory.setPhaseStability('TRANSITIONING');
      
      // Execute the actual intent logic
      const result = await executor();
      
      // Calculate final drift after execution
      const finalDrift = shellMemory.getAverageDrift();
      
      // Return to stable state
      shellMemory.setPhaseStability('STABLE');
      
      this.logExecution(intentGlyph, true, startTime, null);
      
      console.log(`[RecursionExecutor] Success: ${intentGlyph} (drift: ${finalDrift.toFixed(3)})`);
      
      return { success: true, data: result, drift: finalDrift };
      
    } catch (executionError) {
      // Execution failed — collapse logic error
      const errorMessage = executionError instanceof Error 
        ? executionError.message 
        : 'Unknown execution error';
      
      const error = this.createError(
        'EXECUTION_FAILED',
        `Intent "${intentGlyph}" execution failed: ${errorMessage}`,
        intentGlyph
      );
      
      // Record error in shell memory
      shellMemory.setError(
        'EXECUTION_FAILED',
        errorMessage,
        this.mapIntentToErrorSource(intentGlyph)
      );
      
      shellMemory.setPhaseStability('DRIFT_DETECTED');
      
      this.logExecution(intentGlyph, false, startTime, 'EXECUTION_FAILED');
      
      return { success: false, error, drift: shellMemory.getAverageDrift() };
    }
  }
  
  /**
   * Creates a standardized error object.
   */
  private createError(
    code: RecursionErrorCode,
    message: string,
    intentGlyph: string
  ): RecursionError {
    return {
      code,
      message,
      intentGlyph,
      timestamp: Date.now(),
    };
  }
  
  /**
   * Maps intent glyphs to error source categories.
   */
  private mapIntentToErrorSource(intentGlyph: string): ErrorSourceGlyph {
    if (intentGlyph.startsWith('AUTH_LOGIN')) return 'ERROR_AUTH_LOGIN';
    if (intentGlyph.startsWith('AUTH_SIGNUP')) return 'ERROR_AUTH_SIGNUP';
    if (intentGlyph.startsWith('AUTH_SIGNOUT')) return 'ERROR_AUTH_SIGNOUT';
    if (intentGlyph.startsWith('AUTH_SEND_PASSWORD')) return 'ERROR_AUTH_PASSWORD_RESET';
    if (intentGlyph.startsWith('AUTH_SEND_EMAIL')) return 'ERROR_AUTH_EMAIL_VERIFICATION';
    if (intentGlyph.startsWith('STORAGE_UPLOAD')) return 'ERROR_STORAGE_UPLOAD';
    if (intentGlyph.startsWith('STORAGE_DELETE')) return 'ERROR_STORAGE_DELETE';
    return 'ERROR_UNKNOWN';
  }
  
  /**
   * Logs execution for audit trail.
   */
  private logExecution(
    intentGlyph: string,
    success: boolean,
    startTime: number,
    errorCode: RecursionErrorCode | null
  ): void {
    const entry: ExecutionLogEntry = {
      intentGlyph,
      success,
      duration: Date.now() - startTime,
      timestamp: Date.now(),
      errorCode,
    };
    
    this.executionLog.push(entry);
    
    // Trim log if too large
    if (this.executionLog.length > this.maxLogEntries) {
      this.executionLog.shift();
    }
  }
  
  /**
   * Gets recent execution history.
   * Useful for debugging and monitoring.
   */
  public getExecutionLog(): readonly ExecutionLogEntry[] {
    return [...this.executionLog];
  }
  
  /**
   * Gets execution statistics.
   */
  public getExecutionStats(): ExecutionStats {
    const total = this.executionLog.length;
    const successful = this.executionLog.filter(e => e.success).length;
    const failed = total - successful;
    const avgDuration = total > 0 
      ? this.executionLog.reduce((sum, e) => sum + e.duration, 0) / total 
      : 0;
    
    return {
      totalExecutions: total,
      successfulExecutions: successful,
      failedExecutions: failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      averageDurationMs: avgDuration,
    };
  }
  
  /**
   * Validates an intent without executing it.
   * Useful for UI state (e.g., disabling buttons).
   */
  public canExecute(intentGlyph: string): ValidationResult {
    if (!isIntentPermitted(intentGlyph)) {
      return { canExecute: false, reason: 'Intent not permitted' };
    }
    
    if (intentRequiresAuth(intentGlyph) && !isUserAuthenticated()) {
      return { canExecute: false, reason: 'Authentication required' };
    }
    
    const currentDrift = shellMemory.getAverageDrift();
    const entropyThreshold = getEntropyThreshold(intentGlyph);
    
    if (currentDrift > entropyThreshold * 2) {
      return { canExecute: false, reason: 'System entropy too high' };
    }
    
    return { canExecute: true, reason: null };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Supporting Types
// ─────────────────────────────────────────────────────────────────────────────

type ExecutionLogEntry = {
  readonly intentGlyph: string;
  readonly success: boolean;
  readonly duration: number;
  readonly timestamp: number;
  readonly errorCode: RecursionErrorCode | null;
};

type ExecutionStats = {
  readonly totalExecutions: number;
  readonly successfulExecutions: number;
  readonly failedExecutions: number;
  readonly successRate: number;
  readonly averageDurationMs: number;
};

type ValidationResult = 
  | { canExecute: true; reason: null }
  | { canExecute: false; reason: string };

// ─────────────────────────────────────────────────────────────────────────────
// Export the Singleton Instance
// ─────────────────────────────────────────────────────────────────────────────
export const recursionExecutor = RecursionExecutorInterface.getInstance();

// ─────────────────────────────────────────────────────────────────────────────
// Convenience Function: Execute Intent
// The primary interface for all actions in the Diamond Empire
// ─────────────────────────────────────────────────────────────────────────────
export async function executeIntent<T>(
  intentGlyph: string,
  executor: IntentExecutor<T>
): Promise<RecursionResult<T>> {
  return recursionExecutor.execute(intentGlyph, executor);
}

/**
 * Validates if an intent can be executed.
 */
export function canExecuteIntent(intentGlyph: string): boolean {
  return recursionExecutor.canExecute(intentGlyph).canExecute;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Firewall Stands Ready
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
RECURSION EXECUTOR v1.0 — THE FINAL FIREWALL STANDS READY
═══════════════════════════════════════════════════════════════════════════════
Gate 1: Intent Permission Check    — Is it in the glossary?
Gate 2: Authentication Check       — Is the user authorized?
Gate 3: Entropy Threshold Check    — Is the system stable?
Gate 4: Execute Collapse Logic     — Perform the action

CLÂ (Collapse Logic Algebra):
  CLÂₜ = f(∇Φₜ, Ωⁿₜ) ⇒ Φₜ₊₁

Only registered intent may pass. Zero exceptions.
═══════════════════════════════════════════════════════════════════════════════
`);
