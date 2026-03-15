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
  { label: 'Python', icon: '🐍' },
  { label: 'Linux', icon: '🐧' },
  { label: 'Docker', icon: '🐳' }
];

export function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const t = useMemo(() => translations[locale], [locale]);

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-dark/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#hero" className="text-lg font-bold tracking-widest text-primary">
            CO_DEV
          </a>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
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
          <div className="section-container flex min-h-[86vh] flex-col items-start justify-center gap-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-wider text-accent"
            >
              {t.studio}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl text-5xl font-black leading-tight md:text-7xl"
            >
              CO_DEV
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-lg text-slate-300 md:text-xl"
            >
              {t.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-dark transition hover:bg-accent"
              >
                {t.viewProjects}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:border-primary hover:text-primary"
              >
                {t.contact}
              </a>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="section-container space-y-4">
          <h2 className="text-3xl font-bold">{t.projectsTitle}</h2>
          <p className="max-w-2xl text-slate-300">{t.projectsSubtitle}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} visitLabel={t.visitWebsite} />
            ))}
          </div>
        </section>

        <section className="section-container" id="stack">
          <h2 className="mb-8 text-3xl font-bold">{t.stackTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techItems.map((item) => (
              <TechIcon key={item.label} label={item.label} icon={<span className="text-xl">{item.icon}</span>} />
            ))}
          </div>
        </section>

        <section id="about" className="section-container">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="mb-4 text-3xl font-bold">{t.aboutTitle}</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-200">{t.aboutText}</p>
          </div>
        </section>

        <section id="contact" className="section-container pb-24">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="mb-6 text-3xl font-bold">{t.contactTitle}</h2>
            <div className="space-y-3 text-slate-200">
              <p>
                Email:{' '}
                <a href="mailto:hello@co-dev.studio" className="text-primary hover:text-accent">
                  hello@co-dev.studio
                </a>
              </p>
              <p>
                LinkedIn:{' '}
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-accent"
                >
                  linkedin.com/in/achref-ouerchfeni
                </a>
              </p>
            </div>
            <a
              href="mailto:hello@co-dev.studio"
              className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-dark transition hover:bg-accent"
            >
              {t.hireMe}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
