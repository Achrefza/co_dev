import { siteConfig } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/78 shadow-[0_10px_24px_rgba(2,8,23,0.24)] backdrop-blur-xl md:bg-slate-950/55">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-10 md:py-4 lg:px-12">
        <a href="/#hero" className="font-heading text-base font-semibold tracking-[0.24em] text-white transition duration-300 ease-in-out hover:text-primary md:text-lg md:tracking-[0.32em]">
          {siteConfig.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 font-body text-sm text-slate-300/90 md:gap-8">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={`/${item.href}`} className="transition duration-300 ease-in-out hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
