// env.d.ts
// TypeScript 项目中用于声明环境变量类型的文件
// 作用是为全局环境变量（如 process.env、import.meta.env 中的变量）提供 TypeScript 类型定义，解决类型检查报错（如 “属性不存在”）的问题。

/// <reference types="vite/client" />

/// 解决 `TypeScript` 无法识别 `*.vue` 文件模块类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/// 扩展环境变量的类型提示
/// 在代码中使用 `import.meta.env` 访问环境变量时, `TypeScript` 就能提供正确的类型检查和自动补全 
interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// 环境变量的类型提示
/// 在代码中使用 `import.meta.env` 访问环境变量时, `TypeScript` 就能提供正确的类型检查和自动补全 
interface ImportMetaEnv {
  readonly VITE_ENV_MODE: string
  readonly VITE_PROXY_TARGET: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_PORT: number
  readonly VITE_PUBLIC_PATH: string
}
