'use client';

import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from '@/components/Common/Button';
import type { NodeRelease } from '@/types';

import styles from './index.module.css';

type DownloadButtonProps = { release: NodeRelease };

const DownloadButton: FC<PropsWithChildren<DownloadButtonProps>> = ({
  children,
}) => {
  return (
    <>
      <Button
        kind="special"
        href={'https://app.january.sh'}
        className={classNames(styles.downloadButton, styles.special)}
      >
        {children}
      </Button>

      <Button
        kind="primary"
        href={'https://app.january.sh'}
        className={classNames(styles.downloadButton, styles.primary)}
      >
        {children}
      </Button>
    </>
  );
};

export default DownloadButton;
