---
title: Firebase Auth Extension
layout: learn
---

## Firebase Auth Extension

Firebase Auth extension is an authentication extension that allows you to interact with Firebase Auth.

### Configuration

#### Settings

No settings for this extension.

#### Environment Variables

```txt
FIREBASE_AUTH_SERVICE_ACCOUNT_KEY=The service account key to authenticate with Firebase Auth\nIt is required when not running in a Firebase/Google cloud environment.
```

#### Build Variables

No build variables for this extension.

### Policies

The following policies are available:

- **policy.authenticate**: Verifies a Firebase ID token (JWT) validity.

#### Authenticate

This policy does 3 things:

1. Ensure the token is present in the `authorization` header.
2. It is prefixed with `Bearer` with trailing space.
3. Token is valid and not expired using Firebase Admin SDK.

```ts
feature('UsersFeature', {
  policies: {
    isAuthenticated: policy.authenticate(),
  },
  workflows: [
    workflow('GetUser', {
      trigger: trigger.http({
        policies: ['isAuthenticated'],
        method: 'get',
          path: '/user/:id',
      }),
      actions: {...},
    }),
  ],
});
```

In this example, the `isAuthenticated` policy is applied to the `GetUser` workflow which means that the workflow will only be executed if the Firebase ID token is valid.
