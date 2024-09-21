---
title: Github Webhooks Extension
layout: learn
---

## Github Webhooks Extension

The Github Webhooks extension allows you to setup triggers for your workflows using Github Webhooks.

Limitation:

- You can only trigger workflows using individual events; You can't trigger workflows using a combination of events.

- One webhook only is supported.

## Configuration

To use the Github Webhooks extension, you need to create a webhook on your Github repository.

### Settings

To create a webhook, follow these steps:

1. Go to your Github repository.
2. Click on the `Settings` tab.
3. Click on the `Webhooks` tab.
4. Click on the `Add webhook` button.

Then you'll see a form to create a new webhook. Fill in the following details:

- **Payload URL**: /integrations/github/webhooks
- **Content type**: application/json
- **Secret**: A secret key to secure your webhook.
- **SSL verification**: Enable SSL verification.
- **Events**: Select only one event type that you want to trigger your workflow.

#### Environment Variables

```txt
GITHUB_WEBHOOK_SECRET=The secret key to secure your webhook.
```

This secret key is important to ensure secure communication between your Github repository and your application. You can use openssl to generate a secure secret key:

```bash
openssl rand -base64 32
```

#### Build Variables

No build variables for this extension.

### Triggers

The Github Webhooks extension triggers a workflow when a specific event occurs on your Github repository. You can select the event type when creating a webhook.

```ts
trigger.github({
  event: 'issues.labeled',
});
```

Usage within a workflow:

```ts
import { saveEntity } from '@extensions/postgresql';
workflow('RecordIssuedLabeled', {
  tag: 'posts',
  trigger: trigger.github({
    event: 'issues.labeled',
  }),
  execute: async trigger => {
    await saveEntity(tables.posts, {
      title: trigger.issue.title,
      description: trigger.issue.body,
      issueUrl: trigger.issue.url,
    });
  },
});
```

### Policies

The following policies are available:

- **policy.github**: Verifies the Github webhook signature.

#### Github

You can use the `policy.github` policy to police the workflow.

```ts
import { saveEntity } from '@extensions/postgresql';
feature('Roadmap', {
  policies: {
    isBug: policy.github({
      events: ['issues.labeled'],
      guard: event => event.payload.label.name === 'bug',
    }),
  },
  workflows: [
    workflow('RecordIssuedLabeled', {
      tag: 'posts',
      trigger: trigger.github({
        event: 'issues.labeled',
        policies: ['isBug'],
      }),
      execute: async trigger => {
        await saveEntity(tables.posts, {
          title: trigger.issue.title,
          description: trigger.issue.body,
          issueUrl: trigger.issue.url,
        });
      },
    }),
  ],
});
```

In this sample code, the `isBug` policy is applied to the `RecordIssuedLabeled` workflow. The workflow will only be executed if the issue is labeled as `bug`.
