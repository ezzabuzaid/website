import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';

export const useMessages = () => ({});

export const useNow = () => new Date();

export const useTimeZone = () => 'Etc/UTC';

export const useFormatter = () => {
  const formatter = format => new Intl.DateTimeFormat('en-US', format);

  return {
    date: (date, format) => formatter(format).format(new Date(date)),
    dateTime: (date, format) => formatter(format).format(new Date(date)),
  };
};

export const NextIntlClientProvider = ({ children }) => children;

export const createSharedPathnamesNavigation = () => ({
  Link: Link,
  redirect: redirect,
  usePathname: usePathname,
  useRouter: useRouter,
});
