import { defineStore } from 'pinia';
import { decrypt, encrypt } from '../../utils/crypto';

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
    token: '',
    user: {
      username: '',
      password: '',
      isRemember: false
    }
  }),
  // 定义管理用户数据的 `actions`
  actions: {
    // 初始化用户状态，使用时注意需要先使用 init 此方法
    init() {
      // 从本地存储中恢复 token
      const saved = sessionStorage.getItem('ACCESS_TOKEN');
      if (saved) this.token = decrypt(saved);
      // 从本地存储中恢复 用户信息
      const savedUser = localStorage.getItem('ACCESS_USER');
      if (savedUser) this.user = decrypt(savedUser);
    },
    // 设置用户 token
    setToken(token) {
      this.token = token;
      sessionStorage.setItem('ACCESS_TOKEN', encrypt(token));
    },
    // 获取用户 token
    getToken() {
      return this.token;
    },
    // 移除用户 token
    removeToken() {
      this.token = '';
      sessionStorage.removeItem('ACCESS_TOKEN');
    },
    // 设置用户信息
    setUser(user) {
      this.user = user;
      localStorage.setItem('ACCESS_USER', encrypt(user));
    },
    // 获取用户信息
    getUser() {
      return this.user;
    },
    // 移除用户信息
    removeUser() {
      this.user = {
        username: '',
        password: '',
        isRemember: false
      };
      localStorage.removeItem('ACCESS_USER');
    }
  }
});