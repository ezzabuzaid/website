import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

import dynamic from 'next/dynamic';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from '@/next.mdx.mjs';

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
          h1: () => <></>,
          h2: () => <></>,
          pre: ({ children }) => (
            <pre
              style={
                {
                  '--ec-frm-frameBoxShdCssVal': '0 0 0 0',
                  '--ec-brdCol': 'hsl(var(--border))',
                  '--ec-brdRad': '0.0rem',
                  '--ec-frm-edBg': 'rgb(13 18 28)', //bg-natural-900
                } as React.CSSProperties
              }
            >
              {children}
            </pre>
          ),
        }
      }
      source={props.source}
    />
  );
};
