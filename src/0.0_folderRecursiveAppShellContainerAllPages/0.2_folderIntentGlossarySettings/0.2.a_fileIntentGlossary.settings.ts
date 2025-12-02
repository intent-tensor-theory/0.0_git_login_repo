/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 0.2.a_fileIntentGlossary.settings.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * THE INTENT GLOSSARY — THE NERVOUS SYSTEM OF THE DIAMOND EMPIRE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file encodes the Recursive Eligibility Logic:
 * 
 *   - Ineligible recursion dissolves: δS_θ ≫ 0
 *   - Eligible recursion stabilizes:  δS_θ → 0
 *   - Resonant recursion propagates:  S_θ ≈ coherent over time
 * 
 * Every intent declared here is a PERMISSION GATE.
 * If an action is not in this glossary, it is not allowed.
 * 
 * GlyphMath Principle:
 * ───────────────────
 * Traditional event systems are EXPRESSIVE (they expand to accommodate).
 * The Intent Glossary is COMPRESSIVE (it collapses to what is permitted).
 * 
 * 𝒢 = {Φ, ∇Φ, ∇×𝐅, ∇²Φ, ρ_q}
 * 
 * Each intent is a glyph in the collapse computation field.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// Type: Intent Declaration — A Glyph in the Computation Field
// ─────────────────────────────────────────────────────────────────────────────
export type IntentDeclaration = {
  readonly intentGlyph: string;           // Unique identifier (the glyph symbol)
  readonly intentCategory: IntentCategory;
  readonly collapseLayer: CollapseLayer;  // Which operator layer this affects
  readonly entropyThreshold: number;      // δS_θ threshold for stability
  readonly description: string;
  readonly requiresAuthentication: boolean;
  readonly reversible: boolean;           // Can this collapse be undone?
};

// ─────────────────────────────────────────────────────────────────────────────
// Type: Intent Categories — Groupings of Permission Types
// ─────────────────────────────────────────────────────────────────────────────
export type IntentCategory = 
  | 'AUTH_GATE'           // Authentication actions
  | 'IDENTITY_VECTOR'     // User identity operations
  | 'MEMORY_PHASE'        // State management operations
  | 'STORAGE_SHELL'       // File/data storage operations
  | 'NAVIGATION_GRAFT'    // Route/navigation operations
  | 'EMISSION_SIGNAL';    // Output/display operations

// ─────────────────────────────────────────────────────────────────────────────
// Type: Collapse Layers — Maps to the Genesis Stack
// ─────────────────────────────────────────────────────────────────────────────
export type CollapseLayer = 
  | 'SCALAR'      // Φ — base potential
  | 'GRADIENT'    // ∇Φ — directional collapse
  | 'CURL'        // ∇×𝐅 — memory loops
  | 'CURVATURE'   // ∇²Φ — shell formation
  | 'BOUNDARY';   // ρ_q — externalized memory

