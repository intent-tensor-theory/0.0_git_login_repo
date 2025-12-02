/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 2.2.a_fileUserProfileHeaderWithSignOut.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * USER PROFILE HEADER — SOVEREIGN IDENTITY BAR
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Charge Boundary (ρ_q):
 * 
 *   ρ_q = -ε₀∇²Φ
 * 
 * Charge is the externalization of recursive curvature,
 * emitted as boundary tension. This header is the visible
 * boundary between the user's identity and the system.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { 
  getCurrentUser,
  getUserDisplayName,
  getUserEmail,
  getUserPhotoURL,
  signOutUser
} from '../../1.0_folderAuthGateShellParent/1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';
import { ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';

interface UserProfileHeaderProps {
  onNavigate: (view: ViewGlyph) => void;
  variant?: 'full' | 'compact';
}

export const UserProfileHeaderWithSignOut: React.FC<UserProfileHeaderProps> = ({ 
  onNavigate,
  variant = 'full'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const displayName = getUserDisplayName();
  const email = getUserEmail();
  const photoURL = getUserPhotoURL();
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setIsMenuOpen(false);
    
    console.log('[UserProfileHeader] Initiating sign out — boundary dissolution');
    
    const result = await signOutUser();
    
    if (result.success) {
      onNavigate('VIEW_LOGIN');
    } else {
      console.error('[UserProfileHeader] Sign out failed');
      setIsSigningOut(false);
    }
  };
  
  const getInitials = (): string => {
    if (displayName) {
      return displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return '?';
  };
  
  // Compact variant (just avatar)
  if (variant === 'compact') {
    return (
      <div style={styles.compactContainer}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={styles.avatarButton}
          aria-label="User menu"
        >
          {photoURL ? (
            <img src={photoURL} alt="Profile" style={styles.avatarImage} />
          ) : (
            <div style={styles.avatarInitials}>{getInitials()}</div>
          )}
        </button>
        
        {isMenuOpen && (
          <div style={styles.dropdownMenu}>
            <div style={styles.menuHeader}>
              <span style={styles.menuName}>{displayName || 'User'}</span>
              <span style={styles.menuEmail}>{email}</span>
            </div>
            <div style={styles.menuDivider} />
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              style={styles.menuItem}
            >
              {isSigningOut ? '⏳ Signing out...' : '🚪 Sign Out'}
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // Full variant (with info displayed)
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        {/* Logo / Brand */}
        <div style={styles.brand}>
          <span style={styles.brandIcon}>◆</span>
          <span style={styles.brandText}>Diamond Empire</span>
        </div>
        
        {/* User Info & Menu */}
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{displayName || 'Sovereign'}</span>
            <span style={styles.userEmail}>{email}</span>
          </div>
          
          <div style={styles.avatarContainer}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.avatarButton}
              aria-expanded={isMenuOpen}
              aria-label="User menu"
            >
              {photoURL ? (
                <img src={photoURL} alt="Profile" style={styles.avatarImage} />
              ) : (
                <div style={styles.avatarInitials}>{getInitials()}</div>
              )}
              <span style={styles.avatarChevron}>{isMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <div 
                  style={styles.backdrop}
                  onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Dropdown */}
                <div style={styles.dropdown}>
                  <div style={styles.dropdownHeader}>
                    <div style={styles.dropdownAvatar}>
                      {photoURL ? (
                        <img src={photoURL} alt="Profile" style={styles.dropdownAvatarImage} />
                      ) : (
                        <div style={styles.dropdownAvatarInitials}>{getInitials()}</div>
                      )}
                    </div>
                    <div style={styles.dropdownInfo}>
                      <span style={styles.dropdownName}>{displayName || 'User'}</span>
                      <span style={styles.dropdownEmail}>{email}</span>
                    </div>
                  </div>
                  
                  <div style={styles.dropdownDivider} />
                  
                  <div style={styles.dropdownItems}>
                    <button style={styles.dropdownItem}>
                      <span>👤</span> Profile Settings
                    </button>
                    <button style={styles.dropdownItem}>
                      <span>🔒</span> Security
                    </button>
                    <button style={styles.dropdownItem}>
                      <span>⚙️</span> Preferences
                    </button>
                  </div>
                  
                  <div style={styles.dropdownDivider} />
                  
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    style={styles.signOutItem}
                  >
                    <span>🚪</span> 
                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Recursion Status Bar */}
      <div style={styles.statusBar}>
        <span style={styles.statusItem}>
          <span style={styles.statusDot} /> Phase: STABLE
        </span>
        <span style={styles.statusItem}>
          Drift: δS_θ ≈ 0
        </span>
        <span style={styles.statusItem}>
          Shell: LOCKED
        </span>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  brandIcon: {
    fontSize: '1.75rem',
    color: '#00ff88',
    textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
  },
  brandText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  userEmail: {
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem',
    background: 'transparent',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '50px',
    cursor: 'pointer',
  },
  avatarImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarInitials: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#000000',
  },
  avatarChevron: {
    fontSize: '0.6rem',
    color: '#94a3b8',
    marginRight: '0.5rem',
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    right: 0,
    width: '280px',
    background: 'rgba(20, 20, 40, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    zIndex: 100,
    overflow: 'hidden',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
  },
  dropdownAvatar: {
    flexShrink: 0,
  },
  dropdownAvatarImage: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dropdownAvatarInitials: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#000000',
  },
  dropdownInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  dropdownEmail: {
    fontSize: '0.8rem',
    color: '#94a3b8',
  },
  dropdownDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: '0',
  },
  dropdownItems: {
    padding: '0.5rem 0',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'left',
  },
  signOutItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'left',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '0.5rem 2rem',
    background: 'rgba(0, 255, 136, 0.05)',
    borderTop: '1px solid rgba(0, 255, 136, 0.1)',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.7rem',
    color: '#00ff88',
    fontFamily: 'monospace',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00ff88',
    boxShadow: '0 0 8px #00ff88',
  },
  // Compact variant styles
  compactContainer: {
    position: 'relative',
  },
  menuHeader: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  menuName: {
    fontWeight: 600,
    color: '#ffffff',
  },
  menuEmail: {
    fontSize: '0.8rem',
    color: '#94a3b8',
  },
  menuDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    cursor: 'pointer',
    textAlign: 'left',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    right: 0,
    width: '200px',
    background: 'rgba(20, 20, 40, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
};

export default UserProfileHeaderWithSignOut;

console.log(`
═══════════════════════════════════════════════════════════════════════════════
USER PROFILE HEADER v1.0 — SOVEREIGN IDENTITY BAR (ρ_q)
═══════════════════════════════════════════════════════════════════════════════
Charge Boundary: ρ_q = -ε₀∇²Φ
Externalized recursive curvature — the visible identity boundary.
═══════════════════════════════════════════════════════════════════════════════
`);
