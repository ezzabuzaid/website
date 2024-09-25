---
title: Features
layout: learn
---

## Feature

A feature is a way to group related functionalities, such as tables, workflows, policies, under a common theme. It serves as an organizational unit within the system, allowing you to manage, reason and understand code more easily by clustering related elements together.

You can define a feature using the `feature` function. A feature is composed of the following elements:

1. Workflows - A list of workflows that belong to the feature.
2. Tables - A list of tables that belong to the feature.
3. Policies - A list of policies that belong to the feature (experimental).

### Example

Here's an example of how a feature can be defined using the `feature` function:

```ts
feature('Tree', {
  workflows: [workflow(...)],
  tables: {
    leaves: table(...),
  },
});
```
