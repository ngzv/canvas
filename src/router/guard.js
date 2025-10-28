// 白名单，不需要 token 即可访问
const whiteList = ['/login', '/401', '/404'];

export function guard(router) {

  // 全局前置守卫 访问某个路由之前守卫
  // - to: 将要访问哪个路由
  // - from: 从那个路由来
  // - next: 路由放行函数
  router.beforeEach((to, from, next) => {

    // 在白名单中，直接访问
    if (whiteList.includes(to.path)) {
      next();
    } else {
      // 其他情况，直接放行
      next();
    }
  });

  // 全局后置守卫 访问某个路由之后守卫
  // - to: 将要访问哪个路由
  // - from: 从那个路由来
  router.afterEach((to, from) => {});
}