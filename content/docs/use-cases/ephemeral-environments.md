---
title: Ephemeral environments
weight: 3
---

Create preview, test and development environments that start in seconds and leave
nothing behind when you delete them. Each environment is a microVM, or a group of
microVMs, with its own kernel, file system and network interfaces.

This is a good fit when you want to:

- Start a preview environment for every pull request and delete it on merge.
- Give each test run a clean machine instead of a shared, long-lived one.
- Hand developers a full Linux machine for a few hours without giving them a server.

## How it works

[Flintlock][flintlock] creates microVMs from container images. The kernel and root
volume of a microVM are images in a registry, pulled by containerd. So you build and
version environments the same way you build and version containers.

You can choose how to drive Flintlock:

- **API and CLI.** Call Flintlock's gRPC API from your own tools, or use a CLI such as
  [hammertime][hammertime] or [fl][fl].
- **Kubernetes resources.** [microvm-operator][operator] adds `Microvm`,
  `MicrovmReplicaSet` and `MicrovmDeployment` resources, so you can manage environments
  with `kubectl` or GitOps.
- **Many hosts.** [Brigade][brigade] speaks the Flintlock API and decides which host
  runs each microVM. Point your tools at Brigade instead of at one Flintlock host.
- **Instant start.** [Battery][battery] keeps a warm pool of pre-booted microVMs, so
  you can claim a running environment without waiting for it to boot.

> [!NOTE]
> microvm-operator, Brigade and Battery are experimental.

[flintlock]: https://github.com/liquidmetal-dev/flintlock
[hammertime]: https://github.com/liquidmetal-dev/hammertime
[fl]: https://github.com/liquidmetal-dev/fl
[operator]: https://github.com/liquidmetal-dev/microvm-operator
[brigade]: https://github.com/liquidmetal-dev/brigade
[battery]: https://github.com/liquidmetal-dev/battery
