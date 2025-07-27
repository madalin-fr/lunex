'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CookieConsent } from '@/types/cookies';
import { cookieConsentService } from '@/lib/cookies/consent-service';

interface CookieConsentContextType {
  consent: CookieConsent | null;
  hasConsent: boolean;
  isAllowed: (category: keyof Omit<CookieConsent, 'timestamp' | 'version' | 'userId'>) => boolean;
  setConsent: (consent: Omit<CookieConsent, 'timestamp' | 'version'>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  clearConsent: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  loading: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  // Initialize consent state on mount
  useEffect(() => {
    const currentConsent = cookieConsentService.getConsent();
    setConsentState(currentConsent);
    setShowBanner(!currentConsent); // Show banner if no consent
    setLoading(false);
  }, []);

  // Listen for consent changes from other tabs/windows
  useEffect(() => {
    const handleConsentChange = (event: CustomEvent) => {
      const newConsent = event.detail as CookieConsent | null;
      setConsentState(newConsent);
      setShowBanner(!newConsent);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange as EventListener);
    
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange as EventListener);
    };
  }, []);

  // Wrapper functions that update local state
  const setConsent = (newConsent: Omit<CookieConsent, 'timestamp' | 'version'>) => {
    cookieConsentService.setConsent(newConsent);
    // State will be updated via the event listener
  };

  const acceptAll = () => {
    cookieConsentService.acceptAll();
    setShowBanner(false);
    // State will be updated via the event listener
  };

  const rejectAll = () => {
    cookieConsentService.rejectAll();
    setShowBanner(false);
    // State will be updated via the event listener
  };

  const clearConsent = () => {
    cookieConsentService.clearConsent();
    setShowBanner(true);
    // State will be updated via the event listener
  };

  const hasConsent = consent !== null;

  const isAllowed = (category: keyof Omit<CookieConsent, 'timestamp' | 'version' | 'userId'>) => {
    return cookieConsentService.isAllowed(category);
  };

  const contextValue: CookieConsentContextType = {
    consent,
    hasConsent,
    isAllowed,
    setConsent,
    acceptAll,
    rejectAll,
    clearConsent,
    showBanner,
    setShowBanner,
    loading,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
}

// Hook for conditional rendering based on consent
export function useConditionalRender(
  category: keyof Omit<CookieConsent, 'timestamp' | 'version' | 'userId'>
) {
  const { isAllowed, loading } = useCookieConsent();
  
  return {
    canRender: isAllowed(category),
    loading,
  };
}

// Hook for analytics
export function useAnalytics() {
  const { isAllowed } = useCookieConsent();
  
  return {
    canTrack: isAllowed('analytics'),
    gtag: (typeof window !== 'undefined' && isAllowed('analytics')) 
      ? (window as any).gtag 
      : () => {}, // No-op function
  };
}

// Hook for external services
export function useExternalServices() {
  const { isAllowed } = useCookieConsent();
  
  return {
    canUseGoogleMaps: isAllowed('external'),
    canUseAI: isAllowed('external'),
  };
}

// Hook for functional features
export function useFunctionalFeatures() {
  const { isAllowed } = useCookieConsent();
  
  return {
    canStoreChatHistory: isAllowed('functional'),
    canStorePreferences: isAllowed('functional'),
  };
}