'use client';

import { motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { TechIcon } from '@/components/ui/TechIcon';
import { useAdaptiveMotion } from '@/hooks/useAdaptiveMotion';
import { projects } from '@/lib/projects';
import { siteConfig } from '@/lib/site';
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
    description: 'Clean and modern portfolios to showcase your work and personal brand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4 9.5A2.5 2.5 0 016.5 7H9l1.4-2h3.2L15 7h2.5A2.5 2.5 0 0120 9.5v7A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    title: 'Custom Solutions',
    description: 'Fully tailored development for unique ideas and complex requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 4l2.5 5.1 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const sectionIds = ['hero', 'services', 'projects', 'tech', 'contact'] as const;
type SectionId = (typeof sectionIds)[number];

const sectionNav: Array<{ id: SectionId; label: string }> = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Tech' },
  { id: 'contact', label: 'Contact' }
];

function SectionReveal({
  id,
  className = '',
  children
}: {
  id: SectionId;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.24, margin: '0px 0px -12% 0px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-container section-anchor relative ${className}`.trim()}
      initial={false}
      animate={{ opacity: isInView ? 1 : 0.42, y: isInView ? 0 : 36 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [headerHeight, setHeaderHeight] = useState(92);
  const { isMobile, allowHover, shouldReduceMotion } = useAdaptiveMotion();
  const headerRef = useRef<HTMLElement | null>(null);
  const t = useMemo(() => translations[locale], [locale]);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const offset = headerRef.current?.offsetHeight ?? headerHeight;
    const top = window.scrollY + section.getBoundingClientRect().top - offset - 12;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: shouldReduceMotion || isMobile ? 'auto' : 'smooth'
    });

    window.history.replaceState(null, '', `#${sectionId}`);
  }, [headerHeight, isMobile, shouldReduceMotion]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
        document.documentElement.style.setProperty('--header-offset', `${headerRef.current.offsetHeight + 20}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = typeof ResizeObserver !== 'undefined' && headerRef.current
      ? new ResizeObserver(updateHeaderHeight)
      : null;

    if (resizeObserver && headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      {
        rootMargin: `-${headerHeight + 24}px 0px -45% 0px`,
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [headerHeight]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (sectionIds.includes(hash as SectionId)) {
      window.requestAnimationFrame(() => scrollToSection(hash as SectionId));
    }
  }, [scrollToSection]);

  const cardHover = allowHover && !shouldReduceMotion ? { y: -8, scale: 1.015 } : undefined;

  return (
    <div className="relative overflow-hidden mobile-premium-shell">
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-[0.08] md:opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_58%)] md:h-[34rem] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_58%)]" />

      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/72 shadow-[0_12px_30px_rgba(2,8,23,0.24)] backdrop-blur-xl transition-all duration-300 md:bg-slate-950/50 md:backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 md:px-10 md:py-4 lg:px-12">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="font-heading text-base font-semibold tracking-[0.24em] text-white transition duration-300 ease-in-out hover:text-primary md:text-lg md:tracking-[0.32em]"
          >
            CO_DEV
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 md:flex">
            {sectionNav.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-300/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(14,165,233,0.18)]'
                      : 'text-slate-300/90 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          {sectionNav.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? 'border-sky-300/40 bg-sky-300/14 text-white'
                    : 'border-white/10 bg-white/[0.03] text-slate-300/82'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <main id="main-content">
        <section id="hero" className="section-anchor relative overflow-hidden bg-hero min-h-[100svh] md:min-h-[96vh]" aria-labelledby="home-hero-title">
          <div className="hero-orb left-[-7rem] top-[8%] h-52 w-52 bg-primary/18 md:left-[-6rem] md:h-72 md:w-72 md:bg-primary/26" />
          {!isMobile ? <div className="hero-orb right-[-5rem] top-14 h-80 w-80 bg-secondary/20" /> : null}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.38)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-[-8%] h-[72%] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_58%)]" />

          <div className="section-container relative flex min-h-[100svh] items-center py-14 md:min-h-[96vh] md:py-28 lg:py-32">
            <div className="grid w-full items-center gap-10 md:gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <span className="eyebrow inline-flex rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] text-accent shadow-[0_0_16px_rgba(56,189,248,0.06)] md:px-4 md:py-2 md:text-xs">
                  {t.studio}
                </span>
                <h1 id="home-hero-title" className="hero-title mt-6 max-w-5xl font-heading text-[2.8rem] font-semibold leading-[0.9] tracking-[-0.06em] text-white md:mt-8 md:text-[5rem] xl:text-[6rem]">
                  <span className="block text-white">{t.heroTitleLead}</span>
                  <span className="gradient-text gradient-flow block pb-2 md:pb-3">{t.heroTitleAccent}</span>
                </h1>
                <p className="body-copy mt-6 max-w-2xl text-base leading-7 text-slate-200/84 md:mt-9 md:text-xl md:leading-9">{t.tagline}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-11 md:gap-4">
                  <button type="button" onClick={() => scrollToSection('projects')} className="premium-button-primary w-full sm:w-auto">
                    {t.viewProjects}
                  </button>
                  <button type="button" onClick={() => scrollToSection('contact')} className="premium-button-secondary w-full sm:w-auto">
                    {t.contact}
                  </button>
                </div>

                <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2 md:mt-14 md:gap-4">
                  {[t.heroMetricOne, t.heroMetricTwo].map((item) => (
                    <div
                      key={item}
                      className="glass-card rounded-[22px] px-5 py-4 font-body text-sm leading-6 text-slate-200/95 md:rounded-[26px] md:px-6 md:py-5 md:leading-7"
                    >
                      <span className="mb-3 block h-2 w-14 rounded-full bg-gradient-to-r from-primary via-sky-300 to-accent md:w-16" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.12, duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-xl"
              >
                <div className="absolute inset-[-6%] rounded-[40px] bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_60%)] blur-2xl md:inset-[-10%] md:bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_60%)] md:blur-3xl" />
                <div className="glass-card relative overflow-hidden rounded-[28px] border-white/15 p-5 shadow-[0_18px_56px_rgba(2,8,23,0.34)] md:rounded-[34px] md:p-8 md:shadow-[0_30px_110px_rgba(2,8,23,0.46),0_0_45px_rgba(56,189,248,0.08)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] md:bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 md:pb-5">
                      <div>
                        <p className="eyebrow text-[11px] text-accent md:text-xs">{t.heroCardLabel}</p>
                        <h2 className="mt-2 font-heading text-[1.55rem] font-semibold tracking-[-0.045em] text-white md:text-[1.9rem]">{t.heroCardTitle}</h2>
                      </div>
                      <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70 md:h-3 md:w-3" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70 md:h-3 md:w-3" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70 md:h-3 md:w-3" />
                      </div>
                    </div>

                    <p className="body-copy mt-5 max-w-md text-sm leading-6 text-slate-200/76 md:mt-7 md:leading-7">{t.heroCardText}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-9 md:gap-4">
                      <div className="rounded-[24px] border border-white/10 bg-slate-950/42 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:rounded-[28px] md:p-6">
                        <p className="font-body text-[11px] uppercase tracking-[0.24em] text-slate-400 md:text-xs">Delivery</p>
                        <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">03</p>
                        <p className="mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">Discovery, design system, launch-ready frontend.</p>
                      </div>
                      <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-5 shadow-[0_12px_32px_rgba(56,189,248,0.08)] md:rounded-[28px] md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-accent md:text-xs">Quality signal</p>
                        <div className="mt-4 space-y-3">
                          {['UI direction', 'Motion polish', 'Performance'].map((item) => (
                            <div key={item} className="flex items-center justify-between font-body text-sm text-slate-100">
                              <span>{item}</span>
                              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
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

        <SectionReveal id="services" className="pt-8 md:pt-18">
          <div className="premium-surface px-5 py-10 md:px-10 md:py-16">
            {!isMobile ? <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" /> : null}
            {!isMobile ? <div className="absolute -right-10 bottom-4 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" /> : null}
            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <p className="eyebrow text-sky-200">Professional Standards</p>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.045em] text-white md:mt-5 md:text-5xl">
                  Built for Performance, Visibility &amp; Scale
                </h2>
                <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-slate-300/82 md:mt-6 md:text-lg md:leading-9">
                  We build high-performance websites and digital platforms engineered for visibility, speed and long-term scalability.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:mt-14 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
                {performanceCards.map((card) => (
                  <motion.article
                    key={card.title}
                    whileHover={cardHover}
                    className="group glass-card relative flex h-full flex-col rounded-[26px] border border-sky-200/10 bg-white/[0.06] p-5 transition-transform duration-300 ease-in-out md:rounded-[30px] md:p-7 hover:border-sky-200/30 hover:shadow-[0_24px_60px_rgba(14,165,233,0.16),0_0_28px_rgba(56,189,248,0.18)]"
                  >
                    <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_52%)] opacity-0 transition duration-300 ease-in-out md:rounded-[30px] group-hover:opacity-100" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-200/20 bg-sky-400/12 text-sky-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-300 ease-in-out md:h-16 md:w-16 md:rounded-[22px]">
                      {card.icon}
                    </div>
                    <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-[-0.035em] text-white md:mt-7">{card.title}</h3>
                    <p className="relative mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">{card.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <section id="services-overview" className="section-container pt-8 md:pt-18">
          <div className="premium-surface px-5 py-10 md:px-10 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow text-sky-200">Services</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.045em] text-white md:mt-5 md:text-5xl">
                Professional Web Development Services
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300/82 md:mt-6 md:text-lg md:leading-9">
                We develop custom websites, SEO optimized websites, e-commerce platforms, and business websites tailored to your growth goals.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
              <button type="button" onClick={() => scrollToSection('projects')} className="premium-button-secondary">Explore projects</button>
              <button type="button" onClick={() => scrollToSection('contact')} className="premium-button-primary">Discuss your website</button>
            </div>

            <div className="mt-10 grid gap-4 md:mt-14 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {webDevelopmentCards.map((card) => (
                <motion.article
                  key={card.title}
                  whileHover={cardHover}
                  className="group glass-card relative flex h-full flex-col rounded-[26px] border border-sky-200/10 bg-white/[0.06] p-5 transition-transform duration-300 ease-in-out md:rounded-[30px] md:p-7 hover:border-sky-200/35 hover:shadow-[0_24px_60px_rgba(14,165,233,0.16),0_0_28px_rgba(56,189,248,0.2)]"
                >
                  <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_52%)] opacity-0 transition duration-300 ease-in-out md:rounded-[30px] group-hover:opacity-100" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-200/20 bg-sky-400/10 text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-300 ease-in-out md:h-16 md:w-16 md:rounded-[22px]">
                    {card.icon}
                  </div>
                  <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-[-0.035em] text-white md:mt-7">{card.title}</h3>
                  <p className="relative mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">{card.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionReveal id="projects" className="space-y-6 md:space-y-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-5">
            <div className="space-y-3 md:space-y-4">
              <p className="eyebrow">Our Work</p>
              <h2 className="section-heading">{t.projectsTitle}</h2>
            </div>
            <div className="space-y-4">
              <p className="section-copy">{t.projectsSubtitle}</p>
              <button type="button" onClick={() => scrollToSection('services')} className="inline-flex text-sm font-semibold text-sky-200 transition hover:text-white">See related services →</button>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:mt-12 md:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} visitLabel={t.visitWebsite} />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="tech">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-5">
            <div className="space-y-3 md:space-y-4">
              <p className="eyebrow">Capabilities</p>
              <h2 className="section-heading">{t.stackTitle}</h2>
            </div>
            <p className="section-copy">{t.stackSubtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {techItems.map((item) => (
              <div key={item.label}>
                <TechIcon label={item.label} icon={<span>{item.icon}</span>} />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] md:mt-14">
            <article className="premium-surface p-6 md:p-10">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">About CO_DEV</p>
              <h3 className="section-heading max-w-3xl text-left text-balance">{t.aboutTitle}</h3>
              <p className="body-copy mt-5 max-w-3xl text-base leading-7 text-slate-200/78 md:mt-6 md:text-lg md:leading-9">{t.aboutText}</p>
            </article>
            <div className="grid gap-3 md:gap-4">
              {[t.aboutHighlightOne, t.aboutHighlightTwo, t.aboutHighlightThree].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 ease-in-out md:rounded-[28px] md:p-6 hover:border-primary/25 hover:bg-slate-950/45"
                >
                  <p className="font-body text-[11px] uppercase tracking-[0.24em] text-slate-400 md:text-xs">0{index + 1}</p>
                  <p className="mt-3 font-heading text-lg font-medium tracking-[-0.03em] text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28">
          <div className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(10,20,36,0.94)_45%,rgba(8,47,73,0.92)_100%)] p-6 shadow-[0_18px_56px_rgba(2,8,23,0.36)] md:rounded-[36px] md:p-12 md:shadow-[0_30px_100px_rgba(2,8,23,0.46)] lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_40%)] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_42%)]" />
            <div className="relative flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Let’s work together</p>
                <h2 className="mt-4 font-heading text-[2.2rem] font-semibold tracking-[-0.055em] text-white md:mt-5 md:text-5xl lg:text-[3.5rem]">
                  {t.contactTitle}
                </h2>
                <p className="body-copy mt-5 text-base leading-7 text-slate-200/80 md:mt-6 md:text-lg md:leading-9">{t.contactText}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300/78 md:text-base">
                  Need a business website, custom website, or SEO optimized website? Use the single-page navigation above to jump between our services, projects, and technology stack without leaving the page.
                </p>
                <div className="mt-8 space-y-3 font-body text-slate-200/92 md:mt-9">
                  <p>
                    Email:{' '}
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sky-100 transition duration-300 ease-in-out hover:text-accent">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                  <p>
                    LinkedIn:{' '}
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-100 transition duration-300 ease-in-out hover:text-accent"
                    >
                      linkedin.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row md:gap-4">
                <a href={`mailto:${siteConfig.contact.email}`} className="premium-button-primary w-full sm:w-auto" aria-label="Email CO_DEV to start a project">
                  {t.hireMe}
                </a>
                <button type="button" onClick={() => scrollToSection('projects')} className="premium-button-secondary w-full border-white/20 bg-white/[0.04] sm:w-auto">
                  {t.viewProjects}
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}
