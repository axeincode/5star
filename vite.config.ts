// Plugins
import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from "path";

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
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/assets/public/css/settings.scss',
        },
      }),
    ],
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
