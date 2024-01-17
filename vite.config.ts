// Plugins
import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from "path";
import legacy from '@vitejs/plugin-legacy';
import { cacheResource } from "vite-plugin-cache-resource";
import VitePluginCdn from 'vite-plugin-cdn';
import { splitVendorChunkPlugin } from 'vite'
import * as fs from 'fs';

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
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/assets/styles/settings.scss',
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: ['es.promise.finally'],
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
      splitVendorChunkPlugin(),
    ],
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
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
    optimizeDeps: {
      exclude: ['vuetify/lib'],
      include: [
        './src/**/*.vue',
        'vue-i18n',
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "vue-inline-svg",
        "vue3-lazyload",
        "vue3-carousel",
        "vue-toastification",
        "element-plus/es/components",
        "@vueuse/core",
      ],
      esbuildOptions: {
        plugins: [
          {
            name: 'replace-feature-flags',
            setup(build) {
              build.onLoad({ filter: /vue-i18n/ }, async (args) => {
                // Replace feature flag globals with boolean literals
                const code = await fs.promises.readFile(args.path, 'utf-8');
                const transformedCode = code.replace(/featureFlag/g, 'true'); // Replace featureFlag with the actual flag value
                return { contents: transformedCode };
              });
            },
          },
        ],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/global.scss"; @import "@/assets/styles/variables.scss";`
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
