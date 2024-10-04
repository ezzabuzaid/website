```ts
import { upload } from '@extensions/gcs';
workflow('UploadFile', {
  trigger: trigger.http({
    method: 'post',
    path: '/upload',
  }),
  execute: async (trigger, request) => {
    const [fileUrl] = await upload(request);
    return fileUrl;
  },
});
```

<Footer
 gist="6d65224d9127b511672aa24106180877"
>
Upload a single file to Google Cloud Storage.
</Footer>
