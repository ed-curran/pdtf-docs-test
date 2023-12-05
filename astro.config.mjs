import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import requireTransform from 'vite-plugin-require-transform';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://astro.build/config
export default defineConfig({
  vite: {
    assetsInclude: ["**/*.yaml"],
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
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
      })
    ],

    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    optimizeDeps:{
      include: ["@stoplight/json-schema-viewer", "@stoplight/elements",  "@stoplight/elements-core", "prismjs"],
      esbuildOptions:{
        plugins:[
          esbuildCommonjs(['@stoplight/json-schema-viewer', "@stoplight/elements", "@stoplight/elements-core", "prismjs"])
        ]
      }
    }
  },
  integrations: [starlight({
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
    }]
  }), react()]
});