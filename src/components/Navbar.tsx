import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onQuickSelectUpi: () => void;
  onJumpToWorkspace: () => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  onQuickSelectUpi,
  onJumpToWorkspace,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090B]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-indigo-600 dark:text-indigo-400"
          >
            <rect x="2" y="2" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="2.2" />
            <rect x="4.75" y="4.75" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
            <rect x="14" y="2" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="2.2" />
            <rect x="16.75" y="4.75" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
            <rect x="2" y="14" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="2.2" />
            <rect x="4.75" y="16.75" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
            <rect x="14" y="14" width="3.2" height="3.2" rx="0.75" fill="currentColor" />
            <rect x="18.8" y="14" width="3.2" height="3.2" rx="0.75" fill="currentColor" />
            <rect x="14" y="18.8" width="3.2" height="3.2" rx="0.75" fill="currentColor" />
            <rect x="18.8" y="18.8" width="3.2" height="3.2" rx="1.6" fill="currentColor" />
          </svg>
          <span className="font-display">PXQrGen</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          <a
            href="#workspace"
            onClick={onJumpToWorkspace}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Generator
          </a>
          <button
            type="button"
            onClick={onQuickSelectUpi}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            UPI Payments
          </button>
          <a
            href="#customization"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Customization
          </a>
          <a
            href="#features"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Capabilities
          </a>
        </nav>

        {/* Zone 3: Theme switcher + primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#workspace"
            onClick={onJumpToWorkspace}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            Create QR
          </a>
        </div>
      </div>
    </header>
  );
}
