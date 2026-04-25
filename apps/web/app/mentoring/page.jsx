export const metadata = {
  title: 'Mentoring',
  description: 'Teaching, office hours, and how I mentor engineers.',
};

export default function MentoringPage() {
  return (
    <div className="page-shell py-[clamp(2.5rem,6vw,4rem)]">
      <h1>Mentoring</h1>
      <p className="mt-5 max-w-[62ch] text-pretty text-[17px] leading-[1.47] text-text-1">
        I teach the way I build: start from a runnable baseline, add constraints one at a time, and keep feedback loops short.
      </p>

      <section className="mt-12 max-w-[62ch]">
        <h2 className="text-xl font-semibold text-apple-ink">What students get</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[17px] leading-[1.47] text-text-1">
          <li>Project templates with diagnostics, not magic folders they cannot open.</li>
          <li>Rubrics tied to observable outcomes (builds, tests, accessibility checks).</li>
          <li>Office hours that end with a written next step, not just encouragement.</li>
        </ul>
      </section>

      <section className="mt-12 max-w-[62ch]">
        <h2 className="text-xl font-semibold text-apple-ink">For hiring managers</h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-text-1">
          Instruction experience maps directly to senior IC work: curriculum is product sense, labs are reliability practice, and
          grading at scale is operational rigor.
        </p>
      </section>
    </div>
  );
}
