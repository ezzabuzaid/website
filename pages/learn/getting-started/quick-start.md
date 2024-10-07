---
title: Quick Start
layout: learn
---

## Create a new project

January CLI helps you to scaffold a new project configured with all bits and pieces you need to start building your API.

```bash
npm create january@latest project-winter
```

Once done, you should see a new directory called `project-winter`

```bash
cd project-winter
```

Open it in your favorite code editor with two terminal windows.

The first terminal window will be used to run the build command and keep it running.

```bash
npm run build
```

The second terminal window will be used to run the server command and keep it running.

```bash
npm run dev
```

## Prepare the development environment

By default, the project is configured to use PostgreSQL as the database, Hono as the framework, and Fly.io as the cloud provider.

To setup the database, you need to have a database server running locally which can be via either of the following methods:

### Using pre-configured docker compose

The scaffolding process creates a `tools/compose.ts` file that is pre-configured to prepare the development environment for you. Just run it and you shall be set.

- Open another terminal window and run the following command:

```bash
npx tsx tools/compose.ts
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
├── tools
│   ├── extensions.js
│   └── compose.ts
├── src
│   ├── extensions
│   │   └── user
│   │       └── index.ts
│   └── project.ts
└── tsconfig.json
```

- `project.ts` file is the entry point and the only file (for now) that you use to build your project.
- `src/extensions` is user-defined extensions that you can use to extend the functionality of the project.
- `tools/extensions.js` file is used to configure the extensions.

- `tools/compose.ts` is a TypeScript file that is used to generate a docker compose file for your project to ease the development on your local machine.
 