import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="section-container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div>
          <p className="font-heading text-xl text-white">{siteConfig.name}</p>
          <p className="body-copy mt-2 max-w-2xl text-sm text-slate-300/72">
            SEO optimized websites, custom web development, and scalable digital experiences built for long-term growth.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-slate-300/88">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition duration-300 ease-in-out hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
