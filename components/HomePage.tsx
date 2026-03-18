'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from 'framer-motion';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { TechIcon } from '@/components/ui/TechIcon';
import { useAdaptiveMotion } from '@/hooks/useAdaptiveMotion';
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

type CinematicSectionProps = {
  id?: string;
  className?: string;
  children: (styles: {
    backgroundY: MotionValue<string>;
    contentY: MotionValue<string>;
    contentOpacity: MotionValue<number>;
    contentScale: MotionValue<number>;
    accentY: MotionValue<string>;
    borderOpacity: MotionValue<number>;
  }) => ReactNode;
};

function useSmoothMotionValue(value: MotionValue<number>, isStatic: boolean) {
  return useSpring(value, isStatic ? { damping: 100, stiffness: 500, mass: 1 } : { damping: 26, stiffness: 120, mass: 0.28 });
}

function CinematicSection({ id, className = '', children }: CinematicSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { isMobile, shouldReduceMotion } = useAdaptiveMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const progress = useSmoothMotionValue(scrollYProgress, shouldReduceMotion);
  const distance = shouldReduceMotion ? 0 : isMobile ? 18 : 48;
  const ambientDistance = shouldReduceMotion ? 0 : isMobile ? 12 : 36;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-container section-reveal relative ${className}`.trim()}
      style={{
        opacity: useTransform(progress, [0, 0.15, 0.5, 0.88, 1], [0.42, 0.9, 1, 0.82, 0.45])
      }}
    >
      {children({
        backgroundY: useTransform(progress, [0, 1], [`${distance}px`, `${-distance}px`]),
        contentY: useTransform(progress, [0, 0.5, 1], [`${distance}px`, '0px', `${-distance * 0.55}px`]),
        contentOpacity: useTransform(progress, [0, 0.12, 0.5, 0.88, 1], [0.32, 0.8, 1, 0.84, 0.4]),
        contentScale: useTransform(progress, [0, 0.5, 1], [shouldReduceMotion ? 1 : 0.985, 1, shouldReduceMotion ? 1 : 0.992]),
        accentY: useTransform(progress, [0, 1], [`${ambientDistance}px`, `${-ambientDistance}px`]),
        borderOpacity: useTransform(progress, [0, 0.2, 0.5, 1], [0.18, 0.38, 0.58, 0.24])
      })}
    </motion.section>
  );
}

export function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const { isMobile, allowHover, shouldReduceMotion } = useAdaptiveMotion();
  const t = useMemo(() => translations[locale], [locale]);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const smoothHeroProgress = useSmoothMotionValue(heroProgress, shouldReduceMotion);
  const smoothPageProgress = useSmoothMotionValue(pageProgress, shouldReduceMotion);

  const cardHover = allowHover && !shouldReduceMotion ? { y: -10, scale: 1.02 } : undefined;
  const heroBackgroundY = useTransform(smoothHeroProgress, [0, 1], ['0%', isMobile ? '8%' : '18%']);
  const heroContentY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-24px' : '-80px']);
  const heroTextScale = useTransform(smoothHeroProgress, [0, 1], [1, isMobile ? 0.985 : 0.94]);
  const heroTextOpacity = useTransform(smoothHeroProgress, [0, 0.65, 1], [1, 0.88, 0.42]);
  const heroOrbLeftY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-18px' : '-70px']);
  const heroOrbRightY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '14px' : '56px']);
  const heroCardY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-12px' : '-44px']);
  const heroCardRotate = useTransform(smoothHeroProgress, [0, 1], [0, isMobile ? -1 : -3]);
  const heroCardScale = useTransform(smoothHeroProgress, [0, 1], [1, isMobile ? 0.985 : 0.96]);
  const heroLeadY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-10px' : '-28px']);
  const heroAccentY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '4px' : '18px']);
  const heroTaglineOpacity = useTransform(smoothHeroProgress, [0, 0.72, 1], [1, 0.78, 0.2]);
  const heroActionsY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-8px' : '-24px']);
  const heroMetricsY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-10px' : '-30px']);
  const heroMetricOneY = useTransform(smoothHeroProgress, [0, 1], ['0px', `${isMobile ? -6 : -18}px`]);
  const heroMetricTwoY = useTransform(smoothHeroProgress, [0, 1], ['0px', `${isMobile ? 6 : 18}px`]);
  const heroDeliveryY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '-6px' : '-18px']);
  const heroQualityY = useTransform(smoothHeroProgress, [0, 1], ['0px', isMobile ? '4px' : '14px']);
  const gridY = useTransform(smoothPageProgress, [0, 1], ['0px', '-120px']);
  const topGlowOpacity = useTransform(smoothPageProgress, [0, 0.4, 1], [0.8, 0.45, 0.18]);

  return (
    <div className="relative overflow-hidden mobile-premium-shell">
      <motion.div className="pointer-events-none absolute inset-0 grid-surface opacity-[0.08] md:opacity-[0.16]" style={{ y: gridY }} />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_58%)] md:h-[34rem] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_58%)]"
        style={{ opacity: topGlowOpacity }}
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/78 shadow-[0_10px_24px_rgba(2,8,23,0.24)] backdrop-blur-xl md:bg-slate-950/55 md:shadow-[0_14px_36px_rgba(2,8,23,0.24)] md:backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-10 md:py-4 lg:px-12">
          <a href="#hero" className="font-heading text-base font-semibold tracking-[0.24em] text-white transition duration-300 ease-in-out hover:text-primary md:text-lg md:tracking-[0.32em]">
            CO_DEV
          </a>
          <nav className="hidden items-center gap-8 font-body text-sm text-slate-300/90 md:flex">
            <a href="#projects" className="transition duration-300 ease-in-out hover:text-primary">
              {t.navProjects}
            </a>
            <a href="#about" className="transition duration-300 ease-in-out hover:text-primary">
              {t.navAbout}
            </a>
            <a href="#contact" className="transition duration-300 ease-in-out hover:text-primary">
              {t.navContact}
            </a>
          </nav>
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>
      </header>

      <main>
        <section id="hero" ref={heroRef} className="relative overflow-hidden bg-hero min-h-[100svh] md:min-h-[96vh]">
          <motion.div className="hero-orb left-[-7rem] top-[6%] h-52 w-52 bg-primary/18 md:left-[-6rem] md:h-72 md:w-72 md:bg-primary/30" style={{ y: heroOrbLeftY }} />
          {!isMobile ? <motion.div className="hero-orb ambient-glow right-[-5rem] top-14 h-80 w-80 bg-secondary/25" style={{ y: heroOrbRightY }} /> : null}
          {!isMobile ? <motion.div className="hero-orb bottom-10 left-[34%] h-72 w-72 bg-accent/18" style={{ y: heroOrbLeftY }} /> : null}
          {!isMobile ? <motion.div className="ambient-glow pointer-events-none absolute left-[12%] top-[20%] h-56 w-56 rounded-full bg-sky-300/10 blur-[120px]" style={{ y: heroOrbRightY }} /> : null}
          <motion.div className="pointer-events-none absolute inset-0" style={{ y: heroBackgroundY }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.04),transparent_18%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.38)_100%)] md:bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.3)_100%)]" />
            <div className="absolute inset-x-0 top-[-8%] h-[72%] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_58%)] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_52%)]" />
          </motion.div>

          <motion.div className="section-container relative flex min-h-[100svh] items-center py-14 md:min-h-[96vh] md:py-28 lg:py-32" style={{ y: heroContentY }}>
            <div className="grid w-full items-center gap-10 md:gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              <motion.div className="relative z-10" style={{ scale: heroTextScale, opacity: heroTextOpacity }}>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : isMobile ? 0.32 : 0.45 }}
                  className="eyebrow inline-flex rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] text-accent shadow-[0_0_16px_rgba(56,189,248,0.06)] md:px-4 md:py-2 md:text-xs md:shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                >
                  {t.studio}
                </motion.span>
                <h1 className="hero-title mt-6 max-w-5xl font-heading text-[2.8rem] font-semibold leading-[0.9] tracking-[-0.06em] text-white md:mt-8 md:text-[5rem] xl:text-[6rem]">
                  <motion.span className="block text-white md:drop-shadow-[0_0_24px_rgba(125,211,252,0.14)]" style={{ y: heroLeadY }}>
                    {t.heroTitleLead}
                  </motion.span>
                  <motion.span className="gradient-text gradient-flow block pb-2 md:pb-3 md:drop-shadow-[0_0_34px_rgba(56,189,248,0.22)]" style={{ y: heroAccentY }}>
                    {t.heroTitleAccent}
                  </motion.span>
                </h1>
                <motion.p className="body-copy mt-6 max-w-2xl text-base leading-7 text-slate-200/84 md:mt-9 md:text-xl md:leading-9" style={{ opacity: heroTaglineOpacity }}>
                  {t.tagline}
                </motion.p>

                <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-11 md:gap-4" style={{ y: heroActionsY }}>
                  <a href="#projects" className="premium-button-primary w-full sm:w-auto">
                    {t.viewProjects}
                  </a>
                  <a href="#contact" className="premium-button-secondary w-full sm:w-auto">
                    {t.contact}
                  </a>
                </motion.div>

                <motion.div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2 md:mt-14 md:gap-4" style={{ y: heroMetricsY }}>
                  {[t.heroMetricOne, t.heroMetricTwo].map((item, index) => (
                    <motion.div
                      key={item}
                      className="glass-card rounded-[22px] px-5 py-4 font-body text-sm leading-6 text-slate-200/95 md:rounded-[26px] md:px-6 md:py-5 md:leading-7"
                      style={{ y: index === 0 ? heroMetricOneY : heroMetricTwoY }}
                    >
                      <span className="mb-3 block h-2 w-14 rounded-full bg-gradient-to-r from-primary via-sky-300 to-accent md:w-16 md:shadow-[0_0_24px_rgba(56,189,248,0.22)]" />
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 18 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.16, duration: shouldReduceMotion ? 0.01 : isMobile ? 0.4 : 0.7 }}
                className="relative mx-auto w-full max-w-xl"
                style={{ y: heroCardY, rotate: heroCardRotate, scale: heroCardScale }}
              >
                <div className="absolute inset-[-6%] rounded-[40px] bg-[radial-gradient(circle,rgba(56,189,248,0.1),transparent_60%)] blur-2xl md:inset-[-10%] md:bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_60%)] md:blur-3xl" />
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
                      <motion.div className="rounded-[24px] border border-white/10 bg-slate-950/42 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:rounded-[28px] md:p-6" style={{ y: heroDeliveryY }}>
                        <p className="font-body text-[11px] uppercase tracking-[0.24em] text-slate-400 md:text-xs">Delivery</p>
                        <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">03</p>
                        <p className="mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">Discovery, design system, launch-ready frontend.</p>
                      </motion.div>
                      <motion.div className="rounded-[24px] border border-primary/20 bg-primary/10 p-5 shadow-[0_12px_32px_rgba(56,189,248,0.08)] md:rounded-[28px] md:p-6 md:shadow-[0_18px_40px_rgba(56,189,248,0.08)]" style={{ y: heroQualityY }}>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-accent md:text-xs">Quality signal</p>
                        <div className="mt-4 space-y-3">
                          {['UI direction', 'Motion polish', 'Performance'].map((item) => (
                            <div key={item} className="flex items-center justify-between font-body text-sm text-slate-100">
                              <span>{item}</span>
                              <span className="h-2.5 w-2.5 rounded-full bg-accent md:shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <CinematicSection className="pt-8 md:pt-18">
          {({ backgroundY, contentY, contentOpacity, contentScale, accentY, borderOpacity }) => (
            <motion.div className="premium-surface px-5 py-10 md:px-10 md:py-16" style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
              <motion.div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" style={{ opacity: borderOpacity }} />
              {!isMobile ? <motion.div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" style={{ y: accentY }} /> : null}
              {!isMobile ? <motion.div className="absolute -right-10 bottom-4 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" style={{ y: backgroundY }} /> : null}
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
                  {performanceCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      whileHover={cardHover}
                      className="group glass-card relative flex h-full flex-col rounded-[26px] border border-sky-200/10 bg-white/[0.06] p-5 transition-transform duration-300 ease-in-out md:rounded-[30px] md:p-7 hover:border-sky-200/30 hover:shadow-[0_24px_60px_rgba(14,165,233,0.16),0_0_28px_rgba(56,189,248,0.18)]"
                    >
                      <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_52%)] opacity-0 transition duration-300 ease-in-out md:rounded-[30px] group-hover:opacity-100" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-200/20 bg-sky-400/12 text-sky-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-300 ease-in-out md:h-16 md:w-16 md:rounded-[22px] md:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(56,189,248,0.15)] md:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_30px_rgba(56,189,248,0.25)]">
                        {card.icon}
                      </div>
                      <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-[-0.035em] text-white md:mt-7">{card.title}</h3>
                      <p className="relative mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">{card.description}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CinematicSection>

        <CinematicSection className="pt-8 md:pt-18">
          {({ backgroundY, contentY, contentOpacity, contentScale, accentY, borderOpacity }) => (
            <motion.div className="premium-surface px-5 py-10 md:px-10 md:py-16" style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
              <motion.div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" style={{ opacity: borderOpacity }} />
              {!isMobile ? <motion.div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl" style={{ y: accentY }} /> : null}
              {!isMobile ? <motion.div className="absolute -right-10 bottom-6 h-52 w-52 rounded-full bg-cyan-300/12 blur-3xl" style={{ y: backgroundY }} /> : null}
              <div className="relative">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="eyebrow text-sky-200">Services</p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.045em] text-white md:mt-5 md:text-5xl">
                    Professional Web Development Services
                  </h2>
                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300/82 md:mt-6 md:text-lg md:leading-9">
                    We develop a wide range of digital solutions tailored to your needs.
                  </p>
                </div>

                <motion.div className="mt-8 rounded-[26px] border border-sky-200/15 bg-sky-400/10 px-5 py-5 text-center shadow-[0_12px_36px_rgba(14,165,233,0.1)] md:mt-12 md:rounded-[30px] md:px-6 md:py-6 md:shadow-[0_18px_60px_rgba(14,165,233,0.12)]" style={{ y: backgroundY }}>
                  <p className="font-body text-sm leading-7 text-sky-50/95 md:text-base md:leading-8">
                    Our studio delivers custom websites and digital products with a focus on performance, scalability and long-term reliability.
                  </p>
                </motion.div>

                <div className="mt-10 grid gap-4 md:mt-14 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {webDevelopmentCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      whileHover={cardHover}
                      className="group glass-card relative flex h-full flex-col rounded-[26px] border border-sky-200/10 bg-white/[0.06] p-5 transition-transform duration-300 ease-in-out md:rounded-[30px] md:p-7 hover:border-sky-200/35 hover:shadow-[0_24px_60px_rgba(14,165,233,0.16),0_0_28px_rgba(56,189,248,0.2)]"
                    >
                      <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_52%)] opacity-0 transition duration-300 ease-in-out md:rounded-[30px] group-hover:opacity-100" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-200/20 bg-sky-400/10 text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-300 ease-in-out md:h-16 md:w-16 md:rounded-[22px] md:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(56,189,248,0.15)] md:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_28px_rgba(56,189,248,0.28)]">
                        {card.icon}
                      </div>
                      <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-[-0.035em] text-white md:mt-7">{card.title}</h3>
                      <p className="relative mt-3 font-body text-sm leading-6 text-slate-300/82 md:leading-7">{card.description}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CinematicSection>

        <CinematicSection id="projects" className="space-y-6 md:space-y-7">
          {({ contentY, contentOpacity, contentScale, accentY }) => (
            <motion.div style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-5">
                <motion.div className="space-y-3 md:space-y-4" style={{ y: accentY }}>
                  <p className="eyebrow">Our Work</p>
                  <h2 className="section-heading">{t.projectsTitle}</h2>
                </motion.div>
                <p className="section-copy">{t.projectsSubtitle}</p>
              </div>
              <div className="mt-10 grid gap-5 md:mt-12 md:gap-7 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.title} project={project} visitLabel={t.visitWebsite} />
                ))}
              </div>
            </motion.div>
          )}
        </CinematicSection>

        <CinematicSection id="stack">
          {({ contentY, contentOpacity, contentScale, accentY }) => (
            <motion.div style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
              <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-5">
                <motion.div className="space-y-3 md:space-y-4" style={{ y: accentY }}>
                  <p className="eyebrow">Capabilities</p>
                  <h2 className="section-heading">{t.stackTitle}</h2>
                </motion.div>
                <p className="section-copy">{t.stackSubtitle}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
                {techItems.map((item, index) => (
                  <div key={item.label}>
                    <TechIcon label={item.label} icon={<span>{item.icon}</span>} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </CinematicSection>

        <CinematicSection id="about">
          {({ backgroundY, contentY, contentOpacity, contentScale, accentY }) => (
            <motion.div className="premium-surface p-6 md:p-12 lg:p-16" style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}>
              {!isMobile ? <motion.div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" style={{ y: accentY }} /> : null}
              {!isMobile ? <motion.div className="absolute left-10 bottom-6 h-40 w-40 rounded-full bg-accent/8 blur-3xl" style={{ y: backgroundY }} /> : null}
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start md:gap-10">
                <div>
                  <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">About CO_DEV</p>
                  <h2 className="section-heading max-w-3xl text-balance text-left">{t.aboutTitle}</h2>
                  <p className="body-copy mt-5 max-w-3xl text-base leading-7 text-slate-200/78 md:mt-6 md:text-lg md:leading-9">{t.aboutText}</p>
                </div>
                <div className="grid gap-3 md:gap-4">
                  {[t.aboutHighlightOne, t.aboutHighlightTwo, t.aboutHighlightThree].map((item, index) => (
                    <motion.div
                      key={item}
                      className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 ease-in-out md:rounded-[28px] md:p-6 hover:border-primary/25 hover:bg-slate-950/45"
                    >
                      <p className="font-body text-[11px] uppercase tracking-[0.24em] text-slate-400 md:text-xs">0{index + 1}</p>
                      <p className="mt-3 font-heading text-lg font-medium tracking-[-0.03em] text-white">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CinematicSection>

        <CinematicSection id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28">
          {({ backgroundY, contentY, contentOpacity, contentScale, accentY }) => (
            <motion.div
              className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(10,20,36,0.94)_45%,rgba(8,47,73,0.92)_100%)] p-6 shadow-[0_18px_56px_rgba(2,8,23,0.36)] md:rounded-[36px] md:p-12 md:shadow-[0_30px_100px_rgba(2,8,23,0.46)] lg:p-14"
              style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
            >
              {!isMobile ? <motion.div className="absolute -right-10 top-0 h-48 w-48 rounded-full bg-primary/22 blur-3xl" style={{ y: accentY }} /> : null}
              {!isMobile ? <motion.div className="absolute left-0 top-1/3 h-40 w-40 rounded-full bg-accent/12 blur-3xl" style={{ y: backgroundY }} /> : null}
              <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_40%)] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_42%)]" style={{ y: backgroundY }} />
              <div className="relative flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="eyebrow">Let’s work together</p>
                  <h2 className="mt-4 font-heading text-[2.2rem] font-semibold tracking-[-0.055em] text-white md:mt-5 md:text-5xl lg:text-[3.5rem]">
                    {t.contactTitle}
                  </h2>
                  <p className="body-copy mt-5 text-base leading-7 text-slate-200/80 md:mt-6 md:text-lg md:leading-9">{t.contactText}</p>
                  <div className="mt-8 space-y-3 font-body text-slate-200/92 md:mt-9">
                    <p>
                      Email:{' '}
                      <a href="mailto:hello@co-dev.studio" className="text-sky-100 transition duration-300 ease-in-out hover:text-accent">
                        contact.codev@proton.me
                      </a>
                    </p>
                    <p>
                      LinkedIn:{' '}
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-100 transition duration-300 ease-in-out hover:text-accent"
                      >
                        linkedin.com
                      </a>
                    </p>
                  </div>
                </div>
                <motion.div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row md:gap-4" style={{ y: accentY }}>
                  <a href="mailto:hello@co-dev.studio" className="premium-button-primary w-full sm:w-auto">
                    {t.hireMe}
                  </a>
                  <a href="#projects" className="premium-button-secondary w-full border-white/20 bg-white/[0.04] sm:w-auto">
                    {t.viewProjects}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </CinematicSection>
      </main>
    </div>
  );
}
