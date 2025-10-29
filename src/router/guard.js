import { useUserStore } from '../store/modules/user';

// 白名单，不需要 token 即可访问
const whiteList = ['/login', '/401', '/404'];

/**
 * 路由守卫配置
 * @param {Router} router - Vue Router 实例
 */
export function guard(router) {

  // 全局前置守卫 访问某个路由之前守卫
  // - to: 将要访问哪个路由
  // - from: 从那个路由来
  // - next: 路由放行函数
  router.beforeEach((to, from, next) => {

    const userStore = useUserStore();
    
    try {
      // 初始化用户状态（从本地存储恢复）
      userStore.init();
      
      // 获取 token
      const token = userStore.token;
      
      // 根据是否有 token 来进行不同处理
      if (token) {
        // 有 token
        if (to.path === '/login') {
          // 访问登录页，重定向到首页
          next({ path: '/' });
        } else if (whiteList.includes(to.path)) {
          // 在白名单中，直接访问
          next();
        } else {
          // 检查用户是否有权限访问该路由
          if (checkPermission(to, userStore)) {
            next();
          } else {
            // 没有权限，跳转到 401 页面
            next('/401');
          }
        }
      } else {
        // 没有 token
        if (whiteList.includes(to.path)) {
          // 在白名单中，直接访问
          next();
        } else {
          // 否则全部重定向到登录页
          next(`/login?redirect=${to.fullPath}`);
        }
      }
    } catch (error) {
      console.error('路由守卫错误：', error);
      // 发生错误，跳转到登录页
      next(`/login?redirect=${to.fullPath}`);
    }
  });

  // 全局后置守卫 访问某个路由之后守卫
  // - to: 将要访问哪个路由
  // - from: 从那个路由来
  router.afterEach((to, from) => {});

  // 全局错误守卫
  router.onError((error) => {
    console.error('路由错误：', error);
  });
}

/**
 * 检查用户是否有权限访问该路由
 * @param {RouteLocationNormalized} to - 目标路由
 * @param {Object} userStore - 用户状态管理
 * @returns {boolean} 是否有权限
 */
function checkPermission(to, userStore) {
  // 如果路由没有配置权限要求，则默认允许访问
  if (!to.meta?.roles) {
    return true;
  }
  
  // 如果用户没有角色信息，则无权访问
  if (!userStore.userRoles || userStore.userRoles.length === 0) {
    return false;
  }
  
  // 检查用户是否具有路由所需的任一角色
  const requiredRoles = to.meta.roles;
  return userStore.userRoles.some(role => requiredRoles.includes(role));
}