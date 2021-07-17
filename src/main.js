import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import modal from './plugins/ModalContextMenu'

Vue.config.productionTip = false
Vue.use(modal)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
