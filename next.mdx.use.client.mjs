'use strict';

import Blockquote from './components/Common/Blockquote';
import Button from './components/Common/Button';
import Link from './components/Link';
import MDXCodeTabs from './components/MDX/CodeTabs';
import MDXImage from './components/MDX/Image';
import Mermaid from './components/MDX/Mermaid';

/**
 * A full list of React Components that we want to pass through to MDX
 *
 * @satisfies {import('mdx/types').MDXComponents}
 */
export const clientMdxComponents = {
  // Renders MDX CodeTabs
  CodeTabs: MDXCodeTabs,
  // Renders a Button Component for `button` tags
  Button: Button,
  Mermaid: Mermaid,
};

/**
 * A full list of wired HTML elements into custom React Components
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const htmlComponents = {
  // Renders a Link Component for `a` tags
  a: Link,
  // Renders a Blockquote Component for `blockquote` tags
  blockquote: Blockquote,
  // Renders an Image Component for `img` tags
  img: MDXImage,
};
