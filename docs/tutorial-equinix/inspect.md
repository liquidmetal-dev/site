---
title: Inspect the environment
---

Let's take a look around the machines we have created and understand how they
are configured.

:::note
If you'd like to jump straight to using your infrastructure to host a MicroVM cluster,
go to the next page.
:::

If left to the default configuration, the terraform module will have created the
following:

- 3 devices of your chosen plan type with OS `ubuntu_20_04` in your chosen metro.
  - 2 of these devices will be provisioned as MicroVM hosts
  - 1 of these devices is used to managed networking. _There is no reason for this
    to be a separate machine, it just helps for clarity in this tutorial._
- A VLAN with id `1000`. Each device has been added to the VLAN via their `bond0`
  interface with a `192.168.10.x` address.
  - In order to add devices to the VLAN, they have all been updated to use a
    [Hybrid Bonded mode][hybrid].

You can use the SSH key you included in your `main.tf` to access all created devices.

## The network hub device

SSH on to the `network-hub` device. You can find its IP either by checking your
Equinix dash, or by inspecting the `outputs` from the terraform apply command.

```bash
ssh -i <private key> root@<network_hub_ip>
```

### VLAN address

The device has been added to the VLAN with the address `192.168.10.2/25`.

```bash
ip a | grep -A 3 bond0.1000
```

<details><summary>Output</summary>

```bash
7: bond0.1000@bond0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 04:3f:72:d4:5d:a8 brd ff:ff:ff:ff:ff:ff
    inet 192.168.10.2/25 scope global bond0.1000
       valid_lft forever preferred_lft forever
    inet6 fe80::63f:72ff:fed4:5da8/64 scope link
       valid_lft forever preferred_lft forever
```

</details>

### DCHP server

The device is running an `isc-dhcp-server`. When MicroVMs are created they will
request an IP over the `bond0.1000` interface.
This server will provide those from a range within the VLAN CIDR.
The range begins at `.26` to avoid clashing with any devices which are added to
the VLAN from the start of the block.

Note that MicroVMs will not join the VLAN. The DCHP range is taken from this subnet
to facilitate easier NAT forwarding rules later.

Check that the service is running with:

```bash
systemctl status isc-dhcp-server.service
```

<details><summary>Output</summary>

```bash
● isc-dhcp-server.service - ISC DHCP IPv4 server
     Loaded: loaded (/lib/systemd/system/isc-dhcp-server.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-28 10:11:02 UTC; 1min 4s ago
       Docs: man:dhcpd(8)
   Main PID: 15373 (dhcpd)
      Tasks: 4 (limit: 38207)
     Memory: 4.4M
     CGroup: /system.slice/isc-dhcp-server.service
             └─15373 dhcpd -user dhcpd -group dhcpd -f -4 -pf /run/dhcp-server/dhcpd.pid -cf /etc/dhcp/dhcpd.conf bond0.1000

Oct 28 10:11:02 network-hub sh[15373]: Wrote 0 leases to leases file.
Oct 28 10:11:02 network-hub dhcpd[15373]: PID file: /run/dhcp-server/dhcpd.pid
Oct 28 10:11:02 network-hub dhcpd[15373]: Wrote 0 leases to leases file.
Oct 28 10:11:02 network-hub dhcpd[15373]: Listening on LPF/bond0.1000/04:3f:72:d4:5d:a8/192.168.10.0/25
Oct 28 10:11:02 network-hub sh[15373]: Listening on LPF/bond0.1000/04:3f:72:d4:5d:a8/192.168.10.0/25
Oct 28 10:11:02 network-hub sh[15373]: Sending on   LPF/bond0.1000/04:3f:72:d4:5d:a8/192.168.10.0/25
Oct 28 10:11:02 network-hub sh[15373]: Sending on   Socket/fallback/fallback-net
Oct 28 10:11:02 network-hub dhcpd[15373]: Sending on   LPF/bond0.1000/04:3f:72:d4:5d:a8/192.168.10.0/25
Oct 28 10:11:02 network-hub dhcpd[15373]: Sending on   Socket/fallback/fallback-net
Oct 28 10:11:02 network-hub dhcpd[15373]: Server starting service.
```

</details>

The lease config can be found at `/etc/dhcp/dhcpd.conf`

<details><summary>Config</summary>

```
default-lease-time 600;
max-lease-time 7200;
authoritative;

subnet 192.168.10.0 netmask 255.255.255.128 {
  range 192.168.10.26 192.168.10.126;
  option routers 192.168.10.2;
  option domain-name-servers 147.75.207.207, 147.75.207.208;
}
```

</details>

The IPv4 interface configuration can be found at `/etc/default/isc-dhcp-server`.

When creating MicroVMs, assigned leases can be observed with `dhcp-leases-list`.

### Tailscale subnet router

This device is registered with your Tailscale VPN. This is so that any other device
on your Tailscale network, such as your local workstation, can access the private
subnet of the VLAN, MicroVMs and later the workload cluster API.

