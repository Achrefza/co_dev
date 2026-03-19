import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

export function PageHero({ eyebrow, title, description, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className="section-container pt-16 md:pt-28">
      <div className="premium-surface relative overflow-hidden px-5 py-10 md:px-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_42%)] md:bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.1),transparent_44%)]" />
        <div className="relative max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-heading text-[2.35rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white md:mt-5 md:text-6xl">
            {title}
          </h1>
          <p className="body-copy mt-5 max-w-2xl text-[0.98rem] leading-7 text-slate-200/80 md:mt-6 md:max-w-3xl md:text-lg md:leading-9">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryCta.href} className="premium-button-primary w-full sm:w-auto">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="premium-button-secondary w-full sm:w-auto">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
