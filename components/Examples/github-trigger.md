```ts
workflow('IssueLabeledWorkflow', {
  tag: 'github',
  trigger: trigger.github({
    event: 'issues.labeled',
  }),
  actions: {
    recordIssue: action.database.insert({
      table: useTable('Issues'),
      columns: [
        useField('title', '@trigger:issue.title'),
        useField('body', '@trigger:issue.body'),
      ],
    }),
  },
});
```

You can use the GitHub Trigger to receive events from GitHub repositories such as `push`, `pull_request`, `issues`, and more. This trigger is available in the GitHub extension.
