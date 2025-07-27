'use client';

import { 
  CookieConsent, 
  COOKIE_CONSENT_KEY, 
  COOKIE_CONSENT_VERSION, 
  COOKIE_CONSENT_EXPIRY_MONTHS 
} from '@/types/cookies';

class CookieConsentService {
  private static instance: CookieConsentService;
  
  public static getInstance(): CookieConsentService {
    if (!CookieConsentService.instance) {
      CookieConsentService.instance = new CookieConsentService();
    }
    return CookieConsentService.instance;
  }

  /**
   * Get current cookie consent status
   */
  getConsent(): CookieConsent | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) return null;
      
      const consent = JSON.parse(stored) as CookieConsent;
      
      // Check if consent is expired (12 months)
      const consentDate = new Date(consent.timestamp);
      const expiryDate = new Date(consentDate);
      expiryDate.setMonth(expiryDate.getMonth() + COOKIE_CONSENT_EXPIRY_MONTHS);
      
      if (new Date() > expiryDate) {
        this.clearConsent();
        return null;
      }
      
      // Check if consent version is outdated
      if (consent.version !== COOKIE_CONSENT_VERSION) {
        this.clearConsent();
        return null;
      }
      
      return consent;
    } catch {
      return null;
    }
  }

  /**
   * Save cookie consent preferences
   */
  setConsent(consent: Omit<CookieConsent, 'timestamp' | 'version'>): void {
    if (typeof window === 'undefined') return;
    
    const fullConsent: CookieConsent = {
      ...consent,
      timestamp: new Date(),
      version: COOKIE_CONSENT_VERSION,
      essential: true, // Always true for essential cookies
    };
    
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));
      
      // Trigger custom event for other components to react
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
        detail: fullConsent 
      }));
    } catch (error) {
      console.error('Failed to save cookie consent:', error);
    }
  }

  /**
   * Clear all cookie consent data
   */
  clearConsent(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      
      // Also clear other cookies based on what was previously allowed
      this.clearNonEssentialCookies();
      
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
        detail: null 
      }));
    } catch (error) {
      console.error('Failed to clear cookie consent:', error);
    }
  }

  /**
   * Check if a specific cookie category is allowed
   */
  isAllowed(category: keyof Omit<CookieConsent, 'timestamp' | 'version' | 'userId'>): boolean {
    const consent = this.getConsent();
    if (!consent) return category === 'essential';
    return consent[category];
  }

  /**
   * Check if user has made any consent decision
   */
  hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  /**
   * Accept all cookie categories
   */
  acceptAll(): void {
    this.setConsent({
      essential: true,
      functional: true,
      analytics: true,
      external: true,
    });
  }

  /**
   * Reject all non-essential cookies
   */
  rejectAll(): void {
    this.setConsent({
      essential: true,
      functional: false,
      analytics: false,
      external: false,
    });
  }

  /**
   * Clear non-essential cookies when consent is withdrawn
   */
  private clearNonEssentialCookies(): void {
    if (typeof window === 'undefined') return;

    try {
      // Clear localStorage items (except essential ones)
      const essentialKeys = ['locale', COOKIE_CONSENT_KEY];
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !essentialKeys.includes(key)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear HTTP cookies (by domain)
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Don't clear essential cookies
        if (!name.startsWith('next-auth') && !name.startsWith('locale')) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      });
    } catch (error) {
      console.error('Failed to clear non-essential cookies:', error);
    }
  }

  /**
   * Get consent status for logging/compliance
   */
  getConsentLog(): {
    hasConsent: boolean;
    consentDate: string | null;
    categories: Record<string, boolean>;
    version: string | null;
  } {
    const consent = this.getConsent();
    
    return {
      hasConsent: consent !== null,
      consentDate: consent?.timestamp.toISOString() || null,
      categories: {
        essential: consent?.essential || false,
        functional: consent?.functional || false,
        analytics: consent?.analytics || false,
        external: consent?.external || false,
      },
      version: consent?.version || null,
    };
  }
}

export const cookieConsentService = CookieConsentService.getInstance();