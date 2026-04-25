/**
 * Web hub callout for the Expo companion app (FR-011, T054).
 * Deep link must stay aligned with `apps/mobile/app.json` scheme and `content/demos.json` slugs.
 */
const DEFAULT_DEEP_LINK = 'portfolio://demo/hello';
const QR_SERVICE = (data) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(data)}`;

export function MobileDemoCallout({ deepLink = DEFAULT_DEEP_LINK }) {
  const qrSrc = QR_SERVICE(deepLink);

  return (
    <section
      className="mt-14 rounded-2xl border border-apple-border-soft bg-apple-gray/70 px-6 py-8 md:px-10 md:py-10"
      aria-labelledby="mobile-demo-heading"
    >
      <h2 id="mobile-demo-heading" className="text-xl font-semibold tracking-tight text-apple-ink">
        Mobile companion (Expo Go)
      </h2>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-apple-gray-secondary">
        Run the handheld showcase without an app store build: install{' '}
        <a
          className="font-medium text-apple-link hover:underline"
          href="https://expo.dev/go"
          rel="noreferrer"
          target="_blank"
        >
          Expo Go
        </a>
        , then from the repo run <code className="text-apple-ink">cd apps/mobile</code> and{' '}
        <code className="text-apple-ink">npx expo start</code>. Scan the QR code in the terminal with Expo Go (LAN tunnel
        works off the same Wi-Fi).
      </p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-text-1">
        <li>Open Expo Go on your phone.</li>
        <li>Start Metro from <code className="text-sm">apps/mobile</code> and scan the project QR.</li>
        <li>
          Optional: open the deep link below to jump straight into the flagship screen with slug{' '}
          <code className="text-sm">hello</code>.
        </li>
      </ol>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="shrink-0 rounded-xl border border-apple-border-soft bg-apple-white p-3 shadow-sm">
          <img
            src={qrSrc}
            width={160}
            height={160}
            className="block"
            alt="QR code that encodes the portfolio mobile deep link"
            decoding="async"
            loading="lazy"
          />
          <p className="mt-2 max-w-[10rem] text-center text-xs text-apple-gray-secondary">QR encodes the deep link URL</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-apple-gray-secondary">Deep link</p>
          <code className="mt-2 block overflow-x-auto rounded-lg border border-apple-border-soft bg-apple-white px-3 py-2 text-sm text-apple-ink">
            {deepLink}
          </code>
          <p className="mt-3 text-xs text-apple-gray-secondary">
            Scheme <code className="text-apple-ink">portfolio</code> matches <code className="text-apple-ink">app.json</code>{' '}
            and paths <code className="text-apple-ink">demo/&lt;slug&gt;</code> match web demo slugs in{' '}
            <code className="text-apple-ink">content/demos.json</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
