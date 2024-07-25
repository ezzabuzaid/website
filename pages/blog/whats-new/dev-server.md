---
date: '2024-07-24T00:00:00.000Z'
category: whats-new
title: 'Dev Server'
layout: blog-post
author: ezzabuzaid
heroImage: /static/images/blog/whats-new/dev-server/serverize-showcase.png
---

Guess what? You no longer need to set up a dev server or worry about its deployment anymore. Yes, it’s all within January! You can see logs and requests in real time as they come in. Not only that, it will automatically reload whenever you make any changes, and wait for it... waaaaaait for it... yes, you can take the fully qualified URL and run the workflow outside of January.

```bash
# use january dev subdomain and suffix it with the workflow path
https://dev.january.app/<workflow-path>

# Set the project id to the "ApiKey" header

ApiKey: <project-id>
```

This is a huge milestone and the most exciting release we have this month. **Serverize** isn’t new, but it’s been kept under wraps to ensure it’s robust and costs you nothing. Yup, completely free and adds nothing to your plan.

## How does it work?

Each project gets a dedicated dev server with 128MB of memory, which will shut down after 60 minutes of inactivity. Serverize essentially serves as a development environment. However, it’s undergoing heavy development to enhance its stability, particularly focused on:

- Improving server reloading
- Speeding up server creation

Note: _The techincal details will be in a separate blog post_

Serverize is a significant step towards making January the complete platform for API development. Once it’s stable, our focus will shift towards providing a better experience for running workflows.

## How to use it?

It's enabled for existing projects and new ones, you can know open the swagger panel from within Janaury and run a workflow (HTTP) from there.

## What's next?

- [ ] Customize environment variables.
- [ ] Shutdown on idle.
- [ ] Support different deployment targets.
