import type { FC } from 'react';

import Sidebar from '@/components/Containers/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys } from '@/types';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys }) => {
  const { getSideNavigation } = useSiteNavigation();

  const mappedSidebarItems = getSideNavigation(navKeys).map(
    ([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    })
  );

  return <Sidebar groups={mappedSidebarItems} />;
};

export default WithSidebar;
