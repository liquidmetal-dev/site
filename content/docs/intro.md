---
title: Introduction
weight: 1
---

<img class="hx:dark:hidden" src="/img/LM-LOGO-HORIZONTAL-LIGHTBACK.svg" alt="Liquid Metal Logo" />
<img class="hx:hidden hx:dark:block" src="/img/LM-LOGO-HORIZONTAL-DARKBACK.svg" alt="Liquid Metal Logo" />

Liquid Metal is a set of solutions to:

- Declaratively provision Kubernetes clusters dynamically on lightweight virtual machines (i.e. microVMs) and bare-metal
- Create lightweight clusters to maximize the available [edge] compute
  - microVMs are our friend
  - More clusters/nodes on the available bare-metal hosts
  - Minimizing resource footprint without sacrificing hard isolation
- Support clusters where direct access to hardware acceleration is needed (i.e. 5G networks)
- Using standard kubernetes and linux kernel and operating system capabilities

Liquid Metal may be right for you if:
- You want to run applications on edge hardware, without caring about the software
infrastructure (cattle not pets).
- You want to reduce your carbon emissions by using less hardware more efficiently.
- You want an inexpensive, easy to operate on-prem solution.
- You want a resource-light self-hosted CI runner solution.
- You want to pack more nodes into your sweet Rasperry Pi homelab rig :sunglasses:.

The Liquid Metal project is comprised of various components which work together.
These are:
- Flintlock/Cloud Hypervisor
- CAPMVM
- Firecracker
- Containerd

> [!TIP]
> A Liquid Metal _system/platform_ refers to the combination of a CAPI management cluster
> running CAPMVM, and a number of bare metal devices running Flintlock which are able
> to host MicroVMs.
>
> A Liquid Metal _cluster_ refers to a workload cluster created by CAPMVM with nodes
> running in MicroVMs created by `flintlockd` on the bare metal host.

## Flintlock

Flintlock is a gRPC service written in Go which manages the lifecycle of lightweight
virtual machines (called MicroVMs) on physical and virtual hosts.

The component can be used independently of Liquid Metal if desired, but its primary
usecase is to create microVMs on a bare-metal host where the MicroVMs will be used
as nodes in a virtualized Liquid Metal Kubernetes cluster.

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
