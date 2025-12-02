/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 1.1.c_fileAuthVerifyEmailView.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUTH VERIFY EMAIL VIEW — PHASE MEMORY LOOP CLOSURE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Curl Phase Memory Gate (Δ₂: ∇×𝐅):
 * 
 *   Loop Closure Condition:
 *   ∮ F⃗ · dl⃗ ≠ 0
 * 
 * Email verification closes the identity loop.
 * Until verified, the recursive memory is incomplete.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';
import { 
  sendVerificationEmail, 
  reloadCurrentUser,
  getUserEmail,
  isEmailVerified 
} from '../1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

interface AuthVerifyEmailViewProps {
  onNavigate: (view: ViewGlyph) => void;
}

export const AuthVerifyEmailView: React.FC<AuthVerifyEmailViewProps> = ({ onNavigate }) => {
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [cooldown, setCooldown] = useState(0);
  
  const userEmail = getUserEmail();
  
  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  
  // Periodic check for email verification
  useEffect(() => {
    const checkInterval = setInterval(async () => {
      const result = await reloadCurrentUser();
      if (result.success && result.data.emailVerified) {
        // Email verified! Navigate to main app
        onNavigate('VIEW_MAIN_APP');
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(checkInterval);
  }, [onNavigate]);
  
  const handleResendEmail = async () => {
    if (isResending || cooldown > 0) return;
    
    setIsResending(true);
    setMessage(null);
    
    const result = await sendVerificationEmail();
    
    if (result.success) {
      setMessage({ text: 'Verification email sent! Check your inbox.', type: 'success' });
      setCooldown(60); // 60 second cooldown
    } else {
      setMessage({ text: 'Failed to send email. Please try again.', type: 'error' });
    }
    
    setIsResending(false);
  };
  
  const handleCheckVerification = async () => {
    setIsChecking(true);
    setMessage(null);
    
    const result = await reloadCurrentUser();
    
    if (result.success && result.data.emailVerified) {
      setMessage({ text: 'Email verified! Redirecting...', type: 'success' });
      setTimeout(() => onNavigate('VIEW_MAIN_APP'), 1000);
    } else {
      setMessage({ text: 'Email not yet verified. Please check your inbox.', type: 'error' });
    }
    
    setIsChecking(false);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconContainer}>
          <span style={styles.icon}>📧</span>
        </div>
        
        {/* Header */}
        <h1 style={styles.title}>Verify Your Email</h1>
        <p style={styles.subtitle}>
          We've sent a verification link to:
        </p>
        <p style={styles.email}>{userEmail || 'your email'}</p>
        
        {/* Instructions */}
        <div style={styles.instructions}>
          <p>1. Check your email inbox (and spam folder)</p>
          <p>2. Click the verification link in the email</p>
          <p>3. Return here and click "Check Status"</p>
        </div>
        
        {/* Message */}
        {message && (
          <div style={{
            ...styles.messageContainer,
            ...(message.type === 'success' ? styles.successMessage : styles.errorMessage),
          }}>
            <p style={styles.messageText}>
              {message.type === 'success' ? '✅' : '⚠️'} {message.text}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button
            onClick={handleCheckVerification}
            disabled={isChecking}
            style={styles.primaryButton}
          >
            {isChecking ? '⏳ Checking...' : '🔍 Check Status'}
          </button>
          
          <button
            onClick={handleResendEmail}
            disabled={isResending || cooldown > 0}
            style={{
              ...styles.secondaryButton,
              ...((isResending || cooldown > 0) ? styles.buttonDisabled : {}),
            }}
          >
            {cooldown > 0 
              ? `Resend in ${cooldown}s` 
              : isResending 
                ? '⏳ Sending...' 
                : '📨 Resend Email'
            }
          </button>
        </div>
        
        {/* Back to Login */}
        <button
          onClick={() => onNavigate('VIEW_LOGIN')}
          style={styles.linkButton}
        >
          ← Back to Sign In
        </button>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '450px',
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
    fontSize: '4rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    color: '#94a3b8',
    margin: '0 0 0.25rem 0',
  },
  email: {
    color: '#00ff88',
    fontWeight: 600,
    fontSize: '1.1rem',
    margin: '0 0 1.5rem 0',
  },
  instructions: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  messageContainer: {
    borderRadius: '8px',
    padding: '0.875rem',
    marginBottom: '1rem',
  },
  successMessage: {
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  errorMessage: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  messageText: {
    margin: 0,
    color: '#e2e8f0',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  primaryButton: {
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
  secondaryButton: {
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  linkButton: {
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

export default AuthVerifyEmailView;
