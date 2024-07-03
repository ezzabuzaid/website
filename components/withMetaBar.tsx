'use client';
import type { FC } from 'react';

import AvatarGroup from '@/components/Common/AvatarGroup';
import MetaBar from '@/components/Containers/MetaBar';
import { useClientContext } from '@/hooks/react-client';
import useMediaQuery from '@/hooks/react-client/useMediaQuery';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';
import { getAcronymFromString } from '@/util/stringUtils';
import { DEFAULT_DATE_FORMAT } from './Common/FormattedTime';

const WithMetaBar: FC = () => {
  const { headings, readingTime, frontmatter } = useClientContext();

  const lastUpdated = frontmatter.lastUpdated
    ? new Intl.DateTimeFormat('en-GB', DEFAULT_DATE_FORMAT).format(
        new Date(frontmatter.lastUpdated)
      )
    : '';

  const usernames =
    frontmatter.authors?.split(',').map(author => author.trim()) ?? [];
  const avatars = usernames.map(username => ({
    src: getGitHubAvatarUrl(username),
    alt: getAcronymFromString(username),
  }));

  // Doing that because on mobile list on top of page and on desktop list on the right side
  const shortAvatarList = useMediaQuery(
    '(min-width: 670px) and (max-width: 1280px)'
  );

  return (
    <MetaBar
      items={{
        'Last Updated': lastUpdated,
        'Reading Time': readingTime.text,
        ...(avatars.length && {
          [`components.metabar.${avatars.length > 1 ? 'authors' : 'author'}`]: (
            <AvatarGroup avatars={avatars} limit={shortAvatarList ? 4 : 8} />
          ),
        }),
      }}
      headings={{ items: headings }}
    />
  );
};

export default WithMetaBar;
