import { getProject, getProjects } from '@/app/explore/utils';
import Button from '@/components/Common/Button';
import { Mdx } from '@/components/mdx';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import Link from 'next/link';
import { Fragment } from 'react';
import { SiGithub } from 'react-icons/si';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({
    params: {
      id: project.id,
    },
  }));
}

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const project = await getProject(params.id);
  const info = {
    framework: 'Hono',
    database: 'PostgreSQL',
    cloud: 'Fly.io',
  };
  return (
    <>
      <WithNavBar />

      <main className="grid h-full grid-cols-1 !gap-0 px-8 md:grid-cols-9 md:px-6 lg:px-16">
        <header className="top-0 flex md:sticky md:col-start-1 md:col-end-5">
          <div className="mt-12">
            <h1 className="w-full items-center justify-between  text-5xl">
              {project.config.title}
            </h1>
            <p className="mt-8 text-neutral-800 dark:text-neutral-600/80">
              {project.config.description}
            </p>
            <Link
              href={project.config.sourceCode}
              className="my-4 flex items-center gap-x-2"
            >
              <SiGithub size={18} />
              Source code
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Button
                href={
                  process.env.NODE_ENV === 'development'
                    ? `http://localhost:1234?project=${project.id}`
                    : `https://app.january.sh?project=${project.id}`
                }
                kind="special"
                className="flex justify-center"
              >
                Use project
              </Button>
              <Button
                kind="neutral"
                className="flex justify-center"
                href={
                  process.env.NODE_ENV === 'development'
                    ? `http://localhost:1234?project=${project.id}`
                    : `https://app.january.sh?project=${project.id}`
                }
              >
                View demo
              </Button>
            </div>
            <ul className="my-4 px-0">
              {Object.entries(info).map(([key, value]) => (
                <Fragment key={key}>
                  <li className="flex items-center justify-between ">
                    <p className="text-sm font-semibold capitalize text-neutral-800 dark:text-neutral-600/80">
                      {key}
                    </p>
                    <p className="text-sm text-neutral-800 dark:text-neutral-600/80">
                      {value}
                    </p>
                  </li>
                  <hr className="my-2"></hr>
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="separator mx-8 hidden h-full md:block lg:mx-12"></div>
        </header>
        <article className="mb-12 mt-12 flex flex-col gap-4 md:col-span-5">
          <Mdx source={project.readme} />
        </article>
      </main>

      <WithFooter />
    </>
  );
}
