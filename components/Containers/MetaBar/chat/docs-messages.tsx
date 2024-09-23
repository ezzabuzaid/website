'use client';

import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from '@/next.mdx.mjs';
// import type { EvaluateOptions } from '@mdx-js/mdx';
import Markdown from 'react-markdown';
// import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

// type Runtime = Pick<EvaluateOptions, 'jsx' | 'jsxs' | 'Fragment'>;

// const runtime = { jsx, jsxs, Fragment } as Runtime;

export function AssistantMessage(props: { message: string }) {
  // const data = useAsync(
  //   () =>
  //     evaluate(props.message, {
  //       ...runtime,
  //       rehypePlugins: rehypePlugins({ hideCopyButton: true }),
  //     }),
  //   [props.message],
  // );
  // return (
  //   <div className="border-l pl-4 text-sm">
  //     {data.value && (
  //       <data.value.default
  //         components={{
  //           h1: ({ children }) => <></>,
  //           h2: ({ children }) => <></>,
  //         }}
  //       />
  //     )}
  //   </div>
  // );
  return (
    <Markdown
      rehypePlugins={NEXT_REHYPE_PLUGINS({ hideCopyButton: true }) as never}
      remarkPlugins={NEXT_REMARK_PLUGINS}
    >
      {props.message}
    </Markdown>
  );
}

export function UserMessage({ message }: { message: string }) {
  return (
    <div className="bg-backgroundsticky top-0 z-10 block  py-4 text-sm font-semibold text-[#204300]">
      {message}
    </div>
  );
}
