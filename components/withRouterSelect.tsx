'use client';

import type { ComponentProps, FC } from 'react';

import Select from '@/components/Common/Select';
import { useRouter } from 'next/navigation';

type WithSidebarSelectProps = Pick<
  ComponentProps<typeof Select>,
  'values' | 'defaultValue' | 'label'
>;

const WithRouterSelect: FC<WithSidebarSelectProps> = ({
  values,
  label,
  defaultValue,
}) => {
  const { push } = useRouter();

  return (
    <Select
      inline={true}
      label={label}
      values={values}
      defaultValue={defaultValue}
      onChange={value => push(value)}
    />
  );
};

export default WithRouterSelect;
