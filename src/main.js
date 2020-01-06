import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局初始化样式文件
import '@/assets/css/global.css'
// 引入elementui组件库
import ElementUI from 'element-ui'

// 导入axios模块
import axios from 'axios'
// 配置公共跟地址(线上地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为vue的原型继承成员
Vue.prototype.$http = axios
// 引入css样式
// import 'element-ui/lib/theme-chalk/index.css'
// 把组件库注册给vue
// 现在组件注册：Vue.use(组件模块)一次性注册全部组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
