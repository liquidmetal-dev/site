---
title: MicroVM kernel and OS
weight: 4
---

The kernel binary and operating system for MicroVMs are supplied via OCI images.

They are pulled and mounted by `containerd`.

Liquid Metal supplies images for use with MicroVM clusters, see [Supported Images][#supported-images]
below

## Using images

### CAPMVM

Set the following variables before generating your manifest via `clusterctl`.

```bash
export MVM_ROOT_IMAGE=REGISTRY/ORG/REPO:1.21.8
export MVM_KERNEL_IMAGE=REGISTRY/ORG/REPO:5.10.77
export MVM_KERNEL_MODULES_IMAGE=REGISTRY/ORG/REPO:5.10.77
```

Or edit the manifest directly for each `MicrovmMachineTemplate`.

<details><summary>Manifest changes</summary>

```yaml
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmMachineTemplate
spec:
  template:
    spec:
      kernel:
        filename: boot/vmlinux # make sure this matches where you left the kernel binary
        image: KERNEL_IMAGE
      volumes:
      - id: modules
        image: MODULES_IMAGE
        mountPoint: /lib/modules/VERSION # ensure this version matches the kernel and modules version
      rootVolume:
        id: root
        image: OS_IMAGE
...
```

</details>

### Flintlock

If using another flintlock client to create MicroVMs directly, set the
`spec.root_volume.source.container_source`, `spec.kernel.image` and `spec.additional_volumes[0]`
options on the `CreateMicroVMRequest` call.


For example if using [`hammertime`][ht], edit the spec like so:

<details><summary>Spec example</summary>

```json
{
    "root_volume": {
        "id": "root",
        "is_read_only": false,
        "source": {
          "container_source": OS_IMAGE
        }
    },
    "kernel": {
      "image": KERNEL_IMAGE,
      "filename": "boot/vmlinux", # make sure this matches where you left the kernel binary
      "add_network_config": true
    },
    "additional_volumes": [{
        "id": "modules",
        "is_read_only": false,
        "mount_point": "/lib/modules/VERSION", # ensure this version matches the kernel and modules version
        "source": {
          "container_source": MODULES_IMAGE
        }
    }]
}
```

</details>

## Supported images

**Kernel Binary**:
- `ghcr.io/weaveworks-liquidmetal/kernel-bin:5.10.77`
- `ghcr.io/weaveworks-liquidmetal/kernel-bin:4.19.215`

**Kernel Modules**:
- `ghcr.io/weaveworks-liquidmetal/kernel-modules:5.10.77`
- `ghcr.io/weaveworks-liquidmetal/kernel-modules:4.19.215`

**OS/Root Volume**:

_The tags here refer to the version of Kubernetes._
_The base OS is Ubuntu `20.04`._
- `ghcr.io/weaveworks-liquidmetal/capmvm-k8s-os:1.23.5`
- `ghcr.io/weaveworks-liquidmetal/capmvm-k8s-os:1.22.8`
- `ghcr.io/weaveworks-liquidmetal/capmvm-k8s-os:1.22.3`
- `ghcr.io/weaveworks-liquidmetal/capmvm-k8s-os:1.21.8`

> [!WARNING]
> **Older CAPMVM / Flintlock Versions**
>
> If you are using a CAPMVM <= [v0.7.0][cap7] or Flintlock <= [v0.4.0][fl4] the separate
> modules volume is not supported. Supply the following legacy images instead:
>
> - Kernel: `ghcr.io/weaveworks-liquidmetal/flintlock-kernel:X.X.X`
> - Root volume: `ghcr.io/weaveworks-liquidmetal/capmvm-kubernetes:X.X.X`

## Experimental images

> [!WARNING]
> These images are not guaranteed to work.

**Kernel**:
- `ghcr.io/weaveworks-liquidmetal/flintlock-kernel-arm:5.10.77`
- `ghcr.io/weaveworks-liquidmetal/flintlock-kernel-arm:4.19.215`

**OS**:

- `ghcr.io/weaveworks-liquidmetal/capmvm-kubernetes-arm:1.23.5`
- `ghcr.io/weaveworks-liquidmetal/capmvm-kubernetes-arm:1.22.8`
- `ghcr.io/weaveworks-liquidmetal/capmvm-kubernetes-arm:1.22.3`
- `ghcr.io/weaveworks-liquidmetal/capmvm-kubernetes-arm:1.21.8`

## Build your own images

You can supply your own images if desired.

Our image builder can be found [here][image-builder] if you would like to use it as a base.

> [!NOTE]
> Note that `firecracker` only documents support for `5.10` and `4.19` kernels.

[image-builder]: https://github.com/liquidmetal-dev/image-builder
[ht]: https://github.com/warehouse-13/hammertime
[cap7]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/releases/tag/v0.7.0
[fl4]: https://github.com/liquidmetal-dev/flintlock/releases/tag/v0.4.0
