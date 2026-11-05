---
title: "Bug and Issue reporting"
linkTitle: "Report a Bug"
weight: 5
---

Liquid Metal has a small but enthusiastic team, and a steadily growing community.

With that in mind, please bear with us as we process your report :sweat_smile:.

Before participating in the Liquid Metal community, please have a read of our
[Code of Conduct][coc] which applies all involved in any capacity with the project.

## Project board

The Liquid Metal project board can be found in [Github][board]. The board cannot be
edited by outsiders, but we recommend that you check existing issues before opening
a new one.

## Issue process

First you'll need to determine which component(s) the bug appeared in. This may
be tricky because Liquid Metal has a lot of moving parts.
You will need to open a ticket on the correct github repository. (Or at least
try to. We can always move it later.)

Here is a rule of thumb:
- If something is not working as it should in your CAPI management cluster, you'll want to
  open a ticket in [capmvm][capmvm].
- If something is misbehaving on your bare-metal device, it's probably [flintlock][flintlock].

There are many other components, but these are the two main ones.

If are not at all sure where to open the bug, just pick the repo which looks
sort of right and we can move it later if it is wrong :slightly_smiling_face:.

### How to open an issue or bug report

Each repository will have additional documentation on opening bugs with specific
instructions on what data to gather and which things to try, but here are some
general rules which apply across the whole project.

1. Once you have found a repo which you hope is correct one, before opening anything,
  take a good look through existing issues.

1. More is more: give as much information as it is humanly possible to give.
  Highly detailed issues are more likely to be picked up because they can be prioritized and
  scheduled for work faster. They are also more accessible
  to the community, meaning that you may not have to wait for the core team to get to it.
  The template will guide you towards the sort of information we will need at a minimum,
  so **please follow it**.

1. Please do not open an issue with a description that is **just** a link to another issue,
  a link to a slack conversation, a quote from either one of those, or anything else
  equally opaque. This raises the bar for entry and makes it hard for the community
  to get involved. Take the time to write a proper description and summarise key points.

1. Take care with formatting. Ensure the [markdown is tidy][md], use [code blocks][blocks] etc etc.
  The faster something can be read, the faster it can be dealt with.

1. Keep it civil. Yes, it is annoying when things don't work, but it is way more fun helping out
  someone who is not... the worst. Remember that conversing via text exacerbates
  everyone's negativity bias, so throw in some emoji when in doubt :+1: :smiley: :rocket: :tada:.

If no similar issue exists in that repo, open a new one. Go to the `Issues`
tab and click on `New issue`. You will be invited to select from 3 templates.
Choose the `Bug report` one.

Once you have opened your issue, drop a link to it in the [slack][slack] channel to get more people
involved.

### How we process new bugs

We hope to get to bug reports within a couple of working days, but please wait for at least
7 before nudging. (Unless it is a super critical end-of-the world bug, then by all means
make some noise :loudspeaker:.)

When we process the bug we will assign a `priority/` label to it. Please do not be
upset if it does not receive the highest priority when you think it should. Many things
go into our scheduling process, including engineer availability and the impact of the
bug on other users.

If you already have a fix in mind, or you'd like to dig in and try solving it, that's
awesome! Let us know on the issue and it will be assigned to you. Head over to the
[contribution guide][contrib] for next steps.

[coc]: /docs/community/coc
[slack]: https://cloud-native.slack.com/archives/C07B5R5BLBZ
[board]: https://github.com/orgs/weaveworks-liquidmetal/projects/1/views/2
[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[discussion]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/discussions/categories/ideas
[flintlock]: https://github.com/liquidmetal-dev/flintlock
[contributing]: /docs/community/contributing
[md]: https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/getting-started-with-writing-and-formatting-on-github
[blocks]: https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-and-highlighting-code-blocks
[contrib]: /docs/community/contributing/welcome
