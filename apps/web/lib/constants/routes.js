/** Canonical marketing + demo paths (no magic strings in nav). */
/** @param {string} slug */
export function routeProject(slug) {
  return `/projects/${slug}`;
}

/** @param {string} slug */
export function routeBlogPost(slug) {
  return `/blog/${slug}`;
}

/** @param {string} gameId */
export function routeGame(gameId) {
  return `/games/${gameId}`;
}

export const ROUTES = {
  home: '/',
  projects: '/projects',
  resume: '/resume',
  achievements: '/achievements',
  about: '/about',
  mentoring: '/mentoring',
  interests: '/interests',
  blog: '/blog',
  adventures: '/adventures',
  games: '/games',
  mobile: '/mobile',
  links: '/links',
  contact: '/contact',
  demos: '/demos',
};

export const NAV_ITEMS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.projects, label: 'Projects' },
  { href: ROUTES.resume, label: 'Resume' },
  { href: ROUTES.achievements, label: 'Achievements' },
  { href: ROUTES.about, label: 'About' },
  { href: ROUTES.mentoring, label: 'Mentoring' },
  { href: ROUTES.interests, label: 'Interests' },
  { href: ROUTES.blog, label: 'Blog' },
  { href: ROUTES.adventures, label: 'Life' },
  { href: ROUTES.games, label: 'Games' },
  { href: ROUTES.mobile, label: 'Mobile' },
  { href: ROUTES.links, label: 'Links' },
  { href: ROUTES.contact, label: 'Contact' },
  { href: ROUTES.demos, label: 'Demos' },
];