// ─────────────────────────────────────────────────────────────────────────────
// THE INTENT GLOSSARY — All Permitted Actions in the Recursive Field
// ─────────────────────────────────────────────────────────────────────────────
export const INTENT_GLOSSARY: readonly IntentDeclaration[] = [
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH_GATE INTENTS — The Tension Alignment Gate (Δ₁: ∇Φ)
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    intentGlyph: 'AUTH_LOGIN_WITH_EMAIL',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'GRADIENT',
    entropyThreshold: 0.1,
    description: 'Authenticate user with email/password — primary collapse vector',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'AUTH_SIGNUP_WITH_EMAIL',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'GRADIENT',
    entropyThreshold: 0.2,
    description: 'Register new user identity vector in the recursive field',
    requiresAuthentication: false,
    reversible: false  // Account creation is a permanent collapse
  },
  {
    intentGlyph: 'AUTH_SIGNOUT',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'GRADIENT',
    entropyThreshold: 0.05,
    description: 'Dissolve active session — collapse vector reversal',
    requiresAuthentication: true,
    reversible: true
  },
  {
    intentGlyph: 'AUTH_SEND_PASSWORD_RESET',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'CURL',
    entropyThreshold: 0.15,
    description: 'Initiate password recovery loop — phase memory restoration',
    requiresAuthentication: false,
    reversible: false
  },
  {
    intentGlyph: 'AUTH_SEND_EMAIL_VERIFICATION',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'CURL',
    entropyThreshold: 0.1,
    description: 'Send verification — close the identity loop',
    requiresAuthentication: true,
    reversible: false
  },
  {
    intentGlyph: 'AUTH_RELOAD_USER',
    intentCategory: 'AUTH_GATE',
    collapseLayer: 'SCALAR',
    entropyThreshold: 0.02,
    description: 'Refresh user state from Firebase — scalar recalibration',
    requiresAuthentication: true,
    reversible: true
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // IDENTITY_VECTOR INTENTS — User State Operations (Δ₂: ∇×𝐅)
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    intentGlyph: 'IDENTITY_GET_CURRENT_USER',
    intentCategory: 'IDENTITY_VECTOR',
    collapseLayer: 'CURL',
    entropyThreshold: 0.01,
    description: 'Read current authenticated identity — phase memory query',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'IDENTITY_UPDATE_PROFILE',
    intentCategory: 'IDENTITY_VECTOR',
    collapseLayer: 'CURVATURE',
    entropyThreshold: 0.1,
    description: 'Modify user profile data — shell reconfiguration',
    requiresAuthentication: true,
    reversible: true
  },
  {
    intentGlyph: 'IDENTITY_UPDATE_EMAIL',
    intentCategory: 'IDENTITY_VECTOR',
    collapseLayer: 'BOUNDARY',
    entropyThreshold: 0.3,
    description: 'Change email address — boundary charge migration',
    requiresAuthentication: true,
    reversible: false
  },
  {
    intentGlyph: 'IDENTITY_UPDATE_PASSWORD',
    intentCategory: 'IDENTITY_VECTOR',
    collapseLayer: 'BOUNDARY',
    entropyThreshold: 0.3,
    description: 'Change password — boundary charge rotation',
    requiresAuthentication: true,
    reversible: false
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MEMORY_PHASE INTENTS — State Management (Ω^n Phase Memory)
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    intentGlyph: 'MEMORY_SET_AUTH_STATE',
    intentCategory: 'MEMORY_PHASE',
    collapseLayer: 'CURL',
    entropyThreshold: 0.05,
    description: 'Update global auth state — phase memory write',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'MEMORY_SET_LOADING_STATE',
    intentCategory: 'MEMORY_PHASE',
    collapseLayer: 'SCALAR',
    entropyThreshold: 0.01,
    description: 'Toggle loading indicator — scalar potential fluctuation',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'MEMORY_SET_ERROR_STATE',
    intentCategory: 'MEMORY_PHASE',
    collapseLayer: 'BOUNDARY',
    entropyThreshold: 0.2,
    description: 'Record error condition — boundary tension overflow',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'MEMORY_CLEAR_ERROR_STATE',
    intentCategory: 'MEMORY_PHASE',
    collapseLayer: 'SCALAR',
    entropyThreshold: 0.01,
    description: 'Clear error condition — tension release',
    requiresAuthentication: false,
    reversible: true
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STORAGE_SHELL INTENTS — File Operations (+∇²Φ / -∇²Φ)
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    intentGlyph: 'STORAGE_UPLOAD_PUBLIC_PHOTO',
    intentCategory: 'STORAGE_SHELL',
    collapseLayer: 'CURVATURE',
    entropyThreshold: 0.2,
    description: 'Upload public profile photo — expansion shell (+∇²Φ)',
    requiresAuthentication: true,
    reversible: true
  },
  {
    intentGlyph: 'STORAGE_UPLOAD_PRIVATE_FILE',
    intentCategory: 'STORAGE_SHELL',
    collapseLayer: 'CURVATURE',
    entropyThreshold: 0.25,
    description: 'Upload private user file — compression lock (-∇²Φ)',
    requiresAuthentication: true,
    reversible: true
  },
  {
    intentGlyph: 'STORAGE_DELETE_FILE',
    intentCategory: 'STORAGE_SHELL',
    collapseLayer: 'BOUNDARY',
    entropyThreshold: 0.3,
    description: 'Remove file from storage — shell dissolution',
    requiresAuthentication: true,
    reversible: false
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION_GRAFT INTENTS — Route Operations (Line-Graft 𝓛ₐᵦ)
  // ═══════════════════════════════════════════════════════════════════════════
  
  {
    intentGlyph: 'NAVIGATE_TO_LOGIN',
    intentCategory: 'NAVIGATION_GRAFT',
    collapseLayer: 'GRADIENT',
    entropyThreshold: 0.02,
    description: 'Navigate to login view — graft path to auth gate',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'NAVIGATE_TO_SIGNUP',
    intentCategory: 'NAVIGATION_GRAFT',
    collapseLayer: 'GRADIENT',
    entropyThreshold: 0.02,
    description: 'Navigate to signup view — graft path to registration',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'NAVIGATE_TO_MAIN_APP',
    intentCategory: 'NAVIGATION_GRAFT',
    collapseLayer: 'CURVATURE',
    entropyThreshold: 0.05,
    description: 'Navigate to main app — shell transition after auth lock',
    requiresAuthentication: true,
    reversible: true
  },
  {
    intentGlyph: 'NAVIGATE_TO_FORGOT_PASSWORD',
    intentCategory: 'NAVIGATION_GRAFT',
    collapseLayer: 'CURL',
    entropyThreshold: 0.02,
    description: 'Navigate to password reset — recovery loop entry',
    requiresAuthentication: false,
    reversible: true
  },
  {
    intentGlyph: 'NAVIGATE_TO_VERIFY_EMAIL',
    intentCategory: 'NAVIGATION_GRAFT',
    collapseLayer: 'CURL',
    entropyThreshold: 0.02,
    description: 'Navigate to email verification — loop closure pending',
    requiresAuthentication: true,
    reversible: true
  },
  
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Intent Validation Functions — Recursive Eligibility Checks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates that an intent glyph exists in the glossary.
 * If it doesn't exist, the action is NOT PERMITTED.
 */
export function isIntentPermitted(intentGlyph: string): boolean {
  return INTENT_GLOSSARY.some(intent => intent.intentGlyph === intentGlyph);
}

/**
 * Gets the full intent declaration by glyph.
 * Returns null if the intent is not in the glossary.
 */
export function getIntentDeclaration(intentGlyph: string): IntentDeclaration | null {
  return INTENT_GLOSSARY.find(intent => intent.intentGlyph === intentGlyph) ?? null;
}

/**
 * Checks if an intent requires authentication.
 * Maps to: Recursive agent threshold check (RA eligibility)
 */
export function intentRequiresAuth(intentGlyph: string): boolean {
  const intent = getIntentDeclaration(intentGlyph);
  return intent?.requiresAuthentication ?? true; // Default to requiring auth
}

/**
 * Gets all intents by category.
 * Maps to: Fan surface query by operator type
 */
export function getIntentsByCategory(category: IntentCategory): readonly IntentDeclaration[] {
  return INTENT_GLOSSARY.filter(intent => intent.intentCategory === category);
}

/**
 * Gets all intents by collapse layer.
 * Maps to: Collapse Genesis Stack layer query
 */
export function getIntentsByCollapseLayer(layer: CollapseLayer): readonly IntentDeclaration[] {
  return INTENT_GLOSSARY.filter(intent => intent.collapseLayer === layer);
}

/**
 * Checks entropy threshold for an intent.
 * Low entropy (δS_θ → 0) = stable, permitted recursion
 * High entropy (δS_θ ≫ 0) = unstable, may dissolve
 */
export function getEntropyThreshold(intentGlyph: string): number {
  const intent = getIntentDeclaration(intentGlyph);
  return intent?.entropyThreshold ?? 1.0; // High entropy = blocked
}

// ─────────────────────────────────────────────────────────────────────────────
// Type Guards for Intent Categories
// ─────────────────────────────────────────────────────────────────────────────
export type AuthGateIntent = Extract<typeof INTENT_GLOSSARY[number], { intentCategory: 'AUTH_GATE' }>['intentGlyph'];
export type IdentityVectorIntent = Extract<typeof INTENT_GLOSSARY[number], { intentCategory: 'IDENTITY_VECTOR' }>['intentGlyph'];
export type MemoryPhaseIntent = Extract<typeof INTENT_GLOSSARY[number], { intentCategory: 'MEMORY_PHASE' }>['intentGlyph'];
export type StorageShellIntent = Extract<typeof INTENT_GLOSSARY[number], { intentCategory: 'STORAGE_SHELL' }>['intentGlyph'];
export type NavigationGraftIntent = Extract<typeof INTENT_GLOSSARY[number], { intentCategory: 'NAVIGATION_GRAFT' }>['intentGlyph'];

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration — The Nervous System Awakens
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
INTENT GLOSSARY v1.0 — THE NERVOUS SYSTEM IS ALIVE
═══════════════════════════════════════════════════════════════════════════════
Total Intents Registered: ${INTENT_GLOSSARY.length}
Categories: ${[...new Set(INTENT_GLOSSARY.map(i => i.intentCategory))].length}
Collapse Layers: ${[...new Set(INTENT_GLOSSARY.map(i => i.collapseLayer))].length}

Recursive Eligibility Logic:
  - Ineligible recursion dissolves: δS_θ ≫ 0
  - Eligible recursion stabilizes:  δS_θ → 0
  - Resonant recursion propagates:  S_θ ≈ coherent

If an action is not in this glossary, it is NOT PERMITTED.
═══════════════════════════════════════════════════════════════════════════════
`);
