```ts
workflow('IssueLabeledWorkflow', {
  tag: 'github',
  trigger: trigger.github({
    event: 'issues.labeled',
  }),
  actions: {
    recordIssue: trigger =>
      action.database.insert({
        table: useTable('Issues'),
        columns: [
          useField('title', trigger.issue.title),
          useField('body', trigger.issue.body),
        ],
      }),
  },
});
```

<Footer
 gist="57e6042b98a45ba46c396bb1354180f5"
 >
Receive events from GitHub repositories such as `push`, `pull_request`, `issues`, and more. This trigger is available in the GitHub extension.
</Footer>
