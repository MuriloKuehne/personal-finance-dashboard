import type { Metadata } from "next";
import Script from "next/script";
import { TASA_Orbiter, Allan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
