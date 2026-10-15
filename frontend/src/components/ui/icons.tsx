import type { SVGProps } from "react";

/**
 * A tiny icon set (decorative: always paired with text). Status icons differ in SHAPE, not only colour,
 * so meaning never depends on colour alone.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Base({ size = 20, ...props }: IconProps & { children?: never }, path: React.ReactNode) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {path}
    </svg>
  );
}

export const CheckCircleIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.7 2.7L16 9.5" />
    </>,
  );
export const WarningIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M12 3.5 2.5 20h19L12 3.5Z" />
      <path d="M12 10v4.5M12 17.5h.01" />
    </>,
  );
export const XCircleIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>,
  );
export const InfoIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.5h.01" />
    </>,
  );
export const DotIcon = (p: IconProps) =>
  Base(p, <circle cx="12" cy="12" r="4" fill="currentColor" />);
export const CloseIcon = (p: IconProps) => Base(p, <path d="m6 6 12 12M18 6 6 18" />);
export const ChevronDownIcon = (p: IconProps) => Base(p, <path d="m6 9 6 6 6-6" />);
export const SearchIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>,
  );
export const ExternalIcon = (p: IconProps) =>
  Base(p, <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />);
export const StarIcon = (p: IconProps) =>
  Base(
    p,
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />,
  );
export const CheckIcon = (p: IconProps) => Base(p, <path d="m5 12.5 4.5 4.5L19 7.5" />);

export const MegaphoneIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="m3 11 18-5v12L3 13v-2Z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>,
  );

export const EditIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>,
  );

export const SendIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>,
  );

export const ShieldCheckIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>,
  );

export const PlusIcon = (p: IconProps) => Base(p, <path d="M12 5v14M5 12h14" />);

export const TagIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l7.29-7.29a1 1 0 0 0 0-1.42L12 2Z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </>,
  );

export const GiftIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13m7-9v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8m2.5-4a2.5 2.5 0 0 1 5 0c0 1.5-2.5 4-2.5 4s-2.5-2.5-2.5-4Zm7 0a2.5 2.5 0 0 1 5 0c0 1.5-2.5 4-2.5 4s-2.5-2.5-2.5-4Z" />
    </>,
  );

export const TargetIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>,
  );

export const PaletteIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
    </>,
  );

export const FileTextIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>,
  );

export const ZapIcon = (p: IconProps) =>
  Base(p, <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />);

export const CoffeeIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </>,
  );

export const UsersIcon = (p: IconProps) =>
  Base(
    p,
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
  );


