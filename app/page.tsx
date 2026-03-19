import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { createPageMetadata, createServiceSchema } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'CO_DEV – Web Development Studio | Custom Websites & SEO Optimized Solutions',
  description:
    'CO_DEV builds high-performance, SEO-optimized websites for businesses. Custom development, fast loading, and scalable solutions.',
  path: '/',
  keywords: ['web development studio', 'custom websites', 'SEO optimized solutions']
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          'Web Development Studio',
          'CO_DEV builds custom websites, SEO optimized websites, e-commerce platforms, and business websites for long-term growth.',
          '/'
        )}
      />
      <HomePage />
    </>
  );
}
