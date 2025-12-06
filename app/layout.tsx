import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { TASA_Orbiter, Allan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";

const tasaOrbiter = TASA_Orbiter({
  variable: "--font-tasa-orbiter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const allan = Allan({
  variable: "--font-allan",
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Personal Finance Dashboard",
    template: "%s | Personal Finance Dashboard",
  },
  description: "Manage your personal finances with ease. Track income, expenses, and gain insights into your financial health.",
  keywords: ["personal finance", "budget", "expense tracking", "financial dashboard", "money management"],
  authors: [{ name: "Personal Finance Dashboard" }],
  creator: "Personal Finance Dashboard",
  publisher: "Personal Finance Dashboard",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Finance Dashboard",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#2563eb" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Personal Finance Dashboard",
    title: "Personal Finance Dashboard",
    description: "Manage your personal finances with ease. Track income, expenses, and gain insights into your financial health.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Personal Finance Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Finance Dashboard",
    description: "Manage your personal finances with ease. Track income, expenses, and gain insights into your financial health.",
    images: ["/opengraph-image"],
    creator: "@personalfinance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/icon-76x76.png", sizes: "76x76", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Finance Dashboard" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icons/icon-120x120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icons/icon-76x76.png" sizes="76x76" />
        <link rel="mask-icon" href="/icons/icon-180x180.png" color="#2563eb" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${tasaOrbiter.variable} ${allan.variable} antialiased`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const theme = storedTheme || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <OfflineIndicator />
          {children}
          <ServiceWorkerRegistration />
        </ThemeProvider>
      </body>
    </html>
  );
}
