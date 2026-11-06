---
title: Liquid Metal
layout: hextra-home
---

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-badge link="https://github.com/liquidmetal-dev" >}}
  Open source · Built on Firecracker & Cloud Hypervisor
{{< /hextra/hero-badge >}}
</div>

<div class="hx:mb-6">
{{< hextra/hero-headline >}}
  Lightweight virtualization&nbsp;<br class="hx:sm:block hx:hidden" />on your own metal
{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-12">
{{< hextra/hero-subtitle >}}
  Liquid Metal runs fast, isolated microVMs on bare metal and manages them declaratively.&nbsp;<br class="hx:sm:block hx:hidden" />Use them for Kubernetes clusters, CI runners, ephemeral environments or AI agent sandboxes.
{{< /hextra/hero-subtitle >}}
</div>

<div class="hx:mb-6 lm-hero-buttons">
{{< hextra/hero-button text="Get started: 30 min tutorial" link="/docs/tutorial-basics/" >}}
{{< hextra/hero-button text="Read the docs" link="/docs/intro/" style="background: transparent; color: inherit; border: 1px solid currentColor;" >}}
</div>

<h2 class="lm-section-title">Why Liquid Metal</h2>

<p class="lm-section-lead">VM-grade isolation with close to container speed, on hardware you already own.</p>

{{< hextra/feature-grid cols="3" >}}
  {{< hextra/feature-card
    title="Hard isolation, light footprint"
    icon="shield-check"
    subtitle="Every workload gets its own kernel and a real KVM boundary. Safe for untrusted code, without the overhead of a full VM."
  >}}
  {{< hextra/feature-card
    title="Fast to boot, fast to throw away"
    icon="lightning-bolt"
    subtitle="MicroVMs start in close to container time, so runners, sandboxes and environments come and go on demand."
  >}}
  {{< hextra/feature-card
    title="Declarative and API driven"
    icon="code"
    subtitle="Manage microVMs through a gRPC API, Kubernetes resources or the CLI. Fits naturally into GitOps workflows."
  >}}
  {{< hextra/feature-card
    title="More from your hardware"
    icon="server"
    subtitle="Pack many more workloads onto each bare-metal host. Less hardware means lower cost and lower carbon emissions."
  >}}
  {{< hextra/feature-card
    title="Built for edge and on-prem"
    icon="globe-alt"
    subtitle="Runs on bare metal anywhere, from datacenter servers to a Raspberry Pi rig, with direct access to hardware acceleration."
  >}}
  {{< hextra/feature-card
    title="Standard building blocks"
    icon="puzzle"
    subtitle="Firecracker, Cloud Hypervisor, containerd, KVM and upstream Kubernetes. No proprietary stack to lock you in."
  >}}
{{< /hextra/feature-grid >}}

<h2 class="lm-section-title">Use cases</h2>

<p class="lm-section-lead">Anything that needs fast, isolated, disposable machines.</p>

{{< hextra/feature-grid cols="2" >}}
  {{< hextra/feature-card
    title="Kubernetes clusters"
    icon="cube"
    subtitle="Run control plane and worker nodes as microVMs with Cluster API. Put more clusters on less hardware, on-prem or at the edge."
    link="/docs/use-cases/kubernetes/"
  >}}
  {{< hextra/feature-card
    title="CI runners"
    icon="terminal"
    subtitle="Give every job a clean, isolated microVM that is destroyed afterwards. No shared state, no leftover secrets."
    link="/docs/use-cases/ci-runners/"
  >}}
  {{< hextra/feature-card
    title="Ephemeral environments"
    icon="collection"
    subtitle="Preview, test and development environments that start in seconds and leave nothing behind."
    link="/docs/use-cases/ephemeral-environments/"
  >}}
  {{< hextra/feature-card
    title="AI agent sandboxes"
    icon="sparkles"
    subtitle="Give agents a real machine to run untrusted code in, with a hard isolation boundary and a fast reset."
    link="/docs/use-cases/agent-sandboxes/"
  >}}
{{< /hextra/feature-grid >}}

<h2 class="lm-section-title">Projects</h2>

<p class="lm-section-lead">Use them together as a platform, or pick the pieces you need.</p>

{{< hextra/feature-grid cols="3" >}}
  {{< hextra/feature-card
    title="Flintlock"
    icon="fire"
    subtitle="The host agent. Creates and manages the lifecycle of microVMs on bare metal using Firecracker or Cloud Hypervisor, with images from containerd."
    link="https://flintlock.liquidmetal.dev"
  >}}
  {{< hextra/feature-card
    title="Cluster API Provider MicroVM"
    icon="cube"
    subtitle="A Cluster API infrastructure provider that places Kubernetes control plane and worker nodes as microVMs across Flintlock hosts."
    link="https://github.com/liquidmetal-dev/cluster-api-provider-microvm"
  >}}
  {{< hextra/feature-card
    title="microvm-operator"
    icon="cog"
    subtitle="A Kubernetes operator with `Microvm`, `MicrovmReplicaSet` and `MicrovmDeployment` resources for running microVMs on Flintlock hosts. *Experimental.*"
    link="https://github.com/liquidmetal-dev/microvm-operator"
  >}}
  {{< hextra/feature-card
    title="Brigade"
    icon="collection"
    subtitle="A distributed orchestrator that speaks Flintlock's gRPC API as a drop-in and schedules microVMs across a fleet of hosts. *Experimental.*"
    link="https://github.com/liquidmetal-dev/brigade"
  >}}
  {{< hextra/feature-card
    title="Battery"
    icon="lightning-bolt"
    subtitle="A warm pool manager that keeps pre-booted microVMs ready, so clients can claim a running VM straight away. *Experimental.*"
    link="https://github.com/liquidmetal-dev/battery"
  >}}
  {{< hextra/feature-card
    title="And more on GitHub"
    icon="github"
    subtitle="CLIs, image builders, CI runners, Terraform modules and more in the liquidmetal-dev organization."
    link="https://github.com/liquidmetal-dev"
  >}}
{{< /hextra/feature-grid >}}

<h2 class="lm-section-title">Get involved</h2>

<p class="lm-section-lead">Build a microVM platform in 30 minutes, then come and say hello.</p>

<div class="hx:mb-12 lm-hero-buttons">
{{< hextra/hero-button text="Start the tutorial" link="/docs/tutorial-basics/" >}}
{{< hextra/hero-button text="Join us on Slack" link="https://cloud-native.slack.com/archives/C07B5R5BLBZ" style="background: transparent; color: inherit; border: 1px solid currentColor;" >}}
</div>
