'use strict';

import Button from './components/Common/Button';

import WithBadge from './components/withBadge';
import WithBanner from './components/withBanner';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const mdxComponents = {
  WithBanner: WithBanner,
  WithBadge: WithBadge,
  Button: Button,
};
