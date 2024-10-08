import type { FC } from 'react';

import FormattedTime from '@/components/Common/FormattedTime';
import Preview from '@/components/Common/Preview';
import Link from '@/components/Link';
import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

import styles from './index.module.css';

// @todo: this should probably be a global type?
type Author = { fullName: string; src: string };

type BlogPostCardProps = {
  title: string;
  category: string;
  description?: string;
  authors?: Array<Author>;
  date?: Date;
  slug?: string;
};

const categories: Record<string, string> = {
  all: 'Everything',
  announcements: 'Announcements',
  release: 'Releases',
  'javascript-bites': 'JavaScript Bites',
  journal: 'Journal',
  'whats-new': "What's new",
  'advisory-board': 'Advisory Board',
  community: 'Community',
  feature: 'Feature',
  module: 'Module',
  npm: 'npm',
  uncategorized: 'Uncategorized',
  video: 'Video',
  weekly: 'Weekly Updates',
  wg: 'Working Groups',
  events: 'Events',
};

const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  slug,
  category,
  description,
  date,
}) => {
  const type = mapBlogCategoryToPreviewType(category);

  return (
    <article className={styles.container}>
      <Link href={slug} aria-label={title}>
        <Preview title={title} type={type} />
      </Link>

      <Link href={`/posts/${category}`} className={styles.subtitle}>
        {categories[category]}
      </Link>

      <Link href={slug} className={styles.title}>
        {title}
      </Link>

      {description && <p className={styles.description}>{description}</p>}

      <footer className={styles.footer}>
        <div className={styles.author}>
          {date && <FormattedTime date={date} />}
        </div>
      </footer>
    </article>
  );
};

export default BlogPostCard;
