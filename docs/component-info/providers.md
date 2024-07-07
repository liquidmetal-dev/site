---
title: MicroVM Providers
---

Flintlock MicroVMs can be provided by either [`firecracker`][fc] or
[`cloudhypervisor`][ch].

## Setting a default provider

If `flintlockd` is started with zero explicit instruction, the default provider
will be set to `firecracker`.

To change this to `cloudhypervisor`, start the service with the
`--default-provider` flag set:

```bash
flintlockd run --default-provider cloudhypervisor [other flags]
```

If managing the service via the `systemd` service file, add the following to
`/etc/opt/flintlockd/config.yaml`:

```yaml
default-provider: cloudhypervisor
```

:::tip

Note that the service will only recognise the values `firecracker` and
`cloudhypervisor`. Any variation of those will cause the service to fail at
start.

:::

## Setting the provider binary paths

Unless explicitly instructed, `flintlockd` will expect the Firecracker binary
to be somewhere on the `$PATH` under the name `firecracker`, for example
`/usr/local/bin/firecracker`.

Similarly, `flintlockd` will expect the Cloud-Hypervisor binary to be on the
`$PATH` under the name `cloud-hypervisor-static`.

To configure either of these start the service with the following flags:

```console
--firecracker-bin
--cloudhypervisor-bin
```

Or set the values in `/etc/opt/flintlockd/config.yaml`:

```yaml
cloudhypervisor-bin: <path>
firecracker-bin: <path>
```

:::danger Important

`flintlockd` will not install either provider binaries on the host device for
you. Operators must ensure that this is done before using the service.

:::

## Overriding the default provider for single MicroVMs

If both providers are "loaded" (ie, both provider binaries have been set and/or
discovered by `flintlockd` at boot), you can choose which to use on a per-mvm
basis.

### With a `flintlock` client

To set a one-off provider with a generic flintlock client, add the key to the spec:

```json
{
    "id": "mvm0",
    "namespace": "ns0",
    "provider": "firecracker",
    // ...
}
```

### With CAPMVM

To set a one-off provider when using CAPMVM, set the field(s) in the manifest:

```yaml
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmMachineTemplate
metadata:
  name: test-control-plane
  namespace: default
spec:
  template:
    spec:
      provider: "firecracker"
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmMachineTemplate
metadata:
  name: test-md-0
  namespace: default
spec:
  template:
    spec:
      provider: "cloudhypervisor"
...
```

:::info

This CAPMVM field is optional. Omit if you are happy using the default as
configured by your operator.

:::

[fc]: https://firecracker-microvm.github.io/
[ch]: https://www.cloudhypervisor.org/
