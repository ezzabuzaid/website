import type { FC } from 'react';

export const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
};

type FormattedTimeProps = {
  date: string | Date;
  format?: Intl.DateTimeFormatOptions;
};

const FormattedTime: FC<FormattedTimeProps> = ({ date, format }) => {
  const formatter = Intl.DateTimeFormat('en-GB', format ?? DEFAULT_DATE_FORMAT);

  const dateObject = new Date(date);

  return (
    <time dateTime={dateObject.toISOString()}>
      {formatter.format(dateObject)}
    </time>
  );
};

export default FormattedTime;
