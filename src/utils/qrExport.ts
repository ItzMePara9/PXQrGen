import QRCodeStyling, { type Options } from 'qr-code-styling';
import { jsPDF } from 'jspdf';
import type { QrCategory, QrStyleConfig } from '../types/qr';

export function buildQrStylingOptions(
  data: string,
  style: QrStyleConfig,
  size: number,
  renderType: 'svg' | 'canvas' = 'svg'
): Options {
  const rotationRad = (style.gradientRotation * Math.PI) / 180;
  const dotsColorConfig =
    style.fgType === 'gradient'
      ? {
          gradient: {
            type: style.gradientType,
            rotation: rotationRad,
            colorStops: [
              { offset: 0, color: style.gradientColor1 },
              { offset: 1, color: style.gradientColor2 },
            ],
          },
        }
      : {
          color: style.fgColor,
        };

  const eyeColorConfig = style.customEyeColor
    ? { color: style.eyeColor }
    : dotsColorConfig;

  return {
    width: size,
    height: size,
    type: renderType,
    data: data || 'https://pxqrgen.app',
    margin: Math.round((style.margin / 300) * size),
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: style.errorCorrectionLevel,
    },
    image: style.logoDataUrl || undefined,
    imageOptions: {
      hideBackgroundDots: style.hideBackgroundDots,
      imageSize: style.logoSize,
      margin: Math.round((style.logoMargin / 300) * size),
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      type: style.dotType,
      ...dotsColorConfig,
    },
    backgroundOptions: {
      color: style.bgTransparent ? 'transparent' : style.bgColor,
    },
    cornersSquareOptions: {
      type: style.cornerSquareType,
      ...eyeColorConfig,
    },
    cornersDotOptions: {
      type: style.cornerDotType,
      ...eyeColorConfig,
    },
  };
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function blobToCanvas(blob: Blob, size: number, fillBackground: string | null): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    if (fillBackground) {
      ctx.fillStyle = fillBackground;
      ctx.fillRect(0, 0, size, size);
    }
    ctx.drawImage(img, 0, 0, size, size);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function renderPngBlob(
  payload: string,
  style: QrStyleConfig,
  size: number,
  forceSolidBackground = false
): Promise<Blob> {
  const effectiveStyle: QrStyleConfig =
    forceSolidBackground && style.bgTransparent
      ? { ...style, bgTransparent: false, bgColor: '#FFFFFF' }
      : style;

  const instance = new QRCodeStyling(
    buildQrStylingOptions(payload, effectiveStyle, size, 'canvas')
  );
  const raw = await instance.getRawData('png');
  if (!raw || !(raw instanceof Blob)) {
    throw new Error('Failed to generate PNG data');
  }
  return raw;
}

export async function exportQrCode(
  payload: string,
  style: QrStyleConfig,
  meta: {
    category: QrCategory;
    summaryTitle: string;
    summarySubtitle: string;
  }
): Promise<void> {
  const size = style.exportSize;
  const safeSlug = meta.category.toLowerCase();
  const timestamp = new Date().toISOString().slice(0, 10);
  const baseName = `pxqrgen-${safeSlug}-${size}px-${timestamp}`;

  if (style.exportFormat === 'svg') {
    const instance = new QRCodeStyling(
      buildQrStylingOptions(payload, style, size, 'svg')
    );
    const raw = await instance.getRawData('svg');
    if (!raw || !(raw instanceof Blob)) {
      throw new Error('Failed to generate SVG');
    }
    triggerBlobDownload(raw, `${baseName}.svg`);
    return;
  }

  if (style.exportFormat === 'png') {
    const blob = await renderPngBlob(payload, style, size, false);
    triggerBlobDownload(blob, `${baseName}.png`);
    return;
  }

  if (style.exportFormat === 'jpg') {
    const pngBlob = await renderPngBlob(payload, style, size, true);
    const canvas = await blobToCanvas(
      pngBlob,
      size,
      style.bgTransparent ? '#FFFFFF' : style.bgColor
    );
    const jpgBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('JPG encoding failed'))),
        'image/jpeg',
        0.96
      );
    });
    triggerBlobDownload(jpgBlob, `${baseName}.jpg`);
    return;
  }

  if (style.exportFormat === 'pdf') {
    const pdfRenderSize = Math.min(size, 2048);
    const pngBlob = await renderPngBlob(payload, style, pdfRenderSize, true);
    const canvas = await blobToCanvas(
      pngBlob,
      pdfRenderSize,
      style.bgTransparent ? '#FFFFFF' : style.bgColor
    );
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const qrSizeMm = 116;
    const x = (pageWidth - qrSizeMm) / 2;
    const y = 54;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(24, 24, 27);
    doc.text(meta.summaryTitle || 'QR Code', pageWidth / 2, 34, { align: 'center' });

    if (meta.summarySubtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(82, 82, 91);
      doc.text(meta.summarySubtitle, pageWidth / 2, 42, { align: 'center' });
    }

    doc.setDrawColor(228, 228, 231);
    doc.roundedRect(x - 6, y - 6, qrSizeMm + 12, qrSizeMm + 12, 4, 4, 'S');
    doc.addImage(imgData, 'PNG', x, y, qrSizeMm, qrSizeMm);

    const footerY = y + qrSizeMm + 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 113, 122);

    if (meta.category === 'upi') {
      doc.text(
        'Scan with any UPI-enabled application to initiate a payment.',
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
    } else {
      const truncatedPayload =
        payload.length > 90 ? `${payload.slice(0, 87)}...` : payload;
      doc.text(truncatedPayload, pageWidth / 2, footerY, { align: 'center' });
    }

    doc.setFontSize(8.5);
    doc.setTextColor(161, 161, 170);
    doc.text('Generated with PXQrGen', pageWidth / 2, 276, { align: 'center' });

    doc.save(`${baseName}.pdf`);
  }
}

export async function copyQrImageToClipboard(
  payload: string,
  style: QrStyleConfig
): Promise<void> {
  if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
    throw new Error('Clipboard image copy is not supported in this browser.');
  }
  const blob = await renderPngBlob(payload, style, 1024, true);
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': blob,
    }),
  ]);
}
