'use client';
import type { FC } from 'react';

import MetaBar from '@/components/Containers/MetaBar';
import { useClientContext } from '@/hooks/react-client';
import { DEFAULT_DATE_FORMAT } from './Common/FormattedTime';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter } = useClientContext();

  const lastUpdated = frontmatter.lastUpdated
    ? new Intl.DateTimeFormat('en-GB', DEFAULT_DATE_FORMAT).format(
        new Date(frontmatter.lastUpdated)
      )
    : '';

  return (
    <MetaBar
      items={{
        'Last Updated': lastUpdated,
        'Reading Time': readingTime.text,
      }}
      headings={{ items: headings }}
    />
  );
};

export default WithMetaBar;
