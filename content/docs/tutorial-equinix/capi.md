---
title: "Provision a CAPI management cluster"
weight: 4
---

In this workshop we are going to use [`kind`][kind] to create a cluster to run
CAPI (Cluster API) controllers and the Liquid Metal CAPMVM (Cluster API Provider MicroVM)
controllers.

We can then apply yaml manifests to the management cluster, which the CAPI and CAPMVM
controllers will act on to create child workload clusters in Microvms.

<!--
This page is a copy of docs/tutorial-basics/capi.md
If you change one, don't forget to copy over to the other
-->

## Kind

First [install `kind`][kind].

Next, use `kind` to create a cluster:

```bash
kind create cluster --name lm-management
```

<details><summary>Output</summary>

```bash
Creating cluster "lm-management" ...
 ✓ Ensuring node image (kindest/node:v1.21.1) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-lm-management"
You can now use your cluster with:

kubectl cluster-info --context kind-lm-management

Have a nice day! 👋
```

</details>

## Clusterctl

Install the CAPI CLI tool, [`clusterctl`][clusterctl].

We will use this tool to install both the CAPI and CAPMVM controllers on the
management cluster.

## CAPMVM

We install CAPMVM by configuring `clusterctl` to use our custom provider.

Create a `cluster-api` directory under home:

```
mkdir -p ~/.cluster-api
```

Set the CAPMVM version you wish to use in your environment. First [check for the
version which is compatible][compat] with the version of `flintlockd` you are running.
In my case I am using Flintlock `v0.3.0`, so the compatible CAPMVM version is `v0.7.0`.
If you ran the provisioning step without configuring the flintlock version, then
the latest will have been installed.

```bash
export CAPMVM_VERSION=v0.7.0
```

Write the installation information to a `clusterctl` config file in the `cluster-api`
repo:

```bash
cat << EOF >>~/.cluster-api/clusterctl.yaml
providers:
  - name: "microvm"
    url: "https://github.com/liquidmetal-dev/cluster-api-provider-microvm/releases/$CAPMVM_VERSION/infrastructure-components.yaml"
    type: "InfrastructureProvider"
EOF
```

## CAPI

Use `clusterctl` to initialise the management cluster. This command will install all
required controllers.

```bash
export EXP_CLUSTER_RESOURCE_SET=true # required for the MicroVM clusters we want to create later

clusterctl init --infrastructure microvm
```

<details><summary>Output</summary>

```bash
Fetching providers
Installing cert-manager Version="v1.5.3"
Waiting for cert-manager to be available...
Installing Provider="cluster-api" Version="v1.2.2" TargetNamespace="capi-system"
Installing Provider="bootstrap-kubeadm" Version="v1.2.2" TargetNamespace="capi-kubeadm-bootstrap-system"
I0927 13:51:15.765771  815920 request.go:665] Waited for 1.023726916s due to client-side throttling, not priority and fairness, request: GET:https://127.0.0.1:38035/apis/bootstrap.cluster.x-k8s.io/v1beta1?timeout=30s
Installing Provider="control-plane-kubeadm" Version="v1.2.2" TargetNamespace="capi-kubeadm-control-plane-system"
Installing Provider="infrastructure-microvm" Version="v0.7.0" TargetNamespace="capmvm-system"

Your management cluster has been initialized successfully!

You can now create your first workload cluster by running the following:

  clusterctl generate cluster [name] --kubernetes-version [version] | kubectl apply -f -
```

</details>

> [!TIP]
> If you see an error containing the words `"401 Bad Credentials"`, make sure you don't
> have any Github auth methods set in your environment. `GITHUB_TOKEN` is a common
> culprit and can be removed with `unset GITHUB_TOKEN`.

We are now ready to create a workload cluster with MicroVMs!

[kind]: https://kind.sigs.k8s.io/
[capi]: https://cluster-api.sigs.k8s.io/
[capmvm]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm
[clusterctl]: https://cluster-api.sigs.k8s.io/user/quick-start.html#install-clusterctl
[compat]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/blob/main/docs/compatibility.md
