---
date: '2024-04-24T17:45:00.000Z'
category:

title: 'Releasing Node Cron Extension'
layout: blog-post
author: ezzabuzaid
---

Scheduled tasks are a common requirement in many applications.

They can be used for a variety of purposes:

- Sending out reminders
- Performing maintenance tasks.
- Update services and alert on their health.
- Update search indexes.
- Running reports.
- Triggering updates to and from third-party APIs.

## How does it work?

It uses [node-cron](https://www.npmjs.com/package/node-cron) package to schedule tasks in your January project. Mostly suitable for running tasks in a vertical scaling environment.

## How I can use it?

Cron/scheduled triggers follows same setup as other triggers in January.

```ts
feature('Roadmap', {
  workflows: [
    workflow('SendReminder', {
      tag: 'posts',
      trigger: trigger.schedule({
        pattern: '0 0 * * *',
      }),
      // ...
    }),
  ],
  tables: {
    // ...
  },
});
```

## Get Involved

You can try it out today in the [playground](https://app.january.sh/). We’re always happy to hear your feedback.

Looking to the future, January team is running a survey to gather info from the ecosystem to help shape the API development sphere. If you have a minute, please [fill out the survey](https://tally.so/r/31KZAg).

## What's next?

- [ ] [Schedule tasks management module.](https://github.com/orgs/JanuaryLabs/projects/12/views/1?pane=issue&itemId=69615870)
- [ ] [Task scheduling Semantic.](https://github.com/orgs/JanuaryLabs/projects/12/views/1?pane=issue&itemId=69615695)
