import {
  Fira_Code,
  IBM_Plex_Mono,
  Merriweather_Sans,
  Open_Sans,
} from 'next/font/google';

// This configures the Next.js Font for Open Sans
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const OPEN_SANS = Open_Sans({
  weight: ['300', '400', '600', '700'],
  display: 'fallback',
  subsets: ['latin'],
  variable: '--font-open-sans',
});

// This configures the Next.js Font for IBM Plex Mono
// We then export a variable and class name to be used
// within Tailwind (tailwind.config.ts) and Storybook (preview.js)
export const IBM_PLEX_MONO = IBM_Plex_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

export const FIRA_CODE = Fira_Code<'--font-fira-code'>({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: false,
});
export const Merriweather_SANS = Merriweather_Sans<'--font-merriweather-sans'>({
  variable: '--font-merriweather-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  preload: false,
});
