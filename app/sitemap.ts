import type { MetadataRoute } from 'next';

import {
  BASE_PATH,
  BASE_URL,
  EXTERNAL_LINKS_SITEMAP,
} from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;
// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
// Next.js Sitemap Generation doesn't support `alternate` refs yet
// @see https://github.com/vercel/next.js/discussions/55646
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths: Array<string> = [];

  const routes = await dynamicRouter.getRoutesByLanguage();
  paths.push(...routes.map(route => `${baseUrlAndPath}/${route}`));

  const currentDate = new Date().toISOString();

  return [...paths, ...EXTERNAL_LINKS_SITEMAP].map(route => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: 'always',
  }));
}

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';