Check the service with `systemctl status tailscaled.service`:

<details><summary>Output</summary>

```bash
● tailscaled.service - Tailscale node agent
     Loaded: loaded (/lib/systemd/system/tailscaled.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-28 10:11:16 UTC; 5min ago
       Docs: https://tailscale.com/kb/
    Process: 16818 ExecStartPre=/usr/sbin/tailscaled --cleanup (code=exited, status=0/SUCCESS)
   Main PID: 16827 (tailscaled)
     Status: "Connected; Callisto13@github; 100.80.93.210 fd7a:115c:a1e0:efe3::6450:5dd2"
      Tasks: 22 (limit: 38207)
     Memory: 12.6M
     CGroup: /system.slice/tailscaled.service
             └─16827 /usr/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/run/tailscale/tailscaled.sock --port=41641

Oct 28 10:11:18 network-hub tailscaled[16827]: magicsock: home is now derp-14 (ams)
Oct 28 10:11:18 network-hub tailscaled[16827]: magicsock: adding connection to derp-14 for home-keep-alive
Oct 28 10:11:18 network-hub tailscaled[16827]: control: NetInfo: NetInfo{varies=false hairpin=true ipv6=true udp=true icmpv4=false derp=#14 portmap= link=""}
Oct 28 10:11:18 network-hub tailscaled[16827]: magicsock: 1 active derp conns: derp-14=cr0s,wr0s
Oct 28 10:11:18 network-hub tailscaled[16827]: Switching ipn state Starting -> Running (WantRunning=true, nm=true)
Oct 28 10:11:18 network-hub tailscaled[16827]: derphttp.Client.Connect: connecting to derp-14 (ams)
Oct 28 10:11:18 network-hub tailscaled[16827]: ipnserver: conn2: ReadMsg: read unix /run/tailscale/tailscaled.sock->@: read: connection reset by peer
Oct 28 10:11:18 network-hub tailscaled[16827]: magicsock: endpoints changed: 145.40.97.117:41641 (stun), [2604:1380:4601:f900::1]:41641 (stun), 10.12.150.5:41641 (local), 192.168.10.2:41641 (local)
Oct 28 10:11:18 network-hub tailscaled[16827]: magicsock: derp-14 connected; connGen=1
Oct 28 10:11:18 network-hub tailscaled[16827]: health("overall"): ok
```

</details>

### NAT forwarding rules

To allow traffic from the MicroVMs to the outside, and to ensure responding packets
return to the right place, simple rules have been configured to allow this transit
across the `bond0.1000` VLAN interface, which all MicroVMs will be tapped to.

These rules have been configured with `firewalld`.

To see the status of the `firewalld` service run `systemctl status firewalld`:

<details><summary>Output</summary>

```bash
● firewalld.service - firewalld - dynamic firewall daemon
     Loaded: loaded (/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-28 10:11:06 UTC; 16min ago
       Docs: man:firewalld(1)
   Main PID: 16037 (firewalld)
      Tasks: 2 (limit: 38207)
     Memory: 22.4M
     CGroup: /system.slice/firewalld.service
             └─16037 /usr/bin/python3 /usr/sbin/firewalld --nofork --nopid

Oct 28 10:11:05 network-hub systemd[1]: Starting firewalld - dynamic firewall daemon...
Oct 28 10:11:06 network-hub systemd[1]: Started firewalld - dynamic firewall daemon.
```

</details>

To see applied rules, run `firewall-cmd --direct --get-all-rules`:

<details><summary>Output</summary>

```bash
ipv4 filter FORWARD 0 -i bond0.1000 -o bond0 -j ACCEPT
ipv4 nat POSTROUTING 0 -o bond0 -j MASQUERADE
```

</details>

## The MicroVM host devices

SSH on to any of your MicroVM `host-x` devices. You can find their IPs either by checking your
Equinix dash, or by inspecting the `outputs` from the terraform apply command.

```bash
ssh -i <private key> root@<network_hub_ip>
```

### VLAN address

The device has been added to the VLAN with the next sequential address from the
`network-hub` device, starting at `192.168.10.3/25`.

```bash
ip a | grep -A 3 bond0.1000
```

<details><summary>Output</summary>

```bash
5: bond0.1000@bond0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether bc:97:e1:ab:20:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.10.3/25 scope global bond0.1000
       valid_lft forever preferred_lft forever
    inet6 fe80::be97:e1ff:feab:2056/64 scope link
       valid_lft forever preferred_lft forever
```

</details>

### Flintlock

The `flintlockd` server is running as a `systemd` service. You can check the status
with `systemctl status flintlockd.service`:

<details><summary>Output</summary>

