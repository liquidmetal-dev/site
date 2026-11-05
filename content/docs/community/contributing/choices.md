---
title: "Choices, choices, choices"
linkTitle: "What can I work on?"
weight: 2
---

There are many components to Liquid Metal and all touch on a different area of tech.
So whether you have a strength to play to or a knowledge gap you want to fill, there will
be something for everyone.

Our [project board][board] is publicly viewable, so check that out first to see what
is currently being worked on, and if there is anything scheduled which you like
the look of.

Or take a look at the table below to find something specific to your interests
or skillset.

| Repo | Languages | Role in Liquid Metal | Good for those who like... |
|------|-----------|----------------------|----------------------------|
|[capmvm][capmvm]|<ul><li>Go</li></ul>|A CAPI provider which schedules<br/>kubernetes nodes on microvms.|<ul><li>Kubernetes</li><li>Controllers</li><li>gRPC (client)</li><li>Scheduling</li></ul>|
|[flintlock][flint]|<ul><li>Go</li><li>Bash</li></ul>|A service which creates microvms<br/>on bare metal devices.|<ul><li>gRPC (server)</li><li>Low-level networking</li><li>Hardware</li><li>Systems programming</li><li>Linux</li></ul>|
|[microvm-operator][mvm-o]|<ul><li>Go</li><li>Bash</li></ul>|A kubernetes operator which creates<br/>microvms on bare metal devices.|<ul><li>Kubernetes</li><li>Controllers</li></ul>|
|[controller-pkg][ctrl-p]|<ul><li>Go</li></ul>|A library for tolls common to<br/>LM controllers/operator.|<ul><li>Kubernetes</li><li>gRPC (client)</li></ul>|
|[image-builder][image-build]|<ul><li>Make</li><li>Docker</li></ul>|A pipeline to build container images<br/>which are used as kernels and OSes<br/>in microvms.|<ul><li>Kernel compilation</li><li>Slick pipelines</li><li>Build optimisation</li><li>Linux scripting</li></ul>|
|[site][site]|<ul><li>Markdown</li><li>JS</li></ul>|This docs site you are reading right now!|<ul><li>Technical writing</li><li>React</li><li>Diagramming</li><li>Building clear content and tutorials</li></ul>|
|[fl][fl] and [hammertime][ht]|<ul><li>Go</li></ul>|CLI tools for flintlock with different<br/>aims and usecases.|<ul><li>CLI tooling</li><li>gRPC (client)</li></ul>|
|[LMATS][lmats]|<ul><li>Go</li></ul>|The Liquid Metal Acceptance test suite|<ul><li>Testing</li><li>Complex build patterns</li><li>Scripting</li></ul>|
|[terraform-equinix-liquidmetal][tf]|<ul><li>Terraform</li><li>Bash</li></ul>|A terraform module for provisioning<br/>flintlock hosts in Equinix.|<ul><li>Terraform</li><li>Bare metal</li><li>Scripting</li><li>Networking</li></ul>|
|[microvm-action-runner][runner]|<ul><li>Go</li></ul>|A service for creating ad-hoc<br/>Github action runners in microvms.|<ul><li>HTTP</li><li>Scheduling</li></ul>|

If you are not ready to write code yet, but you see something which can be improved
or have an idea, feel free to open an issue. Not all contributions come in the form
of code, and we appreciate anyone using and reporting on the project to help make it better.

We also encourage people to review others' PRs and help streamline the submission
process.

## Languages

All system components are written in Go. The [flintlock][flint] component wraps
[firecracker][fc] and [cloud hypervisor][ch], which are both written in Rust and
occasionally require debugging. We anticipate needing to contribute in those
projects in the future.

