'use client';

import type { FC } from 'react';

import { RssIcon } from '@heroicons/react/24/solid';

import Link from '@/components/Link';
import { siteConfig } from '@/next.json.mjs';

import styles from './index.module.css';

type BlogHeaderProps = {
  category: string;
};

const BlogHeader: FC<BlogHeaderProps> = ({ category }) => {
  const currentFile =
    siteConfig.rssFeeds.find(item => item.category === category)?.file ??
    'blog.xml';

  return (
    <header className={styles.blogHeader}>
      <h1>
        Blog
        <Link href={`/feed/${currentFile}`} aria-label={'RSS feed'}>
          <RssIcon />
        </Link>
      </h1>
      <p>The latest Node.js news, case studies, tutorials, and resources.</p>
    </header>
  );
};

export default BlogHeader;
