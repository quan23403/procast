import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/web/',
  plugins: [react()],
  // server: {
  //   port: 3000
  // },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    // Ensure that the build target is set to 'esnext' or 'esnext' for modern browsers
    target: 'esnext',
    // Ensure that assets are correctly resolved
    assetsInlineLimit: 0,
  }
})


// function reactRefresh(): import("vite").PluginOption {
//   throw new Error('Function not implemented.')
// }
// vite.config.js

// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [reactRefresh()],

// });
