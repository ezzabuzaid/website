---
title: Your First Project
layout: learn
---

# Your First Project

You'll build a To-Do List API in this tutorial. This techinques you'll learn here are fundamental to building any project with January.

> You don't need to install any software on your computer to use January, prepare any environment, or creating an account. January operates entirely on the web, so you can start building your project right away in the [Playground](https://app.january.sh).

## What are you building?

TODO: embed playground

If the code doesn’t make sense to you yet, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand the basics of building a project with January.

## Setup

In the live code editor below, click Fork in the top-right corner to open the playground in new tab.

Once activated, you can start writing code immediately without having to do any setup.

> 1. Forking the project essentially creates a copy of the project in your account (annonymous account).
> 2. Your changes will be autosaved in the browser session, if you wish to have your work saved for later, you can connect with your GitHub account.

## Writing the code

```ts
export default project(
  feature('Todo', {
    tables: {},
    workflows: [],
  })
);
```

That is the bear minimum to generate the API server. To see the Node.js/TypeScript project, focus on the "File Explorer" tab on the left side of the screen.

### Adding the Todo table

Tasks table have two columns: **title**, and **completed**. Title is a short-text which will translates to non-nullable varchar and ((boolean)) will stay as is.

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

### API Endpoints

The API will be basic CRUD operations for the tasks table. You can define the API endpoints in the `workflows` section.

- Create Task Endpoint

It accepts title in the request body, this following workflow will map to this endpoint.

```bash
POST /todo/tasks {title: string}
```

```ts
import { saveEntity } from '@extensions/postgresql';
workflow('AddTaskWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async trigger => {
    await saveEntity(tables.tasks, {
      title: trigger.body.title,
    });
  },
});
```

- Tag is used to namespace group of workflows.
- Trigger is how you want your client to call this endpoint.
- Sequence is to define the order of actions execution.
- Actions are what actually gets executed once the endpoint is called.

## Wrapping up

Here you go! You've built your first project with January that:

1. Have a server that you can share instantly with anyone.
2. OpenAPI documentation that you can use to test your API.
3. Code that you can continue to develop and deploy to any cloud provider.

## Conclusion

In this tutorial, you've learned how to build a To-Do List API with January. You've also learned how to:

1. Basic syntax of CanonLang.
2. The role of extensions.
3. Interact with database
4. Connect with Github.

You can check more projects on the [Explore Page](https://january.sh/explore).
