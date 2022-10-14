import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'; // element-ui组件
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './router';
import '@/permission';
import '@/style/index.scss'
import moment from 'moment'
import "@/components/index.js"; // 全局组件
import "@/assets/js/iconfont.js"

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'medium'
});
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
