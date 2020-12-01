import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss'
import Loading from './plugin/loading/index'

Vue.use(Loading, {
  title: '我来了我来了'
})

fastclick.attach(document.body)
Vue.use(VueLazyload)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/images/loading.png'),
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
