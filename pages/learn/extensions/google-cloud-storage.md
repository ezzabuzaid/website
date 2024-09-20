---
title: Google Cloud Storage Extension
layout: learn
---
## Google Cloud Storage Extension

Google Cloud Storage extension is a storage extension that allows you to interact with Google Cloud Storage.

### Configuration

#### Settings

No settings for this extension.

#### Environment Variables

```txt
GOOGLE_CLOUD_STORAGE_SERVICE_ACCOUNT_KEY=The service account key to authenticate with Google Cloud Storage. It is required when not running in a Google Cloud environment.
```

#### Build Variables

No build variables for this extension.

### Actions

The following actions are available:

**actions.googleCloudStorage.uploadFile**: Upload a file to Google Cloud Storage.

#### Upload File

Upload a single file to Google Cloud Storage. It uses Node.js streams which makes memory efficient for large files.

**Upload a file to Google Cloud Storage**:

```ts
action.googleCloudStorage.uploadSingle();
```

**Limit the file size**:

```ts
action.googleCloudStorage.uploadSingle({
  outputName: 'fileUrl',
  maxFileSize: '5mb',
});
```
