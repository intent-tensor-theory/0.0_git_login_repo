/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * auth.config.ts — THE ONLY FILE YOU NEED TO EDIT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Welcome to the Diamond Empire Universal Auth System.
 * 
 * Instructions:
 * 1. Choose your auth provider below
 * 2. Paste your credentials (replace YOUR-...-HERE placeholders)
 * 3. Enable the OAuth methods you want
 * 4. Deploy. Done.
 * 
 * That's it. The entire system routes based on this one file.
 * 
 * Zero ghosts. Zero drift. Zero compromise.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS (Don't modify these)
// ─────────────────────────────────────────────────────────────────────────────

export type AuthProviderType = 
  | 'firebase' 
  | 'supabase' 
  | 'auth0' 
  | 'cognito' 
  | 'clerk';

export type OAuthProviderType = 
  | 'google' 
  | 'github' 
  | 'apple' 
  | 'microsoft' 
  | 'twitter' 
  | 'discord' 
  | 'linkedin';

export type AuthConfig = {
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 1: Choose your primary auth provider
  // ═══════════════════════════════════════════════════════════════════════════
  provider: AuthProviderType;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 2: Provider credentials (only fill the one you're using)
  // ═══════════════════════════════════════════════════════════════════════════
  credentials: {
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
    supabase: {
      url: string;
      anonKey: string;
    };
    auth0: {
      domain: string;
      clientId: string;
      audience?: string;
    };
    cognito: {
      userPoolId: string;
      clientId: string;
      region: string;
    };
    clerk: {
      publishableKey: string;
    };
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 3: Enable auth methods (icons appear automatically when true)
  // ═══════════════════════════════════════════════════════════════════════════
  methods: {
    emailPassword: boolean;     // Native email/password form
    google: boolean;
    github: boolean;
    apple: boolean;
    microsoft: boolean;
    twitter: boolean;
    discord: boolean;
    linkedin: boolean;
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 4: Customize behavior (optional)
  // ═══════════════════════════════════════════════════════════════════════════
  options: {
    requireEmailVerification: boolean;
    allowSignUp: boolean;
    redirectAfterLogin: string;     // Where to go after successful login
    redirectAfterLogout: string;    // Where to go after logout
    appName: string;                // Displayed in the UI
    appLogo?: string;               // Optional logo URL
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// YOUR CONFIGURATION (Edit this!)
// ─────────────────────────────────────────────────────────────────────────────

export const AUTH_CONFIG: AuthConfig = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 1: Choose your primary auth provider
  // ═══════════════════════════════════════════════════════════════════════════
  // Options: 'firebase' | 'supabase' | 'auth0' | 'cognito' | 'clerk'
  
  provider: 'firebase',
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 2: Provider credentials
  // ═══════════════════════════════════════════════════════════════════════════
  // Only fill in the credentials for the provider you chose above.
  // Leave others as empty strings — they won't be used.
  
  credentials: {
    
    // ─────────────────────────────────────────────────────────────────────────
    // FIREBASE (https://console.firebase.google.com)
    // Go to: Project Settings > General > Your apps > Web app
    // ─────────────────────────────────────────────────────────────────────────
    firebase: {
      apiKey: 'YOUR-FIREBASE-API-KEY-HERE',
      authDomain: 'YOUR-PROJECT-ID.firebaseapp.com',
      projectId: 'YOUR-PROJECT-ID-HERE',
      storageBucket: 'YOUR-PROJECT-ID.appspot.com',
      messagingSenderId: 'YOUR-SENDER-ID-HERE',
      appId: 'YOUR-APP-ID-HERE',
    },
    
    // ─────────────────────────────────────────────────────────────────────────
    // SUPABASE (https://supabase.com/dashboard)
    // Go to: Project Settings > API
    // ─────────────────────────────────────────────────────────────────────────
    supabase: {
      url: 'YOUR-SUPABASE-URL-HERE',           // https://xxxxx.supabase.co
      anonKey: 'YOUR-SUPABASE-ANON-KEY-HERE',
    },
    
    // ─────────────────────────────────────────────────────────────────────────
    // AUTH0 (https://manage.auth0.com)
    // Go to: Applications > Your App > Settings
    // ─────────────────────────────────────────────────────────────────────────
    auth0: {
      domain: 'YOUR-TENANT.auth0.com',
      clientId: 'YOUR-AUTH0-CLIENT-ID-HERE',
      audience: '',  // Optional: API identifier if using API authorization
    },
    
    // ─────────────────────────────────────────────────────────────────────────
    // AWS COGNITO (https://console.aws.amazon.com/cognito)
    // Go to: User pools > Your pool > App integration
    // ─────────────────────────────────────────────────────────────────────────
    cognito: {
      userPoolId: 'YOUR-REGION_XXXXXXXXXXXX',
      clientId: 'YOUR-COGNITO-CLIENT-ID-HERE',
      region: 'us-east-1',  // e.g., us-east-1, eu-west-1
    },
    
    // ─────────────────────────────────────────────────────────────────────────
    // CLERK (https://dashboard.clerk.com)
    // Go to: API Keys
    // ─────────────────────────────────────────────────────────────────────────
    clerk: {
      publishableKey: 'YOUR-CLERK-PUBLISHABLE-KEY-HERE',
    },
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 3: Enable auth methods
  // ═══════════════════════════════════════════════════════════════════════════
  // Set to true for each method you want to enable.
  // Icons will automatically appear for enabled OAuth providers.
  // 
  // IMPORTANT: Make sure you've enabled each provider in your auth service's
  // dashboard (Firebase Console, Supabase Dashboard, Auth0, etc.)
  
  methods: {
    emailPassword: true,   // The email/password form
    google: true,          // Google OAuth
    github: false,         // GitHub OAuth
    apple: false,          // Apple Sign-In
    microsoft: false,      // Microsoft OAuth
    twitter: false,        // Twitter/X OAuth
    discord: false,        // Discord OAuth
    linkedin: false,       // LinkedIn OAuth
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 4: Customize behavior
  // ═══════════════════════════════════════════════════════════════════════════
  
  options: {
    requireEmailVerification: true,    // Require email verification before access
    allowSignUp: true,                 // Allow new user registration
    redirectAfterLogin: '/dashboard',  // Where to go after login
    redirectAfterLogout: '/login',     // Where to go after logout
    appName: 'Diamond Empire',         // Your app name
    appLogo: undefined,                // Optional: URL to your logo
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS (Don't modify these)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the active provider's credentials
 */
export function getActiveCredentials() {
  return AUTH_CONFIG.credentials[AUTH_CONFIG.provider];
}

/**
 * Get list of enabled OAuth providers
 */
export function getEnabledOAuthProviders(): OAuthProviderType[] {
  const oauthMethods: OAuthProviderType[] = [
    'google', 'github', 'apple', 'microsoft', 'twitter', 'discord', 'linkedin'
  ];
  
  return oauthMethods.filter(method => AUTH_CONFIG.methods[method] === true);
}

/**
 * Check if a specific auth method is enabled
 */
export function isMethodEnabled(method: keyof AuthConfig['methods']): boolean {
  return AUTH_CONFIG.methods[method] === true;
}

/**
 * Validate that required credentials are filled
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const creds = getActiveCredentials();
  
  if (!creds) {
    errors.push(`No credentials found for provider: ${AUTH_CONFIG.provider}`);
    return { valid: false, errors };
  }
  
  // Check for placeholder values
  const checkForPlaceholder = (value: string, field: string) => {
    if (value.includes('YOUR-') || value.includes('-HERE') || value === '') {
      errors.push(`${field} contains placeholder or is empty`);
    }
  };
  
  switch (AUTH_CONFIG.provider) {
    case 'firebase':
      const fb = AUTH_CONFIG.credentials.firebase;
      checkForPlaceholder(fb.apiKey, 'Firebase apiKey');
      checkForPlaceholder(fb.authDomain, 'Firebase authDomain');
      checkForPlaceholder(fb.projectId, 'Firebase projectId');
      break;
      
    case 'supabase':
      const sb = AUTH_CONFIG.credentials.supabase;
      checkForPlaceholder(sb.url, 'Supabase url');
      checkForPlaceholder(sb.anonKey, 'Supabase anonKey');
      break;
      
    case 'auth0':
      const a0 = AUTH_CONFIG.credentials.auth0;
      checkForPlaceholder(a0.domain, 'Auth0 domain');
      checkForPlaceholder(a0.clientId, 'Auth0 clientId');
      break;
      
    case 'cognito':
      const cg = AUTH_CONFIG.credentials.cognito;
      checkForPlaceholder(cg.userPoolId, 'Cognito userPoolId');
      checkForPlaceholder(cg.clientId, 'Cognito clientId');
      break;
      
    case 'clerk':
      const cl = AUTH_CONFIG.credentials.clerk;
      checkForPlaceholder(cl.publishableKey, 'Clerk publishableKey');
      break;
  }
  
  return { valid: errors.length === 0, errors };
}

// ─────────────────────────────────────────────────────────────────────────────
// Console Declaration
// ─────────────────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════════════════════════════════════════
◆ DIAMOND EMPIRE UNIVERSAL AUTH CONFIG
═══════════════════════════════════════════════════════════════════════════════
Provider:        ${AUTH_CONFIG.provider}
Email/Password:  ${AUTH_CONFIG.methods.emailPassword ? '✓' : '✗'}
OAuth Providers: ${getEnabledOAuthProviders().join(', ') || 'None'}
═══════════════════════════════════════════════════════════════════════════════
`);
