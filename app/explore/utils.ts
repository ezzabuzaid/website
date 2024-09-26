import { Octokit } from '@octokit/core';
const octokit = new Octokit();

export type Project = {
  id: string;
  readme: string;
  repo: string;
  url: string;
  config: {
    projectName: string;
    title: string;
    description: string;
    extensions: Array<string>;
    sourceCode: string;
    author: {
      name: string;
      url: string;
    };
  };
};

export async function getProjects() {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: 'januarylabs',
      repo: '.github',
      path: 'projects',
    }
  );
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data.map(file => ({
    id: file.name,
  }));
}

async function getFile(projectName: string, fileName: string) {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: 'januarylabs',
      repo: '.github',
      path: `projects/${projectName}/${fileName}`,
    }
  );
  if (!('content' in data)) {
    throw new Error('Content not found');
  }
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export async function getProject(projectName: string): Promise<Project> {
  const projectRepo = projectName.startsWith('project')
    ? projectName
    : `project-${projectName}`;
  return {
    id: projectName,
    config: JSON.parse(await getFile(projectName, 'config.json')),
    readme: await getFile(projectName, 'readme.md'),
    url: `https://github.com/JanuaryLabs/${projectRepo}`,
    repo: `januarylabs/${projectRepo}`,
  };
}
