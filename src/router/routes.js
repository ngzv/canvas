/// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import('../layout/index.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'System',
        path: '/system',
        meta: {
          title: '系统管理'
        },
        children: [
          {
            name: 'User',
            path: '/system/user',
            component: () => import('../views/system/user/index.vue'),
            meta: {
              title: '用户管理'
            }
          },
          {
            name: 'Role',
            path: '/system/role',
            component: () => import('../views/system/role/index.vue'),
            meta: {
              title: '角色管理'
            }
          },
          {
            name: 'Menu',
            path: '/system/menu',
            component: () => import('../views/system/menu/index.vue'),
            meta: {
              title: '菜单管理'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: '401',
    path: '/401',
    component: () => import('../views/exception/401.vue'),
    meta: {
      title: '401 未授权'
    }
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('../views/exception/404.vue'),
    meta: {
      title: '404 页面不存在'
    }
  }
];