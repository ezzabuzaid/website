---
title: HTTP Trigger
layout: learn
---

## HTTP Trigger

The `http` trigger is used to trigger workflows based on HTTP requests. You can specify the HTTP method, path to match against.

```ts
workflow('CreateTodo', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async trigger => {
    return {
      statusCode: 200,
      body: {
        message: 'Hello, world!',
      },
    };
  },
});
```

_This workflow will be triggered by an HTTP request to the path `/{featureName}/tasks` and using http method `post`._

#### How it works

The HTTP trigger is implemented through a routing extension (e.g., Hono.dev, Express, Koa) that's included in every project. It translates the workflow into an HTTP endpoint following this pattern:

An HTTP trigger workflow will be translated to the following endpoint:

```bash
/{featureName}/{workflowTag}/{triggerPath}
```

The trigger supports common HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS), though available methods may vary depending on the specific routing extension used.

### How to use it?

You can access the request body, query parameters, and headers in the workflow actions using the trigger object.

```ts
workflow('UpdateTodo', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'patch',
    path: '/:id',
  }),
  execute: async trigger => {
    return {
      id: trigger.path.id,
      title: trigger.body.title,
      completed: trigger.body.completed,
    };
  },
});
```
