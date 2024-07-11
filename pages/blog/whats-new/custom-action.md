---
date: '2024-07-10T00:00:00.000Z'
category: whats-new
title: 'Custom actions'
layout: blog-post
author: ezzabuzaid
---

# Custom actions

Today, we're starting invistigating how to go beyond what extensions offers and be flexible in terms of the code you have, albeit that was possiple before via passing custom code/logic as string to the action, but it was only a workaround.

With custom actions you can write your own code in TypeScript and use it in your workflows. This is **particularly** useful when you want to write a custom logic that is not available in the extensions.

```ts
action(trigger => {
  // custom code is here
});
```

The only argument to the `action` function is a function that takes a `trigger` object as an argument. The `trigger` object contains data from the workflow trigger.

```ts
workflow('AddUserWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  actions: {
    addUser: action.database.insert({
      table: useTable('users'),
      columns: [useField('email', '@trigger:body.email')],
    }),
    sendEmail: action(trigger => {
      console.log(`Sending email to ${trigger.body.email}`);
    }),
  },
});
```

The `trigger` is typed as per the trigger type, in this case, it's an HTTP trigger, so it has `body`, `query`, `path`, and `headers` properties.

Beware that you still cannot import modules and external packages (e.g via NPM) in the custom actions, but you can use the built-in Node.js API.

```ts
workflow('AddUserWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  actions: {
    addUser: action.database.insert({
      table: useTable('users'),
      columns: [useField('email', '@trigger:body.email')],
    }),
    sendEmail: action(async trigger => {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: trigger.body.email,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: 'Welcome to our platform',
          text: 'Welcome to our platform',
        }),
      });
    }),
  },
});
```

## Why prefer extensions over custom actions?

Extensions still are the best way to go if they do what you need; one advantage of using extensions is that they are portable to other languages in the future (GoLang, .net).

## What's next?

- [ ] Add support for importing native modules and external packages in custom actions.
- [ ] Accessing workflow context in custom actions.
