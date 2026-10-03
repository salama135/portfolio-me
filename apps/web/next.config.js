/** @type {import('next').NextConfig} */
/** Portfolio app: no server database; Netlify deploy from monorepo root (see netlify.toml). */

// GitHub Pages: a static export served from /<repo>/ (see scripts/build-pages.mjs and .github/workflows/pages.yml)
const pagesBase = process.env.PAGES_BASE_PATH;
const pagesConfig =
  pagesBase !== undefined
    ? {
        output: 'export',
        basePath: pagesBase,
        trailingSlash: true,
        images: { unoptimized: true },
        env: { NEXT_PUBLIC_BASE_PATH: pagesBase },
      }
    : null;

const serverConfig = {
  reactCompiler: true,
  transpilePackages: ['three'],
  // standalone private demo pages are read from disk by a route handler, so ship them with it
  outputFileTracingIncludes: {
    '/demos/private/[slug]/raw': ['./private-demos/**/*.html', './content/private-demos.json'],
    '/demos/private/[slug]': ['./private-demos/**/*.html', './content/private-demos.json'],
    '/demos/private': ['./private-demos/**/*.html', './content/private-demos.json'],
    '/demos': ['./private-demos/**/*.html', './content/private-demos.json'],
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.netlify.com/frameworks/next-js/overview/',
        permanent: false,
      },
      {
        source: '/old-blog/:slug',
        destination: '/classics',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/netlify-templates/next-platform-starter',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/life',
        destination: '/adventures',
        permanent: true,
      },
    ];
  },
  
  rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/quotes/random',
      },
    ];
  },
};

// redirects, rewrites and file tracing need a server, so the static export drops them
const nextConfig = pagesConfig
  ? { reactCompiler: serverConfig.reactCompiler, transpilePackages: serverConfig.transpilePackages, ...pagesConfig }
  : serverConfig;

export default nextConfig;
