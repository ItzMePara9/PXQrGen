const HIGHLIGHTS = [
  {
    index: '01.',
    title: 'Standards-Compliant Payloads',
    detail:
      'Generates clean upi://pay URIs with VPA, payee name, INR amount, and transaction notes alongside RFC-compliant vCard 3.0 and Wi-Fi strings.',
  },
  {
    index: '02.',
    title: 'Precision Vector & Module Styling',
    detail:
      'Customize six data module geometries, independent eye corner shapes, linear or radial gradients, and embedded center logos.',
  },
  {
    index: '03.',
    title: 'Automated Scan Guardrails',
    detail:
      'Live contrast ratio verification and automatic error-correction alerts ensure custom colors and logos remain readable by phone cameras.',
  },
  {
    index: '04.',
    title: 'Print-Ready Multi-Format Export',
    detail:
      'Export crisp SVGs for design tools, A4 print sheets as PDFs, or high-resolution PNG and JPG assets up to 4096px directly from your browser.',
  },
];

export function FeatureHighlights() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl font-display">
          Engineered for reliable scanning and clean presentation
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          Every code is generated locally in your browser with zero server round-trips,
          keeping Wi-Fi credentials, UPI handles, and contact details private.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.index}
            className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#111114]"
          >
            <div>
              <div className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {item.index}
              </div>
              <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-100 font-display">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
