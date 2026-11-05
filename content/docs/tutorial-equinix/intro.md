---
title: Overview
weight: 1
---

In this guide we will create a Liquid Metal Platform on devices hosted by
[Equinix Metal][equinix].

The Platform we will end up with is the one used by the team for testing and delivering
demos in a near-Production environment. Therefore it is a good place to start and
learn more about Liquid Metal while you fine-tune your environments.

## Requirements

You will need to have the following to complete this tutorial:

- An [Equinix Account][equinix]
- A [Tailscale account][tailscale]
- [`terraform`][terraform] installed locally
- [`tailscale`][ts-download] installed locally
- [`kind`][kind] installed locally
- [`kubectl`][kubectl] installed locally
- [`clusterctl`][clusterctl] installed locally

> [!WARNING]
> Please do not authenticate your local machine to Tailscale just now.

## Outcomes

We will be using [Terraform][terraform] and the [`terraform-equinix-liquidmetal`][tf-module]
to provision our infrastructure.

The module will create the following in your org:

- A new project
- A VLAN in that project
- A "networking hub" device to run our DHCP server, NAT forwarding and VPN subnet router
- `N` devices to act as MicroVM hosts running the `flintlockd` service

![Liquid Metal Equinix resources](/img/equinix1.jpg)

The following networking topology will be applied:

- All devices will be configured in [Hybrid Bonded mode][hybrid].
- All devices will be connected to a VLAN (`100`) tagged to their bonded interface.
  The VLAN's subnet will be `192.168.10.0/25`.
- A DHCP server will be configured to assign MicroVM addresses from within that VLAN's private range.
- MicroVMs will have `macvtap` devices mapped to their host's VLAN interface.
- NAT and filter rules will forward egress traffic from the VLAN interface to the parent bond.
- A VPN subnet router will route traffic from local VPN-connected devices to MicroVMs
  in the private subnet.

> [!WARNING]
> At the time of writing, the private subnet for MicroVMs (`192.168.10.0/25`) is
> not configurable with the terraform module used in this tutorial. This may cause
> issues if you are using the same network on your local workstation.
>
> Fixing this is on our todo list.

![Liquid Metal Equinix Network](/img/equinix2.jpg)

[equinix]: https://metal.equinix.com/
[tailscale]: https://tailscale.com/
[terraform]: https://www.terraform.io/downloads
[ts-download]: https://tailscale.com/download
[kind]: https://kind.sigs.k8s.io/
[clusterctl]: https://cluster-api.sigs.k8s.io/user/quick-start.html#install-clusterctl
[kubectl]: https://kubernetes.io/docs/tasks/tools/
[tf-module]: https://github.com/liquidmetal-dev/terraform-equinix-liquidmetal
[hybrid]: https://metal.equinix.com/developers/docs/layer2-networking/hybrid-bonded-mode/
