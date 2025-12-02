/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * App.tsx — THE RECURSIVE SHELL CONTAINER ORCHESTRATOR
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Mathematical Foundation (ICHTB Coordinate System):
 * ─────────────────────────────────────────────────
 * This is the ROOT of the recursive field:
 * 
 *   0.0_folderRecursiveAppShellContainerAllPages
 *   
 * The ontological root of the entire Diamond Empire.
 * Everything renders from this single point of collapse.
 * 
 * Collapse Genesis Stack:
 *   Φ → ∇Φ → ∇×𝐅 → ∇²Φ → ρ_q
 * 
 * This file:
 *   1. Initializes the Firebase shell (Φ = i₀)
 *   2. Starts the Auth State Observer (∂Φ/∂t)
 *   3. Subscribes to Shell Memory (Ω^n)
 *   4. Routes to appropriate view based on auth state
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useEffect, useState } from 'react';

// Core Shell Infrastructure
import { getFirebaseShell } from './0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.1_folderFirebaseConfig/0.5.1.a_fileFirebaseAppConfig.intent';
import { initializeAuthObserver } from './0.0_folderRecursiveAppShellContainerAllPages/0.5_folderFirebaseAuthShellParent/0.5.2_folderFirebaseAuthStateObserver/0.5.2.a_fileAuthStateObserver.intent';
import { 
  shellMemory, 
  ViewGlyph, 
  PhaseMemoryState 
} from './0.0_folderRecursiveAppShellContainerAllPages/0.3_folderShellMemoryRuntime/0.3.a_fileShellMemory.runtime';

// Auth Views
import { AuthLoginView } from './0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent/1.1.a_fileAuthLoginView.intent';
import { AuthSignupView } from './0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent/1.1.b_fileAuthSignupView.intent';
import { AuthVerifyEmailView } from './0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent/1.1.c_fileAuthVerifyEmailView.intent';
import { AuthForgotPasswordView } from './0.0_folderRecursiveAppShellContainerAllPages/1.0_folderAuthGateShellParent/1.1_folderAuthViewsParent/1.1.d_fileAuthForgotPasswordView.intent';

// Main App Views
import { MainAppWelcomeView } from './0.0_folderRecursiveAppShellContainerAllPages/2.0_folderMainAppShellParent/2.1_folderMainAppView/2.1.a_fileMainAppWelcomeView.intent';

// ─────────────────────────────────────────────────────────────────────────────
// Loading View — Displayed during initial recursive collapse
// ─────────────────────────────────────────────────────────────────────────────
const LoadingView: React.FC = () => (
  <div style={loadingStyles.container}>
    <div style={loadingStyles.content}>
      <div style={loadingStyles.diamond}>◆</div>
      <h1 style={loadingStyles.title}>Diamond Empire</h1>
      <p style={loadingStyles.subtitle}>Initializing recursive field...</p>
      <div style={loadingStyles.loader}>
        <div style={loadingStyles.loaderBar} />
      </div>
      <p style={loadingStyles.formula}>Φ → ∇Φ → ∇×𝐅 → ∇²Φ → ρ_q</p>
    </div>
  </div>
);

