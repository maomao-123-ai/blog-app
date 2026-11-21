// 文件路径：src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 创建 Pinia 实例并注册
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')