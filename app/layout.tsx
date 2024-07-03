import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/layouts/Base';
import { VERCEL_ENV } from '@/next.constants.mjs';
import { FIRA_CODE, Merriweather_SANS, OPEN_SANS } from '@/next.fonts';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/index.css';

const fontClasses = classNames(
  FIRA_CODE.variable,
  OPEN_SANS.variable,
  Merriweather_SANS.variable
);

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html className={fontClasses} dir={'ltr'} lang={'en-GB'}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>

        {VERCEL_ENV && (
          <>
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
