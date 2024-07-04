import type { BlogPreviewType } from '@/types';


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
