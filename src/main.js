import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$serv = 'http://romainthoreau.alwaysdata.net/codehanback/';
//Vue.prototype.$serv = 'http://localhost/codehanback/';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
