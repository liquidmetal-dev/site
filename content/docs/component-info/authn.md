---
title: Service Authentication
weight: 7
---

Secure Liquid Metal platform communications with mTLS and Basic Auth.

## Basic Auth

### Flintlock server configuration

To configure `flintlockd` with basic auth, provision the device with the following:

```bash
cat <<EOF >flint-cfg.yaml
insecure: false
basic-auth-token: TOKEN
EOF

./provision.sh all \ # or ./provision.sh flintlock
  -f flint-cfg.yaml
  # other flags
```

If you inspect the service logs (`systemctl status flintlockd`), you should see the following line:

```bash
level=info msg="basic authentication is enabled"
```

### CAPMVM client configuration

Before you create your CAPMVM cluster, create a secret containing a mapping for each
host and encoded token:

```bash
cat <<EOF >secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mybasicsecret
  namespace: default
type: Opaque
data:
  192.168.0.31: Zm9v # foo
  192.168.0.32: YmFy # bar
EOF
```

When you have generated your CAPMVM cluster manifest, edit the file to contain the
following reference to the secret:

```yaml
...
kind: MicrovmCluster
spec:
  placement:
    staticPool:
      basicAuthSecret: mybasicsecret
...
```

Apply both to your management cluster:

```bash
kubectl apply -f secret.yaml
kubectl apply -f cluster.yaml
```

## mTLS

### Flintlock server configuration

To configure `flintlockd` with mTLS, provision the device with the following:

```bash
cat <<EOF >flint-cfg.yaml
insecure: false
tls-cert: <path to host pem>
tls-key: <path to host key>
tls-client-ca: <path to ca pem>
tls-client-validate: true
EOF

./provision.sh all \ # or ./provision.sh flintlock
  -f flint-cfg.yaml
  # other flags
```

If you inspect the service logs (`systemctl status flintlockd`), you should see the following line:

```bash
level=info msg="TLS is enabled"
```

### CAPMVM client configuration

Before you create your CAPMVM cluster, create an Opaque secret the client and CA keys:

```bash
kubectl create secret generic mytlssecret \
  --from-file=tls.crt=<path to client pem> \
  --from-file=tls.key=<path to client key> \
  --from-file=ca.crt=<path to ca pem>
```

When you have generated your CAPMVM cluster manifest, edit the file to contain the
following reference to the secret:

```yaml
...
kind: MicrovmCluster
spec:
  tlsSecretRef: mytlssecret
...
```
