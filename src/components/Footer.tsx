import type { ModalKind } from './InfoModal';

interface FooterProps {
  onOpenModal: (kind: ModalKind) => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#09090B]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
            PXQrGen
          </span>
          <span aria-hidden="true">·</span>
          <span>Client-side QR Code Studio</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">© {new Date().getFullYear()}</span>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400"
        >
          <button
            type="button"
            onClick={() => onOpenModal('about')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onOpenModal('privacy')}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
