import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import styles from '@/layouts/layouts.module.css';

import Button from '@/components/Common/Button';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiGithub, SiHono } from 'react-icons/si';

export default async function Page() {
  return (
    <>
      <WithNavBar />

      <div className={styles.blogLayout}>
        <main>
          <header>
            <h1 className="w-full items-center justify-between text-center text-4xl">
              January template and starters projects
            </h1>
            <p className="mt-2 text-center text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Jumpstart Your API Development with January's Templates and
              Starters
            </p>
          </header>
          <ul className="my-8 list-none">
            <li
              className="grid items-center justify-between gap-x-4"
              style={{
                gridTemplateColumns: 'minmax(0, 1fr) max-content',
              }}
            >
              <div>
                <div className="mb-2 flex gap-x-2">
                  <BiLogoPostgresql size={24} className="text-[#2f6792]" />
                  <SiGithub size={24} />
                  <SiHono size={24} />
                </div>
                <h4>Product roadmap API inspired by Posthog roadmap page.</h4>
                <p className="mt-1 text-sm text-neutral-800 dark:text-neutral-200">
                  Create user-facing product roadmap API similar to Posthog's
                  through Github issues and labels.
                </p>
              </div>
              <div className="flex-1">
                <Button>Use project</Button>
              </div>
            </li>
            <hr className="my-6"></hr>
          </ul>
        </main>
      </div>

      <WithFooter />
    </>
  );
}
