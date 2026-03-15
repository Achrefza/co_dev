'use client';

import { localeLabels, locales, type Locale } from '@/lib/translations';

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

export function LanguageSwitcher({ locale, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-md">
      {locales.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            item === locale ? 'bg-primary text-dark' : 'text-slate-300 hover:text-white'
          }`}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
