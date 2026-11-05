---
title: Provision the infrastructure
---

We will use terraform to create some devices in Equinix.

## Configure

1. Create a new local directory and change into it:

  ```bash
  mkdir lm-equinix
  cd lm-equinix
  ```

1. Generate an API key for both Equinix and Tailscale.

1. Create a new SSH key pair:

  ```bash
  ssh-keygen -t ed25519 -f lm-key -N ""
  ```

1. Connect your local machine to Tailscale:

  For Linux users:
  ```bash
  sudo tailscale up --accept-routes
  ```

  For other OS users:
  ```bash
  sudo tailscale up
  ```

1. Install the [Equinix CLI tool][eq-cli].

1. Find an Equinix metro with sufficient capacity.

  ```bash
  metal capacity get
  ```

  Make note of the `FACILITY` and `PLAN` which has a `normal` availabity level.
  In my case I will choose:

  ```
  | am6      | c3.small.x86   | normal     |
  ```

1. Write the following to a `main.tf` file:

  <details><summary>Contents</summary>

  ```bash
  cat << EOF >main.tf
  module "create_devices" {
    source = "git::https://github.com/liquidmetal-dev/terraform-equinix-liquidmetal.git?ref=v0.0.3"

    metal_auth_token = "my equinix auth token"
    org_id = "my org id"
    project_name = "my-lm-project"
    public_key = "my ssh public key"
    metro = "your chosen metro"
    server_type = "your chosen server type"
  }

  module "provision_hosts" {
    source = "git::https://github.com/liquidmetal-dev/terraform-equinix-liquidmetal.git//modules/provision?ref=v0.0.3"

    ts_auth_key = "my tailscale auth key"
    private_key_path = "/path/to/my/private/key"

    vlan_id = module.create_devices.vlan_id
    network_hub_address = module.create_devices.network_hub_ip
    microvm_host_addresses = module.create_devices.microvm_host_ips
    baremetal_host_addresses = module.create_devices.bare_metal_host_ips
  }

  output "network_hub_ip" {
    value = module.create_devices.network_hub_ip
    description = "The address of the device created to act as a networking configuration hub"
  }

  output "microvm_host_ips" {
    value = module.create_devices.microvm_host_ips
    description = "The addresses of the devices provisioned as flintlock microvm hosts"
  }
  EOF
  ```

  </details>

1. Edit these fields in your `main.tf`:

    - `metal_auth_token`: _your API token for Equinix Metal_
    - `org_id`: _Your Equinix org id._
    - `project_name`: _The name of the project to create._
    - `public_key`: _The contents of the `.pub` file you created earlier._
    - `metro`: _The metro of the facility you chose from your capacity check earlier.
      In my case I chose facility `am6`, so my metro will be `am`._
    - `server_type`: _The plan available in your chosen metro. In my case this is
      `c3.small.x86`._
    - `ts_auth_key`: _Your Tailscale auth key._
    - `private_key_path`: _The full path to the private key you generated earlier._

## Apply

Once your variables are configured, apply the plan:

```bash
terraform init
terraform plan
terraform apply
```

This make take a few minutes.

Once the `apply` is complete, take a note of the following outputs:

- `network_hub_ip`
- `microvm_host_ips`

### Approve the subnet routes

Once your `network-hub` host is provisioned, navigate to your [Tailscale dash][ts-dash], and
locate your `network-hub` machine which should have come online in your network. Select
the machine.

On the machine page, click Review under the 'Subnets' section, and toggle your range to 'enabled'.

:::info
This bit is easy to overlook or forget, so I am highlighting here for extra clarity!
:::

## Test

To verify the `flintlockd` services are ready to accept requests, you can use either [`fl`][fl] or
[`hammertime`][ht] to perform simple queries against the `microvm_host_ips` returned
by the terraform:

```bash
hammertime list -a <address>:9090

fl microvm get --host <address>:9090
```

[ts-dash]: https://login.tailscale.com/admin/machines
[fl]: https://github.com/liquidmetal-dev/fl
[ht]: https://github.com/warehouse-13/hammertime
[eq-cli]: https://metal.equinix.com/developers/docs/libraries/cli/
