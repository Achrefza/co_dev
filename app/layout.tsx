import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import '@/styles/animations.css';
import { TrackingScripts } from '@/components/marketing/TrackingScripts';
import { JsonLd } from '@/components/seo/JsonLd';
import { createOrganizationSchema, createWebsiteSchema, siteConfig } from '@/lib/site';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: siteConfig.url
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} website preview`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [createOrganizationSchema(), createWebsiteSchema()];

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body">
        <JsonLd data={structuredData} />
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
