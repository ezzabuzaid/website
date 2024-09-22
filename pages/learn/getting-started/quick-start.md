---
title: Quick Start
layout: learn
---

## Create a new project

January CLI helps you to scaffold a new project configured with all bits and pieces you need to start building your API.

Use the `init` command followed by the name of your project to create a new project.

```bash
npx https://github.com/JanuaryLabs/dist/raw/main/canary.tar.gz init my-project
```

Once done, you should see a new directory called `my-project`

```bash
cd my-project
```

Run the build command and keep it running.

```bash
npm run build
```

## Prepare the development environment

By default, the project is configured to use PostgreSQL as the database, Hono as the framework, and Fly.io as the cloud provider.

For development you need to have a database server running locally.

### Using pre-configured docker compose

The scaffolding process creates a `compose.ts` file that is pre-configured to prepare the development environment for you. Just run it and you shall be set.

- Open another terminal window and run the following command:

```bash
npx tsx compose.ts
```

- Run postgres container, start the server, and watch for changes

```bash
docker compose \
  -f "compose.dev.yml" \
  up \
  --build \
  --watch \
  --remove-orphans
```

_This command uses docker `--watch` mode to automatically restart the server when you make changes._

### Using standalone postgres container

- Create postgres container

```bash
docker run \
  --name postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_USER=youruser \
  -e POSTGRES_DB=yourdatabase \
  -d \
  -p 5432:5432 \
  postgres:16
```

2. Update the `.env` file

```bash
CONNECTION_STRING=postgresql://youruser:yourpassword@localhost:5432/yourdatabase
```

3. Run the server

```bash
npm run dev
```

_This command uses Node.js version 18 `--watch` mode to automatically restart the server when you make changes._

## Structure of a project

Every project is a TypeScript project with the following structure:

```bash
.
├── package.json
├── extensions.json
├── compose.ts
├── src
│   ├── extensions
│   │   └── user
│   │       └── index.ts
│   └── project.ts
└── tsconfig.json
```

- `project.ts` file is the entry point and the only file (for now) that you use to build your project.
- `src/extensions` is user-defined extensions that you can use to extend the functionality of the project.
- `extensions.json` file is used to configure the extensions.

- `compose.ts` is a TypeScript file that is used to generate a docker compose file for your project to ease the development on your local machine.

<!-- ```ts title="compose.ts"
import { writeCompose } from '@january/extensions';
import { localServer } from '@january/extensions/fly';
import { postgres, pgadmin } from '@january/extensions/postgresql';

writeCompose(
  compose({
    database: service(postgres),
    pgadmin: service(pgadmin),
    server: service({
      ...localServer(),
      depends_on: [postgres],
    }),
  })
);
```

This sample code will generate a docker compose file that will start a PostgreSQL database, a pgadmin instance, and create a local server. -->
