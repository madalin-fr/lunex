'use client';

import React from 'react';
import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { t, locale } = useLocale();
  const basePath = locale === 'en' ? '/en' : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-green-100 mb-8">
              {t('privacy.subtitle')}
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">{t('terms.lastUpdated')}: 19 July 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Intro Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.intro.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.intro.content')}</p>
              <p className="text-gray-600">{t('privacy.intro.commitment')}</p>
            </div>

            {/* Data Collection Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.collection.title')}</h2>
              <p className="text-gray-600 mb-6">{t('privacy.sections.collection.content')}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('privacy.sections.collection.personal.title')}</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.personal.name')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.personal.email')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.personal.phone')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.personal.address')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.personal.payment')}</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('privacy.sections.collection.usage.title')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.usage.browser')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.usage.ip')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.collection.usage.pages')}</span>
                </li>
              </ul>
            </div>

            {/* How We Use Data Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.use.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.sections.use.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.use.purposes.service')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.use.purposes.communication')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.use.purposes.improvement')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.use.purposes.legal')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.use.purposes.marketing')}</span>
                </li>
              </ul>
            </div>

            {/* Data Protection Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.protection.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.sections.protection.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.protection.measures.encryption')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.protection.measures.access')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.protection.measures.training')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.protection.measures.regular')}</span>
                </li>
              </ul>
            </div>

            {/* Data Sharing Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.sharing.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.sections.sharing.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.sharing.exceptions.consent')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.sharing.exceptions.service')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.sharing.exceptions.legal')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.sharing.exceptions.protect')}</span>
                </li>
              </ul>
            </div>

            {/* Cookies Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.cookies.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.sections.cookies.content')}</p>
              <Link href={`${basePath}/cookies`} className="text-green-600 hover:text-green-700 font-medium">
                {t('footer.legal.cookies')} →
              </Link>
            </div>

            {/* Your Rights Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.rights.title')}</h2>
              <p className="text-gray-600 mb-4">{t('privacy.sections.rights.content')}</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.rights.list.access')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.rights.list.correction')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.rights.list.deletion')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.rights.list.portability')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">{t('privacy.sections.rights.list.withdrawal')}</span>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.contact.title')}</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>{t('privacy.company.name')}</strong></p>
                <p>{t('privacy.company.address')}</p>
                <p>Email: infocleaninglunex@gmail.com</p>
                <p>Phone: +39 327 779 1867</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('contactPage.title')}</h2>
              <p className="text-gray-600 mb-6">{t('privacy.sections.contact.content')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`${basePath}/contact`}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-center hover:shadow-lg transition-all duration-300 inline-block"
                >
                  {t('contactUs')}
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