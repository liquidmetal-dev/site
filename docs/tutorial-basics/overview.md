---
title: Overview
---

:::info
This tutorial can be run on **Linux** and **macOS**. HOWEVER, if you are using
a Mac, you need to complete a few extra steps. These are on the next page. Linux
users can skip ahead.
:::

In this tutorial we will use a single local machine to act as multiple devices
in a development Liquid Metal platform.

We have tested this tutorial on Ubuntu `20.04` and `22.04`, but any current linux
distribution with `systemctl` should do.

:::tip
A Liquid Metal _system/platform_ refers to the combination of a CAPI management cluster
running CAPMVM, and a number of bare metal devices running Flintlock which are able
to host MicroVMs.

A Liquid Metal _cluster_ refers to a workload cluster created by CAPMVM with nodes
running in MicroVMs created by `flintlockd` on the bare metal host.
:::

In this workshop we will configured configure your local computer to act as _both_
bare-metal host _and_ a management CAPI cluster.

#### Part 1 - microvm host:
We will:
- :spider_web: Configure a custom virtual network to segregate our virtual devices
- :electric_plug: Install all required MicroVM host components
  - Firecracker
  - Containerd
  - Flintlock
- :runner: Start the `flintlockd` service

#### Part 2 - management cluster:
We will:
- :female-office-worker: Use `kind` to create a local kubernetes cluster which will act as our CAPI management
cluster
- :wrench: Install CAPI and CAPMVM on that `kind` cluster
- :the_horns: Write a manifest for a bare metal cluster with one control-plane node and 5 workers
- :memo: Apply the manifest to the `kind` cluster
- :eyes: Watch as CAPMVM connects to our `flintlockd` service to create MicroVMs
- :building_construction: See kubernetes nodes brought up in each MicroVM, and joined in a workload
cluster

#### Part 3 - wrap up:
We will:
- :mag: Take a look around the environment
- :firecracker: Tear down:
  - The bare metal workload cluster
  - The management `kind` cluster
  - All running host services
  - The custom virtual network

Let's get into it...

:::danger HELP
This tutorial is brand new. If you experience any issues or difficulties, please
come to the [Slack channel][slack] or open an issue in [Github][gh].
:::

[slack]: https://cloud-native.slack.com/archives/C07B5R5BLBZ
[gh]: https://github.com/liquidmetal-dev/site
