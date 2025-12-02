/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 1.1.b_fileAuthSignupView.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH SIGNUP VIEW — NEW IDENTITY VECTOR REGISTRATION
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements Identity Vector Creation (∇Φ extension):
 * 
 *   Creating a new user is a PERMANENT COLLAPSE.
 *   Once an identity vector is registered in the recursive field,
 *   it exists forever (even if deleted, the UID was consumed).
 * 
 * Signup is irreversible — this is by design.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, FormEvent } from 'react';
import { ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';
import { 
  signupWithEmail, 
  getAuthErrorMessage 
} from '../1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

interface AuthSignupViewProps {
  onNavigate: (view: ViewGlyph) => void;
}

export const AuthSignupView: React.FC<AuthSignupViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation
  const passwordsMatch = password === confirmPassword;
  const passwordMinLength = password.length >= 6;
  const isFormValid = 
    email.trim() !== '' && 
    password.trim() !== '' && 
    passwordsMatch && 
    passwordMinLength;
  
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    console.log('[AuthSignupView] Creating new identity vector');
    
    const result = await signupWithEmail(
      email, 
      password, 
      displayName.trim() || undefined
    );
    
    if (result.success) {
      console.log('[AuthSignupView] Identity vector created — verification email sent');
      // Auth State Observer will handle navigation to email verification
    } else {
      const friendlyMessage = getAuthErrorMessage(result.error.code);
      setErrorMessage(friendlyMessage);
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Join the Empire</h1>
        <p style={styles.subtitle}>Create your identity vector</p>
      </div>
      
      <form onSubmit={handleSignup} style={styles.form}>
        {/* Display Name (Optional) */}
        <div style={styles.fieldGroup}>
          <label htmlFor="displayName" style={styles.label}>
            Display Name <span style={styles.optional}>(optional)</span>
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            disabled={isSubmitting}
            style={styles.input}
          />
        </div>
        
        {/* Email */}
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
        
        {/* Password */}
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
              placeholder="At least 6 characters"
              autoComplete="new-password"
              disabled={isSubmitting}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {password && !passwordMinLength && (
            <p style={styles.validationHint}>⚠️ Password must be at least 6 characters</p>
          )}
        </div>
        
        {/* Confirm Password */}
        <div style={styles.fieldGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
            disabled={isSubmitting}
            style={styles.input}
          />
          {confirmPassword && !passwordsMatch && (
            <p style={styles.validationHint}>⚠️ Passwords do not match</p>
          )}
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
          {isSubmitting ? '⏳ Creating Account...' : '🚀 Create Account'}
        </button>
      </form>
      
      {/* Login Link */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('VIEW_LOGIN')}
            style={styles.loginLink}
          >
            Sign in
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
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#e2e8f0',
    marginBottom: '0.5rem',
  },
  optional: {
    color: '#64748b',
    fontWeight: 400,
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
  validationHint: {
    color: '#fbbf24',
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    margin: 0,
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
    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none',
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
  loginLink: {
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

export default AuthSignupView;
