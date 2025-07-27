import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "@/hooks/useLocale";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWrapper } from "@/components/ui/ChatbotWrapper";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { CookieBanner, CookieSettingsButton } from "@/components/cookies/CookieBanner";
import { ConditionalAnalytics } from "@/components/cookies/ConditionalAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lunex - Servizi di Pulizia Professionali Romano di Lombardia",
  description: "Servizi di pulizia professionali per uffici, abitazioni e spazi commerciali a Romano di Lombardia, Bergamo. Soluzioni di pulizia di qualità per ogni esigenza.",
  keywords: "pulizie professionali, pulizie uffici, pulizie domestiche, Romano di Lombardia, Bergamo, pulizie post-ristrutturazione, pulizie ville lusso",
  authors: [{ name: "Lunex Professional Cleaning" }],
  creator: "Lunex Professional Cleaning",
  publisher: "Lunex Professional Cleaning",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* Google Analytics Consent Initialization - Always loads first */}
        <Script id="gtag-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Initialize with denied consent by default (Italian law compliance)
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted'
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CookieConsentProvider>
          <LocaleProvider>
            <ChatbotWrapper>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ChatbotWrapper>
            
            {/* Cookie Banner - Shows only when consent needed */}
            <CookieBanner />
            
            {/* Cookie Settings Button - Always available after consent */}
            <CookieSettingsButton />
            
            {/* Conditional Analytics - Only loads with consent */}
            <ConditionalAnalytics />
          </LocaleProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
