import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SessionProvider from "@/components/SessionProvider";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

const siteUrl = "https://theatrehoteldoo.com";
const siteName = "THEATRE HOTEL d.o.o.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Luxury Boutique Hotel in Split, Croatia | 5-Star Accommodation`,
    template: `%s | ${siteName}`,
  },
  description: "Experience unparalleled luxury at THEATRE HOTEL d.o.o., Split's premier 5-star boutique hotel. Located in the heart of Split, Croatia, near Diocletian's Palace and the Adriatic Sea. Book your dream Mediterranean getaway with world-class amenities, gourmet dining, and exceptional service.",
  keywords: [
    "luxury hotel Split",
    "5-star hotel Croatia",
    "boutique hotel Split",
    "Split accommodation",
    "Diocletian Palace hotel",
    "Adriatic Sea hotel",
    "Croatian Riviera hotel",
    "Split city center hotel",
    "luxury accommodation Croatia",
    "Theatre Hotel Split",
    "premium hotel Split",
    "Split beach hotel",
    "Dalmatian coast hotel",
    "Mediterranean luxury hotel",
    "Split old town hotel",
    "hotel near Split airport",
    "romantic hotel Croatia",
    "business hotel Split",
    "family hotel Split",
    "hotel with sea view Split"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hr_HR", "de_DE", "it_IT"],
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - Luxury Boutique Hotel in Split, Croatia`,
    description: "Experience unparalleled luxury at Split's premier 5-star boutique hotel. Located in the heart of Split, near Diocletian's Palace and the Adriatic Sea.",
    images: [
      {
        url: `${siteUrl}/og_image.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Luxury Hotel in Split`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Luxury Boutique Hotel in Split, Croatia`,
    description: "Experience unparalleled luxury at Split's premier 5-star boutique hotel near Diocletian's Palace and the Adriatic Sea.",
    images: [`${siteUrl}/og_image.png`],
    creator: "@theatrehotel",
    site: "@theatrehotel",
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
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/en`,
      "hr-HR": `${siteUrl}/hr`,
    },
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": siteName,
    "description": "Luxury boutique hotel in Split, Croatia offering 5-star accommodation near Diocletian's Palace and the Adriatic Sea",
    "image": `${siteUrl}/og_image.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Matošića ul.",
      "addressLocality": "Split",
      "postalCode": "21000",
      "addressCountry": "HR"
    },
    "telephone": "+385924512500",
    "email": "info@theatrehoteldoo.com",
    "url": siteUrl,
    "priceRange": "€€€€",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
      { "@type": "LocationFeatureSpecification", "name": "Restaurant" },
      { "@type": "LocationFeatureSpecification", "name": "Bar" },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Reception" },
      { "@type": "LocationFeatureSpecification", "name": "Room Service" },
      { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.5081",
      "longitude": "16.4402"
    },
    "sameAs": [
      "https://www.facebook.com/theatrehotel",
      "https://www.instagram.com/theatrehotel",
      "https://twitter.com/theatrehotel"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a1a1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <RecaptchaProvider>
            <LanguageProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </LanguageProvider>
          </RecaptchaProvider>
        </SessionProvider>
      </body>
    </html>
  );
}