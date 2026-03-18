'use client';

import { motion } from 'framer-motion';
import { localeLabels, locales, type Locale } from '@/lib/translations';

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

export function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <div className="glass-card relative flex items-center gap-1 rounded-full border border-white/12 bg-slate-950/45 p-1.5 shadow-[0_12px_32px_rgba(2,8,23,0.3)]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_60%)]" />
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`relative overflow-hidden rounded-full px-3.5 py-2 font-body text-[11px] font-semibold tracking-[0.24em] transition-all duration-300 ease-in-out md:px-4 ${
              isActive ? 'text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={isActive}
          >
            {isActive ? (
              <motion.span
                layoutId="active-locale"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-sky-200 to-primary shadow-[0_0_30px_rgba(56,189,248,0.34)]"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            ) : null}
            {!isActive ? (
              <span className="absolute inset-0 rounded-full border border-transparent transition duration-300 ease-in-out hover:border-white/10 hover:bg-white/[0.04]" />
            ) : null}
            <span className="relative z-10">{localeLabels[item]}</span>
          </button>
        );
      })}
    </div>
  );
}
