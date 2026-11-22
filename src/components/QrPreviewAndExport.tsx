import QRCodeStyling from 'qr-code-styling';
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  QrCode,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type {
  ExportFormat,
  ExportSize,
  QrCategory,
  QrStyleConfig,
} from '../types/qr';
import {
  analyzeScanReliability,
  type ReliabilityIssue,
} from '../utils/contrastAndReliability';
import {
  buildQrStylingOptions,
  copyQrImageToClipboard,
  exportQrCode,
} from '../utils/qrExport';

interface QrPreviewAndExportProps {
  category: QrCategory;
  payload: string;
  isValid: boolean;
  summaryTitle: string;
  summarySubtitle: string;
  style: QrStyleConfig;
  onStyleChange: (patch: Partial<QrStyleConfig>) => void;
  onLoadSample: (cat: QrCategory) => void;
}

const EXPORT_FORMATS: { id: ExportFormat; label: string }[] = [
  { id: 'png', label: 'PNG' },
  { id: 'jpg', label: 'JPG' },
  { id: 'svg', label: 'SVG' },
  { id: 'pdf', label: 'PDF' },
];

const EXPORT_SIZES: { value: ExportSize; label: string }[] = [
  { value: 512, label: '512px' },
  { value: 1024, label: '1024px' },
  { value: 2048, label: '2048px' },
  { value: 4096, label: '4096px' },
];

