import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/PageHero';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { projects } from '@/lib/projects';
import { createPageMetadata, createServiceSchema } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects – Custom Websites, Business Websites & SEO Focused Builds',
  description:
    'Review CO_DEV projects featuring custom websites, business websites, and SEO-focused web experiences built for performance and scalability.',
  path: '/projects',
  keywords: ['projects', 'portfolio website', 'business websites', 'custom web development']
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          'Portfolio Projects',
          'A selection of CO_DEV project work covering custom websites, digital products, and scalable experiences.',
          '/projects'
        )}
      />
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Projects"
          title="Recent web development projects with strong UX and SEO foundations"
          description="Explore selected CO_DEV builds designed for performance, semantic structure, responsive delivery, and conversion-focused user journeys."
          primaryCta={{ href: '/services', label: 'Explore services' }}
          secondaryCta={{ href: '/contact', label: 'Request a proposal' }}
        />
        <section className="section-container pt-0" aria-labelledby="projects-grid-title">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="projects-grid-title" className="section-heading mt-4">Web projects built for growth</h2>
            </div>
            <p className="section-copy">Each project demonstrates how clean front-end architecture, image optimization, and SEO-friendly content structure can support long-term visibility.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} visitLabel="Visit Website" />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
