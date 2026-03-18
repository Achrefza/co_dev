import { ReactNode } from 'react';

type TechIconProps = {
  label: string;
  icon: ReactNode;
};

export function TechIcon({ label, icon }: TechIconProps) {
  return (
    <div className="glass-card group relative overflow-hidden rounded-[28px] px-5 py-5 transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 transition duration-300 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-accent/10" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-xl text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {icon}
        </span>
        <div>
          <p className="font-body text-sm text-slate-400">Technology</p>
          <span className="font-heading text-base font-medium tracking-[-0.03em] text-slate-100">{label}</span>
        </div>
      </div>
    </div>
  );
}
