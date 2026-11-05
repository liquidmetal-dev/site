---
title: Shopping list
weight: 2
---

### Requirements

If you don't want to get exactly what this workshop uses, or you already have a bunch of kit
that you plan to re-use, here is a list of the base requirements for this homelab.

- Minimum 1 board with minimum 4GB RAM
- Some sort of storage
	- Ubuntu 20.04 or 22.04 bootable
- Wired connection
- SSH-able
- Some other device (laptop, PC), running macOS or Linux. This will be where you
	will be working from.

### Minimal gear list

If you are going from scratch, this should get you started:

- [Raspberry Pi board(s)][4b] with an **absolute minimum** of 4GB RAM. 8GB is best.
	(2 or more boards is cooler but it is to get these nowadays. eBay is a good place to look.)
	The workshop is tested on 4B Models but in a pinch a 3B _might_ be okay, but
	no promises.
- [Power cable per Pi][usb-c]. 4Bs use USB-C, earlier versions use micro-USB.
- USB power supply. Anything from a wall socket to an [Anker powerbank][anker]
	will do.
- [microSD][microsd] per board. This workshop uses 32GB ones, but you can get away with a 16.
- Ethernet cable per board.
- Case. Strictly speaking this is a 'nice to have'. But you can get some very cute, very
	cheap cases, so it feels sad not to have one. [This one][case] is nice-looking,
	comes with CPU fans, and is extendable, so you can stack more of the same cases
	as you acquire more boards.
- A way to flash microSD cards. If your PC/laptop does not have an SD port, you can
	get tiny [USB card reader][sd-reader] which works very well.

### Upgrades
- A [PoE hat][poe] per board to provide both power and ethernet over one wire.
	If you go for this, you'll also need a [PoE enabled switch][switch].
- For faster writing and just more space, swap out the microSDs for actual SSDs.

### Optional
You may want some accessories depending on the OS image you choose for your boards.

- (If you flash your boards with a Desktop image.) A monitor and cable.
	Just one of these are necessary as after setup you won't need
	them. Note the Model 4B takes a Micro-HDMI.
- (Again only necessary if you install Desktop images on your boards.)
	USB keyboard and mouse. Again, just need the one for initial setup. Wireless ones
	could also work but have not been tested with this workshop.

![rig](/img/rig2.jpg)

### Credits

- [How to build a Raspberry Pi Kubernetes cluster using MicroK8s][ubuntu-tutorial]
- [Raspbernetes][raspbernetes]


[4b]: https://thepihut.com/collections/raspberry-pi-boards/products/raspberry-pi-4-model-b
[usb-c]: https://thepihut.com/collections/raspberry-pi-cables/products/usb-a-to-usb-c-cable-1m
[microsd]: https://thepihut.com/products/sandisk-microsd-card-class-10-a1
[anker]: https://www.amazon.co.uk/gp/product/B00VJSGT2A/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1
[poe]: https://thepihut.com/collections/raspberry-pi-hats/products/raspberry-pi-poe-plus-hat
[switch]: https://www.amazon.co.uk/gp/product/B076982FVC/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1
[ethernet]: https://thepihut.com/products/rj45-cat5e-ethernet-lan-cable-2m-blue
[case]: https://thepihut.com/collections/raspberry-pi-cases/products/cluster-case-for-raspberry-pi
[sd-reader]: https://thepihut.com/collections/raspberry-pi-sd-cards-and-adapters/products/mini-usb-2-0-microsd-card-reader
[hdmi-adapter]: https://thepihut.com/collections/raspberry-pi-cables/products/hdmi-to-micro-hdmi-adapter-cable-160mm
[ubuntu-tutorial]: https://ubuntu.com/tutorials/how-to-kubernetes-cluster-on-raspberry-pi?&_ga=2.92060063.463304713.1653983297-30417302.1648472081#1-overview
[raspbernetes]: https://github.com/cloud-native-skunkworks/raspernetes
