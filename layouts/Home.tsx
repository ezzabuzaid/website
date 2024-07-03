/* eslint-disable import/no-unresolved */

import { type FC, type PropsWithChildren } from 'react';

import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import { Mdx } from '@/components/mdx';
import MDXCodeTabs from '@/components/MDX/CodeTabs';
import CenteredLayout from '@/layouts/Centered';

import authenticatedUser from '!!raw-loader!../components/Examples/authenticated-user.md';
import githubTrigger from '!!raw-loader!../components/Examples/github-trigger.md';
import httpTrigger from '!!raw-loader!../components/Examples/http-trigger.md';
import limitToCountry from '!!raw-loader!../components/Examples/limit-to-country.md';
import scheduleTrigger from '!!raw-loader!../components/Examples/schedule-trigger.md';
import sendEmail from '!!raw-loader!../components/Examples/send-email.md';
import uploadFile from '!!raw-loader!../components/Examples/upload-file.md';

import styles from './layouts.module.css';
const examplesTabs = [
  {
    id: 'api-endpoints',
    title: 'Triggers',
    children: [
      {
        id: 'setupAnEndpoint',
        title: 'Setup an Endpoint',
        content: (
          <Mdx
            hideCopyButton={true}
            source={httpTrigger}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
      {
        id: 'githubTrigger',
        title: 'Github Trigger',
        content: (
          <Mdx
            hideCopyButton={true}
            source={githubTrigger}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
      {
        id: 'scheduleTrigger',
        title: 'Schedule Trigger',
        content: (
          <Mdx
            hideCopyButton={true}
            source={scheduleTrigger}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    children: [
      {
        id: 'authenticateUser',
        title: 'Authenticate User',
        content: (
          <Mdx
            hideCopyButton={true}
            source={authenticatedUser}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
      {
        id: 'country',
        title: 'Limit to Country',
        content: (
          <Mdx
            hideCopyButton={true}
            source={limitToCountry}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
    ],
  },
  {
    id: 'upload-files',
    title: 'Upload Files',
    children: [
      // TODO: add example of uploading files to s3 and rename this one to upload to google cloud storage
      //  TODO: add example of restricting file size and type
      // TODO: add example of uploading large files
      // TODO: add example of resumable uploads
      {
        id: 'uploadFile',
        title: 'Upload File',
        content: (
          <Mdx
            hideCopyButton={true}
            source={uploadFile}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
    ],
  },
  {
    id: 'send-emails',
    title: 'Send Emails',
    children: [
      // TODO: add example of sending emails mailgun, sendgrid, ses
      {
        id: 'sendEmail',
        title: 'Send Email',
        content: (
          <Mdx
            hideCopyButton={true}
            source={sendEmail}
            components={{
              h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
            }}
          />
        ),
      },
    ],
  },
  // {
  //   id: 'database',
  //   title: 'Database',
  //   children: [],
  // },
];

const HomeLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main className={styles.homeLayout}>
        {children}
        {/* <CodeTabs
          tabs={[{ key: 'test', label: 'Test', value: 'test' }]}
          defaultValue={'test'}
        >
          {examplesTabs.map(it => (
            <TabsPrimitive.Content key={it.id} value={it.id}>
              {it.children.map(child => (
                <div key={child.id}>
                  <h1>{child.title}</h1>
                  {child.content}
                </div>
              ))}
              <Select.Root>
                <Select.Trigger className="SelectTrigger" aria-label="Food">
                  <Select.Value placeholder="Select a fruit…" />
                  <Select.Icon className="SelectIcon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="SelectContent">
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Fruits
                        </Select.Label>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </TabsPrimitive.Content>
          ))}
        </CodeTabs> */}
        {/* <Examples tabs={examplesTabs} /> */}
        <section
          style={
            {
              '--ec-frm-frameBoxShdCssVal': '0 0 0 0',
              '--ec-brdCol': 'hsl(var(--border))',
              '--ec-brdRad': '0.0rem',
              '--ec-frm-edBg': 'rgb(13 18 28)', //bg-natural-900
            } as React.CSSProperties
          }
        >
          <MDXCodeTabs examples={examplesTabs} />
        </section>
        {/* <Ex /> */}
      </main>
    </CenteredLayout>
  );
};

export default HomeLayout;
