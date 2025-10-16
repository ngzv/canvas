/// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页',
      isHome: true,
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/exception/401.vue'),
    meta: {
      title: '401 未授权',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/exception/404.vue'),
    meta: {
      title: '404 页面不存在',
    }
  },
]