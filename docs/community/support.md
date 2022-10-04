---
title: Support
sidebar_position: 2
---

# User Support

Liquid Metal has a small but enthusiastic team, and a steadily growing community.

With that in mind, please bear with us as we try to solve your issues :sweat_smile:.

Before participating in the Liquid Metal community, please have a read of our
[Code of Conduct][coc] which applies to users as well as builders of the project.

## Slack

If your issue is a fairly straightforward "where is the doc for X?" or "does this
config excerpt look right?" thing, then come post it in our [slack channel][slack].

_Note that our core maintainers are in UTC so may not get back to you immediately
if you post out of working hours._

If you do not get a response, open a [ticket](#github). Likewise, if your question
turns out to have a more elaborate answer than you thought, you will be asked to open a ticket on the
relevant repo so that someone in the community can be allocated and the process and answer tracked.

:::tip
Creating tickets for difficult questions helps us build a great knowledge base for
current and future community members :100:.
:::

## Github

We track all help tickets as issues in Github.

:::tip
Before you open a new ticket, search existing issues. Someone may have already
asked the same thing and maybe even discovered the answer :crossed_fingers:.
:::

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

:::info
Help tickets are for those who are stuck trying to accomplish something.
If you have found a bug, head to the [contributing](/docs/community/contributing) page :bug:.
:::

Once you have found a repo which you hope is the correct one, go to the `Issues`
tab and click on `New issue`. You will be invited to select from 3 templates.
Choose the `Request Help` one.

Start the title with `"How to ..."`, eg `"How to add SSH keys to my k8s cluster microvms?"`

Try to fill in **as much detail as possible** on the ticket to avoid a lot of
unnecessary back and forth with the community.
The template will guide you towards the sort of information we will need at a minimum.

Once you have opened your ticket, drop a link to it in the [slack][slack] channel to get more people
involved.

Make sure any answers are captured in the ticket so it can help the next person :tada:.

[coc]: /docs/community/coc
[slack]: https://weave-community.slack.com/archives/C02KARWGR7S
[capmvm]: https://github.com/weaveworks-liquidmetal/cluster-api-provider-microvm
[flintlock]: https://github.com/weaveworks-liquidmetal/flintlock
[site]: https://github.com/weaveworks-liquidmetal/site