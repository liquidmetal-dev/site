---
title: Prep the network
---

# Prepare your local network environment

We are going to create a dedicated virtual network on your machine which will be
used to allocate addresses to any MicroVMs we create.

The benefit of using a dedicated network and a bridge is that we won't accidentally
interfere or conflict with anything else running on your machine. We will have a
segregated `dhcp` pool which will make it easy to track address leases in the case
of a problem.

We will also create a bridge and associated tap device.
This will allow us to create and then connect to flintlock-created MicroVMs on
the same host in `tap` mode (the default `macvtap` mode would not be useable in
a single-machine setup).

## Install

We'll use [`libvirt`][libvirt] and the [`virsh`][virsh] CLI tool to create and
manage the virtual network.

First install required packages:

```bash
sudo apt update
sudo apt install qemu-system-x86 libvirt-clients libvirt-daemon-system virtinst bridge-utils
```

Then start `libvirtd`:

```bash
sudo systemctl enable libvirtd
sudo systemctl start libvirtd
```

Check that the service is running:

```bash
systemctl status libvirtd.service
```

<details><summary>Output</summary>

```bash
● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2022-09-26 09:27:17 BST; 2 days ago
TriggeredBy: ● libvirtd-admin.socket
             ● libvirtd-ro.socket
             ● libvirtd.socket
       Docs: man:libvirtd(8)
             https://libvirt.org
   Main PID: 1241 (libvirtd)
      Tasks: 21 (limit: 32768)
     Memory: 13.0M
        CPU: 30.078s
     CGroup: /system.slice/libvirtd.service
             ├─1241 /usr/sbin/libvirtd
             ├─1834 /usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_leaseshelper
             └─1837 /usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_leaseshelper

Sep 28 14:03:11 callisto-XPS dnsmasq-dhcp[1934832]: DHCPACK(flkbr0) 192.168.100.218 6e:8d:79:f5:6b:65
Sep 28 14:03:22 callisto-XPS dnsmasq-dhcp[1934832]: DHCPREQUEST(flkbr0) 192.168.100.253 7a:35:c9:38:2b:a9
Sep 28 14:03:22 callisto-XPS dnsmasq-dhcp[1934832]: DHCPACK(flkbr0) 192.168.100.253 7a:35:c9:38:2b:a9
Sep 28 14:03:25 callisto-XPS dnsmasq-dhcp[1934832]: DHCPREQUEST(flkbr0) 192.168.100.57 1e:bb:a6:dc:e4:f5
Sep 28 14:03:25 callisto-XPS dnsmasq-dhcp[1934832]: DHCPACK(flkbr0) 192.168.100.57 1e:bb:a6:dc:e4:f5
Sep 28 14:04:09 callisto-XPS dnsmasq-dhcp[1934832]: DHCPREQUEST(flkbr0) 192.168.100.93 46:b8:fd:ac:a5:0b
Sep 28 14:04:09 callisto-XPS dnsmasq-dhcp[1934832]: DHCPACK(flkbr0) 192.168.100.93 46:b8:fd:ac:a5:0b
Sep 28 14:04:20 callisto-XPS dnsmasq-dhcp[1934832]: DHCPREQUEST(flkbr0) 192.168.100.232 26:36:df:1b:ef:a8
Sep 28 14:04:20 callisto-XPS dnsmasq-dhcp[1934832]: DHCPACK(flkbr0) 192.168.100.232 26:36:df:1b:ef:a8
...
```

</details>

## Create the network and bridge

Define the bridge name:
```bash
export BRIDGE_NAME=lmbr0
```

Define the network in an XML file:

```bash
cat << EOF >>~/liquid-metal-net.xml
<network>
  <name>liquid-metal</name>
  <forward mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
  </forward>
  <bridge name="$BRIDGE_NAME" stp='on' delay='0'/>
  <ip address='192.168.100.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.100.10' end='192.168.100.254'/>
    </dhcp>
  </ip>
</network>
EOF
```

:::tip
Change the `192.168.100.x` addresses if you are already using that range on your network.
:::

Define and start the network:

```bash
sudo virsh net-define liquid-metal-net.xml
sudo virsh net-start liquid-metal
```

<details><summary>Output</summary>

```bash
Network liquid-metal defined from liquid-metal-net.xml

Network liquid-metal started
```

</details>

Verify that it was created and is up:

```bash
sudo virsh net-list
```

Output:
```bash
 Name           State    Autostart   Persistent
-------------------------------------------------
 default        active   yes         yes
 liquid-metal   active   no          yes
```

## Create the tap device and attach it to the network bridge

Export the device name:

```bash
export TAP_NAME=tap0
```

Create the `tap` device and connect it to the bridge:

```bash
sudo ip tuntap add $TAP_NAME mode tap
sudo ip link set $TAP_NAME master $BRIDGE_NAME up
```

Verify the devices with `ip link show $TAP_NAME` and `ip link show $BRIDGE_NAME`.

We can now move on to installing `containerd`.

[libvirt]: https://libvirt.org/index.html
[virsh]: https://www.libvirt.org/manpages/virsh.html
