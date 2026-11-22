import { MotionConfig, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { CustomizationStudio } from './components/CustomizationStudio';
import { FeatureHighlights } from './components/FeatureHighlights';
import { Footer } from './components/Footer';
import { InfoModal, type ModalKind } from './components/InfoModal';
import { Navbar } from './components/Navbar';
import { QrInputForms } from './components/QrInputForms';
import { QrPreviewAndExport } from './components/QrPreviewAndExport';
import type { QrCategory, QrFormState, QrStyleConfig } from './types/qr';
import {
  INITIAL_FORM_STATE,
  buildQrPayload,
  getSampleDataForCategory,
} from './utils/qrPayload';

const DEFAULT_STYLE: QrStyleConfig = {
  fgType: 'solid',
  fgColor: '#09090B',
  gradientType: 'linear',
  gradientColor1: '#1E1B4B',
  gradientColor2: '#4F46E5',
  gradientRotation: 135,
  bgColor: '#FFFFFF',
  bgTransparent: false,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  customEyeColor: false,
  eyeColor: '#4F46E5',
  logoDataUrl: null,
  logoPresetId: null,
  logoSize: 0.28,
  logoMargin: 6,
  hideBackgroundDots: true,
  errorCorrectionLevel: 'M',
  margin: 16,
  exportSize: 1024,
  exportFormat: 'png',
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('pxqrgen-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  const [category, setCategory] = useState<QrCategory>('url');
  const [formState, setFormState] = useState<QrFormState>(INITIAL_FORM_STATE);
  const [style, setStyle] = useState<QrStyleConfig>(DEFAULT_STYLE);
  const [activeModal, setActiveModal] = useState<ModalKind>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('pxqrgen-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleUpdateField = useCallback(
    <K extends QrCategory>(cat: K, patch: Partial<QrFormState[K]>) => {
      setFormState((prev) => ({
        ...prev,
        [cat]: {
          ...prev[cat],
          ...patch,
        },
      }));
    },
    []
  );

  const handleLoadSample = useCallback((cat: QrCategory) => {
    const sample = getSampleDataForCategory(cat);
    setFormState((prev) => ({
      ...prev,
      ...sample,
    }));
  }, []);

  const handleClearCategory = useCallback((cat: QrCategory) => {
    setFormState((prev) => ({
      ...prev,
      [cat]:
        cat === 'url'
          ? { value: '' }
          : INITIAL_FORM_STATE[cat],
    }));
  }, []);

  const handleStyleChange = useCallback((patch: Partial<QrStyleConfig>) => {
    setStyle((prev) => ({
      ...prev,
      ...patch,
    }));
  }, []);

  const handleResetStyle = useCallback(() => {
    setStyle(DEFAULT_STYLE);
  }, []);

  const scrollToWorkspace = useCallback(() => {
    const el = document.getElementById('workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleQuickSelectUpi = useCallback(() => {
    setCategory('upi');
    scrollToWorkspace();
  }, [scrollToWorkspace]);

  const payloadResult = useMemo(
    () => buildQrPayload(category, formState),
    [category, formState]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100"
      >
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onQuickSelectUpi={handleQuickSelectUpi}
          onJumpToWorkspace={scrollToWorkspace}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-12 lg:pb-10">
            <div className="max-w-3xl">
              <h1
                className="font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
                style={{
                  fontSize: 'clamp(2.15rem, 4vw, 3.25rem)',
                  lineHeight: 1.1,
                  textWrap: 'balance',
                }}
              >
                Create QR Codes. Share Anything.
              </h1>
              <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Generate scannable QR codes for UPI payments, Wi-Fi networks, vCard
                contacts, links, and messaging. Customize dots, gradients, and logos
                with automated contrast guardrails.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span>15 Payload Formats</span>
                <span aria-hidden="true">·</span>
                <span>Standard UPI URI Support</span>
                <span aria-hidden="true">·</span>
                <span>PNG, JPG, SVG &amp; PDF Export</span>
                <span aria-hidden="true">·</span>
                <span>Local Browser Processing</span>
              </div>
            </div>
          </section>

          {/* Main QR Generator Workspace */}
          <motion.section
            id="workspace"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Category Selector + Form + Customization Studio */}
              <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-[#111114] space-y-6">
                <CategorySelector
                  selected={category}
                  onSelect={setCategory}
                />

                <QrInputForms
                  category={category}
                  formState={formState}
                  errors={payloadResult.errors}
                  upiPreviewUri={
                    category === 'upi' && payloadResult.isValid
                      ? payloadResult.payload
                      : ''
                  }
                  onUpdateField={handleUpdateField}
                  onLoadSample={handleLoadSample}
                  onClearCategory={handleClearCategory}
                />

                <CustomizationStudio
                  style={style}
                  onChange={handleStyleChange}
                  onResetStyle={handleResetStyle}
                />
              </div>

              {/* Right Column: Live QR Preview + Reliability + Export */}
              <div className="lg:col-span-5">
                <QrPreviewAndExport
                  category={category}
                  payload={payloadResult.payload}
                  isValid={payloadResult.isValid}
                  summaryTitle={payloadResult.summaryTitle}
                  summarySubtitle={payloadResult.summarySubtitle}
                  style={style}
                  onStyleChange={handleStyleChange}
                  onLoadSample={handleLoadSample}
                />
              </div>
            </div>
          </motion.section>

          <FeatureHighlights />
        </main>

        <Footer onOpenModal={setActiveModal} />

        <InfoModal kind={activeModal} onClose={() => setActiveModal(null)} />
      </div>
    </MotionConfig>
  );
}
