---
title: OSX instructions
weight: 2
---

Extra steps Mac users must take for this tutorial.

> [!WARNING]
> This page only needs to be read by OSX users. Linux users can ignore and move
> to the next page.

In order to complete this tutorial you will need a Linux machine. You can either
get a small server from a Cloud Provider (I believe most have free tiers), or
you can use a virtual machine.

Here we will use [Vagrant][vagrant] and [VirtualBox][virtualbox].

Install both these tools, create a new working directory, and fetch the tutorial
`Vagrantfile`:

```bash
mkdir lm-tutorial
cd !$
wget https://raw.githubusercontent.com/liquidmetal-dev/flintlock/main/Vagrantfile
```

Start the machine:

```bash
vagrant up
```

This may take some time. Once the command has completed, SSH into your new virtual
machine:

```bash
vagrant ssh
```

You will need complete the rest of the tutorial **from within this VM**.

Once you are finished with the tutorial, you can delete the VM with `vagrant destroy`.

[virtualbox]: https://www.virtualbox.org/wiki/Downloads
[vagrant]: https://www.vagrantup.com/downloads
