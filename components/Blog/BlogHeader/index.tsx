'use client';

import type { FC } from 'react';

import { RssIcon } from '@heroicons/react/24/solid';

import Link from '@/components/Link';
import { siteConfig } from '@/next.json.mjs';

type BlogHeaderProps = {
  category: string;
};

const BlogHeader: FC<BlogHeaderProps> = ({ category }) => {
  const currentFile =
    siteConfig.rssFeeds.find(item => item.category === category)?.file ??
    'posts.xml';

  return (
    <header>
      <h1 className="inline-flex w-full items-center justify-between">
        Blog
        <Link
          className="inline-flex size-9 items-center justify-center rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          href={`/feed/${currentFile}`}
          aria-label={'RSS feed'}
        >
          <RssIcon className="size-6 text-neutral-500" />
        </Link>
      </h1>
      <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
        The latest Node.js news, case studies, tutorials, and resources.
      </p>
    </header>
  );
};

export default BlogHeader;
