<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="background-shape background-shape-1"></div>
      <div class="background-shape background-shape-2"></div>
      <div class="background-shape background-shape-3"></div>
    </div>
    <!-- 登录模块 -->
    <div class="login">
      <!-- 登录模块头部 -->
      <div class="login-header">
        <h2>欢迎登录</h2>
        <p>请输入您的账号信息以访问系统</p>
      </div>
      <!-- 登录模块表单 -->
      <a-form :model="loginForm" name="login" autocomplete="off" @finish="handleLogin">
        <a-form-item name="username" :rules="[{ required: true, min: 1, trigger: 'change', message: '请输入用户名!' }]">
          <a-input v-model:value="loginForm.username" size="large" allowClear placeholder="用户名">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, min: 1, trigger: 'change', message: '请输入密码!' }]">
          <a-input-password v-model:value="loginForm.password" size="large" allowClear placeholder="密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="captcha" :rules="[{ required: true, min: 1, trigger: 'change', message: '请输入验证码!' }]">
          <div class="captcha">
            <a-input v-model:value="loginForm.captcha" size="large" allowClear placeholder="验证码">
              <template #prefix>
                <SafetyOutlined />
              </template>
            </a-input>
            <div class="captcha-image" @click="refreshCaptcha">
              <img :src="captchaUrl" alt="验证码" />
            </div>
          </div>
        </a-form-item>
        <a-form-item class="remember-forgot" name="remember">
          <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
          <!-- <a class="forgot-password" href="#">忘记密码?</a> -->
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading" type="primary" html-type="submit" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { canvasCaptcha, textCaptcha } from '@/utils/captcha';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const captchaUrl = ref('');

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
  remember: false
});

// 刷新验证码
const refreshCaptcha = () => {
  const captcha = textCaptcha();  
  captchaUrl.value = canvasCaptcha(captcha);

  // 存储验证码到sessionStorage，用于验证
  sessionStorage.setItem('ACCESS_CAPTCHA', captcha.toLowerCase());
};

// 处理登录
const handleLogin = async (values) => {
  try {
    loading.value = true;
    
    // 验证验证码
    const storedCaptcha = sessionStorage.getItem('ACCESS_CAPTCHA');
    if (values.captcha.toLowerCase() !== storedCaptcha) {
      message.error('验证码错误！');
      refreshCaptcha();
      return;
    }
    
    // 这里应该调用登录API，现在模拟登录
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 设置token
    userStore.setToken('demo-token-' + Date.now());
    
    // 设置用户信息
    userStore.setUser({
      username: values.username,
      password: values.password,
      isRemember: values.remember
    });
    
    message.success('登录成功！');
    
    // 获取重定向地址，如果没有则默认跳转到首页
    router.push(route.query.redirect || '/');
  } catch (error) {
    message.error('登录失败，请重试！');
    refreshCaptcha();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // 初始化验证码
  refreshCaptcha();
  
  // 如果有记住的用户名，自动填充
  const user = userStore.getUser();
  if (user) {
    loginForm.username = user.username;
    loginForm.password = user.password;
    loginForm.remember = user.isRemember;
  }
});
</script>

