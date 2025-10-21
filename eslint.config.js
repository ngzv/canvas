// eslint.config.js (9.0后开始的新文件类型)
// ESLint 的核心配置文件
// 用于定义代码检查规则、解析器、环境等，确保项目代码符合团队约定的质量标准和风格规范（如避免语法错误、强制变量声明方式、限制不安全操作等）。
// 有 eslint.config.js、eslint.config.cjs 两种类型，在 package.json 中设置 type=module 时生成 .js，type=commonjs 或空 时生成 .cjs，区别在于导出方式不同，.js 导出为 ES 模块 (export default {})，.cjs 导出为 CommonJS 模块 (module.exports = {})。
// 需要导入依赖 `npm install eslint eslint-plugin-vue vue-eslint-parser -D`

import eslintPluginVue from 'eslint-plugin-vue';
import * as vueEslintParser from 'vue-eslint-parser';

export default [
  // 全局忽略配置（所有规则块均生效）
  {
    ignores: [
      'node_modules/**', // 忽略依赖
      'dist/**', // 忽略构建产物
      'build/**', // 忽略构建产物
      '.vscode/**', // 忽略编辑器配置文件
      '.idea/**', // 忽略编辑器配置
      '*.d.ts', // 忽略类型声明文件
      '.env*', // 忽略环境变量文件
      '*.log', // 忽略日志文件
      '*.lock' // 忽略锁文件      
    ]
  },
  // 基础配置（适用于所有文件）
  {
    // 配置语言选项（解析器、全局变量等）
    languageOptions: {
      ecmaVersion: 'latest', // 支持最新 ES 语法
      sourceType: 'module' // 启用 ES 模块（import/export）
    },
    // 基础规则（所有文件通用）
    rules: {
      'no-console': 'off', // 关闭禁止使用 console
      'no-debugger': 'error', // 禁止 debugger
      'no-unused-vars': 'off', // 关闭禁止未使用变量
      'eqeqeq': 'error', // 强制使用 ===/!==
      'no-extra-semi': 'error', // 禁止多余分号
      'no-var': 'error', // 禁止使用 var，使用 let/const
      'prefer-const': 'error', // 优先使用 const
      'no-multiple-empty-lines': ['error', { max: 2 }], // 限制空行数量
      'indent': ['error', 2], // 缩进使用 2 个空格
      'quotes': ['error', 'single'], // 使用单引号
      'semi': ['error', 'always'], // 语句末尾使用分号 always | never
      'comma-dangle': ['error', 'never'], // 禁止尾随逗号
      'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数空格
      'object-curly-spacing': ['error', 'always'], // 对象字面量中的空格
      'array-bracket-spacing': ['error', 'never'] // 数组括号内不加空格
    }
  },
  // Vue 配置（适用于 .vue 文件）
  { 
    // Vue 文件特定配置
    files: ['**/*.vue'],
    languageOptions: {
      // Vue 专用解析器（解析 <template>）
      parser: vueEslintParser
    },
    plugins: { 
      vue: eslintPluginVue 
    }
  }
];