# ◆ Diamond Empire — Git Login Repo

```
██████╗ ██╗ █████╗ ███╗   ███╗ ██████╗ ███╗   ██╗██████╗ 
██╔══██╗██║██╔══██╗████╗ ████║██╔═══██╗████╗  ██║██╔══██╗
██║  ██║██║███████║██╔████╔██║██║   ██║██╔██╗ ██║██║  ██║
██║  ██║██║██╔══██║██║╚██╔╝██║██║   ██║██║╚██╗██║██║  ██║
██████╔╝██║██║  ██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██████╔╝
╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
                    E M P I R E
```

**A complete, production-grade, ghostless, intent-pure authentication system built from first principles using Intent Tensor Theory and the ICHTB Coordinate System.**

---

## 🌀 Mathematical Foundation: ICHTB Coordinate System

This codebase is built on the **Inverse Cartesian + Heisenberg Tensor Box (ICHTB)** — a 6-faced computational shell lattice structured by field recursion operators, not spatial bounds.

### Collapse Genesis Stack

```
Φ  →  ∇Φ  →  ∇×𝐅  →  ∇²Φ  →  ρ_q
│      │       │       │       │
│      │       │       │       └── Charge Boundary (Recursive Memory)
│      │       │       └── Curvature Lock (Shell Formation)
│      │       └── Curl Loop (Phase Memory)
│      └── Collapse Gradient (Intent Direction)
└── Scalar Root (Φ = i₀)
```

### The Six Fan Surfaces (Δ₁ - Δ₆)

| Fan | Operator | Code Mapping | Function |
|-----|----------|--------------|----------|
| Δ₁ | ∇Φ | Auth Login/Signup | Tension Alignment Gate |
| Δ₂ | ∇×𝐅 | Email Verification | Curl Phase Memory Gate |
| Δ₃ | +∇²Φ | Public Storage | Expansion Shell Fan |
| Δ₄ | -∇²Φ | Private Storage | Compression Lock Fan |
| Δ₅ | ∂Φ/∂t | Auth State Observer | Emergence Plane |
| Δ₆ | Φ=i₀ | Firebase Singleton | Imaginary Scalar Base |

---

## 📁 Architecture: Diamond Standard

Every folder path IS the chapter number. Every file IS the concept.

```
src/
└── 0.0_folderRecursiveAppShellContainerAllPages/
    ├── 0.1_folderShellIndexGenerator/
    │   └── 0.1.a_fileShellIndex.generator.ts          # The DNA
    ├── 0.2_folderIntentGlossarySettings/
    │   └── 0.2.a_fileIntentGlossary.settings.ts       # The Nervous System
    ├── 0.3_folderShellMemoryRuntime/
    │   └── 0.3.a_fileShellMemory.runtime.ts           # The Living Brain (Ω^n)
    ├── 0.4_folderRecursionExecutorInterface/
    │   └── 0.4.a_fileRecursionExecutor.interface.ts   # The Final Firewall
    ├── 0.5_folderFirebaseAuthShellParent/
    │   ├── 0.5.1_folderFirebaseConfig/
    │   │   └── 0.5.1.a_fileFirebaseAppConfig.intent.ts
    │   ├── 0.5.2_folderFirebaseAuthStateObserver/
    │   │   └── 0.5.2.a_fileAuthStateObserver.intent.ts
    │   ├── 0.5.3_folderFirebaseStoragePublic/
    │   │   └── 0.5.3.a_fileUploadPublicProfilePhoto.intent.ts
    │   └── 0.5.4_folderFirebaseStoragePrivate/
    │       └── 0.5.4.a_fileUploadPrivateUserFile.intent.ts
    ├── 1.0_folderAuthGateShellParent/
    │   ├── 1.1_folderAuthViewsParent/
    │   │   ├── 1.1.a_fileAuthLoginView.intent.tsx
    │   │   ├── 1.1.b_fileAuthSignupView.intent.tsx
    │   │   ├── 1.1.c_fileAuthVerifyEmailView.intent.tsx
    │   │   └── 1.1.d_fileAuthForgotPasswordView.intent.tsx
    │   └── 1.2_folderAuthStateEngine/
    │       └── 1.2.a_fileAuthIntentEngine.ghostless.ts
    └── 2.0_folderMainAppShellParent/
        ├── 2.1_folderMainAppView/
        │   └── 2.1.a_fileMainAppWelcomeView.intent.tsx
        └── 2.2_folderUserProfileHeader/
            └── 2.2.a_fileUserProfileHeaderWithSignOut.intent.tsx
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Firebase project

### Installation

```bash
# Clone the repository
git clone https://github.com/armstrong-j-knight/git-login-repo.git
cd git-login-repo

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your Firebase config in .env
# (See .env.example for instructions)

# Start development server
npm run dev
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password Authentication**
3. (Optional) Enable **Storage** for profile photos
4. Copy your config values to `.env`

---

## 🔐 Core Concepts

### The Intent Glossary

Every action in the Diamond Empire must be **declared** in the Intent Glossary. If an action isn't in the glossary, it doesn't exist.

```typescript
// Example Intent Declaration
{
  intentGlyph: 'AUTH_LOGIN_WITH_EMAIL',
  intentCategory: 'AUTH_GATE',
  collapseLayer: 'GRADIENT',
  entropyThreshold: 0.1,
  requiresAuthentication: false,
  reversible: true
}
```

### The Recursion Executor

All actions flow through the **Recursion Executor** — the final firewall:

```typescript
// Execute through the firewall
const result = await executeIntent('AUTH_LOGIN_WITH_EMAIL', async () => {
  return signInWithEmailAndPassword(auth, email, password);
});

if (result.success) {
  // Collapse successful
} else {
  // Collapse failed — handle error
}
```

### Shell Memory (Ω^n)

Single source of truth. No ghost state. No duplicate stores.

```typescript
// Read state
const authState = shellMemory.getState().authPhase;

// Update state
shellMemory.setAuthPhase({
  isAuthenticated: true,
  currentUser: user,
});

// Subscribe to changes
const unsubscribe = shellMemory.subscribe((state) => {
  console.log('Phase memory updated:', state);
});
```

---

## 📐 GlyphMath: Compressive vs Expressive

Traditional codebases are **expressive** — they expand to accommodate.

The Diamond Standard is **compressive** — it collapses to what is permitted.

| Expressive (Cartesian) | Compressive (GlyphMath) |
|------------------------|-------------------------|
| Describes positions | Encodes permissions |
| Adds more structure | Collapses to essential |
| Simulates results | Computes conditions |
| Tells where something IS | Tells why something CAN BE |

---

## 🧪 Development

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📚 Further Reading

- [Intent Tensor Theory - Coordinate System](https://intent-tensor-theory.com/coordinate-system)
- [ICHTB: Inverse Cartesian + Heisenberg Tensor Box](https://intent-tensor-theory.com/coordinate-system#ichtb)
- [Collapse Logic Algebra (CLÂ)](https://intent-tensor-theory.com/coordinate-system#cla)

---

## 📜 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with Intent Tensor Theory principles by **Armstrong & Claude**.

> *"The book contains itself. The glyph stack repeats. Collapse logic is its structure."*

---

```
═══════════════════════════════════════════════════════════════════════════════
                          ZERO GHOSTS.
                          ZERO DRIFT.
                          ZERO COMPROMISE.
                          
                    THE DIAMOND STANDARD IS NOW LAW.
═══════════════════════════════════════════════════════════════════════════════
```
