'use client';

import { motion, useInView } from 'framer-motion';
import { AppWindow, Globe, ImageIcon, MousePointerClick, Puzzle, Search, ShieldCheck, ShoppingCart, SquareChartGantt, Zap } from 'lucide-react';
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
    icon: <Search className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Performance',
    description: 'Fast-loading websites with optimized assets and high Lighthouse scores for better user experience.',
    icon: <Zap className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Indexation',
    description:
      'Proper indexing setup to ensure your website is visible and correctly listed in search engines.',
    icon: <SquareChartGantt className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Security & Quality',
    description: 'Secure, scalable, and maintainable code built with modern development standards.',
    icon: <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  }
];

const webDevelopmentCards: Array<{ title: string; description: string; icon: ReactNode }> = [
  {
    title: 'Business & Vitrine Websites',
    description:
      'Modern and professional websites designed to represent your brand and attract clients.',
    icon: <Globe className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'E-commerce Platforms',
    description:
      'Custom online stores with optimized performance, user experience, and scalability.',
    icon: <ShoppingCart className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Landing Pages',
    description:
      'High-converting landing pages designed for marketing campaigns and lead generation.',
    icon: <MousePointerClick className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Web Applications',
    description:
      'Custom-built web apps, dashboards, and tools tailored to your specific business needs.',
    icon: <AppWindow className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Portfolio Websites',
    description: 'Clean and modern portfolios to showcase your work and personal brand.',
    icon: <ImageIcon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
  },
  {
    title: 'Custom Solutions',
    description: 'Fully tailored development for unique ideas and complex requirements.',
    icon: <Puzzle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} aria-hidden="true" />
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
  children,
  shouldReduceMotion
}: {
  id: SectionId;
  className?: string;
  children: ReactNode;
  shouldReduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18, margin: '0px 0px -10% 0px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-container section-anchor relative ${className}`.trim()}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
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
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-[0.05] md:opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.06),transparent_54%)] md:h-[32rem] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_56%)]" />

      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/82 shadow-[0_12px_24px_rgba(2,8,23,0.18)] backdrop-blur-md transition-all duration-200 md:bg-slate-950/56 md:backdrop-blur-xl"
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
          <div className="hero-orb left-[-6rem] top-[10%] h-40 w-40 bg-primary/10 md:left-[-6rem] md:h-56 md:w-56 md:bg-primary/18" />
          {!isMobile ? <div className="hero-orb right-[-5rem] top-14 h-72 w-72 bg-secondary/14" /> : null}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.04),transparent_16%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.32)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-[-8%] h-[68%] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_54%)]" />

          <div className="section-container relative flex min-h-[100svh] items-center py-10 md:min-h-[96vh] md:py-28 lg:py-32">
            <div className="grid w-full items-center gap-8 md:gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <span className="eyebrow inline-flex rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] text-accent shadow-[0_0_10px_rgba(56,189,248,0.05)] md:px-4 md:py-2 md:text-xs">
                  {t.studio}
                </span>
                <h1 id="home-hero-title" className="hero-title mt-5 max-w-5xl text-balance font-heading text-[2.15rem] font-semibold leading-[0.94] tracking-[-0.055em] text-white md:mt-8 md:text-[4.8rem] xl:text-[5.8rem]">
                  <span className="block text-white">{t.heroTitleLead}</span>
                  <span className="gradient-text gradient-flow block pb-2 md:pb-3">{t.heroTitleAccent}</span>
                </h1>
                <p className="body-copy mt-5 max-w-xl text-[0.98rem] leading-7 text-slate-200/80 md:mt-9 md:max-w-2xl md:text-xl md:leading-9">{t.tagline}</p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-11 md:gap-4">
                  <button type="button" onClick={() => scrollToSection('projects')} className="premium-button-primary w-full sm:w-auto">
                    {t.viewProjects}
                  </button>
                  <button type="button" onClick={() => scrollToSection('contact')} className="premium-button-secondary w-full sm:w-auto">
                    {t.contact}
                  </button>
                </div>

                <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2 md:mt-14 md:gap-4">
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
                <div className="absolute inset-[-4%] rounded-[36px] bg-[radial-gradient(circle,rgba(56,189,248,0.05),transparent_56%)] blur-lg md:inset-[-8%] md:bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_58%)] md:blur-xl" />
                <div className="glass-card relative overflow-hidden rounded-[24px] border-white/12 p-4 shadow-[0_12px_28px_rgba(2,8,23,0.24)] md:rounded-[34px] md:p-8 md:shadow-[0_18px_56px_rgba(2,8,23,0.32)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] md:bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
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

        <SectionReveal id="services" className="pt-8 md:pt-18" shouldReduceMotion={shouldReduceMotion}>
          <div className="premium-surface px-5 py-10 md:px-10 md:py-16">
            {!isMobile ? <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-sky-400/10 blur-lg" /> : null}
            {!isMobile ? <div className="absolute -right-10 bottom-4 h-52 w-52 rounded-full bg-cyan-300/10 blur-lg" /> : null}
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
                    className="group glass-card relative flex h-full flex-col rounded-[24px] border border-sky-200/10 bg-white/[0.05] p-5 transition-transform duration-200 ease-out md:rounded-[30px] md:p-7 hover:border-sky-200/22 hover:shadow-[0_18px_42px_rgba(14,165,233,0.12),0_0_18px_rgba(56,189,248,0.12)]"
                  >
                    <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_52%)] opacity-0 transition duration-200 ease-out md:rounded-[30px] group-hover:opacity-100" />
                    <div className="service-icon-shell relative flex h-14 w-14 items-center justify-center rounded-xl md:h-16 md:w-16">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:mt-10">
              <button type="button" onClick={() => scrollToSection('projects')} className="premium-button-secondary">Explore projects</button>
              <button type="button" onClick={() => scrollToSection('contact')} className="premium-button-primary">Discuss your website</button>
            </div>

            <div className="mt-10 grid gap-4 md:mt-14 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {webDevelopmentCards.map((card) => (
                <motion.article
                  key={card.title}
                  whileHover={cardHover}
                  className="group glass-card relative flex h-full flex-col rounded-[24px] border border-sky-200/10 bg-white/[0.05] p-5 transition-transform duration-200 ease-out md:rounded-[30px] md:p-7 hover:border-sky-200/24 hover:shadow-[0_18px_42px_rgba(14,165,233,0.12),0_0_18px_rgba(56,189,248,0.12)]"
                >
                  <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_52%)] opacity-0 transition duration-200 ease-out md:rounded-[30px] group-hover:opacity-100" />
                  <div className="service-icon-shell relative flex h-14 w-14 items-center justify-center rounded-xl md:h-16 md:w-16">
                    {card.icon}
                  </div>
                  <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-[-0.035em] text-white md:mt-7">{card.title}</h3>
                  <p className="relative mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">{card.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionReveal id="projects" className="space-y-6 md:space-y-7" shouldReduceMotion={shouldReduceMotion}>
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

        <SectionReveal id="tech" shouldReduceMotion={shouldReduceMotion}>
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

        <SectionReveal id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28" shouldReduceMotion={shouldReduceMotion}>
          <div className="relative overflow-hidden rounded-[26px] border border-primary/18 bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(10,20,36,0.94)_52%,rgba(8,47,73,0.88)_100%)] p-5 shadow-[0_14px_38px_rgba(2,8,23,0.28)] md:rounded-[36px] md:p-12 md:shadow-[0_28px_84px_rgba(2,8,23,0.42)] lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.06),transparent_38%)] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_42%)]" />
            <div className="relative flex flex-col gap-7 md:gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Let’s work together</p>
                <h2 className="mt-4 max-w-2xl text-balance font-heading text-[2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white md:mt-5 md:text-5xl lg:text-[3.5rem]">
                  {t.contactTitle}
                </h2>
                <p className="body-copy mt-5 text-base leading-7 text-slate-200/80 md:mt-6 md:text-lg md:leading-9">{t.contactText}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300/78 md:text-base">
                  Need a business website, custom website, or SEO optimized website? Use the single-page navigation above to jump between our services, projects, and technology stack without leaving the page.
                </p>
                <div className="mt-7 space-y-3 font-body text-sm leading-7 text-slate-200/92 md:mt-9 md:text-base">
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
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row md:gap-4">
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
