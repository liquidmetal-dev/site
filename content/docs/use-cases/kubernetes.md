---
title: Kubernetes clusters
weight: 1
---

Run Kubernetes clusters where every node, control plane and worker, is a microVM.
Because microVMs are small, a single bare-metal host can run nodes for several
clusters, and each node still has a hard isolation boundary.

This is a good fit when you want to:

- Run many small clusters on a limited amount of edge or on-prem hardware.
- Give each team or tenant its own cluster without giving each one its own servers.
- Create and delete clusters declaratively, the same way you manage other Kubernetes resources.

## How it works

[Cluster API Provider MicroVM (CAPMVM)][capmvm] is a [Cluster API][capi] infrastructure
provider. You describe a cluster as Kubernetes resources in a management cluster. CAPMVM
then picks Flintlock hosts for the nodes and asks [Flintlock][flintlock] on each host to
create the microVMs. Cluster API bootstraps Kubernetes on them.

![Liquid Metal high-level illustration](/img/high-level.jpg)

## Get started

- [Tutorial: Basics](/docs/tutorial-basics/) creates a platform and a workload cluster on your own Linux machine.
- [Tutorial: Equinix](/docs/tutorial-equinix/) runs the same on bare-metal servers in Equinix Metal.
- [Tutorial: Raspberry Pi](/docs/tutorial-rpi/) builds a cluster on a Pi rig.
- [CAPMVM](/docs/component-info/capmvm/) has more detail on the provider.

[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[capi]: https://cluster-api.sigs.k8s.io/
[flintlock]: https://github.com/liquidmetal-dev/flintlock
