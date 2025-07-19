import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "@/hooks/useLocale";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWrapper } from "@/components/ui/ChatbotWrapper";

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
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RC1VTMXZWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RC1VTMXZWV');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LocaleProvider>
          <ChatbotWrapper>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ChatbotWrapper>
        </LocaleProvider>
      </body>
    </html>
  );
}
