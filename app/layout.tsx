import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.picktomes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PickTomes | Ancient Wisdom & Rare Digital Tomes Scriptorium",
    template: "%s | PickTomes",
  },
  description: "PickTomes is an antique digital scriptorium preserving ancient wisdom, classic literature, rare manuscripts, and artisanal EPUB tomes.",
  keywords: ["PickTomes", "Ancient Tomes", "Vintage Manuscripts", "Rare Books", "Gothic Digital Bookstore"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "PickTomes | Ancient Wisdom & Rare Digital Tomes Scriptorium",
    description: "Preserving ancient wisdom and rare digital manuscripts at PickTomes.",
    url: siteUrl,
    siteName: "PickTomes",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "PickTomes" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-manrope bg-[#F4EBD9] text-[#2B1E16]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
