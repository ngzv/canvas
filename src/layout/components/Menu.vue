<template>
  <a-menu class="sider-menu" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline">
    <template v-for="menuItem in menuData" :key="menuItem.key">
      <!-- 如果有子菜单，使用 a-sub-menu -->
      <a-sub-menu v-if="menuItem.children && menuItem.children.length > 0" :key="menuItem.key">
        <template #icon>
          <component :is="menuItem.icon" />
        </template>
        <template #title>
          {{ menuItem.title }}
        </template>
        <!-- 递归渲染子菜单 -->
        <div v-for="childItem in menuItem.children" :key="childItem.key">
          <a-menu-item :key="childItem.key" @click="handleMenuItem(childItem)">
            {{ childItem.title }}
          </a-menu-item>
        </div>
      </a-sub-menu>
      <!-- 如果没有子菜单，使用 a-menu-item -->
      <a-menu-item v-else :key="`${menuItem.key}`" @click="handleMenuItem(menuItem)">
        <template #icon>
          <component :is="menuItem.icon" />
        </template>
        <span>{{ menuItem.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['menuClick']);

const route = useRoute();
const router = useRouter();

const selectedKeys = ref([]);
const openKeys = ref([]);

// 处理菜单点击事件
const handleMenuItem = (menuItem) => {
  selectedKeys.value = [menuItem.key];
  emit('menuClick', menuItem);
  
  // 如果有路由路径，则进行路由跳转
  if (menuItem.path) {
    router.push(menuItem.path);
  }
};

// 监听路由变化，更新选中的菜单
watch(
  () => route.path,
  (newPath) => {
    // 根据当前路由路径，设置选中的菜单项
    updateSelectedKeys(newPath);
  }
);

// 根据路由路径更新选中的菜单项
const updateSelectedKeys = (path) => {
  // 查找与当前路径匹配的菜单项
  const findMenuItem = (items, targetPath) => {
    for (const item of items) {
      if (item.path === targetPath) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = findMenuItem(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const matchedItem = findMenuItem(props.menuData, path);
  if (matchedItem) {
    selectedKeys.value = [matchedItem.key];
    
    // 如果是子菜单项，展开父菜单
    if (matchedItem.parentKey) {
      openKeys.value = [...new Set([...openKeys.value, matchedItem.parentKey])];
    }
  }
};

// 组件挂载时，根据当前路由设置选中的菜单项
onMounted(() => {
  if (route.path) {
    updateSelectedKeys(route.path);
  }
});
</script>

<style scoped lang="less">
.sider-menu {
  height: calc(100% - 64px);

  span {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>