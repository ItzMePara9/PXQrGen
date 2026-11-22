import { X } from 'lucide-react';
import { useEffect } from 'react';

export type ModalKind = 'about' | 'privacy' | null;

interface InfoModalProps {
  kind: ModalKind;
  onClose: () => void;
}

export function InfoModal({ kind, onClose }: InfoModalProps) {
  useEffect(() => {
    if (!kind) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [kind, onClose]);

  if (!kind) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <h2 id="info-modal-title" className="text-lg font-semibold font-display">
            {kind === 'about' ? 'About PXQrGen' : 'Privacy Policy'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {kind === 'about' ? (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">PXQrGen</strong> is a
              precision QR code creation studio built for developers, merchants, creators, and teams.
            </p>
            <p>
              It supports 15 structured payload formats—including standard Indian UPI payment
              requests, Wi-Fi network credentials, vCard 3.0 contacts, messaging links, and
              geolocation coordinates—paired with vector-grade module styling and scan reliability
              checks.
            </p>
            <p>
              Every QR code is rendered directly in your browser using deterministic encoding and
              high-resolution canvas/SVG export pipelines.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                100% Client-Side Generation:
              </strong>{' '}
              PXQrGen generates, styles, and exports all QR codes locally inside your browser.
            </p>
            <p>
              Sensitive inputs such as UPI IDs, Wi-Fi passwords, phone numbers, contact vCards, and
              uploaded center logos never leave your device and are never transmitted to or stored
              on external servers.
            </p>
            <p>
              Only your dark/light theme preference is saved locally in browser storage. Payment QR
              codes encode standard <code className="font-mono text-xs">upi://pay</code> request
              URIs; PXQrGen does not initiate, process, or track financial transactions.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
