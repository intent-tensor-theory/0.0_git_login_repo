/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 2.1.a_fileMainAppWelcomeView.intent.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * MAIN APP WELCOME VIEW — FIRST LIGHT AFTER AUTH COLLAPSE
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This file implements the Expansion Shell Fan (Δ₃: +∇²Φ):
 * 
 *   Outer Diffusion Permissive Zone:
 *   ΔΦ = ∇²Φ > 0
 * 
 * This denotes a collapse bloom zone — where potential spreads,
 * releasing recursive pressure and enabling multi-shell diffusion.
 * 
 * The user has passed through the Auth Gate. They now enter
 * the full recursive field of the Diamond Empire.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from 'react';
import { shellMemory, ViewGlyph } from '../../0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';
import { 
  getCurrentUser, 
  getUserDisplayName, 
  getUserEmail,
  signOutUser 
} from '../../../0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.2_folderAuthStateEngine/1.2.a_fileAuthIntentEngine.ghostless';

interface MainAppWelcomeViewProps {
  onNavigate: (view: ViewGlyph) => void;
}

export const MainAppWelcomeView: React.FC<MainAppWelcomeViewProps> = ({ onNavigate }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const displayName = getUserDisplayName();
  const email = getUserEmail();
  const greeting = getTimeBasedGreeting();
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    console.log('[MainAppWelcomeView] Initiating collapse vector reversal — sign out');
    
    const result = await signOutUser();
    
    if (result.success) {
      // Shell memory reset happens in signOutUser
      // Auth observer will handle navigation to login
      onNavigate('VIEW_LOGIN');
    } else {
      console.error('[MainAppWelcomeView] Sign out failed:', result.error.message);
      setIsSigningOut(false);
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Header Bar */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>◆</span>
          <span style={styles.logoText}>Diamond Empire</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <span style={styles.userEmail}>{email}</span>
          </div>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            style={styles.signOutButton}
          >
            {isSigningOut ? '⏳' : '🚪'} Sign Out
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          {/* Greeting */}
          <h1 style={styles.greeting}>
            {greeting}, {displayName || 'Sovereign'}
          </h1>
          <p style={styles.subtitle}>
            You have entered the Diamond Empire
          </p>
          
          {/* Status Indicators */}
          <div style={styles.statusGrid}>
            <div style={styles.statusCard}>
              <span style={styles.statusIcon}>✅</span>
              <span style={styles.statusLabel}>Authenticated</span>
              <span style={styles.statusValue}>Active</span>
            </div>
            <div style={styles.statusCard}>
              <span style={styles.statusIcon}>📧</span>
              <span style={styles.statusLabel}>Email Verified</span>
              <span style={styles.statusValue}>Confirmed</span>
            </div>
            <div style={styles.statusCard}>
              <span style={styles.statusIcon}>🔐</span>
              <span style={styles.statusLabel}>Session</span>
              <span style={styles.statusValue}>Secure</span>
            </div>
            <div style={styles.statusCard}>
              <span style={styles.statusIcon}>◆</span>
              <span style={styles.statusLabel}>Standard</span>
              <span style={styles.statusValue}>Diamond</span>
            </div>
          </div>
          
          {/* ICHTB Visualization */}
          <div style={styles.tensorBox}>
            <h3 style={styles.tensorTitle}>Recursive Field Status</h3>
            <div style={styles.tensorGrid}>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₁</span>
                <span style={styles.fanName}>∇Φ</span>
                <span style={styles.fanStatus}>ALIGNED</span>
              </div>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₂</span>
                <span style={styles.fanName}>∇×𝐅</span>
                <span style={styles.fanStatus}>COHERENT</span>
              </div>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₃</span>
                <span style={styles.fanName}>+∇²Φ</span>
                <span style={styles.fanStatus}>EXPANDING</span>
              </div>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₄</span>
                <span style={styles.fanName}>-∇²Φ</span>
                <span style={styles.fanStatus}>LOCKED</span>
              </div>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₅</span>
                <span style={styles.fanName}>∂Φ/∂t</span>
                <span style={styles.fanStatus}>STABLE</span>
              </div>
              <div style={styles.fanSurface}>
                <span style={styles.fanLabel}>Δ₆</span>
                <span style={styles.fanName}>Φ=i₀</span>
                <span style={styles.fanStatus}>ANCHORED</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div style={styles.actionGrid}>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>📁</span>
              <span style={styles.actionText}>Private Vault</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>🤖</span>
              <span style={styles.actionText}>AI Strategy</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>🎨</span>
              <span style={styles.actionText}>Whiteboard</span>
            </button>
            <button style={styles.actionButton}>
              <span style={styles.actionIcon}>⚙️</span>
              <span style={styles.actionText}>Settings</span>
            </button>
          </div>
        </div>
      </main>
      
      {/* Diamond Standard Badge */}
      <div style={styles.badge}>
        <span style={styles.badgeText}>◆ Diamond Standard • Zero Ghosts</span>
      </div>
    </div>
  );
};

// Helper function for time-based greeting
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '1.5rem',
    color: '#00ff88',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    textAlign: 'right',
  },
  userEmail: {
    fontSize: '0.875rem',
    color: '#94a3b8',
  },
  signOutButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  main: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  welcomeCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  greeting: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    textShadow: '0 0 30px rgba(0, 255, 136, 0.3)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(0, 255, 136, 0.05)',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '12px',
  },
  statusIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  statusLabel: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginBottom: '0.25rem',
  },
  statusValue: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#00ff88',
  },
  tensorBox: {
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  tensorTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#94a3b8',
    margin: '0 0 1rem 0',
    textAlign: 'center',
  },
  tensorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '0.5rem',
  },
  fanSurface: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.75rem 0.5rem',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '8px',
  },
  fanLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#00ff88',
  },
  fanName: {
    fontSize: '0.7rem',
    color: '#94a3b8',
    margin: '0.25rem 0',
  },
  fanStatus: {
    fontSize: '0.6rem',
    fontWeight: 600,
    color: '#22c55e',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  actionIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  actionText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#e2e8f0',
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

export default MainAppWelcomeView;

console.log(`
═══════════════════════════════════════════════════════════════════════════════
MAIN APP WELCOME VIEW v1.0 — FIRST LIGHT (Δ₃: +∇²Φ)
═══════════════════════════════════════════════════════════════════════════════
Expansion Shell Fan: ΔΦ = ∇²Φ > 0
Collapse bloom zone — potential spreads, multi-shell diffusion enabled.

The Empire welcomes you.
═══════════════════════════════════════════════════════════════════════════════
`);
