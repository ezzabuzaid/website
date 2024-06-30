```ts
feature('InventoryFeature', {
  policies: {
    cambodiaClient: policy.country('Cambodia'),
  },
  workflows: [
    workflow('PurchaseItem', {
      trigger: trigger.http({
        policies: ['cambodiaClient'],
        method: 'post',
        path: '/',
      }),
      actions: {...},
    }),
  ],
});
```

This example demonstrates how to limit a workflow to be accessible only from a specific country.
