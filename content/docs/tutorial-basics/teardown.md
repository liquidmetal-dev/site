---
title: "Teardown"
weight: 9
---

Follow these steps to delete your Liquid Metal workload cluster and reset your
Liquid Metal platform environment.

## Delete the Liquid Metal workload cluster

> [!WARNING]
> Do not delete a CAPI-created workload cluster with `kubectl delete -f cluster.yaml`.

Delete the cluster using `kubectl` and the cluster name:

```bash
kubectl delete cluster $CLUSTER_NAME
```

This may take a moment as the CAPMVM controller reconciles all the MicroVMs.

Output:
```bash
cluster.cluster.x-k8s.io "lm-demo" deleted
```

## Stop the management cluster

Use `kind` to delete the cluster:

```
kind delete cluster --name lm-management
```

## Stop `flintlockd`

Use `systemctl` to stop and disable the service:

```bash
sudo systemctl stop flintlockd.service
sudo systemctl disable flintlockd.service
```

Remove the service file:

```bash
sudo rm /etc/systemd/system/flintlockd.service
```

Reload the daemon:

```bash
sudo systemctl daemon-reload
```

Check that the service is no longer there:

```bash
systemctl status flintlockd.service
```

Output:

```bash
Unit flintlockd.service could not be found.
```

## Stop `containerd`

Use `systemctl` to stop and disable the service:

```bash
sudo systemctl stop containerd-dev.service
sudo systemctl disable containerd-dev.service
```

Remove the service file:

```bash
sudo rm /etc/systemd/system/containerd-dev.service
```

Reload the daemon:

```bash
sudo systemctl daemon-reload
```

Check that the service is no longer there:

```bash
systemctl status containerd-dev.service
```

Output:

```bash
Unit containerd-dev.service could not be found.
```

## Clean up devpools

Use the `dmsetup` command to remove any leftover thin devices:

```bash
sudo dmsetup ls | awk '/flintlock/ {print $1}' | xargs sudo dmsetup remove -f
```

> [!WARNING]
>
> The above command filters for devices matching `flintlock`. If you use
> device-mapper to manage other devices, and are abundantly cautious you may want,
> to remove `flintlock-` devices individually.
>

Verify that all have been cleared:

```bash
sudo dmsetup ls
```

Output:

```bash
No devices found
```

Detach the loop devices:

```bash
losetup | awk '/containerd-dev/ {print $1}' | xargs -I {} sudo losetup -d {}
```

Delete the sparse files:

```bash
sudo rm /var/lib/containerd-dev/snapshotter/devmapper/{data,metadata}
```

## Remove the virtual network, bridge and tap device

Use `virsh` to destroy and undefine the network:

```bash
sudo virsh net-destroy liquid-metal
sudo virsh net-undefine liquid-metal
```

Check that it is no longer there:

```bash
virsh net-list
```

Output:

```
 Name       State    Autostart   Persistent
---------------------------------------------
 default    active   yes         yes
```

Bring the tap down and delete it:

```bash
sudo ip link set tap0 down
sudo ip link delete tap0
```

Verify that the tap and bridge are gone:

```bash
ip link show tap0
ip link show lmbr0
```

Both should return:

```bash
Device "X" does not exist.
```

## Clean up files

Remove any leftover files or directories:

```bash
sudo rm -rf \
  /var/lib/containerd-dev \
  /run/containerd-dev \
  /etc/containerd/config-dev.toml \
  /etc/opt/flintlockd \
  /var/lib/flintlock
```
