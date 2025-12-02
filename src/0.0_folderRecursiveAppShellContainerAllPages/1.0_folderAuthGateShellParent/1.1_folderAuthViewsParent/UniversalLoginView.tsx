/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UniversalLoginView.tsx — THE ENTRY GATE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Universal Login with dynamic OAuth provider icons.
 * Icons appear automatically based on what's enabled in auth.config.ts
 * 
 * Design: Clean icons arranged around the login form, no backgrounds,
 * no borders on the icons — just pure clickable vectors.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, FormEvent } from 'react';
import { AUTH_CONFIG, getEnabledOAuthProviders, isMethodEnabled } from '../../../auth.config';
import { 
  GoogleIcon, 
  GitHubIcon, 
  AppleIcon, 
  MicrosoftIcon, 
  TwitterIcon, 
  DiscordIcon, 
  LinkedInIcon
} from './oauth-icons';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ViewMode = 'login' | 'signup' | 'forgot-password' | 'verify-email' | 'reset-sent';

type OAuthProvider = 'google' | 'github' | 'apple' | 'microsoft' | 'twitter' | 'discord' | 'linkedin';

// ─────────────────────────────────────────────────────────────────────────────
// SMART ERROR MESSAGES (The Gates from the tutorial)
// ─────────────────────────────────────────────────────────────────────────────

type SmartError = {
  message: string;
  action?: { label: string; viewMode: ViewMode };
};

/**
 * Map provider error codes to user-friendly messages with smart actions
 * This handles ALL the gates from the tutorial:
 * - Wrong email/password → "Email or password incorrect"
 * - User already exists → "User already exists. Sign in instead?"
 * - User not found → "No account found. Create one?"
 * - Email not verified → Redirect to verify screen
 */
const getSmartError = (errorCode: string, _email?: string): SmartError => {
  const errorMap: Record<string, SmartError> = {
    // Firebase error codes
    'auth/invalid-email': { message: 'Please enter a valid email address.' },
    'auth/user-disabled': { message: 'This account has been disabled.' },
    'auth/user-not-found': { 
      message: 'No account found with this email.', 
      action: { label: 'Create account?', viewMode: 'signup' } 
    },
    'auth/wrong-password': { message: 'Email or password incorrect.' },
    'auth/invalid-credential': { message: 'Email or password incorrect.' },
    'auth/email-already-in-use': { 
      message: 'An account with this email already exists.', 
      action: { label: 'Sign in instead?', viewMode: 'login' } 
    },
    'auth/weak-password': { message: 'Password must be at least 6 characters.' },
    'auth/too-many-requests': { message: 'Too many attempts. Please wait and try again.' },
    'auth/network-request-failed': { message: 'Network error. Please check your connection.' },
    'auth/popup-closed-by-user': { message: 'Sign-in popup was closed. Please try again.' },
    'auth/operation-not-allowed': { message: 'This sign-in method is not enabled.' },
    
    // Supabase error codes
    'invalid_credentials': { message: 'Email or password incorrect.' },
    'user_already_exists': { 
      message: 'An account with this email already exists.', 
      action: { label: 'Sign in instead?', viewMode: 'login' } 
    },
    'email_not_confirmed': { message: 'Please verify your email before signing in.' },
    
    // Auth0 error codes
    'invalid_user_password': { message: 'Email or password incorrect.' },
    'user_exists': { 
      message: 'An account with this email already exists.', 
      action: { label: 'Sign in instead?', viewMode: 'login' } 
    },
    
    // Generic fallbacks
    'INVALID_EMAIL': { message: 'Please enter a valid email address.' },
    'INVALID_PASSWORD': { message: 'Email or password incorrect.' },
    'USER_NOT_FOUND': { 
      message: 'No account found with this email.', 
      action: { label: 'Create account?', viewMode: 'signup' } 
    },
    'EMAIL_ALREADY_IN_USE': { 
      message: 'An account with this email already exists.', 
      action: { label: 'Sign in instead?', viewMode: 'login' } 
    },
    'WEAK_PASSWORD': { message: 'Password must be at least 6 characters.' },
    'EMAIL_NOT_VERIFIED': { message: 'Please verify your email first.' },
  };
  
  return errorMap[errorCode] || { message: 'An error occurred. Please try again.' };
};

// ─────────────────────────────────────────────────────────────────────────────
// ICON MAPPING
// ─────────────────────────────────────────────────────────────────────────────