```bash
● flintlockd.service - flintlock microvm service
     Loaded: loaded (/etc/systemd/system/flintlockd.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-28 10:33:52 UTC; 1s ago
       Docs: https://flintlock.liquidmetal.dev/
    Process: 16139 ExecStartPre=/usr/bin/which firecracker (code=exited, status=0/SUCCESS)
    Process: 16140 ExecStartPre=/usr/bin/which flintlockd (code=exited, status=0/SUCCESS)
   Main PID: 16141 (flintlockd)
      Tasks: 16 (limit: 38058)
     Memory: 12.2M
     CGroup: /system.slice/flintlockd.service
             └─16141 /usr/local/bin/flintlockd run

Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="flintlockd grpc api server starting"
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="starting microvm controller"
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="starting microvm controller with 1 workers" controller=microvm
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="resyncing microvm specs" controller=microvm
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=trace msg="querying all microvms: map[Namespace:]" component=app controller=microvm
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=warning msg="basic authentication is DISABLED"
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=warning msg="TLS is DISABLED"
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=debug msg="starting grpc server listening on endpoint 0.0.0.0:9090"
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="starting event listener" controller=microvm
Oct 28 10:33:52 host-0 flintlockd[16141]: time="2022-10-28T10:33:52Z" level=info msg="Starting workersnum_workers1" controller=microvm
```

Flintlock's configuration can be found at `/etc/opt/flintlockd/config.yaml`.

</details>

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

### Firecracker

Each MicroVM runs as a detached `firecracker` process. You will find logs in the
files given in the section above.

To see the processes once MicroVMs are created, run:

```bash
ps aux | grep firecracker
```

### Containerd

Liquid Metal uses containerd to pull and snapshot volume images which are used
for mounting in the kernel and operating system.

The `containerd` server is running as a `systemd` service. You can check the status
with `systemctl status containerd.service`:

<details><summary>Output</summary>

```bash
● containerd.service - containerd container runtime
     Loaded: loaded (/etc/systemd/system/containerd.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-28 10:11:14 UTC; 32min ago
       Docs: https://containerd.io
   Main PID: 15367 (containerd)
      Tasks: 24
     Memory: 24.3M
     CGroup: /system.slice/containerd.service
             └─15367 /usr/local/bin/containerd --config /etc/containerd/config.toml

Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587507936Z" level=info msg=serving... address=/run/containerd/containerd.sock.ttrpc
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587587743Z" level=info msg="Start event monitor"
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587603095Z" level=info msg="Start snapshots syncer"
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587601581Z" level=info msg=serving... address=/run/containerd/containerd.sock
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587613093Z" level=info msg="Start cni network conf syncer for default"
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587621478Z" level=info msg="Start streaming server"
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587636369Z" level=debug msg="sd notification" error="<nil>" notified=true state="READY=1"
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.587649269Z" level=info msg="containerd successfully booted in 0.023907s"
Oct 28 10:11:14 host-0 systemd[1]: Started containerd container runtime.
Oct 28 10:11:14 host-0 containerd[15367]: time="2022-10-28T10:11:14.687272347Z" level=debug msg="garbage collected" d="819.891µs"
```

</details>

After creating MicroVMs, use `ctr` to inspect artifacts:

```bash
# leases are a reference to other resources connected to an object created by a client
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock leases ls

# images are the bases images for snapshots
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock images ls

# snapshots and microvm configuration are stored in the content store
sudo ctr -n flintlock -a /run/containerd-dev/containerd.sock content ls
```

### Devmapper

Containerd uses `devmapper` to store image layers and MicroVM artifacts.

In a production system, `devmapper` will use a block device via `lvm_direct`.

Check this with `dmsetup ls`

<details><summary>Output</summary>

```bash
flintlock-thinpool      (253:2)
flintlock-thinpool_tdata        (253:1)
flintlock-thinpool_tmeta        (253:0)
```

</details>

You can see the disk in use with `lsblk`:

<details><summary>Output</summary>

```bash
NAME                       MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0                        7:0    0  63.2M  1 loop /snap/core20/1623
loop1                        7:1    0  67.8M  1 loop /snap/lxd/22753
loop2                        7:2    0    48M  1 loop /snap/snapd/16778
sda                          8:0    0 447.1G  0 disk
├─sda1                       8:1    0     2M  0 part
├─sda2                       8:2    0   1.9G  0 part [SWAP]
└─sda3                       8:3    0 445.2G  0 part /
sdb                          8:16   0 447.1G  0 disk
├─flintlock-thinpool_tmeta 253:0    0   4.5G  0 lvm
│ └─flintlock-thinpool     253:2    0 424.8G  0 lvm
└─flintlock-thinpool_tdata 253:1    0 424.8G  0 lvm
  └─flintlock-thinpool     253:2    0 424.8G  0 lvm
```

</details>

### MicroVM interfaces

When you create MicroVMs, flintlock will create 2 interfaces per MicroVM mapped
to the `bond0.1000` vlan interface. These can be seen with:

```bash
ip link ls
```

[hybrid]: https://metal.equinix.com/developers/docs/layer2-networking/hybrid-bonded-mode/
