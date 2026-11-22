import {
  ImagePlus,
  Palette,
  RotateCcw,
  Shapes,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import type {
  CornerDotStyleType,
  CornerSquareStyleType,
  DotStyleType,
  ErrorCorrectionLevel,
  QrStyleConfig,
} from '../types/qr';
import { LOGO_PRESETS } from '../utils/logoPresets';

type StudioTab = 'colors' | 'shapes' | 'logo' | 'technical';

interface CustomizationStudioProps {
  style: QrStyleConfig;
  onChange: (patch: Partial<QrStyleConfig>) => void;
  onResetStyle: () => void;
}

const FG_SWATCHES = [
  '#09090B',
  '#1E1B4B',
  '#312E81',
  '#1D4ED8',
  '#0F766E',
  '#9F1239',
];

const BG_SWATCHES = ['#FFFFFF', '#FAFAFA', '#F4F4F5', '#EEF2FF', '#FEFCE8'];

const DOT_STYLES: { id: DotStyleType; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Soft' },
  { id: 'extra-rounded', label: 'Fluid' },
];

const CORNER_SQUARE_STYLES: { id: CornerSquareStyleType; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'dot', label: 'Circle' },
];

const CORNER_DOT_STYLES: { id: CornerDotStyleType; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' },
];

const ECC_OPTIONS: {
  level: ErrorCorrectionLevel;
  pct: string;
  note: string;
}[] = [
  { level: 'L', pct: '7%', note: 'Compact grid' },
  { level: 'M', pct: '15%', note: 'Standard' },
  { level: 'Q', pct: '25%', note: 'Resilient' },
  { level: 'H', pct: '30%', note: 'Best for logos' },
];

function DotPreviewGlyph({ type }: { type: DotStyleType }) {
  const rx =
    type === 'square'
      ? 0
      : type === 'rounded'
        ? 2.2
        : type === 'dots'
          ? 5
          : type === 'extra-rounded'
            ? 3.8
            : 1.5;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
      <rect x="2" y="2" width="8.5" height="8.5" rx={rx} fill="currentColor" />
      <rect x="13.5" y="2" width="8.5" height="8.5" rx={type === 'classy' || type === 'classy-rounded' ? 0 : rx} fill="currentColor" />
      <rect x="2" y="13.5" width="8.5" height="8.5" rx={type === 'classy' || type === 'classy-rounded' ? 4 : rx} fill="currentColor" />
      <rect x="13.5" y="13.5" width="8.5" height="8.5" rx={rx} fill="currentColor" />
    </svg>
  );
}

