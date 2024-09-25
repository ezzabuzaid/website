---
title: Validation
layout: learn
---

## Validation

Making sure the data you receive is correct and usable is a key part of any app. It helps prevent errors, improves security, and ensures that your app's logic operates on expected data types and formats.

January uses [Zod](https://github.com/colinhacks/zod) to perform data validation.

> Zod is a TypeScript-first schema validation library that provides a simple and intuitive API for defining and validating data structures.

To start, you need to add `input` property to the workflow trigger.

```ts
import { z } from 'zod';

export default project(
  feature('Todos', {
    workflows: [
      workflow('AddProduct', {
        tag: 'products',
        trigger: trigger.http({
          method: 'post',
          path: '/:id',
          input: trigger => ({
            tagline: {
              select: trigger.body.tagline,
              against: z.string().trim().min(1),
            },
            location: {
              select: trigger.body.location,
              against: z.string().trim().min(1),
            },
            name: {
              select: trigger.body.name,
              against: z.string().trim().min(1),
            },
            websiteUrl: {
              select: trigger.body.websiteUrl,
              against: z.string().url().trim(),
            },
          }),
        }),
        execute: async ({ input }) => {
          const product = await saveEntity(tables.products, {
            name: input.name,
            tagline: input.tagline,
            location: input.location,
            websiteUrl: input.websiteUrl,
          });
          return {
            id: product.id,
          };
        },
      }),
    ],
  })
);
```

The input property is a function that takes the trigger object as an argument and returns an object with the validation rules.

The object has the following properties:

- `select`: The data to be validated from the trigger **only**.
- `against`: The rules the data must follow defined using Zod.

### Example: validate path parameter is uuid

By default, the primary key of the table is `uuid` so it's good practice to make sure the client sends the correct value.

```ts
trigger.http({
  method: 'post',
  path: '/:id',
  input: trigger => ({
    id: {
      select: trigger.path.id,
      against: z.string().uuid(),
    },
  }),
}),
```

### Example: validate query pagination

```ts
trigger.http({
  method: 'get',
  path: '/',
  input: trigger => ({
    pageSize: {
      select: trigger.query.pageSize,
      against: z.number().min(1).max(100),
    },
    pageNo: {
      select: trigger.query.pageNo,
      against: z.number().min(1)
    },
  }),
}),
```

## Errors

January employs rfc-compliant error response [rfc-7807](https://www.rfc-editor.org/rfc/rfc7807.html) for error handling and is handled for you implicitly without having to extra steps.

Taking the pagination example above, if the `page` or `limit` is not a number, the error will be returned as follows:

```json
{
  "type": "validation-failed",
  "title": "Bad Request.",
  "status": 400,
  "detail": "Validation failed.",
  "instance": undefined,
  "errors": {
    "pageSize": [
      {
        "message": "Expected number, received string",
        "code": "invalid_type",
        "fatel": undefined,
        "path": "pageSize"
      }
    ]
  }
}
```

Error messages can be customized by providing a custom error message object.

```ts
trigger.http({
  method: 'get',
  path: '/',
  input: trigger => ({
    pageSize: {
      select: trigger.query.pageSize,
      against: z
        .number({ message: 'pageSize must be a number between 1 and 100' })
        .min(1)
        .max(100),
    },
    pageNo: {
      select: trigger.query.pageNo,
      against: z.number().min(1),
    },
  }),
});
```

```json
{
  "type": "validation-failed",
  "title": "Bad Request.",
  "status": 400,
  "detail": "Validation failed.",
  "instance": undefined,
  "errors": {
    "pageSize": [
      {
        "message": "pageSize must be a number between 1 and 100",
        "code": "invalid_type",
        "fatel": undefined,
        "path": "pageSize"
      }
    ]
  }
}
```

You're welcome to use all zod features, like error messages, transform, refine, and more.
