---
date: '2021-08-018T00:00:00'
title: 'Running Untrusted JavaScript Code'
category: journal
layout: blog-post
author: ezzabuzaid
---

**IMPORTANT**: _This is about running JavaScript and TypeScript code only. That being said, the writing might also be the direction to run other code in other languages._

Allowing users to execute their code within your application opens up a world of customization and functionality, yet it also exposes your platform to significant security threats.

January has an editor users use to write CanonLang—an internal typescript DSL—to define and shape their API and workflows. It’s later executed to result in a data structure that the compiler can understand.

We have searched for the best way to execute the code securely for quite some time. Given that it is user code, everything is expected, from halting the servers (it could be infinity loops) to stealing sensitive information.

Because of the inherent implications of running user code, we considered avoiding `eval` although one might argue why a user would do this to themselves.

We started by using Docker to run the code, but soon enough, the language capabilities mandated more than passing the code through the container shell. Besides, for some reason, the server memory spikes frequently; we run the code inside self-removable containers on every 1s debounced keystroke.

In the end, we choose not to run the code indirectly but rather statically figure out the parts we need and execute them normally. That also advantaged us by being mistake tolerant, so as long as there is code that can be run (and syntactically correct), it’ll, despite other incomplete code

This article will explore various strategies to mitigate run user code, including using Web Workers, static code analysis, and more…

### You should care

There are many scenarios where you need to run user code, ranging from collaborative development environments like codesandbox and stackbiltz to customizable API platforms like January, even code playgrounds are susceptible to risks.
Namely, the two essential advantages from safely running user-provided code are:

1. Gaining your user trust; even if the user is trustworthy they may execute code copied from other intently-bad people.
2. Secure your environment; the last thing you need is a piece of code halting your server, think `while (true) {}`

### Define “Sensitive information”

Letting the user run code in the browser isn’t harmful until you’re concerned that this might subject some data to be stolen. Whatever data you’re concerned about will be considered sensitive information. for instance, in most cases JWT is sensitive information (when used as an authentication mechanism)

### What could go wrong

Think of **JWT** stored in cookies that get sent with every request**;** user can unintentionally invoke a request that sends it to an evil server, also

- Cross-Site Scripting (XSS).
- Denial of Service (DoS) attacks.
- Data exfiltration. Without proper safeguards, these threats can compromise the integrity and performance of your application.

### Methods

#### The Evil Eval

The simplest of all, yet the riskiest.

```ts
eval('console.log("I am dangerous!")');
```

When you run this code, it’ll log that message. Essentially eval acts as a JIT interpreter that is capable of accessing the global/window scope.

```ts
const res = await eval('fetch(`https://jsonplaceholder.typicode.com/users`)');
const users = await res.json();
```

This code uses `fetch` which is defined in the global scope. The interpreter doesn’t know about it but since eval can access window it knows. That implies running eval in the browser is different than running it in a server environment or worker.

```ts
eval(`document.body`);
```

How about this...

```ts
eval(`while (true) {}`);
```

This code will halt the browser tab. You might ask why a user would do this to themselves. Well, they might be copying code from the Internet. That's why it's preferred to do static analysis or time-box the execution.

You might want to check [MDN Docs about eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)

#### Function Constructor

This is similar to eval but it’s a bit safer since it can’t access the enclosing scope.

```ts
const userFunction = new Function('param', 'console.log(param);');
userFunction(2);
```

This code will log 2. The function constructor can’t access the enclosing scope, so the following code will throw an error.

```ts
function fnConstructorCannotUseMyScope() {
  let localVar = 'local value';
  const userFunction = new Function('return localVar');
  return userFunction();
}
```

But it can access the global scope so the `fetch` example from above works.

#### WebWorker

You can run `“Function Constructor` and `eval` in a webworker which is a bit safer due to the fact that there is no DOM access.

To put more restrictions in place consider disallow using global objects like `fetch, XMLHttpRequest, sendBeacon`

#### Isolated-VM

[Isolated-VM](https://www.npmjs.com/package/isolated-vm#security) is a library that allows you to run code in a separate VM (v8's Isolate interface)

```ts
import ivm from 'isolated-vm';

const code = `count += 5;`;

const isolate = new ivm.Isolate({ memoryLimit: 32 /* MB */ });
const script = isolate.compileScriptSync(code);
const context = isolate.createContextSync();

const jail = context.global;
jail.setSync('log', console.log);

context.evalSync('log("hello world")');
```

This code will log `hello world`

#### WebAssemply

This is exciting option as it provides a sandboxed environment to run code, one caveat though is that you need an environment with javascript bindings to run the code. However, an interesting project called [Extism](https://extism.org/) facilitates that. You might want to follow [their tutorial](https://extism.org/blog/sandboxing-llm-generated-code).

What is fascinating about that you'll use `eval` to run the code but given WebAssembly's nature, it's safer.

```ts
function evaluate() {
  const { code, input } = JSON.parse(Host.inputString());
  const func = eval(code);
  const result = func(input).toString();
  Host.outputString(result);
}

module.exports = { evaluate };
```

You'll have to compile the above code first using Extism which will output a wasm file that can be run in an environment that has wasm-runtime (browser or node.js).

```ts
const message = {
  input: '1,2,3,4,5',
  code: `module.exports = function sumCommaSeparatedIntegers(str) {
  return str.split(',').reduce((acc, curr) => acc + parseInt(curr), 0);
};`,
};

// continue running the wasm file
```

#### Docker

We're now moving to the server-side, Docker is a great option to run code in a separate auto-removable container. You can use `dockerode` to run the code in a container.

```ts
import Docker from 'dockerode';
const docker = new Docker();

const code = `console.log("hello world")`;
const container = await docker.createContainer({
  Image: 'node:latest',
  Cmd: ['node', '-e', code],
});
```

Keep in mind that you need to make sure the server have docker installed and running. I recommend to have a separate server dedicated to running only for this that acts as pure function server.

### Other options

- [Web Containers](https://webcontainers.dev/)
- [MicroVM (Firecraker)](https://aws.amazon.com/firecracker/)
- [Deno subhosting](https://deno.com/blog/subhosting)
- [Wasmer](https://wasmer.io/)
- [ShadowRealms](https://2ality.com/2022/04/shadow-realms.html)

### Safest option

I'm particularly fond of Firecracker but it's a bit of work to set up so if cannot afford the time yet you want to be in the safe side do a combination of static analysis and time-boxing execution. You can use [esprima](https://esprima.org/) to parse the code and check for any malicious code.

### Conclusion

Running user code is a double-edged sword. It can provide a lot of functionality and customization to your platform, but it also exposes you to significant security risks. It’s essential to understand the risks and take appropriate measures to mitigate them and remember that the more isolated the environment, the safer it is.

### References

- [January instant compilation](https://january.sh/posts/instant-compilation)
- [Running untrusted JavaScript in Node.js](https://pixeljets.com/blog/executing-untrusted-javascript/)
- [How do languages support executing untrusted user code at runtime?](https://langdev.stackexchange.com/a/2861)
