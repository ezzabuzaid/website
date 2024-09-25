---
title: Resend Extension
layout: learn
---

```ts
import { resend } from '@extensions/resend';
import { saveEntity } from '@extensions/postgresql';
import { tables } from '@workspace/entities';

feature('UserFeature', {
  tables: {
    users: table({
      fields: {
        name: field({
          type: 'short-text',
          validations: [mandatory()],
        }),
        email: field({
          type: 'email',
          validations: [mandatory(), unique()],
        }),
      },
    }),
  },
  workflows: [
    workflow('AddUserWorkflow', {
      tag: 'users',
      trigger: trigger.http({
        path: '/',
        method: 'post',
      }),
      execute: async ({ trigger }) => {
        await resend.sendEmail({
          to: trigger.body.email,
          from: 'welcom@org.com',
          subject: 'Welcome dear user',
          html: '<p>Welcome to January! You have successfully signed up.</p>',
        });
        await resend.contacts.create({
          email: trigger.body.email,
          firstName: trigger.body.name,
          audienceId: '008ed46c-82bb-427d-8fbd-256f9703f643',
        });
        await saveEntity(tables.users, {
          name: trigger.body.name,
          email: trigger.body.email,
        });
      },
    }),
  ],
});
```
