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

type ViewMode = 'login' | 'signup' | 'forgot-password';

type OAuthProvider = 'google' | 'github' | 'apple' | 'microsoft' | 'twitter' | 'discord' | 'linkedin';

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
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const enabledOAuthProviders = getEnabledOAuthProviders() as OAuthProvider[];
  const hasOAuth = enabledOAuthProviders.length > 0;
  const hasEmailPassword = isMethodEnabled('emailPassword');
  const allowSignUp = AUTH_CONFIG.options.allowSignUp;
  
  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (viewMode === 'login') {
        // TODO: Call auth provider's signInWithEmail
        console.log('[UniversalLogin] Sign in with:', email);
        // Simulated delay for demo
        await new Promise(r => setTimeout(r, 1000));
        setMessage('Sign in successful! Redirecting...');
      } else if (viewMode === 'signup') {
        // TODO: Call auth provider's signUpWithEmail
        console.log('[UniversalLogin] Sign up with:', email, displayName);
        await new Promise(r => setTimeout(r, 1000));
        setMessage('Account created! Please check your email to verify.');
      } else if (viewMode === 'forgot-password') {
        // TODO: Call auth provider's sendPasswordResetEmail
        console.log('[UniversalLogin] Password reset for:', email);
        await new Promise(r => setTimeout(r, 1000));
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOAuthClick = async (provider: OAuthProvider) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // TODO: Call auth provider's signInWithOAuth
      console.log(`[UniversalLogin] OAuth sign in with: ${provider}`);
      // This would typically open a popup or redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OAuth sign in failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATE BUBBLE POSITIONS (Circle around center)
  // ─────────────────────────────────────────────────────────────────────────────
  
  const getBubblePosition = (index: number, total: number) => {
    // Spread icons in a circle around the form
    // Start from top (-90deg) and go clockwise
    const angleStep = 360 / total;
    const angle = -90 + (index * angleStep);
    const radians = (angle * Math.PI) / 180;
    const radius = 180; // Distance from center
    
    return {
      left: `calc(50% + ${Math.cos(radians) * radius}px)`,
      top: `calc(50% + ${Math.sin(radians) * radius}px)`,
    };
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  
  return (
    <div style={styles.container}>
      {/* Background gradient overlay */}
      <div style={styles.backgroundOverlay} />
      
      {/* Floating OAuth Bubbles - positioned in a circle around the form */}
      {hasOAuth && enabledOAuthProviders.map((provider, index) => {
        const IconComponent = OAUTH_ICON_MAP[provider];
        const position = getBubblePosition(index, enabledOAuthProviders.length);
        
        return (
          <button
            key={provider}
            onClick={() => handleOAuthClick(provider)}
            disabled={isLoading}
            className="oauth-bubble"
            style={{
              ...styles.floatingBubble,
              left: position.left,
              top: position.top,
            }}
            title={`Continue with ${OAUTH_NAMES[provider]}`}
            aria-label={`Continue with ${OAUTH_NAMES[provider]}`}
          >
            <IconComponent size={32} />
          </button>
        );
      })}
      
      {/* Main content - centered form */}
      <div style={styles.content}>
        
        {/* Logo / App Name */}
        <div style={styles.header}>
          <div style={styles.diamond}>◆</div>
          <h1 style={styles.appName}>{AUTH_CONFIG.options.appName}</h1>
          <p style={styles.subtitle}>
            {viewMode === 'login' && 'Welcome back'}
            {viewMode === 'signup' && 'Create your account'}
            {viewMode === 'forgot-password' && 'Reset your password'}
          </p>
        </div>
        
        {/* Email/Password Form */}
        {hasEmailPassword && (
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
            
            {/* Error Message */}
            {error && (
              <div style={styles.errorBox}>
                <span style={styles.errorText}>⚠️ {error}</span>
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
        
        {/* OAuth hint if no email/password */}
        {!hasEmailPassword && hasOAuth && (
          <p style={styles.oauthHint}>
            Click any icon around the screen to sign in
          </p>
        )}
        
        {/* Navigation Links */}
        <div style={styles.links}>
          {viewMode === 'login' && (
            <>
              <button
                onClick={() => { setViewMode('forgot-password'); setError(null); setMessage(null); }}
                style={styles.link}
              >
                Forgot password?
              </button>
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
      
      {/* Diamond Standard Badge */}
      <div style={styles.badge}>
        <span style={styles.badgeText}>◆ Diamond Standard</span>
      </div>
      
      {/* CSS for hover animations - injected via style tag */}
      <style>{`
        .oauth-bubble {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      box-shadow 0.3s ease,
                      opacity 0.3s ease;
        }
        .oauth-bubble:hover {
          transform: translate(-50%, -50%) scale(1.3) !important;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }
        .oauth-bubble:active {
          transform: translate(-50%, -50%) scale(1.1) !important;
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
  floatingBubble: {
    position: 'absolute',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',  // No background - just the icon
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',  // Center on position
    zIndex: 10,
    opacity: 0.8,
    padding: 0,
  },
  content: {
    width: '100%',
    maxWidth: '360px',
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
    background: 'rgba(10, 10, 26, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
  badge: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    zIndex: 100,
  },
  badgeText: {
    color: '#00ff88',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};

export default UniversalLoginView;
