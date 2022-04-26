import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faXmark)
Vue.config.productionTip = false;
Vue.component('fa-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
