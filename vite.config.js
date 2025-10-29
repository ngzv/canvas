// vite.config.js
// Vite 构建工具的配置文件
// 用于自定义 Vite 的构建、开发服务器、插件等行为。Vite 是一个基于浏览器原生 ES 模块的前端构建工具，以快速的热更新和构建速度著称，vite.config.js 是其核心配置入口。

import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

/// `https://vite.dev/config/`
export default defineConfig(({ command, mode }) => {
  // 加载环境变量，包含前缀为 VITE_ 的环境变量
  const env = loadEnv(mode, process.cwd(), '');
  const { VITE_PORT, VITE_PROXY_TARGET, VITE_PUBLIC_PATH } = env;
  
  // 只在构建时计算时间戳
  const now = command === 'build' ? new Date().getTime() : '';
  
  return {
    /// 配置公共路径
    base: VITE_PUBLIC_PATH || '/',
    // ESBuild 配置
    esbuild: {
      // 开发环境下保留注释
      drop: command === 'build' ? ['debugger', 'console'] : []
    },
    /// 配置插件
    plugins: [
      vue(),
      AutoImport({
        // 页面自动引入vue 插件 - 自动导入系统的 如 ref、reactive、toRef、shallowRef、onMounted 等
        // ==> '@vueuse/core' 自动释放
        imports: ['vue', 'vue-router', '@vueuse/core'],
        // 自动生成声明文件
        dts: false
      }),
      Components({
        // 配置组件自动导入
        dirs: ['src/components'],
        // 配置组件自动导入的目录
        dts: false
      })
    ],
    /// 配置路径别名与扩展名
    resolve: {
      // 配置路径别名，`@` 指向 `src` 目录,与 `jsconfig` 中 `paths` 配置同步
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      // 配置文件扩展名
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    /// 配置服务器
    server: {
      host: '0.0.0.0',
      port: VITE_PORT ? Number(VITE_PORT) : 3000,
      open: true,
      // 热更新
      hmr: {
        overlay: false // 关闭错误遮罩
      },
      // 配置代理
      proxy: {
        '/api': {
          target: VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          bypass(request, response, options) {
            const proxy = options.target + options.rewrite(request.url);
            response.setHeader('X-Response-Proxy-URL', proxy);
          }
        }
      }
    },
    /// 打包配置
    build: {
      // 打包输出目录
      outDir: 'dist',
      // 目标浏览器环境
      target: 'es2015',
      // 打包时是否生成 gzip 压缩文件
      reportCompressedSize: false,
      // 打包时是否生成 source map 文件
      sourcemap: false,
      // 打包时每个 chunk 文件大小警告限制 (单位：KB)
      chunkSizeWarningLimit: 2048,
      // 静态资源分类及命名
      rollupOptions: {
        output: {
          // 入口文件命名（如主包）
          entryFileNames: now ? `entry/[name]-[hash]-${now}.js` : 'entry/[name]-[hash].js',
          // 非入口 `chunk` 命名（如拆分的公共依赖、业务模块）
          chunkFileNames: now ? `chunks/[name]-[hash]-${now}.js` : 'chunks/[name]-[hash].js',
          // 静态资源命名（如图片、字体）
          assetFileNames: now ? `assets/[ext]/[name]-[hash]-${now}.[ext]` : 'assets/[ext]/[name]-[hash].[ext]',
          // 拆分策略
          manualChunks: {
            // 公共依赖单独打包
            vendor: ['vue', 'vue-router'],
            // 工具库单独打包
            utils: ['@vueuse/core']
          }
        }
      }
    }
  };
});
