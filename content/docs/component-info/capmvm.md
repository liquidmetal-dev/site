---
title: Cluster API Provider MicroVM
weight: 6
---

Installing and using CAPMVM to create bare-metal workload clusters.

CAPMVM is Liquid Metal's bare-metal CAPI infrastructure provider.

Instructions on how to install CAPMVM to your management cluster can be found
in any of the [tutorials][install] on this site.

## CAPMVM API

<!--
These sections are filled in automatically at deploy time.
Do not manually edit and commit anything between the yaml blocks.
-->

_CRD yamls generated with [`crd-to-sample-yaml`][cty]. Click headings to see
API code._

### [`MicrovmCluster`][cluster]

```yaml
```

### [`MicrovmMachine`][machine]

```yaml
```

### [`MicrovmMachineTemplate`][machinetemplate]

```yaml
```

[install]: /docs/tutorial-basics/capi
[cty]: https://github.com/Skarlso/crd-to-sample-yaml
[cluster]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/blob/main/api/v1alpha1/microvmcluster_types.go
[machine]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/blob/main/api/v1alpha1/microvmmachine_types.go
[machinetemplate]: https://github.com/liquidmetal-dev/cluster-api-provider-microvm/blob/main/api/v1alpha1/microvmmachinetemplate_types.go
