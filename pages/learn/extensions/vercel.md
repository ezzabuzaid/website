---
title: Vercel Extension
layout: learn
---

## Vercel Extension

The Vercel extension allows you to deploy your application to the Vercel platform.

### Configuration

To deploy your application to Vercel, you need to create an account on the [Vercel website](https://vercel.com/). After creating an account, you can create a new project (use empty git template) on the [Vercel dashboard](https://vercel.com/dashboard).

Alternatively, you can manage your project via the Vercel CLI by following the instructions on the [Vercel documentation](https://vercel.com/docs/cli).

#### Settings

From either the Vercel CLI or the Vercel dashboard, you need to obtain the API token, the project id, and the org (team) id and set the environment variables for your Vercel project.

To create an app through the cli, you can use the following command:

- First, login to your Vercel account:

```bash
npx vercel login
```

- Then, create a new project:

```bash
npx vercel projects add <app-name>

# npx vercel projects add my-awesome-project
```

#### Environment Variables

You can manage your project's environment variables using the Vercel dashboard.

```txt
https://vercel.com/<team>/project/<project-name>/settings/environment-variables

where <team> is your team name and <project-name> is the name of the Vercel project.
example: https://vercel.com/sample-team/sample-app/settings/environment-variables
```

#### Build Variables

The following variables are required to deploy your application to Vercel:

```txt
VERCEL_API_TOKEN=The API token to authenticate with Vercel.

VERCEL_ORG_ID=The ID of the Vercel organization (team).

VERCEL_PROJECT_ID=The name of the Vercel project.
```

- VERCEL_API_TOKEN: You can obtain the API token from [account settings](https://vercel.com/account/tokens) on the Vercel dashboard.
- VERCEL_ORG_ID: You can obtain the org (team) id from the [Team Id](https://vercel.com/ezzabuzaids-projects/~/settings) section.
- VERCEL_PROJECT_ID: You can obtain the project id from the [Project Id](https://vercel.com/ezzabuzaids-projects/january-website/settings#project-id) section.
