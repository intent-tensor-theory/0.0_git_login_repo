/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 1.1.d_fileAuthForgotPasswordView.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH FORGOT PASSWORD VIEW — TEMPORAL STATE RECOVERY
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Emergence Plane (Δ₅: ∂Φ/∂t):
 * 
 *   Temporal Collapse Binding:
 *   Recovery of lost authentication state through time-bound token.
 * 
 * Password reset is a temporal bridge — it creates a time-limited
 * pathway back into the recursive field.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, FormEvent } from 'react';
import { ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';
import { sendPasswordReset, getAuthErrorMessage } from '../1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

interface AuthForgotPasswordViewProps {
  onNavigate: (view: ViewGlyph) => void;
}

export const AuthForgotPasswordView: React.FC<AuthForgotPasswordViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const isFormValid = email.trim() !== '' && email.includes('@');
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    console.log('[AuthForgotPasswordView] Initiating temporal recovery — ∂Φ/∂t bridge');
    
    const result = await sendPasswordReset(email);
    
    if (result.success) {
      setSubmitted(true);
      console.log('[AuthForgotPasswordView] Recovery email sent');
    } else {
      const friendlyMessage = getAuthErrorMessage(result.error.code);
      setErrorMessage(friendlyMessage);
    }
    
    setIsSubmitting(false);
  };
  
  // Success State
  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <span style={styles.icon}>✉️</span>
          </div>
          
          <h1 style={styles.title}>Check Your Email</h1>
          <p style={styles.subtitle}>
            We've sent password reset instructions to:
          </p>
          <p style={styles.email}>{email}</p>
          
          <div style={styles.instructions}>
            <p>1. Check your email inbox (and spam folder)</p>
            <p>2. Click the reset link in the email</p>
            <p>3. Create a new password</p>
            <p>4. Return here to sign in</p>
          </div>
          
          <button
            onClick={() => onNavigate('VIEW_LOGIN')}
            style={styles.primaryButton}
          >
            ← Return to Sign In
          </button>
        </div>
        
        <div style={styles.badge}>
          <span style={styles.badgeText}>◆ Diamond Standard</span>
        </div>
      </div>
    );
  }
  
  // Form State
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🔐</span>
        </div>
        
        <h1 style={styles.title}>Reset Password</h1>
        <p style={styles.subtitle}>
          Enter your email and we'll send you a reset link
        </p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
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
              autoFocus
            />
          </div>
          
          {errorMessage && (
            <div style={styles.errorContainer}>
              <p style={styles.errorText}>⚠️ {errorMessage}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            style={{
              ...styles.primaryButton,
              ...((!isFormValid || isSubmitting) ? styles.buttonDisabled : {}),
            }}
          >
            {isSubmitting ? '⏳ Sending...' : '📧 Send Reset Link'}
          </button>
        </form>
        
        <button
          onClick={() => onNavigate('VIEW_LOGIN')}
          style={styles.linkButton}
        >
          ← Back to Sign In
        </button>
      </div>
      
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '1.5rem',
  },
  icon: {
    fontSize: '3.5rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    color: '#94a3b8',
    margin: '0 0 1.5rem 0',
  },
  email: {
    color: '#00ff88',
    fontWeight: 600,
    fontSize: '1.1rem',
    margin: '0 0 1.5rem 0',
  },
  form: {
    textAlign: 'left',
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
    boxSizing: 'border-box',
  },
  instructions: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'left',
    color: '#94a3b8',
    fontSize: '0.9rem',
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
  primaryButton: {
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
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  linkButton: {
    marginTop: '1rem',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '0.875rem',
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

export default AuthForgotPasswordView;
