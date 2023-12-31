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
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
  // But you can create a sidebar manually
  mySidebar: [
    {
      type: 'category',
      label: '🚀 HTTP',
      link: { type: 'doc', id: 'http' },
      items: [
        {
          type: 'link',
          label: 'Login',
          href: '/http#login',
        },
      ],
    },
    {
      type: 'category',
      label: '🔥 WebSocket Events',
      items: [
        {
          type: 'category',
          label: '↔️ Incoming',
          link: { type: 'doc', id: 'incoming' },
          items: [
            {
              type: 'link',
              href: '/#get-all-drivers',
              label: 'Get all drivers',
            },
            {
              type: 'link',
              href: '/#get-me-driver',
              label: 'Get me (Driver)',
            },
          ],
        },
        {
          type: 'doc',
          id: 'outgoing',
          label: '⬅️ Outgoing',
        },
      ],
    },
    {
      type: 'doc',
      id: 'markdown-features',
      label: 'Markdown features',
    },
  ],
};

module.exports = sidebars;
