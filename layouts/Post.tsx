import type { FC, PropsWithChildren } from 'react';

import Preview from '@/components/Common/Preview';
import WithBlogCrossLinks from '@/components/withBlogCrossLinks';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import { useClientContext } from '@/hooks/react-server';
import ContentLayout from '@/layouts/Content';
import { mapBlogCategoryToPreviewType } from '@/util/blogUtils';

import styles from './layouts.module.css';
import Image from 'next/image';

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = useClientContext();

  const type = mapBlogCategoryToPreviewType(frontmatter.category);

  return (
    <>
      <WithNavBar />

      <ContentLayout>
        <div className={styles.postLayout}>
          <main className="prose">
            <h1 className="font-merriweather-sans">{frontmatter.title}</h1>
            {frontmatter.heroImage ? (
              <Image
                className="rounded"
                width={500}
                height={300}
                src={frontmatter.heroImage}
                alt={frontmatter.title}
              />
            ) : (
              <Preview title={frontmatter.title!} type={type} />
            )}
            <div className="rounded border p-4 font-semibold">
              We're building January, a comprehensive platform where you can
              build, integrate, test, and deploy, all in one place.{' '}
              <a href="https://dev.january.sh">
                Try it out for free in the playground
              </a>{' '}
              and have an API that you can share in seconds.{' '}
            </div>

            {children}
            <WithBlogCrossLinks />
            <div className="rounded border p-4">
              We're gathering insights around API development and looking
              forward for your contribution in{' '}
              <a href="https://tally.so/r/31KZAg">the survey</a>.
            </div>
          </main>
        </div>

        <WithMetaBar />
      </ContentLayout>

      <WithFooter />
    </>
  );
};

export default PostLayout;