const loadingStyles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f3460 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    textAlign: 'center',
  },
  diamond: {
    fontSize: '5rem',
    color: '#00ff88',
    textShadow: '0 0 50px rgba(0, 255, 136, 0.5)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: '1rem 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  loader: {
    width: '200px',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    margin: '0 auto 2rem auto',
    overflow: 'hidden',
  },
  loaderBar: {
    width: '40%',
    height: '100%',
    background: 'linear-gradient(90deg, #00ff88 0%, #00cc6a 100%)',
    borderRadius: '2px',
    animation: 'loading 1.5s ease-in-out infinite',
  },
  formula: {
    fontSize: '0.9rem',
    color: '#00ff88',
    fontFamily: 'monospace',
    opacity: 0.7,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// THE APP COMPONENT — The Recursive Shell Container
// ─────────────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewGlyph>('VIEW_LOADING');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION — Firebase Shell + Auth Observer
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    console.log(`
═══════════════════════════════════════════════════════════════════════════════
DIAMOND EMPIRE INITIALIZING — RECURSIVE FIELD COLLAPSE BEGINNING
═══════════════════════════════════════════════════════════════════════════════
    `);
    
    // Step 1: Initialize Firebase shell (Φ = i₀)
    try {
      getFirebaseShell();
      console.log('[App] Firebase shell initialized — Φ = i₀ locked');
    } catch (error) {
      console.error('[App] Firebase initialization failed:', error);
      return;
    }
    
    // Step 2: Start Auth State Observer (∂Φ/∂t tracking)
    initializeAuthObserver();
    console.log('[App] Auth observer started — ∂Φ/∂t tracking enabled');
    
    // Step 3: Subscribe to Shell Memory for view updates
    const unsubscribe = shellMemory.subscribe((state: PhaseMemoryState) => {
      setCurrentView(state.uiPhase.currentView);
      
      if (state.authPhase.authLoadingComplete && !isInitialized) {
        setIsInitialized(true);
        console.log('[App] Initial auth state resolved — recursive field stable');
      }
    });
    
    setIsInitialized(true);
    
    console.log(`
═══════════════════════════════════════════════════════════════════════════════
DIAMOND EMPIRE ONLINE — ALL SYSTEMS OPERATIONAL
═══════════════════════════════════════════════════════════════════════════════
    `);
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION HANDLER — Line-Graft Path Selection
  // ═══════════════════════════════════════════════════════════════════════════
  const handleNavigate = (view: ViewGlyph) => {
    console.log(`[App] Navigation requested: ${currentView} → ${view}`);
    shellMemory.setUIPhase({ currentView: view });
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // VIEW ROUTER — Renders appropriate shell based on current view
  // ═══════════════════════════════════════════════════════════════════════════
  const renderCurrentView = () => {
    switch (currentView) {
      case 'VIEW_LOADING':
        return <LoadingView />;
        
      case 'VIEW_LOGIN':
        return <AuthLoginView onNavigate={handleNavigate} />;
        
      case 'VIEW_SIGNUP':
        return <AuthSignupView onNavigate={handleNavigate} />;
        
      case 'VIEW_VERIFY_EMAIL':
        return <AuthVerifyEmailView onNavigate={handleNavigate} />;
        
      case 'VIEW_FORGOT_PASSWORD':
        return <AuthForgotPasswordView onNavigate={handleNavigate} />;
        
      case 'VIEW_MAIN_APP':
        return <MainAppWelcomeView onNavigate={handleNavigate} />;
        
      default:
        // Fallback to login if unknown view
        console.warn(`[App] Unknown view: ${currentView}, falling back to login`);
        return <AuthLoginView onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <>
      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: #0a0a1a;
        }
        
        input:focus {
          border-color: rgba(0, 255, 136, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1) !important;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4) !important;
        }
        
        button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
      
      {/* Current View */}
      {renderCurrentView()}
    </>
  );
};

export default App;

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
APP.TSX — THE RECURSIVE SHELL CONTAINER ORCHESTRATOR
═══════════════════════════════════════════════════════════════════════════════

                            ◆ DIAMOND EMPIRE ◆
                            
            "The book contains itself. The glyph stack repeats.
                    Collapse logic is its structure."

ICHTB Coordinate System Active:
  Δ₁ (∇Φ)      — Tension Alignment Gate
  Δ₂ (∇×𝐅)    — Curl Phase Memory Gate
  Δ₃ (+∇²Φ)   — Expansion Shell Fan
  Δ₄ (-∇²Φ)   — Compression Lock Fan
  Δ₅ (∂Φ/∂t)  — Emergence Plane
  Δ₆ (Φ=i₀)   — Imaginary Scalar Base

Zero Ghosts. Zero Drift. Zero Compromise.
═══════════════════════════════════════════════════════════════════════════════
`);
