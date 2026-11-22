export interface LogoPreset {
  id: string;
  label: string;
  dataUrl: string;
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: 'px-mark',
    label: 'PX Mark',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#18181b"/>
        <rect x="14" y="14" width="14" height="14" rx="3" fill="#6366f1"/>
        <rect x="36" y="14" width="14" height="14" rx="3" fill="#ffffff"/>
        <rect x="14" y="36" width="14" height="14" rx="3" fill="#ffffff"/>
        <rect x="36" y="36" width="14" height="14" rx="7" fill="#6366f1"/>
      </svg>
    `),
  },
  {
    id: 'upi-pay',
    label: 'UPI Pay',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#ffffff"/>
        <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#e4e4e7" stroke-width="2"/>
        <path d="M22 18L36 32L22 46" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M33 18L47 32L33 46" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `),
  },
  {
    id: 'wifi-badge',
    label: 'Wi-Fi',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#4f46e5"/>
        <path d="M16 27a22.6 22.6 0 0 1 32 0" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M23 35a12.7 12.7 0 0 1 18 0" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="32" cy="44" r="3.5" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'link-badge',
    label: 'Link',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#09090b"/>
        <path d="M26 38l12-12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <path d="M29 23l3-3a8 8 0 0 1 11 11l-3 3" fill="none" stroke="#818cf8" stroke-width="4" stroke-linecap="round"/>
        <path d="M35 41l-3 3a8 8 0 0 1-11-11l3-3" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: 'location-badge',
    label: 'Map Pin',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#18181b"/>
        <path d="M32 14c-7.7 0-14 6.3-14 14 0 10.5 14 22 14 22s14-11.5 14-22c0-7.7-6.3-14-14-14z" fill="#6366f1"/>
        <circle cx="32" cy="28" r="5" fill="#ffffff"/>
      </svg>
    `),
  },
];
