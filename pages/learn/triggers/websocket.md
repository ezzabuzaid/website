---
title: WebSocket Trigger
layout: learn
---

## WebSocket Trigger

WebSocket triggers allow your workflow to maintain persistent connections with clients, enabling real-time, two-way data exchange. This is particularly useful for scenarios requiring instant updates and interactions, such as chat applications, live collaboration tools, or real-time gaming.

It differs from SSE trigger that it duplex, meaning it can send and receive data wheres SSE is one-way from the server to the client.

Here's a simple example of a WebSocket trigger workflow:

```ts
workflow('StreamSSE', {
  tag: 'realtime',
  trigger: trigger.sse({
    path: '/',
  }),
  execute: async trigger => {
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

The WebSocket trigger utilizes the project's routing extension to establish WebSocket connections. The endpoint for a WebSocket trigger workflow follows this pattern:

### How to use it?

#### Echo

```ts
workflow('EchoWebsocket', {
  tag: 'realtime',
  trigger: trigger.websocket({
    topic: 'chat',
  }),
  execute: async trigger => {
    return trigger.channel;
  },
});
```

#### Broadcast

```ts
workflow('BroadcastWebsocket', {
  tag: 'realtime',
  trigger: trigger.websocket({
    topic: 'chat',
  }),
  execute: async trigger => {
    return trigger.channel;
  },
});
```

#### One to One

```ts
workflow('OneToOneWebsocket', {
  tag: 'realtime',
  trigger: trigger.websocket({
    topic: 'chat',
  }),
  execute: async trigger => {
    return trigger.channel;
  },
});
```

#### Chat

```ts
import { on } from 'node:stream';
import { merge } from 'rxjs';

workflow('StreamChatWebsocket', {
  tag: 'realtime',
  trigger: trigger.websocket({
    topic: 'chat',
  }),
  execute: async trigger => {
    return merge(
      on(process, 'uncaughtException'),
      on(process, 'unhandledRejection')
    );
  },
});
```

```ts
import { on } from 'node:stream';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

workflow('StreamErrorsLogging', {
  tag: 'realtime',
  trigger: trigger.sse({
    path: '/errors',
  }),
  execute: async trigger => {
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
````
