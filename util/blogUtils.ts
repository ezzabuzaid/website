import { authors as authorsMap } from '@/next.json.mjs';
import type { BlogPreviewType } from '@/types';

import { getGitHubAvatarUrl } from './gitHubUtils';

export const mapBlogCategoryToPreviewType = (type: string): BlogPreviewType => {
  switch (type) {
    case 'announcements':
    case 'javascript-bites':
    case 'whats-new':
      return type;
    case 'events':
      return 'announcements';
    default:
      return 'announcements';
  }
};

export const mapAuthorToCardAuthors = (author: string) => {
  const authors = author.split(/, | and |;| & | prepared by | by /i);

  return authors.map(fullName => {
    let src = `https://ui-avatars.com/api/?name=${fullName}`;

    if (authorsMap[fullName]) src = getGitHubAvatarUrl(authorsMap[fullName].id);

    return { fullName, src };
  });
};