<style scoped lang="less">
.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #1a2a3a 0%, #2c3e50 100%);
  overflow: hidden;
  
  // 背景装饰
  .background-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    
    .background-shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 50%;
      
      &.background-shape-1 {
        width: 500px;
        height: 500px;
        top: -250px;
        right: -100px;
        background: radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.01) 70%);
      }
      
      &.background-shape-2 {
        width: 400px;
        height: 400px;
        bottom: -200px;
        left: -100px;
        background: radial-gradient(circle, rgba(41, 128, 185, 0.05) 0%, rgba(41, 128, 185, 0.01) 70%);
      }
      
      &.background-shape-3 {
        width: 300px;
        height: 300px;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        background: radial-gradient(circle, rgba(44, 62, 80, 0.05) 0%, rgba(44, 62, 80, 0.01) 70%);
      }
    }
  }
  
  // 登录模块
  .login {
    position: relative;
    z-index: 1;
    width: 400px;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    
    .login-header {
      text-align: center;
      margin: 20px;
      
      h2 {
        color: #2c3e50;
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 0px;
      }
      
      p {
        color: #7f8c8d;
        font-size: 14px;
      }
    }
    
    .captcha {
      display: flex;
      align-items: center;
      
      .captcha-image {
        width: 140px;
        height: 40px;
        margin-left: 10px;
        cursor: pointer;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        overflow: hidden;
        transition: border-color 0.3s ease;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        &:hover {
          border-color: #2c3e50;
        }
      }
    }
    
    .forgot-password {
      float: right;
      color: #7f8c8d;
      transition: color 0.3s ease;
      
      &:hover {
        color: #2c3e50;
      }
    }
    
    .ant-form-item {
      margin-bottom: 20px;
    }

    .remember-forgot {
      margin-bottom: 2px;
    }

    .ant-btn-primary {
      height: 40px;
      font-size: 16px;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      border: none;
      border-radius: 6px;
      font-weight: 500;
      box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 15px rgba(52, 152, 219, 0.4);
      }
      
      &:active {
        transform: translateY(0);
      }
    }

    :deep(.ant-input) {
      border-color: #d9d9d9;
      
      &:focus {
        border-color: #2c3e50;
        box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
      }

      &:hover {
        border-color: #2c3e50;
      }
      
      &:active {
        border-color: #2c3e50;
      }
    }

    :deep(.ant-input-affix-wrapper) {
      border-color: #d9d9d9;

      &:focus {
        border-color: #2c3e50;
        box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
      }

      &:hover {
        border-color: #2c3e50;
      }
      
      &:active {
        border-color: #2c3e50;
      }
    }

    :deep(.ant-input-affix-wrapper-focused) {
      border-color: #2c3e50;
      box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
    }

    :deep(.ant-input-prefix) {
      margin-right: 10px;
      color: #7f8c8d;
      
      &:hover {
        color: #2c3e50;
      }
    }
    
    :deep(.ant-input-clear-icon) {
      color: rgba(0, 0, 0, 0.25);
      
      &:hover {
        color: #2c3e50;
      }
    }

    // 添加密码输入框眼睛图标的固定尺寸样式
    :deep(.ant-input-password-icon) {
      width: 14px;
      height: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.4);
      
      &:hover {
        color: #2c3e50;
      }
      
      svg {
        width: 14px;
        height: 14px;
      }
    }

    :deep(.ant-form-item-explain) {
      font-size: 12px;
    }
    
    :deep(.ant-checkbox-wrapper) {
      color: #7f8c8d;

      .ant-checkbox {

        .ant-checkbox-inner {
          border-color: #2c3e50;
          
          &:hover {
            border-color: #2c3e50;
          }
        }
        
        &.ant-checkbox-checked {

          .ant-checkbox-inner {
            background-color: #2c3e50;
            border-color: #2c3e50;
          }
        }
        
        &.ant-checkbox-checked::after {
          border-color: #2c3e50;
        }
        
        &:hover {

          .ant-checkbox-inner {
            border-color: #2c3e50;
          }
        }
        
        &:focus {

          .ant-checkbox-inner {
            border-color: #2c3e50;
            box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.2);
          }
        }
      }
      
      &:hover {
        color: #2c3e50;
      }
    }
  }
}

// 响应式设计
@media (max-width: 576px) {
  .login-container {

    .login {
      width: 90%;
      padding: 10px 20px;
      
      .login-header {

        h2 {
          font-size: 22px;
        }
        
        p {
          font-size: 13px;
        }
      }

      .ant-btn-primary {
        height: 40px;
        font-size: 15px;
      }
      
      :deep(.ant-input) {
        height: 25px;
      }
    }
  }
}
</style>