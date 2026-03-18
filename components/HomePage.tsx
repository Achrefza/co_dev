'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, type ReactNode } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { TechIcon } from '@/components/ui/TechIcon';
import { projects } from '@/lib/projects';
import { translations, type Locale } from '@/lib/translations';

const techItems = [
  { label: 'Next.js', icon: '▲' },
  { label: 'React', icon: '⚛' },
  { label: 'Node.js', icon: '⬢' },
  { label: 'TypeScript', icon: 'TS' },
  { label: 'Framer Motion', icon: '✦' },
  { label: 'Docker', icon: '🐳' }
];

const performanceCards: Array<{ title: string; description: string; icon: ReactNode }> = [
  {
    title: 'SEO Optimization',
    description:
      'Optimized for search engines with clean structure, meta tags, and best practices to improve visibility on Google.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M11 4a7 7 0 105.27 11.61l3.06 3.06 1.41-1.41-3.06-3.06A7 7 0 0011 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 11.5l1.7 1.7 3.3-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Performance',
    description: 'Fast-loading websites with optimized assets and high Lighthouse scores for better user experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 3l-4 10h4l-1 8 5-11h-4l0-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Indexation',
    description:
      'Proper indexing setup to ensure your website is visible and correctly listed in search engines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M7 7h10M7 12h6M7 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.5 14.5l3 3m0-3l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    title: 'Security & Quality',
    description: 'Secure, scalable, and maintainable code built with modern development standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.6-2.8 8.9-7 10-4.2-1.1-7-5.4-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 12l1.7 1.7 3.8-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const webDevelopmentCards: Array<{ title: string; description: string; icon: ReactNode }> = [
  {
    title: 'Business & Vitrine Websites',
    description:
      'Modern and professional websites designed to represent your brand and attract clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4 7.5h16M9 17h6M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'E-commerce Platforms',
    description:
      'Custom online stores with optimized performance, user experience, and scalability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4 6h2l2.2 9.2A2 2 0 0010.15 17H18a2 2 0 001.95-1.55L21 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Landing Pages',
    description:
      'High-converting landing pages designed for marketing campaigns and lead generation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Web Applications',
    description:
      'Custom-built web apps, dashboards, and tools tailored to your specific business needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 4v16M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Portfolio Websites',
    description:
      'Clean and modern portfolios to showcase your work and personal brand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4 9.5A2.5 2.5 0 016.5 7H9l1.4-2h3.2L15 7h2.5A2.5 2.5 0 0120 9.5v7A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    title: 'Custom Solutions',
    description:
      'Fully tailored development for unique ideas and complex requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 4l2.5 5.1 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: 'easeOut' }
} as const;

export function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const t = useMemo(() => translations[locale], [locale]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-20" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          <a href="#hero" className="text-lg font-semibold tracking-[0.35em] text-white transition hover:text-primary">
            CO_DEV
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#projects" className="transition hover:text-primary">
              {t.navProjects}
            </a>
            <a href="#about" className="transition hover:text-primary">
              {t.navAbout}
            </a>
            <a href="#contact" className="transition hover:text-primary">
              {t.navContact}
            </a>
          </nav>
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden bg-hero">
          <div className="hero-orb left-[-6rem] top-[10%] h-60 w-60 bg-primary/30" />
          <div className="hero-orb right-[-4rem] top-20 h-72 w-72 bg-secondary/25" />
          <div className="hero-orb bottom-0 left-1/3 h-64 w-64 bg-accent/20" />

          <div className="section-container relative flex min-h-[92vh] items-center py-20 md:py-28">
            <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div className="relative z-10">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-accent"
                >
                  {t.studio}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.6 }}
                  className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl xl:text-[5.4rem]"
                >
                  <span className="block text-white/95 drop-shadow-[0_0_24px_rgba(125,211,252,0.16)]">{t.heroTitleLead}</span>
                  <span className="gradient-text gradient-flow block pb-2 drop-shadow-[0_0_30px_rgba(56,189,248,0.24)]">
                    {t.heroTitleAccent}
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.6 }}
                  className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
                >
                  {t.tagline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.6 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <a href="#projects" className="premium-button-primary">
                    {t.viewProjects}
                  </a>
                  <a href="#contact" className="premium-button-secondary">
                    {t.contact}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.6 }}
                  className="mt-12 grid max-w-xl gap-4 sm:grid-cols-2"
                >
                  {[t.heroMetricOne, t.heroMetricTwo].map((item) => (
                    <div key={item} className="glass-card rounded-2xl px-5 py-4 text-sm text-slate-200">
                      <span className="mb-2 block h-2 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.7 }}
                className="float relative mx-auto w-full max-w-xl"
              >
                <div className="glass-card relative overflow-hidden rounded-[32px] border-white/15 p-6 shadow-soft md:p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-accent">{t.heroCardLabel}</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{t.heroCardTitle}</h2>
                      </div>
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-rose-400/70" />
                        <span className="h-3 w-3 rounded-full bg-amber-300/70" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                      </div>
                    </div>

                    <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">{t.heroCardText}</p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Delivery</p>
                        <p className="mt-3 text-4xl font-semibold text-white">03</p>
                        <p className="mt-3 text-sm text-slate-300">Discovery, design system, launch-ready frontend.</p>
                      </div>
                      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-accent">Quality signal</p>
                        <div className="mt-4 space-y-3">
                          {['UI direction', 'Motion polish', 'Performance'].map((item) => (
                            <div key={item} className="flex items-center justify-between text-sm text-slate-100">
                              <span>{item}</span>
                              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_rgba(125,211,252,0.7)]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section className="section-container pt-10 md:pt-16" {...fadeUp}>
          <div className="relative overflow-hidden rounded-[34px] border border-sky-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-6 py-10 shadow-[0_24px_80px_rgba(2,8,23,0.4)] md:px-10 md:py-14">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-sky-200">Performance &amp; SEO Excellence</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Built for Performance, Visibility &amp; Growth
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  We don’t just build websites — we engineer high-performance platforms optimized for search engines,
                  speed, and scalability.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
                {performanceCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group glass-card relative flex h-full flex-col rounded-[28px] border border-sky-200/10 bg-white/[0.05] p-6 transition duration-300 hover:border-sky-200/30 hover:shadow-[0_24px_60px_rgba(14,165,233,0.18),0_0_24px_rgba(56,189,248,0.18)]"
                  >
                    <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_52%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200/20 bg-sky-400/10 text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(56,189,248,0.15)]">
                      {card.icon}
                    </div>
                    <h3 className="relative mt-6 text-xl font-semibold text-white">{card.title}</h3>
                    <p className="relative mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="section-container pt-10 md:pt-16" {...fadeUp}>
          <div className="relative overflow-hidden rounded-[34px] border border-sky-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-6 py-10 shadow-[0_24px_80px_rgba(2,8,23,0.4)] md:px-10 md:py-14">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
            <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl" />
            <div className="absolute -right-10 bottom-6 h-52 w-52 rounded-full bg-cyan-300/12 blur-3xl" />
            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-sky-200">Premium Development Services</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Custom Web Development Services
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                  We build high-quality, fully custom websites tailored to your business needs — using modern technologies and clean, scalable code.
                </p>
              </div>

              <div className="mt-8 rounded-[28px] border border-sky-200/15 bg-sky-400/10 px-6 py-5 text-center shadow-[0_18px_60px_rgba(14,165,233,0.12)] md:mt-10">
                <p className="text-sm leading-7 text-sky-50 md:text-base">
                  We focus on fully custom, code-driven development using modern frameworks to ensure performance, scalability, and long-term reliability.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
                {webDevelopmentCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="group glass-card relative flex h-full flex-col rounded-[28px] border border-sky-200/10 bg-white/[0.05] p-6 transition duration-300 hover:border-sky-200/35 hover:shadow-[0_24px_60px_rgba(14,165,233,0.18),0_0_24px_rgba(56,189,248,0.24)]"
                  >
                    <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.2),transparent_52%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200/20 bg-sky-400/10 text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(56,189,248,0.15)] transition duration-300 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_28px_rgba(56,189,248,0.28)]">
                      {card.icon}
                    </div>
                    <h3 className="relative mt-6 text-xl font-semibold text-white">{card.title}</h3>
                    <p className="relative mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" className="section-container relative space-y-6" {...fadeUp}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Portfolio</p>
              <h2 className="section-heading">{t.projectsTitle}</h2>
            </div>
            <p className="section-copy">{t.projectsSubtitle}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} visitLabel={t.visitWebsite} />
            ))}
          </div>
        </motion.section>

        <motion.section className="section-container" id="stack" {...fadeUp}>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Capabilities</p>
              <h2 className="section-heading">{t.stackTitle}</h2>
            </div>
            <p className="section-copy">{t.stackSubtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techItems.map((item) => (
              <TechIcon key={item.label} label={item.label} icon={<span>{item.icon}</span>} />
            ))}
          </div>
        </motion.section>

        <motion.section id="about" className="section-container" {...fadeUp}>
          <div className="glass-card relative overflow-hidden rounded-[34px] p-8 md:p-12 lg:p-14">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">About CO_DEV</p>
                <h2 className="section-heading max-w-3xl text-balance text-left">{t.aboutTitle}</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{t.aboutText}</p>
              </div>
              <div className="grid gap-4">
                {[t.aboutHighlightOne, t.aboutHighlightTwo, t.aboutHighlightThree].map((item, index) => (
                  <div key={item} className="rounded-[28px] border border-white/10 bg-slate-950/35 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">0{index + 1}</p>
                    <p className="mt-3 text-lg font-medium text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section-container pt-8 pb-24" {...fadeUp}>
          <div className="relative overflow-hidden rounded-[34px] border border-primary/20 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-8 shadow-soft md:p-12 lg:p-14">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute left-0 top-1/3 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">{t.contactTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">{t.contactText}</p>
                <div className="mt-8 space-y-3 text-slate-200">
                  <p>
                    Email:{' '}
                    <a href="mailto:hello@co-dev.studio" className="text-primary transition hover:text-accent">
                      contact.codev@proton.me
                    </a>
                  </p>
                  <p>
                    LinkedIn:{' '}
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary transition hover:text-accent"
                    >
                      
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <a href="mailto:hello@co-dev.studio" className="premium-button-primary">
                  {t.hireMe}
                </a>
                <a href="#projects" className="premium-button-secondary">
                  {t.viewProjects}
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
