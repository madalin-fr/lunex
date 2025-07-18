import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Please read these terms carefully before using our services
            </p>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-3 rounded-full text-white">
              <p className="text-sm">Effective Date: 18 July 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Lunex Cleaning Services</strong></p>
                <p>Address: Romano di Lombardia, Bergamo, Italy</p>
              </div>
            </div>

            {/* Acceptance of Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">By accessing and using the services provided by Lunex Cleaning Services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Our Services</h2>
              <p className="text-gray-600 mb-4">Lunex Cleaning Services provides professional cleaning solutions including:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Office & Commercial Cleaning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Domestic & Residential Cleaning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Post-Renovation Cleaning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Luxury Property Care</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Deep Cleaning Services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Maintenance Cleaning Programs</span>
                </li>
              </ul>
            </div>

            {/* Obligations */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Obligations</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Obligations</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Provide professional quality cleaning services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Arrive at scheduled times</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Maintain proper insurance coverage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Use safe, eco-friendly cleaning products</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Obligations</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Provide safe access to cleaning areas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Inform us of any special requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Make timely payments as agreed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Secure valuables and fragile items</span>
                </li>
              </ul>
            </div>

            {/* Pricing and Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
              <p className="text-gray-600 mb-4">Our pricing is transparent and agreed upon before service delivery.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Quotes are valid for 30 days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Additional services will be charged separately</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Payment is due upon completion unless otherwise agreed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Late payments may incur additional charges</span>
                </li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation Policy</h2>
              <p className="text-gray-600 mb-4">We understand that plans can change. Our cancellation policy is designed to be fair to both parties.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">24-hour notice required for cancellations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Late cancellations may incur a fee</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Emergency cancellations will be handled on a case-by-case basis</span>
                </li>
              </ul>
            </div>

            {/* Liability and Insurance */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability and Insurance</h2>
              <p className="text-gray-600 mb-4">We take responsibility for our work and maintain comprehensive insurance coverage.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Fully insured for property damage and liability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Liability limited to the cost of service provided</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Not responsible for pre-existing damage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-600">Claims must be reported within 24 hours</span>
                </li>
              </ul>
            </div>

            {/* Termination */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-600">Either party may terminate the service agreement with written notice. Outstanding balances must be settled before termination is complete.</p>
            </div>

            {/* Legal Jurisdiction */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Jurisdiction</h2>
              <p className="text-gray-600 mb-4">These terms are governed by the laws of Italy and the European Union.</p>
              <p className="text-gray-600">Any disputes will be resolved in the courts of Bergamo, Italy.</p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Terms?</h2>
              <p className="text-gray-600 mb-6">If you have any questions about these Terms of Service, please contact us:</p>
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