---
title: How It Works
layout: about
---

# How It Works

January’s power lies in building and deploying APIs quickly with almost no upfront setup, especially at the beginning.

The philosophy behind January is that you should be able to colocate the logic that constitutes a feature without splitting your thoughts across many places. At the same time, you want to focus on building this feature without worrying about tool integrations.

CanonLang and the extension system ensure that split is a fact.

January constitute of 3 main parts:

1. **CanonLang**
2. **The Compiler**
3. **The Extension System**

### CanonLang

**CanonLang** is a statically evaluated declarative DSL that uses TypeScript as the host language built for the purpose of defining APIs in a way that is easy to reason and understand. _The decision to use TypeScript was due to the simplicity of Javascript syntax and the power of TypeScript types._

CanonLang by itself is minimal; having only few constructs that make up the language yet it is designed to be extensible through the extension system.

Some of the constructs in CanonLang are: `project`, `feature`, `workflow`, `table`, `field`, `policy` and few more.

### The extension system

**The extension system** provides primitives to complement CanonLang, which then transforms these primitives into information that the compiler can understand.

For example, a database extension can provide primitives to interact with a database, such as `field.money`, `validation.usd()` etc. These primitives can be used in CanonLang to define a database schema.

```ts
table({
  fields: {
    amount: field.money({ validations: [validation.usd()] }),
  },
});
```

Extension DevKit being heavily developed, thereby not ready for community contributions.

### The Compiler

The compiler is broken down into two components: the **integrator**, which creates the final data structure and communicates with the extension registry to enrich it with the necessary information about how and what to generate that can be fed later to the **generator**, which produces ready-to-run Node.js code. In fact, the data structure can be utilized to generate code in other frameworks as well.

Semantic analysis is done by the integrator, which ensures that the CanonLang code is correct (e.g using primitives from the installed extensions, duplicate fields, ...etc) and complete.

The resulting code then can be deployed to a server with a help of a deployment extension or manually.