export function QrPreviewAndExport({
  category,
  payload,
  isValid,
  summaryTitle,
  summarySubtitle,
  style,
  onStyleChange,
  onLoadSample,
}: QrPreviewAndExportProps) {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const reliability = analyzeScanReliability(style, payload.length);

  useEffect(() => {
    const container = qrContainerRef.current;
    if (!container) return;

    container.innerHTML = '';
    if (!isValid || !payload) return;

    const qr = new QRCodeStyling(
      buildQrStylingOptions(payload, style, 264, 'svg')
    );
    qr.append(container);
  }, [payload, isValid, style]);

  const showTempFeedback = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => {
      setFeedback((prev) => (prev?.text === text ? null : prev));
    }, 3200);
  };

  const handleReliabilityFix = (action: ReliabilityIssue['fixAction']) => {
    if (action === 'contrast') {
      onStyleChange({
        fgType: 'solid',
        fgColor: '#09090B',
        bgTransparent: false,
        bgColor: '#FFFFFF',
      });
    } else if (action === 'invert') {
      onStyleChange({
        fgType: 'solid',
        fgColor: '#09090B',
        bgTransparent: false,
        bgColor: '#FFFFFF',
      });
    } else if (action === 'ecc') {
      onStyleChange({ errorCorrectionLevel: 'H' });
    } else if (action === 'logoSize') {
      onStyleChange({ logoSize: 0.28 });
    } else if (action === 'quietZone') {
      onStyleChange({ margin: 16 });
    }
  };

  const handleDownload = async () => {
    if (!isValid || !payload) return;
    setIsExporting(true);
    try {
      await exportQrCode(payload, style, {
        category,
        summaryTitle,
        summarySubtitle,
      });
      showTempFeedback(
        'success',
        `Exported ${style.exportFormat.toUpperCase()} (${
          style.exportFormat === 'svg' ? 'Vector' : `${style.exportSize}px`
        })`
      );
    } catch (err) {
      showTempFeedback(
        'error',
        err instanceof Error ? err.message : 'Export failed. Try PNG or SVG.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!isValid || !payload) return;
    try {
      await copyQrImageToClipboard(payload, style);
      setCopiedImg(true);
      showTempFeedback('success', 'QR image copied to clipboard');
      setTimeout(() => setCopiedImg(false), 2000);
    } catch (err) {
      showTempFeedback(
        'error',
        err instanceof Error
          ? err.message
          : 'Browser blocked clipboard image copy. Download PNG instead.'
      );
    }
  };

  const handleCopyPayload = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      showTempFeedback('error', 'Could not copy text to clipboard.');
    }
  };

  return (
    <aside
      aria-label="Live QR preview and export controls"
      className="lg:sticky lg:top-20 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-[#111114]"
    >
      {/* Header metadata */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-display">
          Live Preview
        </span>
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
          <span>ECC {style.errorCorrectionLevel}</span>
          <span aria-hidden="true">·</span>
          <span>{reliability.contrastRatio.toFixed(1)}:1</span>
          <span aria-hidden="true">·</span>
          <span
            className={
              reliability.status === 'Optimal'
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : reliability.status === 'Caution'
                  ? 'text-amber-600 dark:text-amber-400 font-medium'
                  : 'text-red-600 dark:text-red-400 font-medium'
            }
          >
            {reliability.status}
          </span>
        </div>
      </div>

      {/* Preview Canvas Frame */}
      <div
        className={`relative mx-auto flex aspect-square w-full max-w-[304px] items-center justify-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 ${
          style.bgTransparent ? 'qr-checkerboard' : 'bg-zinc-100 dark:bg-zinc-950'
        }`}
      >
        {isValid && payload ? (
          <div
            ref={qrContainerRef}
            className="flex h-[264px] w-[264px] items-center justify-center [&_svg]:h-full [&_svg]:w-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
              <QrCode className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Waiting for required fields
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Enter details on the left or load sample data to render.
            </p>
            <button
              type="button"
              onClick={() => onLoadSample(category)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Fill Sample
            </button>
          </div>
        )}
      </div>

      {/* UPI Request Summary */}
      {category === 'upi' && isValid && (
        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {summaryTitle}
            </span>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              UPI Request QR
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 tabular-nums truncate">
            {summarySubtitle}
          </p>
        </div>
      )}

      {/* Scan Reliability Guardrails */}
      {isValid && (
        <div className="mt-4">
          {reliability.issues.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                High scan reliability verified across standard mobile cameras.
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              {reliability.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`rounded-lg border px-3 py-2.5 text-xs ${
                    issue.severity === 'error'
                      ? 'border-red-200 bg-red-50/80 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300'
                      : 'border-amber-200 bg-amber-50/80 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <div className="flex-1">
                      <p className="leading-relaxed">{issue.message}</p>
                      {issue.fixLabel && issue.fixAction && (
                        <button
                          type="button"
                          onClick={() => handleReliabilityFix(issue.fixAction)}
                          className="mt-1.5 font-semibold underline underline-offset-2 hover:opacity-80 cursor-pointer"
                        >
                          {issue.fixLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Encoded Payload Inspector */}
      {isValid && payload && (
        <div className="mt-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Encoded Payload
            </span>
            <button
              type="button"
              onClick={handleCopyPayload}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy Text
                </>
              )}
            </button>
          </div>
          <div className="max-h-16 overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[11px] text-zinc-700 break-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            {payload}
          </div>
        </div>
      )}

      {/* Export Controls */}
      <div className="mt-5 pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <span className="mb-1.5 block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Format
            </span>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
              {EXPORT_FORMATS.map((fmt) => {
                const active = style.exportFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => onStyleChange({ exportFormat: fmt.id })}
                    className={`rounded-md py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    {fmt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Resolution
              </span>
              {style.exportFormat === 'svg' && (
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400">
                  Scalable Vector
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
              {EXPORT_SIZES.map((sz) => {
                const active = style.exportSize === sz.value;
                return (
                  <button
                    key={sz.value}
                    type="button"
                    onClick={() => onStyleChange({ exportSize: sz.value })}
                    className={`rounded-md py-1.5 text-[11px] font-medium tabular-nums transition-colors cursor-pointer ${
                      active
                        ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    {sz.value}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={!isValid || isExporting}
            onClick={handleDownload}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>
              {isExporting
                ? 'Rendering...'
                : `Download ${style.exportFormat.toUpperCase()}`}
            </span>
          </button>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleCopyImage}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-45 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            {copiedImg ? (
              <>
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 shrink-0" />
                <span>Copy Image</span>
              </>
            )}
          </button>
        </div>

        {feedback && (
          <p
            role="status"
            className={`text-xs ${
              feedback.type === 'success'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </aside>
  );
}
