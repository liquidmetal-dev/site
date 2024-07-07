/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        {
          type: 'category',
          label: 'Basics: DO try this at home',
          link: {
            type: 'generated-index',
            description: 'A basic tutorial. Use the core components to create a Liquid Metal platform and workload cluster on your local Linux machine.'
          },
          items: [
            'tutorial-basics/overview',
            'tutorial-basics/macos',
            'tutorial-basics/network',
            'tutorial-basics/containerd',
            'tutorial-basics/flintlockd',
            'tutorial-basics/capi',
            'tutorial-basics/create',
            'tutorial-basics/inspect',
            'tutorial-basics/teardown',
            'tutorial-basics/congratulations',
          ],
        },
        {
          type: 'category',
          label: 'Advanced: Equinix Platform',
          link: {
            type: 'generated-index',
            description: 'A more advanced tutorial. Create a Liquid Metal platform on Equinix Metal.'
          },
          items: [
            'tutorial-equinix/intro',
            'tutorial-equinix/terraform',
            'tutorial-equinix/inspect',
            'tutorial-equinix/capi',
            'tutorial-equinix/create',
            'tutorial-equinix/teardown',
            'tutorial-equinix/congratulations',
          ],
        },
        {
          type: 'category',
          label: 'Fun: Raspberry Pi Homelab',
          link: {
            type: 'generated-index',
            description: 'A fun workshop. Create a Liquid Metal cluster on Raspberry Pi.'
          },
          items: [
            'tutorial-rpi/intro',
            'tutorial-rpi/shopping-list',
            {
              type: 'category',
              label: 'Build guide',
              items: [
                'tutorial-rpi/build-guide/board-setup',
                'tutorial-rpi/build-guide/host-bootstrapping',
                'tutorial-rpi/build-guide/check-env',
                'tutorial-rpi/build-guide/management-cluster',
                'tutorial-rpi/build-guide/mvm-cluster',
              ],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'tutorial-rpi/troubleshooting/flintlock',
                'tutorial-rpi/troubleshooting/microvm',
                'tutorial-rpi/troubleshooting/capmvm',
              ],
            },
          ],
        },
      ],
    },
    'component-info/hardware',
    'component-info/networking',
    {
      type: 'category',
      label: 'Flintlock',
      link: {
        type: 'doc',
        id: 'component-info/flintlock',
      },
      items: [
        'component-info/cli',
      ]
    },
    'component-info/providers',
    'component-info/images',
    'component-info/cluster-api',
    'component-info/capmvm',
    'component-info/authn',
    {
      type: 'category',
      label: 'Architecture',
      link: {
        type: 'generated-index',
      },
      items: [
        'architecture/high-level',
        'architecture/microvm-networking',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        type: 'generated-index',
      },
      items: [
        'troubleshooting/flintlock',
        'troubleshooting/containerd',
        'troubleshooting/microvm',
        'troubleshooting/capmvm',
      ],
    },
  ],
  community: [
    'community/community',
    'community/support',
    'community/team',
    {
      type: 'category',
      label: 'Guide for Contributors',
      link: {
        type: 'generated-index',
        description: 'Your one-stop-shop for getting involved in Liquid Metal!',
      },
      items: [
        'community/contributing/welcome',
        'community/contributing/choices',
        'community/contributing/contributing',
        'community/contributing/support',
      ],
    },
    'community/requests',
    'community/bugs',
    'community/blog',
    'community/contact',
    'community/coc',
  ],
};

module.exports = sidebars;
