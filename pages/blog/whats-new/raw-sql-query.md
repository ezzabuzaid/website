---
date: '2024-07-16T00:00:00.000Z'
category: whats-new
title: 'Raw SQL queries'
layout: blog-post
author: ezzabuzaid
---

# Raw SQL queries

Building on the work we did with custom action, we've now added support for raw SQL queries in the database extension (PostgreSQL).

```ts
workflow('GetUserProfileWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  actions: {
    addUser: trigger =>
      action.database.sql({
        query: `
          SELECT * FROM users WHERE email = '${trigger.body.email}'
          JOIN profiles ON users.id = profiles.userId
        `,
      }),
  },
});
```

_Only select statements are supported and you may use the semantic actions like `action.database.insert` and others for other operations._

You don't have to worry about SQL injection attacks, as the query will be serialized using tag functions before being executed.

The above action will essentially be converted to:

```ts
const serialized = sql`SELECT * FROM users WHERE email = '${email}'
          JOIN profiles ON users.id = profiles.userId
          `;
dataSource.query(serialized.sql, serialized.values);
```