const OAUTH_ICON_MAP: Record<OAuthProvider, React.FC<{ size?: number }>> = {
  google: GoogleIcon,
  github: GitHubIcon,
  apple: AppleIcon,
  microsoft: MicrosoftIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  linkedin: LinkedInIcon,
};

const OAUTH_NAMES: Record<OAuthProvider, string> = {
  google: 'Google',
  github: 'GitHub',
  apple: 'Apple',
  microsoft: 'Microsoft',
  twitter: 'X',
  discord: 'Discord',
  linkedin: 'LinkedIn',
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const UniversalLoginView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SmartError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string>(''); // For verification screen
  
  const enabledOAuthProviders = getEnabledOAuthProviders() as OAuthProvider[];
  const hasOAuth = enabledOAuthProviders.length > 0;
  const hasEmailPassword = isMethodEnabled('emailPassword');
  const allowSignUp = AUTH_CONFIG.options.allowSignUp;
  
  // ─────────────────────────────────────────────────────────────────────────────
  // PROVIDER TIERS: Enterprise (top) vs Social (bottom)
  // ─────────────────────────────────────────────────────────────────────────────
  
  // Enterprise SSO providers (formal/business tier) - order: Google, Apple, Microsoft
  const ENTERPRISE_ORDER: OAuthProvider[] = ['google', 'apple', 'microsoft'];
  const enterpriseProviders = ENTERPRISE_ORDER.filter(p => enabledOAuthProviders.includes(p));
  
  // Social/Dev providers (casual tier) - order: LinkedIn, GitHub, Twitter, Discord (formal → casual)
  const SOCIAL_ORDER: OAuthProvider[] = ['linkedin', 'github', 'twitter', 'discord'];
  const socialProviders = SOCIAL_ORDER.filter(p => enabledOAuthProviders.includes(p));
  
  const hasEnterprise = enterpriseProviders.length > 0;
  const hasSocial = socialProviders.length > 0;
  
  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);
    
    try {
      if (viewMode === 'login') {
        // TODO: Call auth provider's signInWithEmail
        console.log('[UniversalLogin] Sign in with:', email);
        // Simulated delay for demo
        await new Promise(r => setTimeout(r, 1000));
        
        // DEMO: Simulate checking if email is verified
        // In real implementation, check user.emailVerified
        const emailVerified = true; // This would come from the auth provider
        
        if (!emailVerified) {
          // Redirect to verification screen (like in the tutorial)
          setPendingEmail(email);
          setViewMode('verify-email');
          return;
        }
        
        setMessage('Sign in successful! Redirecting...');
        
      } else if (viewMode === 'signup') {
        // TODO: Call auth provider's signUpWithEmail
        console.log('[UniversalLogin] Sign up with:', email, displayName);
        await new Promise(r => setTimeout(r, 1000));
        
        // After signup, show verification screen (DON'T auto sign-in)
        setPendingEmail(email);
        setViewMode('verify-email');
        
      } else if (viewMode === 'forgot-password') {
        // TODO: Call auth provider's sendPasswordResetEmail
        console.log('[UniversalLogin] Password reset for:', email);
        await new Promise(r => setTimeout(r, 1000));
        
        // Show the "reset sent" screen
        setPendingEmail(email);
        setViewMode('reset-sent');
      }
    } catch (err: unknown) {
      // Extract error code from various provider formats
      const errorCode = 
        (err as { code?: string })?.code || 
        (err as { error_code?: string })?.error_code ||
        (err as { message?: string })?.message ||
        'UNKNOWN_ERROR';
      
      setError(getSmartError(errorCode, email));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOAuthClick = async (provider: OAuthProvider) => {
    setError(null);
    setMessage(null);
    setIsLoading(true);
    
    try {
      // TODO: Call auth provider's signInWithOAuth
      console.log(`[UniversalLogin] OAuth sign in with: ${provider}`);
      // This would typically open a popup or redirect
      
      // DEMO: Simulate OAuth success
      await new Promise(r => setTimeout(r, 500));
      setMessage(`Signing in with ${OAUTH_NAMES[provider]}...`);
      
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code || 'UNKNOWN_ERROR';
      setError(getSmartError(errorCode));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle resending verification email
  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      // TODO: Call auth provider's sendEmailVerification
      console.log('[UniversalLogin] Resending verification to:', pendingEmail);
      await new Promise(r => setTimeout(r, 1000));
      setMessage('Verification email sent! Check your inbox.');
    } catch (err) {
      setError({ message: 'Failed to resend verification email.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  
  return (
    <div style={styles.container}>
      {/* Background gradient overlay */}
      <div style={styles.backgroundOverlay} />
      
      {/* Main Card with Tabs */}
      <div style={styles.card}>
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TOP TAB ROW — Enterprise SSO (Google, Apple, Microsoft) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {hasEnterprise && (viewMode === 'login' || viewMode === 'signup') && (
          <div style={styles.tabRow}>
            {enterpriseProviders.map((provider) => {
              const IconComponent = OAUTH_ICON_MAP[provider];
              return (
                <button
                  key={provider}
                  onClick={() => handleOAuthClick(provider)}
                  disabled={isLoading}
                  style={styles.tabButton}
                  className="oauth-tab"
                  title={`Continue with ${OAUTH_NAMES[provider]}`}
                  aria-label={`Continue with ${OAUTH_NAMES[provider]}`}
                >
                  <IconComponent size={24} />
                </button>
              );
            })}
          </div>
        )}
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTENT AREA */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div style={styles.content}>
        
          {/* Logo / App Name */}
          <div style={styles.header}>
            <div style={styles.diamond}>◆</div>
            <h1 style={styles.appName}>{AUTH_CONFIG.options.appName}</h1>
            <p style={styles.subtitle}>
              {viewMode === 'login' && 'Welcome back'}
              {viewMode === 'signup' && 'Create your account'}
              {viewMode === 'forgot-password' && 'Reset your password'}
              {viewMode === 'verify-email' && 'Verify your email'}
              {viewMode === 'reset-sent' && 'Check your inbox'}
            </p>
          </div>
          
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* VERIFY EMAIL SCREEN (The Gate from the tutorial) */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {viewMode === 'verify-email' && (
            <div style={styles.verifyScreen}>
              <div style={styles.verifyIcon}>📧</div>
              <h2 style={styles.verifyTitle}>We sent you a verification email</h2>
              <p style={styles.verifyEmail}>{pendingEmail}</p>
              <p style={styles.verifyText}>
                Please check your inbox and click the verification link to continue.
              </p>
              
              {message && (
                <div style={styles.messageBox}>
                  <span style={styles.messageText}>✓ {message}</span>
                </div>
              )}
              
              <button
                onClick={handleResendVerification}
                disabled={isLoading}
                style={styles.secondaryButton}
              >
                {isLoading ? '⏳ Sending...' : 'Resend verification email'}
              </button>
              
              <button
                onClick={() => { setViewMode('login'); setError(null); setMessage(null); }}
                style={styles.link}
              >
                ← Back to sign in
              </button>
            </div>
          )}
          
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* PASSWORD RESET SENT SCREEN */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {viewMode === 'reset-sent' && (
            <div style={styles.verifyScreen}>
              <div style={styles.verifyIcon}>🔑</div>
              <h2 style={styles.verifyTitle}>Password reset link sent!</h2>
              <p style={styles.verifyEmail}>{pendingEmail}</p>
              <p style={styles.verifyText}>
                Check your inbox for a link to reset your password.
              </p>
              
              <button
                onClick={() => { setViewMode('login'); setError(null); setMessage(null); }}
                style={styles.submitButton}
              >
                Back to sign in
              </button>
            </div>
          )}
          
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* EMAIL/PASSWORD FORM (Login, Signup, Forgot Password) */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {hasEmailPassword && (viewMode === 'login' || viewMode === 'signup' || viewMode === 'forgot-password') && (
            <form onSubmit={handleEmailSubmit} style={styles.form}>
              
              {/* Display Name (Sign Up only) */}
              {viewMode === 'signup' && (
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display name"
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>
              )}
              
              {/* Email */}
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  style={styles.input}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                />
              </div>
              
              {/* Password (not for forgot password) */}
              {viewMode !== 'forgot-password' && (
                <div style={styles.inputGroup}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    disabled={isLoading}
                    required
                    autoComplete={viewMode === 'signup' ? 'new-password' : 'current-password'}
                    minLength={6}
                  />
                </div>
              )}
              
              {/* Error Message with Smart Action */}
              {error && (
                <div style={styles.errorBox}>
                  <span style={styles.errorText}>⚠️ {error.message}</span>
                  {error.action && (
                    <button
                      type="button"
                      onClick={() => { setViewMode(error.action!.viewMode); setError(null); }}
                      style={styles.errorAction}
                    >
                      {error.action.label}
                    </button>
                  )}
                </div>
              )}
              
              {/* Success Message */}
              {message && (
                <div style={styles.messageBox}>
                  <span style={styles.messageText}>✓ {message}</span>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {}),
                }}
              >
                {isLoading ? (
                  '⏳ Please wait...'
                ) : viewMode === 'login' ? (
                  'Sign In'
                ) : viewMode === 'signup' ? (
                  'Create Account'
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}
          
          {/* OAuth-only hint if no email/password */}
          {!hasEmailPassword && hasOAuth && (viewMode === 'login' || viewMode === 'signup') && (
            <p style={styles.oauthHint}>
              Choose a sign-in method below
            </p>
          )}
          
          {/* Navigation Links */}
          <div style={styles.links}>
            {viewMode === 'login' && (
              <>
                {hasEmailPassword && (
                  <button
                    onClick={() => { setViewMode('forgot-password'); setError(null); setMessage(null); }}
                    style={styles.link}
                  >
                    Forgot password?
                  </button>
                )}
                {allowSignUp && (
                  <button
                    onClick={() => { setViewMode('signup'); setError(null); setMessage(null); }}
                    style={styles.link}
                  >
                    Create account
                  </button>
                )}
              </>
            )}
            
            {viewMode === 'signup' && (
              <button
                onClick={() => { setViewMode('login'); setError(null); setMessage(null); }}
                style={styles.link}
              >
                Already have an account? Sign in
              </button>
            )}
            
            {viewMode === 'forgot-password' && (
              <button
                onClick={() => { setViewMode('login'); setError(null); setMessage(null); }}
                style={styles.link}
              >
                ← Back to sign in
              </button>
            )}
          </div>
          
        </div>
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM TAB ROW — Social/Dev OAuth (LinkedIn, GitHub, X, Discord) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {hasSocial && (viewMode === 'login' || viewMode === 'signup') && (
          <div style={styles.tabRow}>
            {socialProviders.map((provider) => {
              const IconComponent = OAUTH_ICON_MAP[provider];
              return (
                <button
                  key={provider}
                  onClick={() => handleOAuthClick(provider)}
                  disabled={isLoading}
                  style={styles.tabButton}
                  className="oauth-tab"
                  title={`Continue with ${OAUTH_NAMES[provider]}`}
                  aria-label={`Continue with ${OAUTH_NAMES[provider]}`}
                >
                  <IconComponent size={24} />
                </button>
              );
            })}
          </div>
        )}
        
      </div>
      
      {/* Subtle Attribution — visible but not intrusive */}
      <div style={styles.attribution}>
        <span style={styles.attributionText}>◆</span>
      </div>
      
      {/* CSS for hover animations */}
      <style>{`
        .oauth-tab {
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .oauth-tab:hover {
          transform: scale(1.15) translateY(-2px);
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .oauth-tab:active {
          transform: scale(1.05);
        }
        input:focus {
          border-color: #00ff88 !important;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    zIndex: 1,
    background: 'rgba(10, 10, 26, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  tabRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    flexWrap: 'wrap',
  },
  tabButton: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    color: '#ffffff',
  },
  content: {
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  diamond: {
    fontSize: '2.5rem',
    color: '#00ff88',
    textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
    marginBottom: '0.5rem',
  },
  appName: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 0.25rem 0',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    margin: 0,
  },
  oauthHint: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.875rem',
    margin: '1rem 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  errorBox: {
    padding: '0.75rem 1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: '0.875rem',
  },
  messageBox: {
    padding: '0.75rem 1rem',
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '8px',
  },
  messageText: {
    color: '#86efac',
    fontSize: '0.875rem',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#000000',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '0.875rem',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0,
  },
  attribution: {
    position: 'fixed',
    bottom: '0.75rem',
    right: '0.75rem',
    zIndex: 100,
  },
  attributionText: {
    color: 'rgba(255, 255, 255, 0.15)',
    fontSize: '1rem',
    fontWeight: 400,
    cursor: 'default',
    userSelect: 'none',
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // VERIFY EMAIL & RESET SENT SCREEN STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  verifyScreen: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  verifyIcon: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  },
  verifyTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
  },
  verifyEmail: {
    fontSize: '0.875rem',
    color: '#00ff88',
    fontWeight: 500,
    margin: 0,
    padding: '0.5rem 1rem',
    background: 'rgba(0, 255, 136, 0.1)',
    borderRadius: '8px',
  },
  verifyText: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    margin: 0,
    lineHeight: 1.5,
  },
  secondaryButton: {
    width: '100%',
    padding: '0.875rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '0.5rem',
  },
  errorAction: {
    display: 'block',
    marginTop: '0.5rem',
    background: 'none',
    border: 'none',
    color: '#fca5a5',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0,
  },
};

export default UniversalLoginView;
