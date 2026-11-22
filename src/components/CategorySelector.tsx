import {
  AlignLeft,
  Briefcase,
  Contact,
  Globe,
  Hash,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  PlaySquare,
  Share2,
  Camera,
  Wifi,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { QrCategory } from '../types/qr';
import { QR_CATEGORIES } from '../utils/qrPayload';

const CATEGORY_ICONS: Record<QrCategory, ComponentType<{ className?: string }>> = {
  url: Globe,
  upi: IndianRupee,
  wifi: Wifi,
  text: AlignLeft,
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  vcard: Contact,
  instagram: Camera,
  youtube: PlaySquare,
  discord: Hash,
  facebook: Share2,
  linkedin: Briefcase,
  location: MapPin,
};

interface CategorySelectorProps {
  selected: QrCategory;
  onSelect: (category: QrCategory) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div aria-label="QR code type selector">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Select QR Type
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
          15 formats
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {QR_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id];
          const isActive = selected === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              aria-pressed={isActive}
              className={`group flex min-h-[44px] items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50/80 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'
                }`}
              />
              <span className="truncate whitespace-nowrap">{cat.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
