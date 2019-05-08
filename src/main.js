import Vue from 'vue'
import App from './App.vue'
import Toastr from './plugins/Toastr'

Vue.config.productionTip = false
Vue.use(Toastr)

new Vue({
  render: h => h(App),
}).$mount('#app')
