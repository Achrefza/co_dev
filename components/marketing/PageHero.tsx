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
    <section className="section-container pt-20 md:pt-28">
      <div className="premium-surface relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_44%)]" />
        <div className="relative max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">
            {title}
          </h1>
          <p className="body-copy mt-6 max-w-3xl text-base leading-8 text-slate-200/82 md:text-lg md:leading-9">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
