import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number | string;
};

function IconBase({ children, size = 24, strokeWidth = 1.7, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18" />
    </IconBase>
  );
}

export function ShoppingCart(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="10" cy="19" r="1.25" />
      <circle cx="18" cy="19" r="1.25" />
      <path d="M2.5 4h2.5l2.2 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.76L21 8H6.2" />
    </IconBase>
  );
}

export function MousePointerClick(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 4 8.5 8.5-4.2.8-.8 4.2z" />
      <path d="M14 4.5v-2" />
      <path d="M19 7l1.5-1.5" />
      <path d="M20 12h2" />
    </IconBase>
  );
}

export function AppWindow(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18" />
      <path d="M8 13h3" />
      <path d="M13.5 13H16" />
      <path d="M8 16.5h8" />
    </IconBase>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m21 16-4.5-4.5L7 20" />
    </IconBase>
  );
}

export function Puzzle(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 5.5a2.5 2.5 0 1 1 5 0V7h2a2 2 0 0 1 2 2v1.5a2.5 2.5 0 1 1 0 5V17a2 2 0 0 1-2 2h-2v-1.5a2.5 2.5 0 1 0-5 0V19H7a2 2 0 0 1-2-2v-2a2.5 2.5 0 1 0 0-5V9a2 2 0 0 1 2-2h2z" />
    </IconBase>
  );
}

export function Search(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </IconBase>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5 5.5 6v5.2c0 4.3 2.6 8.2 6.5 9.3 3.9-1.1 6.5-5 6.5-9.3V6z" />
      <path d="m9.5 12 1.8 1.8 3.6-3.8" />
    </IconBase>
  );
}

export function SquareChartGantt(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M7.5 8.5h6" />
      <path d="M7.5 12h9" />
      <path d="M7.5 15.5h4" />
    </IconBase>
  );
}

export function Zap(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2.5 5.5 13H11l-1 8.5L18.5 11H13z" />
    </IconBase>
  );
}
