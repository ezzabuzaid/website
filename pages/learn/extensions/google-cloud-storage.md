---
title: Google Cloud Storage Extension
layout: learn
---

## Google Cloud Storage Extension

Google Cloud Storage extension is a storage extension that allows you to interact with Google Cloud Storage.

```txt
GOOGLE_CLOUD_STORAGE_SERVICE_ACCOUNT_KEY=The service account key to authenticate with Google Cloud Storage. It is required when not running in a Google Cloud environment.
```

### API

#### Upload File

Upload a single file to Google Cloud Storage. It uses Node.js streams which makes memory efficient for large files.


```ts
import { upload } from '@extensions/google-cloud-storage';

workflow('UploadFile', {
  tag: 'posts',
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

**Limit the file size**:

```ts
import { upload } from '@extensions/google-cloud-storage';

workflow('UploadFile', {
  tag: 'posts',
  trigger: trigger.http({
    method: 'post',
    path: '/upload',
  }),
  execute: async (trigger, request) => {
    const [fileUrl] = await upload(request, {
      maxFileSize: '5mb',
    });
    return fileUrl;
  },
```
