---
title: Hono.dev Extension
layout: learn
---
## Hono.dev

Hono is an HTTP routing framework that works with different runtimes (Node.js, Deno, etc.) and provides a simple, web standard-based API to build web applications.

### Configuration

#### Settings

No settings for this extension.

#### Environment Variables

No environment variables for this extension.

#### Build Variables

No build variables for this extension.

### Triggers

The following triggers are available:

- **trigger.http**: Triggers a workflow when an HTTP request is received.

- **trigger.sse**: Triggers a workflow when an event source connection is established (WIP).

#### HTTP

You can use the `trigger.http` trigger to start a workflow when an HTTP request is received.

```ts
workflow('GetUser', {
  tag: 'users',
  trigger: trigger.http({
    method: 'get',
    path: '/:id',
  }),
  actions: {
    getUser: action.database.single({
      table: useTable('users'),
      query: query(where('id', 'equals', '@trigger:path.id')),
    }),
  },
});
```

The available methods are `get`, `post`, `put`, `patch`, `delete`, `head`, and `options`.

You can also access the request body, query parameters, and headers in the workflow actions using the `@trigger` namespace.

```ts
workflow('CreateUser', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  actions: {
    createUser: action.database.insert({
      table: useTable('users'),
      columns: [
        useField('name', '@trigger:body.name'),
        useField('email', '@trigger:body.email'),
      ],
    }),
  },
});
```
