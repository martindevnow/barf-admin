import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueLocalStorage from 'vue-localstorage';
import Vuetify from 'vuetify';

import ErrorComponent from './components/Errors/ErrorComponent';
import PageLoading from './components/Shared/PageLoading';

Vue.config.productionTip = false;

/**
 * Local Storage Stuff
 */
Vue.use(VueLocalStorage, {
    name: 'ls',
    createComputed: true //created computed members from your variable declarations
});

Vue.use(Vuetify, {
  // defaultTheme: {
  //   primary: '#1976D2',
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // },
  theme: {
    primary: '#d2291e',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

Vue.component('error', ErrorComponent);
Vue.component('page-loading', PageLoading);



/* eslint-disable no-new */
let app = new Vue({
    el: '#app',
    ls: {
        auth: {
            type: Object,
            default: null,
        }
    },
    router,
    store,
    render: h => h(App)
});
