---
title: "Inspect the environment"
weight: 8
---

Here are some steps you can take to see what is happening on your machine when
a Liquid Metal cluster is running.

> [!NOTE]
> This section is not a required part of the workshop. Click ahead to the next page to see
> how to tear down your setup.

## CAPMVM & CAPI

The Cluster API Provider MicroVM is running in the `kind` management cluster alongside
the standard CAPI controllers.

> [!TIP]
> We recommend using [k9s][k9s] to view your management cluster.

To see the controller logs, look for the pod called `capmvm-controller-manager-XXXXX` in
the `capmvm-system` namespace. In those logs you will be able to see the controller
reconcile `MicrovmMachine` types and connect to the given flintlock host(s) to
create MicroVMs.

Various CAPI controllers are also running:
- The logs of `capi-controller-manager-XXXX` in `capi-system` will show
  you the overall orchestration of the workload cluster.
- The logs of `capi-kubeadm-control-plane-controller-manager-XXXX` in `capi-kubeadm-control-plane-system`
  will show the bootstrapping of the first created MicroVM as a control-plane node.
- The logs of `capi-kubeadm-bootstrap-controller-manager-XXXX` in `capi-kubeadm-bootstrap-system`
  will show the bootstrapping of all subsequent MicroVMs as worker nodes.

## Flintlock

`flintlockd` logs will be followable with:

```bash
journalctl -fu flintlockd.service
```

Data and logs for each MicroVM will be stored under `/var/lib/flintlock/vm`, with
the full path for a MicroVM being `/var/lib/flintlock/vm/NAMESPACE/NAME/UUID`.

Under that directory are the following files:
- `firecracker.cfg`: the configuration set by `flintlock` for `firecracker`
- `firecracker.log`: logs from the firecracker process
- `firecracker.metrics`: metrics from the firecracker process
- `firecracker.pid`: the pid of the running firecracker process
- `firecracker.stderr`: MicroVM boot errors
- `firecracker.stdout`: MicroVM boot logs
- `metadata.json`: MicroVM boot userdata

## Firecracker

Each MicroVM runs as a detached `firecracker` process. You will find logs in the
files given in the section above.

To see the processes, run:

```bash
ps aux | grep firecracker
```

## Containerd

Liquid Metal uses containerd to pull and snapshot volume images which are used
for mounting in the kernel and operating system.

Use `ctr` to inspect artifacts:

```bash
# leases are a reference to other resources connected to an object created by a client
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock leases ls

# images are the bases images for snapshots
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock images ls

# snapshots and microvm configuration are stored in the content store
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock content ls
```

## Interfaces

Flintlock will create 2 interfaces per MicroVM connected to the `lmbr0` bridge.
These can be seen with:

```bash
ip link ls
```

## DHCP address leases

Each MicroVM requests an address from the DHCP server on the network on boot.
In our case we set all MicroVMs to be created on the `liquid-metal` virtual
network via the `lmbr0` bridge. This network has its own `dhcp` range, and
we can use `virsh` to inspect the leases:

```bash
sudo virsh net-dhcp-leases liquid-metal
```

Continue to the next page to cleanly tear down your Liquid Metal cluster and platform environment.

[k9s]: https://k9scli.io/
