import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-100 mb-8">
              How we protect and manage your personal information
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">Last Updated: 18 July 2024</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">At Lunex Cleaning Services, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
              <p className="text-gray-600">We are committed to protecting your personal data and respecting your privacy rights.</p>
            </div>

            {/* Data Collection Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-6">We collect information that you provide directly to us and information that is automatically collected when you use our services.</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Name and contact details</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Email address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Phone number</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Service address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Payment information</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Information</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Browser type and version</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">IP address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Pages visited and time spent</span>
                </li>
              </ul>
            </div>

            {/* How We Use Data Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to provide, maintain, and improve our services.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To provide cleaning services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To communicate with you about our services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To improve our services and develop new features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To comply with legal obligations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To send promotional materials (with your consent)</span>
                </li>
              </ul>
            </div>

            {/* Data Protection Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
              <p className="text-gray-600 mb-4">We implement appropriate technical and organizational measures to protect your personal information.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Data encryption</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Limited access controls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Staff training on data protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Regular security assessments</span>
                </li>
              </ul>
            </div>

            {/* Data Sharing Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-600 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">With your consent</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To service providers who assist us</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To comply with legal obligations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">To protect our rights and safety</span>
                </li>
              </ul>
            </div>

            {/* Cookies Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">We use cookies and similar tracking technologies to improve your experience on our website.</p>
              <a href="/cookies" className="text-green-600 hover:text-green-700 font-medium">
                View our Cookie Policy →
              </a>
            </div>

            {/* Your Rights Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">You have certain rights regarding your personal information under applicable data protection laws:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Right to access your data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Right to correct inaccurate data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Right to request deletion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Right to data portability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Right to withdraw consent</span>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Controller</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Lunex Cleaning Services</strong></p>
                <p>Romano di Lombardia, Bergamo, Italy</p>
                <p>Email: infocleaninglunex@gmail.com</p>
                <p>Phone: +39 327 779 1867</p>
                <p>VAT Number: IT12345678901</p>
                <p>Company Registration: BG/2024/CLN-0012</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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