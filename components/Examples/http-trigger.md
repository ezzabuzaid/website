```ts
import { saveEntity } from '@extensions/postgresql';
import { tables } from '@workspace/entities';

workflow('CreateUserWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async trigger => {
    await saveEntity(tables.users, {
      name: trigger.body.name,
      email: trigger.body.email,
    });
});
```

<Footer
  gist="f34aca124fe48eabad26fbf4927e59fc"
>
  Create an API endpoint that can be accessed via an HTTP request using the
  `trigger.http` trigger. Can be found in a Routing extension (koa, express,
  hono.dev, etc.).
</Footer>
