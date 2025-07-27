// Cookie Consent Types for Italian Law Compliance 2025
export interface CookieConsent {
  essential: boolean; // Always true, but keeping for consistency
  functional: boolean; // Chatbot history, preferences
  analytics: boolean; // Google Analytics, Vercel Analytics
  external: boolean; // Google Maps, AI services
  timestamp: Date;
  version: string;
  userId?: string;
}

export interface CookieCategory {
  id: keyof Omit<CookieConsent, 'timestamp' | 'version' | 'userId'>;
  required: boolean;
  defaultValue: boolean;
  cookies: CookieDetails[];
}

export interface CookieDetails {
  name: string;
  purpose: string;
  duration: string;
  provider: string;
  type: 'HTTP Cookie' | 'Local Storage' | 'Session Storage' | 'IndexedDB';
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    required: true,
    defaultValue: true,
    cookies: [
      {
        name: 'next-auth.session',
        purpose: 'User session management',
        duration: 'Session',
        provider: 'Lunex (First Party)',
        type: 'HTTP Cookie'
      },
      {
        name: 'locale',
        purpose: 'Language preference (IT/EN)',
        duration: '1 year',
        provider: 'Lunex (First Party)',
        type: 'Local Storage'
      },
      {
        name: 'cookie-consent',
        purpose: 'Store cookie preferences',
        duration: '1 year',
        provider: 'Lunex (First Party)',
        type: 'Local Storage'
      }
    ]
  },
  {
    id: 'functional',
    required: false,
    defaultValue: false,
    cookies: [
      {
        name: 'chatbot-history',
        purpose: 'Chatbot conversation memory',
        duration: '30 days',
        provider: 'Lunex (First Party)',
        type: 'Local Storage'
      },
      {
        name: 'user-preferences',
        purpose: 'Enhanced user experience settings',
        duration: '1 year',
        provider: 'Lunex (First Party)',
        type: 'Local Storage'
      }
    ]
  },
  {
    id: 'analytics',
    required: false,
    defaultValue: false,
    cookies: [
      {
        name: '_ga, _ga_*',
        purpose: 'Google Analytics tracking',
        duration: '2 years',
        provider: 'Google',
        type: 'HTTP Cookie'
      },
      {
        name: '_gid',
        purpose: 'Google Analytics session tracking',
        duration: '24 hours',
        provider: 'Google',
        type: 'HTTP Cookie'
      },
      {
        name: 'vercel-analytics',
        purpose: 'Website performance analytics',
        duration: '1 year',
        provider: 'Vercel',
        type: 'HTTP Cookie'
      }
    ]
  },
  {
    id: 'external',
    required: false,
    defaultValue: false,
    cookies: [
      {
        name: 'google-maps-*',
        purpose: 'Interactive maps and location services',
        duration: 'Session',
        provider: 'Google Maps',
        type: 'HTTP Cookie'
      },
      {
        name: 'google-ai-session',
        purpose: 'AI chatbot enhanced responses',
        duration: 'Session',
        provider: 'Google AI',
        type: 'Local Storage'
      }
    ]
  }
];

export const COOKIE_CONSENT_VERSION = '1.0.0';
export const COOKIE_CONSENT_KEY = 'lunex-cookie-consent';
export const COOKIE_CONSENT_EXPIRY_MONTHS = 12;