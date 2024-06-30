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

You can create an API endpoint using the `trigger.http` trigger that can be accessed via an HTTP request. HTTP trigger is available in a Routing extension (koa, express, hono.dev, etc.).
