---
title: Resend Extension
layout: learn
---

```ts
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
      actions: {
        sendWelcomEmail: action.resend.sendEmail({
          to: '@trigger:body.email',
          from: 'welcom@org.com',
          subject: 'Welcome dear user',
          html: '<p>Welcome to January! You have successfully signed up.</p>',
        }),
        addUserToContact: action.resend.createContact({
          email: '@trigger:body.email',
          firstName: '@trigger:body.name',
          audienceId: '008ed46c-82bb-427d-8fbd-256f9703f643',
        }),
        addUser: action.database.insert({
          table: useTable('users'),
          columns: [
            useField('name', '@trigger:body.name'),
            useField('email', '@trigger:body.email'),
          ],
        }),
      },
    }),
  ],
});
```
