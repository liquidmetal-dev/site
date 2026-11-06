---
title: CI runners
weight: 2
---

Run each CI job in a fresh microVM that is deleted when the job ends. Nothing from one
job can leak into the next: no files, no processes and no credentials.

Containers on a shared runner host all share one kernel. A microVM gives each job its own
kernel, so a job can run Docker, load kernel modules or do other privileged work without
putting the host or other jobs at risk.

This is a good fit when you want to:

- Self-host runners on your own hardware, for cost, performance or data-locality reasons.
- Run jobs from untrusted contributors, such as pull requests from forks.
- Give jobs root access without sharing a host between them.

## How it works

[muster][muster] runs each GitHub Actions job in its own microVM:

1. A [Battery][battery] warm pool keeps pre-booted microVMs ready on your [Flintlock][flintlock] hosts.
2. When a job is queued, muster claims a VM from the pool and starts a GitHub runner inside it.
3. When the job ends, muster deletes the VM and Battery boots a replacement.

The warm pool means a job does not wait for a VM to boot.

> [!WARNING]
> muster and Battery are pre-alpha. Follow their repositories for progress, or come and
> help in [Slack](https://cloud-native.slack.com/archives/C07B5R5BLBZ).

[muster]: https://github.com/liquidmetal-dev/muster
[battery]: https://github.com/liquidmetal-dev/battery
[flintlock]: https://github.com/liquidmetal-dev/flintlock
