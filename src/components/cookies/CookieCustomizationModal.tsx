'use client';

import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLocale } from '@/hooks/useLocale';
import { COOKIE_CATEGORIES } from '@/types/cookies';
import { X, Save, Shield, BarChart3, Cog, Globe } from 'lucide-react';

interface CookieCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieCustomizationModal({ isOpen, onClose }: CookieCustomizationModalProps) {
  const { consent, setConsent } = useCookieConsent();
  const { t } = useLocale();
  
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    external: false,
  });

  // Initialize preferences from current consent
  useEffect(() => {
    if (consent) {
      setPreferences({
        essential: consent.essential,
        functional: consent.functional,
        analytics: consent.analytics,
        external: consent.external,
      });
    }
  }, [consent]);

  if (!isOpen) return null;

  const handleSave = () => {
    setConsent(preferences);
    onClose();
  };

  const handleToggle = (category: keyof typeof preferences) => {
    if (category === 'essential') return; // Can't disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'essential':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'functional':
        return <Cog className="w-5 h-5 text-blue-600" />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-purple-600" />;
      case 'external':
        return <Globe className="w-5 h-5 text-orange-600" />;
      default:
        return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'essential':
        return 'border-green-200 bg-green-50';
      case 'functional':
        return 'border-blue-200 bg-blue-50';
      case 'analytics':
        return 'border-purple-200 bg-purple-50';
      case 'external':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('cookies.customization.title')}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {t('cookies.customization.subtitle')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-6">
              {COOKIE_CATEGORIES.map((category) => {
                const isEnabled = preferences[category.id as keyof typeof preferences];
                const isRequired = category.required;

                return (
                  <div
                    key={category.id}
                    className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                      getCategoryColor(category.id)
                    } ${isEnabled ? 'ring-2 ring-offset-2 ring-green-200' : ''}`}
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.id)}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {t(`cookies.categories.${category.id}.title`)}
                          </h3>
                          {isRequired && (
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                              {t('cookies.customization.required')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Toggle */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleToggle(category.id)}
                          disabled={isRequired}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                            isRequired
                              ? 'bg-green-400 cursor-not-allowed'
                              : isEnabled
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Category Description */}
                    <p className="text-sm text-gray-600 mb-3">
                      {t(`cookies.categories.${category.id}.description`)}
                    </p>

                    {/* Cookies List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                        {t('cookies.customization.cookiesUsed')}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.cookies.map((cookie, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 text-xs">
                            <div className="font-medium text-gray-900">{cookie.name}</div>
                            <div className="text-gray-600 mt-1">{cookie.purpose}</div>
                            <div className="flex justify-between mt-2 text-gray-500">
                              <span>{cookie.provider}</span>
                              <span>{cookie.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="text-sm text-gray-600">
              {t('cookies.customization.footerNote')}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('cookies.customization.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                {t('cookies.customization.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}