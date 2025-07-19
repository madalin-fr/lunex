'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/useLocale';

interface BookingIntegrationProps {
  service: 'calendly' | 'cal' | 'custom';
  // Calendly specific
  calendlyUrl?: string;
  // Cal.com specific
  calUsername?: string;
  calEventSlug?: string;
  // Custom embed code
  embedCode?: string;
  // Common options
  inline?: boolean;
  hideDetails?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

// Global flag to track if Cal.com script is already loaded
let calScriptLoaded = false;
let calScriptLoading = false;
const calLoadPromise = new Promise<void>((resolve) => {
  if (typeof window !== 'undefined') {
    (window as any).__calLoadResolve = resolve;
  }
});

export function BookingIntegration({
  service,
  calendlyUrl,
  calUsername,
  calEventSlug,
  embedCode,
  inline = true,
  hideDetails = false,
  backgroundColor = '#ffffff',
  textColor = '#374151',
  primaryColor = '#f59e0b',
}: BookingIntegrationProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLocale();
  const widgetId = useRef(`cal-widget-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Early return if no valid configuration
    if (service === 'cal' && (!calUsername || calUsername.trim() === '')) {
      setIsLoaded(true);
      return;
    }
    
    if (service === 'calendly' && calendlyUrl) {
      // Load Calendly widget script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else if (service === 'cal' && calUsername && calUsername.trim() !== '') {
      // Check if Cal.com script is already loaded or loading
      if (calScriptLoaded || (typeof window !== 'undefined' && window.Cal?.loaded)) {
        console.log('Cal.com script already loaded');
        setIsLoaded(true);
        // Re-initialize UI for new buttons
        setTimeout(() => {
          if (window.Cal) {
            window.Cal("ui", {
              "styles": {
                "branding": {
                  "brandColor": primaryColor
                }
              },
              "hideEventTypeDetails": false,
              "theme": "light"
            });
          }
        }, 100);
        return;
      }

      if (!calScriptLoading) {
        calScriptLoading = true;
        console.log('Loading Cal.com script for the first time');
        
        // Load Cal.com embed script only once
        const script = document.createElement('script');
        script.id = 'cal-com-script';
        script.innerHTML = `
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init");
          
          // Wait for Cal to be fully loaded
          setTimeout(() => {
            if (window.Cal) {
              Cal("ui", {
                "styles": {
                  "branding": {
                    "brandColor": "${primaryColor}"
                  }
                },
                "hideEventTypeDetails": false,
                "theme": "light"
              });
              window.__calLoadResolve && window.__calLoadResolve();
            }
          }, 500);
        `;
        document.body.appendChild(script);
        
        calScriptLoaded = true;
        setTimeout(() => setIsLoaded(true), 600);
      } else {
        // Wait for the script to load
        calLoadPromise.then(() => {
          console.log('Cal.com script loaded via promise');
          setIsLoaded(true);
          // Re-initialize UI for new buttons
          setTimeout(() => {
            if (window.Cal) {
              window.Cal("ui", {
                "styles": {
                  "branding": {
                    "brandColor": primaryColor
                  }
                },
                "hideEventTypeDetails": false,
                "theme": "light"
              });
            }
          }, 100);
        });
      }
    } else if (service === 'custom' && embedCode) {
      setIsLoaded(true);
    } else {
      // If no valid service configuration, mark as loaded to prevent infinite loading
      setIsLoaded(true);
    }
  }, [service, calendlyUrl, calUsername, embedCode, primaryColor]);

  // Initialize inline Cal.com widget when needed
  useEffect(() => {
    if (service === 'cal' && inline && isLoaded && window.Cal && calUsername) {
      const calLink = calEventSlug ? `${calUsername}/${calEventSlug}` : calUsername;
      console.log('Initializing Cal.com inline widget for:', calLink);
      console.log('Widget container ID:', `${widgetId.current}-inline`);
      
      // Add a slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const container = document.getElementById(`${widgetId.current}-inline`);
        console.log('Container element found:', !!container);
        
        if (window.Cal && container) {
          try {
            // First try the modern inline method
            window.Cal("inline", {
              elementOrSelector: `#${widgetId.current}-inline`,
              calLink: calLink,
              config: {
                theme: "light",
                styles: {
                  branding: {
                    brandColor: primaryColor
                  }
                }
              }
            });
            console.log('Cal.com inline widget initialized successfully');
          } catch (error) {
            console.error('Error initializing Cal.com inline widget:', error);
            // Fallback: try using the cal-inline custom element
            container.innerHTML = `<cal-inline style="width:100%;height:100%;overflow:scroll" callink="${calLink}"></cal-inline>`;
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [service, inline, isLoaded, calUsername, calEventSlug, primaryColor]);

  const renderCalendly = () => {
    if (!calendlyUrl) return null;

    if (inline) {
      return (
        <div
          className="calendly-inline-widget"
          data-url={`${calendlyUrl}?hide_landing_page_details=${hideDetails}&background_color=${backgroundColor.replace('#', '')}&text_color=${textColor.replace('#', '')}&primary_color=${primaryColor.replace('#', '')}`}
          style={{ minWidth: '320px', height: '630px' }}
        />
      );
    }

    return (
      <div className="text-center">
        <Button
          onClick={() => {
            if (window.Calendly) {
              window.Calendly.initPopupWidget({
                url: calendlyUrl,
                backgroundColor,
                textColor,
                primaryColor,
              });
            }
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8"
        >
          {t('bookingPage.scheduleAppointment')}
        </Button>
      </div>
    );
  };

  const renderCal = () => {
    if (!calUsername || calUsername.trim() === '') {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">{t('bookingPage.preferCall.description')}</p>
        </div>
      );
    }

    const calLink = calEventSlug
      ? `${calUsername}/${calEventSlug}`
      : calUsername;

    // Debug logging
    console.log('Cal.com Debug:', {
      calUsername,
      calEventSlug,
      calLink,
      isLoaded,
      inline,
      calAvailable: typeof window !== 'undefined' && window.Cal
    });

    if (inline) {
      return (
        <div style={{ width: '100%', height: '630px', position: 'relative' }}>
          <div
            id={`${widgetId.current}-inline`}
            style={{ width: '100%', height: '100%' }}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Caricamento calendario...</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="text-center">
        <Button
          data-cal-link={calLink}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8"
          onClick={(e) => {
            console.log('Button clicked, Cal status:', window.Cal);
            if (!window.Cal) {
              e.preventDefault();
              console.error('Cal.com script not loaded yet');
              // Try to manually trigger Cal
              setTimeout(() => {
                if (window.Cal) {
                  window.Cal("openDialog", calLink);
                }
              }, 500);
            }
          }}
        >
          {t('bookingPage.bookAppointment')}
        </Button>
      </div>
    );
  };

  const renderCustom = () => {
    if (!embedCode) return null;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: embedCode }}
        className="w-full"
      />
    );
  };

  const renderBookingWidget = () => {
    switch (service) {
      case 'calendly':
        return renderCalendly();
      case 'cal':
        return renderCal();
      case 'custom':
        return renderCustom();
      default:
        return null;
    }
  };

  // Don't show loading state for Cal.com if no username is configured
  if (!isLoaded && service !== 'custom' && !(service === 'cal' && (!calUsername || calUsername.trim() === ''))) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('bookingPage.loadingSystem')}</p>
        </div>
      </div>
    );
  }

  return <div className="booking-integration">{renderBookingWidget()}</div>;
}

// TypeScript declarations for external scripts
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        backgroundColor?: string;
        textColor?: string;
        primaryColor?: string;
      }) => void;
    };
    Cal?: {
      (action: string, ...args: unknown[]): void;
      ns?: Record<string, unknown>;
      q?: unknown[];
      loaded?: boolean;
    };
    __calLoadResolve?: () => void;
  }
}