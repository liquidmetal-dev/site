---
title: "Create a Liquid Metal cluster"
weight: 5
---

We will use `clusterctl` again to generate a manifest for our workload cluster.

## Configure

First, we need to configure some options:

```bash
export CLUSTER_NAME=lm-demo
export CONTROL_PLANE_MACHINE_COUNT=1
export WORKER_MACHINE_COUNT=10
```

This will result in a cluster with a single control plane, and 10 worker nodes.
You may change these values to whatever you wish.

CAPMVM will use [`kube-vip`][kvip] to assign a virtual IP to our Liquid Metal
cluster.
This IP will from **outside** the range set as the `dhcp` pool in the `network-hub`
device. For us this is `192.168.10.25`.

```bash
export CONTROL_PLANE_VIP="192.168.10.25"
```

> [!NOTE]
> In this demo we are setting the cluster API to be only privately accessible via our
> VPN. While this is great for security, it means that if we, say, wanted to use
> `kube-vip` to also provide Load Balancers for services, those services would also
> only be accessible via the VPN.
>
> Your options if you do not want this behaviour are to either acquire a public
> IPv4 address for your cluster endpoint, or to use another tool to expose your services,
> such as `ingress-nginx`.

## Generate

Now we can use `clusterctl` to generate a cluster manifest:

```bash
clusterctl generate cluster -i microvm:$CAPMVM_VERSION -f cilium $CLUSTER_NAME > cluster.yaml
```

We need to edit the file to add the addresses to the `flintlockd` servers. These
will have been printed in the `outputs` under `microvm_host_ips` after the terraform applied.

These are configured on the `MicrovmCluster` spec at `spec.placement.staticPool.hosts`.
Add one entry under `hosts` for each device created as a MicroVM host.
While you are there, you can also add some `sshPublicKeys` if you like.

<details><summary>Expand to see required file changes</summary>

```yaml
...
---
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha1
kind: MicrovmCluster
metadata:
  name: lm-demo
  namespace: default
spec:
  sshPublicKeys:
  - user: "root"
    authorizedKeys:
    - "ssh-ed25519 foobar"
  placement:
    staticPool:
      hosts:
      - controlplaneAllowed: true
        endpoint: <ADDRESS_1>:9090
      - controlplaneAllowed: true
        endpoint: <ADDRESS_2>:9090
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
> Unable to connect to the server: dial tcp 192.168.10.25:6443: connect: no route to host
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
lm-demo-md-0-sj8dh            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-o8yd8            Ready    <none>                 3m43s   v1.21.8
lm-demo-md-0-sad0d            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-jhg78            Ready    <none>                 3m41s   v1.21.8
lm-demo-md-0-9hf9l            Ready    <none>                 3m45s   v1.21.8
```

</details>

If your cluster does not start within 10 mins, consult the [troubleshooting][tr] pages.

## Where are my logs?

Both CAPMVM and CAPI logs can be found by querying the management cluster.

> [!TIP]
> We recommend using [k9s][k9s] to view your management cluster.

To see the CAPMVM controller logs, look for the pod called `capmvm-controller-manager-XXXXX` in
the `capmvm-system` namespace. In those logs you will be able to see the controller
reconcile `MicrovmMachine` types and connect to the given flintlock host(s) to
create MicroVMs.

Various CAPI controllers are also running:
- The logs of `capi-controller-manager-XXXX` in `capi-system` will show
  you the overall orchestration of the workload cluster.
- The logs of `capi-kubeadm-control-plane-controller-manager-XXXX` in `capi-kubeadm-control-plane-system`
  will show the bootstrapping of the first created MicroVM as a control-plane node.
- The logs of `capi-kubeadm-bootstrap-controller-manager-XXXX` in `capi-kubeadm-bootstrap-system`
  will show the bootstrapping of all subsequent MicroVMs as worker nodes.

[kvip]: https://kube-vip.io/
[kc]: https://kubernetes.io/docs/tasks/tools/
[tr]: /docs/troubleshooting/
[k9s]: https://k9scli.io/
