---
title: Hardware
weight: 1
---

The metal requirements for running Flintlock hosts.

Users are responsible for bringing and configuring their own hardware solutions.

Any hardware which can support KVM virtualisation can be used to host Liquid Metal
MicroVMs.

So far we have tested on:

- Equinix `x86` devices
- Local workstations, such as Dell XPS
- Vagrant virtual machines running on macOS
- Raspberry Pi Model 4B `arm64` boards

The majority of our testing has been on `x86` architectures, but we have also
performed demos with ARM devices.

## The `provision` tool

The recommended way to provision your devices is to use the `provision.sh` tool.

The script and documentation can be found [here][provision].

The entire device can be provisioned with all required components with
`./provision.sh --all`.

Run `./provision.sh --help` for information on available commands.

If you are running Liquid Metal in production it is recommended that you attach
[storage](#storage) to each device acting as a host. If this is not possible, pass the `--dev`
flag upon execution and sparse storage will be generated.

## Manual provisioning

If you would rather prepare your hosts manually or via your own tooling or automation,
here is a list of required packages and components:

- `firecracker` from [our supported fork][fc].
- [`flintlockd`][flint]
- [`containerd`][containerd]
- The host must be capable of running hardware accelerated KVM virtual machines
- Either the `macvtap` module loaded in the kernel or a bridge network
- [Devicemapper][devmapper] storage (see below)

## Storage

When provisioning hosts in `dev` mode, no additional storage is required.

For production systems, an additional block device is required for `devmapper`
storage in `direct-lvm` mode.
This storage will be used by `containerd` to pull and snapshot MicroVM
kernel and OS images, as well as to store MicroVM metadata.

A volume configured as a thin pool must be created on the device. The [`provision.sh`][provision]
tool has a subcommand to do this.

It can be called like so:

```bash
./provision.sh direct_lvm --disk <disk name>
```

If no disk is passed, the script will attempt to detect one which is available.

Run `./provision.sh --help` for all options.

[provision]: https://github.com/liquidmetal-dev/flintlock/tree/main/hack/scripts#provisionsh
[fc]: https://github.com/firecracker-microvm/firecracker/releases
[flint]: https://github.com/liquidmetal-dev/flintlock/releases
[service]: https://github.com/liquidmetal-dev/flintlock/blob/main/flintlockd.service
[containerd]: https://github.com/containerd/containerd/releases
[devmapper]: https://docs.docker.com/storage/storagedriver/device-mapper-driver/
