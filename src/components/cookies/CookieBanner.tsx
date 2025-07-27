'use client';

import React, { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLocale } from '@/hooks/useLocale';
import { Cookie, Settings, X } from 'lucide-react';
import { CookieCustomizationModal } from './CookieCustomizationModal';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, loading } = useCookieConsent();
  const { t } = useLocale();
  const [showCustomization, setShowCustomization] = useState(false);

  // Don't render if loading or banner shouldn't show
  if (loading || !showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icon and Content */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-green-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('cookies.banner.title')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('cookies.banner.message')}
                  <span className="ml-1">
                    <a 
                      href="/cookies" 
                      className="text-green-600 hover:text-green-700 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('cookies.banner.learnMore')}
                    </a>
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              {/* Accept All */}
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t('cookies.banner.accept')}
              </button>

              {/* Reject All */}
              <button
                onClick={rejectAll}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-300"
              >
                {t('cookies.banner.decline')}
              </button>

              {/* Customize */}
              <button
                onClick={() => setShowCustomization(true)}
                className="px-4 py-2.5 text-green-600 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-200 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {t('cookies.banner.customize')}
              </button>
            </div>
          </div>

          {/* Legal Compliance Notice */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('cookies.banner.legalNotice')}
            </p>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <CookieCustomizationModal
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
        />
      )}
    </>
  );
}

// Floating Cookie Settings Button (always visible after consent)
export function CookieSettingsButton() {
  const { hasConsent } = useCookieConsent();
  const { t } = useLocale();
  const [showCustomization, setShowCustomization] = useState(false);

  // Always show if user has given consent - this is required by Italian law
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Fixed Settings Button - More prominent and accessible */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setShowCustomization(true)}
          className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
          title={t('cookies.settings.title')}
          aria-label={t('cookies.settings.title')}
        >
          <Cookie className="w-5 h-5" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
              {t('cookies.settings.tooltip')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <CookieCustomizationModal
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
        />
      )}
    </>
  );
}

// Alternative Footer Link for Cookie Settings (additional access point)
export function CookieSettingsLink() {
  const { hasConsent } = useCookieConsent();
  const { t } = useLocale();
  const [showCustomization, setShowCustomization] = useState(false);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowCustomization(true)}
        className="text-gray-600 hover:text-green-600 transition-colors text-sm underline"
      >
        {t('cookies.settings.title')}
      </button>

      {showCustomization && (
        <CookieCustomizationModal
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
        />
      )}
    </>
  );
}