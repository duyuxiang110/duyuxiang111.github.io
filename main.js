// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont/iconfont.css'
import Home from '@/pages/home/Home.vue'
import Goods from '@/pages/goods/Goods.vue'
import Ratings from '@/pages/ratings/Ratings.vue'
import Seller from '@/pages/seller/Seller.vue'
import swiperList from '@/pages/picture/Slideshow.vue'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(Router)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/Goods',
  component: Goods
}, {
  path: '/Ratings',
  component: Ratings
}, {
  path: '/Seller',
  component: Seller
}, {
  path: '/',
  component: swiperList
}]

const router = new Router({
  linkActiveClass: 'active',
  routes
})

new Vue({
  render: h => h(App),
  template: '<App>',
  router
}).$mount('#app')
