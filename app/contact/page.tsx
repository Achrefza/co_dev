import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/marketing/PageHero';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { createPageMetadata, createServiceSchema, siteConfig } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact – Start a Custom Website or SEO Optimized Web Project',
  description:
    'Contact CO_DEV to discuss custom websites, SEO optimized websites, e-commerce development, and business websites tailored to your goals.',
  path: '/contact',
  keywords: ['contact web developer', 'start website project', 'SEO website agency']
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          'Project Consultation',
          'Contact CO_DEV for project discovery, website planning, SEO strategy, and conversion-focused development.',
          '/contact'
        )}
      />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Contact"
          title="Launch a custom website with a strong SEO and ads-ready foundation"
          description="Start with CO_DEV for a technically clean website experience ready for Google indexing, analytics, and future paid acquisition campaigns."
          primaryCta={{ href: `mailto:${siteConfig.contact.email}`, label: 'Email CO_DEV' }}
          secondaryCta={{ href: '/services', label: 'Review services' }}
        />
        <section className="section-container pt-0" aria-labelledby="contact-details-title">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <article className="premium-surface p-6 md:p-8">
              <p className="eyebrow">Get in touch</p>
              <h2 id="contact-details-title" className="section-heading mt-4">Let’s plan a website that ranks and converts</h2>
              <p className="body-copy mt-5 text-base text-slate-300/82">Whether you need a business website, custom website, or e-commerce development project, CO_DEV can help you build a scalable foundation for organic search and advertising.</p>
              <div className="mt-8 space-y-4 text-slate-200">
                <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-sky-200 hover:text-white">{siteConfig.contact.email}</a></p>
                <p>LinkedIn: <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="text-sky-200 hover:text-white">{siteConfig.social.linkedin}</a></p>
              </div>
            </article>
            <aside className="premium-surface p-6 md:p-8">
              <p className="eyebrow">Next steps</p>
              <h2 className="section-heading mt-4">What happens after contact?</h2>
              <ol className="mt-6 space-y-4 text-slate-300/84">
                <li>1. Discovery around your business goals, SEO needs, and campaign priorities.</li>
                <li>2. Recommendation for the best-fit website structure, content plan, and technical stack.</li>
                <li>3. Delivery roadmap for design, development, analytics setup, and launch.</li>
              </ol>
              <Link href="/projects" className="mt-6 inline-flex text-sm font-semibold text-sky-200 transition hover:text-white">
                Browse projects before reaching out →
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