This website is built using [Docusaurus](https://docusaurus.io) and, while it is
mostly plug-and-play markdown, it allows customisation with ReactJS and CSS. We have no front-end
engineers on the core team, so any contributions in this area would be very highly
valued :sparkles:.

## Issue labelling and prioritisation

Each project uses the same labelling system. You can use these to help you pick
out the best issue for your experience level.

- Issues labelled `good first issue` should be accessible to folks new to the repo,
  as well as to open source in general.
  They are likely to be non-urgent, so you can take your time to work on your solution.

  These issues should present a low/non-existent barrier to entry with a thorough description,
  easy-to-follow reproduction (if relevant) and enough context for anyone to pick up.
  The objective should be clear, possibly with a suggested solution or some pseudocode.
  If anything similar has been done, that work should be linked.

  If you have come across an issue tagged with `good first issue` which you think you would
  like to claim but isn't 100% clear, please ask for more info! When people write issues
  there is a _lot_ of assumed knowledge which is very often taken for granted. This is
  something we could all get better at, so don't be shy in asking for what you need
  to do great work :smile:.

- `help wanted` issues are for those a little more familiar with the code base,
  but should still be accessible enough to newcomers, with thorough descriptions
  and clear outcomes.

All other issues without those labels are also up for grabs, but are likely to
require a fair amount of context. Along with various `kind/x` (e.g. `kind/feature`)
labels we have `priority/x` markers. These indicate the urgency with which a solution
should be submitted.

- `priority/critical`: These are time sensitive issues which should be picked up
  immediately. If an issue labelled critical is not assigned or being actively
  worked on, someone is expected to drop what they're doing immediately to work on it.
  This usually means the core [team][team], but community members are welcome to
  claim issues at any priority level if they get there first. _**However**, given the
  pressing timeframe, should a non-core contributor request to be assigned to a
  critical issue, they will be paired with a core team-member to manage the tracking,
  communication and release of any fix as well as to assume responsibility of all progess._

- `priority/important-soon`: Must be assigned as soon as capacity becomes available.
  Ideally something should be delivered in time for the next release, but as we are
  a small team we are relaxed about this. If you are looking to make a big impact
  and feel confident enough to do so, grab one of these issues!

- `priority/important-longterm`: Important over the long term, but may not be currently
  staffed and/or may require multiple releases to complete.

- `priotity/backlog`: There appears to be general agreement that this would be
  good to have, but we may not have anyone available to work on it right now or
  in the immediate future. PRs are still very welcome, although it might take a
  while to get them reviewed if reviewers are fully occupied with higher priority
  issues.

- `needs-investigation`: There is currently insufficient information to either
  categorize properly, or to understand and implement a solution. This could be
  because the issue opener did not provide enough relevant information, or because
  more in-depth research is required before work can begin. If you would like to
  do the work to provide the required information and get a ticket bumped to actionable,
  please go for it!

These priority categories have been inspired by the [Kubernetes contributing guide][k8s-contrib].

## Getting assigned

Once you have found something which you'd like to tackle, tag a [member of the team][team]
on the issue and ask for it to be assigned to you.

We should respond pretty quickly to this, so you can get started right away. If you don't
open a PR within a couple of weeks we may ping you on the issue to find out how things
are going. This is not to put pressure on you to "work faster" (please work at your own pace!)
but so that we can check that you are still on the case and whether you need any help.
If you no longer have time for the issue, we can have it reassigned.

[slack]: https://cloud-native.slack.com/archives/C07B5R5BLBZ
[team]: /docs/community/team
[board]: https://github.com/orgs/weaveworks-liquidmetal/projects/1/views/2
[flint]: https://github.com/liquidmetal-dev/flintlock
[mvm-o]: https://github.com/liquidmetal-dev/microvm-operator
[ctrl-p]: https://github.com/liquidmetal-dev/controller-pkg
[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[image-build]: https://github.com/liquidmetal-dev/image-builder
[site]: https://github.com/liquidmetal-dev/site
[fl]: https://github.com/liquidmetal-dev/fl
[ht]: https://github.com/warehouse-13/hammertime
[lmats]: https://github.com/liquidmetal-dev/liquid-metal-acceptance-tests
[tf]: https://github.com/liquidmetal-dev/terraform-equinix-liquidmetal
[runner]: https://github.com/liquidmetal-dev/microvm-action-runner
[fc]: https://github.com/firecracker-microvm/firecracker
[ch]: https://github.com/cloud-hypervisor/cloud-hypervisor
[k8s-contrib]: https://github.com/kubernetes/community/blob/master/contributors/guide/issue-triage.md
