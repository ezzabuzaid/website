import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/layouts/Base';
import { VERCEL_ENV } from '@/next.constants.mjs';
import { FIRA_CODE, OPEN_SANS, Merriweather_SANS } from '@/next.fonts';
import { availableLocalesMap, defaultLocale } from '@/next.locales.mjs';
import { LocaleProvider } from '@/providers/localeProvider';
import { ThemeProvider } from '@/providers/themeProvider';

import '@/styles/index.css';

const fontClasses = classNames(
  FIRA_CODE.variable,
  OPEN_SANS.variable,
  Merriweather_SANS.variable
);

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getLocale();

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;

  return (
    <html className={fontClasses} dir={langDir} lang={hrefLang}>
      <body suppressHydrationWarning>
        <LocaleProvider>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </LocaleProvider>

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
