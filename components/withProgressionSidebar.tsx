'use client';

import type { FC } from 'react';

import ProgressionSidebar from '@/components/Common/ProgressionSidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithProgressionSidebarProps = {
  navKey: NavigationKeys;
};

const WithProgressionSidebar: FC<WithProgressionSidebarProps> = ({
  navKey,
}) => {
  const { getSideNavigation } = useSiteNavigation();

  const [[, sidebarNavigation]] = getSideNavigation([navKey]);

  const mappedProgressionSidebarItems = sidebarNavigation.items.map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return <ProgressionSidebar groups={mappedProgressionSidebarItems} />;
};

export default WithProgressionSidebar;
