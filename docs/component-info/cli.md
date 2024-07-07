---
title: flintlockd CLI ref
---

```console
flintlockd run -h
Start running the flintlock API

Usage:
  flintlockd run [flags]

Flags:
      --basic-auth-token string          The token to use for very basic token based authentication.
      --bridge-name string               The name of the Linux bridge to attach tap devices to by default
      --cloudhypervisor-bin string       The path to the cloud hypervisor binary to use. (default "cloud-hypervisor-static")
      --cloudhypervisor-detach           If true the child cloud hypervisor processes will be detached from the parent flintlock process. (default true)
      --containerd-kernel-ss string      The name of the snapshotter to use with containerd for kernel/initrd images. (default "native")
      --containerd-ns string             The name of the containerd namespace to use. (default "flintlock")
      --containerd-socket string         The path to the containerd socket. (default "/run/containerd/containerd.sock")
      --debug-endpoint string            The endpoint for the debug web server to listen on. It must include a port (e.g. localhost:10500).  An empty string means disable the debug endpoint.
      --default-provider string          The name of the microvm provider to use by default if not supplied in the create request. (default "firecracker")
      --deleteMicroVM-timeout duration   The timeout for deleting a microvm. (default 10s)
      --firecracker-bin string           The path to the firecracker binary to use. (default "firecracker")
      --firecracker-detach               If true the child firecracker processes will be detached from the parent flintlock process. (default true)
      --grpc-endpoint string             The endpoint for the gRPC server to listen on. (default "localhost:9090")
      -h, --help                         Help for run
      --insecure                         Run the gRPC server insecurely (i.e. without TLS). Not recommended.
      --parent-iface string              The parent iface for the network interfaces. Note it could also be a bond
      --resync-period duration           Reconcile the specs to resynchronise them based on this period. (default 10m0s)
      --state-dir string                 The directory to use for the as the root for runtime state. (default "/var/lib/flintlock")
      --tls-cert string                  Path to the certificate to use for TLS.
      --tls-client-ca string             Path to the certificate to use when validating client certificates.
      --tls-client-validate              Validate the certificates of clients calling the gRPC server.
      --tls-key string                   Path to the key to use for TLS.

Global Flags:
      --log-format string   The format of the logging output. Can be 'text' or 'json'. (default "text")
      --log-output string   The output for logging. Supply a file path or one of the special values of 'stdout' and 'stderr'. (default "stderr")
  -v, --verbosity int       The verbosity level of the logging. A level of 2 and above is debug logging. A level of 9 and above is tracing.
```
