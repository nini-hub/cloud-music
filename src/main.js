import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss'
import Loading from './plugin/loading/index'
import MetaInfo from 'vue-meta-info'

Vue.use(Loading, {
  title: '我来了我来了'
})

Vue.use(MetaInfo)

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
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
