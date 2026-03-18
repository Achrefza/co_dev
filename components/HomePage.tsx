'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
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
                      hello@co-dev.studio
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
                      linkedin.com/in/achref-ouerchfeni
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
