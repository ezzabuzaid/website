import type { FC, PropsWithChildren } from 'react';

import WithBreadcrumbs from '@/components/withBreadcrumbs';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithSidebar from '@/components/withSidebar';
import ArticleLayout from '@/layouts/Article';

const AboutLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSidebar navKeys={['about']} />

      <div>
        <main>{children}</main>

        <WithMetaBar />
      </div>

      <WithBreadcrumbs navKeys={['about']} />
    </ArticleLayout>
  </>
);

export default AboutLayout;
