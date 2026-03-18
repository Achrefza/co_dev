import { ReactNode } from 'react';

type TechIconProps = {
  label: string;
  icon: ReactNode;
};

export function TechIcon({ label, icon }: TechIconProps) {
  const isFeatured = label === 'Next.js' || label === 'TypeScript';

  return (
    <div
      className={`glass-card group relative overflow-hidden rounded-[30px] border p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 ${
        isFeatured
          ? 'border-sky-200/20 bg-white/[0.07] shadow-[0_26px_80px_rgba(14,165,233,0.14)]'
          : 'border-white/10 bg-white/[0.05] hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(56,189,248,0.14)]'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.16),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] opacity-0 transition duration-300 ease-in-out group-hover:opacity-100" />
      {isFeatured ? (
        <div className="shimmer-border absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/70 to-transparent" />
      ) : null}
      <div className="relative flex items-center gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 ${
            isFeatured
              ? 'border-sky-200/25 bg-sky-400/12 text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_28px_rgba(56,189,248,0.18)]'
              : 'border-white/10 bg-slate-950/45 text-primary group-hover:text-sky-100'
          }`}
        >
          {icon}
        </span>
        <div>
          <p className="font-body text-sm text-slate-400/85">Technology</p>
          <span className="font-heading text-lg font-medium tracking-[-0.03em] text-slate-50">{label}</span>
        </div>
      </div>
    </div>
  );
}
