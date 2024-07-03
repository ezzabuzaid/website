import type { HTMLAttributeAnchorTarget } from 'react';

import { siteNavigation } from '@/next.json.mjs';
import type { NavigationEntry, NavigationKeys } from '@/types';
import type { FormattedMessage } from '@/types/i18n';

type Navigation = Record<string, NavigationEntry>;

interface MappedNavigationEntry {
  items: Array<[string, MappedNavigationEntry]>;
  label: FormattedMessage;
  link: string;
  target?: HTMLAttributeAnchorTarget | undefined;
}

const useSiteNavigation = () => {
  const mapNavigationEntries = (entries: Navigation) => {
    return Object.entries(entries).map(
      ([key, { label, link, items, target }]): [
        string,
        MappedNavigationEntry,
      ] => [
        key,
        {
          target,
          label: label ? label : '',
          link: link ?? '',
          items: items ? mapNavigationEntries(items) : [],
        },
      ]
    );
  };

  const getSideNavigation = (keys: Array<NavigationKeys>) => {
    const navigationEntries: Navigation = keys.reduce(
      (acc, key) => ({ ...acc, [key]: siteNavigation.sideNavigation[key] }),
      {}
    );
    return mapNavigationEntries(navigationEntries);
  };

  const navigationItems = mapNavigationEntries(siteNavigation.topNavigation);

  return { getSideNavigation, navigationItems };
};

export default useSiteNavigation;
