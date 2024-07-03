'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import CenteredLayout from '@/layouts/Centered';

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  console.error(error);
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main>
        500
        <h1 className="special -mt-4">Internal Server Error</h1>
        <p className="-mt-4 max-w-sm text-center text-lg">
          This page has thrown a non-recoverable error.
        </p>
        <Button href="/">
          Back to Home
          <ArrowRightIcon />
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default ErrorPage;
