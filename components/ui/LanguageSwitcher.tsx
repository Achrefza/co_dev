'use client';

import { motion } from 'framer-motion';
import { localeLabels, locales, type Locale } from '@/lib/translations';

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

export function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <div className="glass-card relative flex items-center gap-1 rounded-full p-1.5">
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`relative overflow-hidden rounded-full px-3.5 py-2 font-body text-[11px] font-semibold tracking-[0.24em] transition md:px-4 ${
              isActive ? 'text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={isActive}
          >
            {isActive ? (
              <motion.span
                layoutId="active-locale"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_25px_rgba(56,189,248,0.38)]"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            ) : null}
            <span className="relative z-10">{localeLabels[item]}</span>
          </button>
        );
      })}
    </div>
  );
}
