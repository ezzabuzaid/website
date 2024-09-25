---
title: SSE Trigger
layout: learn
---

## SSE Trigger

SSE triggers allow your workflow to establish a long-lived connection with clients, enabling real-time data streaming. This is particularly useful for scenarios requiring continuous updates, such as live feeds, real-time notifications, or monitoring systems.

It differs from WebSocket trigger that it one-way, meaning it can only send data whereas WebSocket can send and receive data.

```ts
workflow('StreamSSE', {
  tag: 'realtime',
  trigger: trigger.sse({
    path: '/',
  }),
  execute: async ({ trigger }) => {
    const stream = new PassThrough();
    setInterval(() => {
      stream.push(`data: ${trigger.query.channel}\n\n`);
    }, 1000);
    return stream;
  },
});
```

_This workflow will be triggered by an SSE request to the path `/{featureName}/realtime` and using http method `post`._

#### How it works

The SSE trigger uses the project's routing extension to establish SSE connections at:

An SSE trigger workflow will be translated to the following endpoint:

```bash
/{featureName}/{workflowTag}/{triggerPath}
```

### How to use it?

An SSE trigger must return a `AsyncIterator` to stream data to the client. Which means you can use Node.js's stream package or RxJS.

Here's a more complex example that streams Node.js process errors to the client:

```ts
import { on } from 'node:stream';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

workflow('StreamErrorsLogging', {
  tag: 'realtime',
  trigger: trigger.sse({
    path: '/errors',
  }),
  execute: async ({ trigger }) => {
    return merge(
      on(process, 'uncaughtException').pipe(
        tap(error => console.error('Uncaught Exception:', error))
      ),
      on(process, 'unhandledRejection').pipe(
        tap(error => console.error('Unhandled Rejection:', error))
      )
    );
  },
});
```

This workflow listens to `uncaughtException` and `unhandledRejection` events from Node.js and streams them to the client in real-time.