export function CustomizationStudio({
  style,
  onChange,
  onResetStyle,
}: CustomizationStudioProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>('colors');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Select a PNG, JPG, SVG, or WebP image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Logo file must be under 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const needsEccUpgrade =
          style.errorCorrectionLevel === 'L' || style.errorCorrectionLevel === 'M';
        onChange({
          logoDataUrl: reader.result,
          logoPresetId: null,
          ...(needsEccUpgrade ? { errorCorrectionLevel: 'H' } : {}),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const selectPresetLogo = (id: string, dataUrl: string) => {
    setUploadError(null);
    const needsEccUpgrade =
      style.errorCorrectionLevel === 'L' || style.errorCorrectionLevel === 'M';
    onChange({
      logoDataUrl: dataUrl,
      logoPresetId: id,
      ...(needsEccUpgrade ? { errorCorrectionLevel: 'H' } : {}),
    });
  };

  const tabs: { id: StudioTab; label: string; icon: typeof Palette }[] = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'shapes', label: 'Dots & Eyes', icon: Shapes },
    { id: 'logo', label: 'Logo', icon: ImagePlus },
    { id: 'technical', label: 'Correction', icon: ShieldCheck },
  ];

  return (
    <section
      id="customization"
      aria-label="Customization studio"
      className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
            Customization Studio
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            Configure modules, gradients, corner eyes, center logo, and error correction.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetStyle}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Style
        </button>
      </div>

      {/* Segmented studio navigation */}
      <div
        role="tablist"
        aria-label="Customization panels"
        className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-zinc-100 p-1 sm:grid-cols-4 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-[36px] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Colors & Gradients */}
      {activeTab === 'colors' && (
        <div className="space-y-5">
          {/* Foreground mode */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Foreground Fill
              </span>
              <div className="flex items-center gap-1 rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => onChange({ fgType: 'solid' })}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    style.fgType === 'solid'
                      ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Solid
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ fgType: 'gradient' })}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    style.fgType === 'gradient'
                      ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Gradient
                </button>
              </div>
            </div>

            {style.fgType === 'solid' ? (
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer">
                  <input
                    type="color"
                    aria-label="Foreground color picker"
                    value={style.fgColor}
                    onChange={(e) => onChange({ fgColor: e.target.value })}
                    className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    aria-label="Foreground hex value"
                    value={style.fgColor.toUpperCase()}
                    onChange={(e) => onChange({ fgColor: e.target.value })}
                    className="w-20 bg-transparent font-mono text-xs text-zinc-800 focus:outline-none dark:text-zinc-200"
                  />
                </label>

                <div className="flex items-center gap-1.5">
                  {FG_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => onChange({ fgColor: hex })}
                      aria-label={`Select foreground color ${hex}`}
                      className={`h-7 w-7 rounded-md border transition-transform cursor-pointer ${
                        style.fgColor.toLowerCase() === hex.toLowerCase()
                          ? 'scale-105 border-indigo-500 ring-2 ring-indigo-500/30'
                          : 'border-zinc-300 dark:border-zinc-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Start
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                        {style.gradientColor1.toUpperCase()}
                      </span>
                      <input
                        type="color"
                        value={style.gradientColor1}
                        onChange={(e) =>
                          onChange({ gradientColor1: e.target.value })
                        }
                        className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      End
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                        {style.gradientColor2.toUpperCase()}
                      </span>
                      <input
                        type="color"
                        value={style.gradientColor2}
                        onChange={(e) =>
                          onChange({ gradientColor2: e.target.value })
                        }
                        className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Type
                    </span>
                    <button
                      type="button"
                      onClick={() => onChange({ gradientType: 'linear' })}
                      className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                        style.gradientType === 'linear'
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange({ gradientType: 'radial' })}
                      className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                        style.gradientType === 'radial'
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
                      }`}
                    >
                      Radial
                    </button>
                  </div>

                  {style.gradientType === 'linear' && (
                    <div className="flex flex-1 items-center gap-3 min-w-[160px]">
                      <label
                        htmlFor="grad-angle"
                        className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
                      >
                        Angle
                      </label>
                      <input
                        id="grad-angle"
                        type="range"
                        min={0}
                        max={360}
                        value={style.gradientRotation}
                        onChange={(e) =>
                          onChange({ gradientRotation: Number(e.target.value) })
                        }
                        className="w-full accent-indigo-600"
                      />
                      <span className="w-10 text-right font-mono text-xs text-zinc-600 dark:text-zinc-300 tabular-nums">
                        {style.gradientRotation}°
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Background color */}
          <div className="pt-2 border-t border-zinc-200/70 dark:border-zinc-800/70">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Background Surface
              </span>
              <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={style.bgTransparent}
                  onChange={(e) =>
                    onChange({ bgTransparent: e.target.checked })
                  }
                  className="h-3.5 w-3.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                Transparent (PNG / SVG)
              </label>
            </div>

            <div
              className={`flex flex-wrap items-center gap-3 transition-opacity ${
                style.bgTransparent ? 'opacity-45 pointer-events-none' : ''
              }`}
            >
              <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="color"
                  aria-label="Background color picker"
                  value={style.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  aria-label="Background hex value"
                  value={style.bgColor.toUpperCase()}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-20 bg-transparent font-mono text-xs text-zinc-800 focus:outline-none dark:text-zinc-200"
                />
              </label>

              <div className="flex items-center gap-1.5">
                {BG_SWATCHES.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => onChange({ bgColor: hex })}
                    aria-label={`Select background color ${hex}`}
                    className={`h-7 w-7 rounded-md border transition-transform cursor-pointer ${
                      style.bgColor.toLowerCase() === hex.toLowerCase()
                        ? 'scale-105 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'border-zinc-300 dark:border-zinc-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Shapes & Eyes */}
      {activeTab === 'shapes' && (
        <div className="space-y-5">
          <div>
            <span className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Data Module Pattern
            </span>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {DOT_STYLES.map((item) => {
                const active = style.dotType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ dotType: item.id })}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-[11px] font-medium transition-colors cursor-pointer ${
                      active
                        ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200'
                    }`}
                  >
                    <DotPreviewGlyph type={item.id} />
                    <span className="truncate max-w-full">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-2 border-t border-zinc-200/70 dark:border-zinc-800/70">
            <div>
              <span className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Corner Frame (Outer Eye)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {CORNER_SQUARE_STYLES.map((item) => {
                  const active = style.cornerSquareType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange({ cornerSquareType: item.id })}
                      aria-pressed={active}
                      className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Corner Center (Inner Eye)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {CORNER_DOT_STYLES.map((item) => {
                  const active = style.cornerDotType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange({ cornerDotType: item.id })}
                      aria-pressed={active}
                      className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-200/70 dark:border-zinc-800/70">
            <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={style.customEyeColor}
                onChange={(e) =>
                  onChange({ customEyeColor: e.target.checked })
                }
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              Separate eye accent color
            </label>

            {style.customEyeColor && (
              <label className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="color"
                  aria-label="Eye accent color"
                  value={style.eyeColor}
                  onChange={(e) => onChange({ eyeColor: e.target.value })}
                  className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  {style.eyeColor.toUpperCase()}
                </span>
              </label>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Center Logo */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleFileUpload}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-white px-4 text-xs font-medium text-zinc-700 hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <ImagePlus className="h-4 w-4" />
              Upload Center Logo (PNG / SVG / JPG)
            </button>

            {style.logoDataUrl && (
              <button
                type="button"
                onClick={() => {
                  onChange({ logoDataUrl: null, logoPresetId: null });
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove Logo
              </button>
            )}
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 dark:text-red-400">{uploadError}</p>
          )}

          <div>
            <span className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Quick Vector Badges
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({ logoDataUrl: null, logoPresetId: null })
                }
                className={`flex h-10 items-center rounded-lg border px-3 text-xs font-medium transition-colors cursor-pointer ${
                  !style.logoDataUrl
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                    : 'border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
                }`}
              >
                None
              </button>
              {LOGO_PRESETS.map((preset) => {
                const active = style.logoPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPresetLogo(preset.id, preset.dataUrl)}
                    className={`flex h-10 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={preset.dataUrl}
                      alt={preset.label}
                      className="h-5 w-5 rounded-sm object-contain"
                    />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {style.logoDataUrl && (
            <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Logo Scale
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 tabular-nums">
                      {Math.round(style.logoSize * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.16}
                    max={0.38}
                    step={0.02}
                    value={style.logoSize}
                    onChange={(e) =>
                      onChange({ logoSize: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Logo Padding
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 tabular-nums">
                      {style.logoMargin}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={14}
                    step={1}
                    value={style.logoMargin}
                    onChange={(e) =>
                      onChange({ logoMargin: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={style.hideBackgroundDots}
                  onChange={(e) =>
                    onChange({ hideBackgroundDots: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                Clear QR modules behind logo (recommended for clean scanning)
              </label>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Error Correction & Quiet Zone */}
      {activeTab === 'technical' && (
        <div className="space-y-5">
          <div>
            <span className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Error Correction Level
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ECC_OPTIONS.map((opt) => {
                const active = style.errorCorrectionLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() =>
                      onChange({ errorCorrectionLevel: opt.level })
                    }
                    aria-pressed={active}
                    className={`flex flex-col items-start rounded-lg border p-3 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex w-full items-baseline justify-between">
                      <span className="text-sm font-semibold">{opt.level}</span>
                      <span className="font-mono text-xs tabular-nums opacity-75">
                        {opt.pct}
                      </span>
                    </div>
                    <span className="mt-1 text-[11px] opacity-75">{opt.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200/70 dark:border-zinc-800/70">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <label
                htmlFor="quiet-zone-slider"
                className="font-medium text-zinc-700 dark:text-zinc-300"
              >
                Quiet Zone Margin
              </label>
              <span className="font-mono text-zinc-800 dark:text-zinc-200 tabular-nums">
                {style.margin}px
              </span>
            </div>
            <input
              id="quiet-zone-slider"
              type="range"
              min={0}
              max={36}
              step={2}
              value={style.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
            <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              Minimum 12px–16px is recommended around finder patterns so camera decoders
              isolate the code cleanly against busy backgrounds.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
