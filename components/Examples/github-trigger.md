```ts
import { saveEntity } from '@extensions/postgresql';
workflow('IssueLabeledWorkflow', {
  tag: 'github',
  trigger: trigger.github({
    event: 'issues.labeled',
  }),
  execute: async trigger => {
    await saveEntity(tables.issues, {
      title: trigger.issue.title,
      body: trigger.issue.body,
    });
  },
});
```

<Footer
 gist="57e6042b98a45ba46c396bb1354180f5"
 >
Receive events from GitHub repositories such as `push`, `pull_request`, `issues`, and more. This trigger is available in the GitHub extension.
</Footer>
