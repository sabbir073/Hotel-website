import { Metadata } from 'next';

const siteUrl = 'https://theatrehoteldoo.com';
const siteName = 'THEATRE HOTEL d.o.o.';
const siteDescription = 'Experience unparalleled luxury at THEATRE HOTEL d.o.o., Split\'s premier 5-star boutique hotel. Located in the heart of Split, Croatia, near Diocletian\'s Palace and the Adriatic Sea.';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Generate comprehensive SEO metadata for any page
 * @param props - SEO configuration options
 * @returns Next.js Metadata object
 */
export function generateSEO(props: SEOProps = {}): Metadata {
  const {
    title,
    description = siteDescription,
    image = `${siteUrl}/og_image.png`,
    url = siteUrl,
    keywords = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    noindex = false,
  } = props;

  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} - Luxury Boutique Hotel in Split, Croatia | 5-Star Accommodation`;
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description,
    keywords: [
      'luxury hotel Split',
      '5-star hotel Croatia',
      'boutique hotel Split',
      'Split accommodation',
      'Diocletian Palace hotel',
      'Adriatic Sea hotel',
      ...keywords,
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: {
      type,
      locale: 'en_US',
      alternateLocale: ['hr_HR', 'de_DE', 'it_IT'],
      url: fullUrl,
      siteName,
      title: title || `${siteName} - Luxury Boutique Hotel in Split, Croatia`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
      creator: '@theatrehotel',
      site: '@theatrehotel',
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': `${siteUrl}/en`,
        'hr-HR': `${siteUrl}/hr`,
      },
    },
    category: 'travel',
  };
}

/**
 * Generate Hotel Schema.org JSON-LD structured data
 */
export function generateHotelSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: siteName,
    description: siteDescription,
    image: `${siteUrl}/og_image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Matošića ul.',
      addressLocality: 'Split',
      postalCode: '21000',
      addressCountry: 'HR',
    },
    telephone: '+385924512500',
    email: 'info@theatrehoteldoo.com',
    url: siteUrl,
    priceRange: '€€€€',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
      { '@type': 'LocationFeatureSpecification', name: 'Bar' },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Reception' },
      { '@type': 'LocationFeatureSpecification', name: 'Room Service' },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' },
      { '@type': 'LocationFeatureSpecification', name: 'Spa' },
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
      { '@type': 'LocationFeatureSpecification', name: 'Fitness Center' },
      { '@type': 'LocationFeatureSpecification', name: 'Parking' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.5081',
      longitude: '16.4402',
    },
    sameAs: [
      'https://www.facebook.com/theatrehotel',
      'https://www.instagram.com/theatrehotel',
      'https://twitter.com/theatrehotel',
    ],
  };
}

/**
 * Generate BreadcrumbList Schema.org JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate LocalBusiness Schema.org JSON-LD
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    telephone: '+385924512500',
    email: 'info@theatrehoteldoo.com',
    priceRange: '€€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Matošića ul.',
      addressLocality: 'Split',
      addressRegion: 'Split-Dalmatia County',
      postalCode: '21000',
      addressCountry: 'HR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.5081',
      longitude: '16.4402',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://www.facebook.com/theatrehotel',
      'https://www.instagram.com/theatrehotel',
      'https://twitter.com/theatrehotel',
    ],
  };
}

/**
 * Generate FAQ Schema.org JSON-LD
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const seoConfig = {
  siteUrl,
  siteName,
  siteDescription,
};
