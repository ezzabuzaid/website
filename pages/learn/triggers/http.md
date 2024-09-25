---
title: HTTP Trigger
layout: learn
---

## HTTP Trigger

The HTTP trigger is used to create workflows that respond to HTTP requests, process data, and return responses allowing you to build RESTful APIs and web services.

```ts
workflow('CreateTodo', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async ({ trigger }) => {
    return {
      statusCode: 200,
      body: {
        message: 'Todo created successfully',
        id: crypto.randomUUID(),
      },
    };
  },
});
```

_This workflow will be triggered by a `POST` request to the path `/{featureName}/tasks`._

#### How it works

The HTTP trigger is implemented through a routing extension (e.g., Hono.dev, Express, Koa) included in every project. It translates the workflow into an HTTP endpoint following this pattern:

```bash
/{featureName}/{workflowTag}/{triggerPath}
```

Supported HTTP methods include GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS, though availability may vary based on the routing extension used.

### How to use it?

You can access the request body, query parameters, and headers using the trigger object.

```ts
workflow('UpdateTodo', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'patch',
    path: '/:id',
  }),
  execute: async ({ trigger }) => {
    return {
      id: trigger.path.id,
      title: trigger.body.title,
      completed: trigger.body.completed,
    };
  },
});
```
