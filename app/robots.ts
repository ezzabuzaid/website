import type { MetadataRoute } from 'next';

// This allows us to generate a `robots.txt` file dynamically based on the needs of the Node.js Website
// @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
const robots = (): MetadataRoute.Robots => ({
  host: 'https://january.sh',
  sitemap: 'https://january.sh/sitemap.xml',
  rules: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/api',
        '/_next/',
        '/_app/',
        '/_error/',
        '/*.js$',
        '/*.webmanifest$',
      ],
    },
  ],
});

export default robots;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
