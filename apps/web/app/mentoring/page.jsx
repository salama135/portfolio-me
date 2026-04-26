import Link from 'next/link';
import { ContentEmptyState } from '../../components/content-empty-state.jsx';
import { ROUTES } from '../../lib/constants/routes.js';
import { loadMentoring } from '../../lib/content/load/mentoring.js';

export const metadata = {
  title: 'Mentoring',
  description: 'Teaching, office hours, and how I mentor engineers.',
};

const SESSION_COPY = {
  one_to_one: { title: 'One to one', blurb: 'Focused time on your goals, code, or career narrative.' },
  group: { title: 'Group sessions', blurb: 'Small cohorts for clinics, portfolio review, or interview prep.' },
};

export default async function MentoringPage() {
  const mentoring = await loadMentoring();

  if (!mentoring) {
    return (
      <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
        <h1 className="text-apple-ink">Mentoring</h1>
        <div className="mt-10 max-w-[56rem]">
          <ContentEmptyState
            title="Mentoring content is not configured"
            description="Add content/mentoring.json with sessionTypes, audience, bookingUrl (https), optional calendarEmbedUrl, and testimonials. See the mentoring schema in lib/content/schemas/mentoring.js."
          />
        </div>
      </div>
    );
  }

  const { headline, body, sessionTypes, audience, durationSummary, bookingUrl, calendarEmbedUrl, testimonials } =
    mentoring;

  return (
    <div className="page-shell-wide py-[clamp(2.5rem,6vw,4rem)]">
      <div className="max-w-[70ch]">
        <h1 className="text-apple-ink">{headline ?? 'Mentoring'}</h1>
        {body ? (
          <p className="mt-5 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">{body}</p>
        ) : (
          <p className="mt-5 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
            I teach the way I build: start from a runnable baseline, add constraints one at a time, and keep feedback loops
            short.
          </p>
        )}
      </div>

      <section className="mt-14 max-w-[min(56rem,100%)]" aria-labelledby="session-types-heading">
        <h2 id="session-types-heading" className="text-xl font-semibold text-apple-ink">
          Session types
        </h2>
        <ul className="mt-6 grid list-none gap-5 p-0 sm:grid-cols-2">
          {sessionTypes.map((t) => {
            const copy = SESSION_COPY[t];
            return (
              <li
                key={t}
                className="rounded-2xl border border-apple-border-soft bg-apple-white px-6 py-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-lg font-semibold text-apple-ink">{copy.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-1">{copy.blurb}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14 max-w-[70ch]" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="text-xl font-semibold text-apple-ink">
          Who this is for
        </h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">{audience}</p>
        {durationSummary ? (
          <p className="mt-4 text-[15px] leading-relaxed text-apple-gray-secondary">{durationSummary}</p>
        ) : null}
      </section>

      <section className="mt-14 max-w-[min(56rem,100%)]" aria-labelledby="book-heading">
        <h2 id="book-heading" className="text-xl font-semibold text-apple-ink">
          Book time
        </h2>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-apple-gray-secondary">
          Prefer the scheduler below when it loads; otherwise use the booking link (opens in a new tab).
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={bookingUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            rel="noreferrer"
            target="_blank"
          >
            Open booking page
          </a>
          <Link
            href={ROUTES.contact}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-apple-border-mid bg-apple-gray/50 px-6 py-2.5 text-sm font-semibold text-apple-ink no-underline transition-colors hover:bg-apple-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Contact
          </Link>
        </div>
        {calendarEmbedUrl ? (
          <div className="mt-10 space-y-3">
            <div className="overflow-hidden rounded-2xl border border-apple-border-soft bg-apple-gray/30">
              <iframe
                title="Availability calendar"
                src={calendarEmbedUrl}
                className="h-[min(32rem,70vh)] w-full bg-apple-white"
                loading="lazy"
              />
            </div>
            <p className="max-w-[62ch] text-[13px] leading-relaxed text-apple-gray-secondary">
              Replace <code>calendarEmbedUrl</code> in <code>content/mentoring.json</code> with your own public Google Calendar
              embed <code>src</code> when you are ready. The sample above may show a public holiday feed so the iframe is not
              empty.
            </p>
          </div>
        ) : null}
      </section>

      {testimonials.length > 0 ? (
        <section className="mt-16 max-w-[min(56rem,100%)]" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="text-xl font-semibold text-apple-ink">
            What people say
          </h2>
          <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <li
                key={`${t.name}-${i}`}
                className="rounded-2xl border border-apple-border-soft bg-apple-gray/25 px-6 py-6 text-[17px] leading-relaxed text-text-1"
              >
                <blockquote className="m-0 border-0 p-0">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-4 text-sm font-semibold text-apple-ink">
                  {t.name}
                  {t.context ? <span className="font-normal text-apple-gray-secondary"> · {t.context}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-16 max-w-[62ch] text-[15px] leading-relaxed text-apple-gray-secondary">
        For hiring managers: instruction experience maps to senior IC work (curriculum as product, labs as reliability,
        grading as operations). See also <Link href={ROUTES.resume}>Resume</Link> and <Link href={ROUTES.about}>About</Link>.
      </p>
    </div>
  );
}
