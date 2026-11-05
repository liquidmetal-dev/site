---
title: "Containerd"
linkTitle: "Install and start containerd"
weight: 4
---

Liquid Metal uses [`containerd`][containerd] to download and manage the images which are mounted
into MicroVMs as kernel and OS volumes.

Download the all-in-one provision script:

```bash
wget https://raw.githubusercontent.com/liquidmetal-dev/flintlock/main/hack/scripts/provision.sh
chmod +x provision.sh
```

## Create thinpool

Flintlock relies on containerd's devicemapper snapshotter to provide filesystem
devices for Firecracker microvms. This is how the images are stored. In a production
we would use a dedicated disk, but here we will use a loopback device.

Run the script to create the thinpool:

```bash
sudo ./provision.sh devpool
```

<details><summary>Output</summary>

```bash
[flintlock provision.sh] Creating containerd directory /var/lib/containerd-dev/snapshotter/devmapper
[flintlock provision.sh] Creating containerd directory /run/containerd-dev
[flintlock provision.sh] Creating containerd directory /etc/containerd
[flintlock provision.sh] All containerd directories created
[flintlock provision.sh] Will create loop-back thinpool flintlock-dev-thinpool
[flintlock provision.sh] Creating sparse file /var/lib/containerd-dev/snapshotter/devmapper/data of size 100G
[flintlock provision.sh] Sparse file /var/lib/containerd-dev/snapshotter/devmapper/data created
[flintlock provision.sh] Creating sparse file /var/lib/containerd-dev/snapshotter/devmapper/metadata of size 10G
[flintlock provision.sh] Sparse file /var/lib/containerd-dev/snapshotter/devmapper/metadata created
[flintlock provision.sh] Associating loop devices with sparse files
[flintlock provision.sh] Loop devices /dev/loop13 and /dev/loop20 associated
[flintlock provision.sh] Creating thinpool flintlock-dev-thinpool with devices /dev/loop13 and /dev/loop20
[flintlock provision.sh] Thinpool flintlock-dev-thinpool created
[flintlock provision.sh] Dev thinpool creation complete
[flintlock provision.sh] remember to set pool_name to flintlock-dev-thinpool in your containerd config
```

</details>

Verify that the device has been created with `sudo dmsetup ls`:
```bash
flintlock-dev-thinpool  (253:0)
```

## Configure and start containerd

> [!WARNING]
> This section will start `containerd` as a service. If you run `docker` locally,
> you may already have a `containerd` service running. This new service will run
> parallel to that service and _should not affect it_.
> If you have any doubts or encounter problems, you can disable the original service.

Run the script to install `containerd` in dev mode:

```bash
sudo ./provision.sh containerd --dev
```

This command will:
- Install the latest version of `containerd`
- Create various state dirs
- Save a development config file under `/etc/containerd/config-dev.toml`
- Start `containerd` as a `systemd` service

<details><summary>Output</summary>

```bash
[flintlock provision.sh] Creating containerd directory /var/lib/containerd-dev/snapshotter/devmapper
[flintlock provision.sh] Creating containerd directory /run/containerd-dev
[flintlock provision.sh] Creating containerd directory /etc/containerd
[flintlock provision.sh] All containerd directories created
[flintlock provision.sh] Installing containerd version latest to /usr/local/bin
[flintlock provision.sh] Containerd version v1.6.8 successfully installed
[flintlock provision.sh] Writing containerd config to /etc/containerd/config-dev.toml
[flintlock provision.sh] Containerd config saved
[flintlock provision.sh] Starting containerd service with /etc/systemd/system/containerd-dev.service
[flintlock provision.sh] Containerd running
```

</details>

Verify that the service started with `systemctl status containerd-dev.service`.

<details><summary>Output</summary>

```bash
● containerd-dev.service - containerd container runtime
     Loaded: loaded (/etc/systemd/system/containerd-dev.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2022-09-27 13:02:53 BST; 1s ago
       Docs: https://containerd.io
    Process: 777843 ExecStartPre=/sbin/modprobe overlay (code=exited, status=0/SUCCESS)
   Main PID: 777844 (containerd)
      Tasks: 14
     Memory: 19.6M
        CPU: 101ms
     CGroup: /system.slice/containerd-dev.service
             └─777844 /usr/local/bin/containerd --config /etc/containerd/config-dev.toml

Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048720119+01:00" level=info msg="Start snapshots syncer"
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048728525+01:00" level=info msg="Start cni network conf syncer for default"
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048735830+01:00" level=info msg="Start streaming server"
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048741460+01:00" level=info msg=serving... address="127.0.0.1:1338"
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048804854+01:00" level=info msg=serving... address=/run/containerd-dev/containerd.sock.ttrpc
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048845976+01:00" level=info msg=serving... address=/run/containerd-dev/containerd.sock
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048894187+01:00" level=debug msg="sd notification" error="<nil>" notified=true state="READY=1"
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.048917346+01:00" level=info msg="containerd successfully booted in 0.033546s"
Sep 27 13:02:53 callisto-XPS systemd[1]: Started containerd container runtime.
Sep 27 13:02:53 callisto-XPS containerd[777844]: time="2022-09-27T13:02:53.154115708+01:00" level=debug msg="garbage collected" d=6.658119ms
...
```

</details>

Now we can move on to installing flintlock.

[containerd]: https://containerd.io/
