---
title: AI agent sandboxes
weight: 4
---

Give an AI agent a real Linux machine to work in. The agent can install packages, run
code it wrote and change files, all inside a microVM with its own kernel. If something
goes wrong, delete the microVM and take a fresh one.

Running agent-generated code in a container on a shared host means trusting a shared
kernel. A microVM puts a hardware-backed virtualization boundary between the agent's
code and your host.

This is a good fit when you want to:

- Let agents run untrusted or generated code safely.
- Give every agent session, or every task, its own clean machine.
- Keep sandboxes on your own hardware, near your data.

## How it works

- [Battery][battery] keeps a warm pool of pre-booted microVMs on your
  [Flintlock][flintlock] hosts. Your agent platform claims a sandbox from the pool,
  uses it, and releases it. Battery then replaces it with a fresh one.
- [guest-agent][guest-agent] runs inside each microVM. The host uses it to run commands,
  copy files in and out, and open SSH sessions over vsock. The sandbox does not need a
  network connection to be controlled.
- Each sandbox's kernel and root file system come from container images, so you can
  build sandbox images with the tools and libraries your agents need.

> [!NOTE]
> Battery and guest-agent are early-stage projects. Come and talk to us in
> [Slack](https://cloud-native.slack.com/archives/C07B5R5BLBZ) if you want to build on them.

[battery]: https://github.com/liquidmetal-dev/battery
[flintlock]: https://github.com/liquidmetal-dev/flintlock
[guest-agent]: https://github.com/liquidmetal-dev/guest-agent
