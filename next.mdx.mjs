'use strict';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';

import { nodeTypes } from '@mdx-js/mdx';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExpressiveCode from 'rehype-expressive-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'remark-reading-time';

/**
 * Provides all our Rehype Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export function NEXT_REHYPE_PLUGINS(props = { hideCopyButton: false }) {
  return [
    // Allows for raw HTML to be used in MDX
    [rehypeRaw, { passThrough: nodeTypes }],

    // [[rehypeMermaid, { strategy: 'img-svg', dark: true }]],
    // Generates `id` attributes for headings (H1, ...)
    rehypeSlug,
    // Automatically add anchor links to headings (H1, ...)
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    // Transforms sequential code elements into code tabs and
    // [
    //   rehypeShiki,
    //   {
    //     themes: {
    //       light: 'nord',
    //       dark: 'nord',
    //     },
    //   },
    // ],
    // [
    //   rehypeExpressiveCode,
    //   {
    //     themes: ['nord'],
    //     logger: console,
    //     frames: {
    //       showCopyToClipboardButton: !props.hideCopyButton,
    //       extractFileNameFromCode: false,
    //     },
    //     styleOverrides: {
    //       frames: {
    //         frameBoxShadowCssValue: '0 0 0 0',
    //       },
    //       borderColor: 'hsl(var(--border))',
    //       codeFontFamily: 'var(--font-mono)',
    //       codeBackground: 'rgb(13 18 28)',
    //       uiFontFamily: 'var(--font-mono)',
    //       borderWidth: '1px',
    //       borderRadius: '0.0rem',
    //       codePaddingInline: '0.75rem',
    //       codePaddingBlock: '0.75rem',
    //     },
    //   },
    // ],
  ];
}

/**
 * Provides all our Remark Plugins that are used within MDX
 *
 * @type {Array<import('unified').Plugin>}
 */
export const NEXT_REMARK_PLUGINS = [remarkGfm, remarkHeadings, readingTime];
