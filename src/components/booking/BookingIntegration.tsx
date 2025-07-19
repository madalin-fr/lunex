'use client';

import { useState, useEffect } from 'react';
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
      // Load Cal.com embed script
      const script = document.createElement('script');
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init");
      `;
      document.body.appendChild(script);
      setIsLoaded(true);

      return () => {
        document.body.removeChild(script);
      };
    } else if (service === 'custom' && embedCode) {
      setIsLoaded(true);
    } else {
      // If no valid service configuration, mark as loaded to prevent infinite loading
      setIsLoaded(true);
    }
  }, [service, calendlyUrl, calUsername, embedCode]);

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

    if (inline) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `<cal-inline style="width:100%;height:100%;overflow:scroll" callink="${calLink}"></cal-inline>`,
          }}
          style={{ width: '100%', height: '630px' }}
        />
      );
    }

    return (
      <div className="text-center">
        <Button
          data-cal-link={calLink}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8"
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
  }
}