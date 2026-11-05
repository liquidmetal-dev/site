---
title: "Create a Liquid Metal cluster"
weight: 7
---

We will use `clusterctl` again to generate a manifest for our workload cluster.

## Configure

First, we need to configure some options:

```bash
export CLUSTER_NAME=lm-demo
export CONTROL_PLANE_MACHINE_COUNT=1
export WORKER_MACHINE_COUNT=5
```

This will result in a cluster with a single control plane, and 5 worker nodes.
You may change these values to whatever you wish.

CAPMVM will use [`kube-vip`][kvip] to assign a virtual IP to our Liquid Metal
cluster. Choose an address from **outside** the range we set as the `dhcp` pool
back in the [`Prep the network`][net] section. In my
case I did not make any changes to the XML example file, so I will use `192.168.100.9`.

```bash
export CONTROL_PLANE_VIP="192.168.100.9" # update to suit your network
```

Lastly we set the address that the `flintlockd` service we started earlier is
listening on. We set the address to `0.0.0.0`, so the endpoint here will be the
internal IP of the machine you are running on attached to the `default` interface.
You can discover this with either `hostname -I` or `ip link ls`.
In my case this is `192.168.1.130`.

```bash
export HOST_ENDPOINT="192.168.1.130:9090" # don't forget to include the port!
```

## Generate

Now we can use `clusterctl` to generate a cluster manifest:

```bash
clusterctl generate cluster -i microvm:$CAPMVM_VERSION -f cilium $CLUSTER_NAME > cluster.yaml
```

We need to edit the file to change the network mode for the created MicroVMs. You'll
recall that one of the reasons we [created our own network][net] was so that MicroVMs
can be accessed from the same machine they were created on.
To do this we need to ensure that MicroVMs are created with the correct network
interface type.

This can be configured on the [`MicrovmMachineTemplate`][mmt] spec at
`spec.template.spec.networkInterfaces[0].type`.
There will be 2 instances of `MicrovmMachineTemplate`, one named `lm-demo-control-plane`
and the other `lm-demo-md-0`. Change both `type`s for the `eth1` network interface
from `macvtap` to `tap`.

<details><summary>Expand to see required file changes</summary>

```yaml
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmMachineTemplate
metadata:
  name: lm-demo-control-plane
  namespace: default
spec:
  template:
    spec:
      kernel:
        filename: boot/vmlinux
        image: ghcr.io/weaveworks-liquidmetal/flintlock-kernel:5.10.77
      kernelCmdline: {}
      memoryMb: 2048
      networkInterfaces:
      - guestDeviceName: eth1
        type: tap # <- this should be tap
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmMachineTemplate
metadata:
  name: lm-demo-md-0
  namespace: default
spec:
  template:
    spec:
      kernel:
        filename: boot/vmlinux
        image: ghcr.io/weaveworks-liquidmetal/flintlock-kernel:5.10.77
      kernelCmdline: {}
      memoryMb: 2048
      networkInterfaces:
      - guestDeviceName: eth1
        type: tap # <- this should be tap
...
```

</details>

Once you have made those changes, save and close the file.

## Apply

Once you are happy with the manifest, use [`kubectl`][kc] to apply it to your management
cluster:

```bash
kubectl apply -f cluster.yaml
```

<details><summary>Output</summary>

```bash
cluster.cluster.x-k8s.io/lm-demo created
microvmcluster.infrastructure.cluster.x-k8s.io/lm-demo created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/lm-demo-control-plane created
microvmmachinetemplate.infrastructure.cluster.x-k8s.io/lm-demo-control-plane created
machinedeployment.cluster.x-k8s.io/lm-demo-md-0 created
microvmmachinetemplate.infrastructure.cluster.x-k8s.io/lm-demo-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/lm-demo-md-0 created
clusterresourceset.addons.cluster.x-k8s.io/crs-cilium created
configmap/cilium-addon created
```

</details>

## Use

After a moment, you can fetch the MicroVMs workload cluster's `kubeconfig` from
your management cluster. This `kubeconfig` is written to a secret by CAPI:

```bash
kubectl get secret $CLUSTER_NAME-kubeconfig -o json | jq -r .data.value | base64 -d > config.yaml
```

With that `kubeconfig` we can target the Liquid Metal cluster with `kubectl`:

```bash
kubectl --kubeconfig config.yaml get nodes
```

> [!TIP]
> This may not return anything for a few moments; we need to wait for the MicroVMs
> to start and for the cluster control-plane to then be bootstrapped.
> Prepend the command with `watch` and eventually (<=5m) you
> will see the errors stop and the cluster come up.
>
> An expected error for the first 2-3 minutes is:
>
> ```
> Unable to connect to the server: dial tcp 192.168.100.9:6443: connect: no route to host
> ```

<details><summary>Output</summary>

```bash
NAME                          STATUS   ROLES                  AGE     VERSION
lm-demo-control-plane-hdpkj   Ready    control-plane,master   4m35s   v1.21.8
lm-demo-md-0-9444f            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-bdqwj            Ready    <none>                 3m43s   v1.21.8
lm-demo-md-0-gfgbq            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-pxkk6            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-qpzwn            Ready    <none>                 3m43s   v1.21.8
```

</details>

Continue to the next page to learn how to inspect the environment and see what a Liquid
Metal Platform and Cluster look like in action.

[kvip]: https://kube-vip.io/
[kc]: https://kubernetes.io/docs/tasks/tools/
[net]: /docs/tutorial-basics/network
[mmt]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/blob/42196e0bf388235f39211769cb8e5c0049172c10/api/v1alpha1/types.go#L103-L105
