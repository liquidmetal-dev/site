---
title: "User Support"
linkTitle: "Support"
weight: 1
---

Liquid Metal has a small but enthusiastic team, and a steadily growing community.

With that in mind, please bear with us as we try to solve your issues :sweat_smile:.

Before participating in the Liquid Metal community, please have a read of our
[Code of Conduct][coc] which applies to users as well as builders of the project.

> [!NOTE]
> If you are contributing to the project and need help with your work, head to the
> [contributing][contrib] page.

## Slack

If your issue is a fairly straightforward "where is the doc for X?" or "does this
config excerpt look right?" thing, then come post it in our [slack channel][slack].

_Note that our core maintainers are in UTC so may not get back to you immediately
if you post out of working hours._

If you do not get a response, open a [ticket](#github). Likewise, if your question
turns out to have a more elaborate answer than you thought, you will be asked to open a discussion on the
relevant repo so that someone in the community can be allocated and the process and answer tracked.

> [!TIP]
> Creating tickets for difficult questions helps us build a great knowledge base for
> current and future community members :100:.

## Github

We track all help tickets as discussions in Github.

> [!TIP]
> Before you open a new discussion, search existing discussions. Someone may have already
> asked the same thing and maybe even discovered the answer :crossed_fingers:.

The Liquid Metal project has many repositories, so it may be tricky to figure out
exactly _where_ you should search for or open a ticket. Chances are it will be in one of two main
repos, here are some general guidelines:

- If something is going wrong in your CAPI management cluster, you'll want to
  open a ticket in [capmvm][capmvm].
- If something is broken on your bare-metal device, it's probably [flintlock][flintlock].

These rules wont be perfect all the time, but in that case someone on the team will
move the ticket to the correct place.

If you really don't know where the issue could possibly be coming from, just make your
best guess, or open a ticket at the [site][site] repo. We'll move it for you later :slightly_smiling_face:.

### How to open a help ticket

> [!NOTE]
> Help tickets are for those who are stuck trying to accomplish something.
> If you have found a bug, head to the [contributing](/docs/community/contributing) page :bug:.

Once you have found a repo which you hope is the correct one, go to the `Discussions`
tab.

1. **Search existing discussions.** If something similar already exists, please contribute to the conversation there.

1. If you don't find anything, select `Q&A`, and click on `New discussion`.

1. Start the title with `"How to ..."`, eg `"How to add SSH keys to my k8s cluster microvms?"`

1. Explain what you are trying to accomplish, what you have tried, and the behaviour you are seeing.

1. Please include the exact the commands you're using, and all the steps you took to setup your environment.
   Please ensure everything is formatted nicely with [code blocks](https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-and-highlighting-code-blocks).

1. When providing verbose logs, please use either a Gist or [HTML detail tags](https://gist.github.com/ericclemmons/b146fe5da72ca1f706b2ef72a20ac39d).

Once you have opened your ticket, drop a link to it in the [slack][slack] channel to get more people
involved.

Make sure any answers are captured in the discussion so it can help the next person :tada:.

It may turn out that it was a bug after all! In which case a new issue will be created,
and the rest of the investigation will be tracked there.

[coc]: /docs/community/coc
[contrib]: /docs/community/contributing
[slack]: https://cloud-native.slack.com/archives/C07B5R5BLBZ
[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[flintlock]: https://github.com/liquidmetal-dev/flintlock
[site]: https://github.com/liquidmetal-dev/site
