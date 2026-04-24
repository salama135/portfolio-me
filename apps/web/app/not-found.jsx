import Link from 'next/link';
import { ROUTES } from '../lib/constants/routes.js';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-sm font-medium text-cyan-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-zinc-400">That route does not exist yet.</p>
      <Link
        href={ROUTES.home}
        className="mt-8 inline-block rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Back home
      </Link>
    </div>
  );
}
