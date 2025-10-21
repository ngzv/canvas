import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
import router from './router';
import plugins from './plugins';
import directive from './directive'; 
import './style.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// 创建Vue应用实例
const app = createApp(App);

// 注册全局插件
app.use(pinia);
app.use(router);
app.use(plugins);
app.use(directive);
app.use(Antd);

// 挂载应用
app.mount('#app');
