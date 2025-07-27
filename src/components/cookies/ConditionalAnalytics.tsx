'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { useAnalytics } from '@/contexts/CookieConsentContext';

export function ConditionalAnalytics() {
  const { canTrack } = useAnalytics();

  // Load Google Analytics only if consent is given
  useEffect(() => {
    if (canTrack) {
      // Initialize Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // Revoke consent if previously granted
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
  }, [canTrack]);

  if (!canTrack) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Scripts - Only load if consent given */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RC1VTMXZWV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RC1VTMXZWV', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
      
      {/* Vercel Analytics - Only load if consent given */}
      <Analytics />
    </>
  );
}

// Component for Google Analytics consent initialization (loads regardless of consent)
export function GoogleAnalyticsInit() {
  return (
    <Script id="gtag-consent-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // Initialize with denied consent by default
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied',
          security_storage: 'granted'
        });
      `}
    </Script>
  );
}