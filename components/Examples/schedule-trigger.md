```ts
workflow('ReportServerHealth', {
  tag: 'posts',
  trigger: trigger.schedule({
    pattern: '0 0 * * *',
  }),
  actions: {
    ...
  },
});
```

Schedules a workflow to run at a specific time or at regular intervals. This trigger is available in an Schedule extension.
