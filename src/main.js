import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/tip"
import lazyLoad from "vue-lazyload"
import fastclick from 'fastclick'

import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false

//使用懒加载插件
Vue.use(lazyLoad, {
    loading: require('./assets/img/common/loading.gif')
});

//解决移动端300ms延迟
fastclick.attach(document.body);

//创建一个事件总线
Vue.prototype.$bus = new Vue();

//swiper插件使用
Vue.use(VueAwesomeSwiper);

//安装自主封装的toast插件
Vue.use(toast)

//设置页面标签
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.dataset.title
    }
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')