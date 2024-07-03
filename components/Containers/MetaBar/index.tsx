import type { Heading } from '@vcarl/remark-headings';
import type { FC } from 'react';
import { Fragment, useMemo } from 'react';

import Link from '@/components/Link';

import styles from './index.module.css';

type MetaBarProps = {
  items: Record<string, React.ReactNode>;
  headings?: {
    items: Array<Heading>;
    minDepth?: number;
  };
};

const MetaBar: FC<MetaBarProps> = ({ items, headings }) => {
  // The default depth of headings to display in the table of contents.
  const { minDepth = 2, items: headingItems = [] } = headings || {};

  const heading = useMemo(
    () => headingItems.filter(({ depth }) => depth >= minDepth && depth <= 4),
    [minDepth, headingItems]
  );

  return (
    <div className={styles.wrapper}>
      <dl>
        {Object.entries(items)
          .filter(([, value]) => !!value)
          .map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}

        {heading.length > 0 && (
          <>
            <dt>Table of Contents</dt>
            <dd>
              <ol>
                {heading.map(head => (
                  <li key={head.value}>
                    <Link href={`#${head?.data?.id}`}>{head.value}</Link>
                  </li>
                ))}
              </ol>
            </dd>
          </>
        )}
      </dl>
    </div>
  );
};

export default MetaBar;
