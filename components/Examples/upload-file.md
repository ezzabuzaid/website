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

Upload a single file to Google Cloud Storage.
