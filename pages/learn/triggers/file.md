---
title: File Trigger
layout: learn
---

## File Trigger

The file trigger is an HTTP-based trigger designed to serve files directly from the server's file system.

```ts
workflow('ServeTxtFile', {
  tag: 'posts',
  trigger: trigger.file({
    path: '/txt',
  }),
  execute: () => {},
});
```

Note: The `execute` function should be kept empty for file triggers, as the file serving is handled automatically.

### How it works

Under the hood, the file trigger utilizes an HTTP trigger to serve files. It uses **public** directory as base directory for serving files.

**Public directory**

By default there are no files to serve but OpenAPI documentation, so in order to serve your own files you need to create a `public` directory in the root of your project.

```bash
.
├── package.json
├── ...
├── src
├── public
│   └── some-file.json
└── tsconfig.json
```

### How to use it?

#### Serve a static website

```ts
workflow('ServeStaticWebsite', {
  tag: 'docs',
  trigger: trigger.file({
    path: 'website',
  }),
  execute: () => {},
});
```

This workflow serves files from the `public/website` directory. It automatically looks for an `index.html` file when the path is a directory.

#### Serve Markdown files

```ts
workflow('ServeMarkdownFiles', {
  tag: 'blogs',
  trigger: trigger.file({
    path: '*.md',
  }),
  execute: () => {},
});
```

This example demonstrates serving all Markdown files in the specified directory. It's useful for documentation sites or blogs.

#### Rewrite JSONC files to JSON

```ts
workflow('RewriteJsoncFile', {
  tag: 'posts',
  trigger: trigger.file({
    path: '*.jsonc',
    rewrite: path => path.replace('.jsonc', '.json'),
  }),
  execute: () => {},
});
```

#### Rewrite logs file to today's log

```ts
workflow('RewriteLogFile', {
  tag: 'logs',
  trigger: trigger.file({
    path: 'log.txt',
    rewrite: path => {
      const date = new Date().toISOString().slice(0, 10);
      return `log-${date}.txt`;
    },
  }),
  execute: () => {},
});
```
