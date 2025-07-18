import React from 'react';

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Understanding how we use cookies to improve your experience
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">Last Updated: 18 July 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Notice Banner Style Example */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Notice Example</h3>
              <p className="text-gray-600 mb-4">We use cookies to enhance your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  Accept All
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  Decline
                </button>
                <button className="text-green-600 hover:text-green-700 px-4 py-2 text-sm font-medium transition-colors">
                  Customize Settings
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">Lunex Cleaning Services ("we", "our", or "us") uses cookies and similar tracking technologies on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.</p>
              <p className="text-gray-600">By using our website, you agree to the use of cookies as described in this policy.</p>
            </div>

            {/* Cookie Types */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-3">These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you.</p>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Session management</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">User preferences</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Security and authentication</span>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-3">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Google Analytics tracking</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">User behavior analysis</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Performance monitoring</span>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-600 mb-3">These cookies enable enhanced functionality and personalization, such as videos and live chats.</p>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Language preferences</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Location settings</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 text-sm mt-0.5">•</span>
                      <span className="text-gray-600 text-sm">Display preferences</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Are Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-600">Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
            </div>

            {/* Why We Use Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Use Cookies</h2>
              <p className="text-gray-600 mb-4">We use cookies for several important reasons:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To remember your preferences and settings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To improve website performance and user experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To ensure the security of your data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To personalize content and recommendations</span>
                </li>
              </ul>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 mb-4">You have control over how cookies are used on your device:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Browser settings: Most browsers allow you to control cookies through their settings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Disable cookies: You can choose to disable cookies, but this may affect website functionality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Delete cookies: You can delete cookies that have already been set</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Block third-party cookies: You can block cookies from third-party providers</span>
                </li>
              </ul>
            </div>

            {/* Third Party Cookies */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">We may use third-party services that also use cookies. These include:</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Google Analytics - Website traffic analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Google Maps - Location services</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
              <p className="text-gray-600 mb-6">If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-center hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Contact Us
                </a>
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
  )
}