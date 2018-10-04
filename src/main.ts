import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios) // ajax requests

Vue.config.productionTip = false;

Vue.prototype.sentiment_sections = [
  {label: "Negative", fill: "#E92213"},
  {label: "Neutral", fill: "#E9621A"},
  {label: "Positive", fill: "#DEA82C"},
]

Vue.prototype.emotion_sections = [
  {label: "Low", fill: "#F25EFF"},
  {label: "Medium", fill: "#792F7F"},
  {label: "High", fill: "#3C1840"},
]

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
