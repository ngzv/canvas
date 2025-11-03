<template>
  <div class="layout-container">
    <a-layout class="layout">
      <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" :trigger="null" width="200" collapsed-width="80" collapsible defaultCollapsed>
        <div class="sider-logo">Canvas</div>
        <MenuComponent :menuData="menuData" @menuClick="handleMenuClick" />
      </a-layout-sider>
      <a-layout class="layout-structure">
        <a-layout-header class="structure-header">
          <a-button class="header-trigger" type="text" @click="() => (collapsed = !collapsed)">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </a-button>
          <div>
            <a-tooltip placement="bottom">
              <template #title>
                <span>内容缩放</span>
              </template>
              <a-button class="header-fullscreen" type="text" @click="toggle">
                <component :is="isFullscreen ? CompressOutlined : ExpandOutlined" />
              </a-button>
            </a-tooltip>
            <a-popover placement="bottomLeft">
              <template #content>
                <a-button type="text" @click="handleLogout">退出登录</a-button>
              </template>
              <a-avatar class="header-avatar" :style="{ verticalAlign: 'middle' }" :gap="2" size="large">
                {{ 'Admin' }}
              </a-avatar>
            </a-popover>
          </div>
        </a-layout-header>
        <div class="structure-line"></div>
        <a-layout-content class="structure-content">
          <RouterView v-slot="{ Component, route }">
            <Transition name="fade-transform" mode="out-in">
              <Component v-if="!route.meta.link" :is="Component" :key="route.path"/>
            </Transition>
          </RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFullscreen } from '@vueuse/core';
import { MenuUnfoldOutlined, MenuFoldOutlined, CompressOutlined, ExpandOutlined, DashboardFilled, SettingFilled } from '@ant-design/icons-vue';
import MenuComponent from './components/Menu.vue';

const route = useRoute();
const router = useRouter();
const { isFullscreen, enter, exit, toggle } = useFullscreen();

const collapsed = ref(false);
const fullscreen = ref(false);

const selectedKeys = ref(['1']);

const handleMenuItem = (key) => {
  selectedKeys.value = [key];
  if (key === '1' || key === 1) {
    router.push('/dashboard');
  } else if (key === '2' || key === 2) {
    router.push('/system');
  }
};

// 菜单数据
const menuData = ref([
  {
    key: 'dashboard',
    title: '首页',
    icon: DashboardFilled,
    path: '/dashboard'
  },
  {
    key: 'system',
    title: '系统管理',
    icon: SettingFilled,
    children: [
      {
        key: '2-1',
        title: '用户管理',
        parentKey: 'system',
        path: '/system/user'
      },
      {
        key: '2-2',
        title: '角色管理',
        parentKey: 'system',
        path: '/system/role'
      },
      {
        key: '2-3',
        title: '菜单管理',
        parentKey: 'system',
        path: '/system/menu'
      }
    ]
  }
]);

// 处理菜单点击事件
const handleMenuClick = (menuItem) => {
  // 路由跳转已经在Menu组件中处理，这里可以添加其他逻辑
  // console.log('菜单点击:', menuItem);
};

const handleLogout = () => {
  router.push('/login');
};

onMounted(() => {
});
</script>

<style scoped lang="less">
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: fixed;

  .layout {
    width: 100%;
    height: 100%;

    .layout-sider {
      height: 100%;

      .sider-logo { 
        width: 100%;
        height: 64px;
        padding: 12px 10px;
        line-height: 40px;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }

      .sider-menu {
        height: calc(100% - 64px);
        overflow: auto;

        span {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

    .layout-structure { 
      width: calc(100% - 200px);
      height: 100%;

      .structure-header {
        width: 100%;
        height: 64px;
        padding: 0 10px;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-trigger {
          font-size: 20px;
          padding: 0 5px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .header-trigger:hover {
          color: #2C3E50;
        }

        .header-fullscreen {
          font-size: 18px;
          padding: 0 5px;
          margin: 0 10px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .header-fullscreen:hover {
          color: #2C3E50;
        }

        .header-avatar {
          margin: 5px;
          margin-top: -2px;
        }
      }

      .structure-line {
        width: 100%;
        height: 1px;
        background: #E5E5E5;
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
      }

      .structure-content {
        width: 100%;
        height: calc(100% - 65px);
        padding: 10px 10px 0 10px;
        margin-top: 1px;
        background: #F5F5F5;
        overflow: auto;
      }
    }
  }
}
</style>