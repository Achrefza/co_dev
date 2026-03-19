import type { Metadata } from 'next';

export const siteConfig = {
  name: 'CO_DEV',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://co-dev.studio',
  title: 'CO_DEV – Web Development Studio | Custom Websites & SEO Optimized Solutions',
  description:
    'CO_DEV builds high-performance, SEO-optimized websites for businesses. Custom development, fast loading, and scalable solutions.',
  ogImage: '/og-image.svg',
  locale: 'en_US',
  keywords: [
    'CO_DEV',
    'web development',
    'custom websites',
    'SEO optimized websites',
    'e-commerce development',
    'business websites',
    'Next.js agency',
    'performance web design'
  ],
  services: [
    'Custom website development',
    'SEO optimized websites',
    'E-commerce development',
    'Business website design',
    'Landing page development',
    'Web application development'
  ],
  social: {
    linkedin: 'https://www.linkedin.com'
  },
  contact: {
    email: 'contact.codev@proton.me'
  },
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech', href: '#tech' },
    { label: 'Contact', href: '#contact' }
  ]
} as const;

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export function absoluteUrl(path = '/') {
  return new URL(normalizePath(path), siteConfig.url).toString();
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createPageMetadata({ title, description, path = '/', keywords = [] }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} website preview`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImage)]
    }
  };
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: [siteConfig.social.linkedin],
    knowsAbout: siteConfig.services
  };
}

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function createServiceSchema(serviceName: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: `${siteConfig.name} ${serviceName}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    areaServed: 'Worldwide',
    url: absoluteUrl(path),
    description,
    offers: siteConfig.services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service
      }
    }))
  };
}
