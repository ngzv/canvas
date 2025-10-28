import { defineStore } from 'pinia';

/// 定义用户模块的 `store`
/// - 用于管理用户登录状态、权限等数据
/// - 使用:
///   `import { useUserStore } from '@/store/modules/user'`
///   `const userStore = useUserStore()`
///   `userStore.setToken('newToken')`
///   `console.log(userStore.token)`
export const useUserStore = defineStore('user', {
  // 定义管理用户数据的 `state`
  state: () => ({
    token: ''
  }),
  // 定义管理用户数据的 `actions`
  actions: {
    setToken(token) {
      this.token = token;
    }
  }
});