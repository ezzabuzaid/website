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

<Footer
 gist="1329d7ff4f424e85c43677f9017e5286"
>
This example demonstrates how to limit a workflow to be accessible only from a specific country.
</Footer>
