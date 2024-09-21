---
date: '2024-07-16T00:00:00.000Z'
category: whats-new
title: 'Raw SQL queries'
layout: blog-post
author: ezzabuzaid
---

Building on the work we did with custom action, we've now added support for raw SQL queries in the database extension (PostgreSQL).

```ts
import { sql } from '@extensions/postgresql';
workflow('GetUserProfileWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async trigger => {
    const records = await sql`
        SELECT * FROM users
        WHERE email = '${trigger.body.email}'
        JOIN profiles ON users.id = profiles.userId
      `;
    return records;
  },
});
```

You don't have to worry about SQL injection attacks, as the query will be serialized using [tag functions](https://npmjs.com/package/sql-template-tag) before being executed.
