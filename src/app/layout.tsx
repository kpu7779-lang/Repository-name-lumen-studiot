import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n/provider";
import { JsonLd } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumen-studio-3b3.pages.dev"),
  title: {
    default: "Lumen Studio — 摄影作品集 | Photography Portfolio",
    template: "%s · Lumen Studio",
  },
  description:
    "Lumen Studio 是一位专注于人像、风光与街拍的独立摄影师作品集。记录光影瞬间，讲述影像背后的故事。",
  keywords: [
    "摄影作品集",
    "摄影师",
    "人像摄影",
    "风光摄影",
    "街拍",
    "Photography Portfolio",
    "Photographer",
    "Portrait",
    "Landscape",
    "Street Photography",
  ],
  authors: [{ name: "Lumen Studio" }],
  creator: "Lumen Studio",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Lumen Studio — 摄影作品集",
    description: "记录光影瞬间，讲述影像背后的故事。",
    url: "https://lumen-studio-3b3.pages.dev",
    siteName: "Lumen Studio",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        width: 1200,
        height: 800,
        alt: "Lumen Studio — 风光摄影作品",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen Studio — 摄影作品集",
    description: "记录光影瞬间，讲述影像背后的故事。",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${notoSansSC.variable} ${notoSerifSC.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <JsonLd />
            {children}
            <Toaster />
            <SonnerToaster position="bottom-right" richColors />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
