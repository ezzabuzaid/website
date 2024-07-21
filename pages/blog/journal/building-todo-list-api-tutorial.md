---
date: '2024-06-17T00:00:00'
title: 'Building Todo List API, Once Again.'
category: journal
layout: blog-post
author: ezzabuzaid
---

Chances you’ve built a todo list app/website before is high, especially in your early days. Todo list is about the next step after printing “Hello World“.

Today, we are going to look at new way of building a simple todo list API and deploying it using January (bear in mind that January is still in alpha so there are many bugs floating around).

To follow the writing jump to the [playground](https:/app.january.sh) and wait few seconds for it to activate.

January constitutes of two main parts.

1. Extensions: To customise and configure the codebase.

2. CanonLang (January’s DSL): To define the shape of the API (generated code).

It’s worth highlighting two essential functions in CanonLang.

- `workflow`: It’s more or less an endpoint handler (controller action if you’re coming from C# world)

- `table`: a representation of a database table.

**Hint**: in the playground, press “command/ctrl + K“ to get help from AI.

Typically when you hear the word workflow it’ll trigger a picture of connected nodes with a trigger in you mind which is true when visual defining a workflow but here the case albeit true in definition is different in declaration as it maps 1:1 with what you already know about backend API development.

To start, select project from the projects dropdown or create one and ensure that following extensions are installed (**Postgresql, Fly.io, and Hono.dev**)

![Extension List](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febbaa77a-6d03-41dd-a489-42fd8d0824c6_990x758.png)

That is it for setup, let’s build the API

## The API

At the end you’ll have the following 4 endpoints (4 workflows)

- `GET /todo/tasks/`

- `GET /todo/tasks/:id`

- `POST /todo/tasks`

- `PATCH` /todo/tasks/:id

Let’s start with describing the todo feature

```ts
export default project(
  feature('Todo', {
    tables: {},
    workflows: [],
  })
);
```

That is the bear minimum to generate the API server, if you copy and paste this code into your project you’ll see a Node.js/TypeScript project with everything needed to run a server.

#### Tasks Table

You’ll create a minimalistic tasks table that have two columns: title, and completed. Title is a **short-text** which will translates to non-nullable **varchar** and ((boolean)) will stay as is.

_Primary key and audit fields will be auto generated._

```ts
tables: {
  tasks: table({
    fields: {
      title: field({ type: 'short-text', validations: [mandatory()] }),
      completed: field({ type: 'boolean' }),
    },
  });
}
```

#### Create Task Endpoint

The first workflow is “create task workflow“ that will accept title in the request body, this following workflow will map to this endpoint.

POST /todo/tasks {title: string}

```ts
workflow('AddTaskWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  sequence: sequenceFor('AddTaskWorkflow', 'addTask'),
  actions: {
    addTask: action.database.insert({
      table: useTable('tasks'),
      columns: [useField('title', '@trigger:body.title')],
    }),
  },
});
```

- Tag is used to namespace group of workflows.

- Trigger is how you want your client to call this endpoint.

- Sequence is to define the order of actions execution.

- Actions are what actually gets executed once the endpoint is called. The extensions dictates what actions are available, for instance `action.database.insert` is available because you installed the **PostgreSQL Extension** from above.

> When you look at the columns array you’ll notice a second argument `@trigger:body.title` which tells the workflow that the value for the title column will be in the request body.

At the end you should be able to call the endpoint using CURL as following

```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"title": "your task title"}' \
 https://yourserver/todo/tasks
```

#### Update Task Endpoint

Similar to create task, only change needed is the action. You’ll need `action.database.set` action which takes one additional property named “query“.

Query is the PostgreSQL select statement without having to say “from <table>“

```ts
workflow('UpdateTaskWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'patch',
    path: '/:id',
  }),
  sequence: sequenceFor('UpdateTaskWorkflow', 'updateTask'),
  actions: {
    updateTask: action.database.set({
      table: useTable('tasks'),
      columns: [useField('title', '@fixed:true')],
      query: query(where('id', 'equals', '@trigger:path.id')),
    }),
  },
});
```

#### List Tasks Endpoint

Similar to the other actions but now with the powerful **pagination** that will paginate the database record using “deferred_joins” strategy.

```ts
workflow('ListTasksWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'get',
    path: '/',
  }),
  sequence: sequenceFor('ListTasksWorkflow', 'listTasks'),
  actions: {
    listTasks: action.database.list({
      table: useTable('tasks'),
      pagination: 'deferred_joins',
      limit: 20,
      query: query(),
    }),
  },
});
```

#### Get Tasks Endpoint

This one is similar to “Update Task Endpoint”

```ts
workflow('ListTasksWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'get',
    path: '/',
  }),
  sequence: sequenceFor('ListTasksWorkflow', 'listTasks'),
  actions: {
    listTasks: action.database.single({
      table: useTable('tasks'),
      query: query(where('id', 'equals', '@trigger:path.id')),
    }),
  },
});
```

Do you think this is interesting? let me know your thoughts and you can share it with others as well.

## Let’s do some testing

To see the API in action, click on the Swagger tab
![Swagger Panel](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2424ed4-03db-471f-b58d-17f5b1087d51_1004x256.png)
This “Todo” feature we’ve created before, click on the little run icon and you shall see the aforementioned endpoints ready for you to run.

![Swagger Endpoints](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F06635ca3-977e-4890-aa0b-7b88a832833e_2226x1024.png)

## Connecting to GitHub

The next step is have the code in your GitHub Account. January will automatically create a repository for you with the project name.
![Github Panel](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc99cb601-9909-46d6-a1ad-4174e0a2e4d4_1004x330.png)
Go to Github tab and then authenticate with Github

Then you will see the “Connect with Github” button that will create a repository in the connected account.

![Connect with Github](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd2309169-2090-4918-a4fb-2a6344ada7ae_806x324.png)

## Deploy to Fly.io

You’ve already added the **Fly.io** extension but it still needs connect to Github to push deploy your code.

1. Create an account in Fly.io.

2. Create Fly.io deployment token.

3. Store the token along with the app name in the created repository secrets using the following names

- FLY_API_TOKEN
- FLY_APP_NAME

4. In Fly.io environment variables add connection string to your database. You can create a database in neon.tech. And use the following key

- CONNECTION_STRING

Notes:

1. The language in the example is to be open sourced soon.

2. I’d love to hear your feedback. you can email me at “feedback@january.sh“ or join the discord server

3. [You can find the complete code in this gist](https://gist.github.com/ezzabuzaid/9c93eb3819e8d5b6338e28c89519a49c)

Lastly, If you’d like to have a thorough demo email us at “feedback@january.sh” or hit the following button. we’d love to hear from you.
