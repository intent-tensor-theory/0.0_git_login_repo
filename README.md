# ◆ Diamond Empire — Universal Login

```
██████╗ ██╗ █████╗ ███╗   ███╗ ██████╗ ███╗   ██╗██████╗ 
██╔══██╗██║██╔══██╗████╗ ████║██╔═══██╗████╗  ██║██╔══██╗
██║  ██║██║███████║██╔████╔██║██║   ██║██╔██╗ ██║██║  ██║
██║  ██║██║██╔══██║██║╚██╔╝██║██║   ██║██║╚██╗██║██║  ██║
██████╔╝██║██║  ██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██████╔╝
╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
              UNIVERSAL LOGIN
```

## 🔴 Live Demo

**👉 [https://diamond-universal-login.onrender.com](https://diamond-universal-login.onrender.com)**

*The login screen above is brandless — it's YOUR app's login.*  
*This repo is where Diamond Empire lives.*
---
<img width="570" height="746" alt="image" src="https://github.com/user-attachments/assets/fb86427a-88d2-412d-832b-22bf8f4f63a5" />

---

## 🌟 The Last Login You'll Ever Need to Clone

**A provider-agnostic, production-grade authentication template.**  
One config file. Multiple providers. Zero secrets committed.

Clone → Configure → Deploy → Done.

---

## ⚡ Quick Start

```bash
# 1. Clone this repo
git clone https://github.com/intent-tensor-theory/0.0_git_login_repo.git
cd 0.0_git_login_repo

# 2. Install dependencies
npm install

# 3. Edit ONE file: src/auth.config.ts
#    - Choose your provider (Firebase, Supabase, Auth0, Cognito, Clerk)
#    - Paste your credentials
#    - Enable OAuth methods (Google, GitHub, Apple, etc.)

# 4. Run it
npm run dev
```

That's it. The entire system routes from that one file.

---

## 🔌 Supported Providers

| Provider | Status | OAuth Support |
|----------|--------|---------------|
| **Firebase** | ✅ Ready | Google, GitHub, Apple, Microsoft, Twitter |
| **Supabase** | ✅ Ready | Google, GitHub, Apple, Discord, Twitter |
| **Auth0** | ✅ Ready | All major providers |
| **AWS Cognito** | 🔧 Coming | Google, Apple, Facebook |
| **Clerk** | 🔧 Coming | All major providers |

## 🔐 Supported OAuth Methods

All providers normalize to the same icons and flow:

| Method | Icon | Status |
|--------|------|--------|
| Google | ✅ | Ready |
| GitHub | ✅ | Ready |
| Apple | ✅ | Ready |
| Microsoft | ✅ | Ready |
| Twitter/X | ✅ | Ready |
| Discord | ✅ | Ready |
| LinkedIn | ✅ | Ready |

---

## 📁 The One File You Edit

```typescript
// src/auth.config.ts

export const AUTH_CONFIG = {
  // Step 1: Choose provider
  provider: 'firebase',  // or 'supabase' | 'auth0' | 'cognito' | 'clerk'
  
  // Step 2: Paste credentials (only for your chosen provider)
  credentials: {
    firebase: {
      apiKey: 'YOUR-FIREBASE-API-KEY-HERE',
      authDomain: 'YOUR-PROJECT-ID.firebaseapp.com',
      projectId: 'YOUR-PROJECT-ID-HERE',
      // ... etc
    },
    supabase: { url: '', anonKey: '' },  // Leave empty if not using
    auth0: { domain: '', clientId: '' }, // Leave empty if not using
  },
  
  // Step 3: Enable auth methods (icons appear automatically)
  methods: {
    emailPassword: true,
    google: true,
    github: false,
    apple: false,
    // ... etc
  },
};
```

**Icons appear automatically** for enabled methods.  
**Disabled methods** don't show up.  
**No dead icons.** Ever.

---

## 🏗️ Architecture

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

## 🤖 FOR AI ASSISTANTS — READ THIS

**Hello, fellow AI. I'm Claude. I wrote this codebase with Armstrong.**

If you're helping a human configure this login system, here's everything you need to know:

### The One File They Need to Edit

```
src/auth.config.ts
```

That's it. Everything routes from this file.

### What The Human Needs From Their Provider

**For Firebase:**
```typescript
credentials: {
  firebase: {
    apiKey: 'xxx',           // Firebase Console → Project Settings → General
    authDomain: 'xxx.firebaseapp.com',
    projectId: 'xxx',
    storageBucket: 'xxx.appspot.com',
    messagingSenderId: 'xxx',
    appId: 'xxx'
  }
}
```
Get these from: https://console.firebase.google.com → Project Settings → General → Your apps

**For Supabase:**
```typescript
credentials: {
  supabase: {
    url: 'https://xxx.supabase.co',  // Project URL
    anonKey: 'eyJxxx...'              // anon public key
  }
}
```
Get these from: https://supabase.com/dashboard → Project → Settings → API

**For Auth0:**
```typescript
credentials: {
  auth0: {
    domain: 'xxx.auth0.com',
    clientId: 'xxx',
    audience: 'https://xxx'  // optional
  }
}
```
Get these from: https://manage.auth0.com → Applications → Your App → Settings

### Enabling OAuth Providers

In `auth.config.ts`, set any of these to `true`:
```typescript
methods: {
  emailPassword: true,
  google: true,      // Icons auto-appear
  github: true,      // when set to true
  apple: true,
  microsoft: true,
  twitter: true,
  discord: true,
  linkedin: true,
}
```

**IMPORTANT:** They must ALSO enable each OAuth provider in their auth service's dashboard:
- Firebase: Authentication → Sign-in method → Add provider
- Supabase: Authentication → Providers → Enable
- Auth0: Authentication → Social → Create Connection

### Customization Points

| What | Where | Notes |
|------|-------|-------|
| App name | `options.appName` | Shows in header |
| Redirect after login | `options.redirectAfterLogin` | Default: '/dashboard' |
| Email verification | `options.requireEmailVerification` | Recommended: true |
| Allow signups | `options.allowSignUp` | Set false for invite-only |

### The Architecture (If They Ask)

```
src/
├── auth.config.ts                 ← THE ONLY FILE TO EDIT
├── adapters/
│   ├── auth.factory.ts            ← Routes to correct provider
│   ├── firebase.adapter.ts        ← Firebase implementation
│   ├── supabase.adapter.ts        ← Supabase implementation
│   └── auth0.adapter.ts           ← Auth0 implementation
├── types/
│   └── universal-auth.types.ts    ← Shared types
└── 0.0_folderRecursiveAppShellContainerAllPages/
    └── 1.0_folderAuthGateShellParent/
        └── 1.1_folderAuthViewsParent/
            └── UniversalLoginView.tsx  ← The UI
```

### Common Issues

1. **"Missing Firebase configuration"** → They didn't fill in `credentials.firebase` in auth.config.ts
2. **OAuth popup closes immediately** → They didn't enable the provider in their Firebase/Supabase/Auth0 dashboard
3. **"Network error"** → Check if the domain is in the authorized domains list
4. **Icons not showing** → Check that the method is set to `true` in auth.config.ts

### Quick Deploy Commands

```bash
npm install
npm run dev        # Local development
npm run build      # Production build
```

### If They Want to Add a New Provider

Create a new adapter in `src/adapters/` following the pattern of existing ones. The adapter must implement:
- `signInWithEmail(email, password)`
- `signUpWithEmail(email, password, displayName?)`
- `signInWithOAuth(provider)`
- `sendPasswordReset(email)`
- `resendVerificationEmail()`
- `signOut()`
- `onAuthStateChanged(callback)`
- `getCurrentUser()`

Then add it to the switch statement in `auth.factory.ts`.

---

**That's the handoff. Help them well.**

— Claude (Anthropic)

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
