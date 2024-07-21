---
date: '2021-03-09T00:00:00'
title: 'Going Minimalist: Choosing DSL Over Bunch of Inputs'
category: journal
layout: blog-post
author: ezzabuzaid
---

To catch you up quickly, January.sh is a low code platform that builds backend service and generates human readable code as result, the general product user persona can be put as following: someone who worked with similar products before (any other low code platform) and have general understanding of the technical side of building a product/tool.

### The Requirement

This requirement (similar to most parts of the system), is to let the user add policy rule -condition which applies to a workflow to determine whether the client (workflow initiator) have the permission to access it-

The final design have has decided to be the best after a few iterations is

![Mockup shows the cognitive overload associated with policy rule builder](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3f6ab320-33a4-44e6-8821-24a5ccf15aa5_1224x834.png)

I hear you asking for more information. Okay, here it is…

In context of a policy, there are another two important parts: Tables -database tables- and Workflow trigger, think, http request. It works as follows:

- The client’s user triggers the workflow, say, through a button of their website, the trigger holds the user information that initiates it.

- In the system, my user (the client) has a table named Posts and want to restrict the update operation to only the users whom created them (the posts) in the first place.

So that was difficult at first and dull every other time to do but, but that was a part of the problem—as the user only creates a handful of policies, typically two or three—the other part is the mental state of tracking policy rules when they get complex, the debugging. You see those above? Imagine 6 or 7 with different sources like external, http calls and so on.

The standard UI approach falls short in these scenarios, unable to handle the complexity and diversity of the tasks at hand effectively.

### The DSL

I kept asking myself “How To Make It More Light On The User?”

I did my homework, refreshed my knowledge and thoughts about modern approaches to designing better user experiences. I looked up many similar products that offer similar features or components to January.sh, and all of them lack a better approach to this problem. I consulted a few friends in the fields, and pretty much they had the same opinion.

It is valid though when you think about it; the user already knows how to deal with this kind of complex function, we’re already trained on this, and I only noticed it when that UI was my first thought to solve the problem.

Nevertheless…

This might resonate with fellow programmers; in the event of a problem that cannot be solved, I let go of the keyboard and keep staring at the screen, long gaze as if it owes me money. Wandering through my mind, recalling how simple my childhood was, not kidding, I just let go of the present moment, sometimes I go and read about completely different subject to diffuse my mind.

Few days in, I had to write an email, I have a habit that I forget writing the “To“ field before hitting the Send button, the Email software does the job of telling me. I started typing “xyz@company.com“ then before hitting the Send button again my mind screamed “there it is, loook. the way your wrote the email” and booom. OMG, that is perfect, I only needed one field to write the email and not 3, only one! It make sense, otherwise the user would have to fill three fields; the sender id, the domain, the suffix. I guess I’m never going to forget writing the “To“ field again.

---

Let me catch you up quickly, the email, technically, is a form of **DSL** (Domain Specific Language) - A DSL is like using a special set of LEGO blocks designed just for building castles, nothing else. The LEGO blocks are built to be put in one manner otherwise it’d not fit properly. Similarly, a DSL ensures you use specific commands or syntax tailored for a particular task, like crafting emails.

I hope we’re on the same page so far. Going back to the problem on hand, how we can do a DSL such that it simplifies rule entry?

I won’t go into details of the many revisions and the behind the scene technicalities (maybe for another post) however the current state to achieve the requirement is

```ts
@tables:posts(id: @trigger:body.postId).userId = @trigger:params.userId
```

Okay, it is not as simple as writing an email I know, but -there is always a but- it can be greatly simplified by creating optimised field specifically for that little gorgeous DSL that can provide autocompletion and show suggestions, something like this

VSCode search field that shows how writing DSL can be made simple

There is a un-negotiable good amount of work there, it is most otherwise the learning curve will burden the user.

## You Need To Know

Few things worth noting

