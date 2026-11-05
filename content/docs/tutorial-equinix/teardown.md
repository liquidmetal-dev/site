---
title: "Teardown"
weight: 6
---

Follow these steps to delete your Liquid Metal Cluster and Platform.

## Step by step cleanup

> [!NOTE]
> The "step by step cleanup" is useful if you still want to re-use the environment.
>
> If you don't care about or intend to keep any part of the local and remote
> infrastructure, you can follow the "Just destroy everything" section below.

1. Delete the cluster using `kubectl` and the cluster name:

  ```bash
  kubectl delete cluster $CLUSTER_NAME
  ```

  > [!WARNING]
  > Do NOT delete a CAPI-created workload cluster with `kubectl delete -f cluster.yaml`.

  This may take a moment as the CAPMVM controller reconciles all the MicroVMs.

  Output:
  ```bash
  cluster.cluster.x-k8s.io "lm-demo" deleted
  ```

1. Delete the management cluster.

  ```bash
  kind delete cluster --name lm-management
  ```

1. Tear down the Equinix infrastructure.

  ```bash
  terraform destroy
  ```

  > [!TIP]
  > Sometimes this destroy will attempt to delete some networking attributes
  > before the associated devices are removed, and the command will error.
  > Simply re-run the command to kill any remaining resources.

## Just destroy everything

1. Delete the management cluster.

  ```bash
  kind delete cluster --name lm-management
  ```

1. Tear down the Equinix infrastructure.

  ```bash
  terraform destroy
  ```

  > [!TIP]
  > Sometimes this destroy will attempt to delete some networking attributes
  > before the associated devices are removed, and the command will error.
  > Simply re-run the command to kill any remaining resources.

