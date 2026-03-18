import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/marketing/PageHero';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { createPageMetadata, createServiceSchema } from '@/lib/site';

const services = [
  {
    title: 'Custom Website Development',
    description: 'Conversion-focused custom websites built with clean code, responsive layouts, and long-term scalability in mind.'
  },
  {
    title: 'SEO Optimized Websites',
    description: 'Technical SEO foundations, structured data, crawlability, metadata, and internal linking that support better Google rankings.'
  },
  {
    title: 'E-commerce Development',
    description: 'Fast storefronts and scalable e-commerce experiences designed for product discovery, paid campaigns, and measurable growth.'
  },
  {
    title: 'Business Websites',
    description: 'Professional business websites that communicate trust, showcase services, and generate qualified leads.'
  }
];

export const metadata: Metadata = createPageMetadata({
  title: 'Services – Custom Websites, SEO Optimized Websites & E-commerce Development',
  description:
    'Explore CO_DEV services including custom websites, SEO optimized websites, e-commerce development, and business websites built for performance.',
  path: '/services',
  keywords: ['services', 'custom websites', 'e-commerce development', 'business websites']
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          'Web Development Services',
          'CO_DEV delivers custom websites, SEO optimized websites, e-commerce development, and business websites.',
          '/services'
        )}
      />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Services"
          title="Web development services built for search visibility and paid growth"
          description="CO_DEV designs and develops custom websites that balance performance, SEO, accessibility, and conversion readiness for future advertising campaigns."
          primaryCta={{ href: '/contact', label: 'Start your project' }}
          secondaryCta={{ href: '/projects', label: 'See recent work' }}
        />
        <section className="section-container pt-0" aria-labelledby="services-list-title">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What we build</p>
              <h2 id="services-list-title" className="section-heading mt-4">SEO-ready services for modern brands</h2>
            </div>
            <p className="section-copy">Every service is structured to support Google indexation, content growth, technical performance, and future Google Ads landing page expansion.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="premium-surface p-6 md:p-8">
                <h3 className="font-heading text-2xl text-white">{service.title}</h3>
                <p className="body-copy mt-4 text-base text-slate-300/82">{service.description}</p>
                <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-sky-200 transition hover:text-white">
                  Talk to CO_DEV about this service →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
