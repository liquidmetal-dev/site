---
title: Feature Requests
---

# Feature Requests

Liquid Metal has a small but enthusiastic team, and a steadily growing community.

With that in mind, please bear with us as we process your suggestions :sweat_smile:.

Before participating in the Liquid Metal community, please have a read of our
[Code of Conduct][coc] which applies all involved in any capacity with the project.

## Project board

The Liquid Metal project board can be found in [Github][board]. The board cannot be
edited by outsiders, but we recommend that you check existing features before opening
a new one.

## Request process

First you need to determine the scope of your request and which component(s) it would
apply to. You will need to open a ticket on the correct github repository. (Or at least
try to. We can always move it later.)

Here is a rule of thumb:
- Suggesting a change to the scheduling of microvms as kubernetes nodes? You'll want
  [capmvm][capmvm].
- Suggesting a change to the running of microvms on devices? That will be [flintlock][flintlock].

There are many other components, but these are the two main ones.

If you have a huge idea which will impact most or all of the project, open a [discussion][discussion]
at the [capmvm][discussion] level.

If are not at all sure where to open the request, just pick the repo which looks
sort of right and we can move it later if it is wrong :slightly_smiling_face:.

### How to open a feature request ticket

Once you have found a repo which you hope is the correct one, go to the `Issues`
tab and click on `New issue`. You will be invited to select from 3 templates.
Choose the `Feature request` one.

Try to fill in **as much detail as possible** on the ticket to avoid a lot of
unnecessary back and forth. Pay special attention to the user journey and how your idea will benefit
the project. If you have any ideas on implementation, note those too.
The template will guide you towards the sort of information we will need at a minimum.

Once you have opened your request, drop a link to it in the [slack][slack] channel to get more people
involved.

### Feature acceptance

We hope to respond to and prioritize new feature requests within 7 working days. Please wait for
up to 14 before nudging us.

If, after discussion, your idea is accepted, it will be scheduled for POC or work. If you
would like to contribute all or part of it yourself, please do! See the [contributing][contributing]
page to learn how to do this.

The maintainers may also decide that your idea is not right for the project at this
time and close the request as rejected.
A feature request is the start of a discussion, so don't be put off if it is not
accepted. Features which either do not contribute to or directly work against
the project goals will likely be rejected, as will highly specialised usecases.


[coc]: /docs/community/coc
[slack]: https://weave-community.slack.com/archives/C02KARWGR7S
[board]: https://github.com/orgs/liquidmetal-dev/projects
[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[discussion]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/discussions/categories/ideas
[flintlock]: https://github.com/liquidmetal-dev/flintlock
[contributing]: /docs/community/contributing
