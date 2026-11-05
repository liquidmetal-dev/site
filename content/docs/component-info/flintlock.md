---
title: Flintlock
weight: 3
---

API docs and instructions on how to provision hardware to run Flintlock services.

## API docs

Flintlock is a gRPC service with an HTTP gateway.

The proto API can be found [here][proto-api].

The HTTP API can be found [here][http-api].

## Server configuration

`flintlockd` can be run as a [`systemd` service][service] or directly/managed by another mechanism.

The service can be configured via flags or a yaml config file.

The minimum options required to run are:

```yaml
containerd-socket: <path to containerd socket>
verbosity: <1-9>
parent-iface: <wired interface>
```

Flintlock can be configured and started by the [`provision.sh`][provision] tool.

## Adding SSH keys to MicroVMs

> [!NOTE]
> For instructions on how to add SSH keys to MicroVMs created via CAPMVM see
> [this page][capmvm].

If you are creating MicroVMs via the flintlock API directly, encode your keys
in the `cloud-init` `"user-data"`:

```bash
cat << EOF >userdata.txt
#cloud-config
hostname: mvm0
users:
    - name: root
      ssh_authorized_keys:
        - |
          ssh-ed25519 foobar
disable_root: false
package_update: false
final_message: The Liquid Metal booted system is good to go after $UPTIME seconds
runcmd:
    - dhclient -r
    - dhclient
EOF

cat userdata.txt | base64
# result
```

And add the result to the spec:
```json
{
    "id": "mvm0",
    "namespace": "ns0",
    // ...
    "metadata": {
      "meta-data": "aW5zdGFuY2VfaWQ6IG5zMC9tdm0wCmxvY2FsX2hvc3RuYW1lOiBtdm0wCnBsYXRmb3JtOiBsaXF1aWRfbWV0YWwK",
      "user-data": "ENCODED RESULT"
    }
}
```

[capmvm]: /docs/component-info/capmvm/#adding-ssh-keys-to-microvms
[service]: https://github.com/liquidmetal-dev/flintlock/blob/main/flintlockd.service
[provision]: https://github.com/liquidmetal-dev/flintlock/tree/main/hack/scripts#provisionsh
[proto-api]: https://buf.build/weaveworks-liquidmetal/flintlock
[http-api]: https://weaveworks-liquidmetal.github.io/flintlock/flintlock-api/
