---
date: '2024-06-29T00:00:00.000Z'
category: whats-new
title: 'Instant compilation'
layout: blog-post
author: ezzabuzaid
---

The compilation process is segmented into several distinct stages, starting with the initial evaluation of the project declaration (CanonLang) and moving through to the generation of the final output, which is the Node.js -TypeScript- server code.

Previously, we would have to request the server to evaluate the code within a secure Docker container and then transmit the results back to the client. Although this method was initially quick, it gradually became slower as we expanded the capabilities of the language.

Also it required transpiling to JavaScript, ensuring it was non-malicious, and then executing it.

Now, we have the flexibility to use any JavaScript interpreters, and it's no longer necessary for them to operate within a strictly secure environment. The new process involves statically remapping the code to a data structure that can then be evaluated in any JavaScript host like a browser.

Take the following for example:

```ts
export default project(
  feature(...)
)
```

This is compiled into an intermediate representation:

```ts
{
  caller: 'project',
  args: [
    {
      caller: 'feature',
      args: [...]
    }
  ]
}
```

The evaluator interprets the compiled output as follows:

```ts
function call(node: unknown): unknown {
  if (Checker.isCallExpression(node)) {
    const [implFn, ...type] = node.caller.split('.');
    const callerImpl = callers[implFn];
    if (!callerImpl) {
      throw new Error(`Unknown caller ${node.caller}`);
    }
    return callerImpl(...node.arguments.map(call));
  }

  if (Checker.isArrayExpression(node)) {
    return node.map(call);
  }
  // ... other node types
  return node;
}
```

All functions used by the evaluator are explicitly defined, ensuring that only specific implementations are available:

```ts
const callers: Record<string, (...args: unknown[]) => void> = {
  project,
  feature,
  table,
  workflow,
  // ...other built-in functions
};
```

The compilation time for a project has dramatically decreased from around 1-2 seconds to less than 100ms, which is a significant improvement. Moreover, this change will also allow us to generate diagnostic messages (e.g., errors, warnings) in the future, something we are looking forward to.

## What's next?

- [ ] Implement a more robust error handling mechanism.
