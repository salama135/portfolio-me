/** @type {import('next').NextConfig} */
/** Portfolio app: no server database; Netlify deploy from monorepo root (see netlify.toml). */
const nextConfig = {
  reactCompiler: true,
  transpilePackages: ['three'],
  // standalone private demo pages are read from disk by a route handler, so ship them with it
  outputFileTracingIncludes: {
    '/demos/private/[slug]/raw': ['./private-demos/**/*.html', './content/private-demos.json'],
    '/demos/private/[slug]': ['./private-demos/**/*.html', './content/private-demos.json'],
    '/demos/private': ['./content/private-demos.json'],
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

export default nextConfig;
