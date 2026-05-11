import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { getMetadataBase, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s · ${siteConfig.titleTemplateSuffix}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: "Javier Álvarez (Medina)", url: getMetadataBase().origin }],
  creator: "Javier Álvarez (Medina)",
  keywords: [
    "Javier Álvarez",
    "Javier Álvarez Medina",
    "xavijam",
    "software",
    "geospatial",
    "Tinybird",
    "CARTO",
    "Vizzuality",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.shortName,
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: siteConfig.defaultTitle,
    description: siteConfig.socialDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
