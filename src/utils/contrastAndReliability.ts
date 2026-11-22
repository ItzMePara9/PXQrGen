import type { QrStyleConfig } from '../types/qr';

function normalizeHex(hex: string): [number, number, number] | null {
  const cleaned = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return [r, g, b];
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

export function getRelativeLuminance(hex: string): number {
  const rgb = normalizeHex(hex);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(hexA: string, hexB: string): number {
  const lumA = getRelativeLuminance(hexA);
  const lumB = getRelativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface ReliabilityIssue {
  id: string;
  severity: 'warning' | 'error';
  message: string;
  fixLabel?: string;
  fixAction?: 'contrast' | 'ecc' | 'logoSize' | 'invert' | 'quietZone';
}

export interface ScanReliabilityReport {
  status: 'Optimal' | 'Caution' | 'Low Reliability';
  contrastRatio: number;
  issues: ReliabilityIssue[];
}

export function analyzeScanReliability(
  style: QrStyleConfig,
  payloadLength: number
): ScanReliabilityReport {
  const issues: ReliabilityIssue[] = [];
  const effectiveBg = style.bgTransparent ? '#FFFFFF' : style.bgColor;
  const bgLum = getRelativeLuminance(effectiveBg);

  const fgColors =
    style.fgType === 'gradient'
      ? [style.gradientColor1, style.gradientColor2]
      : [style.fgColor];

  const ratios = fgColors.map((c) => getContrastRatio(c, effectiveBg));
  const minRatio = Math.min(...ratios);

  const fgLums = fgColors.map((c) => getRelativeLuminance(c));
  const hasInvertedModules = fgLums.some((l) => l > bgLum + 0.05);

  if (hasInvertedModules) {
    issues.push({
      id: 'inverted-polarity',
      severity: 'warning',
      message:
        'Foreground is lighter than the background. Standard QR cameras expect dark modules on a light background.',
      fixLabel: 'Restore dark-on-light',
      fixAction: 'invert',
    });
  }

  if (minRatio < 3.0) {
    issues.push({
      id: 'low-contrast',
      severity: 'error',
      message: `Contrast ratio is ${minRatio.toFixed(1)}:1. Keep foreground vs. background at 4.5:1 or higher for reliable camera detection.`,
      fixLabel: 'Fix contrast',
      fixAction: 'contrast',
    });
  } else if (minRatio < 4.5) {
    issues.push({
      id: 'moderate-contrast',
      severity: 'warning',
      message: `Contrast ratio is ${minRatio.toFixed(1)}:1. Increasing contrast above 4.5:1 improves scanning in dim lighting.`,
      fixLabel: 'Boost contrast',
      fixAction: 'contrast',
    });
  }

  if (style.logoDataUrl) {
    if (style.errorCorrectionLevel === 'L' || style.errorCorrectionLevel === 'M') {
      issues.push({
        id: 'logo-low-ecc',
        severity: 'error',
        message: `Center logo obscures data modules while Error Correction is ${style.errorCorrectionLevel}. Switch to Q (25%) or H (30%) to maintain scan reliability.`,
        fixLabel: 'Set ECC to High (H)',
        fixAction: 'ecc',
      });
    }
    if (style.logoSize > 0.34) {
      issues.push({
        id: 'logo-too-large',
        severity: 'warning',
        message:
          'Logo exceeds 34% of code area. Reducing logo scale improves fast camera lock.',
        fixLabel: 'Resize logo to 28%',
        fixAction: 'logoSize',
      });
    }
  }

  if (style.margin < 8) {
    issues.push({
      id: 'tight-quiet-zone',
      severity: 'warning',
      message:
        'Quiet zone margin is narrow. At least 12px helps scanners isolate the finder patterns.',
      fixLabel: 'Set 16px margin',
      fixAction: 'quietZone',
    });
  }

  if (payloadLength > 500 && style.dotType === 'dots' && style.errorCorrectionLevel === 'H') {
    issues.push({
      id: 'dense-dots',
      severity: 'warning',
      message:
        'High-density data with circular dots may require larger print sizes (1024px+ export recommended).',
    });
  }

  const hasError = issues.some((i) => i.severity === 'error');
  const status: ScanReliabilityReport['status'] = hasError
    ? 'Low Reliability'
    : issues.length > 0
      ? 'Caution'
      : 'Optimal';

  return {
    status,
    contrastRatio: minRatio,
    issues,
  };
}
