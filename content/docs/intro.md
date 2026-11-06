---
title: Introduction
weight: 1
---

<img class="hx:dark:hidden" src="/img/LM-LOGO-HORIZONTAL-LIGHTBACK.svg" alt="Liquid Metal Logo" />
<img class="hx:hidden hx:dark:block" src="/img/LM-LOGO-HORIZONTAL-DARKBACK.svg" alt="Liquid Metal Logo" />

Liquid Metal is a set of open source projects for running lightweight virtual machines
(microVMs) on your own hardware and managing them declaratively. It lets you:

- Run fast, isolated, disposable microVMs on bare metal, from datacenter servers to the edge
- Get the hard isolation of a virtual machine with a start time close to that of a container
- Pack more workloads onto the hardware you already have
- Manage microVMs through an API, a CLI or Kubernetes resources
- Build on standard components: Firecracker, Cloud Hypervisor, containerd, KVM and Kubernetes

Liquid Metal may be right for you if you want to:

- Run [Kubernetes clusters](/docs/use-cases/kubernetes/) on microVMs, with more clusters
  and nodes on each bare-metal host.
- Run [CI jobs](/docs/use-cases/ci-runners/) in a fresh, isolated microVM per job.
- Create [ephemeral environments](/docs/use-cases/ephemeral-environments/) for previews,
  tests and development that leave nothing behind.
- Give [AI agents a sandbox](/docs/use-cases/agent-sandboxes/) to run untrusted code in.
- Use less hardware more efficiently and reduce your carbon emissions.
- Pack more workloads into your sweet Raspberry Pi homelab rig :sunglasses:.

## Projects

The Liquid Metal projects work together, but you can use them on their own too.

| Project | What it does |
|---|---|
| [Flintlock][flintlock-repo] | Creates and manages microVMs on a host. The base of everything else. |
| [Cluster API Provider MicroVM][capmvm-repo] | Creates Kubernetes clusters with microVMs as nodes. |
| [microvm-operator][operator-repo] | Manages microVMs as Kubernetes resources. _Experimental._ |
| [Brigade][brigade-repo] | Schedules microVMs across many Flintlock hosts. _Experimental._ |
| [Battery][battery-repo] | Keeps a warm pool of pre-booted microVMs ready to claim. _Experimental._ |
| [guest-agent][guest-agent-repo] | Lets the host run commands and copy files in a microVM over vsock. _Experimental._ |
| [muster][muster-repo] | Runs GitHub Actions jobs in microVMs. _Experimental._ |

Under the hood, Liquid Metal uses these components:

- Firecracker and Cloud Hypervisor
- Containerd

> [!TIP]
> In the Kubernetes use case, a Liquid Metal _system/platform_ refers to the combination
> of a CAPI management cluster running CAPMVM, and a number of bare metal devices running
> Flintlock which are able to host MicroVMs.
>
> A Liquid Metal _cluster_ refers to a workload cluster created by CAPMVM with nodes
> running in MicroVMs created by `flintlockd` on the bare metal host.

## Flintlock

Flintlock is a gRPC service written in Go which manages the lifecycle of lightweight
virtual machines (called MicroVMs) on physical and virtual hosts.

Flintlock does not know about Kubernetes. Any of the other projects, or your own tools,
can use its API to create microVMs for any task: Kubernetes nodes, CI runners,
ephemeral environments or sandboxes.

Flintlock supports [Firecracker][firecracker] and experimentally [Cloud Hypervisor][cloud-h].

> [!NOTE]
> Flintlock is only supported to run on **Linux**.

## Cluster API Provider MicroVM (CAPMVM)

CAPMVM is a [Cluster API][capi] Infrastructure Provider
for provisioning Kubernetes clusters in which the nodes (control plane & worker)
are MicroVMs. The provider is designed to
work with Flintlock.

The CAPMVM controller is written in Go and handles the placement of MicroVMs/nodes
across a given list of potential Flintlock hosts.

## Firecracker and Cloud Hypervisor

> Firecracker is a virtual machine monitor (VMM) that uses the Linux Kernel-based Virtual Machine (KVM) to create and manage microVMs. Firecracker has a minimalist design. It excludes unnecessary devices and guest functionality to reduce the memory footprint and attack surface area of each microVM. This improves security, decreases the startup time, and increases hardware utilization.

> Cloud Hypervisor is an open source Virtual Machine Monitor (VMM) implemented in Rust that focuses on running modern, cloud workloads, with minimal hardware emulation.

In Liquid Metal, [Firecracker][firecracker] and [Cloud Hypervisor][cloud-h] are
both wrapped by Flintlock to give a smoother management
experience of MicroVMs based on the needs of cluster orchestration. Flintlock will
initially default to using Firecracker, but either can be chosen via config on a per
MicroVM basis. In the near future the default will be Cloud Hypervisor.

## Containerd

> containerd is a daemon which manages the complete container lifecycle of its host system, from image transfer and storage to container execution and supervision to low-level storage to network attachments and beyond.

In our case, we use [containerd][containerd] to pull and manage the images which
serve as the kernel and OS volume mounts for each MicroVM.

## MicroVMs?

TLDR: A MicroVM is a very lightweight virtual machine that optimizes for speed and less
resource consumption over supporting a wide array of devices/etc.

MicroVMs sit nicely between containers and VMs and intend to give you the best of both worlds.
VMs give security, but are quite "heavy" to run since they virtualise everything,
even the things you may not end up needing.
Containers give us speed since they just virtualise applications (remember that
containers are not “real”: they are just processes), which means operators have to
think hard about securing those processes.

Microvms are what they sound like: smaller VMs, or a smaller subset of virtualisation
tailored for a specific need with minimal overhead, thus making them almost as fast
to put up and tear down as containers

## High-level illustration

![Liquid Metal high-level illustration](/img/high-level.jpg)

For more diagrams, see [Architecture](/docs/architecture/).

[firecracker]: https://firecracker-microvm.github.io/
[cloud-h]: https://www.cloudhypervisor.org/
[containerd]: https://containerd.io/
[capi]: https://cluster-api.sigs.k8s.io/
[flintlock-repo]: https://github.com/liquidmetal-dev/flintlock
[capmvm-repo]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[operator-repo]: https://github.com/liquidmetal-dev/microvm-operator
[brigade-repo]: https://github.com/liquidmetal-dev/brigade
[battery-repo]: https://github.com/liquidmetal-dev/battery
[guest-agent-repo]: https://github.com/liquidmetal-dev/guest-agent
[muster-repo]: https://github.com/liquidmetal-dev/muster
