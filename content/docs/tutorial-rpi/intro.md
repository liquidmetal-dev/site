---
title: Introduction
weight: 1
---

Take your Kubernetes homelab cluster to the next level with Liquid Metal MicroVMs.

> [!TIP]
> This rig was built quickly and under budget for a [Kubernetes community days demo][kcduk].
> Claudia has shared it so that other people can have fun with the experiment.
>
> There is absolutely no guarantee that any of this will work for you. If you are
> using this guide it means you are prepared to use it as a base, and that you are
> very happy (excited even!) to spend potentially lots of time debugging obscure
> networking and kernel errors.
>
> Claudia has done her best to capture everything she did, and has provided a [Troubleshooting](/docs/tutorial-rpi/troubleshooting/flintlock)
> section to help with any weird issued. She is continuing to fine-tune and improve,
> so will try to publish updates.
> If you come across something which could be better, feel
> free to contribute! :purple_heart:
>
> You can watch the demo live [here][kcduk].

![rig](/img/rig1.jpg)

### What are we building?

Here is a very high-level diagram which shows what you will end up with if you
follow this tutorial.

![Liquid Metal high-level illustration](/img/high-level.jpg)

### Will it match what was in the demo?

Not exactly. Claudia had some very specific networking concerns for that demo,
which will not apply to the majority of people building this at home.

Furthermore, this workshop serves as a base for people to expand to their particular
needs, so the result is deliberately simple.

If you'd like to see exactly what Claudia did for her demo, you can check out her
[original docs][cosmic-docs].

### Cosmic?

Before it was donated to the Liquid Metal docs, this project was called `cosmic`.

Bonus points if you got the Disney reference.

![Alt Text](https://media.tenor.com/C7BweO_X39sAAAAd/aladdin-animated.gif)

[cosmic-docs]: https://warehouse-13.github.io/cosmic/docs/intro/
[kcduk]: https://www.youtube.com/watch?v=8GjFLRpyilw&list=PLX3geWFOgXozvW1avyeZfgPJXrWrzHgYV&index=29&ab_channel=KubernetesCommunityDaysUK
