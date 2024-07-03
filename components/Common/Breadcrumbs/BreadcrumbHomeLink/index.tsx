import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import type { ComponentProps, FC } from 'react';

import BreadcrumbLink from '@/components/Common/Breadcrumbs/BreadcrumbLink';

import styles from './index.module.css';

type BreadcrumbHomeLinkProps = Omit<
  ComponentProps<typeof BreadcrumbLink>,
  'href'
> &
  Partial<Pick<ComponentProps<typeof BreadcrumbLink>, 'href'>>;

const BreadcrumbHomeLink: FC<BreadcrumbHomeLinkProps> = ({
  href = '/',
  ...props
}) => {
  return (
    <BreadcrumbLink href={href} aria-label={'Navigate to Home'} {...props}>
      <HomeIcon
        title={'Navigate to Home'}
        aria-label={'Navigate to Home'}
        className={styles.icon}
      />
    </BreadcrumbLink>
  );
};

export default BreadcrumbHomeLink;
