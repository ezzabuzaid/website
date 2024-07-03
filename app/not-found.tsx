'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import CenteredLayout from '@/layouts/Centered';

const NotFoundPage: FC = () => {
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main>
        404
        <h1 className="special -mt-4">Page could not be found</h1>
        <div className="my-4 flex items-center justify-center">
          <Image
            src="/static/images/node-mascot.svg"
            alt="The Node.js mascot"
            height={114.69}
            width={100}
          />
        </div>
        <p className="-mt-4 max-w-sm text-center text-lg">
          Sorry, we couldn't find the page you're after! Try starting again from
          the homepage.
        </p>
        <Button href="/">
          Back to Home
          <ArrowRightIcon />
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default NotFoundPage;
