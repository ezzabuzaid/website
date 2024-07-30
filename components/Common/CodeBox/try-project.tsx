'use client';

import Button from '@/components/Common/Button';

import { cn } from '@/components/Common/shadcn/cn';
import styles from './index.module.css';

export function TryProject(props: { children: React.ReactNode; gist: string }) {
  return (
    <div className={cn(styles.root, '!rounded-t-none !border-t-0')}>
      <div
        className={cn(styles.footer, '!grid gap-x-4 !border-t-0')}
        style={{
          gridTemplateColumns: 'minmax(0, 1fr) max-content',
          alignItems: 'normal',
        }}
      >
        <span className={styles.language}>{props.children}</span>

        {
          <Button
            kind="neutral"
            className={styles.action}
            onClick={async () => {
              if (!props.gist) {
                return;
              }
              location.href =
                process.env.NODE_ENV === 'development'
                  ? `http://localhost:1234?gist=${props.gist}`
                  : `https://app.january.sh?gist=${props.gist}`;
            }}
          >
            Try Project
          </Button>
        }
      </div>
    </div>
  );
}
