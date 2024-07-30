```ts
workflow('UploadFile', {
  trigger: trigger.http({
    method: 'post',
    path: '/upload',
  }),
  actions: {
    uploadFile: action.googleCloudStorage.uploadSingle({
      outputName: 'fileUrl',
      maxFileSize: '5mb',
    }),
  },
});
```

<Footer
 gist="6d65224d9127b511672aa24106180877"
>
Upload a single file to Google Cloud Storage.
</Footer>
