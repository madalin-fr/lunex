'use client';

import React from 'react';
import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('cookies.title')}
            </h1>
            <p className="text-xl text-green-100 mb-8">
              {t('cookies.subtitle')}
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">{t('cookies.lastUpdated')}: 19 July 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice Banner Style Example */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('cookies.banner.title')}</h3>
              <p className="text-gray-600 mb-4">{t('cookies.banner.message')}</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  {t('cookies.banner.accept')}
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  {t('cookies.banner.decline')}
                </button>
                <button className="text-green-600 hover:text-green-700 px-4 py-2 text-sm font-medium transition-colors">
                  {t('cookies.banner.customize')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cookies.intro.title')}</h2>
              <p className="text-gray-600 mb-4">{t('cookies.intro.content')}</p>
              <p className="text-gray-600">{t('cookies.intro.consent')}</p>
            </div>

            {/* Cookie Types */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cookies.types.title')}</h2>
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">{t('cookies.types.essential.title')}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{t('cookies.types.essential.description')}</p>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">{t('cookies.types.essential.examples.session')}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">{t('cookies.types.essential.examples.preferences')}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">{t('cookies.types.essential.examples.security')}</span>
                    </div>
                  </div>
                </div>

                {/* Local Storage */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">{t('cookies.types.functional.title')}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{t('cookies.types.functional.description')}</p>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">{t('cookies.types.functional.examples.language')}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">{t('cookies.types.functional.examples.location')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Are Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cookies.sections.what.title')}</h2>
              <p className="text-gray-600">{t('cookies.sections.what.content')}</p>
            </div>

            {/* Why We Use Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cookies.sections.why.title')}</h2>
              <p className="text-gray-600 mb-4">{t('cookies.sections.why.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.why.list.remember')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.why.list.improve')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.why.list.secure')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.why.list.personalize')}</span>
                </li>
              </ul>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cookies.sections.control.title')}</h2>
              <p className="text-gray-600 mb-4">{t('cookies.sections.control.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.control.list.browser')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.control.list.disable')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.control.list.delete')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('cookies.sections.control.list.block')}</span>
                </li>
              </ul>
            </div>

            {/* Detailed Cookie Information */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cookies.thirdParty.title')}</h2>
              <p className="text-gray-600 mb-6">{t('cookies.thirdParty.content')}</p>
              
              {/* Google Analytics */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Google Analytics (G-RC1VTMXZWV)</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Tracks website usage and visitor behavior</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Cookies:</span> _ga, _ga_*, _gid |
                  <span className="font-medium ml-2">Duration:</span> 2 years |
                  <span className="font-medium ml-2">Category:</span> Analytics
                </div>
              </div>

              {/* Vercel Analytics */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Vercel Analytics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Website performance monitoring</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Duration:</span> 1 year |
                  <span className="font-medium ml-2">Category:</span> Analytics
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-orange-200">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Google Maps</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Interactive maps and location services</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Duration:</span> Session |
                  <span className="font-medium ml-2">Category:</span> External Services
                </div>
              </div>

              {/* Google AI */}
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Google AI Chatbot</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Enhanced chatbot responses with AI</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Duration:</span> Session |
                  <span className="font-medium ml-2">Category:</span> External Services
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cookies.contact.title')}</h2>
              <p className="text-gray-600 mb-6">{t('cookies.contact.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-center hover:shadow-lg transition-all duration-300 inline-block"
                >
                  {t('cookies.contact.button')}
                </Link>
                <a 
                  href="mailto:infocleaninglunex@gmail.com"
                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-full text-center hover:bg-green-600 hover:text-white transition-all duration-300 inline-block"
                >
                  infocleaninglunex@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}