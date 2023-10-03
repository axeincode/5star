// Plugins
import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from "path";
import legacy from '@vitejs/plugin-legacy';
import imagemin from 'vite-plugin-imagemin';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import { cacheResource } from "vite-plugin-cache-resource";
import VitePluginCdn from 'vite-plugin-cdn';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** Modify according to the actual situation when packaging base */
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      cssnano(),
      terser(),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/assets/public/css/settings.scss',
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: ['es.promise.finally'],
      }),
      imagemin({
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false
            },
            {
              cleanupIDs: true
            }
          ]
        }
      }),
      cacheResource({
        cacheDir: path.join(__dirname, ".cache"),
      }),
      VitePluginCdn({
        esm: true,
        modules: [
          {
            name: 'vue',
            url: 'https://cdn.jsdelivr.net/npm/vue@:version/dist/vue.min.js',
          },
          {
            name: 'axios',
            url: 'https://cdn.jsdelivr.net/npm/axios@:version/dist/axios.min.js',
          },
        ],
      }),
    ],
    build: {
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      rollupOptions: {
        external: [
          "vue",
          "element-plus",
          "pinia",
          "axios",
          "vuetify",
          "vue-router",
        ],
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/public/css/global.scss";`
        }
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://dev.api.xxx.com', // 后端接口的域名
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
