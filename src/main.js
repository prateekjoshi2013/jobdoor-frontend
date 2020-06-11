/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '../node_modules/bulma/css/bulma.css';
import Vue from 'vue';
import auth from '@/auth';
import App from './App.vue';
import router from './router';


Vue.use(auth);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
