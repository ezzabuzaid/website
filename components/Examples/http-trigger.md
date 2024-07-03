```ts
workflow('CreateUserWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  actions: {
    createUser: action.database.insert({
      table: useTable('Users'),
      columns: [
        useField('name', '@trigger:body.name'),
        useField('email', '@trigger:body.email'),
      ],
    }),
  },
});
```

Create an API endpoint that can be accessed via an HTTP request using the `trigger.http` trigger. Can be found in a Routing extension (koa, express, hono.dev, etc.).
