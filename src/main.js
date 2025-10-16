import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import plugins from './plugins'
import directive from './directive' 
import './style.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(plugins)
app.use(directive)
app.use(Antd)
app.mount('#app')
