---
title: Use Uploaded File URL
layout: learn
---

## Create a workflow that uploads a file and saves the URL to posts table

In this recipe, we will create a workflow that uploads a file to Google Cloud Storage and saves the URL to the posts table.

- Define a "posts" table with a "cover" field of type "url".

```ts
table({
  fields: {
    title: field({ type: 'short-text' }),
    cover: field({ type: 'url' }),
  },
});
```

- Create a workflow with a trigger that accepts a file and an ID.

```ts
workflow('UploadPostCoverWorkflow', {
  tag: 'tasks',
  trigger: trigger.http({
    method: 'post',
    path: '/:id',
  }),
  output: output('return {file: steps.fileUrl}'),
  actions: {
    uploadFile: action.googleCloudStorage.uploadSingle({
      outputName: 'fileUrl',
    }),
    setPostCover: action.database.set({
      columns: [useField('cover', '@workflow:fileUrl')],
      table: useTable('posts'),
      query: query(where('id', 'equals', '@trigger:path.id')),
    }),
  },
});
```

In this example, the fileUrl is returned from the uploadFile action and saved to the cover field of the post with the ID specified in the trigger path.

The `action.googleCloudStorage.uploadSingle` action expects multipart/form-data with a field.

Complete code:

```ts
export default project(
  feature('blogs', {
    workflows: [
      workflow('UploadSingleFileWorkflow', {
        tag: 'tasks',
        trigger: trigger.http({
          method: 'post',
          path: '/:id',
        }),
        output: output('return {file: steps.fileUrl}'),
        actions: {
          uploadFile: action.googleCloudStorage.uploadSingle({
            outputName: 'fileUrl',
          }),
          setPostCover: action.database.set({
            columns: [useField('cover', '@workflow:fileUrl')],
            table: useTable('posts'),
            query: query(where('id', 'equals', '@trigger:path.id')),
          }),
        },
      }),
    ],
    tables: {
      posts: table({
        fields: {
          title: field({ type: 'short-text' }),
          cover: field({ type: 'url' }),
        },
      }),
    },
  }),
);
```
