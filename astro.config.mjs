import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import prismjsPlugin from 'vite-plugin-prismjs'

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism'
  },
  vite: {
    assetsInclude: ["**/*.yaml"],
    plugins: [
      nodePolyfills({
        // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
        include: ['path', 'process', 'Buffer'],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
      }),
      prismjsPlugin({languages: "all"}) //todo narrow this down
    ],

    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  },
  integrations: [starlight({
    components: {
      // Override the default `SocialIcons` component.
      PageFrame: './src/components/CustomPageFrame.astro',
    },
    title: 'My Docs',
    social: {
      github: 'https://github.com/withastro/starlight'
    },

    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    },
      {
        label: 'Api',
        link: '/api',
      },
      {
        label: 'Schemas',
        link: '/schemas',
      }]
  }), react()]
});