**Knowing your user background.** It started as a mere thought and hope that it would work, but what brought it to reality was the understanding that our customers, both existing and potential, are familiar with using specialized input formats. Let's face it, if a customer isn't versed in concepts like workflows and tables, they'll struggle with the system (Given that we're new and can't invest in educational materials just yet). Take Notion's advanced filter function—it could certainly use a DSL, but given the diverse backgrounds of their users, a specialized format might be foreign for many.

**Be specific.** If you’re not wary, soon enough you’ll be building a monster language that is ugly and buggy. Don’t try to fit all your needs into the DSL, rather, be specific to what it should enable the user to do and only use it when needed!

**Limited by design.** At the time I started defining the construct of the DSL, I made sure I limit it to be expression-only language, or in another words, no declarations (variables, functions, …etc). Even now, there are no plans, yet, to support math expressions. That shall set the tone and mentality for us and our users.

Here is a simple comparison from what we learned so far

Cons

- Learning curve, although will be mitigated due to the optimisation.

- Heavy technical work on both the backend and frontend.

- Requires specialised knoweldge in building language parsers and dealing with LSPs

- Limited in capabilities by design due to its nature of being particualrry for single task.

Pros

- Used across the system.

- little mental overhead compared to traditional approches. Lighter on the mind if you well.

- Easier to maintain/debug and reason about.

## The Constructs

Here is glimpse on the DSL components.

![DSL constructs](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5554296a-b2fd-4370-9fae-0d677616aa36_1060x702.png)
The following input made of three parts, the **namespace**, **property access**, and **property**. The “body“ is property access as sub property is branched from. In case “totalPrice“ have property branch it’d be property access as well.

![Digest DSL components](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F326f1aae-e70a-4b6e-a270-89897d2a38dd_2258x1094.png)

This a bit more advanced example, showcases how the DSL supports more complex operations, such as configuring an extensions. In ts`“@extensions:postgresql(connection=@process.runtime.CONNECTION_STRING)”` the DSL is used to define a database connection:

- `@extensions` serves as the namespace for specifying the type of service or plugin being configured.

- postgresql is an identifier within the @extensions namespace, indicating the specific database extension being used.

- connection= represents an assignment operation, which assigns a value to the connection property of the postgresql extension.

- @process:runtime.CONNECTION_STRING is same as the previous image.

What helped the most is knowing the final target for the DSL, in our case it is purely used for code generation and as communication format within the system.

January.sh have Extensions feature that let the user customise their codebase (tools, frameworks, integrations, ..etc), also table, workflows, policies/rules and queries. This is where the **Namespace** concept came from. It is an indicator on where to start evaluating an expression.

To build a true DSL for your users, it has to be developed iteratively based on the system requirements and their feedback.

The very first version only presumed the user will always provide an ID to look up a table record “@tables:posts(id-goes-here).userId“ as we were developing a proof of concept. Once handed to the user, the very first impression was how to use different parameter. A good feedback, although anticipated. The point was to verify the clarity, The readablity.

The next version allowed parameterised lookups as well as multi column select “@tables(id=id-goes-here).{userId, title}“

Over thoughting the syntax and the capabilities before hand won’t be as much of an advantage, if that is what you think.

## Next Steps

Currently, our query builder is adequate for basic operations but still falls short for more complex tasks. We're actively working to make a balance between usability and development efforts. For simple queries, the query builder suffices, but it becomes less practical for more intricate needs.

While users have the option to resort to writing SQLite syntax for such cases, we’re looking to streamline the process somehow.

![Query Builder](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d3c4e5d-ca10-49f6-9583-2cd66570de2a_1838x948.png)

I’m not keen about using the DSL in this context because It’ll be another query language pretty quick. But -of course there is a but- we’re experimenting with using LLM -fine tuned on the DSL syntax- to assist the user.

Happy to hear from you if you have any thoughts, let me know in the comments

Do you have product, company, or an agency and want to add it to writer.sh directory listing? if you’re a freelancer, please fill this form

## Closing Notes

I have to admit that I’m still worried about this decision, DSLs have long history on how bad they become with time, whether learning curve, breaking changes, complexity (trying to be do more). Nevertheless, at this time it solves a problem and I only have time to deal with the present moment.
