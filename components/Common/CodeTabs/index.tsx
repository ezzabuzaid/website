import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

import Tabs from '@/components/Common/Tabs';

import styles from './index.module.css';

type CodeTabsProps = Pick<
  ComponentProps<typeof Tabs>,
  'tabs' | 'defaultValue'
> & {
  hint?: string;
  tabsListClassName?: string;
};

const CodeTabs: FC<PropsWithChildren<CodeTabsProps>> = ({
  children,
  hint,
  tabsListClassName,
  ...props
}) => (
  <Tabs
    {...props}
    className={classNames(styles.root)}
    triggerClassName={styles.trigger}
    tabsListClassName={tabsListClassName}
    addons={
      hint && (
        <p className={styles.link}>
          {hint}
          <ArrowUpRightIcon className={styles.icon} />
        </p>
      )
    }
  >
    {children}
  </Tabs>
);

export default CodeTabs;
