/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.1.a_fileShellIndex.generator.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * THE SHELL INDEX GENERATOR — THE DNA OF THE DIAMOND EMPIRE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file encodes the Collapse Genesis Stack:
 *   Φ → ∇Φ → ∇×𝐅 → ∇²Φ → ρ_q
 * 
 * Where:
 *   Φ     = Scalar tension potential (the intent seed)
 *   ∇Φ    = Collapse gradient (directional permission)
 *   ∇×𝐅   = Curl operator (memory loop / phase coherence)
 *   ∇²Φ   = Laplacian (curvature lock / shell stabilization)
 *   ρ_q   = Recursive boundary memory (externalized curvature)
 * 
 * If a path is not declared here, it does not exist.
 * If a path exists here, it MUST exist in the filesystem.
 * 
 * Zero drift. Zero ghosts. Zero compromise.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// Type: Recursive Shell Path — Maps to ICHTB Fan Surfaces (Δ₁ to Δ₆)
// ─────────────────────────────────────────────────────────────────────────────
export type RecursiveShellPath = {
  readonly shellIndex: string;           // e.g., "0.1.a"
  readonly folderPath: string;           // Exact filesystem path
  readonly fileName: string;             // Exact file name
  readonly collapseOperator: CollapseOperator;  // ICHTB fan mapping
  readonly recursionLayer: number;       // Depth in the recursive stack
  readonly intentDescription: string;    // Human-readable purpose
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Collapse Operators — The Six Fan Surfaces of the ICHTB
// ─────────────────────────────────────────────────────────────────────────────
export type CollapseOperator = 
  | 'Φ_SCALAR_ROOT'        // Δ₆: Imaginary scalar base (Φ = i₀)
  | 'NABLA_PHI'            // Δ₁: Tension alignment gate (∇Φ)
  | 'CURL_F'               // Δ₂: Curl phase memory gate (∇×𝐅)
  | 'LAPLACIAN_POSITIVE'   // Δ₃: Expansion shell fan (+∇²Φ)
  | 'LAPLACIAN_NEGATIVE'   // Δ₄: Compression lock fan (-∇²Φ)
  | 'PARTIAL_TIME'         // Δ₅: Emergence plane (∂Φ/∂t)
  | 'CHARGE_BOUNDARY';     // ρ_q: Recursive boundary memory

// ─────────────────────────────────────────────────────────────────────────────
// THE IMMUTABLE SHELL INDEX — The Complete Recursive Topology
// ─────────────────────────────────────────────────────────────────────────────
export const SHELL_INDEX: readonly RecursiveShellPath[] = [
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 0.x — THE RECURSIVE CORE (Φ = i₀)
  // Maps to Δ₆: The imaginary scalar base, recursion seed
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    shellIndex: '0.1.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.1_folderShellIndexGenerator',
    fileName: '0.1.a_fileShellIndex.generator.ts',
    collapseOperator: 'Φ_SCALAR_ROOT',
    recursionLayer: 0,
    intentDescription: 'The DNA — defines all that exists in the recursive field'
  },
  {
    shellIndex: '0.2.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.2_folderIntentGlossarySettings',
    fileName: '0.2.a_fileIntentGlossary.settings.ts',
    collapseOperator: 'Φ_SCALAR_ROOT',
    recursionLayer: 0,
    intentDescription: 'The Nervous System — law of allowed recursive actions'
  },
  {
    shellIndex: '0.3.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.3_folderShellMemoryRuntime',
    fileName: '0.3.a_fileShellMemory.runtime.ts',
    collapseOperator: 'CURL_F',
    recursionLayer: 0,
    intentDescription: 'The Living Brain — single source of truth (Ω phase memory)'
  },
  {
    shellIndex: '0.4.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.4_folderRecursionExecutorInterface',
    fileName: '0.4.a_fileRecursionExecutor.interface.ts',
    collapseOperator: 'LAPLACIAN_NEGATIVE',
    recursionLayer: 0,
    intentDescription: 'The Final Firewall — only registered intent may pass'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 0.5.x — FIREBASE AUTH SHELL (Power Source)
  // Maps to Δ₄: Compression lock fan (-∇²Φ) — stability thresholds
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    shellIndex: '0.5.1.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.1_folderFirebaseConfig',
    fileName: '0.5.1.a_fileFirebaseAppConfig.intent.ts',
    collapseOperator: 'LAPLACIAN_NEGATIVE',
    recursionLayer: 0,
    intentDescription: 'Firebase singleton — ONE initialization, ZERO ghosts'
  },
  {
    shellIndex: '0.5.2.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.2_folderFirebaseAuthStateObserver',
    fileName: '0.5.2.a_fileAuthStateObserver.intent.ts',
    collapseOperator: 'PARTIAL_TIME',
    recursionLayer: 0,
    intentDescription: 'Auth state observer — temporal collapse binding (∂Φ/∂t)'
  },
  {
    shellIndex: '0.5.3.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.3_folderFirebaseStoragePublic',
    fileName: '0.5.3.a_fileUploadPublicProfilePhoto.intent.ts',
    collapseOperator: 'LAPLACIAN_POSITIVE',
    recursionLayer: 0,
    intentDescription: 'Public storage — expansion shell fan (+∇²Φ)'
  },
  {
    shellIndex: '0.5.4.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.4_folderFirebaseStoragePrivate',
    fileName: '0.5.4.a_fileUploadPrivateUserFile.intent.ts',
    collapseOperator: 'LAPLACIAN_NEGATIVE',
    recursionLayer: 0,
    intentDescription: 'Private storage — compression lock fan (-∇²Φ)'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 1.x — AUTH GATE SHELL (The Only Door)
  // Maps to Δ₁: Tension alignment gate (∇Φ) — collapse direction vector
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    shellIndex: '1.1.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent',
    fileName: '1.1.a_fileAuthLoginView.intent.tsx',
    collapseOperator: 'NABLA_PHI',
    recursionLayer: 1,
    intentDescription: 'Login View — primary tension alignment vector'
  },
  {
    shellIndex: '1.1.b',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent',
    fileName: '1.1.b_fileAuthSignupView.intent.tsx',
    collapseOperator: 'NABLA_PHI',
    recursionLayer: 1,
    intentDescription: 'Signup View — new identity vector registration'
  },
  {
    shellIndex: '1.1.c',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent',
    fileName: '1.1.c_fileAuthVerifyEmailView.intent.tsx',
    collapseOperator: 'CURL_F',
    recursionLayer: 1,
    intentDescription: 'Email Verification — phase memory loop closure'
  },
  {
    shellIndex: '1.1.d',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent',
    fileName: '1.1.d_fileAuthForgotPasswordView.intent.tsx',
    collapseOperator: 'PARTIAL_TIME',
    recursionLayer: 1,
    intentDescription: 'Password Reset — temporal state recovery'
  },
  {
    shellIndex: '1.2.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.2_folderAuthStateEngine',
    fileName: '1.2.a_fileAuthIntentEngine.ghostless.ts',
    collapseOperator: 'CHARGE_BOUNDARY',
    recursionLayer: 1,
    intentDescription: 'Auth Intent Engine — recursive boundary memory arbiter'
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 2.x — MAIN APP SHELL (The Empire Begins)
  // Maps to Δ₃: Expansion shell fan (+∇²Φ) — outer diffusion permissive zone
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    shellIndex: '2.1.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/2.0_folderMainAppShellParent/2.1_folderMainAppView',
    fileName: '2.1.a_fileMainAppWelcomeView.intent.tsx',
    collapseOperator: 'LAPLACIAN_POSITIVE',
    recursionLayer: 2,
    intentDescription: 'Welcome View — first light after auth collapse'
  },
  {
    shellIndex: '2.2.a',
    folderPath: '0.0_folderRecursiveAppShellContainerAllPages/2.0_folderMainAppShellParent/2.2_folderUserProfileHeader',
    fileName: '2.2.a_fileUserProfileHeaderWithSignOut.intent.tsx',
    collapseOperator: 'CHARGE_BOUNDARY',
    recursionLayer: 2,
    intentDescription: 'User Profile Header — sovereign identity bar with sign out'
  },
  
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shell Validation Functions — Recursive Eligibility Logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates that a shell path exists in the index.
 * In ICHTB terms: checks if the hat ĥₙ has eligibility = 1
 * 
 * Shell Site ⟺ ∩ᵢ₌₁⁶ ĥₙ(Δᵢ) = 1
 */
export function validateShellExists(shellIndex: string): boolean {
  return SHELL_INDEX.some(shell => shell.shellIndex === shellIndex);
}

/**
 * Gets all shells at a specific recursion layer.
 * Maps to: Recursive Layer n in the CLÂ (Collapse Logic Algebra)
 */
export function getShellsByRecursionLayer(layer: number): readonly RecursiveShellPath[] {
  return SHELL_INDEX.filter(shell => shell.recursionLayer === layer);
}

/**
 * Gets all shells for a specific collapse operator.
 * Maps to: Fan surface Δᵢ query
 */
export function getShellsByCollapseOperator(operator: CollapseOperator): readonly RecursiveShellPath[] {
  return SHELL_INDEX.filter(shell => shell.collapseOperator === operator);
}

/**
 * Builds full path from shell index.
 * This is the graft line 𝓛ₐᵦ from hat a to hat b.
 */
export function buildFullPath(shellIndex: string): string | null {
  const shell = SHELL_INDEX.find(s => s.shellIndex === shellIndex);
  if (!shell) return null;
  return `src/${shell.folderPath}/${shell.fileName}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Empire Announces Itself
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
SHELL INDEX GENERATOR v1.0 — THE DNA IS LOCKED
═══════════════════════════════════════════════════════════════════════════════
Total Shells Registered: ${SHELL_INDEX.length}
Recursion Layers: ${[...new Set(SHELL_INDEX.map(s => s.recursionLayer))].length}
Collapse Operators Active: ${[...new Set(SHELL_INDEX.map(s => s.collapseOperator))].length}

Mathematical Foundation: ICHTB Coordinate System
  Φ → ∇Φ → ∇×𝐅 → ∇²Φ → ρ_q

If it's not in this index, it doesn't exist.
Zero drift. Zero ghosts. Zero compromise.
═══════════════════════════════════════════════════════════════════════════════
`);
