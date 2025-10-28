import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { guard } from './guard';

/// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  // 路由配置
  routes,
  // 每次跳转后滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 配置路由守卫
guard(router);

export default router;