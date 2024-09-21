```ts
import { uploadFile } from '@extensions/google-cloud-storage';
workflow('UploadFile', {
  trigger: trigger.http({
    method: 'post',
    path: '/upload',
  }),
  execute: async trigger => {
    const url = await uploadFile({
      maxFileSize: '5mb',
    });
    return url;
  },
});
```

<Footer
 gist="6d65224d9127b511672aa24106180877"
>
Upload a single file to Google Cloud Storage.
</Footer>
