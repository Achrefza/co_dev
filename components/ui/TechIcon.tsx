import { ReactNode } from 'react';

type TechIconProps = {
  label: string;
  icon: ReactNode;
};

export function TechIcon({ label, icon }: TechIconProps) {
  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:-translate-y-1 hover:border-primary/70">
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-medium text-slate-200">{label}</span>
    </div>
  );
}
