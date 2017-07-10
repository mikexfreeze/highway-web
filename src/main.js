// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('babel-core/register');

import 'normalize.css/normalize.css';// normalize.css 样式格式化
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css' //element默认样式
import 'assets/styles/commen.css'; // 全局自定义的css样式
import 'assets/iconfont/iconfont'; // iconfont
import 'components/Icon-svg/index'; // 封装的svg组件
import './directives'; // 自定义指令
import 'components'; // 自定义全局组件

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import router from './router';
import store from './store';
// import permission from 'store/permission';
import * as filters from './filters'; // 全局vue filter
Vue.config.productionTip = false
Vue.use(ElementUI)
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
