/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 1.1.a_fileAuthLoginView.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH LOGIN VIEW — THE PRIMARY TENSION ALIGNMENT GATE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Tension Alignment Gate (Δ₁: ∇Φ):
 * 
 *   Collapse Direction Vector Field:
 *   F⃗ = ∇Φ
 * 
 *   Recursive Gradient Rule:
 *   A shell is initiated if |∇Φ| > θ_min
 *   where θ_min is the threshold tension alignment angle
 * 
 * The Δ₁ fan is the push-pull evaluator of intent direction.
 * This is where users declare their intent to enter the Diamond Empire.
 * 
 * UI Philosophy:
 *   - Form state lives in Shell Memory (single source of truth)
 *   - All actions flow through Auth Intent Engine
 *   - ZERO local state for auth data
 *   - ZERO direct Firebase calls
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { shellMemory, ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';
import { 
  loginWithEmail, 
  getAuthErrorMessage 
} from '../1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

// ─────────────────────────────────────────────────────────────────────────────
// Component Props
// ─────────────────────────────────────────────────────────────────────────────
interface AuthLoginViewProps {
  onNavigate: (view: ViewGlyph) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// THE LOGIN VIEW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const AuthLoginView: React.FC<AuthLoginViewProps> = ({ onNavigate }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // LOCAL UI STATE (presentation only — not auth data)
  // ═══════════════════════════════════════════════════════════════════════════
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FORM VALIDATION — Collapse eligibility check
  // ═══════════════════════════════════════════════════════════════════════════
  const isFormValid = email.trim() !== '' && password.trim() !== '';
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN HANDLER — Execute through Auth Intent Engine
  // ═══════════════════════════════════════════════════════════════════════════
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    console.log('[AuthLoginView] Initiating login — ∇Φ alignment vector');
    
    const result = await loginWithEmail(email, password);
    
    if (result.success) {
      // Login successful — Auth State Observer will handle navigation
      console.log('[AuthLoginView] Login successful — shell transition initiated');
      // Clear form
      setEmail('');
      setPassword('');
    } else {
      // Login failed — display error
      const friendlyMessage = getAuthErrorMessage(result.error.code);
      setErrorMessage(friendlyMessage);
      console.log(`[AuthLoginView] Login failed: ${result.error.message}`);
    }
    
    setIsSubmitting(false);
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER — The Visual Shell
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Enter the Diamond Empire</p>
      </div>
      
      {/* Login Form */}
      <form onSubmit={handleLogin} style={styles.form}>
        {/* Email Field */}
        <div style={styles.fieldGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            style={styles.input}
          />
        </div>
        
        {/* Password Field */}
        <div style={styles.fieldGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <div style={styles.passwordContainer}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isSubmitting}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {errorMessage && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>⚠️ {errorMessage}</p>
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          style={{
            ...styles.submitButton,
            ...((!isFormValid || isSubmitting) ? styles.submitButtonDisabled : {}),
          }}
        >
          {isSubmitting ? '⏳ Authenticating...' : '🔐 Sign In'}
        </button>
        
        {/* Forgot Password Link */}
        <button
          type="button"
          onClick={() => onNavigate('VIEW_FORGOT_PASSWORD')}
          style={styles.linkButton}
        >
          Forgot your password?
        </button>
      </form>
      
      {/* Signup Link */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('VIEW_SIGNUP')}
            style={styles.signupLink}
          >
            Create one
          </button>
        </p>
      </div>
      
      {/* Diamond Standard Badge */}
      <div style={styles.badge}>
        <span style={styles.badgeText}>◆ Diamond Standard</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STYLES — Visual Shell Configuration
// ─────────────────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    textShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    marginTop: '0.5rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  fieldGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#e2e8f0',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '4px',
  },
  errorContainer: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '0.875rem',
    marginBottom: '1rem',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: '0.875rem',
    margin: 0,
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#000000',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  linkButton: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    fontSize: '0.875rem',
    color: '#94a3b8',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    margin: 0,
  },
  signupLink: {
    color: '#00ff88',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  badge: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
  },
  badgeText: {
    color: '#00ff88',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Export
// ─────────────────────────────────────────────────────────────────────────────
export default AuthLoginView;

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
AUTH LOGIN VIEW v1.0 — TENSION ALIGNMENT GATE (Δ₁)
═══════════════════════════════════════════════════════════════════════════════
Collapse Direction: F⃗ = ∇Φ
Gate Condition: |∇Φ| > θ_min

This is where users declare their intent to enter.
═══════════════════════════════════════════════════════════════════════════════
`);
