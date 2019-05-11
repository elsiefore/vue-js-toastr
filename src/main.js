import Vue from 'vue'
import App from './App.vue'
import Toastr from './plugins/Toastr'

Vue.config.productionTip = false
Vue.use(Toastr, {position:"bottom-center"});

new Vue({
  render: h => h(App),
}).$mount('#app')
