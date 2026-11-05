---
title: "Install and start Flintlockd"
weight: 5
---

Here we will provision your machine to act as a host for MicroVMs.

## Firecracker

Flintlock is a wrapper around [Firecracker][firecracker] and [Cloud Hypervisor][cloud-h].
In this exercise we are going to use Firecracker. We can install that with the same
provisioning script as in the previous section.

```bash
sudo ./provision.sh firecracker
```

<details><summary>Output</summary>

```bash
[flintlock provision.sh] Installing firecracker version latest to /usr/local/bin
[flintlock provision.sh] Firecracker version v1.0.0-macvtap successfully installed
```

</details>

Verify the installation with `which firecracker`.

<details><summary>Output</summary>

```bash
/usr/local/bin/firecracker
```

</details>

## Flintlock

We can install and start the service with the same script:

```bash
sudo ./provision.sh flintlock --dev --insecure --bridge lmbr0 --grpc-address 0.0.0.0:9090
```

_Ensure the argument to `--bridge` is the same as the one set in the [network
setup step](/docs/tutorial-basics/network.md)._

This command will:
- Install the latest version of `flintlockd`
- Create various state dirs
- Save a development config file under `/etc/opt/flintlockd/config.yaml`
- Start `flintlockd` as a `systemd` service

<details><summary>Output</summary>

```bash
[flintlock provision.sh] Creating containerd directory /var/lib/containerd-dev/snapshotter/devmapper
[flintlock provision.sh] Creating containerd directory /run/containerd-dev
[flintlock provision.sh] Creating containerd directory /etc/containerd
[flintlock provision.sh] All containerd directories created
[flintlock provision.sh] Installing flintlockd version latest to /usr/local/bin
[flintlock provision.sh] Flintlockd version v0.3.0 successfully installed
[flintlock provision.sh] Writing flintlockd config to /etc/opt/flintlockd/config.yaml.
[flintlock provision.sh] Flintlockd config saved
[flintlock provision.sh] Starting flintlockd service with /etc/systemd/system/flintlockd.service
[flintlock provision.sh] Flintlockd running at 0.0.0.0:9090 via interface enxf8e43b5d5048
```

</details>

Verify that the service started with `systemctl status flintlockd.service`.

<details><summary>Output</summary>

```bash
● flintlockd.service - flintlock microvm service
     Loaded: loaded (/etc/systemd/system/flintlockd.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2022-09-27 13:16:57 BST; 51s ago
       Docs: https://weaveworks-liquidmetal.github.io/flintlock/
    Process: 787721 ExecStartPre=which firecracker (code=exited, status=0/SUCCESS)
    Process: 787723 ExecStartPre=which flintlockd (code=exited, status=0/SUCCESS)
   Main PID: 787724 (flintlockd)
      Tasks: 12 (limit: 18694)
     Memory: 10.9M
        CPU: 45ms
     CGroup: /system.slice/flintlockd.service
             └─787724 /usr/local/bin/flintlockd run

Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="starting microvm controller"
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="starting microvm controller with 1 workers" controller=microvm
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="resyncing microvm specs" controller=microvm
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="Resyncing specs" action=resync controller=microvm namespace=ns
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=debug msg="Getting all specs" action=resync controller=microvm namespace=ns
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=warning msg="basic authentication is DISABLED"
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=warning msg="TLS is DISABLED"
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=debug msg="starting grpc server listening on endpoint 0.0.0.0:9090"
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="starting event listener" controller=microvm
Sep 27 13:16:57 callisto-XPS flintlockd[787724]: time="2022-09-27T13:16:57+01:00" level=info msg="Starting workersnum_workers1" controller=microvm
...
```

</details>

To verify the service is ready to accept requests, you can use either [`fl`][fl] or
[`hammertime`][ht] to perform simple queries:

```bash
hammertime list -a <address>:9090

fl microvm get --host <address>:9090
```

_Because we bound the gRPC service to `0.0.0.0`, the `<address>` in this case
will be the internal IP of your machine._

In the next step we can start to create our CAPI management cluster.

[firecracker]: https://firecracker-microvm.github.io/
[cloud-h]: https://www.cloudhypervisor.org/
[fl]: https://github.com/liquidmetal-dev/fl
[ht]: https://github.com/warehouse-13/hammertime

