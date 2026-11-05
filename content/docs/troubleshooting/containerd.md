---
title: Containerd
weight: 2
---

Understanding common `containerd` errors.

Containerd logs can be watched by running:

```bash
journalctl -fu containerd.service
```

After creating MicroVMs, use `ctr` to inspect artifacts:

```bash
# leases are a reference to other resources connected to an object created by a client
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock leases ls

# images are the bases images for snapshots
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock images ls

# snapshots and microvm configuration are stored in the content store
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock content ls
```
