import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

import dynamic from 'next/dynamic';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from '@/next.mdx.mjs';
import { combinedComponents } from './mdxRenderer';

const MDXRemote = dynamic(() =>
  import('next-mdx-remote/rsc').then(mod => mod.MDXRemote)
);

export const Mdx = async (props: {
  source: string;
  hideCopyButton?: boolean;
  components?: MDXRemoteProps['components'];
}) => {
  return (
    <MDXRemote
      options={{
        mdxOptions: {
          rehypePlugins: NEXT_REHYPE_PLUGINS({ hideCopyButton: true }) as never,
          remarkPlugins: NEXT_REMARK_PLUGINS,
        },
      }}
      components={
        props.components ?? {
          ...combinedComponents,
          h1: () => <></>,
          h2: () => <></>,
          pre: ({ children }) => <pre>{children}</pre>,
        }
      }
      source={props.source}
    />
  );
};
